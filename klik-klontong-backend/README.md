# Klik Kelontong - Backend API

A Laravel 12 backend API with authentication powered by Laravel Breeze and Sanctum. This API provides authentication endpoints and product management for the Klik Kelontong e-commerce application.

## Features

- 🔐 **Authentication**: Laravel Breeze API with Sanctum
- 🍪 **Cookie-based Auth**: Stateful SPA authentication
- 🔒 **Security**: CSRF protection, rate limiting, password hashing
- 👤 **User Management**: Registration, login, logout, profile
- 📦 **Product Management**: Admin-only CRUD operations
- 🧪 **Testing**: PHPUnit tests included
- 📝 **API Documentation**: Complete API reference

## Technology Stack

- **Framework**: Laravel 12
- **Authentication**: Laravel Breeze + Sanctum
- **Database**: SQLite (configurable)
- **PHP Version**: 8.2+

## Setup Instructions

### Prerequisites

- PHP 8.2 or higher
- Composer
- SQLite (or MySQL/PostgreSQL)

### Installation

1. **Install dependencies**:
   ```bash
   composer install
   ```

2. **Environment configuration**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Configure environment variables**:
   
   Edit `.env` file and ensure these critical settings:
   ```env
   APP_NAME="Klik Kelontong"
   APP_URL=http://localhost:8000
   
   # Database (using SQLite by default)
   DB_CONNECTION=sqlite
   
   # Session Configuration for SPA Authentication
   SESSION_DRIVER=cookie
   SESSION_DOMAIN=null
   SESSION_SECURE_COOKIE=false
   SESSION_SAME_SITE=lax
   
   # Frontend URL for CORS
   FRONTEND_URL=http://localhost:5173
   
   # Sanctum stateful domains (no http:// prefix)
   SANCTUM_STATEFUL_DOMAINS=localhost,localhost:5173,127.0.0.1,127.0.0.1:5173
   ```
   
   **Important Notes:**
   - `SESSION_DRIVER=cookie` is recommended for SPA authentication
   - `SESSION_DOMAIN=null` is required for localhost development
   - `SESSION_SECURE_COOKIE=false` for development (use `true` in production with HTTPS)
   - `SESSION_SAME_SITE=lax` allows CORS requests with cookies

4. **Database setup**:
   ```bash
   touch database/database.sqlite
   php artisan migrate
   ```

5. **Create storage link** (for product images):
   ```bash
   php artisan storage:link
   ```

6. **Start the development server**:
   ```bash
   php artisan serve
   ```

   The API will be available at `http://localhost:8000`

## API Documentation

### Base URL
```
http://localhost:8000
```

### Authentication Flow

This API uses cookie-based authentication for SPA (Single Page Application) integration:

1. **Get CSRF Cookie** (first step for any auth operation):
   ```
   GET /sanctum/csrf-cookie
   ```

2. **Register/Login**: Use the endpoints below
3. **Make authenticated requests**: Include credentials with each request

### Authentication Endpoints

#### 1. Register New User

**Endpoint**: `POST /register`

**Rate Limit**: 5 requests per minute

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Success Response** (201 Created):
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "is_admin": false
}
```

**Error Response** (422 Unprocessable Entity):
```json
{
  "message": "The email has already been taken.",
  "errors": {
    "email": [
      "The email has already been taken."
    ]
  }
}
```

#### 2. Login

**Endpoint**: `POST /login`

**Rate Limit**: 5 requests per minute

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response** (200 OK):
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "is_admin": false
}
```

**Error Response** (422 Unprocessable Entity):
```json
{
  "message": "These credentials do not match our records.",
  "errors": {
    "email": [
      "These credentials do not match our records."
    ]
  }
}
```

#### 3. Logout

**Endpoint**: `POST /logout`

**Authentication**: Required

**Success Response** (200 OK):
```json
{
  "message": "Logged out successfully"
}
```

#### 4. Get Current User

**Endpoint**: `GET /api/user`

**Authentication**: Required

**Success Response** (200 OK):
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "is_admin": false
}
```

#### 5. Forgot Password

**Endpoint**: `POST /forgot-password`

**Rate Limit**: 3 requests per minute

**Request Body**:
```json
{
  "email": "john@example.com"
}
```

**Success Response** (200 OK):
```json
{
  "status": "We have emailed your password reset link!"
}
```

#### 6. Reset Password

**Endpoint**: `POST /reset-password`

**Rate Limit**: 3 requests per minute

**Request Body**:
```json
{
  "token": "reset-token-from-email",
  "email": "john@example.com",
  "password": "newpassword123",
  "password_confirmation": "newpassword123"
}
```

**Success Response** (200 OK):
```json
{
  "status": "Your password has been reset!"
}
```

### Product Management Endpoints (Admin Only)

These endpoints require authentication **and** admin privileges.

#### 1. List All Products

**Endpoint**: `GET /api/admin/products`

**Authentication**: Required (Admin)

**Success Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "price": 10000,
    "stock": 100,
    "category": "Category Name",
    "description": "Product description",
    "discount_price": 9000,
    "image_url": "/storage/products/image.jpg",
    "created_at": "2024-01-01T00:00:00.000000Z",
    "updated_at": "2024-01-01T00:00:00.000000Z"
  }
]
```

#### 2. Create Product

**Endpoint**: `POST /api/admin/products`

**Authentication**: Required (Admin)

**Request Body** (multipart/form-data):
```
name: "Product Name"
price: 10000
stock: 100
category: "Category Name"
description: "Product description"
discount_price: 9000
image: [file]
```

**Success Response** (201 Created):
```json
{
  "id": 1,
  "name": "Product Name",
  "price": 10000,
  "stock": 100,
  "category": "Category Name",
  "description": "Product description",
  "discount_price": 9000,
  "image_url": "/storage/products/image.jpg",
  "created_at": "2024-01-01T00:00:00.000000Z",
  "updated_at": "2024-01-01T00:00:00.000000Z"
}
```

#### 3. Update Product

**Endpoint**: `PUT /api/admin/products/{id}`

**Authentication**: Required (Admin)

**Request Body** (multipart/form-data):
```
name: "Updated Product Name"
price: 12000
stock: 150
category: "Updated Category"
description: "Updated description"
discount_price: 11000
image: [file] (optional)
```

**Success Response** (200 OK):
```json
{
  "id": 1,
  "name": "Updated Product Name",
  "price": 12000,
  "stock": 150,
  "category": "Updated Category",
  "description": "Updated description",
  "discount_price": 11000,
  "image_url": "/storage/products/new-image.jpg",
  "created_at": "2024-01-01T00:00:00.000000Z",
  "updated_at": "2024-01-01T12:00:00.000000Z"
}
```

#### 4. Delete Product

**Endpoint**: `DELETE /api/admin/products/{id}`

**Authentication**: Required (Admin)

**Success Response** (200 OK):
```json
{
  "message": "Produk berhasil dihapus"
}
```

### Error Responses

#### 401 Unauthorized
```json
{
  "message": "Unauthenticated."
}
```

#### 403 Forbidden (Non-admin trying to access admin route)
```json
{
  "message": "Unauthorized. Admin access required."
}
```

#### 404 Not Found
```json
{
  "message": "No query results for model [App\\Models\\Product] {id}"
}
```

#### 429 Too Many Requests
```json
{
  "message": "Too many attempts. Please try again in X seconds."
}
```

## Frontend Integration

### Axios Configuration

Configure axios in your frontend to work with cookie-based authentication:

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

export default apiClient;
```

### Authentication Flow Example

```javascript
// 1. Get CSRF cookie (required before login/register)
await apiClient.get('/sanctum/csrf-cookie');

// 2. Register
const response = await apiClient.post('/register', {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  password_confirmation: 'password123'
});

// 3. Make authenticated requests
const user = await apiClient.get('/api/user');

// 4. Logout
await apiClient.post('/logout');
```

## Security Features

### 1. CSRF Protection
- All state-changing requests require CSRF token
- Automatically handled via Sanctum middleware

### 2. Rate Limiting
- **Login/Register**: 5 requests per minute
- **Password Reset**: 3 requests per minute
- **Email Verification**: 6 requests per minute

### 3. Password Security
- Minimum password requirements enforced
- Passwords hashed using bcrypt
- Configurable bcrypt rounds (default: 12)

### 4. CORS Configuration
- Configured for specific frontend domains
- Credentials support enabled
- Prevents unauthorized cross-origin requests

## Testing

Run the test suite:

```bash
# Run all tests
php artisan test

# Run specific test
php artisan test --filter=AuthenticationTest

# Run with coverage
php artisan test --coverage
```

### Test Coverage

- ✅ User registration
- ✅ User authentication (login/logout)
- ✅ Invalid credentials handling
- ✅ Email verification
- ✅ Password reset

## Configuration Files

### Important Configuration Files

- `config/sanctum.php` - Sanctum authentication configuration
- `config/cors.php` - CORS settings for API
- `bootstrap/app.php` - Application bootstrap and middleware
- `.env` - Environment variables

### CORS Configuration

The following paths are configured for CORS:
- `api/*` - All API endpoints
- `sanctum/csrf-cookie` - CSRF cookie endpoint
- `login` - Login endpoint
- `logout` - Logout endpoint
- `register` - Registration endpoint

## Development

### Code Style

Run Laravel Pint for code formatting:

```bash
./vendor/bin/pint
```

### Debugging

Enable detailed error messages in `.env`:

```env
APP_DEBUG=true
LOG_LEVEL=debug
```

### Database Seeding

Create an admin user for testing:

```bash
php artisan tinker
```

```php
User::create([
    'name' => 'Admin User',
    'email' => 'admin@example.com',
    'password' => bcrypt('password'),
    'is_admin' => true,
]);
```

## Deployment

### Production Checklist

1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false`
3. Configure production database
4. Set proper `APP_URL` and `FRONTEND_URL`
5. Update `SANCTUM_STATEFUL_DOMAINS` with production domain
6. Run optimizations:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```
7. Set up proper file permissions
8. Configure SSL/HTTPS
9. Set up queue workers for emails

## Troubleshooting

### CSRF Token Mismatch (Error 419)

This is the most common issue with Sanctum SPA authentication. If you get a 419 error:

1. **Check Session Configuration:**
   ```bash
   # In .env file
   SESSION_DRIVER=cookie  # NOT 'file' or 'database' for SPA
   SESSION_DOMAIN=null    # MUST be null for localhost
   SESSION_SECURE_COOKIE=false  # false for http, true for https
   SESSION_SAME_SITE=lax  # Required for CORS
   ```

2. **Verify CSRF Cookie Endpoint:**
   ```bash
   # Test that CSRF endpoint works
   curl -X GET http://localhost:8000/sanctum/csrf-cookie -v
   # Should return 204 No Content with Set-Cookie header
   ```

3. **Frontend Must Include:**
   ```javascript
   // In axios configuration
   {
     withCredentials: true,
     headers: {
       'X-Requested-With': 'XMLHttpRequest'  // CRITICAL for Sanctum
     }
   }
   ```

4. **Clear All Caches:**
   ```bash
   php artisan config:clear
   php artisan cache:clear
   php artisan route:clear
   ```

### CORS Issues

If you encounter CORS errors:

1. **Verify Frontend URL in `.env`:**
   ```env
   FRONTEND_URL=http://localhost:5173
   SANCTUM_STATEFUL_DOMAINS=localhost,localhost:5173,127.0.0.1,127.0.0.1:5173
   ```
   
   **Important:** No `http://` prefix in `SANCTUM_STATEFUL_DOMAINS`!

2. **Check `config/cors.php` allowed origins:**
   ```php
   'allowed_origins' => [
       'http://localhost:5173',
       'http://127.0.0.1:5173',
   ],
   'supports_credentials' => true,  // MUST be true for Sanctum
   ```

3. **Ensure `withCredentials: true` in axios:**
   ```javascript
   const api = axios.create({
     baseURL: 'http://localhost:8000',
     withCredentials: true,  // Required for cookies
   });
   ```

4. **Clear config cache:**
   ```bash
   php artisan config:clear
   ```

### Session Issues

If sessions are not persisting:

1. **Verify Session Driver:**
   ```bash
   # Check .env
   SESSION_DRIVER=cookie  # Recommended for SPA
   ```
   
   For cookie driver, no database setup needed. For database driver:
   ```bash
   php artisan migrate  # Ensure sessions table exists
   ```

2. **Check `SANCTUM_STATEFUL_DOMAINS` includes your frontend:**
   ```env
   # Both with and without port
   SANCTUM_STATEFUL_DOMAINS=localhost,localhost:5173,127.0.0.1,127.0.0.1:5173
   ```

3. **Ensure cookies are being sent:**
   - Check browser DevTools → Network → Request Headers
   - Should see `Cookie: laravel_session=...` or similar

4. **Check SESSION_DOMAIN setting:**
   ```env
   SESSION_DOMAIN=null  # For localhost (REQUIRED)
   # For production subdomains: SESSION_DOMAIN=.example.com
   ```

### Authentication Issues

If authentication is not working:

1. **Verify CSRF cookie is fetched FIRST:**
   ```javascript
   // Before login/register
   await axios.get('/sanctum/csrf-cookie');
   // Then do login
   await axios.post('/login', credentials);
   ```

2. **Check middleware configuration in `bootstrap/app.php`:**
   ```php
   $middleware->api(prepend: [
       \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
   ]);
   ```

3. **Verify routes are using correct middleware:**
   ```php
   // In routes/api.php
   Route::middleware(['auth:sanctum'])->group(function () {
       Route::get('/user', ...);
   });
   ```

4. **Clear application cache:**
   ```bash
   php artisan config:clear
   php artisan cache:clear
   php artisan route:clear
   ```

### Login/Register Pages Not Opening

If frontend pages are not loading:

1. **Check backend is running:**
   ```bash
   php artisan serve
   # Should be at http://localhost:8000
   ```

2. **Check frontend is running:**
   ```bash
   cd ../kllik-klontong-fe
   npm run dev
   # Should be at http://localhost:5173
   ```

3. **Verify CORS configuration** (see CORS Issues above)

4. **Check browser console** for JavaScript errors

### Logout Not Working

If logout doesn't clear session:

1. **Verify logout endpoint:**
   ```javascript
   // Must be POST request
   await api.post('/logout');
   ```

2. **Check that logout invalidates session:**
   ```php
   // In AuthenticatedSessionController
   Auth::guard('web')->logout();
   $request->session()->invalidate();
   $request->session()->regenerateToken();
   ```

3. **Clear cookies on frontend after logout:**
   ```javascript
   // After successful logout
   document.cookie.split(";").forEach(cookie => {
     const name = cookie.split("=")[0];
     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
   });
   ```

### Production Checklist

When deploying to production:

1. **Update Environment Variables:**
   ```env
   APP_ENV=production
   APP_DEBUG=false
   SESSION_SECURE_COOKIE=true  # HTTPS required
   APP_URL=https://api.example.com
   FRONTEND_URL=https://example.com
   SANCTUM_STATEFUL_DOMAINS=example.com,www.example.com
   ```

2. **SSL/HTTPS Configuration:**
   - Ensure SSL certificate is valid
   - Both frontend and backend should use HTTPS
   - Set `SESSION_SECURE_COOKIE=true`

3. **Session Domain for Subdomains:**
   ```env
   # If API is at api.example.com and frontend at www.example.com
   SESSION_DOMAIN=.example.com  # Note the leading dot
   ```

4. **Run Optimizations:**
   ```bash
   composer install --no-dev --optimize-autoloader
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

### Common Error Messages

**"Unauthenticated" (401)**
- Session expired or cookies not being sent
- Solution: Fetch CSRF token before login, use `withCredentials: true`

**"CSRF token mismatch" (419)**
- Session configuration wrong or cookies not accessible
- Solution: Check SESSION_DOMAIN, SESSION_SAME_SITE, and SESSION_SECURE_COOKIE

**"CORS policy" errors**
- CORS not configured or wrong origin
- Solution: Update `config/cors.php` and clear config cache

**"Too many attempts" (429)**
- Rate limiting triggered
- Solution: Wait and try again, or increase rate limits in routes

### Getting Help

If you're still experiencing issues:

1. Check Laravel logs: `storage/logs/laravel.log`
2. Enable debug mode temporarily: `APP_DEBUG=true`
3. Use `php artisan route:list` to verify routes
4. Use browser DevTools Network tab to inspect requests/responses
5. Verify all configuration with `php artisan config:show`

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Support

For issues and questions, please open an issue on GitHub.
