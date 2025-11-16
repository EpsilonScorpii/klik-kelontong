// src/layouts/OnboardingLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';

function OnboardingLayout() {
  return (
    // Wrapper luar: Penuhi layar, tengahkan item (untuk desktop)
    // 'p-4' memberi jarak di mobile & desktop
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-4">
      
      {/* Wrapper dalam (konten "HP" / "Kartu") */}
      {/* Mobile (default): Lebar penuh, Tinggi penuh
        Desktop (lg:): Lebar dibatasi (max-w-lg), Tinggi otomatis (h-auto),
                       Margin atas-bawah (my-8), Sudut bulat (rounded-lg)
      */}
      <div className="relative flex flex-col w-full bg-white max-w-lg mx-auto shadow-lg 
                    h-screen lg:h-auto lg:my-8 lg:rounded-lg overflow-hidden">
        
        {/* Konten (Outlet) */}
        {/* Mobile: 'flex-1' (isi sisa ruang), 'overflow-y-auto' (bisa scroll), 'p-6'
          Desktop: 'h-auto' (tinggi otomatis), 'p-8' (padding lebih besar)
        */}
        <main className="flex-1 overflow-y-auto p-6 lg:h-auto lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default OnboardingLayout;