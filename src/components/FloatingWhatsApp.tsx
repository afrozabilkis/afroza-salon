import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, Phone } from 'lucide-react';
import { useSalon } from '../context/SalonContext';

export const FloatingWhatsApp: React.FC = () => {
  const { businessInfo, getWhatsAppUrl } = useSalon();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    { label: 'Executive Haircut & Beard', text: `Hello ${businessInfo.name}, I would like to book a Master Haircut & Hot Towel Beard Sculpting.` },
    { label: 'Nanoplastia / Keratin', text: `Hello ${businessInfo.name}, I would like to inquire about Nanoplastia hair smoothing treatment.` },
    { label: 'Charcoal Detox Facial', text: `Hello ${businessInfo.name}, I want to reserve a Charcoal Deep Detox & Skincare session.` },
    { label: 'VIP Groom Package', text: `Hello ${businessInfo.name}, I am inquiring about the Royal Groom / Wedding VIP package.` },
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || customMsg || `Hello ${businessInfo.name}, I would like to enquire about an appointment.`;
    const url = getWhatsAppUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
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
                  {businessInfo.name}
                </h4>
                <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-sans flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online</span> • Barbershop Concierge
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#E5E1DA] hover:text-white bg-white/5 hover:bg-white/10 cursor-pointer"
              aria-label="Close WhatsApp widget"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 max-h-[360px] overflow-y-auto bg-[#F4F1EC]">
            <div className="bg-white p-3.5 border border-[#E5E1DA] shadow-xs text-xs text-[#121212] leading-relaxed">
              <p className="font-bold font-serif text-[#121212] mb-1">
                Marhaba! Welcome to {businessInfo.name}.
              </p>
              <p className="text-[#4A4A4A] font-light">
                How may our master barbers concierge assist with your grooming reservation today?
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
              placeholder="Type your grooming request..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3.5 py-2 text-xs bg-[#F9F7F2] border border-[#E5E1DA] text-[#121212] focus:outline-none focus:border-[#121212]"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 bg-gradient-to-r from-[#00C853] to-[#25D366] text-white shadow-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Send WhatsApp message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* Floating Action Trigger Button with Green Gradient */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-[#00C853] to-[#25D366] text-white shadow-[0_6px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] flex items-center justify-center rounded-full hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer border-2 border-white/40"
        aria-label="WhatsApp Concierge"
        id="floating-whatsapp-btn"
      >
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full border-2 border-[#121212] flex items-center justify-center">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
        </span>
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current text-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>

    </div>
  );
};
