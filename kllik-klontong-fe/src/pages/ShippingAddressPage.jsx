// src/pages/ShippingAddressPage.jsx

import React from 'react'; // <-- Hapus useState
import { useNavigate } from 'react-router-dom';
import OnboardingHeader from '../components/OnboardingHeader'; // Kita pakai ulang header
import { MapPin, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext'; // <-- Kita akan gunakan ini

// --- HAPUS DATA DUMMY DARI SINI ---

function ShippingAddressPage() {
  const navigate = useNavigate();

  // 1. AMBIL DATA DARI CONTEXT (STATE GLOBAL)
  const { dummyAddresses, shippingAddress, setShippingAddress } = useCart();
  
  // 2. HAPUS 'useState' LOKAL
  // const [selectedId, setSelectedId] = useState(dummyAddresses[0].id);

  const handleApply = () => {
    // Di sini kamu bisa simpan alamat yang dipilih ke context/backend
    // (Kita sudah menyimpannya via 'onSelect', jadi kita tinggal navigasi)
    
    // 2. Navigasi ke langkah selanjutnya
    navigate('/shipping-method');
  };

  return (
    // 'pb-32' -> Padding bawah besar agar list tidak tertutup tombol 'Apply' & BottomNav
    <div className="pb-32">
      
      {/* Header Halaman (Tombol Kembali & Judul) */}
      <OnboardingHeader title="Shipping Address" />

      {/* Daftar Alamat */}
      <div className="flex flex-col gap-4">
        
        {/* 3. Gunakan 'dummyAddresses' DARI CONTEXT */}
        {dummyAddresses.map((address) => (
          <AddressItem 
            key={address.id}
            address={address}
            // 4. SAMBUNGKAN KE STATE GLOBAL
            isSelected={shippingAddress?.id === address.id}
            onSelect={() => setShippingAddress(address)}
          />
        ))}

        {/* Tombol "Add New Address" */}
        <button className="flex items-center justify-center gap-2 w-full py-4 bg-green-50 text-green-700 font-medium rounded-lg border border-dashed border-green-300 hover:bg-green-100">
          <Plus size={20} />
          Add New Shipping Address
        </button>
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

// Komponen internal untuk satu item alamat (Tidak berubah)
function AddressItem({ address, isSelected, onSelect }) {
  return (
    <div 
      onClick={onSelect}
      className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 cursor-pointer"
    >
      <MapPin size={24} className="text-gray-500 flex-shrink-0" />
      <div className="flex-grow min-w-0">
        <h3 className="font-semibold text-gray-800">{address.title}</h3>
        <p className="text-sm text-gray-500 truncate">{address.street}</p>
      </div>
      
      {/* Tombol Radio Kustom */}
      <div className={`w-6 h-6 rounded-full flex-shrink-0 border-2 ${isSelected ? 'border-green-600' : 'border-gray-300'}`}>
        {isSelected && <div className="w-full h-full p-0.5"><div className="w-full h-full rounded-full bg-green-600"></div></div>}
      </div>
    </div>
  );
}

export default ShippingAddressPage;