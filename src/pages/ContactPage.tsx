import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageSquare, ExternalLink, Send, CheckCircle2, Car, ShieldCheck } from 'lucide-react';
import { useSalon } from '../context/SalonContext';

export const ContactPage: React.FC = () => {
  const { businessInfo, getWhatsAppUrl } = useSalon();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Haircut & Beard Booking');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setIsSent(true);
  };

  const handleWhatsApp = () => {
    const url = getWhatsAppUrl(`Hello ${businessInfo.name}, I am contacting you from your website contact page.`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleGoogleMaps = () => {
    window.open(businessInfo.googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full py-14 sm:py-24 bg-[#F9F7F2] text-[#121212]" id="contact-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
            Barbershop Destination &amp; Inquiries
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#121212] tracking-tight">
            Connect With {businessInfo.name}
          </h1>
          <p className="text-sm sm:text-base text-[#4A4A4A] font-light leading-relaxed">
            Conveniently situated in {businessInfo.shortLocation}. We are open 7 days a week from 10:00 AM until {businessInfo.closingTime || '12:00 AM midnight'} with dedicated parking right in front of Al Marsoumy Building.
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Quick Contact Cards & Map */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Info Cards */}
            <div className="space-y-4">
              
              <div className="bg-white p-6 border border-[#E5E1DA] space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-[#C5A059] text-[10px] uppercase tracking-widest font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>Salon Address</span>
                </div>
                <p className="text-sm sm:text-base text-[#121212] font-serif font-bold">
                  {businessInfo.address}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-[#4A4A4A] font-light">
                  <span className="flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#C5A059]" /> Ample Free Customer Parking
                  </span>
                  <button
                    onClick={handleGoogleMaps}
                    className="text-[#C5A059] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 border border-[#E5E1DA] space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 text-[#C5A059] text-[10px] uppercase tracking-widest font-bold">
                    <Clock className="w-4 h-4" />
                    <span>Operating Hours</span>
                  </div>
                  <p className="text-sm text-[#121212] font-serif font-bold">
                    Monday – Sunday
                  </p>
                  <p className="text-xs text-[#4A4A4A] font-light">
                    10:00 AM – {businessInfo.closingTime || '12:00 AM (Midnight)'}
                  </p>
                </div>

                <div className="bg-white p-6 border border-[#E5E1DA] space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 text-[#C5A059] text-[10px] uppercase tracking-widest font-bold">
                    <Phone className="w-4 h-4" />
                    <span>Direct Telephone</span>
                  </div>
                  <p className="text-sm text-[#121212] font-serif font-bold">
                    <a href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`} className="hover:text-[#C5A059] transition-colors">
                      {businessInfo.phoneDisplay}
                    </a>
                  </p>
                  <p className="text-xs text-[#4A4A4A] font-light">
                    WhatsApp: {businessInfo.whatsapp}
                  </p>
                </div>
              </div>

            </div>

            {/* Map Preview */}
            <div className="border border-[#E5E1DA] shadow-xs h-80 bg-white overflow-hidden relative">
              <iframe
                title="Afroza Gents Salon Dubai Location Map"
                src={businessInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute top-3 left-3 bg-[#121212]/90 backdrop-blur-md text-white px-3 py-1.5 text-xs flex items-center gap-2 border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="font-serif font-bold">{businessInfo.name} • Warsan 4</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6 bg-white p-8 sm:p-10 border border-[#E5E1DA] shadow-xs">
            
            <div className="space-y-2 mb-6">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
                Direct Contact Form
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212]">
                Send an Inquiry to Afroza Barbers
              </h2>
              <p className="text-xs text-[#4A4A4A] font-light">
                Fill in the details below and our team will get in touch with you right away.
              </p>
            </div>

            {isSent ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-[#121212] text-[#C5A059] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#121212]">
                  Message Dispatched Successfully
                </h3>
                <p className="text-xs text-[#4A4A4A] max-w-sm mx-auto font-light">
                  Thank you, {name}. We have received your inquiry regarding &ldquo;{subject}&rdquo; and will contact you promptly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="text-xs uppercase tracking-wider text-[#C5A059] underline font-bold cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" id="contact-full-page-form">
                <div>
                  <label className="block text-[10px] font-bold text-[#121212] mb-1.5 uppercase tracking-widest">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Al Mansoori"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#121212] mb-1.5 uppercase tracking-widest">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#121212] mb-1.5 uppercase tracking-widest">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 56 717 9467"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#121212] mb-1.5 uppercase tracking-widest">
                    Inquiry Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs uppercase tracking-wider text-[#121212] font-medium focus:outline-none focus:border-[#121212]"
                  >
                    <option value="Haircut & Beard Booking">Haircut &amp; Beard Booking</option>
                    <option value="Royal Groom / Wedding Package">Royal Groom / Wedding Package</option>
                    <option value="Nanoplastia & Keratin Smoothing">Nanoplastia &amp; Keratin Smoothing</option>
                    <option value="Charcoal Detox Facial & Skincare">Charcoal Detox Facial &amp; Skincare</option>
                    <option value="Medical Foot Pedicure & Manicure">Medical Foot Pedicure &amp; Manicure</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#121212] mb-1.5 uppercase tracking-widest">
                    Message Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please specify desired services, preferred date & time, or any questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#121212] hover:bg-[#C5A059] text-white text-[11px] uppercase tracking-widest font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

