import React from 'react';
import { useSalon } from '../context/SalonContext';

interface WhatsAppButtonProps {
  customMessage?: string;
  serviceName?: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline' | 'pill' | 'dark';
  fullWidth?: boolean;
  id?: string;
  onClick?: () => void;
  showIcon?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  customMessage,
  serviceName,
  label = 'WhatsApp',
  className = '',
  size = 'md',
  variant = 'primary',
  fullWidth = false,
  id = 'whatsapp-action-btn',
  onClick,
  showIcon = true,
}) => {
  const { getWhatsAppUrl } = useSalon();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    } else {
      const url = getWhatsAppUrl(customMessage, serviceName);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[10px] gap-1.5',
    md: 'px-5 py-3 text-[11px] gap-2',
    lg: 'px-7 py-4 text-xs gap-2.5',
  };

  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles = 'bg-gradient-to-r from-[#00C853] to-[#25D366] text-white shadow-[0_4px_16px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.45)] hover:brightness-105 border border-white/20';
  } else if (variant === 'pill') {
    variantStyles = 'bg-gradient-to-r from-[#00C853] to-[#25D366] text-white rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.45)] hover:brightness-105 border border-white/20';
  } else if (variant === 'outline') {
    variantStyles = 'bg-white/90 hover:bg-emerald-50 text-emerald-700 border border-emerald-600/30 hover:border-emerald-600 shadow-xs';
  } else if (variant === 'dark') {
    variantStyles = 'bg-[#1E1E1E] hover:bg-[#282828] text-white border border-emerald-500/30 hover:border-emerald-500/60 shadow-xs';
  }

  return (
    <button
      type="button"
      id={id}
      onClick={handleClick}
      className={`inline-flex items-center justify-center font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 active:scale-98 select-none ${sizeStyles[size]} ${variantStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {showIcon && (
        <svg 
          viewBox="0 0 24 24" 
          className={size === 'sm' ? 'w-3.5 h-3.5 fill-current shrink-0' : size === 'lg' ? 'w-5 h-5 fill-current shrink-0' : 'w-4 h-4 fill-current shrink-0'}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      )}
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
};
