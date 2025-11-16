// src/components/CategoryFilter.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import {
  CookingPot, 
  Cookie, 
  CupSoda, 
  SprayCan, 
  Pill
} from 'lucide-react';

const categories = [
  { name: 'Sembako', id: 'sembako', icon: <CookingPot size={28} /> },
  { name: 'Makanan', id: 'makanan', icon: <Cookie size={28} /> },
  { name: 'Minuman', id: 'minuman', icon: <CupSoda size={28} /> },
  { name: 'Kebersihan', id: 'kebersihan', icon: <SprayCan size={28} /> },
  { name: 'Obat-obatan', id: 'obat', icon: <Pill size={28} /> },
];

function CategoryFilter() {
  return (
    <div className="pt-4">
      <h2 className="text-lg font-bold text-gray-900 mb-3">
        Category
      </h2>
      
      {/* MODIFIKASI DI SINI:
        - MOBILE: 'flex-wrap' (biarkan item turun baris) + 'justify-center' (agar rapi di tengah)
        - DESKTOP: 'lg:flex-nowrap' (paksa jadi 1 baris) + 'lg:justify-around' (beri jarak merata)
      */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 pb-2
                      lg:flex-nowrap lg:justify-around">
        
        {categories.map((category) => {
          return (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              // 'w-20' memberi lebar tetap, 'flex-shrink-0' penting untuk desktop
              className="flex flex-col items-center gap-2 flex-shrink-0 w-15"
            >
              {/* Lingkaran Ikon */}
              <span 
                className={`flex items-center justify-center rounded-full p-4
                            transition-all duration-200
                            bg-green-100 text-green-700`}
              >
                {category.icon}
              </span>
              
              {/* Label Teks */}
              <span 
                className={`text-sm text-center font-medium whitespace-nowrap text-gray-700`}
              >
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryFilter;