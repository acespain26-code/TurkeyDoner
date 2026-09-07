import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types';
import { useStore } from '../context/StoreContext';
import { getLocalizedMenuItem } from '../i18n/translations';
import { X, Plus, Minus, Check, ShieldCheck } from 'lucide-react';

interface ItemCustomizationModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemCustomizationModal: React.FC<ItemCustomizationModalProps> = ({ item, onClose }) => {
  const { addToCart, language, t } = useStore();

  if (!item) return null;

  const localized = getLocalizedMenuItem(item, language);

  const [selectedSizeName, setSelectedSizeName] = useState<string | undefined>(
    item.options?.sizes ? item.options.sizes[0].name : undefined
  );
  const [selectedMeat, setSelectedMeat] = useState<string | undefined>(
    item.options?.meats ? item.options.meats[0] : undefined
  );
  const [selectedSauces, setSelectedSauces] = useState<string[]>(
    item.options?.sauces ? [item.options.sauces[0]] : []
  );
  const [selectedDrink, setSelectedDrink] = useState<string | undefined>(
    item.options?.drinks ? item.options.drinks[0] : undefined
  );
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Compute base price from size if applicable
  const currentSizeObj = item.options?.sizes?.find((s) => s.name === selectedSizeName);
  const baseItemPrice = currentSizeObj ? currentSizeObj.websitePrice : item.websitePrice;

  // Extras delta
  const extrasCost = selectedExtras.reduce((sum, extraName) => {
    const found = item.options?.extras?.find((e) => e.name === extraName);
    return sum + (found ? found.price : 0);
  }, 0);

  const unitPrice = Number((baseItemPrice + extrasCost).toFixed(2));
  const totalPrice = Number((unitPrice * quantity).toFixed(2));

  const toggleSauce = (sauce: string) => {
    if (selectedSauces.includes(sauce)) {
      setSelectedSauces(selectedSauces.filter((s) => s !== sauce));
    } else {
      setSelectedSauces([...selectedSauces, sauce]);
    }
  };

  const toggleExtra = (extraName: string) => {
    if (selectedExtras.includes(extraName)) {
      setSelectedExtras(selectedExtras.filter((e) => e !== extraName));
    } else {
      setSelectedExtras([...selectedExtras, extraName]);
    }
  };

  const handleAdd = () => {
    const cartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: localized.name,
      basePrice: unitPrice,
      quantity,
      selectedMeat,
      selectedSauces: selectedSauces.length > 0 ? selectedSauces : undefined,
      selectedDrink,
      selectedSize: selectedSizeName,
      selectedExtras: selectedExtras.length > 0 ? selectedExtras : undefined,
      customNotes: customNotes.trim() || undefined,
      totalPrice,
      image: item.image,
    };

    addToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 my-auto text-stone-900 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative h-48 sm:h-56 bg-stone-900 shrink-0">
          <img
            src={item.image}
            alt={localized.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> 100% Halal
              </span>
              <span className="bg-amber-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {t('menuOfficialTag')}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black leading-snug drop-shadow-sm">
              {localized.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-stone-300 mt-0.5">
              <span>{t('counterPrice')}: {item.flyerPrice.toFixed(2)} €</span>
              <span>•</span>
              <span className="text-amber-300 font-extrabold text-sm">{t('webPrice')}: {unitPrice.toFixed(2)} €</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 text-sm">
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            {localized.description}
          </p>

          {/* Size Options (if any) */}
          {item.options?.sizes && (
            <div className="space-y-2">
              <label className="font-bold text-stone-800 text-xs uppercase tracking-wider block">
                {language === 'es' ? 'Selecciona Tamaño:' : 'Select Size:'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {item.options.sizes.map((size) => (
                  <button
                    key={size.name}
                    type="button"
                    onClick={() => setSelectedSizeName(size.name)}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                      selectedSizeName === size.name
                        ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-600/20'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <span className="block">{size.name}</span>
                    <span className="block font-bold text-stone-900 mt-0.5">{size.websitePrice.toFixed(2)} €</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Meat Option */}
          {item.options?.meats && (
            <div className="space-y-2">
              <label className="font-bold text-stone-800 text-xs uppercase tracking-wider block">
                {language === 'es' ? 'Elige tu Carne:' : 'Choose your Meat:'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {item.options.meats.map((meat) => (
                  <button
                    key={meat}
                    type="button"
                    onClick={() => setSelectedMeat(meat)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      selectedMeat === meat
                        ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-600/20'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <span>
                      {language === 'en' 
                        ? (meat === 'Pollo' ? 'Chicken' : meat === 'Ternera' ? 'Beef' : meat === 'Mixto' ? 'Mixed' : meat)
                        : meat}
                    </span>
                    {selectedMeat === meat && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sauces Selection */}
          {item.options?.sauces && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-stone-800 text-xs uppercase tracking-wider">
                  {language === 'es' ? 'Elige tus Salsas (Gratis):' : 'Choose your Sauces (Free):'}
                </label>
                <span className="text-[11px] text-stone-500">
                  {language === 'es' ? 'Puedes elegir varias' : 'Select multiple'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {item.options.sauces.map((sauce) => {
                  const isChecked = selectedSauces.includes(sauce);
                  const sauceLabel = language === 'en'
                    ? (sauce === 'Salsa Blanca (Yogur casero)' ? 'White Sauce (Garlic yogurt)'
                      : sauce === 'Picante suave' ? 'Mild Spicy'
                      : sauce === 'Picante fuerte' ? 'Hot Spicy'
                      : sauce === 'Mayonesa' ? 'Mayonnaise'
                      : sauce === 'Ketchup' ? 'Ketchup'
                      : sauce === 'Barbacoa' ? 'BBQ Sauce'
                      : sauce)
                    : sauce;

                  return (
                    <button
                      key={sauce}
                      type="button"
                      onClick={() => toggleSauce(sauce)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'border-amber-600 bg-amber-50 text-amber-900'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      <span className="truncate">{sauceLabel}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Drink Selection for Menús */}
          {item.options?.drinks && (
            <div className="space-y-2">
              <label className="font-bold text-stone-800 text-xs uppercase tracking-wider block">
                {language === 'es' ? 'Bebida 330ml Incluida:' : '330ml Drink Included:'}
              </label>
              <select
                value={selectedDrink}
                onChange={(e) => setSelectedDrink(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
              >
                {item.options.drinks.map((drink) => (
                  <option key={drink} value={drink}>
                    🥤 {drink}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Extras Selection */}
          {item.options?.extras && (
            <div className="space-y-2">
              <label className="font-bold text-stone-800 text-xs uppercase tracking-wider block">
                {language === 'es' ? 'Extras para Personalizar:' : 'Extras & Add-ons:'}
              </label>
              <div className="space-y-1.5">
                {item.options.extras.map((extra) => {
                  const isSelected = selectedExtras.includes(extra.name);
                  const extraLabel = language === 'en'
                    ? (extra.name === 'Queso' ? 'Cheese'
                      : extra.name === 'Huevo' ? 'Fried Egg'
                      : extra.name === 'Extra Carne' ? 'Extra Meat'
                      : extra.name === 'Patatas dentro' ? 'Fries inside'
                      : extra.name === 'Mozzarella gratinada' ? 'Gratinated Mozzarella'
                      : extra.name)
                    : extra.name;

                  return (
                    <button
                      key={extra.name}
                      type="button"
                      onClick={() => toggleExtra(extra.name)}
                      className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50 text-amber-900'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded flex items-center justify-center border ${isSelected ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-300'}`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </span>
                        {extraLabel}
                      </span>
                      <span className="font-bold text-stone-900">+{extra.price.toFixed(2)} €</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Notes / Intolerances */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-800 text-xs uppercase tracking-wider block">
              {language === 'es' ? 'Notas para la cocina (opcional):' : 'Kitchen instructions (optional):'}
            </label>
            <input
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder={language === 'es' ? 'Ej: sin cebolla, mucha salsa blanca, picante aparte...' : 'E.g. no onions, extra white sauce, spicy on the side...'}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
            />
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 shrink-0 flex items-center justify-between gap-3">
          {/* Quantity selector */}
          <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 flex items-center justify-center text-stone-600 hover:text-stone-900 active:bg-stone-100 rounded-l-xl transition-colors cursor-pointer"
              disabled={quantity <= 1}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-bold text-sm text-stone-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 flex items-center justify-center text-stone-600 hover:text-stone-900 active:bg-stone-100 rounded-r-xl transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add button */}
          <button
            id="modal-add-to-cart-btn"
            type="button"
            onClick={handleAdd}
            className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-black py-2.5 px-4 rounded-xl text-sm flex items-center justify-between shadow-md shadow-amber-900/10 active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>{t('addToOrder')}</span>
            <span>{totalPrice.toFixed(2)} €</span>
          </button>
        </div>
      </div>
    </div>
  );
};
