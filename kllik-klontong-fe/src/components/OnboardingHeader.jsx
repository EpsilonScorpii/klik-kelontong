// src/components/OnboardingHeader.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function OnboardingHeader({ title }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center relative justify-center mb-6">
      <button 
        onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
        className="absolute left-0 p-2 hover:bg-gray-100 rounded-full"
      >
        <ArrowLeft size={24} className="text-gray-800" />
      </button>
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
    </div>
  );
}

export default OnboardingHeader;