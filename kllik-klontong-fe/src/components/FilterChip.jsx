// src/components/FilterChip.jsx
import React from 'react';

function FilterChip({ label, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-5 rounded-full text-sm font-medium transition-colors
        ${isSelected
          ? 'bg-green-600 text-white'
          : 'bg-green-100 text-green-700 hover:bg-green-200'
        }
      `}
    >
      {label}
    </button>
  );
}

export default FilterChip;