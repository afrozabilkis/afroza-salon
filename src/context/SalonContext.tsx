import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Service, 
  ServiceCategory, 
  SpecialOffer, 
  Stylist, 
  Review, 
  GalleryItem, 
  AppointmentRecord,
  BusinessInfo,
  WhatsAppSettings,
  PwaSettings,
  WebsiteSettings
} from '../types';
import { 
  SERVICES as INITIAL_SERVICES, 
  CATEGORIES as INITIAL_CATEGORIES, 
  SPECIAL_OFFERS as INITIAL_OFFERS, 
  STYLISTS as INITIAL_STYLISTS, 
  REVIEWS as INITIAL_REVIEWS, 
  GALLERY_ITEMS as INITIAL_GALLERY, 
  SALON_INFO as INITIAL_SALON_INFO 
} from '../data/salonData';

const STORAGE_KEYS = {
  SERVICES: 'afroza_services_v3',
  CATEGORIES: 'afroza_categories_v3',
  OFFERS: 'afroza_offers_v3',
  STAFF: 'afroza_staff_v3',
  REVIEWS: 'afroza_reviews_v3',
  GALLERY: 'afroza_gallery_v3',
  APPOINTMENTS: 'afroza_appointments_v3',
  BUSINESS_INFO: 'afroza_business_info_v3',
  WHATSAPP_SETTINGS: 'afroza_whatsapp_settings_v3',
  PWA_SETTINGS: 'afroza_pwa_settings_v3',
  WEBSITE_SETTINGS: 'afroza_website_settings_v3',
  ADMIN_AUTH: 'afroza_admin_auth_v3',
};

const DEFAULT_BUSINESS_INFO: BusinessInfo = {
  name: INITIAL_SALON_INFO.name,
  legalName: INITIAL_SALON_INFO.legalName,
  tagline: INITIAL_SALON_INFO.tagline,
  category: INITIAL_SALON_INFO.category,
  address: INITIAL_SALON_INFO.address,
  shortLocation: INITIAL_SALON_INFO.shortLocation,
  phone: INITIAL_SALON_INFO.phone,
  phoneDisplay: INITIAL_SALON_INFO.phoneDisplay,
  whatsapp: INITIAL_SALON_INFO.whatsapp,
  whatsappRaw: INITIAL_SALON_INFO.whatsappRaw,
  email: INITIAL_SALON_INFO.email,
  openingHours: INITIAL_SALON_INFO.openingHours,
  openingHoursFull: INITIAL_SALON_INFO.openingHoursFull,
  rating: INITIAL_SALON_INFO.rating,
  reviewCount: INITIAL_SALON_INFO.reviewCount,
  googleMapsUrl: INITIAL_SALON_INFO.googleMapsUrl,
  mapEmbedUrl: INITIAL_SALON_INFO.mapEmbedUrl,
  valetParking: INITIAL_SALON_INFO.valetParking,
  instagram: INITIAL_SALON_INFO.instagram,
  facebook: 'https://facebook.com/afrozagentssalon',
  tiktok: 'https://tiktok.com/@afrozagentssalon',
  languages: INITIAL_SALON_INFO.languages,
};

const DEFAULT_WHATSAPP_SETTINGS: WhatsAppSettings = {
  whatsappNumber: '+971 56 717 9467',
  whatsappRaw: '971567179467',
  defaultBookingMsg: 'Hello Afroza Gents Salon, I would like to book an appointment.',
  serviceBookingMsg: 'Hello Afroza Gents Salon, I would like to book {serviceName}.',
  contactMsg: 'Hello Afroza Gents Salon, I have an inquiry regarding your services.',
};

const DEFAULT_PWA_SETTINGS: PwaSettings = {
  appName: 'Afroza Gents Salon Dubai',
  shortName: 'Afroza Salon',
  themeColor: '#121212',
  backgroundColor: '#F9F7F2',
  appIcon: '/icon.png',
};

const DEFAULT_WEBSITE_SETTINGS: WebsiteSettings = {
  logoText: 'AFROZA GENTS SALON',
  logoSubtitle: 'International City 2 • Dubai • Premier Barbershop',
  faviconUrl: '/favicon.ico',
  seoTitle: 'Afroza Gents Salon | Luxury Men’s Grooming & Barbershop Dubai',
  metaDescription: 'Dubai’s premier gentlemen’s grooming salon in Warsan 4, International City 2. Executive fades, beard sculpting, Nanoplastia smoothing, charcoal facials, medical pedicures.',
  announcementBarText: 'Shop 8, Al Marsoumy Building, Warsan 4, Dubai • Open Daily 10:00 AM — 12:00 AM (Midnight)',
  footerText: '© 2026 Afroza Gents Salon LLC. All rights reserved. Warsan 4, International City Phase 2, Dubai, UAE.',
};

const DEFAULT_APPOINTMENTS: AppointmentRecord[] = [
  {
    id: 'apt-101',
    customerName: 'Rashid Al Nuaimi',
    customerPhone: '+971 50 892 1144',
    customerWhatsapp: '+971 50 892 1144',
    customerEmail: 'rashid.nuaimi@example.ae',
    serviceId: 'executive-master-haircut',
    serviceName: 'Executive Master Haircut & Thermal Style',
    staffName: 'Master Barber Tariq',
    date: '2026-08-22',
    timeSlot: '04:00 PM',
    guestsCount: 1,
    notes: 'Low skin fade, trim top slightly with shear texture.',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-102',
    customerName: 'Marcus Vance',
    customerPhone: '+971 55 419 7802',
    customerWhatsapp: '+971 55 419 7802',
    customerEmail: 'marcus.vance@example.com',
    serviceId: 'royal-hot-towel-beard',
    serviceName: 'Royal Hot Towel Steamed Beard Sculpting',
    staffName: 'Hamza (Beard Master)',
    date: '2026-08-22',
    timeSlot: '06:00 PM',
    guestsCount: 1,
    notes: 'Sandalwood beard elixir, sharp razor cheek edge.',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'apt-103',
    customerName: 'Zayd Mansoor',
    customerPhone: '+971 52 901 3321',
    customerWhatsapp: '+971 52 901 3321',
    serviceId: 'charcoal-deep-detox-facial',
    serviceName: 'Charcoal Deep Detox & Ultrasonic Facial',
    staffName: 'Karim (Skincare Specialist)',
    date: '2026-08-21',
    timeSlot: '02:00 PM',
    guestsCount: 1,
    notes: 'Focus on blackhead extractions and calming cooling mask.',
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'apt-104',
    customerName: 'Fahad Al Qasimi',
    customerPhone: '+971 54 112 9900',
    customerWhatsapp: '+971 54 112 9900',
    serviceId: 'weekend-gentleman-ritual',
    serviceName: 'The Weekend Gentleman Reset (Combo)',
    staffName: 'Master Barber Tariq',
    date: '2026-08-23',
    timeSlot: '07:30 PM',
    guestsCount: 2,
    notes: 'Duo appointment for groom and best man.',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

interface SalonContextType {
  // Services
  services: Service[];
  activeServices: Service[];
  addService: (service: Omit<Service, 'id' | 'slug'> & { slug?: string }) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  duplicateService: (id: string) => void;
  toggleServiceActive: (id: string) => void;

  // Categories
  categories: ServiceCategory[];
  activeCategories: ServiceCategory[];
  addCategory: (category: Omit<ServiceCategory, 'id'> & { id?: string }) => void;
  updateCategory: (id: string, updates: Partial<ServiceCategory>) => void;
  deleteCategory: (id: string) => void;

  // Staff
  staff: Stylist[];
  activeStaff: Stylist[];
  addStaff: (member: Omit<Stylist, 'id'>) => void;
  updateStaff: (id: string, updates: Partial<Stylist>) => void;
  deleteStaff: (id: string) => void;

  // Appointments
  appointments: AppointmentRecord[];
  addAppointment: (appointment: Omit<AppointmentRecord, 'id' | 'createdAt' | 'status'> & { status?: AppointmentRecord['status'] }) => string;
  updateAppointmentStatus: (id: string, status: AppointmentRecord['status']) => void;
  deleteAppointment: (id: string) => void;

  // Gallery
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, updates: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  // Offers
  offers: SpecialOffer[];
  activeOffers: SpecialOffer[];
  addOffer: (offer: Omit<SpecialOffer, 'id' | 'slug'> & { slug?: string }) => void;
  updateOffer: (id: string, updates: Partial<SpecialOffer>) => void;
  deleteOffer: (id: string) => void;

  // Reviews
  reviews: Review[];
  approvedReviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  toggleReviewApproval: (id: string) => void;

  // Settings
  businessInfo: BusinessInfo;
  updateBusinessInfo: (updates: Partial<BusinessInfo>) => void;

  whatsappSettings: WhatsAppSettings;
  updateWhatsappSettings: (updates: Partial<WhatsAppSettings>) => void;
  getWhatsAppUrl: (customMsg?: string, serviceName?: string) => string;

  pwaSettings: PwaSettings;
  updatePwaSettings: (updates: Partial<PwaSettings>) => void;

  websiteSettings: WebsiteSettings;
  updateWebsiteSettings: (updates: Partial<WebsiteSettings>) => void;

  // Format Helper
  formatPriceAED: (price?: number | null) => string;

  // Backup & Restore
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
  factoryReset: () => void;

  // Admin Auth
  isAdminAuthenticated: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item);
  } catch (e) {
    console.error(`Failed to load ${key} from storage:`, e);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to save ${key} to storage:`, e);
  }
}

export const SalonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Services
  const [services, setServices] = useState<Service[]>(() => {
    const stored = loadFromStorage<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    // Ensure all services have active: true and valid priceAED default
    return stored.map((s) => ({
      ...s,
      active: s.active !== false,
      priceAED: typeof s.priceAED === 'number' ? s.priceAED : 0,
    }));
  });

  // Categories
  const [categories, setCategories] = useState<ServiceCategory[]>(() => {
    return loadFromStorage<ServiceCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  });

  // Staff
  const [staff, setStaff] = useState<Stylist[]>(() => {
    return loadFromStorage<Stylist[]>(STORAGE_KEYS.STAFF, INITIAL_STYLISTS);
  });

  // Appointments
  const [appointments, setAppointments] = useState<AppointmentRecord[]>(() => {
    return loadFromStorage<AppointmentRecord[]>(STORAGE_KEYS.APPOINTMENTS, DEFAULT_APPOINTMENTS);
  });

  // Gallery
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    return loadFromStorage<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  });

  // Offers
  const [offers, setOffers] = useState<SpecialOffer[]>(() => {
    return loadFromStorage<SpecialOffer[]>(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    return loadFromStorage<Review[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
  });

  // Business Info
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(() => {
    return loadFromStorage<BusinessInfo>(STORAGE_KEYS.BUSINESS_INFO, DEFAULT_BUSINESS_INFO);
  });

  // WhatsApp Settings
  const [whatsappSettings, setWhatsappSettings] = useState<WhatsAppSettings>(() => {
    return loadFromStorage<WhatsAppSettings>(STORAGE_KEYS.WHATSAPP_SETTINGS, DEFAULT_WHATSAPP_SETTINGS);
  });

  // PWA Settings
  const [pwaSettings, setPwaSettings] = useState<PwaSettings>(() => {
    return loadFromStorage<PwaSettings>(STORAGE_KEYS.PWA_SETTINGS, DEFAULT_PWA_SETTINGS);
  });

  // Website Settings
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings>(() => {
    return loadFromStorage<WebsiteSettings>(STORAGE_KEYS.WEBSITE_SETTINGS, DEFAULT_WEBSITE_SETTINGS);
  });

  // Admin Auth
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  // Save changes to localStorage
  useEffect(() => { saveToStorage(STORAGE_KEYS.SERVICES, services); }, [services]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.CATEGORIES, categories); }, [categories]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.STAFF, staff); }, [staff]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments); }, [appointments]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.GALLERY, gallery); }, [gallery]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.OFFERS, offers); }, [offers]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.REVIEWS, reviews); }, [reviews]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.BUSINESS_INFO, businessInfo); }, [businessInfo]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.WHATSAPP_SETTINGS, whatsappSettings); }, [whatsappSettings]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.PWA_SETTINGS, pwaSettings); }, [pwaSettings]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.WEBSITE_SETTINGS, websiteSettings); }, [websiteSettings]);

  // Derived active lists
  const activeServices = services.filter((s) => s.active !== false);
  const activeCategories = categories.filter((c) => c.active !== false);
  const activeStaff = staff.filter((s) => s.active !== false);
  const activeOffers = offers.filter((o) => o.active !== false);
  const approvedReviews = reviews.filter((r) => r.approved !== false);

  // Price formatter: always "AED {price}" or "AED 0"
  const formatPriceAED = (price?: number | null): string => {
    if (price === undefined || price === null || isNaN(price)) {
      return 'AED 0';
    }
    return `AED ${price}`;
  };

  // WhatsApp link generator
  const getWhatsAppUrl = (customMsg?: string, serviceName?: string): string => {
    const rawNumber = whatsappSettings.whatsappRaw || businessInfo.whatsappRaw || '971567179467';
    let text = customMsg;
    if (!text) {
      if (serviceName) {
        text = whatsappSettings.serviceBookingMsg.replace('{serviceName}', serviceName);
      } else {
        text = whatsappSettings.defaultBookingMsg;
      }
    }
    const encoded = encodeURIComponent(text || `Hello ${businessInfo.name}, I would like to book an appointment.`);
    return `https://wa.me/${rawNumber}?text=${encoded}`;
  };

  // Service Actions
  const addService = (data: Omit<Service, 'id' | 'slug'> & { slug?: string }) => {
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.floor(Math.random() * 1000);
    const newService: Service = {
      ...data,
      id: 'srv-' + Date.now(),
      slug,
      priceAED: typeof data.priceAED === 'number' ? data.priceAED : 0,
      active: data.active !== false,
      featured: !!data.featured,
    };
    setServices((prev) => [newService, ...prev]);
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const duplicateService = (id: string) => {
    const target = services.find((s) => s.id === id);
    if (!target) return;
    const duplicated: Service = {
      ...target,
      id: 'srv-' + Date.now(),
      name: `${target.name} (Copy)`,
      slug: `${target.slug}-copy-${Math.floor(Math.random() * 1000)}`,
    };
    setServices((prev) => [duplicated, ...prev]);
  };

  const toggleServiceActive = (id: string) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, active: s.active === false } : s)));
  };

  // Category Actions
  const addCategory = (data: Omit<ServiceCategory, 'id'> & { id?: string }) => {
    const id = data.id || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat: ServiceCategory = {
      ...data,
      id,
      active: data.active !== false,
    };
    setCategories((prev) => [...prev, newCat]);
  };

  const updateCategory = (id: string, updates: Partial<ServiceCategory>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Staff Actions
  const addStaff = (data: Omit<Stylist, 'id'>) => {
    const newMember: Stylist = {
      ...data,
      id: 'stf-' + Date.now(),
      active: data.active !== false,
    };
    setStaff((prev) => [...prev, newMember]);
  };

  const updateStaff = (id: string, updates: Partial<Stylist>) => {
    setStaff((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  const deleteStaff = (id: string) => {
    setStaff((prev) => prev.filter((m) => m.id !== id));
  };

  // Appointments Actions
  const addAppointment = (data: Omit<AppointmentRecord, 'id' | 'createdAt' | 'status'> & { status?: AppointmentRecord['status'] }): string => {
    const newId = 'apt-' + Date.now();
    const newRecord: AppointmentRecord = {
      ...data,
      id: newId,
      status: data.status || 'pending',
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [newRecord, ...prev]);
    return newId;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentRecord['status']) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  // Gallery Actions
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: 'g-' + Date.now(),
    };
    setGallery((prev) => [newItem, ...prev]);
  };

  const updateGalleryItem = (id: string, updates: Partial<GalleryItem>) => {
    setGallery((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  // Offers Actions
  const addOffer = (data: Omit<SpecialOffer, 'id' | 'slug'> & { slug?: string }) => {
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newOffer: SpecialOffer = {
      ...data,
      id: 'ofr-' + Date.now(),
      slug,
      active: data.active !== false,
    };
    setOffers((prev) => [newOffer, ...prev]);
  };

  const updateOffer = (id: string, updates: Partial<SpecialOffer>) => {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)));
  };

  const deleteOffer = (id: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };

  // Reviews Actions
  const addReview = (data: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...data,
      id: 'rev-' + Date.now(),
      date: 'Just now',
      approved: data.approved !== false,
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const updateReview = (id: string, updates: Partial<Review>) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const toggleReviewApproval = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved: r.approved === false } : r)));
  };

  // Settings Actions
  const updateBusinessInfo = (updates: Partial<BusinessInfo>) => {
    setBusinessInfo((prev) => {
      const next = { ...prev, ...updates };
      // Also update whatsapp settings raw number if whatsapp number changed
      if (updates.whatsappRaw) {
        setWhatsappSettings((w) => ({ ...w, whatsappRaw: updates.whatsappRaw!, whatsappNumber: updates.whatsapp || w.whatsappNumber }));
      }
      return next;
    });
  };

  const updateWhatsappSettings = (updates: Partial<WhatsAppSettings>) => {
    setWhatsappSettings((prev) => ({ ...prev, ...updates }));
  };

  const updatePwaSettings = (updates: Partial<PwaSettings>) => {
    setPwaSettings((prev) => ({ ...prev, ...updates }));
  };

  const updateWebsiteSettings = (updates: Partial<WebsiteSettings>) => {
    setWebsiteSettings((prev) => ({ ...prev, ...updates }));
  };

  // Backup and Restore
  const exportDataJson = (): string => {
    const backup = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      salon: businessInfo.name,
      data: {
        services,
        categories,
        staff,
        appointments,
        gallery,
        offers,
        reviews,
        businessInfo,
        whatsappSettings,
        pwaSettings,
        websiteSettings,
      },
    };
    return JSON.stringify(backup, null, 2);
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      const payload = parsed.data || parsed;
      if (payload.services) setServices(payload.services);
      if (payload.categories) setCategories(payload.categories);
      if (payload.staff) setStaff(payload.staff);
      if (payload.appointments) setAppointments(payload.appointments);
      if (payload.gallery) setGallery(payload.gallery);
      if (payload.offers) setOffers(payload.offers);
      if (payload.reviews) setReviews(payload.reviews);
      if (payload.businessInfo) setBusinessInfo(payload.businessInfo);
      if (payload.whatsappSettings) setWhatsappSettings(payload.whatsappSettings);
      if (payload.pwaSettings) setPwaSettings(payload.pwaSettings);
      if (payload.websiteSettings) setWebsiteSettings(payload.websiteSettings);
      return true;
    } catch (err) {
      console.error('Failed to parse import data:', err);
      return false;
    }
  };

  const factoryReset = () => {
    localStorage.clear();
    setServices(INITIAL_SERVICES.map((s) => ({ ...s, active: true })));
    setCategories(INITIAL_CATEGORIES);
    setStaff(INITIAL_STYLISTS);
    setAppointments(DEFAULT_APPOINTMENTS);
    setGallery(INITIAL_GALLERY);
    setOffers(INITIAL_OFFERS);
    setReviews(INITIAL_REVIEWS);
    setBusinessInfo(DEFAULT_BUSINESS_INFO);
    setWhatsappSettings(DEFAULT_WHATSAPP_SETTINGS);
    setPwaSettings(DEFAULT_PWA_SETTINGS);
    setWebsiteSettings(DEFAULT_WEBSITE_SETTINGS);
  };

  // Admin Auth
  const adminLogin = (password: string): boolean => {
    if (password.trim() === 'salon111') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  return (
    <SalonContext.Provider
      value={{
        services,
        activeServices,
        addService,
        updateService,
        deleteService,
        duplicateService,
        toggleServiceActive,

        categories,
        activeCategories,
        addCategory,
        updateCategory,
        deleteCategory,

        staff,
        activeStaff,
        addStaff,
        updateStaff,
        deleteStaff,

        appointments,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,

        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,

        offers,
        activeOffers,
        addOffer,
        updateOffer,
        deleteOffer,

        reviews,
        approvedReviews,
        addReview,
        updateReview,
        deleteReview,
        toggleReviewApproval,

        businessInfo,
        updateBusinessInfo,

        whatsappSettings,
        updateWhatsappSettings,
        getWhatsAppUrl,

        pwaSettings,
        updatePwaSettings,

        websiteSettings,
        updateWebsiteSettings,

        formatPriceAED,

        exportDataJson,
        importDataJson,
        factoryReset,

        isAdminAuthenticated,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};
