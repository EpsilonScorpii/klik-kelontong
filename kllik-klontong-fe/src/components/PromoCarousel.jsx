// src/components/PromoCarousel.jsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import CSS fundamental Swiper
import 'swiper/css';
import 'swiper/css/pagination';

// Import gambar
import GambarSembako from '../assets/image/gambar-sembako.png';

function PromoCarousel() {
  
  // 1. KITA KEMBALIKAN WRAPPER-NYA
  // Tapi HANYA untuk memberi padding horizontal (px-4)
  // Ini akan menghentikan overflow ke samping.
  // pt-2 memberi sedikit jarak dari "All Category"
  return (
    <div className="pt-2"> 
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        slidesPerView={1}
        className="rounded-xl" // Sudut bulat kita pasang di sini
      >
        
        {/* === SLIDE 1 (Sesuai Desain) === */}
        <SwiperSlide>
          {/* Desain slide di dalamnya tidak berubah */}
          <div className="flex w-full items-center rounded-xl bg-green-500 p-4 text-white">
            <div className="w-1/2 flex-shrink-0 pr-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                THE BEST PRODUCT
              </span>
              <h2 className="mt-1 text-2xl font-bold">Promo Sembako</h2>
              <p className="mt-2 text-xs">
                Promo sembako TERBATAS! Belanja sekarang sebelum promo berakhir! 🛒
              </p>
              <button 
                className="mt-4 flex items-center gap-2 rounded-lg bg-white 
                           px-3 py-1.5 text-xs font-bold text-green-600
                           transition-transform hover:scale-105"
              >
                SHOP NOW
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
<div className="w-1/2 h-[200px]">
  {/* h-full = Paksa tinggi gambar 100% (dari parent-nya yg 144px)
    w-auto = Biarkan lebar gambar menyesuaikan otomatis
    mx-auto = (Opsional) Pusatkan gambar di tengah box-nya
  */}
  <img 
    src={GambarSembako} 
    alt="Promo Sembako" 
    className="h-full w-auto object-contain mx-auto" 
  />
</div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          {/* Desain slide di dalamnya tidak berubah */}
          <div className="flex w-full items-center rounded-xl bg-green-500 p-4 text-white">
            <div className="w-1/2 flex-shrink-0 pr-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                THE BEST PRODUCT
              </span>
              <h2 className="mt-1 text-2xl font-bold">Promo Sembako</h2>
              <p className="mt-2 text-xs">
                Promo sembako TERBATAS! Belanja sekarang sebelum promo berakhir! 🛒
              </p>
              <button 
                className="mt-4 flex items-center gap-2 rounded-lg bg-white 
                           px-3 py-1.5 text-xs font-bold text-green-600
                           transition-transform hover:scale-105"
              >
                SHOP NOW
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
<div className="w-1/2 h-[200px]">
  {/* h-full = Paksa tinggi gambar 100% (dari parent-nya yg 144px)
    w-auto = Biarkan lebar gambar menyesuaikan otomatis
    mx-auto = (Opsional) Pusatkan gambar di tengah box-nya
  */}
  <img 
    src={GambarSembako} 
    alt="Promo Sembako" 
    className="h-full w-auto object-contain mx-auto" 
  />
</div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          {/* Desain slide di dalamnya tidak berubah */}
          <div className="flex w-full items-center rounded-xl bg-green-500 p-4 text-white">
            <div className="w-1/2 flex-shrink-0 pr-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                THE BEST PRODUCT
              </span>
              <h2 className="mt-1 text-2xl font-bold">Promo Sembako</h2>
              <p className="mt-2 text-xs">
                Promo sembako TERBATAS! Belanja sekarang sebelum promo berakhir! 🛒
              </p>
              <button 
                className="mt-4 flex items-center gap-2 rounded-lg bg-white 
                           px-3 py-1.5 text-xs font-bold text-green-600
                           transition-transform hover:scale-105"
              >
                SHOP NOW
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
<div className="w-1/2 h-[200px]">
  {/* h-full = Paksa tinggi gambar 100% (dari parent-nya yg 144px)
    w-auto = Biarkan lebar gambar menyesuaikan otomatis
    mx-auto = (Opsional) Pusatkan gambar di tengah box-nya
  */}
  <img 
    src={GambarSembako} 
    alt="Promo Sembako" 
    className="h-full w-auto object-contain mx-auto" 
  />
</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default PromoCarousel;