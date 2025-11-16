// src/pages/PrivacyPolicyPage.jsx

import React from 'react';
import OnboardingHeader from '../components/OnboardingHeader'; // Kita pakai ulang header

function PrivacyPolicyPage() {
  return (
    // Kita buat full-width di desktop
    <div className="pb-20">
      
      {/* Header Halaman (Tombol Kembali & Judul) */}
      <OnboardingHeader title="Privacy Policy" />

      {/* Konten Teks */}
      <div className="flex flex-col gap-6">
        
        {/* Bagian Cancellation Policy */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Cancelation Policy
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Pesanan dapat dibatalkan sebelum proses pengemasan dimulai. Jika pesanan sudah dalam proses pengiriman, pembatalan tidak dapat dilakukan. Untuk bantuan lebih lanjut, silakan hubungi layanan pelanggan kami.
          </p>
        </div>

        {/* Bagian Terms & Condition */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Terms & Condition
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed space-y-3">
            <span>
              Dengan mengakses dan menggunakan layanan Klik Kelontong, pengguna dianggap telah membaca, memahami, dan menyetujui semua syarat dan ketentuan yang berlaku.
            </span>
            <span>
              Pengguna bertanggung jawab atas kebenaran data yang diberikan saat mendaftar, termasuk informasi kontak dan alamat pengiriman. Klik Kelontong tidak bertanggung jawab atas keterlambatan atau kegagalan pengiriman akibat informasi yang tidak akurat.
            </span>
            <span>
              Seluruh transaksi di Klik Kelontong mengikuti ketentuan harga, stok produk, serta kebijakan promosi yang sedang berlaku. Kami berhak membatalkan atau menolak pesanan apabila ditemukan adanya indikasi penyalahgunaan, penipuan, kesalahan sistem, atau pelanggaran terhadap ketentuan platform. Pembatalan juga dapat terjadi apabila produk yang dipesan tidak tersedia atau terjadi kendala logistik di luar kendali kami.
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default PrivacyPolicyPage;