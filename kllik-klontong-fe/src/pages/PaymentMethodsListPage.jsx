// src/pages/PaymentMethodsListPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import OnboardingHeader from '../components/OnboardingHeader';
import { Plus, CreditCard, Trash2 } from 'lucide-react';

// --- DATA DUMMY (Nanti ganti dari API) ---
const savedMethods = [
  { id: 1, type: 'Visa', lastFour: '4356' },
  // { id: 2, type: 'OVO', lastFour: '...089' },
];
// --- END DATA DUMMY ---

function PaymentMethodsListPage() {
  return (
    // Kita buat full-width di desktop (seperti MessagePage)
    <div className="pb-20">
      
      {/* Header Halaman (Tombol Kembali & Judul) */}
      <OnboardingHeader title="Metode Pembayaran" />

      {/* Daftar Kartu yang Tersimpan */}
      <div className="flex flex-col gap-4">
        {savedMethods.map((method) => (
          <div key={method.id} className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
            <CreditCard size={24} className="text-gray-500 flex-shrink-0" />
            <div className="flex-grow ml-4">
              <h3 className="font-semibold">{method.type}</h3>
              <p className="text-sm text-gray-500">**** **** **** {method.lastFour}</p>
            </div>
            <button className="text-red-500 p-2 rounded-lg hover:bg-red-50">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        
        {/* Tombol "Add New" */}
        <Link 
          to="/add-card" // <-- Ini mengarah ke halaman yang sudah kita buat
          className="flex items-center justify-center gap-2 w-full py-4 bg-green-50 text-green-700 font-medium rounded-lg border border-dashed border-green-300 hover:bg-green-100"
        >
          <Plus size={20} />
          Tambah Metode Baru
        </Link>
      </div>
    </div>
  );
}

export default PaymentMethodsListPage;