import React, { useState } from 'react';
import { Star, ShieldCheck, ExternalLink, MessageSquare, ThumbsUp } from 'lucide-react';
import { SALON_INFO, REVIEWS } from '../data/salonData';

export const ReviewsPage: React.FC = () => {
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const filteredReviews = filterRating 
    ? REVIEWS.filter(r => r.rating === filterRating)
    : REVIEWS;

  const handleOpenGoogle = () => {
    window.open(SALON_INFO.googleMapsUrl, '_blank');
  };

  return (
    <div className="w-full py-14 sm:py-24 bg-[#F9F7F2] text-[#121212]" id="reviews-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
            Client Testimonials
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#121212] tracking-tight">
            Client Reviews &amp; Experiences
          </h1>
          <p className="text-sm sm:text-base text-[#4A4A4A] font-light leading-relaxed">
            Read verified feedback from customers who trust Afroza Gents Salon in Warsan 4, International City Phase 2 for haircuts, beard sculpting, and wellness treatments.
          </p>
        </div>

        {/* Rating Score Banner */}
        <div className="bg-[#121212] text-white p-8 sm:p-12 border border-[#2C2C2C] shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 text-center md:text-left space-y-2">
              <div className="font-serif text-6xl sm:text-7xl font-normal text-white leading-none">
                {SALON_INFO.rating}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 text-[#C5A059]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C5A059]" />
                ))}
              </div>
              <p className="text-xs text-[#A0988E] font-light">
                Overall Google Rating out of 5.0
              </p>
            </div>

            <div className="md:col-span-5 space-y-2 border-y md:border-y-0 md:border-x border-[#333333] py-4 md:py-0 md:px-8">
              <div className="space-y-1 text-xs text-[#A0988E]">
                <div className="flex items-center gap-3">
                  <span>5 Stars</span>
                  <div className="flex-1 h-2 bg-[#2C2C2C] overflow-hidden">
                    <div className="h-full bg-[#C5A059] w-[95%]" />
                  </div>
                  <span>95%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>4 Stars</span>
                  <div className="flex-1 h-2 bg-[#2C2C2C] overflow-hidden">
                    <div className="h-full bg-[#C5A059] w-[5%]" />
                  </div>
                  <span>5%</span>
                </div>
                <div className="flex items-center gap-3 opacity-30">
                  <span>3 Stars</span>
                  <div className="flex-1 h-2 bg-[#2C2C2C] overflow-hidden">
                    <div className="h-full bg-[#C5A059] w-[0%]" />
                  </div>
                  <span>0%</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 text-center md:text-right space-y-3">
              <span className="text-xs text-[#C5A059] font-bold block">
                {SALON_INFO.reviewCount} Verified Google Reviews
              </span>
              <button
                onClick={handleOpenGoogle}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#C5A059] hover:bg-white hover:text-[#121212] text-white text-[10px] uppercase tracking-widest font-bold transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
                id="reviews-page-google-cta"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-7 sm:p-8 border border-[#E5E1DA] flex flex-col justify-between space-y-6 shadow-xs hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#A0988E] font-light">{review.date}</span>
                </div>

                <p className="text-sm text-[#121212] font-light leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>

                {review.serviceMentioned && (
                  <span className="inline-block text-[9px] uppercase tracking-widest text-[#C5A059] bg-[#F9F7F2] border border-[#E5E1DA] px-2.5 py-1 font-bold">
                    {review.serviceMentioned}
                  </span>
                )}
              </div>

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
                  <span className="text-[10px] text-emerald-700 flex items-center gap-1 mt-1 font-medium">
                    <ShieldCheck className="w-3 h-3" /> Verified Google Review
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
