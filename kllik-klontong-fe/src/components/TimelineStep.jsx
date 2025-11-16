// src/components/TimelineStep.jsx

import React from 'react';
import { Check } from 'lucide-react';

function TimelineStep({ icon, title, time, isComplete, isLastStep = false }) {
  return (
    <div className="flex gap-4">
      {/* Kolom Ikon & Garis */}
      <div className="flex flex-col items-center relative">
        {/* Ikon */}
        <div 
          className={`w-10 h-10 rounded-full flex items-center justify-center
            ${isComplete ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'}
          `}
        >
          {isComplete ? <Check size={20} /> : icon}
        </div>
        
        {/* Garis Vertikal (hilang jika ini langkah terakhir) */}
        {!isLastStep && (
          <div className={`absolute top-10 h-full w-0.5 
            ${isComplete ? 'bg-green-600' : 'bg-gray-200'}
          `}></div>
        )}
      </div>

      {/* Kolom Teks */}
      <div className={`flex-grow pb-8 ${isLastStep ? 'pb-0' : ''}`}>
        <h3 className={`font-medium ${isComplete ? 'text-gray-800' : 'text-gray-400'}`}>
          {title}
        </h3>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  );
}

export default TimelineStep;