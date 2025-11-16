// src/pages/SettingsPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import OnboardingHeader from '../components/OnboardingHeader';
import { Bell, KeyRound, MinusCircle, ChevronRight } from 'lucide-react';

// Komponen helper internal untuk satu baris menu
function SettingsItem({ to, label, icon, isDestructive = false }) {
  const textColor = isDestructive ? 'text-red-600' : 'text-gray-700';
  const iconColor = isDestructive ? 'text-red-600' : 'text-green-600';
  const hoverBg = isDestructive ? 'hover:bg-red-50' : 'hover:bg-gray-50';

  return (
    <Link to={to} className="w-full">
      <div 
        className={`flex items-center gap-4 p-4 rounded-lg ${textColor} ${hoverBg} bg-white`}
      >
        <span className={iconColor}>{icon}</span>
        <span className="flex-grow font-medium">{label}</span>
        <ChevronRight size={20} className="text-gray-400" />
      </div>
    </Link>
  );
}


function SettingsPage() {
  return (
    // Kita buat full-width di desktop
    <div className="pb-20">
      
      {/* Header Halaman (Tombol Kembali & Judul) */}
      <OnboardingHeader title="Settings" />

      {/* Daftar Menu */}
      <div className="flex flex-col gap-2">
        
        <SettingsItem 
          to="/notification-settings" // (Halaman ini belum kita buat)
          label="Notification Settings"
          icon={<Bell size={24} />}
        />
        
        <SettingsItem 
          to="/password-manager" // (Ke halaman yang akan kita buat)
          label="Password Manager"
          icon={<KeyRound size={24} />}
        />
        
        <SettingsItem 
          to="/delete-account" // (Halaman ini belum kita buat)
          label="Delete Account"
          icon={<MinusCircle size={24} />}
          isDestructive={true}
        />
        
      </div>
    </div>
  );
}

export default SettingsPage;