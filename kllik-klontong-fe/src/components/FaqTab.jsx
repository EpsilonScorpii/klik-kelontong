// src/components/FaqTab.jsx

import React, { useState } from 'react';
import FilterChip from './FilterChip'; // Kita pakai ulang komponen chip
import AccordionItem from './AccordionItem'; // Kita pakai ulang accordion

// --- DATA DUMMY ---
const DUMMY_FAQS = [
  { id: 1, q: 'Can I track my order\'s delivery status?', a: 'You can track your order\'s delivery status directly from your order history or via the tracking link we\'ve sent to your email. Let us know if you need help!', category: 'Services' },
  { id: 2, q: 'How do I customer support?', a: 'You can contact us via the "Contact Us" tab, or email support@klikkelontong.com.', category: 'General' },
  { id: 3, q: 'What payment methods are accepted?', a: 'We accept COD, E-Wallets (Dana, OVO, Gopay), and Credit/Debit Cards.', category: 'Services' },
  { id: 4, q: 'How to add review', a: 'You can add a review by going to the "Aktivitas" > "Completed" tab and clicking the "Review" button on an order.', category: 'Account' },
];

const chips = ['All', 'Services', 'General', 'Account'];
// --- END DATA DUMMY ---

function FaqTab() {
  const [activeChip, setActiveChip] = useState('All');

  // Logic untuk filter FAQ berdasarkan chip
  const filteredFaqs = (activeChip === 'All') 
    ? DUMMY_FAQS 
    : DUMMY_FAQS.filter(faq => faq.category === activeChip);
    
  return (
    <div className="flex flex-col gap-4">
      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {chips.map(chip => (
          <FilterChip 
            key={chip}
            label={chip}
            isSelected={activeChip === chip}
            onClick={() => setActiveChip(chip)}
          />
        ))}
      </div>
      
      {/* Daftar Accordion FAQ */}
      <div className="flex flex-col gap-3">
        {filteredFaqs.map(faq => (
          <AccordionItem key={faq.id} title={faq.q}>
            {faq.a}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
}

export default FaqTab;