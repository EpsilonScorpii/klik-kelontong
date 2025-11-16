import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // PENTING untuk CORS!
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// Interceptor untuk handle CSRF
api.interceptors.request.use(async (config) => {
  // Get CSRF cookie sebelum request pertama
  if (config.method !== 'get') {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true
    });
  }
  return config;
});

export default api;