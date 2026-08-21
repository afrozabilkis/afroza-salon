import React from 'react';
import { Download } from 'lucide-react';

interface PwaInstallButtonProps {
  onClick: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
}

export const PwaInstallButton: React.FC<PwaInstallButtonProps> = ({
  onClick,
  className = '',
  size = 'md',
  id = 'pwa-install-header-btn',
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[10px] gap-1.5',
    md: 'px-4 py-2 text-[10px] sm:text-[11px] gap-2',
    lg: 'px-6 py-3 text-xs gap-2.5',
  };

  return (
    <button
      type="button"
      id={id}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer select-none rounded-none bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7D3B] text-[#121212] border border-[#F3E5AB]/40 shadow-[0_4px_14px_rgba(197,160,89,0.25)] hover:shadow-[0_6px_20px_rgba(197,160,89,0.38)] hover:brightness-105 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-98 ${sizeStyles[size]} ${className}`}
    >
      <Download className={size === 'sm' ? 'w-3 h-3 text-[#121212]' : 'w-3.5 h-3.5 text-[#121212]'} />
      <span className="whitespace-nowrap font-bold">Install App</span>
    </button>
  );
};
