// src/components/CartItemCard.jsx

import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // <-- Pakai "otak" kita
import { Plus, Minus, Trash2 } from 'lucide-react';

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

function CartItemCard({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      // Jika sisa 1, tampilkan modal konfirmasi
      setIsModalOpen(true);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-4 bg-white">
        {/* Gambar */}
        <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-md flex items-center justify-center p-1">
          <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
        </div>

        {/* Info Teks */}
        <div className="flex-grow min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
          <p className="text-sm text-gray-500">{`Size: - | Qty: ${item.quantity}pcs`}</p>
          <p className="text-base font-bold text-gray-900 mt-1">{formatRupiah(item.price)}</p>
        </div>

        {/* Stepper Kuantitas */}
        <div className="flex items-center gap-3">
          <button onClick={handleDecrease} className="p-1.5 bg-gray-100 rounded-md">
            {item.quantity === 1 ? <Trash2 size={16} className="text-red-500" /> : <Minus size={16} />}
          </button>
          <span className="font-medium">{item.quantity}</span>
          <button onClick={handleIncrease} className="p-1.5 bg-gray-100 rounded-md">
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus (sesuai image_cbce7f.png) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/30" onClick={() => setIsModalOpen(false)}></div>
          
          {/* Konten Modal */}
          <div className="bg-white rounded-t-2xl p-6 w-full max-w-lg z-10">
            <h2 className="text-xl font-bold text-center mb-4">Remove from Cart</h2>
            
            {/* Item Info (seperti di desain) */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
              <div className="flex-grow">
                <h3>{item.name}</h3>
                <p className="text-sm text-gray-500">{`Size: - | Qty: ${item.quantity}pcs`}</p>
                <p className="font-bold">{formatRupiah(item.price)}</p>
              </div>
              {/* Desainmu ada stepper di modal, tapi kita sederhanakan */}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-green-100 text-green-700 font-medium py-3 rounded-full"
              >
                Cancel
              </button>
              <button 
                onClick={handleRemove}
                className="w-full bg-green-600 text-white font-medium py-3 rounded-full"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartItemCard;