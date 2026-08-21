import React from 'react';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/TrustStrip';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { OffersSection } from '../components/OffersSection';
import { GallerySection } from '../components/GallerySection';
import { ReviewsSection } from '../components/ReviewsSection';
import { LocationSection } from '../components/LocationSection';
import { FAQS } from '../data/salonData';
import { ChevronDown, Sparkles } from 'lucide-react';

interface HomePageProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectServiceDetail: (slug: string) => void;
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenBooking,
  onSelectServiceDetail,
  onNavigate,
}) => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <Hero
        onOpenBooking={() => onOpenBooking()}
        onExploreServices={() => onNavigate('/services')}
      />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. About Atelier */}
      <AboutSection
        onOpenBooking={() => onOpenBooking()}
        onLearnMore={() => onNavigate('/about')}
      />

      {/* 4. Services Menu */}
      <ServicesSection
        onOpenBooking={onOpenBooking}
        onSelectServiceDetail={onSelectServiceDetail}
        onViewAllServices={() => onNavigate('/services')}
      />

      {/* 5. Seasonal Privileges & Offers */}
      <OffersSection
        onOpenBooking={onOpenBooking}
        onViewAllOffers={() => onNavigate('/offers')}
      />

      {/* 6. Visual Gallery */}
      <GallerySection
        onViewAllGallery={() => onNavigate('/gallery')}
      />

      {/* 7. Client Reviews */}
      <ReviewsSection />

      {/* 8. Frequently Asked Questions */}
      <section className="py-20 bg-[#F9F7F2] text-[#121212] border-b border-[#E5E1DA]" id="faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
              Guest Assistance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#121212]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-[#E5E1DA] overflow-hidden transition-colors shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer font-serif text-lg sm:text-xl font-medium text-[#121212]"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C5A059] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-[#4A4A4A] font-light leading-relaxed border-t border-[#E5E1DA] pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Location & Contact Section */}
      <LocationSection />
    </div>
  );
};
