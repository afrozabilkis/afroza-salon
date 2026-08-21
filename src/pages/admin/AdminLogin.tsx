import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, KeyRound, Store, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';

interface AdminLoginProps {
  onSuccess: () => void;
  onReturnToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onReturnToStore }) => {
  const { adminLogin, businessInfo } = useSalon();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const isValid = adminLogin(password);
      if (isValid) {
        onSuccess();
      } else {
        setError('Invalid owner password. Please try again.');
        setIsSubmitting(false);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#F9F7F2] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#C5A059] selection:text-[#121212]" id="admin-login-screen">
      
      {/* Top Bar with Return to Store */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center pb-6 border-b border-[#2C2C2C]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1E1E1E] text-[#C5A059] border border-[#C5A059]/40 flex items-center justify-center font-serif font-bold text-lg">
            A
          </div>
          <div>
            <span className="font-serif text-sm font-bold tracking-wider text-white block leading-none">
              {businessInfo.name.toUpperCase()}
            </span>
            <span className="text-[8px] uppercase tracking-[0.25em] text-[#C5A059] font-bold block mt-0.5">
              Management Portal
            </span>
          </div>
        </div>

        <button
          onClick={onReturnToStore}
          className="px-4 py-2 bg-[#1E1E1E] hover:bg-[#2C2C2C] text-[#E5E1DA] hover:text-white border border-[#333333] text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          id="admin-return-store-btn"
        >
          <Store className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Return to Storefront</span>
        </button>
      </div>

      {/* Center Login Box */}
      <div className="max-w-md w-full mx-auto my-12 bg-[#181818] border border-[#2C2C2C] p-8 sm:p-10 shadow-2xl space-y-8">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-[#1E1E1E] text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
            Owner &amp; Manager Security
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Salon Admin Console
          </h1>
          <p className="text-xs text-[#A0988E] font-light leading-relaxed">
            Enter the authorized access passcode to manage bookings, services, team members, gallery, and pricing.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" id="admin-login-form">
          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase tracking-widest text-[#E5E1DA] font-bold">
              Admin Passcode
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter password..."
                className="w-full px-4 py-3.5 bg-[#121212] border border-[#333333] text-white placeholder:text-[#555] text-sm focus:outline-none focus:border-[#C5A059] pr-11 transition-colors"
                id="admin-password-input"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777] hover:text-[#C5A059] p-1 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-[#777] font-light flex items-center gap-1 pt-1">
              <KeyRound className="w-3 h-3 text-[#C5A059]" />
              <span>Default owner access passcode: <strong className="text-[#C5A059]">salon111</strong></span>
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !password}
            className="w-full py-4 bg-[#C5A059] hover:bg-white text-[#121212] text-xs uppercase tracking-widest font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            id="admin-login-submit-btn"
          >
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#2C2C2C] flex items-center justify-center gap-2 text-[10px] text-[#777]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Encrypted Session • Warsan 4, Dubai Branch</span>
        </div>

      </div>

      {/* Footer text */}
      <div className="text-center text-[11px] text-[#555]">
        © {new Date().getFullYear()} {businessInfo.name}. All administrative actions are recorded locally.
      </div>

    </div>
  );
};
