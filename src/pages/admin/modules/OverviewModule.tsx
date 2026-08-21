import React from 'react';
import { 
  Scissors, 
  Users, 
  Calendar, 
  Clock, 
  Star, 
  Tag, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { useSalon } from '../../../context/SalonContext';

interface OverviewModuleProps {
  onNavigateTab: (tab: string) => void;
  onOpenNewAppointment: () => void;
  onOpenNewService: () => void;
}

export const OverviewModule: React.FC<OverviewModuleProps> = ({
  onNavigateTab,
  onOpenNewAppointment,
  onOpenNewService,
}) => {
  const { 
    services, 
    activeServices, 
    staff, 
    activeStaff, 
    appointments, 
    offers, 
    activeOffers,
    reviews, 
    businessInfo, 
    formatPriceAED,
    getWhatsAppUrl,
    updateAppointmentStatus
  } = useSalon();

  const pendingAppointments = appointments.filter((a) => a.status === 'pending');
  const confirmedAppointments = appointments.filter((a) => a.status === 'confirmed');

  const handleWhatsAppCustomer = (phone: string, customerName: string, serviceName?: string) => {
    const raw = phone.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(`Hello ${customerName}, this is ${businessInfo.name}. Regarding your appointment request for ${serviceName || 'grooming service'}:`);
    window.open(`https://wa.me/${raw}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8" id="admin-overview-module">
      
      {/* Welcome Banner */}
      <div className="bg-[#181818] border border-[#2C2C2C] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
            Executive Salon Overview
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Welcome to {businessInfo.name} Management
          </h2>
          <p className="text-xs text-[#A0988E] font-light">
            Warsan 4, International City 2 Branch • All changes are synchronized live with the storefront.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onOpenNewAppointment}
            className="px-4 py-2.5 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            id="overview-add-apt-btn"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Booking</span>
          </button>
          
          <button
            onClick={onOpenNewService}
            className="px-4 py-2.5 bg-[#262626] hover:bg-[#333] text-white border border-[#3A3A3A] text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            id="overview-add-srv-btn"
          >
            <Scissors className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Appointments */}
        <div 
          onClick={() => onNavigateTab('appointments')}
          className="bg-[#181818] border border-[#2C2C2C] p-5 hover:border-[#C5A059]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#A0988E] font-bold">Appointments</span>
            <Calendar className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-white group-hover:text-[#C5A059] transition-colors">
              {appointments.length}
            </span>
            {pendingAppointments.length > 0 && (
              <span className="px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {pendingAppointments.length} Pending
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#777] mt-1 font-light">
            {confirmedAppointments.length} confirmed bookings
          </p>
        </div>

        {/* Active Services */}
        <div 
          onClick={() => onNavigateTab('services')}
          className="bg-[#181818] border border-[#2C2C2C] p-5 hover:border-[#C5A059]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#A0988E] font-bold">Active Services</span>
            <Scissors className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-white group-hover:text-[#C5A059] transition-colors">
              {activeServices.length}
            </span>
            <span className="text-xs text-[#777]">of {services.length} total</span>
          </div>
          <p className="text-[11px] text-[#777] mt-1 font-light">
            Across 6 grooming categories
          </p>
        </div>

        {/* Master Stylists */}
        <div 
          onClick={() => onNavigateTab('staff')}
          className="bg-[#181818] border border-[#2C2C2C] p-5 hover:border-[#C5A059]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#A0988E] font-bold">Barbers &amp; Team</span>
            <Users className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-white group-hover:text-[#C5A059] transition-colors">
              {activeStaff.length}
            </span>
            <span className="text-xs text-[#777]">active</span>
          </div>
          <p className="text-[11px] text-[#777] mt-1 font-light">
            Master Faders &amp; Skincare Experts
          </p>
        </div>

        {/* Google Rating & Reviews */}
        <div 
          onClick={() => onNavigateTab('reviews')}
          className="bg-[#181818] border border-[#2C2C2C] p-5 hover:border-[#C5A059]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#A0988E] font-bold">Google Reviews</span>
            <Star className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-white group-hover:text-[#C5A059] transition-colors">
              {businessInfo.rating}
            </span>
            <span className="text-xs text-[#777]">★ rating</span>
          </div>
          <p className="text-[11px] text-[#777] mt-1 font-light">
            {businessInfo.reviewCount} total customer reviews
          </p>
        </div>

      </div>

      {/* Recent Inquiries and Action Table */}
      <div className="bg-[#181818] border border-[#2C2C2C] p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-white">
              Recent Booking Inquiries &amp; Appointments
            </h3>
            <p className="text-xs text-[#A0988E] font-light">
              Respond to incoming client bookings via WhatsApp or update reservation status.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('appointments')}
            className="text-xs text-[#C5A059] hover:underline font-bold uppercase tracking-wider cursor-pointer"
          >
            View All ({appointments.length}) &rarr;
          </button>
        </div>

        {appointments.length === 0 ? (
          <div className="py-10 text-center text-xs text-[#777]">
            No appointments booked yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#E5E1DA]">
              <thead className="text-[10px] uppercase tracking-widest text-[#777] bg-[#121212] border-b border-[#2C2C2C]">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Date &amp; Time</th>
                  <th className="py-3 px-4">Barber</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2C2C2C]">
                {(appointments || []).slice(0, 5).map((apt) => (
                  <tr key={apt.id} className="hover:bg-[#1E1E1E]/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{apt.customerName}</div>
                      <div className="text-[11px] text-[#A0988E]">{apt.customerPhone}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#C5A059]">
                      {apt.serviceName}
                    </td>
                    <td className="py-3.5 px-4">
                      <div>{apt.date}</div>
                      <div className="text-[11px] text-[#A0988E]">{apt.timeSlot}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#A0988E]">
                      {apt.staffName || 'Any Barber'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 text-[9px] uppercase tracking-widest font-bold border ${
                        apt.status === 'confirmed'
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                          : apt.status === 'pending'
                          ? 'bg-amber-950/60 text-amber-300 border-amber-800'
                          : apt.status === 'completed'
                          ? 'bg-blue-950/60 text-blue-300 border-blue-800'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {apt.status === 'pending' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                            className="p-1.5 bg-emerald-900/50 hover:bg-emerald-800 text-emerald-300 border border-emerald-700 transition-colors cursor-pointer"
                            title="Confirm Booking"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleWhatsAppCustomer(apt.customerPhone, apt.customerName, apt.serviceName)}
                          className="p-1.5 bg-emerald-700 hover:bg-emerald-600 text-white transition-colors cursor-pointer"
                          title="WhatsApp Customer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
