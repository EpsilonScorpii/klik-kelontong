// src/pages/HelpCenterPage.jsx

import React, { useState } from 'react';
import OnboardingHeader from '../components/OnboardingHeader';
import FaqTab from '../components/FaqTab';
import ContactUsTab from '../components/ContactUsTab';

// Komponen helper kecil untuk tombol Tab
function TabButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 text-center font-medium text-sm
        ${isActive 
          ? 'border-b-2 border-green-600 text-green-600' 
          : 'text-gray-500 hover:text-gray-700'
        }
      `}
    >
      {label}
    </button>
  );
}

function HelpCenterPage() {
  // State untuk melacak tab utama
  const [activeTab, setActiveTab] = useState('FAQ');
  
  return (
    // Kita buat full-width di desktop
    <div className="pb-20">
      <OnboardingHeader title="Help Center" />
      
      {/* Navigasi Tab (FAQ / Contact Us) */}
      <nav className="flex justify-around border-b border-gray-200 mb-6">
        <TabButton 
          label="FAQ" 
          isActive={activeTab === 'FAQ'} 
          onClick={() => setActiveTab('FAQ')} 
        />
        <TabButton 
          label="Contact Us" 
          isActive={activeTab === 'Contact Us'} 
          onClick={() => setActiveTab('Contact Us')} 
        />
      </nav>
      
      {/* Konten Tab yang Berganti-ganti */}
      <div>
        {activeTab === 'FAQ' ? <FaqTab /> : <ContactUsTab />}
      </div>
    </div>
  );
}

export default HelpCenterPage;