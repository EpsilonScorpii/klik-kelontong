// src/components/AccordionItem.jsx

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// 'startIcon' adalah prop opsional untuk ikon di sebelah kiri (seperti di tab Contact Us)
function AccordionItem({ title, children, startIcon = null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Tombol ini adalah header yang bisa diklik */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-4 text-left"
      >
        <div className="flex items-center gap-3">
          {/* Tampilkan ikon jika ada */}
          {startIcon && (
            <span className="text-green-600">{startIcon}</span>
          )}
          <span className="font-semibold text-gray-800">{title}</span>
        </div>
        
        {/* Ikon panah akan berputar */}
        <ChevronDown 
          size={20} 
          className={`text-gray-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Konten ini hanya muncul jika 'isOpen' true */}
      {isOpen && (
        <div className="p-4 pt-0 text-gray-600 text-sm">
          {children}
        </div>
      )}
    </div>
  );
}

export default AccordionItem;