import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useSalon } from '../../../context/SalonContext';
import { GalleryItem } from '../../../types';

export const GalleryModule: React.FC = () => {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useSalon();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<'haircuts' | 'beards' | 'facials' | 'salon' | 'treatments'>('haircuts');
  const [formCategoryLabel, setFormCategoryLabel] = useState('Haircuts');
  const [formImage, setFormImage] = useState('');
  const [formCaption, setFormCaption] = useState('');
  const [formActive, setFormActive] = useState(true);

  const openAddModal = () => {
    setEditingItem(null);
    setFormTitle('');
    setFormCategory('haircuts');
    setFormCategoryLabel('Haircuts');
    setFormImage('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80');
    setFormCaption('');
    setFormActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormCategoryLabel(item.categoryLabel);
    setFormImage(item.image);
    setFormCaption(item.caption);
    setFormActive(item.active !== false);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formImage) return;

    if (editingItem) {
      updateGalleryItem(editingItem.id, {
        title: formTitle,
        category: formCategory,
        categoryLabel: formCategoryLabel,
        image: formImage,
        caption: formCaption,
        active: formActive,
      });
    } else {
      addGalleryItem({
        title: formTitle,
        category: formCategory,
        categoryLabel: formCategoryLabel,
        image: formImage,
        caption: formCaption,
        active: formActive,
      });
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6" id="admin-gallery-module">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181818] border border-[#2C2C2C] p-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Editorial Lookbook &amp; Salon Gallery
          </h2>
          <p className="text-xs text-[#A0988E] font-light">
            Manage haircuts, beard styling, treatment results, and luxury salon interior photography.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-xs"
          id="admin-add-photo-btn"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload / Add Photo</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gallery.map((item) => {
          const isActive = item.active !== false;

          return (
            <div 
              key={item.id} 
              className={`bg-[#181818] border border-[#2C2C2C] overflow-hidden flex flex-col justify-between hover:border-[#C5A059]/40 transition-all ${
                !isActive ? 'opacity-50' : ''
              }`}
            >
              <div>
                <div className="relative h-56 w-full bg-[#121212] overflow-hidden group">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold bg-[#121212]/90 text-[#C5A059] border border-[#C5A059]/30">
                    {item.categoryLabel}
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="font-serif text-sm font-bold text-white line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#A0988E] font-light line-clamp-2">
                    {item.caption || 'No caption'}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-[#141414] border-t border-[#2C2C2C] flex items-center justify-between">
                <button
                  onClick={() => updateGalleryItem(item.id, { active: !isActive })}
                  className={`px-2 py-1 text-[9px] uppercase tracking-wider font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
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
                    onClick={() => openEditModal(item)}
                    className="p-1.5 bg-[#262626] hover:bg-[#333] text-[#C5A059] border border-[#3A3A3A] transition-colors cursor-pointer"
                    title="Edit Item"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete gallery item "${item.title}"?`)) {
                        deleteGalleryItem(item.id);
                      }
                    }}
                    className="p-1.5 text-[#777] hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                    title="Delete Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Gallery Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#2C2C2C] max-w-md w-full p-6 sm:p-8 space-y-6">
            
            <div className="flex justify-between items-center pb-3 border-b border-[#2C2C2C]">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                  Photo Entry
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  {editingItem ? 'Edit Gallery Photo' : 'Add Photo to Lookbook'}
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
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Skin Fade Haircut &amp; Lineup"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      setFormCategory(cat);
                      const labels: Record<string, string> = {
                        haircuts: 'Haircuts',
                        beards: 'Beard Styling',
                        facials: 'Facial Spa',
                        treatments: 'Hair Care',
                        salon: 'Salon Lounge',
                      };
                      setFormCategoryLabel(labels[cat] || 'Grooming');
                    }}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="haircuts">Haircuts</option>
                    <option value="beards">Beards</option>
                    <option value="facials">Facials</option>
                    <option value="treatments">Treatments</option>
                    <option value="salon">Salon Interior</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Category Tag Label
                  </label>
                  <input
                    type="text"
                    required
                    value={formCategoryLabel}
                    onChange={(e) => setFormCategoryLabel(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {formImage && (
                <div className="h-32 w-full bg-[#121212] border border-[#333] overflow-hidden flex items-center justify-center">
                  <img 
                    src={formImage} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Caption / Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Artisanal fade with foil razor finish..."
                  value={formCaption}
                  onChange={(e) => setFormCaption(e.target.value)}
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
                  <span>Active &amp; Display in Gallery</span>
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
                  Save Photo
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
