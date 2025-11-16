// src/pages/SplashPage.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react'; // Menggunakan ikon

function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Tunggu 2.5 detik, lalu pindah ke halaman /welcome
    const timer = setTimeout(() => {
      // Di sini kamu bisa menambahkan logika
      // "Apakah user sudah pernah login?"
      // Jika sudah, navigate('/home'). Jika belum, navigate('/welcome').
      // Untuk sekarang, kita anggap selalu ke /welcome
      navigate('/welcome');
    }, 2500);

    // Membersihkan timer
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    // 'h-screen' memastikan ini memenuhi seluruh layar
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Ikon Keranjang */}
        <span className="p-4 bg-green-100 rounded-full">
          <ShoppingCart size={40} className="text-green-700" />
        </span>
        <span className="text-xl font-bold text-green-800">
          KLIK KELONTONG
        </span>
      </div>
    </div>
  );
}

export default SplashPage;