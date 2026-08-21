import React from 'react';
import { Calendar, MessageSquare, MapPin, Star, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useSalon } from '../context/SalonContext';
import { WhatsAppButton } from './WhatsAppButton';
import beardSculptingImg from '../assets/images/beard_sculpting_1787310521147.jpg';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreServices }) => {
  const { businessInfo, getWhatsAppUrl } = useSalon();

  const handleGetDirections = () => {
    window.open(businessInfo.googleMapsUrl, '_blank');
  };

  return (
    <div className="w-full border-b border-[#E5E1DA] bg-[#F9F7F2]" id="hero-section">
      
      {/* 12-Column Editorial Magazine Grid */}
      <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        
        {/* Left Column (5 cols): Editorial Text & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-14 lg:py-24 border-b lg:border-b-0 lg:border-r border-[#E5E1DA] bg-white">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold mb-4 sm:mb-6 block">
            Executive Barbershop &amp; Gents Grooming
          </span>
          
          <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-serif leading-[0.95] tracking-tighter mb-6 sm:mb-8 text-[#121212]">
            The Art of <br />
            <span className="italic font-normal text-[#121212]">Master</span> <br />
            Grooming
          </h2>

          <p className="text-[#4A4A4A] text-sm leading-relaxed mb-8 sm:mb-10 max-w-sm font-light">
            Experience premier gentlemen styling in International City Phase 2 (Warsan 4), Dubai. Our master barbers specialize in razor-sharp skin fades, royal hot towel beard sculpting, Nanoplastia smoothing, and deep detox facials.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-4 flex-wrap">
            <button
              onClick={onOpenBooking}
              className="bg-[#121212] text-white px-8 py-4 text-[11px] uppercase tracking-widest font-bold hover:bg-[#C5A059] hover:text-white transition-all shadow-xs cursor-pointer text-center"
              id="hero-book-btn"
            >
              Book Appointment
            </button>

            <button
              onClick={onExploreServices}
              className="border border-[#121212] bg-white text-[#121212] px-7 py-4 text-[11px] uppercase tracking-widest font-bold hover:bg-[#121212] hover:text-white transition-all cursor-pointer text-center"
              id="hero-services-btn"
            >
              Explore Services
            </button>

            <WhatsAppButton
              size="md"
              label="WhatsApp Us"
              id="hero-whatsapp-btn"
            />
          </div>
        </div>

        {/* Right Column (7 cols): High-Impact Editorial Visual */}
        <div className="lg:col-span-7 relative bg-[#F4F1EC] min-h-[420px] sm:min-h-[520px] lg:min-h-[620px]">
          
          <div
            className="absolute inset-0 bg-cover bg-center opacity-95"
            style={{
              backgroundImage: `url(${beardSculptingImg})`,
              filter: 'contrast(1.06)',
            }}
          />

          {/* Soft Editorial Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />

          {/* Floating Magazine Review Badge */}
          <div className="absolute bottom-6 sm:bottom-12 right-4 sm:right-12 bg-white p-6 sm:p-8 border border-[#E5E1DA] shadow-2xl max-w-xs">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-[#C5A059] text-xs">
                ★★★★★
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#121212]">
                {businessInfo.rating} Rating
              </span>
            </div>
            
            <p className="text-xs italic text-[#4A4A4A] mb-4 leading-relaxed">
              &ldquo;The best gents salon in International City Phase 2. Clean fades, precision beard styling, and open until midnight!&rdquo;
            </p>
            
            <p className="text-[9px] uppercase tracking-widest font-bold text-[#121212]">
              &mdash; Tariq M., Verified Google Review
            </p>
          </div>

          {/* Subtle vertical rule */}
          <div className="hidden lg:block absolute top-0 left-0 h-full w-[1px] bg-white/20" />
        </div>

      </main>

      {/* Editorial Magazine Highlights Ticker Bar */}
      <footer className="bg-white border-t border-[#E5E1DA] grid grid-cols-2 md:grid-cols-4 items-center px-6 sm:px-10 py-5 gap-4 sm:gap-6">
        <div className="border-r border-[#E5E1DA] pr-4 flex flex-col justify-center">
          <span className="text-[9px] uppercase tracking-widest text-[#4A4A4A] opacity-70 mb-1">
            Signature Grooming
          </span>
          <span className="text-xs font-bold font-serif text-[#121212]">
            Fade &amp; Beard Sculpt • AED 65
          </span>
        </div>

        <div className="border-r border-[#E5E1DA] pr-4 sm:px-4 flex flex-col justify-center">
          <span className="text-[9px] uppercase tracking-widest text-[#4A4A4A] opacity-70 mb-1">
            Skincare Detox
          </span>
          <span className="text-xs font-bold font-serif text-[#121212]">
            Charcoal Facial • AED 120
          </span>
        </div>

        <div className="border-r border-[#E5E1DA] pr-4 sm:px-4 flex flex-col justify-center">
          <span className="text-[9px] uppercase tracking-widest text-[#4A4A4A] opacity-70 mb-1">
            Prime Location
          </span>
          <span className="text-xs font-bold font-serif text-[#121212]">
            Warsan 4, International City 2
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 sm:px-4">
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[10px] font-bold text-[#C5A059] tracking-wider uppercase">
              OPEN LATE DAILY
            </span>
            <span className="text-xs text-[#121212] font-medium">
              10:00 AM – 12:00 AM
            </span>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#121212] flex items-center justify-center hover:bg-[#121212] hover:text-white transition-all text-[#121212] cursor-pointer"
            title="Book appointment slot"
            id="hero-ticker-book-arrow"
          >
            &darr;
          </button>
        </div>
      </footer>

    </div>
  );
};

