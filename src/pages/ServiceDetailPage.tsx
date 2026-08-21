import React from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { SERVICES, SALON_INFO } from '../data/salonData';
import { Service } from '../types';

interface ServiceDetailPageProps {
  slug: string;
  onBack: () => void;
  onOpenBooking: (serviceId?: string) => void;
  onSelectRelated: (slug: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  slug,
  onBack,
  onOpenBooking,
  onSelectRelated,
}) => {
  const service = SERVICES.find((s) => s.slug === slug) || SERVICES[0];
  const relatedServices = SERVICES.filter(
    (s) => s.category === service.category && s.id !== service.id
  ).slice(0, 3);

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello ${SALON_INFO.name}, I am inquiring about booking the "${service.name}" (AED ${service.priceAED}). Could you please advise on availability today?`
    );
    window.open(`https://wa.me/${SALON_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="w-full py-12 sm:py-20 bg-[#F9F7F2] text-[#121212]" id="service-detail-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#121212] hover:text-[#C5A059] transition-colors cursor-pointer"
          id="service-detail-back-btn"
        >
          <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
          <span>Back to Grooming Menu</span>
        </button>

        {/* Hero Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-6 overflow-hidden shadow-2xl border border-[#E5E1DA] relative bg-[#F4F1EC] h-[400px] sm:h-[500px]">
            <img
              src={service.image}
              alt={service.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1 text-[10px] uppercase tracking-widest font-bold bg-[#121212]/85 text-[#C5A059] backdrop-blur-md border border-white/10">
                {service.categoryName}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 text-xs text-[#C5A059] mb-1 font-medium">
                <Clock className="w-4 h-4" />
                <span>{service.durationMinutes} Minutes Treatment</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-white">
                {service.name}
              </h1>
            </div>
          </div>

          {/* Right Column: Pricing & Booking Card */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-white p-7 sm:p-9 border border-[#E5E1DA] shadow-xs space-y-6">
              
              <div className="flex items-baseline justify-between border-b border-[#E5E1DA] pb-5">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-1">
                    Grooming Rate
                  </span>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#121212]">
                    AED {service.priceAED}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#4A4A4A] block font-light">Duration</span>
                  <span className="text-sm font-bold text-[#121212]">{service.durationMinutes} mins</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#4A4A4A] font-light leading-relaxed">
                {service.fullDescription || service.shortDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="flex-1 py-4 bg-[#121212] hover:bg-[#C5A059] text-white text-[11px] uppercase tracking-widest font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  id="detail-book-now-btn"
                >
                  <Calendar className="w-4 h-4 text-[#C5A059]" />
                  <span>Book This Service</span>
                </button>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="py-4 px-6 bg-white hover:bg-[#121212] hover:text-white border border-[#E5E1DA] text-[#121212] text-[11px] uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  id="detail-whatsapp-inquire-btn"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Barbers</span>
                </button>
              </div>

              <div className="pt-3 border-t border-[#E5E1DA] flex items-center justify-between text-xs text-[#4A4A4A] font-light">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" /> Sterilized Single-Use Tools
                </span>
                <span>Al Marsoumy Bldg, Warsan 4</span>
              </div>

            </div>

          </div>

        </div>

        {/* Detailed Protocol Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          {/* Key Benefits */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="bg-white p-7 sm:p-8 border border-[#E5E1DA] space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Service Highlights</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#121212]">
                Why Gentlemen Choose This Service
              </h3>
              <ul className="space-y-3 pt-2">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#4A4A4A] font-light">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ritual Sequence / Protocol */}
          {service.ritualSteps && service.ritualSteps.length > 0 && (
            <div className="bg-white p-7 sm:p-8 border border-[#E5E1DA] space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                <PackageCheck className="w-4 h-4" />
                <span>Step-by-Step Barber Protocol</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#121212]">
                Treatment Protocol
              </h3>
              <ol className="space-y-3 pt-2">
                {service.ritualSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#4A4A4A] font-light">
                    <span className="w-5 h-5 bg-[#121212] text-[#C5A059] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

        </div>

        {/* Featured Formulations / Products Used */}
        {service.productsUsed && service.productsUsed.length > 0 && (
          <div className="bg-[#121212] text-white p-8 border border-[#2C2C2C] space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block">
              Formulation &amp; Products
            </span>
            <h3 className="font-serif text-2xl font-normal text-white">
              Authentic Barber Formulations Applied
            </h3>
            <div className="flex flex-wrap gap-2.5 pt-2">
              {service.productsUsed.map((prod, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-[#1E1E1E] border border-[#333333] text-xs uppercase tracking-wider text-[#F9F7F2] font-medium"
                >
                  {prod}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Rituals */}
        {relatedServices.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-[#E5E1DA]">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212]">
              Complementary Services in {service.categoryName}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectRelated(rel.slug)}
                  className="bg-white p-5 border border-[#E5E1DA] hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#121212] group-hover:text-[#C5A059] transition-colors">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-[#4A4A4A] font-light line-clamp-2 mt-1">
                      {rel.shortDescription}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-[#E5E1DA] flex items-center justify-between">
                    <span className="font-serif text-base font-bold text-[#121212]">
                      AED {rel.priceAED}
                    </span>
                    <span className="text-xs font-bold text-[#C5A059] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
