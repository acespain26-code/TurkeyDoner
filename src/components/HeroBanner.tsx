import React from 'react';
import { useStore } from '../context/StoreContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { 
  Flame, 
  Bike, 
  ShieldCheck, 
  Star, 
  Clock, 
  MapPin, 
  PhoneCall, 
  ChevronRight, 
  Sparkles,
  Smartphone
} from 'lucide-react';

interface HeroBannerProps {
  onSelectCategory?: (categoryId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = () => {
  const { language, t, setIsAppModalOpen, setIsTrackingOpen, activeOrder } = useStore();

  const scrollToMenu = () => {
    const el = document.getElementById('carta-menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top pill badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-red-600/20 text-red-300 border border-red-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                <Flame className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                {t('bestFlavor')}
              </span>

              <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {t('halalCertified')}
              </span>

              <a 
                href={RESTAURANT_INFO.googleProfileUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-200 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold hover:bg-amber-500/30 transition-colors"
              >
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{t('googleRatingText')}</span>
              </a>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight">
                {t('heroTitlePart1')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-red-400">
                  {t('heroTitlePart2')}
                </span>
              </h1>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {t('heroSubtitle')}
              </p>
            </div>

            {/* Pricing Transparency Note */}
            <div className="bg-stone-800/80 border border-amber-500/30 rounded-xl p-3 sm:p-4 text-xs text-amber-100 flex items-start gap-3 backdrop-blur-xs">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 block mb-0.5">
                  {t('pricingNoticeTitle')}
                </span>
                {t('pricingNoticeText')} <span className="font-mono font-bold bg-amber-900/60 px-1 py-0.5 rounded text-white">{t('pricingNoticeCoupon')}</span> {t('pricingNoticeText2')}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-order-online-btn"
                onClick={scrollToMenu}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black px-6 py-3.5 rounded-xl text-sm shadow-lg shadow-amber-600/30 hover:shadow-amber-500/50 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>{t('ctaOrderOnline')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                id="hero-app-btn"
                onClick={() => setIsAppModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-stone-800/90 hover:bg-stone-700 text-white font-semibold px-5 py-3.5 rounded-xl text-sm border border-stone-700 transition-colors cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>{t('ctaAppOrder')}</span>
              </button>

              {activeOrder && (
                <button
                  id="hero-track-order-btn"
                  onClick={() => setIsTrackingOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-950/70 text-emerald-300 border border-emerald-500/50 px-4 py-3.5 rounded-xl text-sm font-semibold hover:bg-emerald-900/80 transition-colors cursor-pointer"
                >
                  <Bike className="w-4 h-4" />
                  <span>{t('ctaTrackOrder')} #{activeOrder.id}</span>
                </button>
              )}
            </div>

            {/* Quick Info Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-800 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{RESTAURANT_INFO.address}, La Zubia</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{language === 'es' ? 'Reparto: 20:00h - 23:00h (Mín. 10€)' : 'Delivery: 8:00 PM - 11:00 PM (Min. €10)'}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <span>958 890 208 / 641 271 079</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-b from-stone-800/90 to-stone-900/90 border border-stone-700/80 rounded-2xl p-4 sm:p-5 shadow-2xl overflow-hidden backdrop-blur-md">
              
              {/* Product hero photo showcase */}
              <div className="relative rounded-xl overflow-hidden aspect-4/3 mb-4 group">
                <img
                  src="https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1000&q=80"
                  alt="Especial de la Casa Shawarma Durum Kebab Turki-Pollito"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                
                {/* Floating tags */}
                <div className="absolute top-3 left-3 bg-amber-600/90 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-xs">
                  🔥 {language === 'es' ? 'Plato Más Vendido' : 'Best-Selling Dish'}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-base sm:text-lg drop-shadow-sm">
                    {language === 'es' ? 'Especial Shawarma-Durum (SUPER)' : 'House Special Shawarma-Durum (SUPER)'}
                  </h3>
                  <p className="text-xs text-amber-200">
                    {language === 'es' 
                      ? 'Carne mixta, huevo, queso, lechuga, tomate, col dulce y salsa blanca' 
                      : 'Spit-roasted mixed meat, egg, cheese, lettuce, tomato, sweet cabbage & white sauce'}
                  </p>
                </div>
              </div>

              {/* Flyer Highlights Row */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-2.5">
                  <span className="text-[11px] text-stone-400 block">{language === 'es' ? 'Menú Durum Grande' : 'Large Durum Combo'}</span>
                  <span className="font-extrabold text-amber-400 text-sm">7,00 €</span>
                  <span className="text-[10px] text-stone-400 block">{language === 'es' ? '+ Patatas y Bebida' : '+ Fries & Drink'}</span>
                </div>
                <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-2.5">
                  <span className="text-[11px] text-stone-400 block">{language === 'es' ? 'Gratinado al Horno' : 'Oven-Baked Gratin'}</span>
                  <span className="font-extrabold text-amber-400 text-sm">{language === 'es' ? 'Desde 6,00 €' : 'From €6.00'}</span>
                  <span className="text-[10px] text-stone-400 block">{language === 'es' ? 'Con Mozzarella fundida' : 'With melted mozzarella'}</span>
                </div>
              </div>

              {/* Local info badge */}
              <div className="mt-3 bg-amber-950/30 border border-amber-900/50 rounded-xl p-2.5 flex items-center justify-between text-xs text-amber-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{language === 'es' ? 'Abierto para pedidos online' : 'Open for online orders'}</span>
                </div>
                <span className="font-bold text-white">{language === 'es' ? 'Coste envío: +1,00 €' : 'Delivery: +€1.00'}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
