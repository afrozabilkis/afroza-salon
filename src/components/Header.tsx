import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Download, 
  MessageSquare, 
  Menu, 
  X, 
  ChevronRight, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenBooking: (serviceId?: string) => void;
  onOpenPwaInstall: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenBooking,
  onOpenPwaInstall,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Offers', path: '/offers' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Hello, I would like to enquire about an appointment at ${SALON_INFO.name}.`);
    window.open(`https://wa.me/${SALON_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300" id="main-site-header">
      
      {/* Top Announcement Bar */}
      <div className="bg-[#121212] text-[#F9F7F2] py-2 px-4 sm:px-10 text-[10px] tracking-[0.2em] uppercase flex justify-between items-center border-b border-[#2C2C2C] font-sans">
        <span className="hidden sm:inline">
          {SALON_INFO.address} • Open Daily 10:00 AM — 12:00 AM
        </span>
        <span className="sm:hidden text-[9px]">
          Warsan 4, Dubai • Daily 10:00 AM — 12:00 AM
        </span>
        <div className="flex items-center gap-6">
          <button
            onClick={openWhatsApp}
            className="hover:text-[#C5A059] transition-colors cursor-pointer"
            id="top-bar-whatsapp-link"
          >
            WhatsApp: {SALON_INFO.whatsapp}
          </button>
          <button
            onClick={onOpenPwaInstall}
            className="underline underline-offset-4 hover:text-[#C5A059] transition-colors cursor-pointer hidden md:inline"
            id="top-bar-install-link"
          >
            Install App
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 border-b border-[#E5E1DA] ${
          isScrolled
            ? 'bg-[#F9F7F2]/95 backdrop-blur-md shadow-xs py-3'
            : 'bg-[#F9F7F2]/90 backdrop-blur-md py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 flex items-center justify-between gap-4">
          
          {/* Left Nav Links */}
          <div className="hidden xl:flex items-center gap-7 text-[11px] uppercase tracking-widest font-medium text-[#121212]">
            {navLinks.slice(0, 4).map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`hover:text-[#C5A059] transition-colors cursor-pointer ${
                    isActive ? 'text-[#C5A059] font-bold underline underline-offset-8' : ''
                  }`}
                  id={`nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Logo / Brand Name Center */}
          <button
            onClick={() => handleNavClick('/')}
            className="text-center group cursor-pointer focus:outline-none flex flex-col items-center"
            id="header-brand-logo"
          >
            <h1 className="text-xl sm:text-2xl font-serif tracking-[0.15em] font-bold text-[#121212]">
              AFROZA GENTS SALON
            </h1>
            <p className="text-[8px] tracking-[0.4em] uppercase text-[#4A4A4A] opacity-70 -mt-0.5">
              International City 2 • Dubai • Premier Barbershop
            </p>
          </button>

          {/* Right Nav Links & Booking */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="hidden xl:flex items-center gap-7 text-[11px] uppercase tracking-widest font-medium text-[#121212]">
              {navLinks.slice(4).map((link) => {
                const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`hover:text-[#C5A059] transition-colors cursor-pointer ${
                      isActive ? 'text-[#C5A059] font-bold underline underline-offset-8' : ''
                    }`}
                    id={`nav-link-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="bg-[#121212] text-white px-6 py-3 text-[11px] uppercase tracking-widest font-semibold hover:bg-[#C5A059] hover:text-white transition-all shadow-xs cursor-pointer"
              id="header-book-appointment-btn"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={openWhatsApp}
              className="p-2 text-[#121212] bg-[#F4F1EC] border border-[#E5E1DA] hover:text-[#C5A059] transition-colors"
              aria-label="Open WhatsApp"
              id="mobile-whatsapp-quick-btn"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="px-3.5 py-2 bg-[#121212] text-white text-[10px] uppercase tracking-widest font-semibold hover:bg-[#C5A059] transition-colors"
              id="mobile-book-quick-btn"
            >
              Book
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#121212] bg-white border border-[#E5E1DA] focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle-btn"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#F9F7F2] border-b border-[#E5E1DA] shadow-xl p-5 space-y-4 animate-fade-in" id="mobile-menu-drawer">
          <div className="grid grid-cols-2 gap-2 text-[11px] uppercase tracking-widest font-medium">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`p-3 text-left transition-colors flex items-center justify-between border ${
                    isActive
                      ? 'bg-[#121212] text-[#F9F7F2] border-[#121212]'
                      : 'bg-white text-[#121212] hover:bg-[#F4F1EC] border-[#E5E1DA]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#E5E1DA] space-y-2.5">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 bg-[#121212] text-white text-[11px] uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-[#C5A059] transition-all"
            >
              <Calendar className="w-4 h-4 text-[#C5A059]" />
              <span>Book Appointment</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openWhatsApp();
                }}
                className="py-3 bg-white border border-[#E5E1DA] text-[#121212] text-[10px] uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenPwaInstall();
                }}
                className="py-3 bg-white border border-[#E5E1DA] text-[#121212] text-[10px] uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-[#C5A059]" />
                <span>Install App</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
