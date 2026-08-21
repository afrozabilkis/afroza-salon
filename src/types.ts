export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategoryId;
  categoryName: string;
  priceAED: number;
  durationMinutes: number;
  shortDescription: string;
  fullDescription: string;
  featured?: boolean;
  benefits?: string[];
  ritualSteps?: string[];
  productsUsed?: string[];
  image: string;
}

export type ServiceCategoryId = 
  | 'hair-cuts'
  | 'beard-shave'
  | 'hair-treatments'
  | 'facials-skin'
  | 'manicure-pedicure'
  | 'massage-waxing'
  | 'groom-packages';

export interface ServiceCategory {
  id: ServiceCategoryId;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  serviceMentioned?: string;
  isGoogleVerified: boolean;
  avatar?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'hair' | 'beard' | 'treatments' | 'nails' | 'tools' | 'spa' | 'vip' | 'shave' | 'beauty';
  categoryLabel: string;
  image: string;
  caption?: string;
}

export interface SpecialOffer {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  originalPriceAED: number;
  offerPriceAED: number;
  validUntil: string;
  durationMinutes: number;
  inclusions: string[];
  tag: string;
  image: string;
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
  fullName: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
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
  specialty: string;
  experienceYears: number;
  image: string;
}
