import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Award, 
  Scissors, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useSalon } from '../../../context/SalonContext';
import { Stylist } from '../../../types';

export const StaffModule: React.FC = () => {
  const { staff, addStaff, updateStaff, deleteStaff } = useSalon();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Stylist | null>(null);

  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formExperience, setFormExperience] = useState('');
  const [formSpecialties, setFormSpecialties] = useState('');
  const [formBio, setFormBio] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formActive, setFormActive] = useState(true);

  const openAddModal = () => {
    setEditingStaff(null);
    setFormName('');
    setFormRole('Master Stylist');
    setFormExperience('8+ Years');
    setFormSpecialties('Skin Fades, Hot Towel Shaves');
    setFormBio('');
    setFormImage('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80');
    setFormActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (member: Stylist) => {
    setEditingStaff(member);
    setFormName(member.name);
    setFormRole(member.role);
    setFormExperience(member.experience);
    setFormSpecialties(member.specialties.join(', '));
    setFormBio(member.bio);
    setFormImage(member.image);
    setFormActive(member.active !== false);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    const specialtiesArray = formSpecialties
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingStaff) {
      updateStaff(editingStaff.id, {
        name: formName,
        role: formRole,
        experience: formExperience,
        specialties: specialtiesArray,
        bio: formBio,
        image: formImage,
        active: formActive,
      });
    } else {
      addStaff({
        name: formName,
        role: formRole,
        experience: formExperience,
        specialties: specialtiesArray,
        bio: formBio,
        image: formImage,
        active: formActive,
      });
    }

    setIsModalOpen(false);
    setEditingStaff(null);
  };

  return (
    <div className="space-y-6" id="admin-staff-module">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181818] border border-[#2C2C2C] p-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Barbers &amp; Master Stylists
          </h2>
          <p className="text-xs text-[#A0988E] font-light">
            Manage your artisanal barber roster, experience credentials, and specialties.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-xs"
          id="admin-add-staff-btn"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => {
          const isActive = member.active !== false;

          return (
            <div 
              key={member.id} 
              className={`bg-[#181818] border border-[#2C2C2C] overflow-hidden flex flex-col justify-between hover:border-[#C5A059]/40 transition-all ${
                !isActive ? 'opacity-50' : ''
              }`}
            >
              <div>
                <div className="relative h-48 w-full bg-[#121212] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale contrast-125"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold bg-[#121212]/90 text-[#C5A059] border border-[#C5A059]/30">
                    {member.experience}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-[11px] uppercase tracking-wider text-[#C5A059] font-medium">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-xs text-[#A0988E] font-light line-clamp-2">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {member.specialties.map((sp, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-[#121212] text-[#E5E1DA] border border-[#333]"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#141414] border-t border-[#2C2C2C] flex items-center justify-between">
                <button
                  onClick={() => updateStaff(member.id, { active: !isActive })}
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
                    onClick={() => openEditModal(member)}
                    className="p-1.5 bg-[#262626] hover:bg-[#333] text-[#C5A059] border border-[#3A3A3A] transition-colors cursor-pointer"
                    title="Edit Member"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete barber "${member.name}"?`)) {
                        deleteStaff(member.id);
                      }
                    }}
                    className="p-1.5 text-[#777] hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                    title="Delete Member"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#2C2C2C] max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center pb-3 border-b border-[#2C2C2C]">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                  Team Member Profile
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  {editingStaff ? 'Edit Barber Profile' : 'Add New Stylist'}
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
                  Stylist Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Barber Tariq"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Master Barber"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Experience *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10+ Years Dubai"
                    value={formExperience}
                    onChange={(e) => setFormExperience(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Photo URL *
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

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Specialties (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Executive Tapers, Hot Towel Razor Shave, Beard Conditioning"
                  value={formSpecialties}
                  onChange={(e) => setFormSpecialties(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Biography &amp; Philosophy
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief introduction to craftsmanship, training background..."
                  value={formBio}
                  onChange={(e) => setFormBio(e.target.value)}
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
                  <span>Active &amp; Visible on Website</span>
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
                  Save Profile
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
