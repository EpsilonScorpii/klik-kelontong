// src/layouts/AdminProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
// 1. Kita hanya butuh 'useAuth'
import { useAuth } from '../context/AuthContext'; 
import { Loader2 } from 'lucide-react'; // (Ikon loading Anda)

// 2. 'account' dan 'teams' sudah tidak ada
// import { account, teams } from '../appwriteConfig'; (HAPUS)

function AdminProtectedRoute({ children }) {
  // 3. Ambil 'user' dan 'isLoading' dari AuthContext baru kita
  const { user, isLoading } = useAuth();
  
  // 4. (useEffect tidak lagi diperlukan di sini, sudah ditangani di AuthContext)

  // 5. Selama 'isLoading' true, tampilkan loading.
  //    Ini PENTING agar kita memberi AuthContext waktu untuk
  //    mengecek /api/user
  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
        <p className="mt-4 text-gray-600">Memverifikasi sesi...</p>
      </div>
    );
  }

  // 6. Jika tidak loading DAN user tidak ada (belum login)
  if (!user) {
    // Kembalikan ke halaman login
    return <Navigate to="/login" replace />;
  }

  // 7. Jika user ada, TAPI BUKAN ADMIN
  //    (Kita gunakan properti 'is_admin' dari API Laravel
  //    yang kita definisikan di AuthContext)
  if (user && !user.is_admin) {
    // Bukan admin, lempar ke beranda customer
    return <Navigate to="/home" replace />;
  }

  // 8. Jika lolos semua:
  //    - tidak loading
  //    - user ada
  //    - user.is_admin == true
  return children; // Tampilkan <AdminLayout />
}

export default AdminProtectedRoute;