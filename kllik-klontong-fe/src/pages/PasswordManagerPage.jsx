// src/pages/PasswordManagerPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import OnboardingHeader from '../components/OnboardingHeader';

function PasswordManagerPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Logic API untuk ganti password...
    // Jika sukses:
    alert('Password berhasil diubah!');
    navigate(-1); // Kembali ke halaman Settings
  };

  return (
    <div className="flex flex-col h-full">
      <OnboardingHeader title="Password Manager" />

      <form onSubmit={handleChangePassword} className="flex-grow mt-4">
        
        {/* Current Password */}
        <div className="mb-4 relative">
          <label className="text-sm font-medium text-gray-700">Current Password</label>
          <input
            type={showCurrent ? 'text' : 'password'}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="••••••••••"
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-10 text-gray-400"
          >
            {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        <Link to="/forgot-password" // Link ke alur Lupa Password
              className="text-sm text-red-500 font-medium float-right mb-6">
          Forgot Password?
        </Link>

        {/* New Password */}
        <div className="mb-4 relative clear-both">
          <label className="text-sm font-medium text-gray-700">New Password</label>
          <input
            type={showNew ? 'text' : 'password'}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="••••••••••"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-10 text-gray-400"
          >
            {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm New Password */}
        <div className="mb-8 relative">
          <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type={showConfirm ? 'text' : 'password'}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="••••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-10 text-gray-400"
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        {/* Tombol "Save Changes" (Tidak ada di desain, tapi diperlukan untuk form) */}
        <button 
          type="submit"
          className="w-full bg-green-600 text-white text-lg font-medium py-3 px-6 rounded-full hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default PasswordManagerPage;