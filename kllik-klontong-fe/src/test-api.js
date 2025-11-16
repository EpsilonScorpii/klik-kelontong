import axios from 'axios';

async function testRegister() {
  try {
    console.log('🚀 Testing Register API...');
    
    // Get CSRF cookie first
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true
    });
    
    console.log('✅ CSRF Cookie obtained');
    
    // Register user
    const response = await axios.post('http://localhost:8000/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      password_confirmation: 'password123'
    }, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Register SUCCESS!', response.data);
  } catch (error) {
    console.error('❌ Register FAILED!', error.response?.data || error.message);
  }
}

// Run test
testRegister();