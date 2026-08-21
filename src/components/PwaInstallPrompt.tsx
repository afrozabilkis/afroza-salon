import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, CheckCircle, Share, PlusSquare } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PwaInstallPrompt: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void;
  onInstall?: () => void;
  isInstallable?: boolean;
}> = ({ isOpen, onClose, onInstall, isInstallable }) => {
  const [internalDeferredPrompt, setInternalDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Check if standalone
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setInternalDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (onInstall) {
      onInstall();
    } else if (internalDeferredPrompt) {
      internalDeferredPrompt.prompt();
      const choiceResult = await internalDeferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setInternalDeferredPrompt(null);
      onClose();
    }
  };

  const hasPrompt = isInstallable || !!internalDeferredPrompt;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" id="pwa-install-modal">
      <div className="relative w-full max-w-md bg-[#F9F7F2] border border-[#E5E1DA] shadow-2xl p-6 sm:p-8 text-[#121212]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#4A4A4A] hover:text-[#121212] transition-colors bg-white/40 hover:bg-[#121212] hover:text-white"
          aria-label="Close installation modal"
          id="close-pwa-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 bg-[#121212] flex items-center justify-center text-[#C5A059] border border-[#C5A059]/40 shadow-md">
            <span className="font-serif text-2xl font-bold">A</span>
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold tracking-tight text-[#121212]">
              {SALON_INFO.name}
            </h3>
            <p className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">Official Salon PWA App</p>
          </div>
        </div>

        {isInstalled ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-[#121212] text-[#C5A059] flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#121212] mb-1">App Already Installed</h4>
            <p className="text-xs text-[#4A4A4A] font-light">
              You have already added {SALON_INFO.name} to your device. You can open it directly from your home screen.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-xs text-[#4A4A4A] font-light leading-relaxed mb-6">
              Install our high-performance PWA for instant one-tap appointment requests, VIP service access, and seamless offline browsing.
            </p>

            {hasPrompt ? (
              <button
                onClick={handleInstallClick}
                className="w-full py-4 px-6 bg-[#121212] hover:bg-[#C5A059] text-white text-[11px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                id="native-install-app-btn"
              >
                <Download className="w-4 h-4 text-[#C5A059]" />
                <span>Install Application</span>
              </button>
            ) : isIOS ? (
              <div className="bg-white p-4 text-xs text-[#4A4A4A] space-y-2 border border-[#E5E1DA]">
                <p className="font-bold text-[#121212] flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#C5A059]" />
                  To install on Apple iOS / Safari:
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span>1. Tap the</span>
                  <Share className="w-4 h-4 text-[#121212]" />
                  <span><strong>Share</strong> button in your browser bar</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span>2. Scroll and tap</span>
                  <PlusSquare className="w-4 h-4 text-[#121212]" />
                  <span><strong>Add to Home Screen</strong></span>
                </div>
              </div>
            ) : (
              <div className="bg-white p-4 text-xs text-[#4A4A4A] space-y-2 border border-[#E5E1DA]">
                <p className="font-bold text-[#121212] flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#C5A059]" />
                  To install on your browser:
                </p>
                <p>Click your browser menu (•••) and select <strong>"Install app"</strong> or <strong>"Add to Home Screen"</strong>.</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#E5E1DA] flex items-center justify-between text-[10px] text-[#4A4A4A] uppercase tracking-wider font-light">
          <span>Fast • Offline Ready • PWA</span>
          <button onClick={onClose} className="hover:text-[#121212] font-bold cursor-pointer">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
