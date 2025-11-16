// src/components/admin/ProductFormModal.jsx

import React, { useState, useEffect } from 'react';
// 1. Ganti semua import Appwrite dengan apiClient
import apiClient from '../../api/apiClient'; 
import { X, Edit2, Upload, Trash2 } from 'lucide-react';

// 2. Hapus semua konstanta ID Appwrite
// const DATABASE_ID = '...'; (HAPUS)
// const PRODUCTS_COLLECTION_ID = '...'; (HAPUS)
// const ADMIN_TEAM_ID = '...'; (HAPUS)
// const IMAGES_BUCKET_ID = '...'; (HAPUS)

// 3. HAPUS fungsi helper 'getFileIdFromUrl' (tidak perlu lagi)

function ProductFormModal({ isOpen, onClose, productToEdit, onSave }) {
  const isEditMode = Boolean(productToEdit);

  // State untuk form (Tidak berubah)
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [discount, setDiscount] = useState(0); // (Ganti nama ini jika di Laravel beda)
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 'useEffect' untuk mengisi form (Hampir tidak berubah)
  useEffect(() => {
    if (isEditMode && productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price);
      setStock(productToEdit.stock);
      setCategory(productToEdit.category);
      setDescription(productToEdit.description || '');
      // (Sesuaikan 'discount_price' dengan nama kolom di Laravel)
      setDiscount(productToEdit.discount_price || 0); 
      // (Sesuaikan 'image_url' dengan nama kolom di Laravel)
      setPreviewUrl(productToEdit.image_url); 
      setImageFile(null); // Reset file input
    } else {
      // Reset form jika mode Tambah
      setName('');
      setPrice(0);
      setStock(10);
      setCategory('Sembako');
      setDescription('');
      setDiscount(0);
      setPreviewUrl(null);
      setImageFile(null);
    }
  }, [productToEdit, isEditMode, isOpen]); // (Tambahkan isOpen)

  // (Fungsi handleImageChange tidak berubah)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 4. [TULIS ULANG TOTAL] Fungsi handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // [BARU] Kita WAJIB pakai FormData untuk kirim file
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('discount_price', discount); // (Sesuaikan nama)
    
    // Hanya kirim file jika ada file BARU yang dipilih
    if (imageFile) {
      formData.append('image', imageFile); // (Sesuaikan 'image')
    }

    try {
      let response;
      
      if (isEditMode) {
        // [BARU] Mode EDIT (Update)
        // API Laravel tidak bisa handle PUT/PATCH dengan FormData
        // secara langsung, jadi kita "spoofing"
        formData.append('_method', 'PUT'); // <-- Trik Laravel
        
        response = await apiClient.post(
          `/api/admin/products/${productToEdit.id}`, 
          formData, 
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );
        
      } else {
        // [BARU] Mode CREATE (Tambah)
        response = await apiClient.post(
          '/api/admin/products', 
          formData, 
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );
      }
      
      onSave(response.data); // Kirim data produk baru/terupdate ke parent
      onClose(); 

    } catch (error) {
      console.error('Gagal menyimpan produk:', error);
      // Tampilkan error validasi dari Laravel
      if (error.response?.status === 422) {
        alert("Gagal validasi: " + JSON.stringify(error.response.data.errors));
      } else {
        alert(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // 5. [TULIS ULANG TOTAL] Fungsi handleDelete
  const handleDelete = async () => {
    if (!window.confirm(`Yakin ingin menghapus ${productToEdit.name}?`)) {
      return;
    }
    
    setIsLoading(true);
    try {
      // Panggil endpoint DELETE
      await apiClient.delete(`/api/admin/products/${productToEdit.id}`);
      
      // Kirim info ke parent bahwa produk ini dihapus
      onSave(productToEdit, true); // (true = isDelete)
      onClose();
      
    } catch (error) {
      console.error('Gagal menghapus produk:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  // 6. [JSX TIDAK BERUBAH]
  //    UI/Form Anda sudah bagus dan tidak perlu diubah.
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">
            {isEditMode ? 'Edit Produk' : 'Tambah Produk'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
            
            <div className="space-y-3">
              <FormInput label="Nama Produk" value={name} onChange={setName} />
              <FormInput label="Harga" value={price} onChange={setPrice} type="number" />
              <FormInput label="Stok" value={stock} onChange={setStock} type="number" />
              <div>
                <label className="text-sm font-medium text-gray-700">Deskripsi</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="Deskripsi singkat produk..."
                />
              </div>
              <FormInput label="Kategori" value={category} onChange={setCategory} />
              {/* (Sesuaikan 'discount_price' dengan nama kolom di Laravel) */}
              <FormInput label="Diskon" value={discount} onChange={setDiscount} type="number" /> 
            </div>

            <div>
              <label className="text-sm font-medium">Foto Produk</label>
              <div className="mt-1 flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <span className="text-gray-400">Image</span>
                  )}
                </div>
                <label className="cursor-pointer bg-green-100 text-green-700 font-medium py-2 px-4 rounded-lg hover:bg-green-200 flex items-center gap-2">
                  <Upload size={16} />
                  <span>Upload</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
            </div>
          </div>

          {/* Footer Modal */}
          <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
            <div>
              {isEditMode && (
                  <button 
                    type="button"
                    onClick={handleDelete}
                    className="text-red-600 font-medium text-sm hover:underline mr-4"
                  >
                    Hapus Produk
                  </button>
                  // (Tombol Nonaktifkan bisa Anda implementasikan nanti)
              )}
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-green-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              {isLoading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Komponen helper (Tidak berubah)
function FormInput({ label, value, onChange, type = 'text' }) {
  // ... (kode tidak berubah)
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-1">
        <input 
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
          <Edit2 size={16} />
        </span>
      </div>
    </div>
  );
}

export default ProductFormModal;