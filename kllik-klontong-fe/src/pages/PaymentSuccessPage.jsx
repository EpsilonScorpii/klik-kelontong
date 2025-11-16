// src/pages/PaymentSuccessPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import OnboardingHeader from '../components/OnboardingHeader';
import { CheckCircle } from 'lucide-react';

function PaymentSuccessPage() {
  return (
    // Tampilan mobile-first di desktop
    <div className="max-w-lg mx-auto flex flex-col h-full">
      
      {/* Header Halaman (Tombol Kembali & Judul) */}
      <OnboardingHeader title="Pembayaran" />

      {/* Konten Sukses */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 pb-20">
        
        <CheckCircle size={80} className="text-green-500" strokeWidth={1.5} />
        
        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-500 mt-2 mb-10">
          Terimakasih atas pembayaran anda
        </p>

        {/* Tombol Aksi */}
        <div className="w-full flex flex-col gap-4">
          <Link 
            to="/aktivitas" // Arahkan ke halaman order/aktivitas
            className="w-full bg-green-600 text-white text-lg font-medium py-3 px-6 rounded-full hover:bg-green-700"
          >
            View Order
          </Link>
          <Link 
            to="#" // (Belum ada halaman e-receipt)
            className="w-full text-green-600 text-lg font-medium py-3 px-6 rounded-full hover:bg-green-50"
          >
            View E-Receipt
          </Link>
        </div>

      </div>
    </div>
  );
}

export default PaymentSuccessPage;