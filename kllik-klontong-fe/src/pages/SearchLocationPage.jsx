// src/pages/SearchLocationPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Navigation, Search } from 'lucide-react';

function SearchLocationPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full"> {/* Hapus padding 'p-6' dari layout */}
      {/* Header Halaman */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-200">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Search</h1>
      </div>

      {/* Konten */}
      <div className="p-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </span>
          <input 
            type="text" 
            placeholder="Mercu Buana"
            className="w-full border border-gray-300 rounded-lg p-3 pl-10 pr-10"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <X size={20} />
          </button>
        </div>

        {/* Current Location */}
        <button className="flex items-center gap-3 text-green-600 font-medium mb-6">
          <Navigation size={20} />
          <span>Use my current location</span>
        </button>

        {/* Search Result */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase mb-2">Search Result</h2>
          <div className="border-b border-gray-100 py-3">
            <h3 className="font-semibold">Mercu Buana</h3>
            <p className="text-sm text-gray-500">Jl. Raya, RT.4/RW.1, Meruya Sel, Kec. Kembangan</p>
          </div>
        </div>
      </div>
      
      {/* (Tidak ada keyboard, ini hanya gambar di desain) */}
    </div>
  );
}
export default SearchLocationPage;