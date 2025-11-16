// src/pages/CompleteProfilePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit2 } from 'lucide-react';
import OnboardingHeader from '../components/OnboardingHeader';

function CompleteProfilePage() {
  const navigate = useNavigate();

  const handleComplete = (e) => {
    e.preventDefault();
    // Logic API simpan profil...
    // Jika sukses, lempar ke halaman lokasi (alur onboarding)
    navigate('/location');
  };

  return (
    <div className="flex flex-col h-full">
      <OnboardingHeader title="Complete Your Profile" />
      
      <p className="text-center text-gray-500 mb-8 -mt-4">
        Don't worry, only you can see your personal
        data. No one else will be able to see it.
      </p>

      {/* Avatar */}
      <div className="relative w-24 h-24 mx-auto mb-8">
        <span className="w-full h-full flex items-center justify-center bg-gray-700 text-white rounded-full">
          <User size={60} />
        </span>
        <button className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full text-white">
          <Edit2 size={16} />
        </button>
      </div>

      <form onSubmit={handleComplete} className="flex-grow">
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input type="text" placeholder="Jahri" className="w-full mt-1 p-3 border border-gray-300 rounded-lg ..." />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <div className="flex gap-2">
            <select className="p-3 border border-gray-300 rounded-lg ...">
              <option>+62</option>
            </select>
            <input type="tel" placeholder="Enter Phone Number" className="w-full mt-0 p-3 border border-gray-300 rounded-lg ..." />
          </div>
        </div>
        <div className="mb-8">
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <select className="w-full mt-1 p-3 border border-gray-300 rounded-lg ...">
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <button 
          type="submit"
          className="w-full bg-green-600 text-white text-lg font-medium py-3 px-6 rounded-full hover:bg-green-700"
        >
          Complete Profile
        </button>
      </form>
    </div>
  );
}
export default CompleteProfilePage;