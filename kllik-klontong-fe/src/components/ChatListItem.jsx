// src/components/ChatListItem.jsx

import React from 'react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom'; // <-- 1. IMPORT LINK

function ChatListItem({ chat }) {
  return (
    // 2. BUNGKUS SEMUA DENGAN <Link>
    <Link 
      to={`/chat/${chat.id}`} // <-- Link dinamis
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
    >
      {/* Avatar/Ikon */}
      <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-700 text-white rounded-full">
        <User size={24} /> 
      </span>

      {/* Teks (Nama & Pesan) */}
      <div className="flex-grow min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{chat.sender}</h3>
        <p className="text-sm text-gray-500 truncate">{chat.message}</p>
      </div>

      {/* Meta (Waktu & Notif) */}
      <div className="flex-shrink-0 flex flex-col items-end gap-1">
        <span className="text-xs text-gray-400">{chat.timestamp}</span>
        {chat.unreadCount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {chat.unreadCount}
          </span>
        )}
      </div>
    </Link> // <-- 3. TUTUP LINK
  );
}

export default ChatListItem;