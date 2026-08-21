import React, { useState } from 'react';
import { Sparkles, Clock, Check, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { CATEGORIES, SERVICES, SALON_INFO } from '../data/salonData';

interface PricingPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectServiceDetail: (slug: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onOpenBooking,
  onSelectServiceDetail,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categoriesToDisplay = selectedCat === 'all'
    ? CATEGORIES
    : CATEGORIES.filter((c) => c.id === selectedCat);

  return (
    <div className="w-full py-14 sm:py-24 bg-[#F9F7F2] text-[#121212]" id="pricing-page">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
            Barbershop Tariff
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#121212] tracking-tight">
            Complete Grooming Price Menu
          </h1>
          <p className="text-sm sm:text-base text-[#4A4A4A] font-light leading-relaxed">
            All prices are stated in United Arab Emirates Dirham (AED). Professional styling, hot towel finish, and sterilized tools included with every service.
          </p>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCat === 'all'
                ? 'bg-[#121212] text-white shadow-xs'
                : 'bg-white text-[#4A4A4A] hover:bg-[#F4F1EC] border border-[#E5E1DA]'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCat === cat.id
                  ? 'bg-[#121212] text-white shadow-xs'
                  : 'bg-white text-[#4A4A4A] hover:bg-[#F4F1EC] border border-[#E5E1DA]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Style Sections */}
        <div className="space-y-10">
          {categoriesToDisplay.map((category) => {
            const categoryServices = SERVICES.filter((s) => s.category === category.id);
            if (categoryServices.length === 0) return null;

            return (
              <div
                key={category.id}
                className="bg-white p-6 sm:p-10 border border-[#E5E1DA] shadow-xs space-y-6"
                id={`pricing-cat-${category.id}`}
              >
                {/* Category Title */}
                <div className="border-b border-[#E5E1DA] pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212]">
                      {category.name}
                    </h2>
                    <p className="text-[10px] text-[#C5A059] uppercase tracking-widest font-bold mt-1">
                      {category.tagline}
                    </p>
                  </div>
                  <span className="text-xs text-[#4A4A4A] font-light">
                    {categoryServices.length} Grooming Services
                  </span>
                </div>

                {/* Items List */}
                <div className="divide-y divide-[#E5E1DA]">
                  {categoryServices.map((item) => (
                    <div
                      key={item.id}
                      className="py-5 first:pt-2 last:pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-3">
                          <h3
                            onClick={() => onSelectServiceDetail(item.slug)}
                            className="font-serif text-lg sm:text-xl font-bold text-[#121212] group-hover:text-[#C5A059] transition-colors cursor-pointer"
                          >
                            {item.name}
                          </h3>
                          <span className="text-xs text-[#4A4A4A] flex items-center gap-1 font-sans font-light">
                            <Clock className="w-3 h-3 text-[#C5A059]" />
                            {item.durationMinutes} min
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed font-light">
                          {item.shortDescription}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0">
                        <div className="text-left sm:text-right">
                          <span className="font-serif text-2xl font-bold text-[#121212] block leading-none">
                            AED {item.priceAED}
                          </span>
                          <span className="text-[9px] text-[#4A4A4A] uppercase tracking-widest font-light">
                            Inclusive of VAT
                          </span>
                        </div>

                        <button
                          onClick={() => onOpenBooking(item.id)}
                          className="px-5 py-2.5 bg-[#121212] hover:bg-[#C5A059] text-white text-[10px] uppercase tracking-widest font-bold transition-all shadow-xs cursor-pointer"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Pricing Policy Footnote */}
        <div className="bg-white p-6 border border-[#E5E1DA] text-xs text-[#4A4A4A] font-light space-y-2 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-[#121212] uppercase tracking-widest text-[10px]">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>Afroza Quality &amp; Hygiene Standards</span>
          </div>
          <p>
            Hair relaxing, smoothing &amp; coloring treatments vary in duration depending on hair density and length.
          </p>
          <p>
            Complimentary warm tea, water, and consultations are provided to every customer.
          </p>
        </div>

      </div>
    </div>
  );
};
