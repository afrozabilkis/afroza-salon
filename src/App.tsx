import React, { useState, useEffect } from 'react';
import { useSalon } from './context/SalonContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PricingPage } from './pages/PricingPage';
import { GalleryPage } from './pages/GalleryPage';
import { OffersPage } from './pages/OffersPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { BookPage } from './pages/BookPage';
import { LegalPage } from './pages/LegalPage';

import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';

export default function App() {
  const { isAdminAuthenticated } = useSalon();

  // Navigation Path state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const p = window.location.pathname || '/';
    return p === '' ? '/' : p;
  });

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [isPwaModalOpen, setIsPwaModalOpen] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  // Synchronize browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen for PWA beforeinstallprompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Navigation handler
  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (serviceId?: string) => {
    setBookingServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingServiceId(undefined);
  };

  const handleInstallPwa = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      setIsPwaModalOpen(false);
    } else {
      setIsPwaModalOpen(true);
    }
  };

  // If on /admin route, render dedicated admin layout
  if (currentPath === '/admin' || currentPath.startsWith('/admin')) {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onSuccess={() => navigate('/admin')}
          onReturnToStore={() => navigate('/')}
        />
      );
    }
    return (
      <AdminDashboard
        onNavigateToStore={() => navigate('/')}
      />
    );
  }

  // Render current active view
  const renderCurrentView = () => {
    // Check for individual service details: /services/:slug
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return (
        <ServiceDetailPage
          slug={slug}
          onBack={() => navigate('/services')}
          onOpenBooking={handleOpenBooking}
          onSelectRelated={(relatedSlug) => navigate(`/services/${relatedSlug}`)}
        />
      );
    }

    switch (currentPath) {
      case '/about':
        return <AboutPage onOpenBooking={() => handleOpenBooking()} onNavigate={navigate} />;
      case '/services':
        return (
          <ServicesPage
            onOpenBooking={handleOpenBooking}
            onSelectServiceDetail={(slug) => navigate(`/services/${slug}`)}
          />
        );
      case '/pricing':
        return (
          <PricingPage
            onOpenBooking={handleOpenBooking}
            onSelectServiceDetail={(slug) => navigate(`/services/${slug}`)}
          />
        );
      case '/gallery':
        return <GalleryPage />;
      case '/offers':
        return <OffersPage onOpenBooking={handleOpenBooking} />;
      case '/reviews':
        return <ReviewsPage />;
      case '/contact':
        return <ContactPage />;
      case '/book':
        return <BookPage initialServiceId={bookingServiceId} onNavigate={navigate} />;
      case '/privacy-policy':
        return <LegalPage type="privacy" onNavigate={navigate} />;
      case '/terms':
        return <LegalPage type="terms" onNavigate={navigate} />;
      case '/cancellation-policy':
        return <LegalPage type="cancellation" onNavigate={navigate} />;
      case '/cookie-policy':
        return <LegalPage type="cookie" onNavigate={navigate} />;
      case '/':
      case '/home':
      default:
        return (
          <HomePage
            onOpenBooking={handleOpenBooking}
            onSelectServiceDetail={(slug) => navigate(`/services/${slug}`)}
            onNavigate={navigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#121212] flex flex-col font-sans selection:bg-[#C5A059] selection:text-[#121212]">
      
      {/* Top Fixed Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPwaInstall={handleInstallPwa}
      />

      {/* Main Content View */}
      <main className="flex-1 w-full pt-20">
        {renderCurrentView()}
      </main>

      {/* Luxury Footer */}
      <Footer
        onNavigate={navigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPwaInstall={() => setIsPwaModalOpen(true)}
      />

      {/* Floating WhatsApp Quick Concierge Widget */}
      <FloatingWhatsApp />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedServiceId={bookingServiceId}
      />

      {/* PWA Install Modal */}
      <PwaInstallPrompt
        isOpen={isPwaModalOpen}
        onClose={() => setIsPwaModalOpen(false)}
        onInstall={handleInstallPwa}
        isInstallable={!!deferredPrompt}
      />

    </div>
  );
}
