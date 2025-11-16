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
let csrfTokenPromise = null;

// Function to fetch CSRF token
const fetchCsrfToken = async () => {
  if (csrfTokenPromise) {
    return csrfTokenPromise;
  }

  csrfTokenPromise = axios.get('http://localhost:8000/sanctum/csrf-cookie', {
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
  }).then(() => {
    csrfTokenFetched = true;
    csrfTokenPromise = null;
    console.log('✅ CSRF token fetched');
  }).catch((error) => {
    csrfTokenPromise = null;
    console.error('❌ Failed to fetch CSRF token:', error);
    throw error;
  });

  return csrfTokenPromise;
};

// Request interceptor
api.interceptors.request.use(async (config) => {
  // Fetch CSRF token untuk non-GET requests
  if (config.method !== 'get' && !csrfTokenFetched) {
    try {
      await fetchCsrfToken();
    } catch (error) {
      console.error('❌ Failed to fetch CSRF token in request interceptor:', error);
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

      // Jika 419 (CSRF token mismatch), reset dan retry sekali
      if (error.response.status === 419 && !error.config._retry) {
        csrfTokenFetched = false;
        error.config._retry = true;
        console.warn('⚠️ CSRF token mismatch, retrying...');
        
        // Retry request
        try {
          await fetchCsrfToken();
          // Retry original request
          return api.request(error.config);
        } catch (retryError) {
          console.error('❌ Retry failed:', retryError);
        }
      }

      // Jika 401 (Unauthenticated), clear CSRF token
      if (error.response.status === 401) {
        csrfTokenFetched = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;