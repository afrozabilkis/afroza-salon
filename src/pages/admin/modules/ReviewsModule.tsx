import React, { useState } from 'react';
import { 
  Star, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { useSalon } from '../../../context/SalonContext';
import { Review } from '../../../types';

export const ReviewsModule: React.FC = () => {
  const { reviews, addReview, updateReview, deleteReview, toggleReviewApproval, businessInfo } = useSalon();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const [formAuthor, setFormAuthor] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formService, setFormService] = useState('Haircut & Beard');
  const [formComment, setFormComment] = useState('');
  const [formVerified, setFormVerified] = useState(true);
  const [formApproved, setFormApproved] = useState(true);

  const openAddModal = () => {
    setEditingReview(null);
    setFormAuthor('');
    setFormRating(5);
    setFormService('Executive Haircut & Beard');
    setFormComment('');
    setFormVerified(true);
    setFormApproved(true);
    setIsModalOpen(true);
  };

  const openEditModal = (rev: Review) => {
    setEditingReview(rev);
    setFormAuthor(rev.author);
    setFormRating(rev.rating);
    setFormService(rev.service || '');
    setFormComment(rev.comment);
    setFormVerified(rev.verified !== false);
    setFormApproved(rev.approved !== false);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor || !formComment) return;

    if (editingReview) {
      updateReview(editingReview.id, {
        author: formAuthor,
        rating: formRating,
        service: formService,
        comment: formComment,
        verified: formVerified,
        approved: formApproved,
      });
    } else {
      addReview({
        author: formAuthor,
        rating: formRating,
        service: formService,
        comment: formComment,
        verified: formVerified,
        approved: formApproved,
      });
    }

    setIsModalOpen(false);
    setEditingReview(null);
  };

  return (
    <div className="space-y-6" id="admin-reviews-module">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181818] border border-[#2C2C2C] p-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Client Testimonials &amp; Google Reviews
          </h2>
          <p className="text-xs text-[#A0988E] font-light">
            Current aggregate rating: <strong className="text-[#C5A059]">{businessInfo.rating} / 5.0 ★</strong> ({reviews.length} total verified testimonials).
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-xs"
          id="admin-add-review-btn"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => {
          const isApproved = rev.approved !== false;

          return (
            <div 
              key={rev.id} 
              className={`bg-[#181818] border border-[#2C2C2C] p-6 flex flex-col justify-between space-y-4 hover:border-[#C5A059]/40 transition-all ${
                !isApproved ? 'opacity-50 border-dashed' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'text-[#C5A059] fill-[#C5A059]' : 'text-[#333]'
                        }`} 
                      />
                    ))}
                  </div>

                  <span className="text-[10px] text-[#777]">
                    {rev.date}
                  </span>
                </div>

                <p className="text-xs text-[#E5E1DA] font-light italic leading-relaxed">
                  “{rev.comment}”
                </p>

                <div className="pt-2 border-t border-[#2A2A2A] flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                      <span>{rev.author}</span>
                      {rev.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" title="Verified Google Review" />
                      )}
                    </h4>
                    {rev.service && (
                      <p className="text-[10px] text-[#C5A059]">{rev.service}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#2C2C2C] flex items-center justify-between">
                <button
                  onClick={() => toggleReviewApproval(rev.id)}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
                    isApproved
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                      : 'bg-amber-950/60 text-amber-300 border-amber-700'
                  }`}
                >
                  {isApproved ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  <span>{isApproved ? 'Approved' : 'Hidden'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(rev)}
                    className="p-1.5 bg-[#262626] hover:bg-[#333] text-[#C5A059] border border-[#3A3A3A] transition-colors cursor-pointer"
                    title="Edit Review"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete review by ${rev.author}?`)) {
                        deleteReview(rev.id);
                      }
                    }}
                    className="p-1.5 text-[#777] hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#2C2C2C] max-w-md w-full p-6 sm:p-8 space-y-6">
            
            <div className="flex justify-between items-center pb-3 border-b border-[#2C2C2C]">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                  Testimonial Editor
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  {editingReview ? 'Edit Review' : 'Add Client Review'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#777] hover:text-white p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Al Nuaimi"
                  value={formAuthor}
                  onChange={(e) => setFormAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Star Rating (1 - 5)
                  </label>
                  <select
                    value={formRating}
                    onChange={(e) => setFormRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                    <option value={2}>2 Stars ★★☆☆☆</option>
                    <option value={1}>1 Star ★☆☆☆☆</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Service Mentioned
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Executive Fade &amp; Beard"
                    value={formService}
                    onChange={(e) => setFormService(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Client Feedback / Review Text *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed client testimonial regarding barber craftsmanship, ambience, hospitality..."
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-[#121212] border border-[#2A2A2A]">
                <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formVerified}
                    onChange={(e) => setFormVerified(e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <span>Verified Google Badge</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formApproved}
                    onChange={(e) => setFormApproved(e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <span>Publish on Storefront</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#2C2C2C]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-[#222] hover:bg-[#333] text-white text-xs uppercase tracking-widest font-bold cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold cursor-pointer shadow-xs"
                >
                  Save Review
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
