import React from 'react';
import { Sparkles, ShieldCheck, Award, Heart, ArrowRight, CheckCircle2, Star, MapPin, Clock, Scissors } from 'lucide-react';
import { SALON_INFO, STYLISTS, FAQS } from '../data/salonData';
import beardSculptingImg from '../assets/images/beard_sculpting_1787310521147.jpg';

interface AboutPageProps {
  onOpenBooking: () => void;
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking, onNavigate }) => {
  return (
    <div className="w-full py-14 sm:py-24 bg-[#F9F7F2] text-[#121212]" id="about-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
            The Barbershop Story &amp; Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#121212] tracking-tight">
            An Uncompromising Standard of Gents Grooming in Dubai
          </h1>
          <p className="text-sm sm:text-base text-[#4A4A4A] font-light leading-relaxed">
            Located in International City Phase 2 (Warsan 4), {SALON_INFO.name} was established to deliver Dubai’s gentlemen a high-caliber grooming experience combining master craftsmanship with modern spa relaxation.
          </p>
        </div>

        {/* Hero Editorial Double Image Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 overflow-hidden shadow-2xl border border-[#E5E1DA] h-[420px] sm:h-[500px] relative bg-white">
            <img
              src={beardSculptingImg}
              alt="Afroza Gents Salon Barbershop Dubai"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white p-5 bg-[#121212]/85 backdrop-blur-md border border-white/15">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-1">
                Warsan 4 • International City Phase 2
              </span>
              <p className="font-serif text-lg font-light">
                Shop 8, Al Marsoumy Building — modern barber stations, sterile tools &amp; late evening hours until midnight.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#121212]">
              Precision, Hygiene &amp; Master Artistry
            </h2>
            <p className="text-sm sm:text-base text-[#4A4A4A] font-light leading-relaxed">
              We believe a haircut and beard trim are more than routine maintenance — they define personal confidence and executive presence. Our master barbers analyze face shape, beard grain, and hair texture to craft tailored silhouettes that look sharp and grow out cleanly.
            </p>
            <p className="text-sm sm:text-base text-[#4A4A4A] font-light leading-relaxed">
              Beyond master fading and hot towel straight razor shaves, we offer advanced men's therapies: Nanoplastia anti-frizz smoothing, deep blackhead extraction facials, medical foot pedicures, and therapeutic scalp treatments.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span className="text-sm text-[#121212] font-medium">100% Hospital-grade UV &amp; Barbicide tool sterilization</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span className="text-sm text-[#121212] font-medium">Single-use disposable straight razor blades for every shave</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span className="text-sm text-[#121212] font-medium">Formaldehyde-free Nanoplastia &amp; organic botanical grooming oils</span>
              </div>
            </div>
          </div>
        </div>

        {/* Master Stylists & Practitioners */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
              Master Barbers
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#121212]">
              Meet Our Senior Barbers &amp; Gents Specialists
            </h2>
            <p className="text-sm text-[#4A4A4A] font-light">
              Each artist at {SALON_INFO.name} brings over a decade of specialized expertise in men's haircutting, beard sculpting, and aesthetic care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STYLISTS.map((stylist) => (
              <div
                key={stylist.id}
                className="bg-white overflow-hidden border border-[#E5E1DA] shadow-xs hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-80 overflow-hidden bg-[#F4F1EC]">
                  <img
                    src={stylist.image}
                    alt={stylist.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block">
                    {stylist.role} • {stylist.experienceYears}+ Years Exp.
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#121212]">
                    {stylist.name}
                  </h3>
                  <p className="text-xs text-[#4A4A4A] leading-relaxed font-light">
                    Specializing in <strong>{stylist.specialty}</strong>.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product House Partners */}
        <div className="bg-[#121212] text-[#F9F7F2] p-8 sm:p-14 border border-[#2C2C2C] space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
              Grooming Products
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              Trusted Global Barber &amp; Skincare Formulations
            </h3>
            <p className="text-xs sm:text-sm text-[#A0988E] font-light">
              We exclusively use authentic, skin-safe, premium imported hair and skin formulations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {['Uppercut Deluxe', 'Proraso Firenze', 'Dermalogica Men', 'Reuzel Pomades', 'Footlogix Pro', 'Nanoplastia Silk'].map((brand, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#1E1E1E] border border-[#333333] flex items-center justify-center font-serif text-sm sm:text-base text-[#F9F7F2] tracking-wider"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="p-8 sm:p-12 bg-white border border-[#E5E1DA] text-center max-w-3xl mx-auto space-y-6 shadow-xs">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
            Join the Gentlemen of Dubai
          </span>
          <h3 className="font-serif text-3xl font-bold text-[#121212]">
            Ready for Your Executive Grooming Session?
          </h3>
          <p className="text-sm text-[#4A4A4A] font-light max-w-md mx-auto">
            Book online instantly or walk into our salon in Al Marsoumy Building, Warsan 4. Open daily until 12:00 AM midnight.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 bg-[#121212] hover:bg-[#C5A059] text-white text-[11px] uppercase tracking-widest font-bold transition-all shadow-xs cursor-pointer"
            >
              Book Your Appointment
            </button>
            <button
              onClick={() => onNavigate('/services')}
              className="px-6 py-4 bg-white hover:bg-[#121212] hover:text-white text-[#121212] text-[11px] uppercase tracking-widest font-bold border border-[#121212] transition-colors cursor-pointer"
            >
              View Grooming Menu
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
