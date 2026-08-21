import React, { useState } from 'react';
import { 
  Scissors, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Copy, 
  Trash2, 
  Check, 
  Clock, 
  Tag, 
  Sparkles, 
  Eye, 
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { useSalon } from '../../../context/SalonContext';
import { Service } from '../../../types';

interface ServicesModuleProps {
  initialOpenNew?: boolean;
}

export const ServicesModule: React.FC<ServicesModuleProps> = ({ initialOpenNew = false }) => {
  const { 
    services, 
    categories, 
    addService, 
    updateService, 
    deleteService, 
    duplicateService, 
    toggleServiceActive,
    formatPriceAED 
  } = useSalon();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(initialOpenNew);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState(categories[0]?.id || 'haircuts');
  const [formDuration, setFormDuration] = useState(30);
  const [formPriceAED, setFormPriceAED] = useState<number>(0);
  const [formDiscountPriceAED, setFormDiscountPriceAED] = useState<number | undefined>(undefined);
  const [formDescription, setFormDescription] = useState('');
  const [formIncluded, setFormIncluded] = useState('');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formPopular, setFormPopular] = useState(false);
  const [formActive, setFormActive] = useState(true);

  const openAddModal = () => {
    setEditingService(null);
    setFormName('');
    setFormCategory(categories[0]?.id || 'haircuts');
    setFormDuration(30);
    setFormPriceAED(0);
    setFormDiscountPriceAED(undefined);
    setFormDescription('');
    setFormIncluded('');
    setFormFeatured(false);
    setFormPopular(false);
    setFormActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setFormName(service.name);
    setFormCategory(service.category);
    setFormDuration(service.duration);
    setFormPriceAED(service.priceAED ?? 0);
    setFormDiscountPriceAED(service.discountPriceAED);
    setFormDescription(service.description);
    setFormIncluded(service.included?.join('\n') || '');
    setFormFeatured(!!service.featured);
    setFormPopular(!!service.popular);
    setFormActive(service.active !== false);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    const includedArray = formIncluded
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingService) {
      updateService(editingService.id, {
        name: formName,
        category: formCategory,
        duration: Number(formDuration),
        priceAED: Number(formPriceAED),
        discountPriceAED: formDiscountPriceAED ? Number(formDiscountPriceAED) : undefined,
        description: formDescription,
        included: includedArray,
        featured: formFeatured,
        popular: formPopular,
        active: formActive,
      });
    } else {
      addService({
        name: formName,
        category: formCategory,
        duration: Number(formDuration),
        priceAED: Number(formPriceAED),
        discountPriceAED: formDiscountPriceAED ? Number(formDiscountPriceAED) : undefined,
        description: formDescription,
        included: includedArray,
        featured: formFeatured,
        popular: formPopular,
        active: formActive,
      });
    }

    setIsModalOpen(false);
    setEditingService(null);
  };

  const filteredServices = services.filter((srv) => {
    const matchesCat = selectedCategory === 'all' || srv.category === selectedCategory;
    const matchesSearch = 
      srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6" id="admin-services-module">
      
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181818] border border-[#2C2C2C] p-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Grooming Menu &amp; Services
          </h2>
          <p className="text-xs text-[#A0988E] font-light">
            Manage haircuts, beard sculpting, facial treatments, keratin, and spa packages. Prices display in AED.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-xs"
          id="admin-create-service-btn"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#181818] border border-[#2C2C2C] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search services by name or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#121212] border border-[#333] text-xs text-white placeholder:text-[#555] focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold whitespace-nowrap transition-colors border cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#C5A059] text-[#121212] border-[#C5A059]'
                : 'bg-[#121212] text-[#A0988E] hover:text-white border-[#333]'
            }`}
          >
            All Categories ({services.length})
          </button>
          {categories.map((cat) => {
            const count = services.filter((s) => s.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold whitespace-nowrap transition-colors border cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#C5A059] text-[#121212] border-[#C5A059]'
                    : 'bg-[#121212] text-[#A0988E] hover:text-white border-[#333]'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

      </div>

      {/* Services Table */}
      <div className="bg-[#181818] border border-[#2C2C2C] overflow-hidden">
        {filteredServices.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#777] space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto text-[#555]" />
            <p>No services match your search or filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#E5E1DA]">
              <thead className="text-[10px] uppercase tracking-widest text-[#777] bg-[#121212] border-b border-[#2C2C2C]">
                <tr>
                  <th className="py-3.5 px-4">Service Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Duration</th>
                  <th className="py-3.5 px-4">Pricing</th>
                  <th className="py-3.5 px-4">Badges</th>
                  <th className="py-3.5 px-4">Active</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2C2C2C]">
                {filteredServices.map((srv) => {
                  const catObj = categories.find((c) => c.id === srv.category);
                  const isActive = srv.active !== false;

                  return (
                    <tr 
                      key={srv.id} 
                      className={`hover:bg-[#1E1E1E]/60 transition-colors ${!isActive ? 'opacity-50' : ''}`}
                    >
                      
                      {/* Name & Description */}
                      <td className="py-4 px-4 max-w-sm">
                        <div className="font-bold text-white text-sm">{srv.name}</div>
                        <p className="text-[11px] text-[#A0988E] line-clamp-1 mt-0.5 font-light">
                          {srv.description}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span className="text-[10px] uppercase tracking-wider font-bold bg-[#121212] px-2 py-1 border border-[#333] text-[#C5A059]">
                          {catObj ? catObj.name : srv.category}
                        </span>
                      </td>

                      {/* Duration */}
                      <td className="py-4 px-4 font-mono text-[#A0988E]">
                        {srv.duration} mins
                      </td>

                      {/* Pricing */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white font-mono">
                          {formatPriceAED(srv.priceAED)}
                        </div>
                        {srv.discountPriceAED && (
                          <div className="text-[10px] text-emerald-400 font-mono line-through">
                            {formatPriceAED(srv.discountPriceAED)}
                          </div>
                        )}
                      </td>

                      {/* Badges */}
                      <td className="py-4 px-4 space-x-1">
                        {srv.featured && (
                          <span className="text-[9px] uppercase tracking-widest font-bold bg-amber-950/70 text-[#C5A059] border border-[#C5A059]/40 px-1.5 py-0.5">
                            Featured
                          </span>
                        )}
                        {srv.popular && (
                          <span className="text-[9px] uppercase tracking-widest font-bold bg-[#121212] text-white border border-[#444] px-1.5 py-0.5">
                            Popular
                          </span>
                        )}
                      </td>

                      {/* Active Status */}
                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleServiceActive(srv.id)}
                          className={`p-1.5 border transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                          }`}
                          title={isActive ? 'Active on Storefront' : 'Hidden from Storefront'}
                        >
                          {isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(srv)}
                            className="p-1.5 bg-[#262626] hover:bg-[#333] text-[#C5A059] border border-[#3A3A3A] transition-colors cursor-pointer"
                            title="Edit Service"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => duplicateService(srv.id)}
                            className="p-1.5 bg-[#262626] hover:bg-[#333] text-white border border-[#3A3A3A] transition-colors cursor-pointer"
                            title="Duplicate Service"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete service "${srv.name}"?`)) {
                                deleteService(srv.id);
                              }
                            }}
                            className="p-1.5 text-[#777] hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                            title="Delete Service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Service Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#2C2C2C] max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center pb-3 border-b border-[#2C2C2C]">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                  Menu Editor
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  {editingService ? 'Edit Grooming Service' : 'Add New Service'}
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
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Skin Fade &amp; Charcoal Detox"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Duration (Minutes) *
                  </label>
                  <input
                    type="number"
                    required
                    min={5}
                    step={5}
                    value={formDuration}
                    onChange={(e) => setFormDuration(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Price (AED) * (Enter 0 if unpriced)
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
                    Original / Discounted Price (AED)
                  </label>
                  <input
                    type="number"
                    min={0}
                    placeholder="Optional original price"
                    value={formDiscountPriceAED ?? ''}
                    onChange={(e) => setFormDiscountPriceAED(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed description of barber technique, single-use blades, botanical elixirs..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Included Steps / Items (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Consultation&#10;Hot towel steam&#10;Straight razor perimeter"
                  value={formIncluded}
                  onChange={(e) => setFormIncluded(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-[#121212] border border-[#2A2A2A]">
                <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <span>Featured Badge</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formPopular}
                    onChange={(e) => setFormPopular(e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <span>Popular Badge</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formActive}
                    onChange={(e) => setFormActive(e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <span>Active Live</span>
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
                  Save Service
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
