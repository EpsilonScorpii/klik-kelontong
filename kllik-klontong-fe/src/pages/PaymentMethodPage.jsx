// src/pages/PaymentMethodPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingHeader from '../components/OnboardingHeader';
import { useCart } from '../context/CartContext'; // <-- Gunakan "otak" global

function PaymentMethodPage() {
  const navigate = useNavigate();
  
  // 1. Ambil data dari Context
  const { 
    dummyPaymentMethods, 
    paymentMethod, 
    setPaymentMethod, 
    totalCost 
  } = useCart();

  const handlePay = () => {
    // Di aplikasi sungguhan, ini akan memanggil API pembayaran
    // ...
    // Setelah API merespon 'sukses', kita pindah:
    console.log('Membayar dengan:', paymentMethod.title);
    
    // 2. Navigasi ke halaman sukses
    navigate('/payment-success');
  };

  // 3. Kita kelompokkan datanya
  const codMethods = dummyPaymentMethods.filter(p => p.group === 'COD');
  const eWalletMethods = dummyPaymentMethods.filter(p => p.group === 'E-Wallet');

  return (
    // 'pb-32' -> Padding bawah besar agar list tidak tertutup tombol 'Pay' & BottomNav
    <div className="pb-32">
      
      {/* Header Halaman (Tombol Kembali & Judul) */}
      <OnboardingHeader title="Pembayaran" />

      {/* Daftar Metode Pembayaran */}
      <div className="flex flex-col gap-6">

        {/* Grup COD */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">COD</h3>
          <div className="flex flex-col gap-2">
            {codMethods.map((method) => (
              <PaymentItem 
                key={method.id}
                method={method}
                isSelected={paymentMethod?.id === method.id}
                onSelect={() => setPaymentMethod(method)}
              />
            ))}
          </div>
        </div>

        {/* Grup E-Wallet */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">E-Wallet</h3>
          <div className="flex flex-col gap-2">
            {eWalletMethods.map((method) => (
              <PaymentItem 
                key={method.id}
                method={method}
                isSelected={paymentMethod?.id === method.id}
                onSelect={() => setPaymentMethod(method)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tombol "Pay Now" yang fixed di bawah */}
      {/* Desainmu tidak punya tombol ini, tapi ini penting untuk alurnya */}
      <div className="fixed bottom-[64px] left-0 right-0 z-40 lg:bottom-0">
        <div className="max-w-lg mx-auto bg-white p-4 border-t border-gray-200">
          <button 
            onClick={handlePay}
            className="w-full bg-green-600 text-white text-lg font-medium py-3 px-6 rounded-full hover:bg-green-700"
          >
            {/* Tombol akan menampilkan total harga */}
            Pay Now ({new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalCost)})
          </button>
        </div>
      </div>
    </div>
  );
}

// Komponen internal untuk satu item pembayaran
function PaymentItem({ method, isSelected, onSelect }) {
  return (
    <div 
      onClick={onSelect}
      className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 cursor-pointer"
    >
      <span className="text-gray-500">{method.icon}</span>
      <div className="flex-grow min-w-0">
        <h3 className="font-semibold text-gray-800">{method.title}</h3>
      </div>
      
      {/* Tombol Radio Kustom */}
      <div className={`w-6 h-6 rounded-full flex-shrink-0 border-2 ${isSelected ? 'border-green-600' : 'border-gray-300'}`}>
        {isSelected && <div className="w-full h-full p-0.5"><div className="w-full h-full rounded-full bg-green-600"></div></div>}
      </div>
    </div>
  );
}

export default PaymentMethodPage;