// src/pages/ReviewPage.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OnboardingHeader from '../components/OnboardingHeader';
import StarRating from '../components/StarRating'; // <-- Komponen bintang kita
import { Camera } from 'lucide-react';

// --- DATA DUMMY (Nanti ganti dari API) ---
// Kita butuh data order/produk. Di aplikasi nyata, kita 'fetch'
// data ini menggunakan 'orderId' dari URL.
// Kita akan hardcode satu data untuk demo.
const DUMMY_ORDER_ITEM = {
  id: 'order3', // ID ini harusnya cocok dengan yang dari ActivityPage
  name: 'Indomie Goreng',
  details: 'Qty: 5pcs',
  price: 15000,
  image: 'https://i.ibb.co/Smb2H1P/indomie.png'
};

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};
// --- END DATA DUMMY ---

function ReviewPage() {
  const { orderId } = useParams(); // <-- Membaca ID dari URL
  const navigate = useNavigate();

  // Ambil data produk (di sini kita pakai data dummy)
  const item = DUMMY_ORDER_ITEM; 

  // State untuk form
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic API untuk kirim review...
    console.log({
      orderId: orderId,
      rating: rating,
      review: reviewText,
    });
    alert('Ulasan terkirim!');
    navigate('/aktivitas'); // Kembali ke halaman aktivitas
  };

  return (
    // 'pb-36' -> Padding bawah untuk 2 footer (Submit & BottomNav)
    <div className="pb-36">
      
      {/* Desainmu 'image_74d559.png' punya judul "Kotak Masuk"
        tapi nama filenya "Review" dan tombolnya "Review".
        Kita akan pakai judul "Review" agar lebih logis.
      */}
      <OnboardingHeader title="Review" />

      {/* Ringkasan Produk */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-100 mb-6">
        <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-md bg-gray-50" />
        <div className="flex-grow min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.details}</p>
          <p className="text-base font-bold text-gray-900 mt-1">{formatRupiah(item.price)}</p>
        </div>
      </div>

      {/* Form Review */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Bagian Bintang */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">How is your order?</h2>
          <p className="text-sm text-gray-500 mt-2">Your overall rating</p>
          <div className="mt-4">
            <StarRating onChange={(newRating) => setRating(newRating)} />
          </div>
        </div>

        <hr />

        {/* Bagian Teks Review */}
        <div>
          <label className="text-sm font-medium text-gray-700">Add detailed review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={4}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter here"
          />
        </div>

        {/* Bagian Foto */}
        <div>
          <label className="text-sm font-medium text-gray-700">Add photo</label>
          {/* Ini adalah 'dropzone' palsu, kamu bisa ganti dengan input file */}
          <div className="mt-1 w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400 cursor-pointer">
            <Camera size={40} />
          </div>
        </div>
      </form>

      {/* Tombol Footer "Cancel" & "Submit" (fixed di bawah) */}
      <div className="fixed bottom-[64px] left-0 right-0 z-40 lg:bottom-0">
        <div className="max-w-lg mx-auto bg-white p-4 border-t border-gray-200 flex gap-3">
          <button 
            onClick={() => navigate(-1)} // Kembali
            className="w-full bg-green-100 text-green-700 font-medium py-3 rounded-full"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} // Menjalankan fungsi submit form
            className="w-full bg-green-600 text-white font-medium py-3 rounded-full"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;