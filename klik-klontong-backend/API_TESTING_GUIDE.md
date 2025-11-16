# API Testing Guide

## Quick Test Commands

### Using cURL

#### 1. Get CSRF Cookie (Required First)
```bash
curl -X GET http://localhost:8000/sanctum/csrf-cookie \
  -c cookies.txt -b cookies.txt
```

#### 2. Register a New User
```bash
curl -X POST http://localhost:8000/register \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "X-XSRF-TOKEN: <token-from-cookie>" \
  -c cookies.txt -b cookies.txt \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

#### 3. Login
```bash
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "X-XSRF-TOKEN: <token-from-cookie>" \
  -c cookies.txt -b cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### 4. Get Current User
```bash
curl -X GET http://localhost:8000/api/user \
  -H "Accept: application/json" \
  -c cookies.txt -b cookies.txt
```

#### 5. Logout
```bash
curl -X POST http://localhost:8000/logout \
  -H "Accept: application/json" \
  -H "X-XSRF-TOKEN: <token-from-cookie>" \
  -c cookies.txt -b cookies.txt
```

### Using JavaScript/Axios (Frontend)

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

// Complete authentication flow
async function testAuth() {
  try {
    // 1. Get CSRF cookie
    await apiClient.get('/sanctum/csrf-cookie');
    
    // 2. Register
    const registerResponse = await apiClient.post('/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      password_confirmation: 'password123'
    });
    console.log('Register:', registerResponse.data);
    
    // 3. Get user profile
    const userResponse = await apiClient.get('/api/user');
    console.log('User:', userResponse.data);
    
    // 4. Logout
    const logoutResponse = await apiClient.post('/logout');
    console.log('Logout:', logoutResponse.data);
    
    // 5. Login again
    await apiClient.get('/sanctum/csrf-cookie');
    const loginResponse = await apiClient.post('/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Login:', loginResponse.data);
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testAuth();
```

## Expected Response Examples

### Successful Registration (201)
```json
{
  "id": 1,
  "name": "Test User",
  "email": "test@example.com",
  "is_admin": false
}
```

### Successful Login (200)
```json
{
  "id": 1,
  "name": "Test User",
  "email": "test@example.com",
  "is_admin": false
}
```

### Successful Logout (200)
```json
{
  "message": "Logged out successfully"
}
```

### Get User Profile (200)
```json
{
  "id": 1,
  "name": "Test User",
  "email": "test@example.com",
  "is_admin": false
}
```

### Validation Error (422)
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

### Unauthenticated (401)
```json
{
  "message": "Unauthenticated."
}
```

### Rate Limit Exceeded (429)
```json
{
  "message": "Too many attempts. Please try again in 60 seconds."
}
```

## Admin Endpoints Testing

### Create Admin User (using tinker)
```bash
php artisan tinker
```

```php
User::create([
    'name' => 'Admin User',
    'email' => 'admin@example.com',
    'password' => bcrypt('admin123'),
    'is_admin' => true,
]);
```

### Test Admin Endpoints

#### List Products
```bash
curl -X GET http://localhost:8000/api/admin/products \
  -H "Accept: application/json" \
  -c cookies.txt -b cookies.txt
```

#### Create Product
```bash
curl -X POST http://localhost:8000/api/admin/products \
  -H "Accept: application/json" \
  -c cookies.txt -b cookies.txt \
  -F "name=Test Product" \
  -F "price=10000" \
  -F "stock=100" \
  -F "category=Electronics" \
  -F "description=Test description" \
  -F "discount_price=9000" \
  -F "image=@/path/to/image.jpg"
```

#### Update Product
```bash
curl -X PUT http://localhost:8000/api/admin/products/1 \
  -H "Accept: application/json" \
  -c cookies.txt -b cookies.txt \
  -F "name=Updated Product" \
  -F "price=12000" \
  -F "stock=150" \
  -F "category=Electronics" \
  -F "description=Updated description" \
  -F "discount_price=11000"
```

#### Delete Product
```bash
curl -X DELETE http://localhost:8000/api/admin/products/1 \
  -H "Accept: application/json" \
  -c cookies.txt -b cookies.txt
```

## Testing Rate Limits

### Test Login Rate Limit (5 per minute)
```bash
for i in {1..6}; do
  echo "Attempt $i:"
  curl -X POST http://localhost:8000/login \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "email": "wrong@example.com",
      "password": "wrongpassword"
    }'
  echo "\n"
done
```

## Common Issues and Solutions

### CORS Issues
- Ensure frontend URL is in `SANCTUM_STATEFUL_DOMAINS`
- Check `config/cors.php` for allowed origins
- Verify `withCredentials: true` in axios config

### CSRF Token Issues
- Always call `/sanctum/csrf-cookie` before login/register
- Ensure cookies are being sent with requests
- Check that `XSRF-TOKEN` header is set correctly

### Authentication Not Working
- Clear cache: `php artisan cache:clear`
- Clear config: `php artisan config:clear`
- Verify session driver is set to `database`
- Check that migrations have been run

## Postman Collection

Import this JSON to test in Postman:

```json
{
  "info": {
    "name": "Klik Kelontong API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get CSRF Cookie",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:8000/sanctum/csrf-cookie",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8000",
          "path": ["sanctum", "csrf-cookie"]
        }
      }
    },
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Accept",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\",\n  \"password_confirmation\": \"password123\"\n}"
        },
        "url": {
          "raw": "http://localhost:8000/register",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8000",
          "path": ["register"]
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Accept",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
        },
        "url": {
          "raw": "http://localhost:8000/login",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8000",
          "path": ["login"]
        }
      }
    },
    {
      "name": "Get User",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Accept",
            "value": "application/json"
          }
        ],
        "url": {
          "raw": "http://localhost:8000/api/user",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8000",
          "path": ["api", "user"]
        }
      }
    }
  ]
}
```

## Security Testing Checklist

- [ ] CSRF protection is working
- [ ] Rate limiting is enforced
- [ ] Passwords are properly hashed
- [ ] Admin middleware blocks non-admin users
- [ ] Session invalidation works on logout
- [ ] Token regeneration works after login
- [ ] CORS is properly configured
- [ ] File upload validation works
- [ ] SQL injection prevention
- [ ] XSS prevention
