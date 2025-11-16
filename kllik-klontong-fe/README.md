# Klik Kelontong - Frontend

A modern React + Vite frontend application for the Klik Kelontong e-commerce platform with authentication powered by Laravel Sanctum.

## Features

- 🔐 **Authentication**: Secure cookie-based authentication with Laravel Sanctum
- 🎨 **Modern UI**: Built with React 18 and Tailwind CSS
- ⚡ **Fast Development**: Powered by Vite with Hot Module Replacement (HMR)
- 🍪 **Cookie Auth**: Stateful SPA authentication (no token management needed)
- 🔒 **Security**: CSRF protection, secure HTTP-only cookies
- 📱 **Responsive**: Mobile-friendly design

## Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router (if applicable)

## Prerequisites

- Node.js 16+ or higher
- npm or yarn
- Backend API running at `http://localhost:8000`

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

The frontend is configured to connect to the backend at `http://localhost:8000` by default. This is set in `src/api/apiClient.js`.

If your backend runs on a different URL, update the `baseURL` in `src/api/apiClient.js`:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:8000', // Change this if needed
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
});
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### 5. Preview Production Build

```bash
npm run preview
```

## Authentication Flow

This application uses **cookie-based authentication** with Laravel Sanctum. Here's how it works:

### How It Works

1. **CSRF Token**: Before any authentication request, the app fetches a CSRF cookie from `/sanctum/csrf-cookie`
2. **Login/Register**: Submit credentials to backend authentication endpoints
3. **Cookies**: Backend sets HTTP-only session cookies automatically
4. **Authenticated Requests**: All subsequent requests include session cookies automatically
5. **Logout**: POST to `/logout` to invalidate the session

### API Client Configuration

The `src/api/apiClient.js` file is pre-configured with:

- ✅ `withCredentials: true` - Sends cookies with requests
- ✅ `X-Requested-With: XMLHttpRequest` - Required header for Sanctum
- ✅ Automatic CSRF token fetching before non-GET requests
- ✅ 419 error retry mechanism for CSRF token mismatches
- ✅ Proper error handling and logging

### Example Usage

```javascript
import api from './api/apiClient';

// Register new user
const register = async (userData) => {
  try {
    const response = await api.post('/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password_confirmation
    });
    return response.data; // Returns user data
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

// Login
const login = async (credentials) => {
  try {
    const response = await api.post('/login', {
      email: credentials.email,
      password: credentials.password
    });
    return response.data; // Returns user data
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// Get current user (authenticated request)
const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/user');
    return response.data;
  } catch (error) {
    console.error('Failed to get user:', error);
    throw error;
  }
};

// Logout
const logout = async () => {
  try {
    await api.post('/logout');
    // Optionally redirect to login page
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};
```

## Available Scripts

### `npm run dev`
Starts the development server with hot reload at `http://localhost:5173`

### `npm run build`
Builds the app for production to the `dist` folder

### `npm run preview`
Locally preview the production build

### `npm run lint`
Run ESLint to check code quality (if configured)

## Project Structure

```
kllik-klontong-fe/
├── src/
│   ├── api/
│   │   └── apiClient.js      # Axios instance with Sanctum config
│   ├── components/           # React components
│   ├── pages/               # Page components
│   ├── App.jsx              # Main App component
│   └── main.jsx             # Application entry point
├── public/                  # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Dependencies and scripts
```

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:

1. **Verify backend is running** at `http://localhost:8000`
2. **Check backend CORS configuration** in `config/cors.php`:
   ```php
   'allowed_origins' => [
       'http://localhost:5173',
       'http://127.0.0.1:5173',
   ],
   'supports_credentials' => true,
   ```
3. **Ensure frontend URL matches** - Use either `localhost` or `127.0.0.1`, not both
4. **Clear backend cache**:
   ```bash
   cd ../klik-klontong-backend
   php artisan config:clear
   ```

### CSRF Token Mismatch (419 Error)

If you get 419 errors when trying to login/register:

1. **Check backend session configuration** in `.env`:
   ```env
   SESSION_DRIVER=cookie
   SESSION_DOMAIN=null
   SESSION_SECURE_COOKIE=false
   SESSION_SAME_SITE=lax
   ```

2. **Verify SANCTUM_STATEFUL_DOMAINS** includes frontend URL:
   ```env
   SANCTUM_STATEFUL_DOMAINS=localhost,localhost:5173,127.0.0.1,127.0.0.1:5173
   ```

3. **Check browser console** for CSRF token fetch errors

4. **Clear browser cookies** and try again

5. **Restart both servers**:
   ```bash
   # Backend
   cd ../klik-klontong-backend
   php artisan serve
   
   # Frontend (new terminal)
   cd ../kllik-klontong-fe
   npm run dev
   ```

### Authentication Not Persisting

If you get logged out on page refresh:

1. **Check cookies in browser DevTools**:
   - Open DevTools → Application → Cookies
   - Should see `laravel_session` cookie
   - Cookie should have correct Domain and Path

2. **Verify backend SESSION_DRIVER**:
   ```env
   SESSION_DRIVER=cookie  # NOT 'file'
   ```

3. **Check SESSION_DOMAIN is null** for localhost:
   ```env
   SESSION_DOMAIN=null
   ```

4. **Ensure withCredentials is true** in apiClient.js (it already is)

### Login/Register Not Working

If authentication endpoints are failing:

1. **Check Network tab in DevTools**:
   - Look at the `/login` or `/register` request
   - Check Response status and body
   - Verify Request Headers include `Cookie` and `X-XSRF-TOKEN`

2. **Verify backend is running**:
   ```bash
   curl http://localhost:8000/sanctum/csrf-cookie -v
   # Should return 204 with Set-Cookie header
   ```

3. **Check for JavaScript console errors**

4. **Try manually fetching CSRF token**:
   ```javascript
   // In browser console
   await fetch('http://localhost:8000/sanctum/csrf-cookie', { credentials: 'include' })
   ```

### Port Already in Use

If you get "Port 5173 is already in use":

1. **Kill the process using the port**:
   ```bash
   # On macOS/Linux
   lsof -ti:5173 | xargs kill -9
   
   # On Windows
   netstat -ano | findstr :5173
   taskkill /PID <PID> /F
   ```

2. **Or use a different port**:
   ```bash
   npm run dev -- --port 3000
   ```

### Build Errors

If you encounter build errors:

1. **Clear node_modules and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Update dependencies**:
   ```bash
   npm update
   ```

3. **Check Node.js version**:
   ```bash
   node --version  # Should be 16+
   ```

## API Endpoints

The frontend connects to these backend endpoints:

### Public Endpoints

- `GET /sanctum/csrf-cookie` - Get CSRF token
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password

### Protected Endpoints (require authentication)

- `GET /api/user` - Get current user
- `POST /logout` - Logout user
- `GET /api/admin/products` - List products (admin only)
- `POST /api/admin/products` - Create product (admin only)
- `PUT /api/admin/products/{id}` - Update product (admin only)
- `DELETE /api/admin/products/{id}` - Delete product (admin only)

See backend README for complete API documentation.

## Development Tips

### Hot Module Replacement (HMR)

Vite provides instant feedback with HMR. Changes to your components will be reflected immediately without losing application state.

### Browser DevTools

Use DevTools Network tab to debug API requests:
- Check request/response headers
- Verify cookies are being sent
- Inspect response bodies for error messages

### Console Logging

The apiClient includes helpful console logging:
- ✅ CSRF token fetched successfully
- ⚠️ CSRF token mismatch warnings
- ❌ API errors with details

Check the browser console for these messages when debugging.

## Production Deployment

When deploying to production:

1. **Update API URL in `apiClient.js`**:
   ```javascript
   const api = axios.create({
     baseURL: process.env.VITE_API_URL || 'https://api.example.com',
     // ... rest of config
   });
   ```

2. **Create `.env.production` file**:
   ```env
   VITE_API_URL=https://api.example.com
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Deploy `dist` folder** to your hosting provider:
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - Nginx/Apache

5. **Configure CORS on backend** for your production domain

6. **Ensure HTTPS** is enabled on both frontend and backend

7. **Update backend `.env`**:
   ```env
   APP_URL=https://api.example.com
   FRONTEND_URL=https://example.com
   SESSION_SECURE_COOKIE=true
   SANCTUM_STATEFUL_DOMAINS=example.com,www.example.com
   ```

## Security Considerations

### HTTPS in Production

- ✅ Always use HTTPS in production
- ✅ Set `SESSION_SECURE_COOKIE=true` in backend
- ✅ Ensure SSL certificates are valid
- ❌ Never use HTTP in production with authentication

### Sensitive Data

- ❌ Never store passwords or tokens in localStorage
- ✅ Use HTTP-only cookies (handled by backend)
- ✅ CSRF protection is automatic with Sanctum
- ✅ XSS protection via React's built-in escaping

### Environment Variables

- ❌ Never commit `.env` files
- ✅ Use `.env.example` as template
- ✅ Store secrets securely (e.g., in deployment platform)

## Support

For issues and questions:
1. Check this README's Troubleshooting section
2. Check backend README's Troubleshooting section
3. Review browser DevTools console and network tab
4. Open an issue on GitHub

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
