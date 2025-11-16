// src/components/ActivityItemCard.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // <-- 1. IMPORT Link

// Fungsi helper (bisa kamu pindah ke utils/format.js nanti)
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

// Komponen ini menerima 'item' (data) dan 'buttonText' (teks tombol)
function ActivityItemCard({ item, buttonText }) {

  // 2. LOGIKA UNTUK TOMBOL DINAMIS
  // Kita buat fungsi untuk menentukan apakah tombolnya adalah Link atau Button
  const renderButton = () => {
    // Ini adalah class styling yang sama dari kodemu
    const buttonClasses = "bg-primary text-white font-small py-1 px-4 rounded-[20px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors text-sm";

    // Jika tombolnya "Track Order", kita kembalikan <Link>
    if (buttonText === 'Track Order') {
      return (
        <Link 
          to={`/track-order/${item.id}`} // <-- Link dinamis ke halaman TrackOrder
          className={`${buttonClasses} text-center`} // Tambah text-center
        >
          {buttonText}
        </Link>
      );
    }

    // Jika tombolnya "Review"
    if (buttonText === 'Review') {
      return (
        <Link 
          to={`/review/${item.id}`} // <-- Link ke halaman review
          className={`${buttonClasses} text-center`}
        >
          {buttonText}
        </Link>
      );
    }

    // Jika tidak (misal: "Review" atau "Re-Order"), kita kembalikan <button> biasa
    return (
      <button className={buttonClasses}>
        {buttonText}
      </button>
    );
  };

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-100">
      
      {/* Gambar */}
      <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-md flex items-center justify-center p-1">
        <img 
          src={item.image} 
          alt={item.name} 
          className="max-h-full max-w-full object-contain" 
        />
      </div>

      {/* Info Teks (flex-grow mengisi sisa ruang) */}
      <div className="flex-grow min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.details}</p>
        <p className="text-base font-bold text-gray-900 mt-1">
          {formatRupiah(item.price)}
        </p>
      </div>

      {/* 3. PANGGIL FUNGSI RENDER TOMBOLNYA DI SINI */}
      <div className="flex-shrink-0">
        {renderButton()}
      </div>
    </div>
  );
}

export default ActivityItemCard;