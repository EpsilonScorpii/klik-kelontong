// src/pages/admin/AdminProductPage.jsx

import React, { useState, useEffect } from 'react';
// 1. Ganti import Appwrite dengan apiClient
import apiClient from '../../api/apiClient'; 
import { Search, Plus } from 'lucide-react';
import ProductFormModal from '../../components/admin/ProductFormModal';

// 2. Hapus semua konstanta ID Appwrite
// const DATABASE_ID = '...'; (HAPUS)
// const PRODUCTS_COLLECTION_ID = '...'; (HAPUS)

// (Fungsi formatRupiah tidak berubah, biarkan)
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 3. [TULIS ULANG] Fungsi untuk mengambil data produk
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // Kita panggil endpoint API Laravel yang sudah kita rencanakan
      // (Asumsi endpoint admin adalah '/api/admin/products')
      const response = await apiClient.get('/api/admin/products');
      
      // Data dari Laravel (mungkin) ada di response.data
      // Jika Anda pakai pagination Laravel, mungkin response.data.data
      setProducts(response.data); 
    } catch (error)
      {
      console.error('Gagal mengambil produk:', error);
      // Tambahan: Jika error 401/403 (unauthorized), mungkin token-nya
      // kedaluwarsa, jadi lebih baik paksa logout
      if (error.response?.status === 401 || error.response?.status === 403) {
        // (Opsional: panggil fungsi logout dari useAuth)
        alert('Sesi Anda habis, silakan login kembali.');
        window.location.href = '/login'; // (Hard reload ke login)
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Ambil data saat halaman pertama kali dimuat (Tidak berubah)
  useEffect(() => {
    fetchProducts();
  }, []);

  // 4. Sisa dari file ini (handleOpenCreateModal, handleOpenEditModal,
  //    handleModalSave, dan JSX) TIDAK PERLU DIUBAH.
  //    Logika mereka hanya memanipulasi state React (products, isModalOpen),
  //    yang mana sudah benar.

  // Fungsi untuk membuka modal (Mode Tambah)
  const handleOpenCreateModal = () => {
    setSelectedProduct(null); 
    setIsModalOpen(true);
  };

  // Fungsi untuk membuka modal (Mode Edit)
  const handleOpenEditModal = (product) => {
    setSelectedProduct(product); 
    setIsModalOpen(true);
  };

  // Fungsi yang dipanggil setelah modal ditutup (TIDAK BERUBAH)
  const handleModalSave = (savedProduct, isDelete = false) => {
    setIsModalOpen(false);
    
    if (isDelete) {
      setProducts(prevProducts => 
        prevProducts.filter(p => p.id !== savedProduct.id) // (Ganti $id jadi id)
      );
    } else if (products.some(p => p.id === savedProduct.id)) { // (Ganti $id jadi id)
      setProducts(prevProducts => 
        prevProducts.map(p => 
          p.id === savedProduct.id ? savedProduct : p // (Ganti $id jadi id)
        )
      );
    } else {
      setProducts(prevProducts => [...prevProducts, savedProduct]);
    }
  };

  return (
    <div className="pb-20">
      {/* Header: Search dan Tombol Tambah (Tidak berubah) */}
      <div className="flex justify-between items-center mb-4">
        {/* ... (kode search bar) ... */}
        <button 
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700"
        >
          <Plus size={20} />
          Tambah Produk
        </button>
      </div>

      {/* Tabel Daftar Produk (Hampir tidak berubah) */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            {/* ... (Header Tabel) ... */}
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : (
                products.map(product => (
                  <tr 
                    key={product.id} // (Ganti $id jadi id)
                    className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleOpenEditModal(product)}
                  >
                    <td className="p-3 text-sm font-medium text-gray-800">{product.name}</td>
                    <td className="p-3 text-sm text-gray-700">{formatRupiah(product.price)}</td>
                    {/* Sesuaikan nama properti (product.stock) dengan
                        apa yang Anda kirim dari API Laravel */}
                    <td className="p-3 text-sm text-gray-700">{product.stock}</td>
                    <td className="p-3 text-sm text-gray-700">{product.category}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal (Tidak berubah) */}
      <ProductFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        productToEdit={selectedProduct}
      />
    </div>
  );
}

export default AdminProductPage;