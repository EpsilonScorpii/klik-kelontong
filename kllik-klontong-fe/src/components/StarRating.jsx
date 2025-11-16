// src/components/StarRating.jsx

import React, { useState } from 'react';
import { Star } from 'lucide-react';

// 'onChange' adalah fungsi yang akan kita kirim dari
// halaman 'ReviewPage' untuk menyimpan nilainya
function StarRating({ onChange }) {
  const [rating, setRating] = useState(0); // Rating yang sudah diklik
  const [hover, setHover] = useState(0);   // Rating yang sedang di-hover

  return (
    <div className="flex justify-center gap-2">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        
        return (
          <button
            type="button" // Penting agar tidak men-submit form
            key={starValue}
            className="transition-transform duration-150 ease-in-out"
            onClick={() => {
              setRating(starValue);
              if (onChange) {
                onChange(starValue); // Kirim nilai (misal: 3) ke parent
              }
            }}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              size={40} // Ukuran bintang (bisa disesuaikan)
              className={starValue <= (hover || rating) 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
              }
            />
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;