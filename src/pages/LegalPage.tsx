import React from 'react';
import { ShieldCheck, FileText, ArrowLeft, Clock } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cancellation' | 'cookie';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Data Protection & Client Privacy',
      date: 'Updated January 2025',
      sections: [
        {
          heading: '1. Commitment to Privacy',
          text: `At ${SALON_INFO.name}, protecting the privacy and personal details of our customers is a priority. Any personal data collected—including full names, contact telephone numbers, email addresses, and service preferences—is gathered solely to manage bookings and salon inquiries.`
        },
        {
          heading: '2. Information We Collect',
          text: 'We only collect details voluntarily submitted through our online booking desk, contact forms, or direct WhatsApp inquiries. We never sell, rent, or distribute client contact details to external third parties.'
        },
        {
          heading: '3. Data Security & Storage',
          text: 'All appointment records are stored safely in accordance with UAE data protection standards. You may request deletion of your booking records at any time by contacting our front desk.'
        }
      ]
    },
    terms: {
      title: 'Terms of Service',
      subtitle: 'Salon Guidelines & Standards',
      date: 'Updated January 2025',
      sections: [
        {
          heading: '1. Appointments & Walk-ins',
          text: 'We welcome both online reservations and walk-in guests daily between 10:00 AM and 12:00 AM midnight. For peak evening and weekend slots, we recommend reserving online or via WhatsApp.'
        },
        {
          heading: '2. Pricing & Payments',
          text: 'All prices quoted on our menu are in United Arab Emirates Dirhams (AED) and include 5% UAE VAT. Payment may be settled upon conclusion of your service via Cash, Card (Visa, MasterCard), or Apple Pay.'
        },
        {
          heading: '3. Scalp & Skin Safety',
          text: 'Please inform your barber before service if you have sensitive skin, allergies, or any scalp conditions so we can select the most appropriate soothing balms and gentle formulas.'
        }
      ]
    },
    cancellation: {
      title: 'Cancellation & Rescheduling Policy',
      subtitle: 'Courtesy Notices & Re-booking',
      date: 'Updated January 2025',
      sections: [
        {
          heading: '1. Courtesy Notice',
          text: 'If you need to reschedule or cancel your appointment, a courtesy notice of at least 2 hours is greatly appreciated so we can offer the slot to walk-in guests.'
        },
        {
          heading: '2. How to Reschedule',
          text: `You can easily reschedule or change your service time by calling us at ${SALON_INFO.phoneDisplay} or sending a quick WhatsApp message to ${SALON_INFO.whatsapp}.`
        }
      ]
    },
    cookie: {
      title: 'Cookie & Tracking Policy',
      subtitle: 'Digital Experience & Local Preferences',
      date: 'Updated January 2025',
      sections: [
        {
          heading: '1. Use of Local Storage & Cookies',
          text: `Our web application and PWA utilize minimal essential local storage and standard cookies solely to remember your preferred booking draft and ensure fast page loading.`
        },
        {
          heading: '2. Analytics',
          text: 'We employ standard anonymized metrics to understand popular services and optimize site speed. No personal or payment data is stored in cookies.'
        }
      ]
    }
  }[type];

  return (
    <div className="w-full py-14 sm:py-24 bg-[#F9F7F2] text-[#121212]" id="legal-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Button */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#121212] hover:text-[#C5A059] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
          <span>Back to Home</span>
        </button>

        {/* Header */}
        <div className="space-y-3 border-b border-[#E5E1DA] pb-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
            {content.subtitle}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#121212]">
            {content.title}
          </h1>
          <p className="text-xs text-[#A0988E] font-light">
            {content.date} • {SALON_INFO.name}, Al Marsoumy Building, Warsan 4, Dubai
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 bg-white p-8 sm:p-12 border border-[#E5E1DA] shadow-xs">
          {content.sections.map((sec, i) => (
            <div key={i} className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#121212]">
                {sec.heading}
              </h2>
              <p className="text-sm text-[#4A4A4A] leading-relaxed font-light">
                {sec.text}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center pt-4">
          <p className="text-xs text-[#A0988E] font-light">
            For inquiries regarding our terms, please contact our desk at {SALON_INFO.phoneDisplay}.
          </p>
        </div>

      </div>
    </div>
  );
};
