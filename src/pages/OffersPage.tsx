import React from 'react';
import { Sparkles, Clock, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useSalon } from '../context/SalonContext';

interface OffersPageProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ onOpenBooking }) => {
  const { activeOffers, formatPriceAED } = useSalon();

  return (
    <div className="w-full py-14 sm:py-24 bg-[#F9F7F2] text-[#121212]" id="offers-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
            Curated Gents Packages
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#121212] tracking-tight">
            Special Grooming Privileges &amp; Combos
          </h1>
          <p className="text-sm sm:text-base text-[#4A4A4A] font-light leading-relaxed">
            Experience our most requested multi-treatment grooming combinations at special preferential rates in International City Phase 2.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activeOffers.map((offer) => {
            const savingsAED = Math.max(0, (offer.originalPriceAED || 0) - (offer.offerPriceAED || 0));
            return (
              <div
                key={offer.id}
                className="bg-white border border-[#E5E1DA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-[#F4F1EC]">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-[9px] uppercase tracking-widest font-bold bg-[#C5A059] text-white shadow-md">
                        {offer.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                        {offer.durationMinutes} mins
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                        {offer.validUntil}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 space-y-4">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#121212] mb-1">
                        {offer.title}
                      </h3>
                      <p className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                        {offer.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed font-light">
                      {offer.description}
                    </p>

                    {offer.inclusions && offer.inclusions.length > 0 && (
                      <div className="bg-[#F9F7F2] p-5 border border-[#E5E1DA] space-y-2.5">
                        <span className="text-[10px] uppercase tracking-widest text-[#121212] font-bold block">
                          Included in this Session:
                        </span>
                        <ul className="space-y-2 text-xs text-[#4A4A4A] font-light">
                          {offer.inclusions.map((inc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-7 pt-0">
                  <div className="p-5 bg-[#121212] text-white flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        {offer.originalPriceAED > 0 && (
                          <span className="text-xs text-[#A0988E] line-through">
                            {formatPriceAED(offer.originalPriceAED)}
                          </span>
                        )}
                        {savingsAED > 0 && (
                          <span className="text-[9px] uppercase tracking-widest bg-[#C5A059]/30 text-[#C5A059] px-2 py-0.5 font-bold">
                            Save {formatPriceAED(savingsAED)}
                          </span>
                        )}
                      </div>
                      <div className="font-serif text-2xl font-bold text-[#C5A059]">
                        {formatPriceAED(offer.offerPriceAED)}
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenBooking(offer.id)}
                      className="px-5 py-3 bg-[#C5A059] hover:bg-white hover:text-[#121212] text-white text-[10px] uppercase tracking-widest font-bold transition-all shadow-md cursor-pointer"
                    >
                      Book Package
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Privilege Policy */}
        <div className="bg-white p-6 border border-[#E5E1DA] max-w-3xl mx-auto text-xs text-[#4A4A4A] font-light space-y-2 text-center shadow-xs">
          <p className="font-bold text-[#121212] uppercase tracking-widest text-[10px]">
            Package Policy &amp; Walk-ins
          </p>
          <p>
            Packages can be booked online or redeemed on walk-in at Afroza Gents Salon in Al Marsoumy Building, Warsan 4. Open daily from 10:00 AM until 12:00 AM midnight.
          </p>
        </div>

      </div>
    </div>
  );
};

