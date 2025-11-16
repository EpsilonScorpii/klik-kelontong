// src/App.jsx

import { Outlet } from 'react-router-dom';
import {useState} from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50"> {/* Ganti min-h-screen jadi h-screen */}
      
      {/* 1. Header (Harus STATIS, BUKAN sticky) */}
      <Header onToggleSidebar={toggleSidebar}/>

      {/* 2. Wrapper Konten Utama */}
      {/* 'flex-1' -> Ambil sisa tinggi
          'flex' -> Bikin Sidebar + Main berdampingan
          'overflow-hidden' -> Mencegah double scrollbar
      */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* 2a. Sidebar */}
        <Sidebar isOpen={isSidebarOpen}/>

        {/* 2b. Konten Halaman Utama (Tempat Outlet) */}
        {/* INI BAGIAN PENTING:
            'flex-1' -> Ambil sisa lebar
            'overflow-y-auto' -> HANYA area ini yang bisa di-scroll, 
                                 bukan seluruh halaman. Ini yang kamu mau.
        */}
        <main className="flex-1 overflow-y-auto">
          {/* Konten (HomePage, dll) akan muncul di sini */}
          {/* Kita beri padding di sini, BUKAN di PromoCarousel */}
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      
      </div>

      {/* 3. Navigasi Bawah (Hanya mobile) */}
      <BottomNav />
      
    </div>
  );
}

export default App;