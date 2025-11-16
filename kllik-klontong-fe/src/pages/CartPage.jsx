// src/pages/CartPage.jsx
import React, { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItemCard from '../components/CartItemCard';
import OnboardingHeader from '../components/OnboardingHeader'; // Kita pakai ulang header

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

function CartPage() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // 1. Kalkulasi Total
  const subTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const deliveryFee = 5000; // Contoh statis
  const discount = 0; // Contoh statis
  const totalCost = subTotal + deliveryFee - discount;

  return (
    // Tampilan mobile-first di desktop (sesuai permintaanmu sebelumnya)
    <div className="max-w-lg mx-auto pb-52"> {/* Padding bawah besar untuk footer */}
      
      {/* Header Halaman (Tombol Kembali & Judul) */}
      <OnboardingHeader title="My Cart" />

      {/* Daftar Item */}
      <div className="flex flex-col gap-6">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <CartItemCard key={item.id} item={item} />
          ))
        ) : (
          <p className="text-center text-gray-500">Keranjangmu masih kosong.</p>
        )}
      </div>

      {/* Footer Checkout (fixed di bawah) */}
      <div className="fixed bottom-[64px] left-0 right-0 z-40 
                      lg:bottom-0">
        
        {/* Wrapper untuk menengahkan (mengikuti layout max-w-lg) */}
        <div className="max-w-lg mx-auto bg-white border-t border-gray-200 p-4 shadow-lg">
          
          {/* Promo Code */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">Promo Code</label>
              <Link to="/coupon" className="text-sm font-medium text-green-600 hover:underline">
                View Coupons
              </Link>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter code" 
                className="flex-grow border border-gray-300 rounded-lg p-3 text-sm"
              />
              <button className="bg-green-600 text-white font-medium px-6 rounded-lg">
                Apply
              </button>
            </div>
          </div>

          {/* Rincian Biaya */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Sub-total</span>
              <span className="font-medium">{formatRupiah(subTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium">{formatRupiah(deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discount</span>
              <span className="font-medium">{formatRupiah(discount)}</span>
            </div>
            <div className="flex justify-between font-bold text-base">
              <span>Total Cost</span>
              <span>{formatRupiah(totalCost)}</span>
            </div>
          </div>

          {/* Tombol Checkout */}
          <Link to="/shipping-address" className="w-full">
            <button className="w-full bg-green-600 text-white text-lg font-medium py-3 px-6 rounded-full hover:bg-green-700">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;