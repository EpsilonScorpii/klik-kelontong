// src/pages/LocationPage.jsx

import React, { useState } from 'react'; // <-- 1. IMPORT useState
import { Link, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

function LocationPage() {
  const navigate = useNavigate();
  // 2. BUAT STATE UNTUK PESAN ERROR
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAllowLocation = () => {
    // Hapus error lama jika ada
    setErrorMessage(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // FUNGSI SUKSES (Tidak berubah)
        (position) => {
          console.log('Lokasi didapat:', position.coords.latitude, position.coords.longitude);
          navigate('/home'); 
        },
        
        // FUNGSI GAGAL (Kita ubah!)
        (error) => {
          console.error('Error mendapatkan lokasi:', error.message);
          
          // 3. SET PESAN ERROR, JANGAN ALERT ATAU NAVIGATE
          if (error.code === 1) { // User denied permission
            setErrorMessage('Izin lokasi diblokir. Silakan masukkan lokasi secara manual.');
          } else {
            setErrorMessage('Gagal mendapatkan lokasi. Silakan coba lagi atau masukkan manual.');
          }
        }
      );
    } else {
      setErrorMessage('Browser Anda tidak mendukung Geolocation. Silakan masukkan manual.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center pt-10">
      <span className="p-5 bg-green-100 rounded-full">
        <MapPin size={48} className="text-green-700" />
      </span>
      
      <h1 className="text-2xl font-bold text-gray-800 mt-6">
        What is Your Location?
      </h1>
      
      <p className="text-gray-600 mt-3 mb-10 px-4">
        We need to know your location in order to suggest nearby services.
      </p>

      {/* 4. TAMPILKAN PESAN ERROR JIKA ADA */}
      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">
          {errorMessage}
        </p>
      )}
      
      <button 
        onClick={handleAllowLocation}
        className="w-full bg-green-600 text-white text-lg font-medium py-4 px-6 rounded-full hover:bg-green-700"
      >
        Allow Location Access
      </button>
      
      <Link 
        to="/search-location"
        className="mt-6 text-sm text-green-600 font-medium"
      >
        Enter Location Manually
      </Link>
    </div>
  );
}

export default LocationPage;