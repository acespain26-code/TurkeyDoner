import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  Banknote, 
  User, 
  Mail, 
  ChevronRight, 
  MapPin, 
  Loader2 
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    cartSubtotal,
    deliveryFee,
    discountAmount,
    deliveryMethod,
    user,
    setUser,
    createOrder,
    setIsTrackingOpen,
    showToast,
    language,
    t,
  } = useStore();

  // Form Fields
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city || 'La Zubia (Granada)');
  const [orderNotes, setOrderNotes] = useState('');
  
  // Payment selection
  const [paymentMethod, setPaymentMethod] = useState<'tarjeta' | 'bizum' | 'google_apple_pay' | 'efectivo'>('tarjeta');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8841');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('739');
  const [bizumPhone, setBizumPhone] = useState(user.phone);
  const [cashChange, setCashChange] = useState('exacto');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim()) {
      showToast(language === 'es' ? 'Por favor completa tu nombre, teléfono y correo' : 'Please complete your name, phone and email');
      return;
    }

    if (deliveryMethod === 'domicilio' && !address.trim()) {
      showToast(language === 'es' ? 'Por favor introduce tu dirección para la entrega en La Zubia' : 'Please enter your delivery address in La Zubia');
      return;
    }

    setIsProcessing(true);
    setProcessingStep(language === 'es' ? 'Validando datos del pedido y existencias...' : 'Validating order details and stock...');

    // Save updated contact info in profile
    setUser((prev) => ({
      ...prev,
      name,
      email,
      phone,
      address,
      city,
    }));

    setTimeout(() => {
      setProcessingStep(
        paymentMethod === 'tarjeta'
          ? (language === 'es' ? 'Conectando con la pasarela bancaria segura (3D-Secure)...' : 'Connecting to secure bank gateway (3D-Secure)...')
          : paymentMethod === 'bizum'
          ? (language === 'es' ? 'Enviando solicitud Bizum a tu teléfono...' : 'Sending Bizum push request to your phone...')
          : (language === 'es' ? 'Confirmando pedido en el sistema de cocina de Calle Greco 2...' : 'Confirming order in Calle Greco 2 kitchen system...')
      );
    }, 900);

    setTimeout(() => {
      setProcessingStep(language === 'es' ? 'Emitiendo factura y enviando confirmación por email...' : 'Issuing invoice and sending confirmation email...');
    }, 1800);

    setTimeout(() => {
      const fullDeliveryAddress = deliveryMethod === 'domicilio' 
        ? `${address}, ${city}` 
        : (language === 'es' ? 'Recogida en local (Calle Greco Nº 2)' : 'Pickup in store (Calle Greco No. 2)');

      createOrder({
        customerName: name,
        email,
        phone,
        deliveryMethod,
        deliveryAddress: fullDeliveryAddress,
        orderNotes: orderNotes.trim() || undefined,
        paymentMethod,
      });

      setIsProcessing(false);
      setIsCheckoutOpen(false);
      setIsTrackingOpen(true);
    }, 2700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 text-stone-900 my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-stone-900 text-base">{t('checkoutTitle')}</h2>
              <p className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {t('checkoutSubtitle')}
              </p>
            </div>
          </div>

          {!isProcessing && (
            <button
              id="close-checkout-modal-btn"
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Processing Spinner Overlay */}
        {isProcessing ? (
          <div className="p-12 text-center space-y-4 my-auto">
            <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto" />
            <div className="space-y-1">
              <h3 className="font-bold text-stone-900 text-base">{t('processingPayment')}</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto animate-pulse">
                {processingStep}
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {language === 'es' ? 'Operación Bancaria Verificada' : 'Verified Banking Operation'}
            </div>
          </div>
        ) : (
          /* Form Body */
          <form onSubmit={handleSubmitOrder} className="overflow-y-auto p-4 sm:p-6 space-y-5 text-xs sm:text-sm">
            
            {/* Step 1: Delivery Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
                <h3 className="font-extrabold text-stone-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-700" />
                  {t('step1CustomerDetails')}
                </h3>
                <span className="text-[11px] font-bold text-amber-700">
                  {deliveryMethod === 'domicilio' ? `🛵 ${t('deliveryOption')}` : `🏪 ${t('pickupOption')}`}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-700 block">{t('fullName')} *</label>
                  <input
                    id="checkout-name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'es' ? 'Tu nombre y apellidos' : 'Your full name'}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-700 block">{t('phone')} *</label>
                  <input
                    id="checkout-phone-input"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej: 641 271 079"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-stone-700 block">
                  {t('email')} *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    id="checkout-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu.email@ejemplo.com"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-8 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                  />
                </div>
              </div>

              {deliveryMethod === 'domicilio' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[11px] font-semibold text-stone-700 block">{t('address')} *</label>
                    <input
                      id="checkout-address-input"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={language === 'es' ? 'Calle, número, piso y puerta' : 'Street name, number, floor, door'}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-stone-700 block">{t('cityZone')}</label>
                    <input
                      id="checkout-city-input"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="La Zubia (Granada)"
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs text-stone-900"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                  <div>
                    <span className="font-bold">{language === 'es' ? 'Punto de recogida: ' : 'Pickup location: '}</span>
                    {RESTAURANT_INFO.address}, {RESTAURANT_INFO.city} ({t('landmark')}).
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-stone-700 block">
                  {t('kitchenNotes')}
                </label>
                <input
                  id="checkout-notes-input"
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder={language === 'es' ? 'Ej: Timbre averiado, llamar al llegar o salsa blanca extra...' : 'E.g. Doorbell broken, call upon arrival, extra garlic sauce...'}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                />
              </div>
            </div>

            {/* Step 2: Payment Gateway Selection */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
                <h3 className="font-extrabold text-stone-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-amber-700" />
                  {t('step2PaymentGateway')}
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  {language === 'es' ? 'Seguro y Encriptado' : 'Encrypted & Secure'}
                </span>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('tarjeta')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    paymentMethod === 'tarjeta'
                      ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-600/20'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-amber-700" />
                  <span className="font-bold text-xs">{t('cardPayment')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bizum')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    paymentMethod === 'bizum'
                      ? 'border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-600/20'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-teal-600" />
                  <span className="font-bold text-xs">{t('bizumPayment')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('google_apple_pay')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    paymentMethod === 'google_apple_pay'
                      ? 'border-stone-900 bg-stone-100 text-stone-900 ring-2 ring-stone-900/20'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <span className="text-xs font-black">G Pay / Apple</span>
                  <span className="text-[10px] text-stone-500">{language === 'es' ? '1 Toque' : '1-Tap'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('efectivo')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    paymentMethod === 'efectivo'
                      ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-600/20'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-xs">{t('cashPayment')}</span>
                </button>
              </div>

              {/* Payment Details Subform */}
              {paymentMethod === 'tarjeta' && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-stone-700 block">{language === 'es' ? 'Número de Tarjeta' : 'Card Number'}</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full bg-white border border-stone-300 rounded-lg pl-3 pr-10 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-extrabold text-stone-400">
                        VISA/MC
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-stone-700 block">{language === 'es' ? 'Caducidad' : 'Expiry'}</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/AA"
                        className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs font-mono text-stone-900"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-stone-700 block">CVV / CVC</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs font-mono text-stone-900"
                      />
                    </div>
                  </div>

                  <p className="text-[10px] text-stone-500 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    {language === 'es' 
                      ? 'Pasarela bancaria con autenticación reforzada PSD2 y 3D Secure.' 
                      : 'Banking gateway with PSD2 Strong Customer Authentication and 3D Secure.'}
                  </p>
                </div>
              )}

              {paymentMethod === 'bizum' && (
                <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-3.5 space-y-2">
                  <label className="text-[11px] font-semibold text-teal-900 block">
                    {language === 'es' ? 'Número de Teléfono para Bizum' : 'Bizum Phone Number'}
                  </label>
                  <input
                    type="tel"
                    value={bizumPhone}
                    onChange={(e) => setBizumPhone(e.target.value)}
                    placeholder="600 000 000"
                    className="w-full bg-white border border-teal-300 rounded-lg p-2 text-xs font-mono text-stone-900"
                  />
                  <p className="text-[11px] text-teal-800">
                    {language === 'es' 
                      ? `Recibirás una notificación instantánea en tu app bancaria para autorizar ${cartTotal.toFixed(2)} €.`
                      : `You will receive an instant notification in your banking app to authorize €${cartTotal.toFixed(2)}.`}
                  </p>
                </div>
              )}

              {paymentMethod === 'google_apple_pay' && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-center space-y-2">
                  <p className="text-xs text-stone-700">
                    {language === 'es'
                      ? 'Se utilizará tu método de pago por defecto en Google Wallet o Apple Pay con autenticación biométrica (Huella / Face ID).'
                      : 'Your default payment method in Google Wallet or Apple Pay will be used with biometric authentication (Fingerprint / Face ID).'}
                  </p>
                </div>
              )}

              {paymentMethod === 'efectivo' && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-2">
                  <label className="text-[11px] font-semibold text-stone-800 block">
                    {language === 'es' ? '¿Necesitas que el repartidor lleve cambio?' : 'Do you need the courier to bring change?'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['exacto', '20€', '50€'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setCashChange(opt)}
                        className={`py-1.5 px-2 rounded-lg border text-xs font-semibold cursor-pointer ${
                          cashChange === opt
                            ? 'bg-amber-100 border-amber-600 text-amber-900'
                            : 'bg-white border-stone-300 text-stone-700'
                        }`}
                      >
                        {opt === 'exacto' 
                          ? (language === 'es' ? 'Pago Justo' : 'Exact Amount') 
                          : `${language === 'es' ? 'Cambio de' : 'Change for'} ${opt}`}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Order Summary Table */}
            <div className="bg-stone-100/80 rounded-xl p-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>{t('subtotal')} ({cart.reduce((s, i) => s + i.quantity, 0)} {language === 'es' ? 'artículos' : 'items'})</span>
                <span>{cartSubtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>{t('deliveryFee')} ({deliveryMethod === 'domicilio' ? '+1€' : 'Local'})</span>
                <span>{deliveryFee.toFixed(2)} €</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>{language === 'es' ? 'Descuento Promoción' : 'Promotion Discount'}</span>
                  <span>-{discountAmount.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-stone-900 pt-1 border-t border-stone-200">
                <span>{t('total')}</span>
                <span className="text-amber-700 text-base">{cartTotal.toFixed(2)} €</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                id="submit-order-payment-btn"
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 px-5 rounded-xl text-sm flex items-center justify-between shadow-lg shadow-emerald-700/20 active:scale-[0.99] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>{t('payAndConfirm')}</span>
                </div>
                <div className="flex items-center gap-1 text-base">
                  <span>{cartTotal.toFixed(2)} €</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
              
              <p className="text-center text-[10px] text-stone-400 mt-2">
                {language === 'es' 
                  ? 'Al confirmar, recibirás automáticamente la confirmación y seguimiento en tu email.'
                  : 'Upon confirmation, you will automatically receive email confirmation and tracking.'}
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
