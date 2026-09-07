import React from 'react';
import { BlogPost } from '../data/blogData';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/menuData';
import { useStore } from '../context/StoreContext';
import { KTLogo } from './KTLogo';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Tag, 
  CheckCircle2, 
  MapPin, 
  ShoppingBag,
  Share2
} from 'lucide-react';

interface BlogDetailModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onSelectDish?: (dishId: string) => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  post,
  onClose,
  onSelectDish,
}) => {
  const { language, setIsCartOpen } = useStore();

  if (!post) return null;

  const currentContent = language === 'es' ? post.content.es : post.content.en;
  const currentTitle = language === 'es' ? post.title.es : post.title.en;
  const currentCategory = language === 'es' ? post.category.es : post.category.en;

  const featuredItem = post.featuredDishId
    ? MENU_ITEMS.find((item) => item.id === post.featuredDishId)
    : null;

  const handleDishClick = () => {
    if (featuredItem && onSelectDish) {
      onClose();
      onSelectDish(featuredItem.id);
    } else {
      onClose();
      const el = document.getElementById('carta-menu');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentTitle,
          text: currentContent.intro.slice(0, 100),
          url: window.location.href,
        });
      } catch {
        // cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(language === 'es' ? '¡Enlace copiado al portapapeles!' : 'Link copied to clipboard!');
    }
  };

  return (
    <div
      id="blog-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="blog-detail-modal-container"
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Sticky Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 py-3.5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KTLogo size="xs" />
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {RESTAURANT_INFO.name} · {currentCategory}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="blog-share-btn"
              type="button"
              onClick={handleShare}
              className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg cursor-pointer"
              title={language === 'es' ? 'Compartir artículo' : 'Share article'}
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              id="blog-modal-close-btn"
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Photo Banner */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-stone-900">
          <img
            src={post.image}
            alt={currentTitle}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
          
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="inline-block bg-amber-600 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded shadow-sm mb-2">
              {currentCategory}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white leading-snug drop-shadow-md">
              {currentTitle}
            </h1>
          </div>
        </div>

        {/* Article Meta row */}
        <div className="px-5 sm:px-8 py-3 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-700" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              {post.readTime}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-stone-500">
            <MapPin className="w-3 h-3 text-amber-600" />
            <span>{RESTAURANT_INFO.address}, {RESTAURANT_INFO.city}</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="px-5 sm:px-8 py-6 sm:py-8 space-y-6 text-stone-800">
          
          {/* Lead Paragraph */}
          <p className="text-base sm:text-lg font-medium text-stone-700 leading-relaxed border-l-4 border-amber-600 pl-4 bg-amber-50/50 py-2 rounded-r-lg">
            {currentContent.intro}
          </p>

          {/* Structured Sections */}
          {currentContent.sections.map((sec, idx) => (
            <div key={idx} className="space-y-3 pt-2">
              <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight">
                {sec.heading}
              </h2>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {sec.text}
              </p>
              {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                <ul className="space-y-2 pt-1 pl-1">
                  {sec.bulletPoints.map((bp, bidx) => (
                    <li key={bidx} className="flex items-start gap-2.5 text-sm text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Conclusion */}
          <div className="p-4 sm:p-5 rounded-xl bg-stone-100 border border-stone-200 mt-6 space-y-2">
            <h3 className="font-extrabold text-stone-900 text-base">
              {language === 'es' ? 'Conclusión y Recomendación' : 'Conclusion & Recommendation'}
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              {currentContent.conclusion}
            </p>
          </div>

          {/* Featured Dish Callout (if linked) */}
          {featuredItem && (
            <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <img
                  src={featuredItem.image}
                  alt={featuredItem.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0 border border-amber-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block">
                    {language === 'es' ? 'Plato Destacado del Artículo' : 'Featured Dish from Article'}
                  </span>
                  <h4 className="font-bold text-stone-900 text-sm">
                    {featuredItem.name}
                  </h4>
                  <span className="text-sm font-extrabold text-amber-900">
                    {featuredItem.websitePrice.toFixed(2)} €
                  </span>
                </div>
              </div>

              <button
                id={`blog-order-dish-btn-${featuredItem.id}`}
                type="button"
                onClick={handleDishClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{language === 'es' ? 'Pedir Este Plato Online' : 'Order This Dish Online'}</span>
              </button>
            </div>
          )}

          {/* SEO Keywords tags */}
          <div className="pt-4 border-t border-stone-200">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-xs font-bold text-stone-500 mr-1">
                {language === 'es' ? 'Etiquetas SEO:' : 'SEO Tags:'}
              </span>
              {post.keywords.map((kw, kidx) => (
                <span
                  key={kidx}
                  className="bg-stone-100 text-stone-600 text-[11px] font-medium px-2 py-0.5 rounded border border-stone-200"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-5 sm:px-8 py-3.5 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-stone-600 hover:text-stone-900 text-xs font-semibold px-3 py-2 cursor-pointer"
          >
            {language === 'es' ? 'Cerrar' : 'Close'}
          </button>

          <button
            id="blog-modal-bottom-order-btn"
            type="button"
            onClick={() => {
              onClose();
              const el = document.getElementById('carta-menu');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-xs px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <span>{language === 'es' ? 'Explorar Carta y Pedir (+1€ Online)' : 'Browse Menu & Order (+€1 Online)'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
