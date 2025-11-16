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
   
   Edit `.env` file:
   ```env
   APP_NAME="Klik Kelontong"
   APP_URL=http://localhost:8000
   
   # Database (using SQLite by default)
   DB_CONNECTION=sqlite
   
   # Frontend URL for CORS
   FRONTEND_URL=http://localhost:5173
   
   # Sanctum stateful domains
   SANCTUM_STATEFUL_DOMAINS=localhost,localhost:5173,127.0.0.1,127.0.0.1:5173
   ```

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

### CORS Issues

If you encounter CORS errors:
1. Verify `FRONTEND_URL` in `.env`
2. Check `config/cors.php` allowed origins
3. Ensure `withCredentials: true` in axios
4. Clear config cache: `php artisan config:clear`

### Session Issues

If sessions are not persisting:
1. Verify `SESSION_DRIVER=database` in `.env`
2. Run migrations if using database sessions
3. Check `SANCTUM_STATEFUL_DOMAINS` includes your frontend domain
4. Ensure cookies are being sent with requests

### Authentication Issues

If authentication is not working:
1. Verify CSRF cookie is being fetched first
2. Check middleware configuration in `bootstrap/app.php`
3. Ensure `auth:sanctum` middleware is applied to protected routes
4. Clear application cache: `php artisan cache:clear`

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Support

For issues and questions, please open an issue on GitHub.
