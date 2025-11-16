// src/components/CouponCard.jsx

import React from 'react';
import { Ticket } from 'lucide-react'; // Ikon untuk kupon

function CouponCard({ coupon }) {
  const { title, condition, benefit, isLocked } = coupon;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Bagian Atas (Info) */}
      <div className="p-4">
        <h3 className="font-bold text-base text-gray-800">{title}</h3>
        
        {/* Tampilkan kondisi jika kupon masih 'locked' */}
        {isLocked && (
          <p className="text-sm text-red-600 mt-2">{condition}</p>
        )}
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
          <Ticket size={20} className="text-green-600" />
          <span>{benefit}</span>
        </div>
      </div>

      {/* Bagian Bawah (Tombol) */}
      <button 
        className={`w-full p-3 font-medium text-sm
                    ${isLocked 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
        disabled={isLocked} // Tombol tidak bisa diklik jika 'locked'
      >
        {isLocked ? 'USE COUPON' : 'USE COUPON'}
      </button>
    </div>
  );
}

export default CouponCard;