import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageSquare, ExternalLink, Send, CheckCircle2, Car, ShieldCheck } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const LocationSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setIsSent(true);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(`Hello ${SALON_INFO.name}, I am contacting you regarding an enquiry.`);
    window.open(`https://wa.me/${SALON_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  const handleGetDirections = () => {
    window.open(SALON_INFO.googleMapsUrl, '_blank');
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F4F1EC] text-[#121212] border-b border-[#E5E1DA]" id="location-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
            Barbershop Destination
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#121212]">
            Visit Us in International City 2, Dubai
          </h2>
          <p className="text-sm text-[#4A4A4A] font-light leading-relaxed">
            Conveniently situated on the Ground Floor of Al Marsoumy Building (43 Street) in Warsan 4, with dedicated free customer parking right outside.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Business Details & Map */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Address */}
              <div className="bg-white p-6 border border-[#E5E1DA] space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-[#C5A059] text-[10px] uppercase tracking-widest font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Salon Address</span>
                </div>
                <p className="text-sm text-[#121212] font-serif font-bold">
                  {SALON_INFO.address}
                </p>
                <p className="text-xs text-[#4A4A4A] flex items-center gap-1.5 pt-1 font-light">
                  <Car className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Ample Parking in Front of Al Marsoumy Building</span>
                </p>
              </div>

              {/* Card 2: Hours */}
              <div className="bg-white p-6 border border-[#E5E1DA] space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-[#C5A059] text-[10px] uppercase tracking-widest font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Salon Hours</span>
                </div>
                <p className="text-sm text-[#121212] font-serif font-bold">
                  Monday – Sunday: 10:00 AM – 12:00 AM
                </p>
                <p className="text-xs text-[#4A4A4A] pt-1 font-light">
                  Open 7 Days a Week • Appointments &amp; Walk-ins
                </p>
              </div>

            </div>

            {/* Quick Action Bar */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleGetDirections}
                className="flex-1 sm:flex-initial px-6 py-3.5 bg-[#121212] hover:bg-[#C5A059] text-white text-[11px] uppercase tracking-widest font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                id="location-directions-btn"
              >
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>Get Directions</span>
              </button>

              <a
                href={`tel:${SALON_INFO.phone.replace(/\s+/g, '')}`}
                className="flex-1 sm:flex-initial px-6 py-3.5 bg-white hover:bg-[#121212] hover:text-white text-[#121212] text-[11px] uppercase tracking-widest font-bold border border-[#E5E1DA] transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="location-call-btn"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>Call Now</span>
              </a>

              <button
                onClick={handleOpenWhatsApp}
                className="flex-1 sm:flex-initial px-6 py-3.5 bg-white hover:bg-[#121212] hover:text-white text-[#121212] text-[11px] uppercase tracking-widest font-bold border border-[#E5E1DA] transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="location-whatsapp-btn"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Interactive Map Embed */}
            <div className="overflow-hidden border border-[#E5E1DA] shadow-xs h-72 sm:h-80 bg-white relative">
              <iframe
                title="Afroza Gents Salon Dubai Location Map"
                src={SALON_INFO.mapEmbedUrl}
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
                <span className="font-serif">{SALON_INFO.name} • Warsan 4</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact & Concierge Message Form */}
          <div className="lg:col-span-5 bg-white p-7 sm:p-9 border border-[#E5E1DA] shadow-xs">
            
            <div className="space-y-2 mb-6">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
                Direct Inquiries
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212]">
                Message Our Front Desk
              </h3>
              <p className="text-xs text-[#4A4A4A] leading-relaxed font-light">
                Have a question regarding haircuts, beard styling, keratin smoothing, or grooming packages? Send us a message and our team will assist you immediately.
              </p>
            </div>

            {isSent ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-12 h-12 bg-[#121212] text-[#C5A059] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#121212]">
                  Message Dispatched
                </h4>
                <p className="text-xs text-[#4A4A4A] max-w-xs mx-auto font-light">
                  Thank you, {name}. Our guest relations team will contact you shortly via phone or email.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="text-xs uppercase tracking-wider text-[#C5A059] underline font-bold cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" id="contact-enquiry-form">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                    id="contact-name-input"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                    id="contact-email-input"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number (+971 50 ...)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                    id="contact-phone-input"
                  />
                </div>

                <div>
                  <textarea
                    rows={4}
                    required
                    placeholder="How may our concierge assist you today? *"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                    id="contact-message-textarea"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#121212] hover:bg-[#C5A059] text-white text-[11px] uppercase tracking-widest font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  id="submit-enquiry-btn"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
