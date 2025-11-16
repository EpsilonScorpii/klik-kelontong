// src/pages/WelcomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <span className="p-5 bg-green-100 rounded-full">
        <ShoppingCart size={48} className="text-green-700" />
      </span>
      
      <h1 className="text-2xl font-bold text-gray-800 mt-6">
        "Klik Kelontong, solusi belanja harian Anda!"
      </h1>
      
      <p className="text-gray-600 mt-3 mb-10">
        Nikmati pengalaman belanja yang nyaman tanpa perlu antri atau keluar rumah. Kami siap mengantar kebutuhanmu. Yuk, mulai belanja sekarang!
      </p>
      
      <Link 
        to="/location" // Link ke halaman selanjutnya
        className="w-full bg-green-600 text-white text-lg font-medium py-4 px-6 rounded-full hover:bg-green-700"
      >
        Let's Get Started
      </Link>
      
      {/* === MODIFIKASI DI SINI === */}
      {/* Tambahkan link "Sign In" */}
      <p className="mt-6 text-sm text-gray-500">
        Already have an account? 
        <Link to="/login" className="text-green-600 font-medium ml-1">
          Sign In
        </Link>
      </p>

      {/* Ubah link "Daftar" agar konsisten */}
      <p className="mt-4 text-sm text-gray-500">
        Belum Punya akun? 
        <Link to="/register" className="text-red-500 font-medium ml-1">
          Daftar
        </Link>
      </p>
    </div>
  );
}

export default WelcomePage;