import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, MessageSquare, Check, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { SALON_INFO, SERVICES, CATEGORIES } from '../data/salonData';
import { Service } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string | null;
}

const TIME_SLOTS = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Set minimum date to today (YYYY-MM-DD)
  const todayString = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (preselectedServiceId) {
      const s = SERVICES.find((item) => item.id === preselectedServiceId || item.slug === preselectedServiceId);
      if (s) {
        setSelectedService(s);
        setSelectedCategory(s.category);
      }
    } else if (!selectedService && SERVICES.length > 0) {
      setSelectedService(SERVICES[0]);
    }
  }, [preselectedServiceId, isOpen]);

  if (!isOpen) return null;

  const filteredServices = selectedCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter((s) => s.category === selectedCategory);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (phone.replace(/\D/g, '').length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!date) errs.date = 'Please select a preferred date';
    if (!timeSlot) errs.timeSlot = 'Please select a preferred time slot';
    if (!selectedService) errs.service = 'Please select a service';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitted(true);
  };

  const handleWhatsAppBooking = () => {
    const serviceName = selectedService ? selectedService.name : 'Salon Service';
    const message = encodeURIComponent(
      `Hello ${SALON_INFO.name}, I would like to enquire about booking an appointment:\n\n` +
      `• Guest Name: ${fullName || 'Guest'}\n` +
      `• Service: ${serviceName}\n` +
      `• Preferred Date: ${date || 'Earliest Available'}\n` +
      `• Preferred Time: ${timeSlot || 'Flexible'}\n` +
      `• Number of Guests: ${guestsCount}\n` +
      (specialRequests ? `• Special Notes: ${specialRequests}\n` : '') +
      `\nPlease let me know availability. Thank you.`
    );
    window.open(`https://wa.me/${SALON_INFO.whatsappRaw}?text=${message}`, '_blank');
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto" id="booking-modal">
      <div className="relative w-full max-w-2xl bg-[#F9F7F2] border border-[#E5E1DA] shadow-2xl overflow-hidden my-auto text-[#121212]">
        
        {/* Modal Header */}
        <div className="bg-[#121212] text-[#F9F7F2] p-6 sm:p-8 flex items-center justify-between border-b border-[#2C2C2C]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block mb-1">
              Private Concierge Service
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide text-white">
              Reserve Your Atelier Experience
            </h2>
            <p className="text-xs text-[#E5E1DA] font-light mt-1">
              {SALON_INFO.shortLocation} • Daily 10:00 AM – 9:00 PM
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 text-[#E5E1DA] hover:text-white transition-colors bg-white/5 hover:bg-white/10"
            aria-label="Close modal"
            id="close-booking-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 px-4 space-y-6" id="booking-success-state">
              <div className="w-16 h-16 bg-[#121212] text-[#C5A059] border border-[#C5A059]/40 flex items-center justify-center mx-auto shadow-lg">
                <Check className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                  Reservation Received
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#121212]">
                  Thank you, {fullName}
                </h3>
                <p className="text-sm sm:text-base text-[#4A4A4A] font-light max-w-lg mx-auto leading-relaxed">
                  Your appointment request has been received. Our concierge team will contact you shortly to confirm availability.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-white border border-[#E5E1DA] p-5 text-left text-xs sm:text-sm space-y-2.5 max-w-md mx-auto shadow-xs">
                <div className="flex justify-between border-b border-[#E5E1DA] pb-2">
                  <span className="text-[#4A4A4A]">Selected Ritual:</span>
                  <span className="font-serif font-bold text-[#121212]">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#E5E1DA] pb-2">
                  <span className="text-[#4A4A4A]">Investment:</span>
                  <span className="font-bold text-[#121212]">AED {selectedService?.priceAED} ({selectedService?.durationMinutes} min)</span>
                </div>
                <div className="flex justify-between border-b border-[#E5E1DA] pb-2">
                  <span className="text-[#4A4A4A]">Preferred Schedule:</span>
                  <span className="font-medium text-[#121212]">{date} at {timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Contact Phone:</span>
                  <span className="font-medium text-[#121212]">{phone}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleWhatsAppBooking}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#121212] hover:bg-[#C5A059] text-white text-[11px] uppercase tracking-widest font-bold shadow-xs transition-all cursor-pointer"
                  id="whatsapp-confirm-booking-btn"
                >
                  <MessageSquare className="w-4 h-4 text-[#C5A059]" />
                  <span>Instant WhatsApp Confirmation</span>
                </button>
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-4 bg-white border border-[#E5E1DA] hover:bg-[#121212] hover:text-white text-[#121212] text-[11px] uppercase tracking-widest font-bold transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" id="appointment-form">
              
              {/* Step 1: Select Service */}
              <div className="space-y-3">
                <label className="block text-[11px] uppercase tracking-widest text-[#121212] font-bold">
                  1. Select Experience or Treatment
                </label>
                
                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3.5 py-1.5 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all border ${
                      selectedCategory === 'all'
                        ? 'bg-[#121212] text-white border-[#121212]'
                        : 'bg-white text-[#4A4A4A] border-[#E5E1DA] hover:border-[#121212]'
                    }`}
                  >
                    All Services
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-1.5 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all border ${
                        selectedCategory === cat.id
                          ? 'bg-[#121212] text-white border-[#121212]'
                          : 'bg-white text-[#4A4A4A] border-[#E5E1DA] hover:border-[#121212]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Service Selector Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
                  {filteredServices.map((service) => {
                    const isSelected = selectedService?.id === service.id;
                    return (
                      <button
                        type="button"
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={`text-left p-3 border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#121212] bg-[#F4F1EC] shadow-xs'
                            : 'border-[#E5E1DA] bg-white hover:border-[#121212]'
                        }`}
                        id={`select-service-${service.id}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-serif text-sm font-bold text-[#121212] line-clamp-1">
                            {service.name}
                          </span>
                          <span className="text-xs font-bold text-[#C5A059] shrink-0">
                            AED {service.priceAED}
                          </span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-[#4A4A4A] mt-1 line-clamp-1">
                          {service.durationMinutes} min • {service.categoryName}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.service && (
                  <p className="text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.service}
                  </p>
                )}
              </div>

              {/* Step 2: Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#121212] font-bold mb-2">
                    2. Preferred Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={todayString}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-3 bg-white border border-[#E5E1DA] text-xs text-[#121212] focus:outline-none focus:border-[#121212]"
                      id="booking-date-input"
                    />
                  </div>
                  {errors.date && (
                    <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#121212] font-bold mb-2">
                    Preferred Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white border border-[#E5E1DA] text-xs text-[#121212] focus:outline-none focus:border-[#121212]"
                    id="booking-time-select"
                  >
                    <option value="">Select time...</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.timeSlot && (
                    <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.timeSlot}
                    </p>
                  )}
                </div>
              </div>

              {/* Step 3: Client Details */}
              <div className="space-y-4 pt-2 border-t border-[#E5E1DA]">
                <label className="block text-[11px] uppercase tracking-widest text-[#121212] font-bold">
                  3. Client Information
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-3 bg-white border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                      id="booking-fullname-input"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number (+971 50 ...) *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-3 bg-white border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                      id="booking-phone-input"
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="tel"
                      placeholder="WhatsApp (if different)"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-3.5 py-3 bg-white border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                      id="booking-whatsapp-input"
                    />
                  </div>

                  <div>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full px-3.5 py-3 bg-white border border-[#E5E1DA] text-xs text-[#121212] focus:outline-none focus:border-[#121212]"
                      id="booking-guests-select"
                    >
                      <option value={1}>1 Guest (Individual appointment)</option>
                      <option value={2}>2 Guests (Duo Experience)</option>
                      <option value={3}>3 Guests (Group appointment)</option>
                      <option value={4}>4+ Guests (VIP Suite Booking)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Special requests, hair length, therapist preferences, or VIP suite inquiries..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E1DA] text-xs text-[#121212] placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#121212]"
                    id="booking-requests-textarea"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#E5E1DA] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-[#4A4A4A] text-center sm:text-left">
                  <span>Investment: </span>
                  <strong className="text-[#121212] font-bold">AED {selectedService?.priceAED || 0}</strong>
                  <span className="ml-2 text-[10px] text-[#4A4A4A]">({selectedService?.durationMinutes || 0} mins)</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleWhatsAppBooking}
                    className="flex-1 sm:flex-initial px-5 py-3.5 bg-white hover:bg-[#F4F1EC] text-[#121212] text-[10px] uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 border border-[#E5E1DA] cursor-pointer"
                    id="book-direct-whatsapp-btn"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 sm:flex-initial px-7 py-3.5 bg-[#121212] hover:bg-[#C5A059] text-white text-[10px] uppercase tracking-widest font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    id="submit-booking-request-btn"
                  >
                    <span>Request Booking</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
