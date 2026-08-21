import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Scissors, 
  FolderTree, 
  Users, 
  Tag, 
  Image as ImageIcon, 
  Star, 
  Settings, 
  LogOut, 
  Store, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight,
  Shield,
  MessageSquare
} from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { OverviewModule } from './modules/OverviewModule';
import { AppointmentsModule } from './modules/AppointmentsModule';
import { ServicesModule } from './modules/ServicesModule';
import { CategoriesModule } from './modules/CategoriesModule';
import { StaffModule } from './modules/StaffModule';
import { OffersModule } from './modules/OffersModule';
import { GalleryModule } from './modules/GalleryModule';
import { ReviewsModule } from './modules/ReviewsModule';
import { SettingsModule } from './modules/SettingsModule';

interface AdminDashboardProps {
  onNavigateToStore: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateToStore }) => {
  const { businessInfo, appointments, adminLogout } = useSalon();
  
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openNewServiceOnLoad, setOpenNewServiceOnLoad] = useState(false);

  const pendingAppointmentsCount = appointments.filter((a) => a.status === 'pending').length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { 
      id: 'appointments', 
      label: 'Appointments', 
      icon: Calendar,
      badge: pendingAppointmentsCount > 0 ? `${pendingAppointmentsCount}` : undefined
    },
    { id: 'services', label: 'Services Menu', icon: Scissors },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'staff', label: 'Barbers & Team', icon: Users },
    { id: 'offers', label: 'Special Offers', icon: Tag },
    { id: 'gallery', label: 'Gallery Lookbook', icon: ImageIcon },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'settings', label: 'Salon Settings', icon: Settings },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    if (window.confirm('Sign out of Admin Dashboard?')) {
      adminLogout();
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#F9F7F2] flex flex-col font-sans selection:bg-[#C5A059] selection:text-[#121212]" id="admin-dashboard-container">
      
      {/* Top Fixed Header */}
      <header className="sticky top-0 z-40 bg-[#181818] border-b border-[#2C2C2C] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-[#262626] border border-[#333] cursor-pointer"
            aria-label="Toggle admin sidebar"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#262626] text-[#C5A059] border border-[#C5A059]/40 flex items-center justify-center font-serif font-bold text-sm">
              A
            </div>
            <div>
              <h1 className="font-serif text-sm font-bold tracking-wider text-white leading-none">
                {businessInfo.name}
              </h1>
              <span className="text-[8px] uppercase tracking-[0.2em] text-[#C5A059] font-bold block mt-0.5">
                Owner Administration • Warsan 4 Dubai
              </span>
            </div>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToStore}
            className="px-3.5 py-2 bg-[#262626] hover:bg-[#333] text-[#E5E1DA] hover:text-white border border-[#3A3A3A] text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            id="admin-top-view-store-btn"
          >
            <Store className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="hidden sm:inline">View Live Storefront</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 sm:px-3 sm:py-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/60 text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            id="admin-top-logout-btn"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

      </header>

      {/* Main Layout Container with Sidebar & Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 gap-8">
        
        {/* Desktop Left Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-6">
          <div className="bg-[#181818] border border-[#2C2C2C] p-3 space-y-1">
            <span className="px-3 py-2 text-[9px] uppercase tracking-[0.25em] text-[#777] font-bold block">
              Navigation Menu
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full px-3.5 py-2.5 text-xs font-medium uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer border ${
                    isActive
                      ? 'bg-[#C5A059] text-[#121212] font-bold border-[#C5A059]'
                      : 'text-[#A0988E] hover:text-white hover:bg-[#222] border-transparent'
                  }`}
                  id={`admin-nav-${item.id}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-1.5 py-0.2 text-[9px] font-bold font-mono rounded-full ${
                      isActive ? 'bg-[#121212] text-[#C5A059]' : 'bg-amber-500 text-[#121212]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="bg-[#181818] border border-[#2C2C2C] p-4 text-center space-y-2">
            <Shield className="w-5 h-5 text-[#C5A059] mx-auto" />
            <p className="text-[10px] text-[#A0988E] font-light">
              Changes update immediately on the live client storefront.
            </p>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-6 animate-fade-in">
            <div className="flex justify-between items-center pb-4 border-b border-[#2C2C2C]">
              <span className="font-serif text-lg font-bold text-white">
                Admin Navigation
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white hover:bg-[#222]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full px-4 py-3 text-xs uppercase tracking-wider flex items-center justify-between transition-colors border ${
                      isActive
                        ? 'bg-[#C5A059] text-[#121212] font-bold border-[#C5A059]'
                        : 'text-[#A0988E] hover:text-white bg-[#181818] border-[#2C2C2C]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[9px] font-bold bg-amber-500 text-[#121212] rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#2C2C2C] space-y-2">
              <button
                onClick={onNavigateToStore}
                className="w-full py-3 bg-[#262626] text-white text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2"
              >
                <Store className="w-4 h-4 text-[#C5A059]" />
                <span>View Storefront</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-3 bg-red-950/60 text-red-300 border border-red-800 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'overview' && (
            <OverviewModule
              onNavigateTab={handleTabChange}
              onOpenNewAppointment={() => handleTabChange('appointments')}
              onOpenNewService={() => {
                setOpenNewServiceOnLoad(true);
                handleTabChange('services');
              }}
            />
          )}

          {activeTab === 'appointments' && (
            <AppointmentsModule />
          )}

          {activeTab === 'services' && (
            <ServicesModule initialOpenNew={openNewServiceOnLoad} />
          )}

          {activeTab === 'categories' && (
            <CategoriesModule />
          )}

          {activeTab === 'staff' && (
            <StaffModule />
          )}

          {activeTab === 'offers' && (
            <OffersModule />
          )}

          {activeTab === 'gallery' && (
            <GalleryModule />
          )}

          {activeTab === 'reviews' && (
            <ReviewsModule />
          )}

          {activeTab === 'settings' && (
            <SettingsModule />
          )}
        </main>

      </div>

    </div>
  );
};
