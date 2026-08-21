import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare,
  Car
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';
import { WhatsAppButton } from '../components/WhatsAppButton';

interface BookPageProps {
  initialServiceId?: string;
  onNavigate: (path: string) => void;
}

export const BookPage: React.FC<BookPageProps> = ({ initialServiceId, onNavigate }) => {
  const { activeServices, activeOffers, businessInfo, addAppointment, formatPriceAED, getWhatsAppUrl } = useSalon();

  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || activeServices[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const selectedService = activeServices.find((s) => s.id === selectedServiceId) || 
    activeOffers.find((o) => o.id === selectedServiceId) || 
    activeServices[0];

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', 
    '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM', '08:00 PM', '09:30 PM', '10:30 PM', '11:00 PM'
  ];

  const getServiceName = () => {
    if (!selectedService) return 'Salon Service';
    if ('name' in selectedService) return selectedService.name;
    if ('title' in selectedService) return (selectedService as any).title;
    return 'Salon Service';
  };

  const getServicePrice = () => {
    if (!selectedService) return 'AED 0';
    if ('priceAED' in selectedService) return formatPriceAED((selectedService as any).priceAED);
    if ('offerPriceAED' in selectedService) return formatPriceAED((selectedService as any).offerPriceAED);
    return 'AED 0';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !selectedDate || !selectedService) return;

    addAppointment({
      customerName: fullName,
      customerPhone: phone,
      customerEmail: email,
      serviceId: selectedService.id,
      serviceName: getServiceName(),
      date: selectedDate,
      timeSlot: selectedTime,
      guestsCount: 1,
      notes,
      status: 'pending',
    });

    setIsConfirmed(true);
  };

  const handleWhatsAppInstant = () => {
    const text = 
      `Hello ${businessInfo.name}, I would like to reserve an appointment for:\n` +
      `• Service: ${getServiceName()}\n` +
      `• Date: ${selectedDate || 'Upcoming Date'}\n` +
      `• Time: ${selectedTime}\n` +
      `• Guest Name: ${fullName || 'Guest'}\n` +
      (notes ? `• Notes: ${notes}\n` : '') +
      `Please confirm availability. Thank you!`;
    const url = getWhatsAppUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full py-14 sm:py-24 bg-[#F9F7F2] text-[#121212]" id="book-page">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
            Online Reservation Desk
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#121212] tracking-tight">
            Reserve Your Grooming Appointment
          </h1>
          <p className="text-sm sm:text-base text-[#4A4A4A] font-light leading-relaxed">
            Select your preferred grooming service, barber date, and time slot. No advance pre-payment required.
          </p>
        </div>

        {isConfirmed ? (
          <div className="bg-white p-8 sm:p-14 border border-[#E5E1DA] shadow-xl text-center space-y-6 max-w-2xl mx-auto animate-fade-in">
            <div className="w-16 h-16 bg-[#121212] text-[#C5A059] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block">
                Appointment Registered
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121212]">
                We Look Forward to Seeing You, {fullName}
              </h2>
              <p className="text-sm text-[#4A4A4A] font-light">
                Your appointment request for <strong>{getServiceName()}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> has been received.
              </p>
            </div>

            <div className="bg-[#F9F7F2] p-5 border border-[#E5E1DA] text-xs text-left space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-[#4A4A4A]">Selected Service:</span>
                <span className="font-bold text-[#121212]">{getServiceName()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A4A4A]">Salon Location:</span>
                <span className="font-bold text-[#121212]">{businessInfo.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A4A4A]">Customer Parking:</span>
                <span className="font-bold text-[#C5A059]">{businessInfo.parkingInfo}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <WhatsAppButton
                onClick={handleWhatsAppInstant}
                label="Confirm on WhatsApp"
                size="md"
                id="book-confirm-whatsapp-btn"
              />
              <button
                onClick={() => onNavigate('/')}
                className="px-6 py-3.5 bg-[#121212] hover:bg-[#C5A059] text-white text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer shadow-xs"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Form */}
            <div className="lg:col-span-8 bg-white p-7 sm:p-10 border border-[#E5E1DA] shadow-xs">
              <form onSubmit={handleSubmit} className="space-y-6" id="booking-full-form">
                
                {/* Step 1: Select Service */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-[#121212] uppercase tracking-widest">
                    1. Select Service or Package *
                  </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full px-4 py-3.5 bg-[#F9F7F2] border border-[#E5E1DA] text-xs font-medium text-[#121212] focus:outline-none focus:border-[#121212]"
                  >
                    <optgroup label="Grooming Services">
                      {activeServices.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — {formatPriceAED(s.priceAED)} ({s.durationMinutes} min)
                        </option>
                      ))}
                    </optgroup>
                    {activeOffers.length > 0 && (
                      <optgroup label="Special Offers & Packages">
                        {activeOffers.map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.title} — {formatPriceAED(o.offerPriceAED)} (Special Combo)
                          </option>
                        ))}
                      </optgroup>
                    )}
                  </select>
                </div>

                {/* Step 2: Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-[#121212] uppercase tracking-widest">
                      2. Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs text-[#121212] focus:outline-none focus:border-[#121212]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-[#121212] uppercase tracking-widest">
                      3. Preferred Time Slot *
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs text-[#121212] focus:outline-none focus:border-[#121212]"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Step 3: Guest Details */}
                <div className="space-y-4 pt-2">
                  <span className="block text-[10px] font-bold text-[#121212] uppercase tracking-widest">
                    4. Contact Information
                  </span>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Mobile Phone (+971 56 ...) *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Email Address (Optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      placeholder="Special requests or instructions (e.g. skin fade style, beard trim style, sensitive scalp)..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F9F7F2] border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#121212] hover:bg-[#C5A059] text-white text-[11px] uppercase tracking-widest font-bold transition-all shadow-xs cursor-pointer"
                  id="submit-booking-page-btn"
                >
                  Submit Appointment Request
                </button>
              </form>
            </div>

            {/* Right: Summary Card */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-[#121212] text-white p-7 border border-[#2C2C2C] space-y-6 shadow-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block">
                  Appointment Summary
                </span>

                <div className="space-y-3 border-b border-[#2C2C2C] pb-5">
                  <h3 className="font-serif text-2xl font-bold text-white leading-snug">
                    {getServiceName()}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-[#A0988E] font-light">
                    <span>Duration:</span>
                    <span className="text-white font-medium">{selectedService?.durationMinutes || 45} minutes</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#A0988E] font-light">
                    <span>Rate:</span>
                    <span className="font-serif text-xl font-bold text-[#C5A059]">
                      {getServicePrice()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#A0988E] font-light">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                    <span>No advance deposit required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#C5A059]" />
                    <span>Free Parking in Warsan 4</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C5A059]" />
                    <span>Open Late Daily (10 AM – 12 AM)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <WhatsAppButton
                    onClick={handleWhatsAppInstant}
                    size="md"
                    label="Book via WhatsApp Instead"
                    className="w-full"
                  />
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
