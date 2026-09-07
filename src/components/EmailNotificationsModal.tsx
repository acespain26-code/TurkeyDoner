import React from 'react';
import { useStore } from '../context/StoreContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { 
  X, 
  Mail, 
  CheckCheck, 
  Bike, 
  ShieldCheck
} from 'lucide-react';

export const EmailNotificationsModal: React.FC = () => {
  const {
    isEmailModalOpen,
    setIsEmailModalOpen,
    emails,
    selectedEmail,
    setSelectedEmail,
    markEmailsAsRead,
    setIsTrackingOpen,
    setActiveOrderById,
    language,
    t,
  } = useStore();

  if (!isEmailModalOpen) return null;

  const currentEmail = selectedEmail || emails[0] || null;

  const handleOpenEmail = (email: typeof emails[0]) => {
    setSelectedEmail(email);
  };

  const handleTrackFromEmail = (orderId: string) => {
    setActiveOrderById(orderId);
    setIsEmailModalOpen(false);
    setIsTrackingOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 text-stone-900 my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-stone-900 text-base">
                {t('emailModalTitle')}
              </h2>
              <p className="text-[11px] text-stone-500 font-medium">
                {t('emailModalSubtitle')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="mark-emails-read-btn"
              type="button"
              onClick={markEmailsAsRead}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-stone-200 cursor-pointer"
              title={language === 'es' ? 'Marcar todos como leídos' : 'Mark all as read'}
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">{t('markAllAsRead')}</span>
            </button>

            <button
              id="close-email-modal-btn"
              type="button"
              onClick={() => setIsEmailModalOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Master-Detail Email Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden min-h-[440px]">
          
          {/* Left: Email list */}
          <div className="md:col-span-5 border-r border-stone-200 overflow-y-auto divide-y divide-stone-100 bg-stone-50/50">
            {emails.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-400">
                {language === 'es' ? 'No hay notificaciones por email aún.' : 'No email notifications yet.'}
              </div>
            ) : (
              emails.map((email) => {
                const isSelected = currentEmail?.id === email.id;
                return (
                  <button
                    key={email.id}
                    type="button"
                    onClick={() => handleOpenEmail(email)}
                    className={`w-full text-left p-3.5 transition-colors block cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50 border-l-4 border-amber-600 text-amber-950'
                        : 'hover:bg-stone-100/80 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-extrabold text-xs truncate">
                        Kebab Turki-Pollito
                      </span>
                      <span className="text-[10px] text-stone-400 font-medium shrink-0">
                        {email.sentAt}
                      </span>
                    </div>

                    <div className="font-bold text-xs truncate mb-1 text-stone-900">
                      {email.subject}
                    </div>

                    <p className="text-[11px] text-stone-500 line-clamp-2 leading-tight">
                      {email.previewText}
                    </p>

                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-[10px] bg-stone-200 text-stone-700 px-1.5 py-0.5 rounded font-mono">
                        #{email.orderId}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold">
                        {email.orderData.total.toFixed(2)} €
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right: Email content preview */}
          <div className="md:col-span-7 p-4 sm:p-6 overflow-y-auto bg-white flex flex-col justify-between">
            {currentEmail ? (
              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Meta details */}
                <div className="border-b border-stone-200 pb-3 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-black text-stone-900 text-base leading-snug">
                      {currentEmail.subject}
                    </h3>
                  </div>

                  <div className="text-xs text-stone-500 space-y-0.5 pt-1">
                    <div>
                      <span className="font-semibold text-stone-700">{language === 'es' ? 'De: ' : 'From: '}</span> 
                      pedidos@kebabturkipollito.es (Kebab Turki-Pollito La Zubia)
                    </div>
                    <div>
                      <span className="font-semibold text-stone-700">{language === 'es' ? 'Para: ' : 'To: '}</span> 
                      {currentEmail.recipientEmail}
                    </div>
                    <div>
                      <span className="font-semibold text-stone-700">{language === 'es' ? 'Fecha: ' : 'Date: '}</span> 
                      {currentEmail.sentAt}
                    </div>
                  </div>
                </div>

                {/* Branded Email Body */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 space-y-4">
                  {/* Brand Header */}
                  <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
                    <div>
                      <span className="font-black text-stone-900 uppercase text-sm block">
                        Kebab Turki-Pollito
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Calle Greco Nº 2, La Zubia (Granada) · Tlf: 958 890 208
                      </span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      100% Halal
                    </span>
                  </div>

                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    {currentEmail.previewText}
                  </p>

                  {/* Summary Box */}
                  <div className="bg-white border border-stone-200 rounded-xl p-3.5 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-stone-900">
                      <span>{language === 'es' ? 'Pedido Nº:' : 'Order No.:'}</span>
                      <span className="font-mono">#{currentEmail.orderId}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>{language === 'es' ? 'Tipo de Servicio:' : 'Service Type:'}</span>
                      <span>
                        {currentEmail.orderData.deliveryMethod === 'domicilio' 
                          ? (language === 'es' ? 'Reparto a Domicilio (+1€)' : 'Home Delivery (+€1)') 
                          : (language === 'es' ? 'Recogida en local' : 'Store Pickup')}
                      </span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>{language === 'es' ? 'Destino:' : 'Destination:'}</span>
                      <span className="text-right max-w-[200px] truncate">{currentEmail.orderData.deliveryAddress}</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-stone-900 pt-1.5 border-t border-stone-200">
                      <span>{language === 'es' ? 'Importe Total:' : 'Total Amount:'}</span>
                      <span className="text-amber-800">{currentEmail.orderData.total.toFixed(2)} €</span>
                    </div>
                  </div>

                  {/* Direct Tracking CTA in Email */}
                  <div className="text-center pt-2">
                    <button
                      id="track-order-email-cta-btn"
                      type="button"
                      onClick={() => handleTrackFromEmail(currentEmail.orderId)}
                      className="bg-amber-700 hover:bg-amber-800 text-white font-black py-2.5 px-6 rounded-xl text-xs inline-flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
                    >
                      <Bike className="w-4 h-4" />
                      <span>{language === 'es' ? `Rastrear Entrega #${currentEmail.orderId} en Vivo` : `Live Track Delivery #${currentEmail.orderId}`}</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-stone-400 text-center leading-relaxed">
                    {language === 'es'
                      ? 'Si tienes cualquier duda con tu comida, llámanos directamente al 958 890 208 o al 641 271 079 con tu número de pedido.'
                      : 'If you have any questions regarding your food, call us directly at 958 890 208 or 641 271 079 with your order number.'}
                  </p>
                </div>

              </div>
            ) : (
              <div className="p-8 text-center text-stone-400 my-auto">
                {language === 'es' ? 'Selecciona una notificación para leer el contenido del correo.' : 'Select a notification to view email contents.'}
              </div>
            )}

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-400 mt-4">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {language === 'es' ? 'Emisión de correo certificada' : 'Certified email dispatch'}
              </span>
              <span>Kebab Turki-Pollito</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
