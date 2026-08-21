import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Clock, ArrowRight, Check, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES, SERVICES } from '../data/salonData';
import { Service } from '../types';

interface ServicesPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectServiceDetail: (slug: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenBooking,
  onSelectServiceDetail,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'duration'>('featured');

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCat = selectedCategory === 'all' || service.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        service.name.toLowerCase().includes(q) ||
        service.shortDescription.toLowerCase().includes(q) ||
        service.categoryName.toLowerCase().includes(q) ||
        (service.productsUsed && service.productsUsed.some(p => p.toLowerCase().includes(q)));
      return matchesCat && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceAED - b.priceAED;
      if (sortBy === 'price-desc') return b.priceAED - a.priceAED;
      if (sortBy === 'duration') return a.durationMinutes - b.durationMinutes;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="w-full py-14 sm:py-24 bg-[#F9F7F2] text-[#121212]" id="services-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
            Barbershop Service Compendium
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#121212] tracking-tight">
            The Gents Grooming Menu
          </h1>
          <p className="text-sm sm:text-base text-[#4A4A4A] font-light leading-relaxed">
            Every service is executed by master barbers utilizing sterilized precision tools, premium botanical oils, and specialized men's aesthetic care in Warsan 4, Dubai.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 sm:p-6 border border-[#E5E1DA] space-y-4 shadow-xs">
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="w-4 h-4 text-[#C5A059] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search haircuts, beard sculpting, Nanoplastia, charcoal facials, pedicures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                id="services-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#4A4A4A] hover:text-[#121212] px-2 py-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="w-full md:w-auto flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#C5A059] shrink-0" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full md:w-auto px-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs uppercase tracking-wider text-[#121212] font-medium focus:outline-none focus:border-[#121212]"
                id="services-sort-select"
              >
                <option value="featured">Sort: Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration">Duration: Short to Long</option>
              </select>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#121212] text-white shadow-xs'
                  : 'bg-[#F9F7F2] text-[#4A4A4A] hover:bg-[#E5E1DA] border border-[#E5E1DA]'
              }`}
            >
              All Services ({SERVICES.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = SERVICES.filter((s) => s.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#121212] text-white shadow-xs'
                      : 'bg-[#F9F7F2] text-[#4A4A4A] hover:bg-[#E5E1DA] border border-[#E5E1DA]'
                  }`}
                  id={`cat-filter-${cat.id}`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#4A4A4A] font-light px-1">
          <span>Showing <strong>{filteredServices.length}</strong> available grooming services</span>
          {searchQuery && (
            <span>Filtered by: &ldquo;{searchQuery}&rdquo;</span>
          )}
        </div>

        {/* Services Cards Grid */}
        {filteredServices.length === 0 ? (
          <div className="bg-white p-12 text-center space-y-4 border border-[#E5E1DA]">
            <h3 className="font-serif text-2xl font-bold text-[#121212]">
              No matching services found
            </h3>
            <p className="text-xs text-[#4A4A4A] max-w-md mx-auto font-light">
              Please adjust your search term or select another category from our menu.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-2.5 bg-[#121212] text-white text-[10px] uppercase tracking-widest font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-[#E5E1DA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                id={`services-page-card-${service.slug}`}
              >
                <div>
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-[#F4F1EC]">
                    <img
                      src={service.image}
                      alt={service.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-[9px] uppercase tracking-widest font-bold bg-[#121212]/85 text-[#C5A059] backdrop-blur-md border border-white/10">
                        {service.categoryName}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-xs text-white/90 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{service.durationMinutes} mins</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 
                      onClick={() => onSelectServiceDetail(service.slug)}
                      className="font-serif text-xl sm:text-2xl font-bold text-[#121212] group-hover:text-[#C5A059] transition-colors cursor-pointer"
                    >
                      {service.name}
                    </h3>

                    <p className="text-xs text-[#4A4A4A] leading-relaxed font-light line-clamp-3">
                      {service.shortDescription}
                    </p>

                    {/* Products tags */}
                    {service.productsUsed && (
                      <div className="pt-2 flex flex-wrap gap-1">
                        {service.productsUsed.slice(0, 2).map((prod, i) => (
                          <span key={i} className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[#F9F7F2] border border-[#E5E1DA] text-[#4A4A4A] font-medium">
                            {prod}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0 border-t border-[#E5E1DA] mt-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-bold block">Rate</span>
                    <span className="font-serif text-2xl font-bold text-[#121212]">
                      AED {service.priceAED}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectServiceDetail(service.slug)}
                      className="px-3 py-2 text-xs font-bold text-[#4A4A4A] hover:text-[#121212] transition-colors cursor-pointer"
                    >
                      Details
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
        )}

      </div>
    </div>
  );
};
