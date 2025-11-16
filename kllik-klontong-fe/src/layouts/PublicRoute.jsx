// src/layouts/PublicRoute.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

// 'children' di sini adalah <OnboardingLayout />
function PublicRoute({ children }) {
  const { user, isLoading } = useAuth();

  // 1. Tampilkan loading jika kita sedang mengecek user
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p> 
      </div>
    );
  }

  // 2. Jika sudah tidak loading DAN user SUDAH ADA (login)
  if (user) {
    // "Lempar" user ke halaman utama
    return <Navigate to="/home" replace />;
  }

  // 3. Jika user TIDAK ADA (belum login), tampilkan
  // halaman yang dia minta (login, register, dll)
  return children;
}

export default PublicRoute;