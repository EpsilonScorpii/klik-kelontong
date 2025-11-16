// src/api/apiClient.js

import axios from 'axios';

const apiClient = axios.create({
  // Arahkan ke URL backend Laravel Anda
  baseURL: 'http://localhost:8000', 
  
  // WAJIB: Agar browser mau mengirimkan cookie sesi
  withCredentials: true,
  
  // BARU: Secara eksplisit memberitahu Axios nama cookie CSRF-nya
  // Laravel menggunakan nama cookie: XSRF-TOKEN
  xsrfCookieName: 'XSRF-TOKEN',
  
  // BARU: Secara eksplisit memberitahu Axios nama header yang harus digunakan
  // Laravel mengharapkan header: X-XSRF-TOKEN
  xsrfHeaderName: 'X-XSRF-TOKEN', 
});

export default apiClient;