// src/components/NotificationListItem.jsx

import React from 'react';

function NotificationListItem({ notification }) {
  return (
    <div className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
      {/* Ikon */}
      <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
        {notification.icon}
      </span>

      {/* Teks (Judul & Pesan) */}
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800 truncate">{notification.title}</h3>
          <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{notification.timestamp}</span>
        </div>
        <p className="text-sm text-gray-500">{notification.message}</p>
      </div>
    </div>
  );
}

export default NotificationListItem;