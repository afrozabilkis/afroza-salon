import React from 'react';
import { Sparkles, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { SPECIAL_OFFERS } from '../data/salonData';

interface OffersSectionProps {
  onOpenBooking: (serviceId?: string) => void;
  onViewAllOffers?: () => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onOpenBooking, onViewAllOffers }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#F9F7F2] text-[#121212] border-b border-[#E5E1DA]" id="offers-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
            Curated Privileges
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#121212]">
            Seasonal Atelier Offerings &amp; Duos
          </h2>
          <p className="text-sm text-[#4A4A4A] font-light leading-relaxed">
            Thoughtfully paired multi-service protocols designed to rejuvenate hair, skin, and spirit in one seamless reservation.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SPECIAL_OFFERS.map((offer) => {
            const savingsAED = offer.originalPriceAED - offer.offerPriceAED;
            return (
              <div
                key={offer.id}
                className="bg-white border border-[#E5E1DA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                id={`offer-card-${offer.slug}`}
              >
                <div>
                  {/* Offer Image */}
                  <div className="relative h-60 overflow-hidden bg-[#E5E1DA]">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1 text-[9px] uppercase tracking-widest font-bold bg-[#121212] text-[#F9F7F2] border border-white/15">
                        {offer.tag}
                      </span>
                    </div>

                    {/* Validity */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                        {offer.durationMinutes} mins
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-[#C5A059] font-bold">
                        {offer.validUntil}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7 space-y-4">
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

                    {/* Inclusions List */}
                    <div className="bg-[#F4F1EC] p-4 border border-[#E5E1DA] space-y-2">
                      <span className="text-[9px] uppercase tracking-widest text-[#121212] font-bold block">
                        Privilege Inclusions:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#121212] font-light">
                        {offer.inclusions.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#C5A059] font-bold mt-0.5">•</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Pricing & CTA Footer */}
                <div className="p-6 sm:p-7 pt-0 border-t border-[#E5E1DA]">
                  <div className="pt-4 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#4A4A4A] line-through font-light">
                          AED {offer.originalPriceAED}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider bg-[#F4F1EC] text-[#C5A059] px-2 py-0.5 border border-[#E5E1DA] font-bold">
                          Save AED {savingsAED}
                        </span>
                      </div>
                      <div className="font-serif text-2xl font-bold text-[#121212]">
                        AED {offer.offerPriceAED}
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenBooking(offer.id)}
                      className="px-5 py-3 bg-[#121212] hover:bg-[#C5A059] text-white text-[10px] uppercase tracking-widest font-bold transition-all shadow-xs cursor-pointer"
                      id={`book-offer-btn-${offer.slug}`}
                    >
                      Reserve Offer
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
