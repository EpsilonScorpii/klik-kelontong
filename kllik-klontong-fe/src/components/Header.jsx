// src/components/Header.jsx

import { Link } from 'react-router-dom';
import { 
  BiStore, 
  BiSearch, 
  BiCart, 
  BiChevronDown ,
  BiMenu
} from 'react-icons/bi';
import { useCart } from '../context/CartContext'; // <-- 1. IMPORT "OTAK" KERANJANG

function Header({ onToggleSidebar }) {
  const { cartCount } = useCart(); // <-- 2. AMBIL 'cartCount'

  return (
    <header className="bg-primary z-50 shadow-sm px-4">
      <div className="container mx-auto">
        
        {/* === Baris Atas (Logo, Search, Cart) === */}
        <div className="flex justify-between items-center gap-4 py-3">

          {/* Wrapper untuk Logo dan Tombol Menu */}
          <div className="flex items-center gap-2">
            <button 
              onClick={onToggleSidebar} 
              className="hidden lg:block text-black-700 p-2 rounded-full hover:bg-gray-100"
            >
              <BiMenu size={24} />
            </button>
            <Link to="/home" className="flex items-center gap-2 flex-shrink-0">
              <span className="bg-green-600 p-2 rounded-full text-white">
                <BiStore size={24} />
              </span>
              <span className="hidden sm:block text-xl font-bold text-secondary">
                Klik Klontong
              </span>
            </Link>
          </div>

          {/* === 3. INI ADALAH 'SEARCH BAR' YANG SUDAH DIPERBAIKI === */}
          {/* Ini adalah Link yang mengarah ke /search */}
          <Link to="/search" className="relative flex-grow">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <BiSearch size={20} />
            </span>
            {/* Class ini akan membuatnya RAMPING (p-2) dan 
              sedikit bulat (rounded-lg) 
            */}
            <span
              className="w-full bg-white border border-gray-200 rounded-lg p-2 pl-10
                         text-gray-500 block cursor-pointer"
            >
              Cari Kebutuhan...
            </span>
          </Link>

          {/* 4. Ikon Keranjang (dengan 'cartCount' dinamis) */}
          <Link 
            to="/cart" 
            className="relative text-black-700 p-2 rounded-full flex-shrink-0"
          >
            <BiCart size={28} />
            {/* Tampilkan badge HANYA JIKA cartCount > 0 */}
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white 
                             text-xs font-bold rounded-full w-4 h-4 
                             flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

        </div> {/* Penutup Baris Atas */}

        {/* === 5. INI ADALAH TOMBOL "ALL CATEGORY" YANG HILANG === */}
        {/* 'lg:hidden' berarti tombol ini HANYA MUNCUL DI MOBILE */}
        <div className="border-t border-gray-200 px-0 py-2 lg:hidden">
          <button className="bg-[#526E48] rounded-xl px-2 py-0.2 flex items-center gap-1 text-sm font-small text-white hover:text-green-600">
            All Category
            <BiChevronDown size={20} />
          </button>
        </div>

      </div> {/* Penutup Container */}
    </header>
  );
}

export default Header;