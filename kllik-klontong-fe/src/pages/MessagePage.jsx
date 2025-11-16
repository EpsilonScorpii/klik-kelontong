// src/pages/MessagePage.jsx

import React, { useState } from 'react';
import ChatListItem from '../components/ChatListItem';
import NotificationListItem from '../components/NotificationListItem';

// Ikon untuk notifikasi
import { Truck, Star } from 'lucide-react';

// --- DATA DUMMY (Nanti ganti dari API) ---
const dummyChats = [
  { id: 1, sender: 'ABC Mart', message: 'Oke Pak sebentar lagi diantar', timestamp: '10/12/24', unreadCount: 1 },
  { id: 2, sender: '123 Mart', message: 'Terimakasih pak', timestamp: '9/12/24', unreadCount: 0 },
];

const dummyNotifications = [
  { id: 1, title: 'Order Shipped', message: 'Pesananmu sedang dalam perjalanan!', timestamp: '1h', icon: <Truck size={24} /> },
  { id: 2, title: 'Review Product', message: 'Terima kasih telah berbelanja di Klik Klontong...', timestamp: '9h', icon: <Star size={24} /> },
  { id: 3, title: 'Review Product', message: 'Bagaimana pengalaman Anda dengan produk...', timestamp: '12h', icon: <Star size={24} /> },
];
// --- END DATA DUMMY ---


function MessagePage() {
  const [activeTab, setActiveTab] = useState('Chat'); // Default 'Chat'

  return (
    // Wrapper agar di desktop tetap terlihat seperti mobile
    <div className="pb-20">
      
      {/* Judul Halaman */}
      <div className="flex items-center relative justify-center mb-4">
        <h1 className="text-xl font-bold text-gray-900">Kotak Masuk</h1>
      </div>

      {/* Navigasi Tab (Pill) */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => setActiveTab('Chat')}
          className={`py-2 px-4 rounded-full font-medium transition-colors
            ${activeTab === 'Chat' 
              ? 'bg-green-600 text-white' 
              : 'bg-green-100 text-green-700'
            }
          `}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab('Notifikasi')}
          className={`py-2 px-4 rounded-full font-medium transition-colors
            ${activeTab === 'Notifikasi' 
              ? 'bg-green-600 text-white' 
              : 'bg-green-100 text-green-700'
            }
          `}
        >
          Notifikasi
        </button>
      </div>

      {/* Daftar Konten (List) */}
      <div className="flex flex-col gap-4">
        {/* Tampilkan list berdasarkan tab yang aktif */}
        {activeTab === 'Chat' && (
          dummyChats.map(chat => (
            <ChatListItem key={chat.id} chat={chat} />
          ))
        )}
        
        {activeTab === 'Notifikasi' && (
          dummyNotifications.map(notification => (
            <NotificationListItem key={notification.id} notification={notification} />
          ))
        )}
      </div>

    </div>
  );
}

export default MessagePage;