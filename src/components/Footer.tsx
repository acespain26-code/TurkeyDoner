import React from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { KTLogo } from './KTLogo';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setIsAppModalOpen, setIsEmailModalOpen, setIsAccountOpen, language, t } = useStore();

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Halal Guarantee */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <KTLogo size="md" />
              <div>
                <span className="text-base font-black text-white tracking-tight uppercase block leading-tight">
                  {RESTAURANT_INFO.name}
                </span>
                <span className="text-[11px] text-amber-500 font-semibold">
                  Kebab Turki · La Zubia
                </span>
              </div>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              {language === 'es'
                ? 'Especialistas en auténtico kebab turco, durums artesanos, pizzas turcas y platos combinados con carne 100% Halal en La Zubia (Granada).'
                : 'Specialists in authentic Turkish kebab, handmade durum wraps, Turkish pizzas and combo platters with 100% Halal meat in La Zubia (Granada).'}
            </p>
            <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-2.5 py-1 rounded-lg text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t('halalBadge')}</span>
            </div>
          </div>

          {/* Col 2: Location & Contact */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-sm uppercase tracking-wider">
              {language === 'es' ? 'Ubicación y Teléfonos' : 'Location & Phone'}
            </h3>
            <ul className="space-y-2 text-stone-400 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">{RESTAURANT_INFO.address}</strong>
                  {RESTAURANT_INFO.city}
                  <span className="text-stone-500 block">({t('landmark')})</span>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="space-x-2">
                  <a href={`tel:${RESTAURANT_INFO.phones[0]}`} className="hover:text-amber-400 transition-colors font-bold text-white">
                    {RESTAURANT_INFO.phones[0]}
                  </a>
                  <span>·</span>
                  <a href={`tel:${RESTAURANT_INFO.phones[1]}`} className="hover:text-amber-400 transition-colors font-bold text-white">
                    {RESTAURANT_INFO.phones[1]}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Hours & Delivery */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-sm uppercase tracking-wider">
              {language === 'es' ? 'Horarios y Reparto' : 'Opening Hours & Delivery'}
            </h3>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">
                    {language === 'es' ? 'Apertura en Local:' : 'Store Opening:'}
                  </span>
                  {language === 'es' 
                    ? '12:30h a 16:00h y 19:30h a 00:00h' 
                    : '12:30 PM to 4:00 PM & 7:30 PM to 12:00 AM'}
                  <span className="text-stone-500 block">
                    {language === 'es' ? 'Vie, Sáb y Dom hasta las 00:30h' : 'Fri, Sat & Sun until 12:30 AM'}
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-stone-900 rounded-xl border border-stone-800 text-[11px] space-y-0.5">
                <span className="font-bold text-amber-400 block">
                  🛵 {language === 'es' ? 'Reparto a Domicilio:' : 'Home Delivery:'}
                </span>
                <span>{RESTAURANT_INFO.deliveryHours}</span>
                <span className="text-stone-400 block">
                  {language === 'es' 
                    ? `Pedido mínimo ${RESTAURANT_INFO.deliveryMinOrder.toFixed(0)}€ (+1€ envío)`
                    : `Minimum order €${RESTAURANT_INFO.deliveryMinOrder.toFixed(0)} (+€1 delivery)`}
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Links & Google Profile */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-sm uppercase tracking-wider">
              {language === 'es' ? 'Enlaces Directos' : 'Quick Links'}
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href={RESTAURANT_INFO.googleProfileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold"
                >
                  <span>{t('viewGoogleMapsProfile')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <button
                  id="footer-blog-btn"
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('blog-seo-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer font-medium"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                  <span>{language === 'es' ? 'Blog SEO & Guías Kebab' : 'SEO Food Blog & Guides'}</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-account-btn"
                  type="button"
                  onClick={() => setIsAccountOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('myAccount')}
                </button>
              </li>
              <li>
                <button
                  id="footer-email-btn"
                  type="button"
                  onClick={() => setIsEmailModalOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('emailNotifications')}
                </button>
              </li>
              <li>
                <button
                  id="footer-app-btn"
                  type="button"
                  onClick={() => setIsAppModalOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('downloadApp')}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_INFO.name} · {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{language === 'es' ? 'Precios Web (+1€ vs mostrador aplicados)' : 'Online Prices (+€1 vs counter applied)'}</span>
            <span>·</span>
            <span>La Zubia, Granada</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
