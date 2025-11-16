// src/pages/FilterPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingHeader from '../components/OnboardingHeader';
import FilterChip from '../components/FilterChip';
import { Star } from 'lucide-react';

// 1. Import Slider dan CSS-nya
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// Data-data palsu untuk filter
const brands = ['All', 'Indomie', 'Sedap', 'Sakura', 'Bimoli'];
const sizes = ['All', '1L', '500ml', '250ml'];
const sorts = ['Most Recent', 'Popular', 'Low Price'];

function FilterPage() {
  const navigate = useNavigate();

  // 2. Buat state untuk setiap pilihan filter
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedSortBy, setSelectedSortBy] = useState('Most Recent');
  const [priceRange, setPriceRange] = useState([10, 100]); // [min, max]
  const [selectedRating, setSelectedRating] = useState(null); // '4.5' atau '4.0'

  const handleApply = () => {
    // 3. Logic untuk "Apply"
    // Kita akan kirim data filter kembali ke halaman /search
    // menggunakan URL Query Params
    const params = new URLSearchParams();
    
    if (selectedBrand !== 'All') params.append('brand', selectedBrand);
    if (selectedSortBy !== 'Most Recent') params.append('sort', selectedSortBy.toLowerCase());
    params.append('minPrice', priceRange[0] * 1000); // (Asumsi 10 = 10rb)
    params.append('maxPrice', priceRange[1] * 1000);
    if (selectedRating) params.append('rating', selectedRating);

    // Navigasi kembali ke halaman search DENGAN data filter
    navigate(`/search?${params.toString()}`);
  };

  const handleReset = () => {
    // 4. Logic untuk "Reset"
    setSelectedBrand('All');
    setSelectedSize('All');
    setSelectedSortBy('Most Recent');
    setPriceRange([10, 100]);
    setSelectedRating(null);
  };

  return (
    // 'pb-36' -> Padding bawah untuk 2 footer (Apply & BottomNav)
    <div className="pb-36">
      <OnboardingHeader title="Filter" />

      <div className="flex flex-col gap-6">
        {/* Bagian Brands */}
        <FilterSection title="Brands">
          {brands.map(brand => (
            <FilterChip 
              key={brand}
              label={brand}
              isSelected={selectedBrand === brand}
              onClick={() => setSelectedBrand(brand)}
            />
          ))}
        </FilterSection>

        {/* Bagian Size */}
        <FilterSection title="Size">
          {sizes.map(size => (
            <FilterChip 
              key={size}
              label={size}
              isSelected={selectedSize === size}
              onClick={() => setSelectedSize(size)}
            />
          ))}
        </FilterSection>

        {/* Bagian Sort By */}
        <FilterSection title="Sort by">
          {sorts.map(sort => (
            <FilterChip 
              key={sort}
              label={sort}
              isSelected={selectedSortBy === sort}
              onClick={() => setSelectedSortBy(sort)}
            />
          ))}
        </FilterSection>

        {/* Bagian Pricing Range */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Pricing Range</h3>
          <div className="px-2">
            <Slider
              range
              min={0}
              max={150} // Sesuai desain
              value={priceRange}
              onChange={(newValue) => setPriceRange(newValue)}
              marks={{ 0: '0', 10: '10', 20: '20', 50: '50', 100: '100', 150: '150+' }}
              trackStyle={{ backgroundColor: '#16a34a' }} // (Warna hijau)
              handleStyle={{ borderColor: '#16a34a', borderWidth: 2 }}
            />
          </div>
        </div>

        {/* Bagian Reviews */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Reviews</h3>
          <div className="flex flex-col gap-3">
            <RatingOption 
              value="4.5"
              label="4.5 and above"
              selected={selectedRating}
              onSelect={setSelectedRating}
            />
            <RatingOption 
              value="4.0"
              label="4.0 - 4.5"
              selected={selectedRating}
              onSelect={setSelectedRating}
            />
          </div>
        </div>
      </div>

      {/* Footer Tombol Apply/Reset (fixed di bawah) */}
      <div className="fixed bottom-[64px] left-0 right-0 z-40 lg:bottom-0">
        <div className="max-w-lg mx-auto bg-white p-4 border-t border-gray-200 flex gap-3">
          <button 
            onClick={handleReset}
            className="w-full bg-green-100 text-green-700 font-medium py-3 rounded-full"
          >
            Reset Filter
          </button>
          <button 
            onClick={handleApply}
            className="w-full bg-green-600 text-white font-medium py-3 rounded-full"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

// Komponen helper internal untuk judul + pills
function FilterSection({ title, children }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      {/* 'overflow-x-auto' agar bisa di-scroll di mobile jika terlalu panjang */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {children}
      </div>
    </div>
  );
}

// Komponen helper internal untuk rating
function RatingOption({ value, label, selected, onSelect }) {
  const isSelected = selected === value;
  return (
    <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="flex text-yellow-400">
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
          {value === '4.5' && <Star size={20} fill="currentColor" />}
          {value === '4.0' && <Star size={20} fill="none" className="text-gray-300" />}
        </div>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      
      {/* Tombol Radio Kustom */}
      <input 
        type="radio" 
        name="rating" 
        checked={isSelected} 
        onChange={() => onSelect(value)} 
        className="sr-only" // Sembunyikan radio aslinya
      />
      <div className={`w-6 h-6 rounded-full flex-shrink-0 border-2 ${isSelected ? 'border-green-600' : 'border-gray-300'}`}>
        {isSelected && <div className="w-full h-full p-0.5"><div className="w-full h-full rounded-full bg-green-600"></div></div>}
      </div>
    </label>
  );
}

export default FilterPage;