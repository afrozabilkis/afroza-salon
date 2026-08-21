import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, Phone } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    { label: 'Hair Consultation', text: `Hello ${SALON_INFO.name}, I'd like to book a hair color/balayage consultation.` },
    { label: 'Facial & Skincare', text: `Hello ${SALON_INFO.name}, I would like to inquire about Hydra-Lift or Valmont facial availability.` },
    { label: 'Russian Manicure', text: `Hello ${SALON_INFO.name}, I want to book a Russian gel manicure today/tomorrow.` },
    { label: 'VIP Suite Inquiries', text: `Hello ${SALON_INFO.name}, I am inquiring about booking your private VIP suite.` },
  ];

  const handleSend = (textToSend?: string) => {
    const message = encodeURIComponent(
      textToSend || customMsg || `Hello ${SALON_INFO.name}, I would like to enquire about an appointment.`
    );
    window.open(`https://wa.me/${SALON_INFO.whatsappRaw}?text=${message}`, '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40" id="floating-whatsapp-widget">
      
      {/* Expanded Popup Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[330px] sm:w-[360px] bg-[#F9F7F2] border border-[#E5E1DA] shadow-2xl overflow-hidden text-[#121212] animate-fade-in">
          
          {/* Header */}
          <div className="bg-[#121212] text-[#F9F7F2] p-4 flex items-center justify-between border-b border-[#2C2C2C]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-[#1E1E1E] border border-[#C5A059]/40 flex items-center justify-center font-serif text-lg text-[#C5A059] font-bold">
                  A
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#121212]" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-white leading-tight">
                  {SALON_INFO.name}
                </h4>
                <p className="text-[10px] uppercase tracking-wider text-[#C5A059] font-sans flex items-center gap-1 font-bold">
                  <span>Online</span> • Concierge Desk
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#E5E1DA] hover:text-white bg-white/5 hover:bg-white/10"
              aria-label="Close WhatsApp widget"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 max-h-[360px] overflow-y-auto bg-[#F4F1EC]">
            <div className="bg-white p-3.5 border border-[#E5E1DA] shadow-xs text-xs text-[#121212] leading-relaxed">
              <p className="font-bold font-serif text-[#121212] mb-1">
                Marhaba! Welcome to {SALON_INFO.name}.
              </p>
              <p className="text-[#4A4A4A] font-light">
                How may our concierge assist with your beauty or spa reservation today?
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block px-1">
                Quick Enquiries:
              </span>
              <div className="flex flex-col gap-1.5">
                {quickPrompts.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(item.text)}
                    className="text-left text-xs p-2.5 bg-white hover:bg-[#121212] hover:text-white border border-[#E5E1DA] hover:border-[#121212] text-[#121212] transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <Send className="w-3 h-3 text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-white border-t border-[#E5E1DA] flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3.5 py-2 text-xs bg-[#F9F7F2] border border-[#E5E1DA] text-[#121212] focus:outline-none focus:border-[#121212]"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 bg-[#121212] hover:bg-[#C5A059] text-white hover:text-[#121212] transition-colors cursor-pointer"
              aria-label="Send WhatsApp message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#121212] hover:bg-[#C5A059] text-white shadow-2xl flex items-center justify-center border border-[#C5A059]/50 hover:scale-105 transition-all duration-300 group cursor-pointer"
        aria-label="WhatsApp Concierge"
        id="floating-whatsapp-btn"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#121212]" />
        <MessageSquare className="w-6 h-6 text-[#C5A059] group-hover:text-[#121212] transition-colors" />
      </button>

    </div>
  );
};
