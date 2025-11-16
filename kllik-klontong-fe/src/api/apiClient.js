import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // PENTING untuk Sanctum!
  }
});

let csrfTokenFetched = false;

// Request interceptor
api.interceptors.request.use(async (config) => {
  // Fetch CSRF token untuk non-GET requests
  if (config.method !== 'get' && !csrfTokenFetched) {
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }
      });
      csrfTokenFetched = true;
      console.log('✅ CSRF token fetched');
    } catch (error) {
      console.error('❌ Failed to fetch CSRF token:', error);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config.url
      });

      // Jika 419, reset dan retry
      if (error.response.status === 419) {
        csrfTokenFetched = false;
        console.warn('⚠️ CSRF token mismatch, retrying...');
        
        // Retry request
        try {
          await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
            withCredentials: true,
            headers: {
              'Accept': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            }
          });
          csrfTokenFetched = true;
          
          // Retry original request
          return api.request(error.config);
        } catch (retryError) {
          console.error('❌ Retry failed:', retryError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;