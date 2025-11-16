// src/pages/HomePage.jsx
import PromoCarousel from '../components/PromoCarousel'
// 1. IMPORT KOMPONEN YANG LUPA KAMU NYALAKAN
import CategoryFilter from '../components/CategoryFilter'
import ProductList from '../components/ProductList'


function HomePage() {
    return (
        // 2. KITA HAPUS 'gap-4' AGAR JADI SATU KESATUAN
        <div className="flex flex-col gap-6">
            <PromoCarousel />

            {/* 3. PASTIKAN INI SUDAH TIDAK ADA KOMENTARNYA */}
            <CategoryFilter />

            {/* 4. PASTIKAN INI JUGA SUDAH TIDAK ADA KOMENTARNYA */}
            <ProductList 
                kategori="Rekomendasi"
            />
        </div>
    )
}

export default HomePage;