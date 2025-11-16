// src/pages/AccountPage.jsx

import React, { useState } from 'react'; // <-- 1. IMPORT useState
import { useNavigate } from 'react-router-dom'; // <-- 2. IMPORT useNavigate
import { useAuth } from '../context/AuthContext';
import AccountMenuItem from '../components/AccountMenuItem';
import { 
  UserCircle, User, CreditCard, ClipboardList, 
  Settings, HelpCircle, Lock, LogOut, Ticket 
} from 'lucide-react';

const menuItems = [
  { label: 'Your Profile', icon: <User size={24} />, to: '/complete-profile' },
  { label: 'Payment Methods', icon: <CreditCard size={24} />, to: '/pembayaran' },
  { label: 'My Orders', icon: <ClipboardList size={24} />, to: '/aktivitas' },
  { label: 'My Coupons', icon: <Ticket size={24} />, to: '/coupon' },
  { label: 'Settings', icon: <Settings size={24} />, to: '/settings' },
  { label: 'Help Center', icon: <HelpCircle size={24} />, to: '/help' },
  { label: 'Privacy Policy', icon: <Lock size={24} />, to: '/privacy' },
  { label: 'Log Out', icon: <LogOut size={24} />, to: '#', isLogout: true }, // 'isLogout' tetap true
];

function AccountPage() {
  // 3. BUAT STATE UNTUK MODAL
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // 4. BUAT FUNGSI LOGOUT
  const handleLogout = async () => {
    // Tutup modal
    setIsLogoutModalOpen(false);

    await logout();
    
    // (Di sini kamu akan membersihkan data user, token, dll.)
    console.log('User logged out');
    
    // Arahkan ke halaman login
    navigate('/login');
  };

  return (
    <div className="pb-20">
      
      {/* ... (Judul Halaman & Bagian Profil) ... */}
      <div className="flex flex-col items-center justify-center py-6 bg-white lg:bg-transparent rounded-lg">
        <UserCircle size={100} className="text-gray-400" strokeWidth={1} />
        <h2 className="text-2xl font-bold text-gray-900 mt-3">
          Jahri
        </h2>
      </div>

      {/* Daftar Menu */}
      <div className="mt-6 flex flex-col gap-2">
        {menuItems.map((item) => (
          <AccountMenuItem 
            key={item.label}
            icon={item.icon}
            label={item.label}
            to={item.to}
            isLogout={item.isLogout}
            // 5. OPER FUNGSI 'onClick'
            // Hanya akan dijalankan jika 'isLogout' true
            onClick={() => setIsLogoutModalOpen(true)}
          />
        ))}
      </div>

      {/* 6. TAMBAHKAN JSX UNTUK MODAL */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          
          {/* Backdrop (dimmed background) */}
          <div 
            className="fixed inset-0 bg-black/40" 
            onClick={() => setIsLogoutModalOpen(false)} // Klik backdrop akan menutup modal
          ></div>
          
          {/* Konten Modal */}
          <div className="bg-white rounded-t-2xl p-6 w-full max-w-lg z-10">
            <h2 className="text-xl font-bold text-center mb-2">Logout</h2>
            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>
            
            {/* Tombol Aksi */}
            <div className="flex gap-3">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="w-full bg-green-100 text-green-700 font-medium py-3 rounded-full"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout} // <-- Panggil fungsi logout
                className="w-full bg-green-600 text-white font-medium py-3 rounded-full"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AccountPage;