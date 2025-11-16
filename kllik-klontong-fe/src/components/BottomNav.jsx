// src/components/BottomNav.jsx

import { NavLink } from 'react-router-dom';
// Impor ikon-ikon yang kita butuhkan
import { 
  BiHomeAlt, 
  BiNotepad, 
  BiWallet, 
  BiMessageSquareDetail, 
  BiUser 
} from 'react-icons/bi';

function BottomNav() {
  
  // Ini adalah function helper untuk class kita.
  // NavLink akan memberi tahu kita jika link-nya "isActive".
  const getNavLinkClass = ({ isActive }) => {
    // Class dasar yang selalu ada
    let classes = "flex flex-col items-center justify-center p-2 pt-3 w-full hover:bg-green-50 hover:text-green-600";
    
    if (isActive) {
      // Tambahkan class ini jika link-nya sedang aktif
      classes += " text-green-600"; // Warna hijau untuk link aktif
    } else {
      // Tambahkan class ini jika link-nya tidak aktif
      classes += " text-gray-500"; // Warna abu-abu untuk link non-aktif
    }
    return classes;
  };

  return (
    // 'lg:hidden' adalah class KUNCI untuk menyembunyikannya di desktop
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-inner lg:hidden">
      <div className="flex justify-around">
        
        <NavLink to="/home" className={getNavLinkClass} end>
          <BiHomeAlt size={22} />
          <span className="text-xs font-medium mt-1">Beranda</span>
        </NavLink>

        <NavLink to="/aktivitas" className={getNavLinkClass}>
          <BiNotepad size={22} />
          <span className="text-xs font-medium mt-1">Aktivitas</span>
        </NavLink>

        <NavLink to="/pembayaran" className={getNavLinkClass}>
          <BiWallet size={22} />
          <span className="text-xs font-medium mt-1">Pembayaran</span>
        </NavLink>

        <NavLink to="/pesan" className={getNavLinkClass}>
          <BiMessageSquareDetail size={22} />
          <span className="text-xs font-medium mt-1 whitespace-nowrap">Kotak Masuk</span>
        </NavLink>

        <NavLink to="/akun" className={getNavLinkClass}>
          <BiUser size={22} />
          <span className="text-xs font-medium mt-1">Akun</span>
        </NavLink>

      </div>
    </nav>
  );
}

export default BottomNav;