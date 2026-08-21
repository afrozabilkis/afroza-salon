import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSalon } from '../context/SalonContext';
import { GalleryItem } from '../types';

export const GalleryPage: React.FC = () => {
  const { businessInfo, activeGalleryItems } = useSalon();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Salon Spaces' },
    { id: 'interior', label: 'Barbershop Stations' },
    { id: 'hair', label: 'Haircuts & Fades' },
    { id: 'beard', label: 'Beard Sculpting' },
    { id: 'treatments', label: 'Facial & Skin' },
    { id: 'nails', label: 'Hands & Feet Spa' },
    { id: 'tools', label: 'Sterilized Tools' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? activeGalleryItems
    : activeGalleryItems.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems]);

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="w-full py-14 sm:py-24 bg-[#F9F7F2] text-[#121212]" id="gallery-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
            Visual Barbershop Archive
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#121212] tracking-tight">
            The {businessInfo.name} Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#4A4A4A] font-light leading-relaxed">
            Explore our styling stations, precision skin fades, royal hot towel beard sculpting, and wellness treatment zones in {businessInfo.shortLocation}.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#121212] text-white shadow-xs'
                  : 'bg-white text-[#4A4A4A] hover:bg-[#E5E1DA] border border-[#E5E1DA]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(index)}
              className="group relative h-80 overflow-hidden cursor-pointer bg-[#121212] border border-[#E5E1DA] shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 text-[9px] uppercase tracking-widest font-bold bg-black/70 backdrop-blur-md text-[#C5A059] border border-white/10">
                  {item.categoryLabel}
                </span>
              </div>

              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#C5A059] transition-colors leading-tight">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-[11px] text-[#E5E1DA] line-clamp-1 mt-0.5 font-light">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          id="gallery-page-lightbox"
        >
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-5 right-5 p-3 text-white/70 hover:text-white bg-white/10 transition-colors z-20 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-all z-20 cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-all z-20 cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center">
            <img
              src={filteredItems[activeLightboxIndex].image}
              alt={filteredItems[activeLightboxIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto max-w-full object-contain shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center space-y-1 max-w-lg">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                {filteredItems[activeLightboxIndex].categoryLabel} • {activeLightboxIndex + 1} of {filteredItems.length}
              </span>
              <h4 className="font-serif text-xl sm:text-2xl text-white font-bold">
                {filteredItems[activeLightboxIndex].title}
              </h4>
              {filteredItems[activeLightboxIndex].caption && (
                <p className="text-xs text-[#E5E1DA] font-light">
                  {filteredItems[activeLightboxIndex].caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

