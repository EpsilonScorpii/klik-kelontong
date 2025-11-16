// src/components/Sidebar.jsx

import { Link } from 'react-router-dom';
import { BiHomeAlt, BiNotepad, BiMessageSquareDetail, BiUser } from 'react-icons/bi';

function Sidebar({isOpen}) {
  return (
    // INI BAGIAN PENTING:
    // 'hidden lg:block' -> Sembunyi di mobile, tampil di desktop
    // 'w-64' -> Lebar sidebar 
    // 'flex-shrink-0' -> JANGAN biarkan sidebar ini "menciut"
    <aside className={`hidden lg:block bg-white border-r border-gray-200 flex-shrink-0 
                  transition-all duration-300 overflow-hidden 
                  ${isOpen ? 'w-64' : 'w-0'}`}>
      <div className="p-4 w-64">
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">Navigasi</h2>
        <nav className="flex flex-col gap-2">
          <Link 
            to="/home" 
            className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
          >
            <BiHomeAlt size={20} />
            <span>Beranda</span>
          </Link>
          <Link 
            to="/aktivitas" 
            className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
          >
            <BiNotepad size={20} />
            <span>Aktivitas</span>
          </Link>
          <Link 
            to="/pesan" 
            className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
          >
            <BiMessageSquareDetail size={20} />
            <span>Kotak Masuk</span>
          </Link>
          <Link 
            to="/akun" 
            className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
          >
            <BiUser size={20} />
            <span>Akun</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;