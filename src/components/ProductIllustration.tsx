import React from 'react';

interface ProductIllustrationProps {
  type: 'serum' | 'amber-oud' | 'hydra-cream' | 'body-wash' | 'cleanser' | 'refill' | 'discovery-set' | 'oud-intense';
  className?: string;
}

export const ProductIllustration: React.FC<ProductIllustrationProps> = ({ type, className = '' }) => {
  switch (type) {
    case 'serum':
      return (
        <div className={`w-full h-full flex items-center justify-center bg-[#e8efea] rounded-[16px] ${className}`}>
          <svg
            viewBox="0 0 55 140"
            style={{ width: 'auto', height: '62%', maxHeight: '80px' }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="20" y="2" width="15" height="14" rx="2.5" fill="#2e4a62" />
            <rect x="16" y="16" width="23" height="10" rx="2" fill="#4b6375" />
            <rect x="1" y="27" width="53" height="111" rx="20" fill="#dbe7e1" stroke="#c5d6cc" strokeWidth="1.5" />
            <rect x="10" y="52" width="35" height="50" rx="5" fill="#ffffff" />
          </svg>
        </div>
      );

    case 'amber-oud':
      return (
        <div className={`w-full h-full flex items-center justify-center bg-[#f5eee6] rounded-[18px] ${className}`}>
          <svg
            viewBox="0 0 55 140"
            style={{ width: 'auto', height: '65%', maxHeight: '74px' }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="19" y="4" width="17" height="18" rx="2.5" fill="#584537" />
            <rect x="23" y="22" width="9" height="5" rx="1" fill="#3f3126" />
            <rect x="7" y="27" width="41" height="108" rx="10" fill="#eedec8" stroke="#d5c3af" strokeWidth="1.5" />
            <rect x="15" y="52" width="25" height="42" rx="3" fill="#ffffff" />
          </svg>
        </div>
      );

    case 'hydra-cream':
      return (
        <div className={`w-full h-full flex items-center justify-center bg-[#edf1ee] rounded-2xl p-4 ${className}`}>
          <svg viewBox="0 0 140 180" className="w-28 h-32 max-h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="36" y="46" width="68" height="18" rx="5" fill="#805b46" />
            <rect x="34" y="68" width="72" height="52" rx="10" fill="#edd6c6" />
            <rect x="44" y="78" width="52" height="24" rx="3" fill="#ffffff" />
          </svg>
        </div>
      );

    case 'body-wash':
      return (
        <div className={`w-full h-full flex items-center justify-center bg-[#edf2f2] rounded-2xl p-4 ${className}`}>
          <svg viewBox="0 0 140 180" className="w-24 h-32 max-h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="54" y="20" width="32" height="14" rx="3" fill="#345060" />
            <rect x="62" y="34" width="16" height="4" fill="#243844" />
            <path d="M50 38 L90 38 L90 120 L70 148 L50 120 Z" fill="#d7e5e7" />
            <rect x="57" y="58" width="26" height="44" rx="2" fill="#ffffff" />
          </svg>
        </div>
      );

    case 'cleanser':
      return (
        <div className={`w-full h-full flex items-center justify-center bg-[#eaf1ee] rounded-2xl p-4 ${className}`}>
          <svg viewBox="0 0 140 180" className="w-24 h-32 max-h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="56" y="20" width="28" height="14" rx="3" fill="#2c4d5b" />
            <path d="M50 38 L90 38 L90 120 L70 148 L50 120 Z" fill="#d9e6e0" />
            <rect x="58" y="56" width="24" height="40" rx="2" fill="#ffffff" />
          </svg>
        </div>
      );

    case 'refill':
      return (
        <div className={`w-full h-full flex items-center justify-center bg-[#edf1ee] rounded-2xl p-4 ${className}`}>
          <svg viewBox="0 0 140 180" className="w-24 h-32 max-h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="54" y="28" width="32" height="10" rx="2" fill="#7d9d9f" />
            <rect x="54" y="42" width="32" height="96" rx="10" fill="#d7e6e2" />
            <circle cx="70" cy="90" r="11" stroke="#224a4d" strokeWidth="2.5" strokeDasharray="50 15" fill="none" />
            <path d="M72 80 L76 83 L70 87" fill="#224a4d" />
          </svg>
        </div>
      );

    case 'discovery-set':
      return (
        <div className={`w-full h-full flex items-center justify-center bg-[#f5efe7] rounded-2xl p-4 ${className}`}>
          <svg viewBox="0 0 140 180" className="w-28 h-32 max-h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M70 45 L108 67 L70 89 L32 67 Z" fill="#f8ede1" stroke="#baa48b" strokeWidth="1.5" />
            <path d="M32 67 L70 89 L70 135 L32 113 Z" fill="#e9d8c2" stroke="#baa48b" strokeWidth="1.5" />
            <path d="M70 89 L108 67 L108 113 L70 135 Z" fill="#d9c5ab" stroke="#baa48b" strokeWidth="1.5" />
          </svg>
        </div>
      );

    case 'oud-intense':
      return (
        <div className={`w-full h-full flex items-center justify-center bg-[#f3eee6] rounded-2xl p-4 ${className}`}>
          <svg viewBox="0 0 140 180" className="w-24 h-32 max-h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="56" y="22" width="28" height="14" rx="2" fill="#4d3a2d" />
            <rect x="62" y="36" width="16" height="4" fill="#32241b" />
            <rect x="44" y="42" width="52" height="84" rx="6" fill="#ebdcc8" />
            <rect x="52" y="62" width="36" height="38" rx="2" fill="#ffffff" />
          </svg>
        </div>
      );

    default:
      return null;
  }
};

