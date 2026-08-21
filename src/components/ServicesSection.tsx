import React, { useState } from 'react';
import { Sparkles, Clock, ArrowRight, Check } from 'lucide-react';
import { CATEGORIES, SERVICES } from '../data/salonData';
import { Service, ServiceCategoryId } from '../types';

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectServiceDetail: (slug: string) => void;
  onViewAllServices: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenBooking,
  onSelectServiceDetail,
  onViewAllServices,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section className="py-20 sm:py-28 bg-[#F4F1EC] text-[#121212] border-b border-[#E5E1DA]" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
              Curated Treatment Menu
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#121212]">
              Signature Atelier Rituals &amp; Protocols
            </h2>
          </div>
          <button
            onClick={onViewAllServices}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-[#121212] hover:text-[#C5A059] transition-colors self-start md:self-auto cursor-pointer"
            id="view-full-menu-btn"
          >
            <span>Explore Full Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 text-[11px] uppercase tracking-widest font-bold whitespace-nowrap transition-all cursor-pointer border ${
              activeCategory === 'all'
                ? 'bg-[#121212] text-white border-[#121212]'
                : 'bg-white text-[#121212] hover:bg-[#F9F7F2] border-[#E5E1DA]'
            }`}
          >
            All Rituals
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-widest font-bold whitespace-nowrap transition-all cursor-pointer border ${
                activeCategory === cat.id
                  ? 'bg-[#121212] text-white border-[#121212]'
                  : 'bg-white text-[#121212] hover:bg-[#F9F7F2] border-[#E5E1DA]'
              }`}
              id={`service-cat-tab-${cat.id}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-[#E5E1DA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              id={`service-card-${service.slug}`}
            >
              <div>
                {/* Image */}
                <div className="relative h-60 overflow-hidden bg-[#E5E1DA]">
                  <img
                    src={service.image}
                    alt={service.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Pill on Image */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[9px] uppercase tracking-widest font-bold bg-[#121212] text-[#F9F7F2] border border-white/10">
                      {service.categoryName}
                    </span>
                  </div>

                  {/* Duration on Image */}
                  <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-xs text-white/90 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{service.durationMinutes} mins</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 
                      onClick={() => onSelectServiceDetail(service.slug)}
                      className="font-serif text-xl sm:text-2xl font-bold text-[#121212] group-hover:text-[#C5A059] transition-colors cursor-pointer"
                    >
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed line-clamp-2 font-light">
                    {service.shortDescription}
                  </p>

                  {/* Benefits snippet */}
                  {service.benefits && service.benefits.length > 0 && (
                    <div className="pt-2 border-t border-[#E5E1DA] space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-[#121212]">
                        <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                        <span className="line-clamp-1 font-light">{service.benefits[0]}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer: Price & CTA */}
              <div className="p-6 pt-0 border-t border-[#E5E1DA] mt-4 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-bold block">Tariff</span>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#121212]">
                    AED {service.priceAED}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectServiceDetail(service.slug)}
                    className="px-3 py-2.5 text-[11px] uppercase tracking-widest font-bold text-[#4A4A4A] hover:text-[#121212] transition-colors cursor-pointer"
                    title="View full protocol"
                  >
                    Protocol
                  </button>
                  <button
                    onClick={() => onOpenBooking(service.id)}
                    className="px-4 py-2.5 bg-[#121212] hover:bg-[#C5A059] text-white text-[10px] uppercase tracking-widest font-bold transition-all shadow-xs cursor-pointer"
                    id={`book-service-btn-${service.slug}`}
                  >
                    Book Now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Editorial Callout */}
        <div className="mt-14 p-8 bg-[#121212] text-[#F9F7F2] border border-[#2C2C2C] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">Bespoke Inquiries</span>
            <h4 className="font-serif text-2xl font-normal text-white">Require a custom combination or private VIP suite?</h4>
            <p className="text-xs text-[#E5E1DA] font-light">Our concierge will curate a private multi-therapist experience for you.</p>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="px-6 py-3.5 bg-[#C5A059] hover:bg-white text-[#121212] text-[11px] uppercase tracking-widest font-bold transition-all shrink-0 cursor-pointer"
          >
            Inquire With Concierge
          </button>
        </div>

      </div>
    </section>
  );
};

