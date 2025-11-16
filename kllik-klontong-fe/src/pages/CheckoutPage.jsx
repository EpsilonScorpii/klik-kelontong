// src/pages/CheckoutPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import OnboardingHeader from '../components/OnboardingHeader';
import { MapPin, Truck } from 'lucide-react';

// Fungsi helper (bisa kamu import dari file utils)
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

function CheckoutPage() {
  // 1. AMBIL SEMUA DATA DARI 'OTAK' GLOBAL
  const { cartItems, shippingAddress, shippingMethod } = useCart();

  return (
    // Tampilan mobile-first di desktop (sesuai permintaanmu)
    <div className="max-w-lg mx-auto pb-32">
      
      {/* Header Halaman */}
      <OnboardingHeader title="Checkout" />

      <div className="flex flex-col gap-6">
        
        {/* Bagian Alamat */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 font-medium">Shipping Address</h3>
            <Link to="/shipping-address" className="text-green-600 font-medium text-sm">Change</Link>
          </div>
          <div className="flex gap-3 mt-2">
            <MapPin size={20} className="text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800">{shippingAddress?.title}</h4>
              <p className="text-sm text-gray-500">{shippingAddress?.street}</p>
            </div>
          </div>
        </div>

        {/* Bagian Pengiriman */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 font-medium">Shipping Type</h3>
            <Link to="/shipping-method" className="text-green-600 font-medium text-sm">Change</Link>
          </div>
          <div className="flex gap-3 mt-2">
            <Truck size={20} className="text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800">{shippingMethod?.title}</h4>
              <p className="text-sm text-gray-500">{shippingMethod?.details}</p>
            </div>
          </div>
        </div>

        {/* Bagian Order List */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-gray-500 font-medium mb-3">Order List</h3>
          <div className="flex flex-col gap-4">
            {cartItems.map(item => (
              <CheckoutItem key={item.id} item={item} />
            ))}
          </div>
        </div>

      </div>

      {/* Tombol "Continue to Payment" yang fixed di bawah */}
      <div className="fixed bottom-[64px] left-0 right-0 z-40 lg:bottom-0">
        <div className="max-w-lg mx-auto bg-white p-4 border-t border-gray-200">
          <Link to="/payment-method" className="w-full">
            <button className="w-full bg-green-600 text-white text-lg font-medium py-3 px-6 rounded-full hover:bg-green-700">
              Continue to Payment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Komponen internal untuk 1 item di daftar Order
function CheckoutItem({ item }) {
  return (
    <div className="flex items-center gap-4">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-md bg-gray-50" />
      <div className="flex-grow">
        <h3 className="font-medium text-gray-800 text-sm">{item.name}</h3>
        <p className="text-xs text-gray-500">{`Size: - | Qty: ${item.quantity}pcs`}</p>
      </div>
      <span className="font-semibold">{formatRupiah(item.price * item.quantity)}</span>
    </div>
  );
}

export default CheckoutPage;