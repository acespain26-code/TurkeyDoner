import React from 'react';

interface KTLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showText?: boolean;
  animated?: boolean;
}

export const KTLogo: React.FC<KTLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  animated = false,
}) => {
  const sizeMap = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    '2xl': 'w-28 h-28',
  };

  const currentSizeClass = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* SVG Emblem Icon */}
      <div
        className={`relative shrink-0 ${currentSizeClass} ${
          animated ? 'hover:scale-105 transition-transform duration-300' : ''
        }`}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Gold Gradient */}
            <linearGradient id="ktGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="35%" stopColor="#d97706" />
              <stop offset="70%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Shield / Badge Background Dark Red Gradient */}
            <radialGradient id="ktBgGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#831843" />
              <stop offset="45%" stopColor="#7f1d1d" />
              <stop offset="85%" stopColor="#450a0a" />
              <stop offset="100%" stopColor="#1c1917" />
            </radialGradient>

            {/* Spit Fire / Flame Gradient */}
            <linearGradient id="ktFlameGrad" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>

            {/* Gold Lettering Gradient */}
            <linearGradient id="ktTextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#fef08a" />
              <stop offset="80%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Drop Shadow Filter */}
            <filter id="ktGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Outer Badge Rim (Double Circle with Gold Texture) */}
          <circle cx="60" cy="60" r="56" fill="url(#ktBgGrad)" stroke="url(#ktGoldGrad)" strokeWidth="3" />
          <circle cx="60" cy="60" r="51" fill="none" stroke="url(#ktGoldGrad)" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />

          {/* Decorative Stars / Dots on Rim */}
          <circle cx="60" cy="9" r="1.5" fill="#fde047" />
          <circle cx="60" cy="111" r="1.5" fill="#fde047" />
          <circle cx="9" cy="60" r="1.5" fill="#fde047" />
          <circle cx="111" cy="60" r="1.5" fill="#fde047" />

          {/* Top Flame Motif (Sizzling Rotisserie Flames) */}
          <g filter="url(#ktGlow)">
            {/* Center Main Flame */}
            <path
              d="M 60 16 C 54 26 50 32 50 39 C 50 45 54 48 60 48 C 66 48 70 45 70 39 C 70 32 66 26 60 16 Z"
              fill="url(#ktFlameGrad)"
              opacity="0.9"
            />
            {/* Left Spit Flame */}
            <path
              d="M 52 26 C 47 32 44 37 45 42 C 46 45 49 47 52 47 C 49 43 50 38 52 26 Z"
              fill="#f59e0b"
              opacity="0.75"
            />
            {/* Right Spit Flame */}
            <path
              d="M 68 26 C 73 32 76 37 75 42 C 74 45 71 47 68 47 C 71 43 70 38 68 26 Z"
              fill="#f59e0b"
              opacity="0.75"
            />
            {/* Inner Core Light */}
            <path
              d="M 60 28 C 57 34 56 38 56 42 C 56 45 58 46 60 46 C 62 46 64 45 64 42 C 64 38 63 34 60 28 Z"
              fill="#fef08a"
            />
          </g>

          {/* Stylized Skewer / Spit Axis behind KT */}
          <line x1="60" y1="46" x2="60" y2="92" stroke="#d97706" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

          {/* Bold Monogram "KT" (Kebab Turki) */}
          <g filter="url(#ktGlow)">
            {/* "K" */}
            <text
              x="36"
              y="76"
              fontFamily="system-ui, -apple-system, 'Playfair Display', serif"
              fontSize="34"
              fontWeight="900"
              letterSpacing="-1"
              fill="url(#ktTextGrad)"
              stroke="#450a0a"
              strokeWidth="0.75"
            >
              K
            </text>
            {/* "T" */}
            <text
              x="62"
              y="76"
              fontFamily="system-ui, -apple-system, 'Playfair Display', serif"
              fontSize="34"
              fontWeight="900"
              letterSpacing="-1"
              fill="url(#ktTextGrad)"
              stroke="#450a0a"
              strokeWidth="0.75"
            >
              T
            </text>
          </g>

          {/* Lower Banner Ribbon Arc: "KEBAB TURKI" */}
          <path
            id="ktRibbonPath"
            d="M 24 96 Q 60 108 96 96"
            fill="none"
            stroke="none"
          />
          <text fontSize="7.5" fontWeight="800" fill="#fde047" letterSpacing="1.2">
            <textPath href="#ktRibbonPath" startOffset="50%" textAnchor="middle">
              KEBAB TURKI
            </textPath>
          </text>

          {/* Tiny Halal Crescent & Star on lower side */}
          <path
            d="M 60 101 C 61.5 101 62.5 102 62.5 103.5 C 62.5 105 61.5 106 60 106 C 58.5 106 57.5 105 57.5 103.5 C 57.5 102 58.5 101 60 101 Z"
            fill="#f59e0b"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Optional Side Branding Text */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-stone-900 text-sm sm:text-base tracking-tight uppercase">
              Kebab Turki-Pollito
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded uppercase">
              Halal
            </span>
          </div>
          <span className="text-[11px] text-stone-500 font-medium">
            Shawarma · Döner Kebab · La Zubia
          </span>
        </div>
      )}
    </div>
  );
};
