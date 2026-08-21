import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Plus, 
  User, 
  Phone, 
  Mail, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { useSalon } from '../../../context/SalonContext';
import { AppointmentRecord } from '../../../types';

export const AppointmentsModule: React.FC = () => {
  const { 
    appointments, 
    addAppointment, 
    updateAppointmentStatus, 
    deleteAppointment,
    services,
    staff,
    businessInfo 
  } = useSalon();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New Appointment Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [serviceId, setServiceId] = useState(services[0]?.id || '');
  const [staffName, setStaffName] = useState('Any Barber');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('04:00 PM');
  const [notes, setNotes] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    const matchesSearch = 
      apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.customerPhone.includes(searchQuery) ||
      apt.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (apt.notes && apt.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const selectedService = services.find((s) => s.id === serviceId);

    addAppointment({
      customerName,
      customerPhone,
      customerEmail: customerEmail || undefined,
      serviceId,
      serviceName: selectedService ? selectedService.name : 'Custom Grooming',
      staffName: staffName === 'Any Barber' ? undefined : staffName,
      date,
      timeSlot,
      notes: notes || undefined,
      guestsCount,
      status: 'confirmed',
    });

    // Reset & Close
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setNotes('');
    setIsNewModalOpen(false);
  };

  const handleWhatsApp = (apt: AppointmentRecord) => {
    const raw = apt.customerPhone.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Hello ${apt.customerName}, this is ${businessInfo.name} in Warsan 4, Dubai. Regarding your appointment for "${apt.serviceName}" on ${apt.date} at ${apt.timeSlot}:`
    );
    window.open(`https://wa.me/${raw}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6" id="admin-appointments-module">
      
      {/* Header with Search and Create Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181818] border border-[#2C2C2C] p-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Client Appointments &amp; Inquiries
          </h2>
          <p className="text-xs text-[#A0988E] font-light">
            Total {appointments.length} appointment records ({appointments.filter(a => a.status === 'pending').length} pending review)
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="px-4 py-2.5 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-xs"
          id="admin-add-appointment-btn"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Manual Appointment</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#181818] border border-[#2C2C2C] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, phone, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#121212] border border-[#333] text-xs text-white placeholder:text-[#555] focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold whitespace-nowrap transition-colors border cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#C5A059] text-[#121212] border-[#C5A059]'
                  : 'bg-[#121212] text-[#A0988E] hover:text-white border-[#333]'
              }`}
            >
              {st} ({st === 'all' ? appointments.length : appointments.filter(a => a.status === st).length})
            </button>
          ))}
        </div>

      </div>

      {/* Appointments List / Table */}
      <div className="bg-[#181818] border border-[#2C2C2C] overflow-hidden">
        {filteredAppointments.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#777] space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto text-[#555]" />
            <p>No appointments match the current filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#E5E1DA]">
              <thead className="text-[10px] uppercase tracking-widest text-[#777] bg-[#121212] border-b border-[#2C2C2C]">
                <tr>
                  <th className="py-3.5 px-4">Client Details</th>
                  <th className="py-3.5 px-4">Service &amp; Barber</th>
                  <th className="py-3.5 px-4">Date &amp; Slot</th>
                  <th className="py-3.5 px-4">Special Requests / Notes</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2C2C2C]">
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-[#1E1E1E]/60 transition-colors">
                    
                    {/* Client Details */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-white text-sm">{apt.customerName}</div>
                      <div className="text-[11px] text-[#C5A059] font-mono mt-0.5">{apt.customerPhone}</div>
                      {apt.customerEmail && (
                        <div className="text-[10px] text-[#777]">{apt.customerEmail}</div>
                      )}
                    </td>

                    {/* Service & Barber */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-white">{apt.serviceName}</div>
                      <div className="text-[11px] text-[#A0988E]">
                        Barber: <strong className="text-white">{apt.staffName || 'Any Master Barber'}</strong>
                      </div>
                      {apt.guestsCount > 1 && (
                        <span className="text-[9px] uppercase tracking-wider bg-[#222] text-[#C5A059] px-1.5 py-0.5 border border-[#333] mt-1 inline-block">
                          {apt.guestsCount} Guests
                        </span>
                      )}
                    </td>

                    {/* Date & Slot */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-white">{apt.date}</div>
                      <div className="text-[11px] text-[#C5A059]">{apt.timeSlot}</div>
                    </td>

                    {/* Notes */}
                    <td className="py-4 px-4 max-w-xs">
                      {apt.notes ? (
                        <p className="text-[11px] text-[#A0988E] italic bg-[#121212] p-2 border border-[#2A2A2A]">
                          “{apt.notes}”
                        </p>
                      ) : (
                        <span className="text-[11px] text-[#555]">—</span>
                      )}
                    </td>

                    {/* Status with dropdown / toggle */}
                    <td className="py-4 px-4">
                      <select
                        value={apt.status}
                        onChange={(e) => updateAppointmentStatus(apt.id, e.target.value as any)}
                        className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 border bg-[#121212] cursor-pointer focus:outline-none ${
                          apt.status === 'confirmed'
                            ? 'text-emerald-300 border-emerald-700'
                            : apt.status === 'pending'
                            ? 'text-amber-300 border-amber-700'
                            : apt.status === 'completed'
                            ? 'text-blue-300 border-blue-700'
                            : 'text-zinc-400 border-zinc-700'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleWhatsApp(apt)}
                          className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] uppercase tracking-wider font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          title="WhatsApp Client"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>Chat</span>
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete appointment for ${apt.customerName}?`)) {
                              deleteAppointment(apt.id);
                            }
                          }}
                          className="p-1.5 text-[#777] hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Manual Appointment Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#2C2C2C] max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center pb-3 border-b border-[#2C2C2C]">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                  Internal Reservation
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  Add Manual Appointment
                </h3>
              </div>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="text-[#777] hover:text-white p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Al Mansoori"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 ..."
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="client@email.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Service Selection *
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                >
                  {services.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.name} — AED {srv.priceAED || 0}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Preferred Barber
                  </label>
                  <select
                    value={staffName}
                    onChange={(e) => setStaffName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Any Barber">Any Master Barber</option>
                    {staff.map((st) => (
                      <option key={st.id} value={st.name}>
                        {st.name} ({st.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Guests Count
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                    Time Slot *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 05:30 PM"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Internal Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Special instructions, styling preferences..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#2C2C2C]">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2.5 bg-[#222] hover:bg-[#333] text-white text-xs uppercase tracking-widest font-bold cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold cursor-pointer shadow-xs"
                >
                  Confirm &amp; Save
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
