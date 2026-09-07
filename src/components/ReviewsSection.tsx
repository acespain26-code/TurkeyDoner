import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { 
  Star, 
  ShieldCheck, 
  ExternalLink, 
  MessageSquarePlus, 
  ThumbsUp, 
  CheckCircle,
  X 
} from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { 
    reviews, 
    addReview, 
    isReviewModalOpen, 
    setIsReviewModalOpen,
    language,
    t 
  } = useStore();
  
  const [filterSource, setFilterSource] = useState<'all' | 'google' | 'web'>('all');
  const [likedReviews, setLikedReviews] = useState<string[]>([]);

  // Add review form state
  const [authorName, setAuthorName] = useState('');
  const [ratingVal, setRatingVal] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [selectedDishes, setSelectedDishes] = useState<string[]>(['Menú Durum Gratinado']);

  const popularDishesOptions = [
    'Especial Shawarma-Durum',
    'Menú Durum Gratinado',
    'Campero Carne',
    'Zinger Burger',
    'Plato Especial de la Casa',
    'Durum PATATA',
    'Pizza Turca',
    'Falafel Vegetal',
  ];

  const handleToggleDish = (dish: string) => {
    if (selectedDishes.includes(dish)) {
      setSelectedDishes(selectedDishes.filter((d) => d !== dish));
    } else {
      setSelectedDishes([...selectedDishes, dish]);
    }
  };

  const handleLike = (id: string) => {
    if (!likedReviews.includes(id)) {
      setLikedReviews([...likedReviews, id]);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    addReview({
      author: authorName.trim(),
      rating: ratingVal,
      comment: commentText.trim(),
      verifiedBuyer: true,
      source: 'web',
      dishes: selectedDishes.length > 0 ? selectedDishes : undefined,
    });

    setAuthorName('');
    setCommentText('');
    setIsReviewModalOpen(false);
  };

  const filteredReviews = reviews.filter((r) => {
    if (filterSource === 'google') return r.source === 'google';
    if (filterSource === 'web') return r.source === 'web';
    return true;
  });

  return (
    <section id="opiniones-clientes" className="py-12 sm:py-16 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Social Proof Header & Google Profile Integration */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 mb-10 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            
            {/* Left Col: Google Profile Badges */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  {t('reviewsBadge')}
                </span>
                <span className="text-xs text-stone-400">
                  {RESTAURANT_INFO.address} ({RESTAURANT_INFO.city})
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                {t('reviewsTitle')}
              </h2>
              <p className="text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                {t('reviewsSubtitle')}
              </p>

              {/* Rating metrics row */}
              <div className="flex flex-wrap items-center gap-6 pt-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl sm:text-4xl font-black text-amber-400">
                    {RESTAURANT_INFO.googleRating.toFixed(1)}
                  </div>
                  <div>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-stone-400">
                      {language === 'es' ? `En Google Maps (${RESTAURANT_INFO.googleReviewsCount}+ opiniones)` : `On Google Maps (${RESTAURANT_INFO.googleReviewsCount}+ reviews)`}
                    </span>
                  </div>
                </div>

                <div className="h-8 w-px bg-stone-800 hidden sm:block" />

                <div className="text-xs text-stone-300">
                  <span className="font-bold text-white block">{language === 'es' ? '98% Recomendado' : '98% Recommended'}</span>
                  {language === 'es' ? 'Por vecinos de La Zubia y Granada' : 'By customers in La Zubia & Granada'}
                </div>
              </div>
            </div>

            {/* Right Col: Google Profile Buttons */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                id="view-google-profile-btn"
                href={RESTAURANT_INFO.googleProfileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-white hover:bg-stone-100 text-stone-900 font-extrabold py-3.5 px-5 rounded-2xl text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>{t('viewGoogleMapsProfile')}</span>
                <ExternalLink className="w-4 h-4 text-stone-500" />
              </a>

              <button
                id="write-verified-review-btn"
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-black py-3.5 px-5 rounded-2xl text-xs sm:text-sm transition-all cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>{t('writeReviewBtn')}</span>
              </button>

              <p className="text-[11px] text-stone-400 text-center">
                {language === 'es' ? 'Verificamos automáticamente cada opinión de pedidos web y app.' : 'We automatically verify every review from web and app orders.'}
              </p>
            </div>

          </div>
        </div>

        {/* Reviews Filters & Total Count */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setFilterSource('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterSource === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'es' ? 'Todas' : 'All'} ({reviews.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterSource('google')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterSource === 'google'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Google Maps
            </button>
            <button
              type="button"
              onClick={() => setFilterSource('web')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterSource === 'web'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'es' ? 'Pedidos Web Verificados' : 'Verified Web Orders'}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsReviewModalOpen(true)}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>+ {t('writeReviewBtn')}</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReviews.map((rev) => {
            const hasLiked = likedReviews.includes(rev.id);
            return (
              <div
                key={rev.id}
                className="bg-stone-50 border border-stone-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:shadow-xs transition-shadow"
              >
                <div className="space-y-3">
                  {/* Review Top Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-extrabold text-stone-900 text-sm">
                        {rev.author}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                          ))}
                        </div>
                        <span className="text-[11px] text-stone-400 font-medium">
                          {rev.date}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1 ${
                      rev.source === 'google'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      <CheckCircle className="w-3 h-3" />
                      {rev.source === 'google' ? 'Google' : (language === 'es' ? 'Verificado' : 'Verified')}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    "{rev.comment}"
                  </p>

                  {/* Dishes tags */}
                  {rev.dishes && rev.dishes.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {rev.dishes.map((dish, i) => (
                        <span key={i} className="bg-white border border-stone-200 text-stone-600 text-[10px] font-medium px-2 py-0.5 rounded">
                          {dish}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Helpful / Likes footer */}
                <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
                  <span className="text-[11px]">
                    {language === 'es' ? 'Compra confirmada en La Zubia' : 'Confirmed purchase in La Zubia'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleLike(rev.id)}
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md transition-colors cursor-pointer ${
                      hasLiked ? 'text-amber-700 bg-amber-50' : 'hover:text-stone-800'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{rev.likes + (hasLiked ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Modal: Add Review */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
          <div 
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 text-stone-900 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-stone-900 text-base">
                  {language === 'es' ? 'Dejar Reseña de Comprador' : 'Leave a Buyer Review'}
                </h3>
                <p className="text-xs text-stone-500">
                  {language === 'es' ? 'Comparte tu experiencia en Kebab Turki-Pollito' : 'Share your experience at Kebab Turki-Pollito'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="p-4 sm:p-5 space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {language === 'es' ? 'Tu Valoración' : 'Your Rating'}
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatingVal(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${star <= ratingVal ? 'fill-amber-400' : 'text-stone-300'}`} />
                    </button>
                  ))}
                  <span className="font-bold text-stone-700 ml-2 text-sm">{ratingVal} / 5</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {language === 'es' ? 'Tu Nombre *' : 'Your Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder={language === 'es' ? 'Ej: Daniel Sánchez' : 'e.g. John Doe'}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {language === 'es' ? 'Platos que has probado' : 'Dishes you tasted'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {popularDishesOptions.map((dish) => {
                    const sel = selectedDishes.includes(dish);
                    return (
                      <button
                        key={dish}
                        type="button"
                        onClick={() => handleToggleDish(dish)}
                        className={`px-2 py-1 rounded text-[11px] font-semibold border transition-all cursor-pointer ${
                          sel ? 'bg-amber-600 text-white border-amber-600' : 'bg-stone-50 text-stone-600 border-stone-200'
                        }`}
                      >
                        {dish}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {language === 'es' ? 'Tu Opinión *' : 'Your Review *'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={language === 'es' 
                    ? '¿Qué tal estuvo la comida, la salsa blanca, la temperatura y la rapidez de la entrega?'
                    : 'How was the food, the white sauce, the temperature and delivery speed?'}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 font-bold hover:bg-stone-100 cursor-pointer"
                >
                  {language === 'es' ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="bg-amber-700 hover:bg-amber-800 text-white font-black px-5 py-2 rounded-xl cursor-pointer"
                >
                  {language === 'es' ? 'Publicar Opinión' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
