import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../data/menuData';
import { MenuItem } from '../types';
import { useStore } from '../context/StoreContext';
import { getLocalizedMenuItem } from '../i18n/translations';
import { ItemCustomizationModal } from './ItemCustomizationModal';
import { 
  Flame, 
  UtensilsCrossed, 
  Sandwich, 
  Soup, 
  Layers, 
  Salad, 
  Coffee,
  Plus
} from 'lucide-react';

interface MenuSectionProps {
  searchQuery?: string;
  selectedCategoryProp?: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ searchQuery = '', selectedCategoryProp = 'all' }) => {
  const { language, t } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategoryProp);
  const [filterHalalOnly, setFilterHalalOnly] = useState(false);
  const [filterPopularOnly, setFilterPopularOnly] = useState(false);
  const [filterVegetarianOnly, setFilterVegetarianOnly] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);

  const categories: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t('allMenu'), icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'menus', label: t('catMenus'), icon: <Flame className="w-4 h-4 text-amber-500" /> },
    { id: 'durums', label: t('catDurums'), icon: <Sandwich className="w-4 h-4 text-orange-500" /> },
    { id: 'platos', label: t('catPlatos'), icon: <Soup className="w-4 h-4 text-amber-600" /> },
    { id: 'burgers', label: t('catBurgers'), icon: <Layers className="w-4 h-4 text-red-500" /> },
    { id: 'especiales', label: t('catEspeciales'), icon: <Salad className="w-4 h-4 text-emerald-500" /> },
    { id: 'sides', label: t('catSides'), icon: <Coffee className="w-4 h-4 text-stone-500" /> },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category check
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;
      
      const localizedItem = getLocalizedMenuItem(item, language);

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = localizedItem.name.toLowerCase().includes(q) || item.name.toLowerCase().includes(q);
        const matchDesc = localizedItem.description.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
        const matchIng = item.ingredients?.some((ing) => ing.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchIng) return false;
      }

      // Filter flags
      if (filterHalalOnly && !item.isHalal) return false;
      if (filterPopularOnly && !item.isPopular) return false;
      if (filterVegetarianOnly && !item.isVegetarian) return false;

      return true;
    });
  }, [activeCategory, searchQuery, filterHalalOnly, filterPopularOnly, filterVegetarianOnly, language]);

  return (
    <section id="carta-menu" className="py-10 sm:py-14 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">
                {t('menuOfficialTag')}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                {t('menuPriceDifferenceNotice')}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {t('menuTitle')}
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-2xl">
              {t('menuSubtitle')}
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <button
              id="filter-popular-btn"
              type="button"
              onClick={() => setFilterPopularOnly(!filterPopularOnly)}
              className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                filterPopularOnly
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs font-bold'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
              }`}
            >
              🔥 {t('filterPopular')}
            </button>
            <button
              id="filter-veggie-btn"
              type="button"
              onClick={() => setFilterVegetarianOnly(!filterVegetarianOnly)}
              className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                filterVegetarianOnly
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs font-bold'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
              }`}
            >
              🌱 {t('filterVeggie')}
            </button>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-thin scrollbar-thumb-stone-300">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-tab-${cat.id}`}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-dashed border-stone-300 max-w-md mx-auto my-6">
            <UtensilsCrossed className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="font-bold text-stone-800 text-base">{t('noProductsFound')}</h3>
            <p className="text-stone-500 text-xs mt-1">
              {t('tryDifferentSearch')}
            </p>
            <button
              id="clear-filters-btn"
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setFilterHalalOnly(false);
                setFilterPopularOnly(false);
                setFilterVegetarianOnly(false);
              }}
              className="mt-4 bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              {t('viewAllMenu')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredItems.map((rawItem) => {
              const item = getLocalizedMenuItem(rawItem, language);
              return (
                <div
                  key={item.id}
                  id={`product-card-${item.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col group"
                >
                  {/* Item Image */}
                  <div className="relative h-48 bg-stone-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Badge top-left */}
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                      {item.isPopular && (
                        <span className="bg-amber-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs uppercase tracking-wide">
                          Popular
                        </span>
                      )}
                      {item.isHalal && (
                        <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wide">
                          Halal
                        </span>
                      )}
                      {item.isVegetarian && (
                        <span className="bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                          Veggie
                        </span>
                      )}
                    </div>

                    {/* Price Tag Pill */}
                    <div className="absolute bottom-2.5 right-2.5 bg-stone-900/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-right shadow-md border border-stone-700/50">
                      <span className="text-[10px] text-amber-300 block font-semibold leading-none">
                        {t('webPrice')}
                      </span>
                      <span className="text-sm font-black text-white leading-none">
                        {item.websitePrice.toFixed(2)} €
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 text-[11px] text-stone-200 font-medium">
                      {t('counterPrice')}: <span className="line-through text-stone-300">{item.flyerPrice.toFixed(2)} €</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-extrabold text-stone-900 text-base leading-snug group-hover:text-amber-700 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-stone-500 text-xs line-clamp-2 mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Options Preview Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] text-stone-600">
                      {item.options?.meats && (
                        <span className="bg-stone-100 border border-stone-200 px-2 py-0.5 rounded text-stone-700 font-medium">
                          {language === 'es' ? 'Pollo / Ternera / Mixto' : 'Chicken / Beef / Mixed'}
                        </span>
                      )}
                      {item.options?.drinks && (
                        <span className="bg-amber-50 border border-amber-200 text-amber-800 px-2 py-0.5 rounded font-semibold">
                          {language === 'es' ? '+ Patatas & Bebida' : '+ Fries & Drink'}
                        </span>
                      )}
                      {item.options?.sizes && (
                        <span className="bg-stone-100 border border-stone-200 px-2 py-0.5 rounded text-stone-700 font-medium">
                          {language === 'es' ? 'Varios Tamaños' : 'Multiple Sizes'}
                        </span>
                      )}
                    </div>

                    {/* Action button */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                      <div className="text-xs">
                        <span className="text-[10px] text-stone-400 block">{t('customizable')}</span>
                        <span className="font-black text-stone-900 text-base">
                          {item.websitePrice.toFixed(2)} €
                        </span>
                      </div>

                      <button
                        id={`btn-customize-${item.id}`}
                        type="button"
                        onClick={() => setSelectedItemForModal(rawItem)}
                        className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{t('customize')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Modal for item customizer */}
      <ItemCustomizationModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
      />
    </section>
  );
};
