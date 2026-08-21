import React, { useState, useEffect } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useSalon } from '../context/SalonContext';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  onViewAllGallery?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onViewAllGallery }) => {
  const { businessInfo, activeGalleryItems } = useSalon();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Atelier Spaces' },
    { id: 'interior', label: 'Salon Interior' },
    { id: 'hair', label: 'Hair Couture' },
    { id: 'treatments', label: 'Facial Suites' },
    { id: 'beauty', label: 'Nail Couture' },
    { id: 'spa', label: 'Spa & Hammam' },
    { id: 'vip', label: 'VIP Suites' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? activeGalleryItems
    : activeGalleryItems.filter((item) => item.category === selectedCategory);

  // Keyboard navigation for lightbox
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
    <section className="py-20 sm:py-28 bg-[#121212] text-[#F9F7F2] border-b border-[#2C2C2C]" id="gallery-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
              Visual Atelier Tour
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
              The {businessInfo.name} Portfolio
            </h2>
          </div>
          {onViewAllGallery && (
            <button
              onClick={onViewAllGallery}
              className="text-[11px] uppercase tracking-widest font-bold text-[#C5A059] hover:text-white transition-colors cursor-pointer self-start md:self-auto"
            >
              Explore Full Gallery &rarr;
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-[#C5A059] text-[#121212] border-[#C5A059]'
                  : 'bg-[#1E1E1E] text-[#E5E1DA] hover:bg-[#2A2A2A] hover:text-white border-[#333333]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {(filteredItems || []).slice(0, 8).map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(index)}
              className="group relative h-72 sm:h-80 overflow-hidden cursor-pointer bg-[#1E1E1E] border border-[#2C2C2C] shadow-lg"
              id={`gallery-thumb-${item.id}`}
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Tag */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 text-[8px] uppercase tracking-widest font-bold bg-black/80 text-[#C5A059] border border-white/10">
                  {item.categoryLabel}
                </span>
              </div>

              {/* View Icon */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Title & Caption */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#C5A059] transition-colors leading-tight">
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
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          id="gallery-lightbox"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-5 right-5 p-3 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors z-20 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-20 cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-20 cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Main Image & Caption */}
          <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center">
            <img
              src={filteredItems[activeLightboxIndex].image}
              alt={filteredItems[activeLightboxIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center space-y-1 max-w-lg">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium">
                {filteredItems[activeLightboxIndex].categoryLabel} • {activeLightboxIndex + 1} of {filteredItems.length}
              </span>
              <h4 className="font-serif text-xl sm:text-2xl text-white">
                {filteredItems[activeLightboxIndex].title}
              </h4>
              {filteredItems[activeLightboxIndex].caption && (
                <p className="text-xs text-[#C9BCA8]">
                  {filteredItems[activeLightboxIndex].caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

