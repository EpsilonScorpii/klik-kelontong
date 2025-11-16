// src/layouts/AdminLayout.jsx

import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, Search, X, LayoutDashboard, Package, ClipboardList, 
  Users, Truck, Settings, BarChart, HelpCircle, LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// --- Komponen AdminSidebar (internal) ---
function AdminSidebar({ isOpen }) { // Hapus 'onClose', kita akan kelola dari 'isOpen'
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { name: 'Beranda', to: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Manajemen Produk', to: '/admin/products', icon: <Package size={20} /> },
    { name: 'Manajemen Pesanan', to: '/admin/orders', icon: <ClipboardList size={20} /> },
    // ... (Tambahkan sisa link-mu di sini)
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    // 1. MODIFIKASI: Hapus 'fixed' dan 'lg:sticky'.
    // Sidebar sekarang menjadi bagian dari flex-box utama.
    // 'w-0' akan menyembunyikannya, 'w-72' akan menampilkannya.
    <nav 
      className={`h-screen bg-green-800 text-white flex flex-col
                  transition-all duration-300 overflow-hidden
                  ${isOpen ? 'w-72' : 'w-0'}`}
    >
      {/* 2. Kita bungkus konten di 'div' agar tidak "wrap" saat mengecil */}
      <div className="w-72 p-6 flex flex-col h-full">
        <h2 className="text-2xl font-bold mb-8">Klik Kelontong</h2>
        
        <ul className="flex flex-col gap-2">
          {links.map(link => {
            const isActive = location.pathname.startsWith(link.to);
            return (
              <li key={link.name}>
                <Link 
                  to={link.to} 
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-green-600 text-white' 
                      : 'text-green-100 text-opacity-80 hover:bg-green-700 hover:text-white'
                    }`}
                >
                  {link.icon}
                  <span className="text-base font-medium">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Tombol Logout (didorong ke bawah) */}
        <div className="mt-auto">
          <button 
            onClick={handleLogout}
            className={`flex items-center gap-3 p-3 rounded-lg w-full
                        text-red-300 hover:bg-red-700 hover:text-white
                        transition-colors`}
          >
            <LogOut size={20} />
            <span className="text-base font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </nav>
    // 3. HAPUS Backdrop dan Tombol 'X' (tidak diperlukan lagi)
  );
}

// --- Komponen AdminHeader (internal) ---
function AdminHeader({ onMenuClick, title }) {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {/* 4. MODIFIKASI: Hapus 'lg:hidden'
           Tombol ini sekarang selalu terlihat */}
        <button onClick={onMenuClick} className="text-gray-700">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>
      <button className="text-gray-700">
        <Search size={24} />
      </button>
    </header>
  );
}

// --- Komponen Layout Utama ---
function AdminLayout() {
  // 5. MODIFIKASI: Default state sekarang 'true' (terbuka)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const pageTitle = "Dashboard"; 

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar akan 'collapsing' (buka-tutup) */}
      <AdminSidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* 6. MODIFIKASI: 'onMenuClick' sekarang menjadi 'toggle' */}
        <AdminHeader 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title={pageTitle}
        />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;