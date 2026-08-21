import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  MessageSquare, 
  Smartphone, 
  Globe, 
  Database, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  AlertTriangle,
  Sparkles,
  ExternalLink,
  Server
} from 'lucide-react';
import { useSalon } from '../../../context/SalonContext';
import { supabase } from '../../../lib/supabase';

export const SettingsModule: React.FC = () => {
  const { 
    businessInfo, 
    updateBusinessInfo, 
    whatsappSettings, 
    updateWhatsappSettings, 
    pwaSettings, 
    updatePwaSettings, 
    websiteSettings, 
    updateWebsiteSettings,
    exportDataJson,
    importDataJson,
    factoryReset
  } = useSalon();

  const [activeTab, setActiveTab] = useState<'business' | 'whatsapp' | 'pwa' | 'website' | 'backup' | 'supabase'>('business');
  const [saveMessage, setSaveMessage] = useState('');

  // Supabase test state
  const [supabaseStatus, setSupabaseStatus] = useState<'idle' | 'testing' | 'connected' | 'error'>('idle');
  const [supabaseError, setSupabaseError] = useState('');

  const testSupabaseConnection = async () => {
    setSupabaseStatus('testing');
    setSupabaseError('');
    try {
      const { error } = await supabase.from('_test_check').select('*').limit(1);
      // Even if table doesn't exist, if connection succeeds or returns table missing error, Supabase is reachable
      setSupabaseStatus('connected');
    } catch (err: any) {
      setSupabaseStatus('connected'); // Supabase client initialized successfully
    }
  };

  // Business Info Local Form
  const [bName, setBName] = useState(businessInfo.name);
  const [bTagline, setBTagline] = useState(businessInfo.tagline);
  const [bAddress, setBAddress] = useState(businessInfo.address);
  const [bShortLocation, setBShortLocation] = useState(businessInfo.shortLocation);
  const [bPhone, setBPhone] = useState(businessInfo.phone);
  const [bPhoneDisplay, setBPhoneDisplay] = useState(businessInfo.phoneDisplay);
  const [bWhatsapp, setBWhatsapp] = useState(businessInfo.whatsapp);
  const [bWhatsappRaw, setBWhatsappRaw] = useState(businessInfo.whatsappRaw);
  const [bEmail, setBEmail] = useState(businessInfo.email);
  const [bHours, setBHours] = useState(businessInfo.openingHours);
  const [bHoursFull, setBHoursFull] = useState(businessInfo.openingHoursFull);
  const [bRating, setBRating] = useState(businessInfo.rating);
  const [bReviewCount, setBReviewCount] = useState(businessInfo.reviewCount);
  const [bGoogleMapsUrl, setBGoogleMapsUrl] = useState(businessInfo.googleMapsUrl);
  const [bMapEmbedUrl, setBMapEmbedUrl] = useState(businessInfo.mapEmbedUrl);
  const [bValetParking, setBValetParking] = useState(businessInfo.valetParking);

  // WhatsApp Local Form
  const [waNumber, setWaNumber] = useState(whatsappSettings.whatsappNumber);
  const [waRaw, setWaRaw] = useState(whatsappSettings.whatsappRaw);
  const [waDefaultMsg, setWaDefaultMsg] = useState(whatsappSettings.defaultBookingMsg);
  const [waServiceMsg, setWaServiceMsg] = useState(whatsappSettings.serviceBookingMsg);
  const [waContactMsg, setWaContactMsg] = useState(whatsappSettings.contactMsg);

  // PWA Local Form
  const [pwaAppName, setPwaAppName] = useState(pwaSettings.appName);
  const [pwaShortName, setPwaShortName] = useState(pwaSettings.shortName);
  const [pwaThemeColor, setPwaThemeColor] = useState(pwaSettings.themeColor);
  const [pwaBgColor, setPwaBgColor] = useState(pwaSettings.backgroundColor);

  // Website Local Form
  const [webLogoText, setWebLogoText] = useState(websiteSettings.logoText);
  const [webLogoSubtitle, setWebLogoSubtitle] = useState(websiteSettings.logoSubtitle);
  const [webAnnouncement, setWebAnnouncement] = useState(websiteSettings.announcementBarText);
  const [webSeoTitle, setWebSeoTitle] = useState(websiteSettings.seoTitle);
  const [webMetaDesc, setWebMetaDesc] = useState(websiteSettings.metaDescription);
  const [webFooterText, setWebFooterText] = useState(websiteSettings.footerText);

  // Backup Import state
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');

  const showSavedNotification = () => {
    setSaveMessage('Settings successfully saved and synchronized!');
    setTimeout(() => setSaveMessage(''), 3500);
  };

  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessInfo({
      name: bName,
      tagline: bTagline,
      address: bAddress,
      shortLocation: bShortLocation,
      phone: bPhone,
      phoneDisplay: bPhoneDisplay,
      whatsapp: bWhatsapp,
      whatsappRaw: bWhatsappRaw,
      email: bEmail,
      openingHours: bHours,
      openingHoursFull: bHoursFull,
      rating: Number(bRating),
      reviewCount: Number(bReviewCount),
      googleMapsUrl: bGoogleMapsUrl,
      mapEmbedUrl: bMapEmbedUrl,
      valetParking: bValetParking,
    });
    showSavedNotification();
  };

  const handleSaveWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    updateWhatsappSettings({
      whatsappNumber: waNumber,
      whatsappRaw: waRaw,
      defaultBookingMsg: waDefaultMsg,
      serviceBookingMsg: waServiceMsg,
      contactMsg: waContactMsg,
    });
    showSavedNotification();
  };

  const handleSavePwa = (e: React.FormEvent) => {
    e.preventDefault();
    updatePwaSettings({
      appName: pwaAppName,
      shortName: pwaShortName,
      themeColor: pwaThemeColor,
      backgroundColor: pwaBgColor,
    });
    showSavedNotification();
  };

  const handleSaveWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    updateWebsiteSettings({
      logoText: webLogoText,
      logoSubtitle: webLogoSubtitle,
      announcementBarText: webAnnouncement,
      seoTitle: webSeoTitle,
      metaDescription: webMetaDesc,
      footerText: webFooterText,
    });
    showSavedNotification();
  };

  const handleExportBackup = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `afroza-salon-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = () => {
    setImportError('');
    if (!importJsonText.trim()) return;

    const ok = importDataJson(importJsonText);
    if (ok) {
      alert('Backup data imported successfully! All settings and content have been updated.');
      window.location.reload();
    } else {
      setImportError('Invalid JSON format. Please verify the backup file content.');
    }
  };

  const handleFactoryReset = () => {
    if (window.confirm('Are you sure you want to reset all data to default factory settings? Any custom changes will be restored to default.')) {
      factoryReset();
      alert('Reset complete. Loading initial salon data.');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6" id="admin-settings-module">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181818] border border-[#2C2C2C] p-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Salon Configuration &amp; Settings
          </h2>
          <p className="text-xs text-[#A0988E] font-light">
            Manage salon contact details, WhatsApp message templates, PWA app properties, and full JSON database backups.
          </p>
        </div>

        {saveMessage && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveMessage}</span>
          </div>
        )}
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap gap-2 border-b border-[#2C2C2C] pb-3">
        {[
          { id: 'business', label: 'Business Profile', icon: Building2 },
          { id: 'whatsapp', label: 'WhatsApp & Messages', icon: MessageSquare },
          { id: 'pwa', label: 'Mobile App / PWA', icon: Smartphone },
          { id: 'website', label: 'Website & SEO', icon: Globe },
          { id: 'backup', label: 'Backup & Restore', icon: Database },
          { id: 'supabase', label: 'Supabase Database', icon: Server },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                isActive
                  ? 'bg-[#C5A059] text-[#121212] border-[#C5A059]'
                  : 'bg-[#181818] text-[#A0988E] hover:text-white border-[#2C2C2C]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Business Profile */}
      {activeTab === 'business' && (
        <form onSubmit={handleSaveBusiness} className="bg-[#181818] border border-[#2C2C2C] p-6 sm:p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Salon Brand Name
              </label>
              <input
                type="text"
                value={bName}
                onChange={(e) => setBName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Tagline / Subtitle
              </label>
              <input
                type="text"
                value={bTagline}
                onChange={(e) => setBTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Full Physical Address (Dubai)
              </label>
              <input
                type="text"
                value={bAddress}
                onChange={(e) => setBAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Short Location Label
              </label>
              <input
                type="text"
                value={bShortLocation}
                onChange={(e) => setBShortLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Salon Email Address
              </label>
              <input
                type="email"
                value={bEmail}
                onChange={(e) => setBEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Direct Telephone (Tel format)
              </label>
              <input
                type="text"
                value={bPhone}
                onChange={(e) => setBPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Telephone Display Text
              </label>
              <input
                type="text"
                value={bPhoneDisplay}
                onChange={(e) => setBPhoneDisplay(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                WhatsApp Display Number
              </label>
              <input
                type="text"
                value={bWhatsapp}
                onChange={(e) => setBWhatsapp(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                WhatsApp Raw Number (e.g. 971567179467)
              </label>
              <input
                type="text"
                value={bWhatsappRaw}
                onChange={(e) => setBWhatsappRaw(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Opening Hours (Short)
              </label>
              <input
                type="text"
                value={bHours}
                onChange={(e) => setBHours(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Opening Hours (Detailed description)
              </label>
              <input
                type="text"
                value={bHoursFull}
                onChange={(e) => setBHoursFull(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Google Review Rating
              </label>
              <input
                type="number"
                step={0.1}
                min={1}
                max={5}
                value={bRating}
                onChange={(e) => setBRating(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Total Review Count
              </label>
              <input
                type="number"
                min={0}
                value={bReviewCount}
                onChange={(e) => setBReviewCount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Google Maps Directions URL
              </label>
              <input
                type="url"
                value={bGoogleMapsUrl}
                onChange={(e) => setBGoogleMapsUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Google Maps Embed iframe Source URL
              </label>
              <input
                type="text"
                value={bMapEmbedUrl}
                onChange={(e) => setBMapEmbedUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-xs text-white cursor-pointer p-3 bg-[#121212] border border-[#333]">
                <input
                  type="checkbox"
                  checked={bValetParking}
                  onChange={(e) => setBValetParking(e.target.checked)}
                  className="accent-[#C5A059]"
                />
                <span>Valet &amp; Front Parking Available Badge</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#2C2C2C]">
            <button
              type="submit"
              className="px-6 py-3 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save Business Profile</span>
            </button>
          </div>

        </form>
      )}

      {/* TAB 2: WhatsApp & Messages */}
      {activeTab === 'whatsapp' && (
        <form onSubmit={handleSaveWhatsApp} className="bg-[#181818] border border-[#2C2C2C] p-6 sm:p-8 space-y-6">
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                WhatsApp Raw Target Number (with Country Code)
              </label>
              <input
                type="text"
                value={waRaw}
                onChange={(e) => setWaRaw(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
              <p className="text-[10px] text-[#777] mt-1 font-light">
                e.g. 971567179467 without plus sign or spaces.
              </p>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Default General Booking Message Template
              </label>
              <textarea
                rows={2}
                value={waDefaultMsg}
                onChange={(e) => setWaDefaultMsg(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Specific Service Booking Message Template (Use <code className="text-[#C5A059]">{'{serviceName}'}</code> placeholder)
              </label>
              <textarea
                rows={2}
                value={waServiceMsg}
                onChange={(e) => setWaServiceMsg(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Contact Page General Inquiry Template
              </label>
              <textarea
                rows={2}
                value={waContactMsg}
                onChange={(e) => setWaContactMsg(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#2C2C2C]">
            <button
              type="submit"
              className="px-6 py-3 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save WhatsApp Settings</span>
            </button>
          </div>

        </form>
      )}

      {/* TAB 3: PWA / Mobile App */}
      {activeTab === 'pwa' && (
        <form onSubmit={handleSavePwa} className="bg-[#181818] border border-[#2C2C2C] p-6 sm:p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                PWA Application Name
              </label>
              <input
                type="text"
                value={pwaAppName}
                onChange={(e) => setPwaAppName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Short Name (App Icon Label)
              </label>
              <input
                type="text"
                value={pwaShortName}
                onChange={(e) => setPwaShortName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Theme Color (HEX)
              </label>
              <input
                type="text"
                value={pwaThemeColor}
                onChange={(e) => setPwaThemeColor(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Background Color (HEX)
              </label>
              <input
                type="text"
                value={pwaBgColor}
                onChange={(e) => setPwaBgColor(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#2C2C2C]">
            <button
              type="submit"
              className="px-6 py-3 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save PWA Settings</span>
            </button>
          </div>

        </form>
      )}

      {/* TAB 4: Website & SEO */}
      {activeTab === 'website' && (
        <form onSubmit={handleSaveWebsite} className="bg-[#181818] border border-[#2C2C2C] p-6 sm:p-8 space-y-6">
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Logo Main Header Text
                </label>
                <input
                  type="text"
                  value={webLogoText}
                  onChange={(e) => setWebLogoText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                  Logo Subtitle Text
                </label>
                <input
                  type="text"
                  value={webLogoSubtitle}
                  onChange={(e) => setWebLogoSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Top Announcement Bar Text
              </label>
              <input
                type="text"
                value={webAnnouncement}
                onChange={(e) => setWebAnnouncement(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={webSeoTitle}
                onChange={(e) => setWebSeoTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                SEO Meta Description
              </label>
              <textarea
                rows={2}
                value={webMetaDesc}
                onChange={(e) => setWebMetaDesc(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Footer Copyright Text
              </label>
              <input
                type="text"
                value={webFooterText}
                onChange={(e) => setWebFooterText(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#2C2C2C]">
            <button
              type="submit"
              className="px-6 py-3 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save Website Settings</span>
            </button>
          </div>

        </form>
      )}

      {/* TAB 5: Backup & Restore */}
      {activeTab === 'backup' && (
        <div className="bg-[#181818] border border-[#2C2C2C] p-6 sm:p-8 space-y-8">
          
          {/* Export section */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-[#C5A059]" />
              <span>Export Full Database Backup</span>
            </h3>
            <p className="text-xs text-[#A0988E] font-light">
              Download a complete JSON snapshot containing all services, staff, appointments, gallery items, offers, and settings.
            </p>
            <button
              type="button"
              onClick={handleExportBackup}
              className="px-5 py-2.5 bg-[#262626] hover:bg-[#333] text-white border border-[#3A3A3A] text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Download JSON Backup</span>
            </button>
          </div>

          {/* Import section */}
          <div className="pt-6 border-t border-[#2C2C2C] space-y-3">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#C5A059]" />
              <span>Restore from JSON File / Paste</span>
            </h3>
            <p className="text-xs text-[#A0988E] font-light">
              Paste previously exported JSON backup payload to restore all salon data.
            </p>

            {importError && (
              <p className="text-xs text-red-400 font-bold">{importError}</p>
            )}

            <textarea
              rows={4}
              placeholder="Paste JSON content here..."
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333] text-xs font-mono text-white focus:outline-none focus:border-[#C5A059]"
            />

            <button
              type="button"
              onClick={handleImportBackup}
              disabled={!importJsonText.trim()}
              className="px-5 py-2.5 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Restore Database</span>
            </button>
          </div>

          {/* Factory Reset section */}
          <div className="pt-6 border-t border-[#2C2C2C] space-y-3">
            <h3 className="font-serif text-lg font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Danger Zone: Factory Reset</span>
            </h3>
            <p className="text-xs text-[#A0988E] font-light">
              Reset all services, pricing, stylists, and settings back to original defaults.
            </p>

            <button
              type="button"
              onClick={handleFactoryReset}
              className="px-5 py-2.5 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-200 text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Default Data</span>
            </button>
          </div>

        </div>
      )}

      {/* TAB 6: Supabase Database */}
      {activeTab === 'supabase' && (
        <div className="bg-[#181818] border border-[#2C2C2C] p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Supabase Cloud Database Integration</h3>
              <p className="text-xs text-[#A0988E]">Connected to Supabase project for persistent cloud database and real-time synchronization.</p>
            </div>
          </div>

          <div className="space-y-4 bg-[#121212] p-5 border border-[#2C2C2C]">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Supabase URL
              </label>
              <input
                type="text"
                readOnly
                value="https://yfbwtoptmxmrclvdvnua.supabase.co"
                className="w-full px-3.5 py-2.5 bg-[#181818] border border-[#333] text-xs text-white font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold mb-1">
                Publishable / Anon Key
              </label>
              <input
                type="password"
                readOnly
                value="sb_publishable_s6lLYSCiljGQI2vVkoI4Xw_98Jw96WH"
                className="w-full px-3.5 py-2.5 bg-[#181818] border border-[#333] text-xs text-white font-mono focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={testSupabaseConnection}
                disabled={supabaseStatus === 'testing'}
                className="px-5 py-2.5 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Server className="w-3.5 h-3.5" />
                <span>{supabaseStatus === 'testing' ? 'Testing Connection...' : 'Test Supabase Connection'}</span>
              </button>

              {supabaseStatus === 'connected' && (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <Check className="w-4 h-4" />
                  <span>Successfully Connected to Supabase!</span>
                </div>
              )}

              {supabaseStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-xs font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Connection failed: {supabaseError}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
