import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { useStore } from '../context/StoreContext';
import { BlogDetailModal } from './BlogDetailModal';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Tag, 
  Flame, 
  Check,
  Search
} from 'lucide-react';

interface BlogSectionProps {
  onSelectDish?: (dishId: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectDish }) => {
  const { language } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogSearch, setBlogSearch] = useState('');

  const categories = [
    { id: 'all', es: 'Todos los Artículos', en: 'All Articles' },
    { id: 'Gastronomía Local', es: 'Gastronomía Local', en: 'Local Dining' },
    { id: 'Calidad y Certificación', es: 'Carne Halal', en: 'Halal Quality' },
    { id: 'Recetas y Secretos', es: 'Salsas y Secretos', en: 'Sauces & Secrets' },
    { id: 'Especialidades', es: 'Especialidades', en: 'Specialties' },
    { id: 'Servicio Delivery', es: 'A Domicilio', en: 'Home Delivery' },
    { id: 'Veggie & Saludable', es: 'Falafel Veggie', en: 'Veggie Falafel' },
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    // Category match
    if (selectedCategory !== 'all' && post.category.es !== selectedCategory) {
      return false;
    }
    // Search match
    if (blogSearch.trim()) {
      const q = blogSearch.toLowerCase();
      const title = (language === 'es' ? post.title.es : post.title.en).toLowerCase();
      const excerpt = (language === 'es' ? post.excerpt.es : post.excerpt.en).toLowerCase();
      const keywords = post.keywords.some((k) => k.toLowerCase().includes(q));
      if (!title.includes(q) && !excerpt.includes(q) && !keywords) {
        return false;
      }
    }
    return true;
  });

  return (
    <section id="blog-seo-section" className="py-12 sm:py-16 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-100 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded uppercase tracking-wider inline-flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                {language === 'es' ? 'Blog & Guía Gastronómica' : 'Food Blog & Guides'}
              </span>
              <span className="text-xs text-stone-500 font-semibold">
                {language === 'es' ? '10 Artículos Exclusivos' : '10 Exclusive Articles'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {language === 'es' 
                ? 'Secretos, Tradición y Guías del Kebab en La Zubia'
                : 'Secrets, Tradition & Kebab Guides in La Zubia'}
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-2xl">
              {language === 'es'
                ? 'Aprende sobre nuestra carne 100% Halal certificada, el origen de la salsa blanca casera, las diferencias entre durum y döner, y cómo pedir online con descuento y seguimiento en vivo.'
                : 'Discover our 100% certified Halal meat, homemade white sauce craft, durum vs döner differences, and how to order online with discounts and live tracking.'}
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-72 relative shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              id="blog-search-input"
              type="text"
              value={blogSearch}
              onChange={(e) => setBlogSearch(e.target.value)}
              placeholder={language === 'es' ? 'Buscar en artículos...' : 'Search articles...'}
              className="w-full bg-stone-100 border border-stone-200 rounded-lg pl-9 pr-4 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`blog-cat-btn-${cat.id}`}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 border border-stone-200'
              }`}
            >
              {language === 'es' ? cat.es : cat.en}
            </button>
          ))}
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const title = language === 'es' ? post.title.es : post.title.en;
            const excerpt = language === 'es' ? post.excerpt.es : post.excerpt.en;
            const category = language === 'es' ? post.category.es : post.category.en;

            return (
              <article
                key={post.id}
                id={`blog-card-${post.id}`}
                className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Image Cover */}
                <div 
                  className="relative h-48 bg-stone-100 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <img
                    src={post.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-60" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-amber-600/90 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs backdrop-blur-xs">
                    {category}
                  </span>

                  {/* Read time */}
                  <span className="absolute bottom-3 right-3 bg-stone-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur-xs">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {post.readTime}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Meta row */}
                    <div className="flex items-center gap-3 text-[11px] text-stone-500 font-medium mb-1.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-700" />
                        {post.date}
                      </span>
                      <span>·</span>
                      <span className="truncate">{post.author}</span>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => setSelectedPost(post)}
                      className="font-extrabold text-stone-900 text-base leading-snug group-hover:text-amber-800 transition-colors cursor-pointer"
                    >
                      {title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-stone-600 line-clamp-3 mt-2 leading-relaxed">
                      {excerpt}
                    </p>
                  </div>

                  {/* Tags & Action Button */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 overflow-hidden">
                      <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded truncate max-w-[120px]">
                        #{post.keywords[0]}
                      </span>
                      {post.keywords[1] && (
                        <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded truncate max-w-[120px] hidden sm:inline">
                          #{post.keywords[1]}
                        </span>
                      )}
                    </div>

                    <button
                      id={`read-post-btn-${post.id}`}
                      type="button"
                      onClick={() => setSelectedPost(post)}
                      className="inline-flex items-center gap-1 text-xs font-black text-amber-700 hover:text-amber-800 shrink-0 cursor-pointer"
                    >
                      <span>{language === 'es' ? 'Leer' : 'Read'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* Empty Search Result */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12 bg-stone-50 rounded-2xl border border-stone-200">
            <p className="text-sm font-bold text-stone-700">
              {language === 'es'
                ? 'No se encontraron artículos que coincidan con la búsqueda.'
                : 'No articles matched your search query.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setBlogSearch('');
              }}
              className="mt-3 text-xs font-bold text-amber-700 hover:underline cursor-pointer"
            >
              {language === 'es' ? 'Ver todos los artículos' : 'View all articles'}
            </button>
          </div>
        )}

      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <BlogDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onSelectDish={onSelectDish}
        />
      )}
    </section>
  );
};
