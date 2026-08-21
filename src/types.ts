export interface Service {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryName?: string;
  priceAED: number;
  discountPriceAED?: number;
  duration?: number;
  durationMinutes?: number;
  description?: string;
  shortDescription?: string;
  fullDescription?: string;
  featured?: boolean;
  popular?: boolean;
  active?: boolean;
  order?: number;
  sortOrder?: number;
  included?: string[];
  benefits?: string[];
  ritualSteps?: string[];
  productsUsed?: string[];
  image?: string;
}

export type ServiceCategoryId = string;

export interface ServiceCategory {
  id: string;
  name: string;
  tagline?: string;
  description?: string;
  image?: string;
  active?: boolean;
  order?: number;
  sortOrder?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text?: string;
  comment?: string;
  service?: string;
  serviceMentioned?: string;
  isGoogleVerified?: boolean;
  verified?: boolean;
  avatar?: string;
  approved?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  caption?: string;
  active?: boolean;
  featured?: boolean;
  sortOrder?: number;
}

export interface SpecialOffer {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  originalPriceAED: number;
  offerPriceAED?: number;
  priceAED?: number;
  validUntil: string;
  durationMinutes?: number;
  duration?: number;
  inclusions?: string[];
  included?: string[];
  tag?: string;
  discount?: string;
  image?: string;
  active?: boolean;
  featured?: boolean;
}

export interface AppointmentRecord {
  id: string;
  customerName: string;
  customerPhone: string;
  customerWhatsapp?: string;
  customerEmail?: string;
  serviceId: string;
  serviceName: string;
  staffId?: string;
  staffName?: string;
  date: string;
  timeSlot: string;
  guestsCount?: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface AppointmentRequest {
  fullName: string;
  phone: string;
  whatsapp: string;
  email?: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  specialRequests?: string;
}

export interface ContactMessage {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
  createdAt?: string;
  read?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  position?: string;
  specialty?: string;
  specialties?: string[];
  experience?: string;
  experienceYears?: number;
  languages?: string[];
  bio?: string;
  image: string;
  active?: boolean;
  displayOrder?: number;
}

export interface BusinessInfo {
  name: string;
  legalName: string;
  tagline: string;
  category: string;
  address: string;
  shortLocation: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappRaw: string;
  email: string;
  openingHours: string;
  openingHoursFull: { days: string; hours: string }[];
  rating: number;
  reviewCount: number;
  googleMapsUrl: string;
  mapEmbedUrl: string;
  valetParking: string;
  instagram: string;
  facebook?: string;
  tiktok?: string;
  languages: string[];
  closingTime?: string;
}

export interface WhatsAppSettings {
  whatsappNumber: string;
  whatsappRaw: string;
  defaultBookingMsg: string;
  serviceBookingMsg: string;
  contactMsg: string;
}

export interface PwaSettings {
  appName: string;
  shortName: string;
  themeColor: string;
  backgroundColor: string;
  appIcon: string;
}

export interface WebsiteSettings {
  logoText: string;
  logoSubtitle: string;
  faviconUrl: string;
  seoTitle: string;
  metaDescription: string;
  announcementBarText: string;
  footerText: string;
}
