// src/pages/admin/DashboardPage.jsx

import React from 'react';
import StatCard from '../../components/admin/StatCard';
import { TrendingUp, ClipboardList, Archive, Wallet, Award } from 'lucide-react';

// --- DATA DUMMY (Nanti ganti dari API) ---
const totalPesananData = [
  { label: 'Pesanan Masuk', value: '', count: 10 },
  { label: 'Diproses', value: '', count: 6 },
  { label: 'Selesai', value: '', count: 34 },
];

const stokMenipisData = [
  { label: 'Produk', value: 'Minyak Goreng 2L', sisa: 8 },
  { label: 'Produk', value: 'Beras', sisa: 5 },
  { label: 'Produk', value: 'Gula Pasir 1kg', sisa: 3 },
];

const penjualanTerbanyakData = [
  { label: 'Produk', value: 'Minyak Goreng 2L', terjual: 24 },
  { label: 'Produk', value: 'Telur 1kg', terjual: 15 },
  { label: 'Produk', value: 'Beras 1kg', terjual: 12 },
];
// --- END DATA DUMMY ---

function DashboardPage() {
  return (
    // Grid responsif untuk kartu-kartu
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      
      <StatCard 
        icon={<TrendingUp size={32} />}
        title="Ringkasan Penjualan"
        value="Rp12.500.000"
      />
      
      <StatCard 
        icon={<ClipboardList size={32} />}
        title="Total Pesanan"
        data={totalPesananData}
      />
      
      <StatCard 
        icon={<Archive size={32} />}
        title="Stok Menipis"
        data={stokMenipisData}
      />
      
      <StatCard 
        icon={<Wallet size={32} />}
        title="Pendapatan & Keuntungan"
        value="Rp8.500.000"
      />
      
      <StatCard 
        icon={<Award size={32} />}
        title="Penjualan Produk Terbanyak"
        data={penjualanTerbanyakData}
      />
      
    </div>
  );
}

export default DashboardPage;