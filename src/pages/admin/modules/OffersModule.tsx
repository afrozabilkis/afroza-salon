import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Calendar, 
  Sparkles, 
  Check,
  AlertCircle
} from 'lucide-react';
import { useSalon } from '../../../context/SalonContext';
import { SpecialOffer } from '../../../types';

export const OffersModule: React.FC = () => {
  const { offers, addOffer, updateOffer, deleteOffer, formatPriceAED } = useSalon();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<SpecialOffer | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formTag, setFormTag] = useState('SPECIAL PROMO');
  const [formPriceAED, setFormPriceAED] = useState(150);
  const [formOriginalPriceAED, setFormOriginalPriceAED] = useState(230);
  const [formDescription, setFormDescription] = useState('');
  const [formIncluded, setFormIncluded] = useState('');
  const [formValidUntil, setFormValidUntil] = useState('Limited Time');
  const [formActive, setFormActive] = useState(true);

  const openAddModal = () => {
    setEditingOffer(null);
    setFormTitle('');
    setFormTag('LIMITED TIME OFFER');
    setFormPriceAED(150);
    setFormOriginalPriceAED(220);
    setFormDescription('');
    setFormIncluded('Master Haircut\nSteamed Beard Sculpting\nCharcoal Mask');
    setFormValidUntil('Valid through end of month');
    setFormActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (offer: SpecialOffer) => {
    setEditingOffer(offer);
    setFormTitle(offer.title);
    setFormTag(offer.discount || offer.tag || 'SPECIAL OFFER');
    setFormPriceAED(offer.priceAED);
    setFormOriginalPriceAED(offer.originalPriceAED);
    setFormDescription(offer.description);
    setFormIncluded(offer.included.join('\n'));
    setFormValidUntil(offer.validUntil);
    setFormActive(offer.active !== false);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return;

    const includedArray = formIncluded
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingOffer) {
      updateOffer(editingOffer.id, {
        title: formTitle,
        discount: formTag,
        tag: formTag,
        priceAED: Number(formPriceAED),
        originalPriceAED: Number(formOriginalPriceAED),
        description: formDescription,
        included: includedArray,
        validUntil: formValidUntil,
        active: formActive,
      });
    } else {
      addOffer({
        title: formTitle,
        discount: formTag,
        tag: formTag,
        priceAED: Number(formPriceAED),
        originalPriceAED: Number(formOriginalPriceAED),
        description: formDescription,
        included: includedArray,
        validUntil: formValidUntil,
        active: formActive,
      });
    }

    setIsModalOpen(false);
    setEditingOffer(null);
  };

  return (
    <div className="space-y-6" id="admin-offers-module">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181818] border border-[#2C2C2C] p-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Exclusive Salon Offers &amp; Bundles
          </h2>
          <p className="text-xs text-[#A0988E] font-light">
            Create promotional combos, seasonal discounts, and first-visit specials in AED.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-xs"
          id="admin-add-offer-btn"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Special Offer</span>
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => {
          const isActive = offer.active !== false;

          return (
            <div 
              key={offer.id} 
              className={`bg-[#181818] border border-[#2C2C2C] p-6 flex flex-col justify-between space-y-4 hover:border-[#C5A059]/40 transition-all ${
                !isActive ? 'opacity-50' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold bg-[#C5A059] text-[#121212]">
                    {offer.discount || offer.tag || 'PROMO'}
                  </span>
                  <span className="text-[10px] text-[#A0988E] flex items-center gap-1 font-light">
                    <Calendar className="w-3 h-3 text-[#C5A059]" />
                    <span>{offer.validUntil}</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {offer.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1 font-mono">
                    <span className="text-xl font-bold text-[#C5A059]">
                      {formatPriceAED(offer.priceAED)}
                    </span>
                    <span className="text-xs text-[#777] line-through">
                      {formatPriceAED(offer.originalPriceAED)}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#A0988E] font-light leading-relaxed">
                  {offer.description}
                </p>

                <div className="pt-2 border-t border-[#2A2A2A] space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-[#666] font-bold block">
                    Included Services:
                  </span>
                  {offer.included.map((item, idx) => (
                    <div key={idx} className="text-[11px] text-[#E5E1DA] flex items-center gap-1.5 font-light">
                      <span className="w-1 h-1 rounded-full bg-[#C5A059]"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#2C2C2C] flex items-center justify-between">
                <button
                  onClick={() => updateOffer(offer.id, { active: !isActive })}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  }`}
                >
                  {isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{isActive ? 'Active' : 'Hidden'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(offer)}
                    className="p-1.5 bg-[#262626] hover:bg-[#333] text-[#C5A059] border border-[#3A3A3A] transition-colors cursor-pointer"
                    title="Edit Offer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete offer "${offer.title}"?`)) {
                        deleteOffer(offer.id);
                      }
                    }}
                    className="p-1.5 text-[#777] hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                    title="Delete Offer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Offer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#2C2C2C] max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center pb-3 border-b border-[#2C2C2C]">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                  Offer Configuration
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  {editingOffer ? 'Edit Special Offer' : 'Create Special Offer'}
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
                  Offer Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Executive Grooming Package"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 25% OFF or BESTSELLER"
                    value={formTag}
                    onChange={(e) => setFormTag(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Validity Text
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Daily before 4 PM"
                    value={formValidUntil}
                    onChange={(e) => setFormValidUntil(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Offer Price (AED) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formPriceAED}
                    onChange={(e) => setFormPriceAED(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Original Price (AED) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formOriginalPriceAED}
                    onChange={(e) => setFormOriginalPriceAED(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Description *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summary of why this bundle is exceptional value..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Included Services (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Skin Fade Haircut&#10;Hot Towel Beard Trim&#10;Express Clay Mask"
                  value={formIncluded}
                  onChange={(e) => setFormIncluded(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="p-3 bg-[#121212] border border-[#2A2A2A]">
                <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formActive}
                    onChange={(e) => setFormActive(e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <span>Active &amp; Visible on Storefront</span>
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
                  Save Offer
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
