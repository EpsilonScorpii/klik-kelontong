// src/pages/ProductDetailPage.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DUMMY_PRODUCTS } from '../data/products'; // <-- Import data kita
import {useCart} from '../context/CartContext'

// Helper (kamu bisa pindah ini ke file 'utils' nanti)
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};


function ProductDetailPage() {
  const { addToCart } = useCart();
  const { productId } = useParams(); // <-- Baca 'id' dari URL
  const navigate = useNavigate();

  // 1. Cari produk di data kita
  // Kita pakai '==' karena productId dari URL adalah string
  const product = DUMMY_PRODUCTS.find(p => p.id == productId);

  // 2. State untuk ukuran yang dipilih
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);

  // 3. Tampilan jika produk tidak ditemukan
  if (!product) {
    return (
      <div>
        <h1 className="text-xl font-bold">Produk tidak ditemukan</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    // 4. (Opsional) Beri notifikasi atau langsung pindah ke keranjang
    alert(`${product.name} telah ditambahkan ke keranjang!`);
    // navigate('/cart'); // (Jika ingin langsung pindah)
  };

  return (
    // 'pb-36' -> Padding bawah agar konten tidak tertutup 2 bar di bawah
    <div className="pb-36">
      
      {/* Header Halaman (Tombol Kembali & Judul) */}
      <div className="flex items-center relative justify-center mb-4">
        <button 
          onClick={() => navigate(-1)} // Kembali
          className="absolute left-0 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Product Detail</h1>
      </div>

      {/* Konten Produk */}
      <div className="flex flex-col gap-4">
        
        {/* Gambar Produk */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 flex justify-center items-center h-64">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain" 
          />
        </div>

        {/* Info Dasar */}
        <div className="px-1">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {formatRupiah(product.price)}
          </p>
        </div>

        {/* Deskripsi */}
        <div className="px-1 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name.split(' ')[0]} {product.name.split(' ')[1]}
          </h3>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pilihan Ukuran (Jika ada) */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="px-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Select Size
            </h3>
            <div className="flex gap-3">
              {product.sizes.map((size) => {
                const isActive = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 rounded-lg font-medium text-sm
                      ${isActive 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-700'
                      }
                    `}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* FOOTER BAR (ADD TO CART) */}
      {/* Ini adalah bagian yang 'fixed' di bawah */}
      <div className="fixed bottom-[64px] left-0 right-0 z-40 
                      bg-white border-t border-gray-200 p-4 
                      flex items-center justify-between
                      lg:bottom-0 lg:relative"> {/* (Menyesuaikan untuk Desktop) */}
        
        {/* 'lg:hidden' -> Sembunyikan 'Total Price' di desktop */}
        <div className="lg:hidden">
          <span className="text-sm text-gray-600">Total Price</span>
          <p className="text-lg font-bold text-gray-900">
            {formatRupiah(product.price)}
          </p>
        </div>
        
        <button
        onClick={handleAddToCart} 
        className="bg-green-600 text-white font-medium py-3 rounded-lg 
                           hover:bg-green-700 transition-colors w-full 
                           lg:w-auto lg:px-12">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;