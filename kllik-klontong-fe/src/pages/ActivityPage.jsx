// src/pages/ActivityPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Untuk tombol kembali
import { ArrowLeft } from 'lucide-react'; // Ikon tombol kembali
import ActivityItemCard from '../components/ActivityItemCard';
import defaultImage from '../assets/image/image-default.jpeg';

// --- DATA DUMMY (Nanti ganti dari API) ---
const DUMMY_ACTIVITIES = [
  // Tab "Active"
  { id: 'order1', name: 'Minyak Goreng Bimoli 2L', details: 'Size: 2L | Qty: 1pcs', price: 45000, image: defaultImage, status: 'active' },
  { id: 'order2', name: 'Beras Sania 5kg', details: 'Size: 5kg | Qty: 1pcs', price: 78500, image: defaultImage, status: 'active' },
  
  // Tab "Completed"
  { id: 'order3', name: 'Indomie Goreng', details: 'Qty: 5pcs', price: 15000, image: defaultImage, status: 'completed' },
  { id: 'order4', name: 'Masako Rasa Ayam', details: 'Qty: 10pcs', price: 5000, image: defaultImage, status: 'completed' },
  
  // Tab "Cancelled"
  { id: 'order5', name: 'Shampoo Pantene', details: 'Size: 160ml | Qty: 1pcs', price: 25000, image: defaultImage, status: 'cancelled' },
  { id: 'order6', name: 'Sirup Marjan', details: 'Size: - | Qty: 1pcs', price: 15000, image: defaultImage, status: 'cancelled' },
];
// --- END DATA DUMMY ---


function ActivityPage() {
  // 1. State untuk melacak tab yang aktif
  const [activeTab, setActiveTab] = useState('Active');
  const navigate = useNavigate(); // Hook untuk navigasi

  const tabs = ['Active', 'Completed', 'Cancelled'];

  // 2. Logika untuk mem-filter data
  const filteredActivities = DUMMY_ACTIVITIES.filter(
    item => item.status === activeTab.toLowerCase()
  );

  // 3. Logika untuk teks tombol
  let buttonText = 'Track Order'; // Default
  if (activeTab === 'Completed') buttonText = 'Review';
  if (activeTab === 'Cancelled') buttonText = 'Re-Order';

  return (
    // Kita pakai padding bawaan dari App.jsx (p-4), jadi tidak perlu padding di sini
    // 'pb-20' agar list tidak tertutup BottomNav
    <div className="pb-20">

      {/* Header Halaman (Tombol Kembali & Judul) */}
      <div className="flex items-center relative justify-center mb-4">
        <button 
          onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
          className="absolute left-0 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Aktivitas</h1>
      </div>

      {/* Navigasi Tab */}
      <nav className="flex justify-between border-b border-gray-200 mb-4">
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full py-3 text-center font-medium text-sm
                ${isActive
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {tab}
            </button>
          );
        })}
      </nav>

      {/* Daftar Konten (List) */}
      <div className="flex flex-col gap-4">
        {filteredActivities.length > 0 ? (
          filteredActivities.map(item => (
            <ActivityItemCard 
              key={item.id} 
              item={item} 
              buttonText={buttonText} 
            />
          ))
        ) : (
          // Pesan jika tidak ada data
          <div className="text-center text-gray-500 mt-10">
            <p>Tidak ada aktivitas di tab "{activeTab}".</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default ActivityPage;