import React, { useState } from 'react';
import { 
  FolderTree, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Check, 
  Layers,
  AlertCircle
} from 'lucide-react';
import { useSalon } from '../../../context/SalonContext';
import { ServiceCategory } from '../../../types';

export const CategoriesModule: React.FC = () => {
  const { categories, services, addCategory, updateCategory, deleteCategory } = useSalon();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);

  const [formName, setFormName] = useState('');
  const [formId, setFormId] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formOrder, setFormOrder] = useState(1);
  const [formActive, setFormActive] = useState(true);

  const openAddModal = () => {
    setEditingCategory(null);
    setFormName('');
    setFormId('');
    setFormDescription('');
    setFormOrder(categories.length + 1);
    setFormActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (category: ServiceCategory) => {
    setEditingCategory(category);
    setFormName(category.name);
    setFormId(category.id);
    setFormDescription(category.description || '');
    setFormOrder(category.order || 1);
    setFormActive(category.active !== false);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: formName,
        description: formDescription,
        order: Number(formOrder),
        active: formActive,
      });
    } else {
      addCategory({
        id: formId || undefined,
        name: formName,
        description: formDescription,
        order: Number(formOrder),
        active: formActive,
      });
    }

    setIsModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6" id="admin-categories-module">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181818] border border-[#2C2C2C] p-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Grooming Categories
          </h2>
          <p className="text-xs text-[#A0988E] font-light">
            Organize services on the menu, price list, and booking dropdown.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-xs"
          id="admin-add-category-btn"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const serviceCount = services.filter((s) => s.category === cat.id).length;
          const isActive = cat.active !== false;

          return (
            <div 
              key={cat.id} 
              className={`bg-[#181818] border border-[#2C2C2C] p-6 flex flex-col justify-between space-y-4 hover:border-[#C5A059]/40 transition-all ${
                !isActive ? 'opacity-50' : ''
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                    Order #{cat.order || idx + 1}
                  </span>
                  <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-[#121212] text-[#A0988E] border border-[#333]">
                    {serviceCount} Services
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#A0988E] font-light leading-relaxed">
                  {cat.description || 'No description entered.'}
                </p>
                <div className="text-[10px] font-mono text-[#666]">
                  Slug ID: <span className="text-[#A0988E]">{cat.id}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2C2C2C] flex items-center justify-between">
                <button
                  onClick={() => updateCategory(cat.id, { active: !isActive })}
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
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 bg-[#262626] hover:bg-[#333] text-[#C5A059] border border-[#3A3A3A] transition-colors cursor-pointer"
                    title="Edit Category"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (serviceCount > 0) {
                        alert(`Cannot delete category with ${serviceCount} attached services. Reassign services first.`);
                        return;
                      }
                      if (window.confirm(`Delete category "${cat.name}"?`)) {
                        deleteCategory(cat.id);
                      }
                    }}
                    className="p-1.5 text-[#777] hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#2C2C2C] max-w-md w-full p-6 sm:p-8 space-y-6">
            
            <div className="flex justify-between items-center pb-3 border-b border-[#2C2C2C]">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                  Category Editor
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  {editingCategory ? 'Edit Category' : 'Create Category'}
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
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Beard Sculpting"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {!editingCategory && (
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Slug ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. beard-sculpting"
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Short tagline explaining this grooming tier..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formActive}
                      onChange={(e) => setFormActive(e.target.checked)}
                      className="accent-[#C5A059]"
                    />
                    <span>Active on Menu</span>
                  </label>
                </div>
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
                  Save Category
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
