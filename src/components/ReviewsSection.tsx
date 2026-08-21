import React from 'react';
import { Star, ShieldCheck, ExternalLink, MessageSquare } from 'lucide-react';
import { useSalon } from '../context/SalonContext';

export const ReviewsSection: React.FC = () => {
  const { businessInfo, activeReviews } = useSalon();

  const handleOpenGoogleReviews = () => {
    window.open(businessInfo.googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F9F7F2] text-[#121212] border-b border-[#E5E1DA]" id="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Card */}
        <div className="bg-[#121212] text-[#F9F7F2] p-8 sm:p-12 border border-[#2C2C2C] mb-14 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
                Verified Google Business Profile
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white">
                Guest Reflections &amp; Critical Acclaim
              </h2>
              <p className="text-sm sm:text-base text-[#E5E1DA] font-light max-w-xl">
                We take immense pride in delivering bespoke luxury, immaculate hygiene, and attentive service for every client who visits our {businessInfo.shortLocation} salon.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-6 bg-[#1A1816] p-6 sm:p-8 border border-[#2C2C2C]">
              <div className="text-center sm:text-left space-y-1">
                <div className="font-serif text-5xl sm:text-6xl font-bold text-white leading-none">
                  {businessInfo.rating}
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-[#C5A059]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                  ))}
                </div>
                <p className="text-xs text-[#E5E1DA] tracking-wide font-light">
                  Based on <strong className="text-white">{businessInfo.reviewCount}</strong> Google reviews
                </p>
              </div>

              <div className="h-px sm:h-16 w-full sm:w-px bg-[#2C2C2C]" />

              <button
                onClick={handleOpenGoogleReviews}
                className="w-full sm:w-auto px-6 py-4 bg-[#C5A059] hover:bg-white text-[#121212] text-[11px] uppercase tracking-widest font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
                id="view-google-reviews-btn"
              >
                <span>Google Reviews</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeReviews.slice(0, 6).map((review) => (
            <div
              key={review.id}
              className="bg-white p-7 sm:p-8 border border-[#E5E1DA] flex flex-col justify-between space-y-5 hover:shadow-xl transition-all duration-300 shadow-xs"
              id={`review-card-${review.id}`}
            >
              <div className="space-y-4">
                
                {/* Rating & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#4A4A4A]">{review.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#121212] font-light leading-relaxed italic">
                  “{review.text}”
                </p>

                {/* Service Tag */}
                {review.serviceMentioned && (
                  <div className="pt-2">
                    <span className="text-[9px] uppercase tracking-widest text-[#C5A059] bg-[#F4F1EC] px-2.5 py-1 border border-[#E5E1DA] font-bold">
                      {review.serviceMentioned}
                    </span>
                  </div>
                )}
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#E5E1DA] flex items-center gap-3">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.author}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 object-cover border border-[#E5E1DA]"
                  />
                ) : (
                  <div className="w-10 h-10 bg-[#121212] text-[#C5A059] flex items-center justify-center font-serif text-base font-bold">
                    {review.author.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-serif text-base font-bold text-[#121212] leading-none">
                    {review.author}
                  </h4>
                  <span className="text-[10px] uppercase tracking-widest text-[#4A4A4A] flex items-center gap-1 mt-1 font-medium">
                    <ShieldCheck className="w-3 h-3 text-[#C5A059]" /> Verified Google Review
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

