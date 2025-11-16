// src/components/ContactUsTab.jsx

import React from 'react';
import AccordionItem from './AccordionItem'; // Kita pakai ulang accordion
import { Headphones, MessageSquare, Instagram } from 'lucide-react'; // Ganti 'MessageSquare' dari 'WhatsApp'

function ContactUsTab() {
  return (
    <div className="flex flex-col gap-3">
      {/* Item yang tidak bisa diklik */}
      <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
        <Headphones size={24} className="text-green-600" />
        <span className="font-semibold text-gray-800">Customer Service</span>
      </div>
      
      {/* Item Accordion untuk WhatsApp */}
      <AccordionItem 
        title="WhatsApp" 
        startIcon={<MessageSquare size={24} />}
      >
        <p>Silakan hubungi kami di nomor:</p>
        <a href="tel:081234567890" className="font-semibold text-green-600">0812-3456-7890</a>
      </AccordionItem>
      
      {/* Item Accordion untuk Instagram */}
      <AccordionItem 
        title="Instagram" 
        startIcon={<Instagram size={24} />}
      >
        <p>Follow dan DM kami di:</p>
        <a href="#" className="font-semibold text-green-600">@klikkelontong</a>
      </AccordionItem>
    </div>
  );
}

export default ContactUsTab;