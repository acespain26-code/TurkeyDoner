import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ShieldCheck, 
  AlertCircle, 
  Tag, 
  ChevronRight, 
  MapPin, 
  Store 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    deliveryMethod,
    setDeliveryMethod,
    promoCode,
    setPromoCode,
    discountAmount,
    deliveryFee,
    cartTotal,
    setIsCheckoutOpen,
    showToast,
    language,
    t,
  } = useStore();

  const [promoInput, setPromoInput] = useState(promoCode);
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const minOrder = RESTAURANT_INFO.deliveryMinOrder;
  const isBelowMinOrder = deliveryMethod === 'domicilio' && cartSubtotal < minOrder;
  const diffToMinOrder = Number((minOrder - cartSubtotal).toFixed(2));

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const code = promoInput.trim().toUpperCase();
    if (code === 'APP10') {
      setPromoCode('APP10');
      showToast(t('couponApplied'));
    } else if (!code) {
      setPromoCode('');
    } else {
      setPromoError(t('invalidCoupon'));
    }
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    if (isBelowMinOrder) {
      showToast(
        language === 'es'
          ? `Añade ${diffToMinOrder.toFixed(2)}€ más para el pedido mínimo a domicilio de ${minOrder.toFixed(2)}€`
          : `Add €${diffToMinOrder.toFixed(2)} more to reach the €${minOrder.toFixed(2)} delivery minimum`
      );
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between text-stone-900 border-l border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-stone-900 text-base">{t('yourOrder')}</h2>
              <p className="text-[11px] text-stone-500 font-medium">
                {cart.reduce((s, i) => s + i.quantity, 0)} {language === 'es' ? 'productos añadidos' : 'items added'}
              </p>
            </div>
          </div>

          <button
            id="close-cart-drawer-btn"
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Delivery Method Selector */}
        <div className="p-4 bg-stone-100/80 border-b border-stone-200 shrink-0">
          <div className="grid grid-cols-2 gap-2 p-1 bg-stone-200/80 rounded-xl">
            <button
              id="cart-delivery-home-btn"
              type="button"
              onClick={() => setDeliveryMethod('domicilio')}
              className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                deliveryMethod === 'domicilio'
                  ? 'bg-white text-amber-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{t('deliveryOption')}</span>
            </button>
            <button
              id="cart-delivery-pickup-btn"
              type="button"
              onClick={() => setDeliveryMethod('recogida')}
              className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                deliveryMethod === 'recogida'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>{t('pickupOption')}</span>
            </button>
          </div>

          {deliveryMethod === 'domicilio' && (
            <div className="mt-2 text-[11px] text-stone-600 flex items-center justify-between">
              <span>{language === 'es' ? 'Envío rápido La Zubia y cercanías' : 'Fast delivery to La Zubia & nearby'}</span>
              <span className="font-semibold text-amber-800">
                {language === 'es' ? `Mínimo: ${minOrder.toFixed(0)}€` : `Min: €${minOrder.toFixed(0)}`}
              </span>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
              <ShoppingBag className="w-12 h-12 text-stone-300 mb-3" />
              <p className="font-bold text-stone-700 text-sm">{t('emptyCart')}</p>
              <p className="text-xs text-stone-500 mt-1 max-w-xs">
                {t('emptyCartHint')}
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-4 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                {t('exploreMenuBtn')}
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-stone-50 border border-stone-200/80 rounded-xl p-3 flex gap-3 relative group"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-stone-200 shrink-0"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900 leading-tight">
                      {item.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-400 hover:text-red-600 p-0.5 rounded transition-colors cursor-pointer"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Customization pills */}
                  <div className="mt-1 space-y-0.5 text-[10px] text-stone-500">
                    {item.selectedSize && (
                      <p>
                        <span className="font-semibold text-stone-700">{language === 'es' ? 'Tamaño: ' : 'Size: '}</span>
                        {item.selectedSize}
                      </p>
                    )}
                    {item.selectedMeat && (
                      <p>
                        <span className="font-semibold text-stone-700">{language === 'es' ? 'Carne: ' : 'Meat: '}</span>
                        {item.selectedMeat}
                      </p>
                    )}
                    {item.selectedSauces && item.selectedSauces.length > 0 && (
                      <p>
                        <span className="font-semibold text-stone-700">{language === 'es' ? 'Salsas: ' : 'Sauces: '}</span>
                        {item.selectedSauces.join(', ')}
                      </p>
                    )}
                    {item.selectedDrink && (
                      <p>
                        <span className="font-semibold text-stone-700">{language === 'es' ? 'Bebida: ' : 'Drink: '}</span>
                        {item.selectedDrink}
                      </p>
                    )}
                    {item.selectedExtras && item.selectedExtras.length > 0 && (
                      <p className="text-amber-800 font-medium">
                        <span className="font-semibold">{language === 'es' ? 'Extras: ' : 'Extras: '}</span>
                        {item.selectedExtras.join(', ')}
                      </p>
                    )}
                    {item.customNotes && (
                      <p className="italic text-stone-600 bg-amber-50/80 px-1.5 py-0.5 rounded border border-amber-200/50">
                        "{item.customNotes}"
                      </p>
                    )}
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-200/60">
                    <span className="font-black text-stone-900 text-xs sm:text-sm">
                      {item.totalPrice.toFixed(2)} €
                    </span>

                    <div className="flex items-center border border-stone-300 rounded-lg bg-white shadow-2xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-l-lg cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-bold text-xs text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-r-lg cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Min Order Warning */}
          {isBelowMinOrder && (
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">
                  {language === 'es' 
                    ? `Faltan ${diffToMinOrder.toFixed(2)} € para el pedido mínimo`
                    : `€${diffToMinOrder.toFixed(2)} needed to reach minimum order`}
                </p>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  {language === 'es'
                    ? `El pedido mínimo para entrega a domicilio en La Zubia es de ${minOrder.toFixed(2)} €. O selecciona "Recogida en local".`
                    : `The minimum order for home delivery in La Zubia is €${minOrder.toFixed(2)}. Or choose "Store Pickup".`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Promo code form */}
        {cart.length > 0 && (
          <div className="p-3 bg-stone-50 border-t border-stone-200 shrink-0">
            <form onSubmit={applyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  id="promo-code-input"
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder={language === 'es' ? 'Cupón (ej: APP10 para -10%)' : 'Promo code (e.g. APP10 for -10%)'}
                  className="w-full bg-white border border-stone-300 rounded-lg pl-8 pr-2 py-1.5 text-xs text-stone-800 placeholder-stone-400 uppercase font-semibold"
                />
              </div>
              <button
                id="apply-promo-btn"
                type="submit"
                className="bg-stone-800 hover:bg-stone-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
              >
                {language === 'es' ? 'Aplicar' : 'Apply'}
              </button>
            </form>
            {promoError && <p className="text-[11px] text-red-600 mt-1">{promoError}</p>}
            {discountAmount > 0 && (
              <p className="text-[11px] text-emerald-700 font-bold mt-1">
                ✓ {language === 'es' ? `Cupón aplicado: -${discountAmount.toFixed(2)} € (10% descuento)` : `Coupon applied: -€${discountAmount.toFixed(2)} (10% discount)`}
              </p>
            )}
          </div>
        )}

        {/* Drawer Footer / Summary & Checkout */}
        <div className="p-4 bg-white border-t border-stone-200 shrink-0 space-y-3">
          <div className="space-y-1 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>{t('subtotal')}</span>
              <span>{cartSubtotal.toFixed(2)} €</span>
            </div>

            <div className="flex justify-between">
              <span>{t('deliveryFee')} {deliveryMethod === 'domicilio' ? '(+1€)' : '(Recogida / Pickup)'}</span>
              <span>{deliveryFee.toFixed(2)} €</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>{language === 'es' ? 'Descuento APP10' : 'Discount APP10'}</span>
                <span>-{discountAmount.toFixed(2)} €</span>
              </div>
            )}

            <div className="flex justify-between text-sm font-black text-stone-900 pt-1.5 border-t border-stone-200">
              <span>{t('total')}</span>
              <span className="text-base text-amber-700">{cartTotal.toFixed(2)} €</span>
            </div>
          </div>

          <button
            id="proceed-checkout-btn"
            type="button"
            onClick={handleProceedToCheckout}
            disabled={cart.length === 0 || isBelowMinOrder}
            className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-between transition-all shadow-md cursor-pointer ${
              cart.length === 0 || isBelowMinOrder
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                : 'bg-amber-700 hover:bg-amber-800 text-white active:scale-[0.99]'
            }`}
          >
            <span>
              {isBelowMinOrder 
                ? (language === 'es' ? `Falta ${diffToMinOrder.toFixed(2)}€ para mín.` : `€${diffToMinOrder.toFixed(2)} below min.`)
                : t('continueToCheckout')}
            </span>
            <div className="flex items-center gap-1 font-extrabold">
              <span>{cartTotal.toFixed(2)} €</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('sslSecureBadge')}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
