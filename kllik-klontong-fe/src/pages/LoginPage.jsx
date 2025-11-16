// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'; // <-- 1. IMPORT useAuth
import { Eye, EyeOff } from 'lucide-react';
import { FaApple, FaGoogle, FaFacebook } from 'react-icons/fa';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // 2. SIAPKAN STATE UNTUK LOADING & ERROR
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 3. AMBIL FUNGSI login DARI CONTEXT
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null); // Bersihkan error lama
    setLoading(true); // Mulai loading

    try {
      // 1. Panggil 'login' dan TANGKAP HASILNYA
      const userRole = await login(email, password);
      
      // 2. TENTUKAN ARAH NAVIGASI
      if (userRole === 'admin') {
        // Jika dia admin, arahkan ke dashboard admin
        navigate('/admin/dashboard');
      } else {
        // Jika dia customer biasa, arahkan ke beranda
        navigate('/home');
      }
      
    } catch (err) {
      // 5. TANGANI ERROR JIKA GAGAL (Lebih Pintar)
      console.error("RAW APPWRITE ERROR:", err); // Tetap log error lengkap
      
      // Tampilkan pesan error ASLI dari Appwrite
      setError(`Gagal: ${err.message}`); 
      
      setLoading(false);
    } 
    // (setLoading(false) tidak perlu di 'finally' karena navigasi)
  };

  return (
    <div className="flex flex-col h-full pt-10">
      <h1 className="text-3xl font-bold text-center mb-2">Sign In</h1>
      <p className="text-center text-gray-500 mb-8">
        Hi! Welcome back, you've been missed
      </p>

      {/* 6. UBAH JADI <form> dan hubungkan onSubmit */}
      <form onSubmit={handleSignIn} className="flex-grow px-4">
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="example@gmail.com"
          />
        </div>

        <div className="mb-4 relative">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="••••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <Link to="/forgot-password" 
              className="text-sm text-green-600 font-medium float-right mb-6">
          Forgot Password?
        </Link>

        {/* 7. TAMPILKAN PESAN ERROR JIKA ADA */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <button 
          type="submit"
          disabled={loading} // <-- 8. DISABLE TOMBOL SAAT LOADING
          className="w-full bg-green-600 text-white text-lg font-medium py-3 px-6 rounded-full hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      {/* ... (Sisa kode social login & link Sign Up) ... */}
      <div className="text-center my-6 px-4">
        {/* ... */}
      </div>
      <p className="text-center text-sm text-gray-500 mb-6">
        {/* ... */}
      </p>
    </div>
  );
}

export default LoginPage;