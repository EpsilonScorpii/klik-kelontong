// src/pages/ForgetPasswordPage.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaApple, FaGoogle, FaFacebook } from 'react-icons/fa';
import OnboardingHeader from '../components/OnboardingHeader'; // Kita pakai ulang header

function ForgetPasswordPage() {
  const navigate = useNavigate();

  const handleSend = (e) => {
    e.preventDefault();
    // Logic API kirim email reset...
    // Jika sukses:
    navigate('/verify-forgot-password'); // Pindah ke halaman verifikasi
  };

  return (
    // 1. KEMBALIKAN 'h-full' agar container mengisi layar
    <div className="flex flex-col h-full">
      <OnboardingHeader title="Forget Password" />
      
      <p className="text-center text-gray-500 mb-8 -mt-4">
        Masukkan email yang sudah terdaftar
      </p>

      {/* 2. FORM (Tanpa flex-grow) */}
      <form onSubmit={handleSend} className="">
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="example@gmail.com"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-green-600 text-white text-lg font-medium py-3 px-6 rounded-full hover:bg-green-700 mt-4"
        >
          Kirim
        </button>
      </form>

      {/* 3. INI KUNCINYA: 'Spacer' kosong yang akan 'tumbuh' */}
      <div className="flex-grow"></div>

      {/* 4. KONTEN BAWAH (Tanpa margin atas, karena spacer sudah mendorongnya) */}
      <div className=""> 
        <div className="text-center my-6">
          <p className="text-gray-400">Or sign in with</p>
          <div className="flex justify-center gap-6 mt-4">
            <button 
              type="button" 
              className="text-black hover:opacity-70"
            >
              <FaApple size={28} />
            </button>
            <button 
              type="button" 
              className="hover:opacity-70"
            >
              <FaGoogle size={28} className="text-red-500" />
            </button>
            <button 
              type="button" 
              className="hover:opacity-70"
            >
              <FaFacebook size={28} className="text-blue-600" />
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500">
          Don't have an account? 
          <Link to="/register" className="text-red-500 font-medium ml-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPasswordPage;