// src/pages/TrackOrderPage.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OnboardingHeader from '../components/OnboardingHeader';
import TimelineStep from '../components/TimelineStep'; // <-- Komponen baru kita
import { ClipboardList, Box, Truck, PackageCheck } from 'lucide-react'; // Ikon untuk timeline

// --- DATA DUMMY (Nanti ganti dari API) ---
// Ini adalah data yang HARUSNYA sama dengan yang ada di 'ActivityPage'
const DUMMY_ORDER_DATA = {
  'order1': {
    product: {
      name: 'Minyak Goreng Bimoli 2L',
      details: 'Size: 2L | Qty: 1pcs',
      price: 45000,
      image: 'https://i.ibb.co/68q38sH/bimoli.png'
    },
    deliveryDate: '20 Des 2024',
    trackingId: 'TRK123456789',
    statuses: [
      { title: 'Order Placed', time: '20 Des 2024, 08:00 AM', icon: <ClipboardList size={20} />, isComplete: true },
      { title: 'In Progress', time: '20 Des 2024, 09:00 AM', icon: <Box size={20} />, isComplete: true },
      { title: 'Shipped', time: '20 Des 2024, 09:30 AM', icon: <Truck size={20} />, isComplete: false },
      { title: 'Delivered', time: '20 Des 2024, 10:00 AM', icon: <PackageCheck size={20} />, isComplete: false },
    ]
  },
  // ... (kamu bisa tambahkan data untuk 'order2', 'order3', dst.)
};
// --- END DATA DUMMY ---

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

function TrackOrderPage() {
  const { orderId } = useParams(); // <-- Membaca 'order1' dari URL
  
  // Ambil data order yang sesuai. Di aplikasi nyata, ini adalah 'fetch' API.
  const order = DUMMY_ORDER_DATA[orderId];

  if (!order) {
    return (
      <div>
        <OnboardingHeader title="Track Order" />
        <p className="text-center">Order tidak ditemukan.</p>
      </div>
    );
  }

  return (
    // Kita buat full-width di desktop (seperti MessagePage)
    <div className="pb-20">
      
      {/* Header Halaman */}
      <OnboardingHeader title="Track Order" />

      {/* 1. Ringkasan Produk */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-100 mb-6">
        <img src={order.product.image} alt={order.product.name} className="w-20 h-20 object-contain rounded-md bg-gray-50" />
        <div className="flex-grow min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">{order.product.name}</h3>
          <p className="text-sm text-gray-500">{order.product.details}</p>
          <p className="text-base font-bold text-gray-900 mt-1">{formatRupiah(order.product.price)}</p>
        </div>
      </div>

      {/* 2. Order Details */}
      <div className="bg-white p-4 rounded-lg border border-gray-100 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Expected Delivery Date</span>
            <span className="font-medium text-gray-800">{order.deliveryDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tracking ID</span>
            <span className="font-medium text-gray-800">{order.trackingId}</span>
          </div>
        </div>
      </div>

      {/* 3. Order Status (Timeline) */}
      <div className="bg-white p-4 rounded-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Status</h3>
        <div className="flex flex-col">
          {order.statuses.map((status, index) => (
            <TimelineStep
              key={status.title}
              icon={status.icon}
              title={status.title}
              time={status.time}
              isComplete={status.isComplete}
              isLastStep={index === order.statuses.length - 1} // Cek apakah ini item terakhir
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default TrackOrderPage;