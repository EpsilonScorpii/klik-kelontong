// src/components/admin/StatCard.jsx

import React from 'react';

// 'data' akan menjadi array, e.g., [{ label: 'Produk', value: 'Minyak Goreng', sisa: 8 }]
function StatCard({ icon, title, value, data = [] }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Ikon */}
        <div className="text-green-600">
          {icon}
        </div>
        
        {/* Konten */}
        <div className="flex-grow">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          
          {/* Nilai Utama (jika ada) */}
          {value && (
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          )}

          {/* Data Detail (jika ada) */}
          {data.length > 0 && (
            <div className="mt-2 space-y-1">
              {data.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  {/* Bagian Kiri (Label) */}
                  <span className="text-gray-600">{item.label}</span>
                  {/* Bagian Kanan (Nilai) */}
                  <span className="font-medium text-gray-800">
                    {item.sisa !== undefined ? `${item.value} (Sisa: ${item.sisa})` : ''}
                    {item.terjual !== undefined ? `${item.value} (Terjual: ${item.terjual})` : ''}
                    {item.count !== undefined ? `${item.value}: ${item.count}` : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatCard;