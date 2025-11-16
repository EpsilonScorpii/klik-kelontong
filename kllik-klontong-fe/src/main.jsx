// src/main.jsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// 1. IMPORT LAYOUTS
import App from './App.jsx';
import OnboardingLayout from './layouts/OnboardingLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';

// 2. IMPORT PROVIDERS
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

// 3. IMPORT PROTECTED ROUTES
import AdminProtectedRoute from './layouts/AdminProtectedRoute.jsx'; 
import CustomerProtectedRoute from './layouts/CustomerProtectedRoute.jsx';
import PublicRoute from './layouts/PublicRoute.jsx';

// 4. IMPORT HALAMAN
// (Halaman Onboarding)
import SplashPage from './pages/SplashPage.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
import LocationPage from './pages/LocationPage.jsx';
import SearchLocationPage from './pages/SearchLocationPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import VerifyCodePage from './pages/VerifyCodePage.jsx';
import CompleteProfilePage from './pages/CompleteProfilePage.jsx';
import ForgetPasswordPage from './pages/ForgetPasswordPage.jsx';
import VerifyForgotPasswordPage from './pages/VerifyForgotPasswordPage.jsx';
import NewPasswordPage from './pages/NewPasswordPage.jsx';

// (Halaman Customer)
import HomePage from './pages/HomePage.jsx';
import ActivityPage from './pages/ActivityPage.jsx';
import MessagePage from './pages/MessagePage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CouponPage from './pages/CouponPage.jsx';
import ChooseShippingPage from './pages/ChooseShippingPage.jsx';
import ShippingAddressPage from './pages/ShippingAddressPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import PaymentMethodPage from './pages/PaymentMethodPage.jsx';
import PaymentSuccessPage from './pages/PaymentSuccessPage.jsx';
import AddCardPage from './pages/AddCardPage.jsx';
import PaymentMethodsListPage from './pages/PaymentMethodsListPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import FilterPage from './pages/FilterPage.jsx';
import TrackOrderPage from './pages/TrackOrderPage.jsx';
import ReviewPage from './pages/ReviewPage.jsx';
import ChatDetailPage from './pages/ChatDetailPage.jsx';
import HelpCenterPage from './pages/HelpCenterPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import PasswordManagerPage from './pages/PasswordManagerPage.jsx';

// (Halaman Admin)
import DashboardPage from './pages/admin/DashboardPage.jsx';
import AdminProductPage from './pages/admin/AdminProductPage.jsx'; 
// import AdminOrderPage from './pages/admin/AdminOrderPage.jsx';


// 5. BUAT ROUTER DENGAN STRUKTUR YANG BENAR
const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashPage />,
  },
  {
    // GRUP 1: ONBOARDING (Publik, tidak perlu login)
    element: (
      <PublicRoute> {/* <-- 2. BUNGKUS DENGAN INI */}
        <OnboardingLayout />
      </PublicRoute>
    ),
    children: [
      { path: "/welcome", element: <WelcomePage /> },
      { path: "/location", element: <LocationPage /> },
      { path: "/search-location", element: <SearchLocationPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/verify-code", element: <VerifyCodePage /> },
      { path: "/complete-profile", element: <CompleteProfilePage /> },
      { path: "/forget-password", element: <ForgetPasswordPage /> },
      { path: "/verify-forgot-password", element: <VerifyForgotPasswordPage /> },
      { path: "/new-password", element: <NewPasswordPage /> },
    ]
  },
  {
    // GRUP 2: APLIKASI CUSTOMER (Harus login)
    element: (
      <CustomerProtectedRoute>
        <App /> {/* Layout dengan Header, Sidebar, BottomNav */}
      </CustomerProtectedRoute>
    ),
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/aktivitas", element: <ActivityPage /> },
      { path: "/pembayaran", element: <PaymentMethodsListPage /> },
      { path: "/pesan", element: <MessagePage /> },
      { path: "/akun", element: <AccountPage /> },
      { path: "/category/:categoryId", element: <CategoryPage /> },
      { path: "/product/:productId", element: <ProductDetailPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/coupon", element: <CouponPage /> },
      { path: "/shipping-address", element: <ShippingAddressPage /> },
      { path: "/shipping-method", element: <ChooseShippingPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/payment-method", element: <PaymentMethodPage /> },
      { path: "/payment-success", element: <PaymentSuccessPage /> },
      { path: "/add-card", element: <AddCardPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/filter", element: <FilterPage /> },
      { path: "/track-order/:orderId", element: <TrackOrderPage /> },
      { path: "/review/:orderId", element: <ReviewPage /> },
      { path: "/chat/:chatId", element: <ChatDetailPage /> },
      { path: "/help", element: <HelpCenterPage /> },
      { path: "/privacy", element: <PrivacyPolicyPage /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/password-manager", element: <PasswordManagerPage /> },
    ]
  },
  {
    // GRUP 3: APLIKASI ADMIN (Harus login & admin)
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "products", element: <AdminProductPage /> },
      // { path: "orders", element: <AdminOrderPage /> },
    ]
  }
]);

// 6. RENDER DENGAN SEMUA PROVIDER
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AuthProvider HARUS membungkus CartProvider dan Router */}
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);