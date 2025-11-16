// src/layouts/CustomerProtectedRoute.jsx

import React from 'react';
// 1. Import 'useAuth' dan 'Navigate'
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react'; // (Atau logo splash Anda)

function CustomerProtectedRoute({ children }) {
  // 2. Ambil state dari AuthContext
  const { user, isLoading } = useAuth();

  // 3. Tampilkan loading jika kita sedang mengecek user
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        {/* Anda bisa ganti ini dengan logo SplashPage jika mau */}
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
      </div>
    );
  }

  // 4. Jika sudah tidak loading TAPI user tidak ada (null)
  if (!user) {
    // "Lempar" user ke halaman login
    return <Navigate to="/login" replace />;
  }

  // 5. Jika user ada (sudah login), tampilkan halaman yang dia minta
  //    (Kita tidak perlu cek 'is_admin' di sini)
  return children; // Tampilkan <App /> (layout customer)
}

export default CustomerProtectedRoute;