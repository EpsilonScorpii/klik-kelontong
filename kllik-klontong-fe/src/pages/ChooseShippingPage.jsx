// src/pages/ChooseShippingPage.jsx

import React from 'react'; // <-- Hapus useState
import { useNavigate } from 'react-router-dom';
import OnboardingHeader from '../components/OnboardingHeader';
import { Truck } from 'lucide-react';
import { useCart } from '../context/CartContext'; // <-- Kita akan gunakan ini

// --- HAPUS DATA DUMMY DARI SINI ---

function ChooseShippingPage() {
  const navigate = useNavigate();

  // 1. AMBIL DATA DARI CONTEXT (STATE GLOBAL)
  const { dummyShippingMethods, shippingMethod, setShippingMethod } = useCart();
  
  // 2. HAPUS 'useState' LOKAL
  // const [selectedId, setSelectedId] = useState(shippingMethods[1].id);

  const handleApply = () => {
    // State sudah disimpan di context via 'onSelect'
    
    // 3. UBAH NAVIGASI KE HALAMAN CHECKOUT (RINGKASAN)
    navigate('/checkout'); 
  };

  return (
    <div className="pb-32">
      
      {/* Header Halaman (Tombol Kembali & Judul) */}
      <OnboardingHeader title="Choose Shipping" />

      {/* Daftar Metode Pengiriman */}
      <div className="flex flex-col gap-4">
        
        {/* 4. Gunakan 'dummyShippingMethods' DARI CONTEXT */}
        {dummyShippingMethods.map((method) => (
          <ShippingItem 
            key={method.id}
            method={method}
            // 5. SAMBUNGKAN KE STATE GLOBAL
            isSelected={shippingMethod?.id === method.id}
            onSelect={() => setShippingMethod(method)}
          />
        ))}
      </div>

      {/* Tombol "Apply" yang fixed di bawah */}
      <div className="fixed bottom-[64px] left-0 right-0 z-40 lg:bottom-0">
        <div className="max-w-lg mx-auto bg-white p-4 border-t border-gray-200">
          <button 
            onClick={handleApply}
            className="w-full bg-green-600 text-white text-lg font-medium py-3 px-6 rounded-full hover:bg-green-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

// Komponen internal untuk satu item pengiriman (Tidak berubah)
function ShippingItem({ method, isSelected, onSelect }) {
  return (
    <div 
      onClick={onSelect}
      className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 cursor-pointer"
    >
      <Truck size={24} className="text-gray-500 flex-shrink-0" />
      <div className="flex-grow min-w-0">
        <h3 className="font-semibold text-gray-800">{method.title}</h3>
        <p className="text-sm text-gray-500 truncate">{method.details}</p>
      </div>
      
      {/* Tombol Radio Kustom */}
      <div className={`w-6 h-6 rounded-full flex-shrink-0 border-2 ${isSelected ? 'border-green-600' : 'border-gray-300'}`}>
        {isSelected && <div className="w-full h-full p-0.5"><div className="w-full h-full rounded-full bg-green-600"></div></div>}
      </div>
    </div>
  );
}

export default ChooseShippingPage;