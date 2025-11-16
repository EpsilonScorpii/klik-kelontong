// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <-- Pastikan useNavigate ada
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { FaApple, FaGoogle, FaFacebook } from 'react-icons/fa';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { register } = useAuth();
  const navigate = useNavigate(); // <-- Panggil hook navigasi

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    if (!agreed) {
      setError("Anda harus menyetujui Terms & Condition.");
      return;
    }
    setLoading(true);

    try {
      await register(email, password, name);
      
      // INI PERUBAHANNYA:
      // Arahkan ke halaman "Login"
      alert('Pendaftaran berhasil! Akun Anda akan segera diverifikasi oleh Admin.');
      navigate('/login');
      
    } catch (err) {
      console.error(err);
      if (err.message.includes("Password must")) {
        setError("Password terlalu lemah. Coba kombinasi huruf besar, angka, atau simbol.");
      } else if (err.message.includes("already exists")) {
        setError("Email ini mungkin sudah digunakan.");
      } else {
        setError("Gagal mendaftar. Silakan coba lagi.");
      }
      setLoading(false);
    }
  };

  return (
    // 'h-full' dihapus dari sini agar layout tidak 'stretch'
    <div className="flex flex-col">
      <div className="text-center pt-10">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-gray-500 mb-6 px-4">
          Fill your information below or register
          with your social account
        </p>
      </div>

      {/* 'flex-grow' dihapus dari sini */}
      <form onSubmit={handleSignUp} className="px-4">
        {/* ... (Input Name) ... */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input type="text" placeholder="Jahri" value={name} onChange={(e) => setName(e.target.value)} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"/>
        </div>
        {/* ... (Input Email) ... */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"/>
        </div>
        {/* ... (Input Password) ... */}
        <div className="mb-4 relative">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-10 text-gray-400">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {/* ... (Checkbox Terms) ... */}
        <div className="flex items-center gap-2 mb-6">
          <input type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-4 w-4 rounded text-green-600 focus:ring-green-500 border-gray-300" />
          <label htmlFor="terms" className="text-sm text-gray-600">
            Agree with <a href="#" className="text-green-600">Terms & Condition</a>
          </label>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white text-lg font-medium py-3 px-6 rounded-full hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      
      {/* ... (Sisa JSX Social Login & Link "Sign In") ... */}
      <div className="text-center my-6 px-4">
        {/* ... */}
      </div>
      <p className="text-center text-sm text-gray-500 mb-6">
        {/* ... */}
      </p>
    </div>
  );
}

export default RegisterPage;