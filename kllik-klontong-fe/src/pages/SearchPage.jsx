// src/pages/SearchPage.jsx

import React, { useState, useMemo } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Search, X, Filter, Clock } from 'lucide-react';
import OnboardingHeader from '../components/OnboardingHeader';
import { DUMMY_PRODUCTS } from '../data/products'; // Import data produk
import ProductCard from '../components/ProductCard'; // Import kartu produk

// Data palsu untuk "Recent Searches"
const recentSearches = ['Indomie', 'Minyak Goreng', 'Shampoo', 'Teh Botol'];

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // --- Logic untuk Membaca Filter dari URL ---
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const brandFilter = searchParams.get('brand');
  const sortFilter = searchParams.get('sort');
  const minPriceFilter = searchParams.get('minPrice');
  const maxPriceFilter = searchParams.get('maxPrice');
  const ratingFilter = searchParams.get('rating');
  // ---

  // Gunakan useMemo agar filter hanya berjalan saat query atau filter params berubah
  const filteredProducts = useMemo(() => {
    // 1. Jangan tampilkan apa-apa jika query kosong
    if (!searchQuery) {
      return [];
    }
    
    // 2. Mulai dengan memfilter berdasarkan NAMA (search query)
    let products = DUMMY_PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 3. Terapkan filter tambahan dari URL (jika ada)
    if (brandFilter) {
      products = products.filter(p => p.category === brandFilter); // (Asumsi brand = category untuk demo ini)
    }
    if (ratingFilter) {
      products = products.filter(p => p.rating >= parseFloat(ratingFilter));
    }
    if (minPriceFilter) {
      products = products.filter(p => p.price >= parseInt(minPriceFilter, 10));
    }
    if (maxPriceFilter) {
      products = products.filter(p => p.price <= parseInt(maxPriceFilter, 10));
    }

    // 4. Terapkan sorting
    if (sortFilter === 'low price') {
      products.sort((a, b) => a.price - b.price);
    }
    // (Tambahkan logic sort 'popular' jika ada datanya)

    return products;
  }, [searchQuery, location.search]); // <-- Re-filter saat query ATAU URL params berubah

  return (
    // 'pb-20' agar tidak tertutup BottomNav
    <div className="pb-20">
      
      {/* Header Halaman (Tombol Kembali & Judul) */}
      <OnboardingHeader title="Search" />

      {/* Search Bar yang ASLI */}
      <div className="relative mb-6">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          autoFocus={true} // Otomatis fokus saat halaman dibuka
          className="w-full border border-gray-300 rounded-lg p-3 pl-10 pr-10"
        />
        {/* Tombol X untuk clear input */}
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Tampilan kondisional: Tampilkan Hasil ATAU History */}
      {searchQuery.length > 0 ? (
        
        // === TAMPILAN HASIL (image_6639f8.png) ===
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Result for "{searchQuery}"</h2>
            {/* Tombol ini mengarah ke Halaman Filter */}
            <Link to="/filter" className="text-gray-600 p-1">
              <Filter size={20} />
            </Link>
          </div>
          
          {/* Kita pakai ulang grid dan ProductCard */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.image}
                  rating={product.rating}
                  sold={product.sold}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-10">
                Produk tidak ditemukan.
              </p>
            )}
          </div>
        </div>

      ) : (

        // === TAMPILAN DEFAULT / HISTORY (image_663732.png) ===
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Recent</h2>
            <button className="text-sm text-green-600 font-medium">Clear All</button>
          </div>
          <div className="flex flex-col gap-2">
            {recentSearches.map((term, index) => (
              <div key={index} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50">
                <button 
                  onClick={() => setSearchQuery(term)} // Klik history akan mengisi search bar
                  className="flex items-center gap-2 text-gray-600"
                >
                  <Clock size={16} />
                  <span>{term}</span>
                </button>
                <button className="text-gray-400 p-1">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;