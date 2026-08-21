import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useSalon } from '../context/SalonContext';
import facialScrubImg from '../assets/images/facial_scrub_1787310568161.jpg';

interface AboutSectionProps {
  onLearnMore?: () => void;
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore, onOpenBooking }) => {
  const { businessInfo } = useSalon();

  return (
    <section className="py-20 sm:py-28 bg-[#F9F7F2] text-[#121212] border-b border-[#E5E1DA]" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetrical Editorial Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 overflow-hidden border border-[#E5E1DA] shadow-xl bg-white">
              <img
                src={facialScrubImg}
                alt={`${businessInfo.name} Master Barbers Dubai`}
                referrerPolicy="no-referrer"
                className="w-full h-[460px] sm:h-[540px] object-cover object-center"
              />
              
              <div className="absolute bottom-6 left-6 right-6 text-white p-5 bg-[#121212]/80 backdrop-blur-md border border-white/15">
                <p className="font-serif text-lg font-light italic">
                  “Gentleman confidence is forged through architectural precision, sharp lines, and royal grooming care.”
                </p>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] block mt-1.5 font-bold">
                  — {businessInfo.name} Master Barbers Philosophy
                </span>
              </div>
            </div>

            {/* Floating Luxury Detail Badge */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 z-20 bg-white text-[#121212] p-5 border border-[#E5E1DA] shadow-2xl max-w-xs items-center gap-3.5">
              <div className="w-10 h-10 bg-[#121212] text-[#C5A059] flex items-center justify-center font-serif text-xl shrink-0">
                ★
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block">
                  International City 2
                </span>
                <p className="text-xs text-[#4A4A4A] font-light">
                  Al Marsoumy Building, Warsan 4 • Free parking right outside.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-6 space-y-7">
            
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
                The Grooming Atelier Concept
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.1] text-[#121212]">
                Where Master Barbershop Craft Meets Modern Gentleman Luxury.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed font-light">
              Conveniently located in Al Marsoumy Building in Warsan 4, {businessInfo.name} was established to deliver Dubai’s gentlemen an uncompromising standard of grooming. We combine old-world barbering heritage with contemporary style techniques.
            </p>

            <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed font-light">
              From flawless skin fades and crisp beard symmetry to deep pore charcoal facials, Nanoplastia anti-frizz smoothing, and restorative medical pedicures — every treatment is delivered in a pristine, sterilized environment with single-use blades and premium imported formulas.
            </p>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-white border border-[#E5E1DA]">
                <h4 className="font-serif text-base font-bold text-[#121212] mb-1">
                  Master Barbers &amp; Stylists
                </h4>
                <p className="text-xs text-[#4A4A4A] leading-normal font-light">
                  Decades of specialized experience in skin fades, beard sculpting, and hair restructuring.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E5E1DA]">
                <h4 className="font-serif text-base font-bold text-[#121212] mb-1">
                  Sterilized &amp; Single-Use
                </h4>
                <p className="text-xs text-[#4A4A4A] leading-normal font-light">
                  Strict UV and Barbicide sterilization with fresh, disposable blades for every guest.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 bg-[#121212] hover:bg-[#C5A059] text-white text-[11px] uppercase tracking-widest font-bold transition-all shadow-xs cursor-pointer"
                id="about-book-btn"
              >
                Experience {businessInfo.name}
              </button>
              
              {onLearnMore && (
                <button
                  onClick={onLearnMore}
                  className="px-6 py-4 text-[11px] uppercase tracking-widest font-bold text-[#121212] hover:text-[#C5A059] transition-colors flex items-center gap-2 border border-[#121212] bg-white cursor-pointer hover:bg-[#121212] hover:text-white"
                  id="about-learn-more-btn"
                >
                  <span>Our Master Barbers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


