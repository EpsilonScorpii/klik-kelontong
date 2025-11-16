// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useMemo } from 'react';
import { Truck, Wallet, CreditCard } from 'lucide-react';

// --- DATA DUMMY (KITA PINDAHKAN KE SINI) ---
const DUMMY_ADDRESSES = [
  { id: 'addr1', title: 'Home', street: 'Jl. Kemang Raya No.10' },
  { id: 'addr2', title: 'Office', street: 'Jl. Cikini Raya No.27' },
  { id: 'addr3', title: 'Friends', street: 'Jl. Kebayoran Lama No.36' },
];

const DUMMY_SHIPPING_METHODS = [
  { id: 'ship1', title: 'Regular', details: 'Estimated Arrival 2 - 8 Jam', price: 5000 },
  { id: 'ship2', title: 'Express', details: 'Estimated Arrival 10 - 60 Menit', price: 15000 },
];

const DUMMY_PAYMENT_METHODS = [
  { id: 'cod', title: 'Cash On Delivery', icon: <Truck size={24} />, group: 'COD' },
  { id: 'dana', title: 'Dana', icon: <Wallet size={24} />, group: 'E-Wallet' },
  { id: 'ovo', title: 'OVO', icon: <CreditCard size={24} />, group: 'E-Wallet' },
  { id: 'gopay', title: 'Gopay', icon: <CreditCard size={24} />, group: 'E-Wallet' },
];
// --- END DATA DUMMY ---


const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  
  // 1. STATE BARU UNTUK CHECKOUT
  const [shippingAddress, setShippingAddress] = useState(DUMMY_ADDRESSES[0]); // Default ke 'Home'
  const [shippingMethod, setShippingMethod] = useState(DUMMY_SHIPPING_METHODS[1]); // Default ke 'Express'
  const [paymentMethod, setPaymentMethod] = useState(DUMMY_PAYMENT_METHODS[0]); // Default ke COD

  // --- Fungsi Keranjang (Sama seperti sebelumnya) ---
  const addToCart = (product) => { /* ... (logic tambah item) ... */ };
  const removeFromCart = (productId) => { /* ... (logic hapus item) ... */ };
  const updateQuantity = (productId, newQuantity) => { /* ... (logic update) ... */ };

  // --- Kalkulasi Total (Kita pindah ke sini) ---
  const subTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const discount = 0; // (Nanti bisa diubah)
  const totalCost = subTotal + (shippingMethod?.price || 0) - discount;

  // Nilai-nilai yang akan dibagikan
  const value = {
    // --- Fungsi Keranjang ---
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount: cartItems.reduce((total, item) => total + item.quantity, 0),
    
    // --- Data & State Checkout ---
    dummyAddresses: DUMMY_ADDRESSES,
    dummyShippingMethods: DUMMY_SHIPPING_METHODS,
    shippingAddress,
    setShippingAddress,
    shippingMethod,       // <-- HANYA SATU KALI
    setShippingMethod,    // <-- HANYA SATU KALI
    
    // --- Data & State Payment ---
    dummyPaymentMethods: DUMMY_PAYMENT_METHODS,
    paymentMethod,
    setPaymentMethod,
    
    // --- Kalkulasi Total ---
    subTotal,             // <-- HANYA SATU KALI
    discount,             // <-- HANYA SATU KALI
    totalCost,            // <-- HANYA SATU KALI
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}