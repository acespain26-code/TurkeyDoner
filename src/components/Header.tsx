import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { KTLogo } from './KTLogo';
import { 
  ShoppingBag, 
  User, 
  Mail, 
  Phone, 
  Smartphone, 
  Star, 
  Clock, 
  MapPin, 
  Menu as MenuIcon, 
  X,
  ShieldCheck,
  Search,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onSearchChange?: (query: string) => void;
  onSelectCategory?: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  onSearchChange 
}) => {
  const { 
    language,
    setLanguage,
    t,
    cart, 
    cartTotal, 
    setIsCartOpen, 
    setIsAccountOpen, 
    setIsEmailModalOpen, 
    unreadEmailsCount,
    setIsAppModalOpen,
    setIsTrackingOpen,
    activeOrder
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const currentSearch = searchQuery !== undefined ? searchQuery : localSearchTerm;

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (setSearchQuery) {
      setSearchQuery(val);
    } else {
      setLocalSearchTerm(val);
    }
    if (onSearchChange) onSearchChange(val);
  };

  const handleClearSearch = () => {
    if (setSearchQuery) {
      setSearchQuery('');
    } else {
      setLocalSearchTerm('');
    }
    if (onSearchChange) onSearchChange('');
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'recibido': return t('statusReceived');
      case 'preparando': return t('statusCooking');
      case 'en_camino': return t('statusOnTheWay');
      default: return t('statusDelivered');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Announcement Bar with Store Details & 2 Language Buttons */}
      <div className="bg-amber-900 text-amber-50 text-xs py-1.5 sm:py-2 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto text-[11px] sm:text-xs font-medium whitespace-nowrap scrollbar-none py-0.5">
            <span className="inline-flex items-center gap-1 bg-amber-800/80 text-amber-200 px-2 py-0.5 rounded-sm font-semibold tracking-wide shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {t('halalBadge')}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-amber-100/90 truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              {RESTAURANT_INFO.address}, {RESTAURANT_INFO.city} ({t('landmark')})
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              {t('deliveryHoursNotice')}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs ml-auto shrink-0">
            <a 
              href={`tel:${RESTAURANT_INFO.phones[0].replace(/\s/g, '')}`}
              className="hidden md:inline-flex items-center gap-1.5 font-semibold text-amber-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xl:inline">{t('ordersPhone')}</span> {RESTAURANT_INFO.phones[0]}
            </a>
            <span className="text-amber-700 hidden md:inline">|</span>
            <a 
              href={RESTAURANT_INFO.googleProfileUrl} 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2 py-0.5 rounded-sm transition-colors"
              title="Google Maps Profile"
            >
              <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
              <span className="font-bold">4.9</span>
              <span className="hidden lg:inline text-amber-200 text-[11px]">(384+ {t('googleReviewsCount')})</span>
            </a>

            {/* Top Bar Language Selector: ENG & ESP */}
            <div 
              id="top-language-selector" 
              className="flex items-center bg-stone-950/70 p-0.5 rounded-md border border-amber-500/40 text-[11px] font-extrabold shadow-xs" 
              role="group" 
              aria-label="Language selection"
            >
              <button
                id="header-lang-esp-top"
                type="button"
                onClick={() => setLanguage('es')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  language === 'es'
                    ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                    : 'text-amber-200/90 hover:text-white hover:bg-white/10'
                }`}
                aria-pressed={language === 'es'}
                title="Cambiar idioma a Español"
              >
                ESP
              </button>
              <button
                id="header-lang-eng-top"
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                    : 'text-amber-200/90 hover:text-white hover:bg-white/10'
                }`}
                aria-pressed={language === 'en'}
                title="Switch language to English"
              >
                ENG
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              id="brand-logo-btn"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <KTLogo size="md" animated={true} />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-stone-900 text-sm sm:text-base md:text-lg tracking-tight uppercase">
                    Kebab Turki-Pollito
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider">
                    Halal
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-medium tracking-wide">
                  Shawarma · Döner Kebab · La Zubia
                </p>
              </div>
            </button>
          </div>

          {/* Quick Search on Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm xl:max-w-md mx-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                id="desktop-search-input"
                type="text"
                value={currentSearch}
                onChange={handleSearch}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-stone-100 border border-stone-200 rounded-lg pl-9 pr-8 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 transition-all"
              />
              {currentSearch && (
                <button 
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-semibold cursor-pointer"
                  aria-label="Borrar búsqueda"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Blog & Guides Link */}
            <button
              id="header-blog-link-btn"
              type="button"
              onClick={() => {
                const el = document.getElementById('blog-seo-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-stone-700 hover:text-amber-800 hover:bg-stone-100 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-stone-200/70"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>{language === 'es' ? 'Blog & Guías' : 'Food Blog'}</span>
            </button>

            {/* Live Order Tracker Button (when order is active) */}
            {activeOrder && (
              <button
                id="active-order-tracking-btn"
                onClick={() => setIsTrackingOpen(true)}
                className="hidden md:inline-flex items-center gap-2 bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300/80 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all animate-pulse cursor-pointer"
                title={t('trackingActive')}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{t('trackingActive')} #{activeOrder.id}</span>
                <span className="bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold">
                  {getStatusLabel(activeOrder.status)}
                </span>
              </button>
            )}

            {/* App Promo Button */}
            <button
              id="header-app-btn"
              onClick={() => setIsAppModalOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-stone-200 cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-700" />
              <span>{t('orderApp')}</span>
              <span className="bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {t('orderAppDiscount')}
              </span>
            </button>

            {/* Email Notifications Button */}
            <button
              id="header-email-inbox-btn"
              onClick={() => setIsEmailModalOpen(true)}
              className="relative p-2 text-stone-600 hover:text-amber-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title={t('orderEmails')}
              aria-label={t('orderEmails')}
            >
              <Mail className="w-5 h-5" />
              {unreadEmailsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {unreadEmailsCount}
                </span>
              )}
            </button>

            {/* User Account / Orders Button */}
            <button
              id="header-account-btn"
              onClick={() => setIsAccountOpen(true)}
              className="inline-flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 text-stone-700 hover:text-amber-800 hover:bg-stone-100 rounded-lg text-xs font-semibold transition-colors border border-stone-200/80 cursor-pointer"
              title={t('myAccount')}
            >
              <User className="w-4 h-4" />
              <span className="hidden md:inline">{t('myAccount')}</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-2.5 sm:px-3.5 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all cursor-pointer"
              aria-label="Abrir carrito"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-stone-950 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                    {totalCartItems}
                  </span>
                )}
              </div>
              <span className="font-extrabold">{cartTotal.toFixed(2)} €</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              id="header-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-2.5 lg:hidden">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              id="mobile-search-input"
              type="text"
              value={currentSearch}
              onChange={handleSearch}
              placeholder={t('searchMobilePlaceholder')}
              className="w-full bg-stone-100 border border-stone-200 rounded-lg pl-9 pr-8 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
            />
            {currentSearch && (
              <button 
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-semibold cursor-pointer"
                aria-label="Borrar búsqueda"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-stone-200 flex flex-col gap-2.5 pb-2 animate-in fade-in slide-in-from-top-2">
            
            <div className="flex items-center justify-between text-xs text-stone-600 py-1">
              <span>📍 {RESTAURANT_INFO.address}, La Zubia</span>
              <a href={`tel:${RESTAURANT_INFO.phones[0]}`} className="font-bold text-amber-700">
                {RESTAURANT_INFO.phones[0]}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                id="mobile-menu-blog-btn"
                onClick={() => {
                  const el = document.getElementById('blog-seo-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1 bg-stone-100 p-2.5 rounded-lg text-xs font-semibold text-stone-800 cursor-pointer hover:bg-stone-200"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>{language === 'es' ? 'Blog' : 'Blog'}</span>
              </button>
              <button
                id="mobile-menu-app-btn"
                onClick={() => {
                  setIsAppModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1 bg-stone-100 p-2.5 rounded-lg text-xs font-semibold text-stone-800 cursor-pointer hover:bg-stone-200"
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-700" />
                <span>App ({t('orderAppDiscount')})</span>
              </button>
              <button
                id="mobile-menu-emails-btn"
                onClick={() => {
                  setIsEmailModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1 bg-stone-100 p-2.5 rounded-lg text-xs font-semibold text-stone-800 cursor-pointer hover:bg-stone-200"
              >
                <Mail className="w-3.5 h-3.5 text-amber-700" />
                <span>{language === 'es' ? 'Emails' : 'Emails'}</span>
              </button>
            </div>

            {activeOrder && (
              <button
                id="mobile-menu-tracking-btn"
                onClick={() => {
                  setIsTrackingOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold p-2.5 rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                {t('ctaTrackOrder')} #{activeOrder.id} ({getStatusLabel(activeOrder.status)})
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
