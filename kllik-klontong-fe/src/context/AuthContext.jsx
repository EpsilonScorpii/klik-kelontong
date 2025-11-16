// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/apiClient'; // Menggunakan apiClient yang sudah Anda buat

const AuthContext = createContext();

// Fungsi helper yang secara manual mengambil token dari cookie
// Kita pindahkan logika pengambilan token ke sini
const getCsrfToken = async () => {
    // 1. Panggil endpoint untuk meminta token
    await apiClient.get('/sanctum/csrf-cookie');

    // 2. Baca cookie XSRF-TOKEN secara eksplisit dari browser
    const xsrfToken = document.cookie.split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
    
    if (!xsrfToken) {
        throw new Error("CSRF token not found. Check if SESSION_DOMAIN in .env is set to 'localhost'.");
    }
    // Menggunakan decodeURIComponent karena token di cookie sering ter-encode
    return decodeURIComponent(xsrfToken); 
};


export function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null); 

  const getUser = async () => {
    try {
      const response = await apiClient.get('/api/user');
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.log("Tidak ada sesi pengguna yang aktif.");
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    getUser().finally(() => {
      setIsLoading(false);
    });
  }, []); 

  // 7. [REVISI TOTAL] Fungsi untuk Login
  const login = async (email, password) => {
    try {
      // Dapatkan token
      const xsrfToken = await getCsrfToken(); 

      // Kirim request login dengan token di header
      await apiClient.post('/login', { email, password }, {
          headers: { 'X-XSRF-TOKEN': xsrfToken } // <-- SUNTIKKAN TOKEN MANUAL
      });

      const currentUser = await getUser();

      // Pastikan Anda sudah mengubah kolom 'is_admin' salah satu user di database menjadi 1
      return currentUser.is_admin ? 'admin' : 'customer'; 

    } catch (error) {
      console.error("Gagal login:", error);
      throw error.response?.data || error; 
    }
  };

  // 8. [REVISI TOTAL] Fungsi untuk Register
  const register = async (email, password, name) => {
    try {
      // Dapatkan token
      const xsrfToken = await getCsrfToken(); 
      
      // Kirim request register dengan token di header
      await apiClient.post('/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: password,
      }, {
        headers: { 'X-XSRF-TOKEN': xsrfToken } // <-- SUNTIKKAN TOKEN MANUAL
      });
      
    } catch (error) {
      console.error("Gagal register:", error);
      throw error.response?.data || error;
    }
  };

  // 9. Fungsi untuk Logout (tidak perlu token, sudah aman)
  const logout = async () => {
    try {
      await apiClient.post('/logout');
    } catch (error) {
      console.error("Gagal logout:", error);
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}