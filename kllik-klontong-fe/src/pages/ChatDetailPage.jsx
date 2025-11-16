// src/pages/ChatDetailPage.jsx

import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, UserCircle, Plus, Mic } from 'lucide-react';

// --- DATA DUMMY (Nanti ganti dari API) ---
// Di aplikasi nyata, kamu akan 'fetch' chat ini berdasarkan 'chatId'
const dummyChatHistory = {
  "1": { 
    contact: { id: 1, name: 'ABC Mart', status: 'Online', avatar: null }, // (Kontak saya ganti jadi Angel sesuai desain)
    messages: [
      { id: 'msg1', sender: 'Angel', type: 'text', content: 'Pagi Pak, saya ingin pesan minyak Bimoli 2L dan gula 1kg, ke Jalan Merak 4 no40 RT04/RW02', time: '08:30 AM' },
      { id: 'msg2', sender: 'Jahri', type: 'text', content: 'Siang, baik Bu pesanan akan saya siapkan, dan segera diantar. Bisa foto depan rumahnya Bu?', time: '08:30 AM' },
      { id: 'msg3', sender: 'Angel', type: 'image', content: 'https://i.imgur.com/gK23S1D.png', time: '08:30 AM' }, // (Saya ganti URL gambar agar valid)
      { id: 'msg4', sender: 'Jahri', type: 'audio', content: 'url/to/audio.mp3', time: '08:30 AM' },
    ]
  },
  // Kunci "2" (sebagai string) akan cocok dengan URL /chat/2
  "2": {
    contact: { id: 2, name: '123 Mart', status: 'Offline', avatar: null },
    messages: [
      { id: 'msg1', sender: 'Jahri', type: 'text', content: 'Pesanan saya sudah sampai?', time: '09:00 AM' },
      { id: 'msg2', sender: '123 Mart', type: 'text', content: 'Terimakasih pak', time: '09:01 AM' },
    ]
  }
  // ... (data untuk chat2, chat3, dst.)
};
// --- END DATA DUMMY ---


function ChatDetailPage() {
  const { chatId } = useParams(); // <-- Membaca ID dari URL (misal: 'chat1')
  const navigate = useNavigate();

  // Ambil data chat. Jika tidak ada, tampilkan error.
  const chat = dummyChatHistory[chatId];
  if (!chat) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">Chat tidak ditemukan</h1>
        <Link to="/pesan" className="text-green-600">Kembali ke Kotak Masuk</Link>
      </div>
    );
  }

  return (
    // 'h-full' penting agar bisa dibagi jadi 3 bagian
    // 'pb-16' agar 'BottomNav' tidak menutupi 'ChatInput'
    <div className="flex flex-col h-full pb-16">
      
      {/* 1. HEADER (Kustom, bukan OnboardingHeader) */}
      <header className="flex items-center gap-3 p-3 border-b border-gray-200">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} />
        </button>
        {/* Avatar */}
        <span className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
          <UserCircle size={24} />
        </span>
        {/* Nama & Status */}
        <div>
          <h2 className="font-semibold">{chat.contact.name}</h2>
          <p className="text-xs text-green-600">{chat.contact.status}</p>
        </div>
      </header>

      {/* 2. CHAT LOG (Bisa di-scroll) */}
      {/* 'flex-grow' membuatnya mengisi sisa ruang */}
      {/* 'overflow-y-auto' membuatnya bisa di-scroll */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        
        {/* Garis Tanggal */}
        <div className="text-center text-xs text-gray-400 my-2">Hari Ini</div>

        {/* Loop semua pesan */}
        {chat.messages.map(msg => (
          <ChatBubble key={msg.id} message={msg} contact={chat.contact} />
        ))}
        
      </div>

      {/* 3. INPUT FOOTER (Fixed di Bawah) */}
      {/* 'bottom-[64px]' -> Nempel di atas BottomNav */}
      <div className="fixed bottom-[64px] left-0 right-0 z-10 lg:bottom-0">
        <div className="max-w-lg mx-auto bg-white p-3 border-t border-gray-200 flex items-center gap-2">
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <Plus size={24} className="text-gray-600" />
          </button>
          <input 
            type="text"
            placeholder="Type a message here..."
            className="flex-grow p-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none"
          />
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <Mic size={24} className="text-gray-600" />
          </button>
        </div>
      </div>

    </div>
  );
}

// --- Komponen Internal untuk Chat Bubble ---
function ChatBubble({ message, contact }) {
  const isSent = message.sender === 'Jahri'; // Asumsi 'Jahri' adalah user

  // Tentukan konten bubble
  let content = null;
  if (message.type === 'text') {
    content = <p className="text-sm">{message.content}</p>;
  } 
  else if (message.type === 'image') {
    content = <img src={message.content} alt="chat" className="rounded-lg max-w-xs" />;
  } 
  else if (message.type === 'audio') {
    content = (
      <div className="flex items-center gap-2">
        <button className="bg-gray-300 p-2 rounded-full">▶</button>
        <div className="w-32 h-1 bg-gray-300 rounded-full"></div> {/* (Waveform palsu) */}
      </div>
    );
  }

  // Tampilan "Sent" (Kanan)
  if (isSent) {
    return (
      <div className="flex justify-end gap-2">
        <div className="bg-green-100 rounded-lg rounded-br-none p-3 max-w-sm">
          {content}
          <span className="text-xs text-gray-400 float-right mt-1">{message.time}</span>
        </div>
        <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">J</span>
      </div>
    );
  }

  // Tampilan "Received" (Kiri)
  return (
    <div className="flex justify-start gap-2">
      <span className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">A</span>
      <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3 max-w-sm">
        {content}
        <span className="text-xs text-gray-400 float-right mt-1">{message.time}</span>
      </div>
    </div>
  );
}

export default ChatDetailPage;