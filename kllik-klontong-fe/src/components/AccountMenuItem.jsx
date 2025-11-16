// src/components/AccountMenuItem.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// 1. TAMBAHKAN 'onClick' SEBAGAI PROP
function AccountMenuItem({ icon, label, to, isLogout = false, onClick }) {
  
  const content = (
    <div 
      className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer
                  ${isLogout 
                    ? 'text-red-600 hover:bg-red-50' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
    >
      <span className={isLogout ? 'text-red-600' : 'text-green-600'}>
        {icon}
      </span>
      <span className="flex-grow font-medium">{label}</span>
      {!isLogout && <ChevronRight size={20} className="text-gray-400" />}
    </div>
  );

  if (isLogout) {
    return (
      // 2. GUNAKAN 'onClick' YANG DIOPER DARI PARENT
      // Hapus 'alert()'
      <button onClick={onClick} className="w-full">
        {content}
      </button>
    );
  }

  return (
    <Link to={to} className="w-full">
      {content}
    </Link>
  );
}

export default AccountMenuItem;