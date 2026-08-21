import React from 'react';
import { Star, MapPin, Clock, Award, ShieldCheck } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const TrustStrip: React.FC = () => {
  return (
    <div className="w-full bg-[#F4F1EC] text-[#121212] border-b border-[#E5E1DA] py-6 px-4" id="trust-strip-section">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
        
        {/* Metric 1: Verified Google Rating */}
        <div className="flex items-center gap-3.5 pl-2 sm:pl-0">
          <div className="w-10 h-10 bg-white border border-[#E5E1DA] flex items-center justify-center text-[#C5A059] shrink-0">
            <Star className="w-5 h-5 fill-[#C5A059]" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#121212]">★ {SALON_INFO.rating}</span>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">/ 5.0</span>
            </div>
            <p className="text-xs text-[#4A4A4A] tracking-wide font-light">
              {SALON_INFO.reviewCount} Verified Google Reviews
            </p>
          </div>
        </div>

        {/* Metric 2: Prime Dubai Location */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-white border border-[#E5E1DA] flex items-center justify-center text-[#121212] shrink-0">
            <MapPin className="w-5 h-5 text-[#C5A059]" />
          </div>
          <div>
            <span className="font-serif text-lg sm:text-xl font-medium text-[#121212] block leading-tight">
              International City 2
            </span>
            <p className="text-xs text-[#4A4A4A] tracking-wide font-light">
              Al Marsoumy Bldg, Warsan 4
            </p>
          </div>
        </div>

        {/* Metric 3: Hours */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-white border border-[#E5E1DA] flex items-center justify-center text-[#121212] shrink-0">
            <Clock className="w-5 h-5 text-[#C5A059]" />
          </div>
          <div>
            <span className="font-serif text-lg sm:text-xl font-medium text-[#121212] block leading-tight">
              10:00 AM – 12:00 AM
            </span>
            <p className="text-xs text-[#4A4A4A] tracking-wide font-light">
              Open Late Daily (Midnight)
            </p>
          </div>
        </div>

        {/* Metric 4: Luxury Standards */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-white border border-[#E5E1DA] flex items-center justify-center text-[#121212] shrink-0">
            <Award className="w-5 h-5 text-[#C5A059]" />
          </div>
          <div>
            <span className="font-serif text-lg sm:text-xl font-medium text-[#121212] block leading-tight">
              Master Barbers
            </span>
            <p className="text-xs text-[#4A4A4A] tracking-wide font-light">
              Sterilized &amp; Single-Use Blades
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

