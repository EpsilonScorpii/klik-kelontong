// src/pages/NewPasswordPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import OnboardingHeader from '../components/OnboardingHeader';

function NewPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    // Logic API simpan password baru...
    // Jika sukses:
    alert('Password berhasil diubah! Silakan login.');
    navigate('/login'); // Arahkan ke halaman login
  };

  return (
    <div className="flex flex-col h-full">
      <OnboardingHeader title="New Password" />
      
      <p className="text-center text-gray-500 mb-8 -mt-4 px-6">
        Your new password must be different from previously used passwords.
      </p>

      <form onSubmit={handleReset} className="flex-grow">
        <div className="mb-4 relative">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
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

        <div className="mb-8 relative">
          <label className="text-sm font-medium text-gray-700">Confirm Password</label>
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

        <button 
          type="submit"
          className="w-full bg-green-600 text-white text-lg font-medium py-3 px-6 rounded-full hover:bg-green-700"
        >
          Create New Password
        </button>
      </form>
    </div>
  );
}

export default NewPasswordPage;