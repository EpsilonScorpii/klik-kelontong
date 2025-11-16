// src/pages/CouponPage.jsx

import React from 'react';
import CouponCard from '../components/CouponCard';
import OnboardingHeader from '../components/OnboardingHeader'; // Kita pakai ulang header

// --- DATA DUMMY (Nanti ganti dari API) ---
const dummyCoupons = [
  {
    id: 1,
    title: 'GRATIS ONGKIR RP 5000',
    condition: 'Add items worth Rp 50.000 more to unlock',
    benefit: 'Get Free Delivery Up to Rp 5000',
    isLocked: true, // Kupon ini masih terkunci
  },
  {
    id: 2,
    title: 'CASHBACK 5%',
    condition: 'Add items worth Rp 50.000 more to unlock',
    benefit: 'Get 5% OFF',
    isLocked: true,
  },
  {
    id: 3,
    title: 'DISKON PEMBELANJAAN RP 10.000',
    condition: null, // Kupon ini tidak terkunci
    benefit: 'Min. spend Rp 100.000',
    isLocked: false,
  },
];
// --- END DATA DUMMY ---

function CouponPage() {
  return (
    // Kita buat full-width di desktop (seperti MessagePage)
    <div className="pb-20">
      
      {/* Header Halaman (Tombol Kembali & Judul) */}
      <OnboardingHeader title="Coupon" />
      
      {/* Judul Sub-bagian */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Best offers for you
      </h2>

      {/* Daftar Kupon */}
      <div className="flex flex-col gap-4">
        {dummyCoupons.map(coupon => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </div>
    </div>
  );
}

export default CouponPage;