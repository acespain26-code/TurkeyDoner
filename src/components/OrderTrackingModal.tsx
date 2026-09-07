import React from 'react';
import { useStore } from '../context/StoreContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { 
  X, 
  Bike, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Mail, 
  RefreshCw, 
  Star,
  Store
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const {
    isTrackingOpen,
    setIsTrackingOpen,
    activeOrder,
    simulateNextStatus,
    setIsEmailModalOpen,
    setIsReviewModalOpen,
    language,
    t,
  } = useStore();

  if (!isTrackingOpen || !activeOrder) return null;

  const statusIndex = 
    activeOrder.status === 'recibido' ? 1 :
    activeOrder.status === 'preparando' ? 2 :
    activeOrder.status === 'en_camino' ? 3 : 4;

  const progressPercent = 
    activeOrder.status === 'recibido' ? 25 :
    activeOrder.status === 'preparando' ? 55 :
    activeOrder.status === 'en_camino' ? 85 : 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 text-stone-900 my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base tracking-tight">
                  {t('trackingTitle')} #{activeOrder.id}
                </h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {activeOrder.deliveryMethod === 'domicilio' ? t('deliveryOption') : t('pickupOption')}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                {t('estimatedDelivery')}: <span className="text-amber-300 font-bold">{activeOrder.estimatedDeliveryTime}</span>
              </p>
            </div>
          </div>

          <button
            id="close-tracking-modal-btn"
            type="button"
            onClick={() => setIsTrackingOpen(false)}
            className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 text-xs sm:text-sm">
          
          {/* Progress Bar & Status Pill */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  {language === 'es' ? 'Estado Actual' : 'Current Status'}
                </span>
                <span className="text-base font-black text-amber-900">
                  {activeOrder.status === 'recibido' && (language === 'es' ? 'Pedido Recibido y Confirmado' : 'Order Received & Confirmed')}
                  {activeOrder.status === 'preparando' && (language === 'es' ? '🔥 En Cocina: Preparando en el Asador' : '🔥 In Kitchen: Slicing from the Rotisserie')}
                  {activeOrder.status === 'en_camino' && (language === 'es' ? '🛵 En Reparto con Mustafa en Moto' : '🛵 Out for Delivery with Courier on Scooter')}
                  {activeOrder.status === 'entregado' && (language === 'es' ? '🎉 ¡Pedido Entregado con Éxito!' : '🎉 Order Delivered Successfully!')}
                </span>
              </div>

              {/* Status advancement test button */}
              {activeOrder.status !== 'entregado' && (
                <button
                  id="advance-status-btn"
                  type="button"
                  onClick={() => simulateNextStatus(activeOrder.id)}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 text-[11px] font-bold px-2.5 py-1.5 rounded-lg shadow-2xs transition-colors cursor-pointer"
                  title={language === 'es' ? 'Simular el siguiente paso de la entrega y el correo automático' : 'Advance to next delivery status & test email'}
                >
                  <RefreshCw className="w-3 h-3 text-amber-600" />
                  <span>{language === 'es' ? 'Avanzar Estado (Demo)' : 'Advance Status (Demo)'}</span>
                </button>
              )}
            </div>

            {/* Stepper Bar */}
            <div className="relative pt-2">
              <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-600 to-emerald-600 transition-all duration-700 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="grid grid-cols-4 text-center mt-3 text-[10px] sm:text-xs font-semibold text-stone-600 gap-1">
                <div className={statusIndex >= 1 ? 'text-amber-800 font-bold' : 'text-stone-400'}>
                  1. {t('statusConfirmed')}
                </div>
                <div className={statusIndex >= 2 ? 'text-amber-800 font-bold' : 'text-stone-400'}>
                  2. {t('statusPreparing')}
                </div>
                <div className={statusIndex >= 3 ? 'text-amber-800 font-bold' : 'text-stone-400'}>
                  3. {t('statusOnWay')}
                </div>
                <div className={statusIndex >= 4 ? 'text-emerald-700 font-bold' : 'text-stone-400'}>
                  4. {t('statusDelivered')}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Simulation */}
          <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 shadow-md">
            {/* SVG stylised map of La Zubia */}
            <div className="relative h-48 sm:h-56 w-full bg-[#1c2430] p-4 flex flex-col justify-between overflow-hidden">
              
              {/* Map grid lines simulation */}
              <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#64748b" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Route line */}
                <path 
                  d="M 60 140 Q 180 80, 320 110 T 520 70" 
                  fill="none" 
                  stroke="#d97706" 
                  strokeWidth="4" 
                  strokeDasharray="6 4"
                />
              </svg>

              {/* Origin Marker (Restaurant at Calle Greco 2) */}
              <div className="absolute left-10 bottom-8 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-white shadow-lg animate-pulse">
                  <Store className="w-4 h-4" />
                </div>
                <span className="bg-stone-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded mt-1 shadow border border-stone-700">
                  Calle Greco Nº 2 (Turki-Pollito)
                </span>
              </div>

              {/* Destination Marker */}
              <div className="absolute right-10 top-6 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white shadow-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="bg-stone-900/90 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded mt-1 shadow border border-stone-700">
                  {language === 'es' ? 'Tu dirección en La Zubia' : 'Your address in La Zubia'}
                </span>
              </div>

              {/* Animated Scooter in transit */}
              {activeOrder.status === 'en_camino' && (
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 bg-amber-500 text-stone-950 px-2.5 py-1 rounded-full text-xs font-black shadow-xl animate-bounce"
                >
                  <Bike className="w-4 h-4" />
                  <span>{language === 'es' ? 'Mustafa en ruta (12 min)' : 'Courier on route (12 min)'}</span>
                </div>
              )}

              {/* Map Info overlay bar */}
              <div className="relative z-10 flex items-center justify-between text-xs text-stone-300 bg-stone-950/80 px-3 py-1.5 rounded-lg border border-stone-800 backdrop-blur-xs">
                <span>📍 {language === 'es' ? 'Ruta Calle Greco 2 ➔ La Zubia' : 'Route Calle Greco 2 ➔ La Zubia'}</span>
                <span className="text-amber-400 font-bold">{language === 'es' ? 'Reparto activo' : 'Active delivery'}</span>
              </div>

              <div className="relative z-10 self-end text-[10px] text-stone-400">
                Coordenadas La Zubia · 37.1206° N, 3.5852° W
              </div>
            </div>

            {/* Driver Contact & Info Bar */}
            <div className="p-3 bg-stone-850 text-white flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center text-amber-400 font-bold text-sm">
                  M
                </div>
                <div>
                  <div className="font-bold">{activeOrder.driverName || 'Repartidor Turki-Pollito'}</div>
                  <div className="text-[11px] text-stone-400">
                    {language === 'es' ? 'Vehículo: Moto de reparto oficial' : 'Vehicle: Official delivery scooter'}
                  </div>
                </div>
              </div>

              <a
                href={`tel:${(activeOrder.driverPhone || '641271079').replace(/\s/g, '')}`}
                className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-black px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Llamar al repartidor' : 'Call Courier'}</span>
              </a>
            </div>
          </div>

          {/* Timeline Events List */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-stone-800 text-xs uppercase tracking-wider">
              {language === 'es' ? 'Historial de Estados y Notificaciones' : 'Status & Notifications History'}
            </h3>
            <div className="border border-stone-200 rounded-xl divide-y divide-stone-100 overflow-hidden">
              {activeOrder.timeline.map((event, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 flex items-start gap-3 text-xs ${
                    event.completed ? 'bg-white' : 'bg-stone-50/70 opacity-60'
                  }`}
                >
                  <div className={`mt-0.5 ${event.completed ? 'text-emerald-600' : 'text-stone-300'}`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${event.completed ? 'text-stone-900' : 'text-stone-500'}`}>
                        {event.label}
                      </span>
                      <span className="text-[11px] text-stone-400 font-mono">
                        {event.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Items Summary in this Order */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-stone-800 text-xs uppercase tracking-wider">
              {language === 'es' ? 'Resumen de Productos' : 'Items Summary'} ({activeOrder.items.length})
            </h3>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-2 text-xs">
              {activeOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start pb-1.5 border-b border-stone-200/60 last:border-b-0 last:pb-0">
                  <div>
                    <span className="font-bold text-stone-800">{item.quantity}x {item.name}</span>
                    {item.selectedMeat && <span className="text-stone-500 block text-[11px]">{language === 'es' ? 'Carne: ' : 'Meat: '}{item.selectedMeat}</span>}
                    {item.selectedSauces && <span className="text-stone-500 block text-[11px]">{language === 'es' ? 'Salsas: ' : 'Sauces: '}{item.selectedSauces.join(', ')}</span>}
                    {item.selectedDrink && <span className="text-stone-500 block text-[11px]">{language === 'es' ? 'Bebida: ' : 'Drink: '}{item.selectedDrink}</span>}
                  </div>
                  <span className="font-bold text-stone-900">{item.totalPrice.toFixed(2)} €</span>
                </div>
              ))}

              <div className="pt-2 border-t border-stone-200 flex justify-between font-black text-stone-900 text-sm">
                <span>{language === 'es' ? 'Total Abonado' : 'Total Paid'}</span>
                <span className="text-amber-700">{activeOrder.total.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              id="view-email-confirmation-btn"
              type="button"
              onClick={() => {
                setIsTrackingOpen(false);
                setIsEmailModalOpen(true);
              }}
              className="flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold p-3 rounded-xl border border-stone-300 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4 text-amber-700" />
              <span>{language === 'es' ? 'Ver Email de Confirmación' : 'View Confirmation Email'}</span>
            </button>

            {activeOrder.status === 'entregado' ? (
              <button
                id="rate-experience-btn"
                type="button"
                onClick={() => {
                  setIsTrackingOpen(false);
                  setIsReviewModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-black p-3 rounded-xl transition-colors cursor-pointer"
              >
                <Star className="w-4 h-4 fill-stone-950" />
                <span>{language === 'es' ? 'Valorar Experiencia / Reseña' : 'Rate Experience / Review'}</span>
              </button>
            ) : (
              <a
                id="call-restaurant-tracking-btn"
                href={`tel:${RESTAURANT_INFO.phones[0]}`}
                className="flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold p-3 rounded-xl transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{language === 'es' ? 'Contactar con el Local (958 890 208)' : 'Call Restaurant (958 890 208)'}</span>
              </a>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
