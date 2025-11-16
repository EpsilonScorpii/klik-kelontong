# Klik Kelontong - E-Commerce Platform

Full-stack e-commerce application with Laravel backend and React frontend.

## 🚀 Quick Start

This is a monorepo containing both backend and frontend applications:

- **Backend**: Laravel 12 API with Breeze + Sanctum authentication
- **Frontend**: React 18 + Vite with Tailwind CSS

### Prerequisites

- PHP 8.2+
- Composer
- Node.js 16+
- npm or yarn
- SQLite (or MySQL/PostgreSQL)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/EpsilonScorpii/klik-kelontong.git
   cd klik-kelontong
   ```

2. **Setup Backend**
   ```bash
   cd klik-klontong-backend
   composer install
   cp .env.example .env
   php artisan key:generate
   touch database/database.sqlite
   php artisan migrate
   php artisan serve
   ```
   
   Backend will run at `http://localhost:8000`
   
   See [backend README](./klik-klontong-backend/README.md) for detailed instructions.

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd kllik-klontong-fe
   npm install
   npm run dev
   ```
   
   Frontend will run at `http://localhost:5173`
   
   See [frontend README](./kllik-klontong-fe/README.md) for detailed instructions.

## 📁 Project Structure

```
klik-kelontong/
├── klik-klontong-backend/    # Laravel 12 API
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── routes/
│   └── README.md             # Backend documentation
│
└── kllik-klontong-fe/        # React + Vite frontend
    ├── src/
    ├── public/
    └── README.md             # Frontend documentation
```

## 🔐 Authentication

This application uses **Laravel Sanctum** for SPA authentication with cookie-based sessions:

- ✅ No token management needed on frontend
- ✅ HTTP-only cookies for security
- ✅ CSRF protection built-in
- ✅ Seamless authentication experience

### How It Works

1. Frontend fetches CSRF cookie from `/sanctum/csrf-cookie`
2. User logs in/registers with credentials
3. Backend sets HTTP-only session cookie
4. All subsequent requests include the cookie automatically
5. Logout invalidates the session

## ✨ Features

### Backend API
- 🔐 Complete authentication system (register, login, logout, password reset)
- 👤 User management with admin roles
- 📦 Product CRUD operations (admin only)
- 🔒 Rate limiting and security features
- 📝 Comprehensive API documentation
- 🧪 PHPUnit tests

### Frontend
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast development with Vite HMR
- 🔐 Secure authentication flow
- 📱 Responsive design
- 🛒 E-commerce interface (if implemented)

## 🔧 Configuration

### Backend Configuration

Key environment variables in `klik-klontong-backend/.env`:

```env
# Application
APP_URL=http://localhost:8000

# Session (CRITICAL for authentication)
SESSION_DRIVER=cookie
SESSION_DOMAIN=null
SESSION_SECURE_COOKIE=false
SESSION_SAME_SITE=lax

# Frontend & CORS
FRONTEND_URL=http://localhost:5173
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:5173,127.0.0.1,127.0.0.1:5173
```

### Frontend Configuration

The frontend is configured in `kllik-klontong-fe/src/api/apiClient.js`:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',  // Required for Sanctum
  }
});
```

## 🧪 Testing

### Backend Tests

```bash
cd klik-klontong-backend
php artisan test
```

Current test coverage:
- ✅ User authentication
- ✅ User registration
- ✅ Email verification
- ✅ Password reset

## 📚 Documentation

- **Backend API Documentation**: See [klik-klontong-backend/README.md](./klik-klontong-backend/README.md)
  - Complete API reference
  - Authentication flow
  - Endpoint documentation
  - Troubleshooting guide

- **Frontend Documentation**: See [kllik-klontong-fe/README.md](./kllik-klontong-fe/README.md)
  - Setup instructions
  - Authentication usage
  - Development tips
  - Deployment guide

## 🐛 Troubleshooting

### Common Issues

**CSRF Token Mismatch (419 Error)**
- Ensure `SESSION_DRIVER=cookie` in backend `.env`
- Ensure `SESSION_DOMAIN=null` for localhost
- Ensure `SESSION_SECURE_COOKIE=false` for http development
- Clear backend cache: `php artisan config:clear`

**CORS Errors**
- Verify `FRONTEND_URL` in backend `.env`
- Ensure `SANCTUM_STATEFUL_DOMAINS` includes frontend URL (without http://)
- Check that `withCredentials: true` in frontend axios config

**Authentication Not Working**
- Verify both servers are running (backend at :8000, frontend at :5173)
- Check browser console for errors
- Verify CSRF cookie is being fetched before login
- Clear browser cookies and try again

**Detailed Troubleshooting**
- Backend: See [backend README troubleshooting section](./klik-klontong-backend/README.md#troubleshooting)
- Frontend: See [frontend README troubleshooting section](./kllik-klontong-fe/README.md#troubleshooting)

## 🚀 Deployment

### Production Checklist

**Backend**
1. Set `APP_ENV=production` and `APP_DEBUG=false`
2. Set `SESSION_SECURE_COOKIE=true` (requires HTTPS)
3. Update `APP_URL` and `FRONTEND_URL` to production domains
4. Update `SANCTUM_STATEFUL_DOMAINS` with production domain
5. Run: `php artisan config:cache`, `php artisan route:cache`

**Frontend**
1. Update API URL in `apiClient.js` or use environment variable
2. Build: `npm run build`
3. Deploy `dist` folder to hosting provider
4. Ensure HTTPS is enabled

See individual README files for detailed deployment instructions.

## 🔒 Security

- ✅ CSRF protection via Laravel Sanctum
- ✅ HTTP-only cookies (no XSS token theft)
- ✅ Rate limiting on authentication endpoints
- ✅ Password hashing with bcrypt
- ✅ SQL injection protection via Eloquent ORM
- ✅ XSS protection via React

**Important Security Notes:**
- Always use HTTPS in production
- Never commit `.env` files
- Set `SESSION_SECURE_COOKIE=true` in production
- Keep dependencies up to date

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 💬 Support

For issues and questions:
1. Check the troubleshooting sections in README files
2. Review browser DevTools console and network tab
3. Check Laravel logs: `klik-klontong-backend/storage/logs/laravel.log`
4. Open an issue on GitHub

## 👨‍💻 Development

Both applications run in development mode with hot reload:
- Backend: Changes require server restart
- Frontend: Vite HMR provides instant feedback

### Useful Commands

**Backend**
```bash
php artisan serve          # Start dev server
php artisan test           # Run tests
php artisan config:clear   # Clear config cache
php artisan route:list     # List all routes
./vendor/bin/pint          # Format code
```

**Frontend**
```bash
npm run dev                # Start dev server
npm run build              # Build for production
npm run preview            # Preview production build
```

---

Made with ❤️ for learning Laravel Sanctum SPA authentication
