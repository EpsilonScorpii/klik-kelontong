// src/pages/AddCardPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingHeader from '../components/OnboardingHeader'; // Kita pakai ulang header

// Komponen internal untuk Kartu Debit (hanya visual)
function DebitCardVisual() {
  return (
    <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-yellow-700 via-yellow-900 to-black p-5 flex flex-col justify-between shadow-lg">
      <div>
        <h3 className="text-white text-lg font-light">Classic Debit</h3>
      </div>
      <div className="text-white">
        <span className="text-2xl font-mono tracking-widest">3456 4325 2367 4356</span>
        <div className="flex justify-between text-xs mt-2">
          <span>A.N. OTHER</span>
          <span>03/24</span>
        </div>
      </div>
    </div>
  );
}

function AddCardPage() {
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    // Logic API untuk simpan kartu...
    // Jika sukses:
    alert('Kartu berhasil disimpan!');
    navigate(-1); // Kembali ke halaman sebelumnya (misal: Halaman Akun)
  };

  return (
    // Tampilan mobile-first di desktop
    <div className="max-w-lg mx-auto pb-20">
      
      {/* Header Halaman (Tombol Kembali & Judul) */}
      <OnboardingHeader title="Pembayaran" /> {/* Judul bisa 'Add Card' */}

      {/* Visual Kartu */}
      <div className="mb-6">
        <DebitCardVisual />
      </div>

      {/* Form Input */}
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Card Holder Name</label>
          <input
            type="text"
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Card Number</label>
          <input
            type="tel" // Gunakan 'tel' untuk keyboard numerik
            inputMode="numeric"
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="0000 0000 0000 0000"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="text" // (Bisa pakai 'month' atau 'text' dengan format MM/YY)
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              placeholder="MM/YY"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">CVV</label>
            <input
              type="tel"
              inputMode="numeric"
              maxLength="3"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              placeholder="123"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" id="savecard" defaultChecked className="h-4 w-4 rounded text-green-600 focus:ring-green-500" />
          <label htmlFor="savecard" className="text-sm text-gray-600">
            Save Card
          </label>
        </div>

        {/* Tombol Simpan */}
        <button 
          type="submit"
          className="w-full bg-green-600 text-white text-lg font-medium py-3 px-6 rounded-full hover:bg-green-700 mt-4"
        >
          Save Card
        </button>
      </form>
    </div>
  );
}

export default AddCardPage;