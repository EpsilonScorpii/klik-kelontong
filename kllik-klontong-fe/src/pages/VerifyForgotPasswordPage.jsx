// src/pages/VerifyForgotPasswordPage.jsx
// (Ini adalah copy dari VerifyCodePage, tapi dengan navigasi yang BEDA)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingHeader from '../components/OnboardingHeader';

function VerifyForgotPasswordPage() {
  const navigate = useNavigate();
  const email = "example@gmail.com"; // (Harusnya dapat dari state/props)

  const handleVerify = (e) => {
    e.preventDefault();
    // Logic API verifikasi kode...
    // Jika sukses:
    navigate('/new-password'); // <-- TUJUAN BERBEDA
  };

  // Logic untuk 4 kotak OTP (auto-focus next input)
  const handleInput = (e) => {
    const next = e.target.nextElementSibling;
    if (next && e.target.value) {
      next.focus();
    }
  };

  return (
    <div className="flex flex-col h-full text-center">
      <OnboardingHeader title="Verify Code" />
      
      <p className="text-gray-500 mb-8 px-4">
        Please enter the code we just sent to email
        <span className="block font-medium text-gray-800">{email}</span>
      </p>

      <form onSubmit={handleVerify} className="flex-grow">
        <div className="flex justify-center gap-3 mb-6">
          <input type="text" maxLength="1" onInput={handleInput} className="w-16 h-16 text-3xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" maxLength="1" onInput={handleInput} className="w-16 h-16 text-3xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" maxLength="1" onInput={handleInput} className="w-16 h-16 text-3xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" maxLength="1" onInput={handleInput} className="w-16 h-16 text-3xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        <p className="text-sm text-gray-500 mb-8">
          Didn't receive OTP? 
          <button className="text-green-600 font-medium ml-1">
            Resend Code
          </button>
        </p>

        <button 
          type="submit"
          className="w-full bg-green-600 text-white text-lg font-medium py-3 px-6 rounded-full hover:bg-green-700"
        >
          Verify
        </button>
      </form>
    </div>
  );
}

export default VerifyForgotPasswordPage;