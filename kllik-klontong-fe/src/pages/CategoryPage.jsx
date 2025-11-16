// src/pages/CategoryPage.jsx

import React from 'react';
// 1. Import hooks dari React Router
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
// 2. KITA REUSE KOMPONEN PRODUCTLIST!
import ProductList from '../components/ProductList';

// 3. Kita butuh data kategori ini untuk mencocokkan ID dari URL
//    dengan NAMA KATEGORI (Sembako, Makanan, dll)
//    (Ini harusnya data yang sama dengan yang ada di CategoryFilter.jsx)
const categories = [
  { name: 'Sembako', id: 'sembako' },
  { name: 'Makanan', id: 'makanan' },
  { name: 'Minuman', id: 'minuman' },
  { name: 'Kebersihan', id: 'kebersihan' },
  { name: 'Obat-obatan', id: 'obat' },
];

function CategoryPage() {
  const { categoryId } = useParams(); // <-- Mengambil 'sembako' dari URL
  const navigate = useNavigate();

  // 4. Cari nama kategori berdasarkan ID dari URL
  const currentCategory = categories.find(cat => cat.id === categoryId);

  // Jika URL-nya aneh (misal: /category/abcdefg)
  if (!currentCategory) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">Kategori tidak ditemukan</h1>
      </div>
    );
  }

  return (
    // 'pb-20' agar tidak tertutup BottomNav
    <div className="pb-20">
      {/* Header Halaman (Tombol Kembali & Judul) */}
      <div className="flex items-center relative justify-center mb-4">
        <button 
          onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
          className="absolute left-0 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">
          Category {currentCategory.name}
        </h1>
      </div>
      
      {/* 5. TAMPILKAN PRODUCTLIST */}
      {/* ProductList akan otomatis filter berdasarkan nama kategori */}
      <ProductList kategori={currentCategory.name} />
    </div>
  );
}

export default CategoryPage;