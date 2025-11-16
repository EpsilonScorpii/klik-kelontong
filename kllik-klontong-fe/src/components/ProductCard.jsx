// src/components/ProductCard.jsx

import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

function ProductCard({ id, name, price, imageUrl, rating, sold }) {
  return (
    <Link to={`/product/${id}`} className="flex">
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
      
      <div className="w-full h-48 flex items-center justify-center p-4 bg-white overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="max-h-full max-w-full object-contain" 
        />
      </div>
      
      {/* 1. UBAH p-4 MENJADI p-3 DI SINI */}
      <div className="p-3 flex flex-col flex-grow">
        
        <h3 className="font-medium text-gray-800 text-sm mb-1 flex-grow">
          {name}
        </h3>
        
        <p className="font-bold text-gray-900 text-base mb-3">
          {formatRupiah(price)}
        </p>
        
        <div className="flex items-center justify-between text-xs">
          
          {/* 2. TAMBAHKAN 'min-w-0' DI SINI */}
          <div className="flex items-center gap-1 text-gray-500 min-w-0">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="font-medium text-gray-700">{rating}</span>
            <span>•</span>
            <span className="truncate">{sold} terjual</span>
          </div>
          
          <button className="bg-green-600 text-white font-medium py-2 px-3 rounded-lg 
                             hover:bg-green-700 focus:outline-none focus:ring-2 
                             focus:ring-green-500 transition-colors flex-shrink-0">
            Beli
          </button>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default ProductCard;