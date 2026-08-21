import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquare, 
  Download, 
  ArrowUp, 
  ShieldCheck, 
  Star, 
  ExternalLink 
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
  onOpenPwaInstall: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenPwaInstall,
}) => {
  const { businessInfo, activeCategories, getWhatsAppUrl } = useSalon();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const url = getWhatsAppUrl(`Hello ${businessInfo.name}, I would like to enquire about an appointment.`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#121212] text-[#F9F7F2] border-t border-[#2C2C2C] pt-16 pb-12" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#2C2C2C]">
          
          {/* Column 1: Branding & Philosophy (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1E1E1E] text-[#C5A059] border border-[#C5A059]/40 flex items-center justify-center shadow-md">
                <span className="font-serif text-2xl font-bold">A</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-none">
                  {businessInfo.name.toUpperCase()}
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block mt-1">
                  Gents Salon &amp; Barbershop
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E5E1DA] leading-relaxed font-light">
              A premier gentlemen's grooming destination in {businessInfo.shortLocation}, dedicated to executive skin fades, royal hot towel beard sculpting, Nanoplastia smoothing, charcoal detox facials, and luxury hand &amp; foot care.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenPwaInstall}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#1E1E1E] hover:bg-[#2C2C2C] border border-[#333333] text-[10px] uppercase tracking-widest font-bold text-white transition-colors cursor-pointer"
                id="footer-install-app-btn"
              >
                <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Install PWA App</span>
              </button>

              <button
                onClick={openWhatsApp}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#1E1E1E] hover:bg-[#2C2C2C] border border-[#333333] text-[10px] uppercase tracking-widest font-bold text-white transition-colors cursor-pointer"
                id="footer-whatsapp-btn"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
              Salon Pages
            </span>
            <ul className="space-y-2 text-xs text-[#E5E1DA] font-light">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-white transition-colors cursor-pointer">
                  Grooming Menu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/pricing')} className="hover:text-white transition-colors cursor-pointer">
                  Price List
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/gallery')} className="hover:text-white transition-colors cursor-pointer">
                  Visual Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/offers')} className="hover:text-white transition-colors cursor-pointer">
                  Gents Offers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/reviews')} className="hover:text-white transition-colors cursor-pointer">
                  Google Reviews
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-white transition-colors cursor-pointer">
                  Find &amp; Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
              Grooming Rituals
            </span>
            <ul className="space-y-2 text-xs text-[#E5E1DA] font-light">
              {activeCategories.map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => onNavigate('/services')} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
              Contact &amp; Hours
            </span>
            
            <div className="space-y-3 text-xs text-[#E5E1DA] font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>{businessInfo.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Daily: 10:00 AM – {businessInfo.closingTime || '12:00 AM (Midnight)'}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {businessInfo.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {businessInfo.whatsapp}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 bg-[#C5A059] hover:bg-white text-[#121212] text-[11px] uppercase tracking-widest font-bold transition-all shadow-xs cursor-pointer"
                id="footer-book-btn"
              >
                Reserve Appointment
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Legal Links & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#A0988E] font-light">
          
          <div className="flex flex-wrap items-center gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} {businessInfo.name}. All rights reserved.</span>
            <span>•</span>
            <span>{businessInfo.address}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => onNavigate('/privacy-policy')} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('/terms')} className="hover:text-white transition-colors cursor-pointer">
              Terms &amp; Conditions
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('/cancellation-policy')} className="hover:text-white transition-colors cursor-pointer">
              Cancellation Policy
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('/cookie-policy')} className="hover:text-white transition-colors cursor-pointer">
              Cookie Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => onNavigate('/admin')} 
              className="text-[#C5A059] hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-medium"
              id="footer-admin-link"
            >
              <span>Admin Portal</span>
            </button>
            <span>•</span>
            <button onClick={scrollToTop} className="p-1.5 bg-[#1E1E1E] hover:bg-[#2C2C2C] text-[#C5A059] border border-[#333333] cursor-pointer" title="Back to top">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};

