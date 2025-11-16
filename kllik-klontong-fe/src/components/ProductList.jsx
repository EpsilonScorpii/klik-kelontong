// src/components/ProductList.jsx

import React from 'react';
import ProductCard from './ProductCard'; 
import { DUMMY_PRODUCTS } from '../data/products';


function ProductList({ kategori }) {
  const productsToShow = DUMMY_PRODUCTS.filter(product => {
    if (kategori === 'Rekomendasi') {
      return product.isRecommended === true;
    }
    return product.category === kategori;
  });

  return (
    <div className="pb-20">
      
      <h2 className="text-lg font-bold text-gray-900 mb-3">
        {kategori}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        
        {/* 2. UBAH MAPPING / LOOPING */}
        {/* Kita tambahkan props 'rating' dan 'sold' */}
        {productsToShow.map(product => (
          <ProductCard 
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.image}
            rating={product.rating}
            sold={product.sold}
          />
        ))}
      </div>

      {productsToShow.length === 0 && (
        <div className="col-span-full text-center text-gray-500 py-10">
          <p>Oops! Belum ada produk di kategori "{kategori}".</p>
        </div>
      )}

    </div>
  );
}

export default ProductList;