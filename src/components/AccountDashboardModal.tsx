import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { 
  X, 
  User, 
  Package, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  RotateCcw, 
  ChevronRight, 
  ShieldCheck, 
  Edit3, 
  Save, 
  Check 
} from 'lucide-react';

export const AccountDashboardModal: React.FC = () => {
  const {
    isAccountOpen,
    setIsAccountOpen,
    user,
    setUser,
    orders,
    setActiveOrderById,
    setIsTrackingOpen,
    addToCart,
    showToast,
    language,
    t,
  } = useStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.phone);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editAddress, setEditAddress] = useState(user.address);
  const [editCity, setEditCity] = useState(user.city);

  if (!isAccountOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      name: editName,
      phone: editPhone,
      email: editEmail,
      address: editAddress,
      city: editCity,
    });
    setIsEditing(false);
    showToast(language === 'es' ? '✓ Datos de perfil actualizados correctamente' : '✓ Profile details updated successfully');
  };

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach((item) => {
      addToCart({
        ...item,
        id: `${item.menuItemId}-${Date.now()}-${Math.random()}`,
      });
    });
    setIsAccountOpen(false);
    showToast(language === 'es' ? '✓ Productos del pedido añadidos a tu cesta actual' : '✓ Order items added to your current cart');
  };

  const handleTrackOrder = (orderId: string) => {
    setActiveOrderById(orderId);
    setIsAccountOpen(false);
    setIsTrackingOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 text-stone-900 my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-base shadow-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-extrabold text-stone-900 text-base sm:text-lg">
                {t('accountTitle')}
              </h2>
              <p className="text-xs text-stone-500">
                {t('accountSubtitle')}
              </p>
            </div>
          </div>

          <button
            id="close-account-modal-btn"
            type="button"
            onClick={() => setIsAccountOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 text-xs sm:text-sm">
          
          {/* Customer Profile Card */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-stone-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-700" />
                {t('personalData')}
              </h3>
              <button
                id="edit-profile-btn"
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? (language === 'es' ? 'Cancelar' : 'Cancel') : (language === 'es' ? 'Editar Datos' : 'Edit Details')}</span>
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block">{t('fullName')}</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block">{t('phone')}</label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block">{t('email')}</label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block">{t('address')}</label>
                    <input
                      type="text"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-stone-900 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Guardar Cambios' : 'Save Changes'}</span>
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-stone-400" />
                  <span className="font-semibold text-stone-900">{user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-stone-400" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-stone-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-stone-400" />
                  <span>{user.address}, {user.city}</span>
                </div>
              </div>
            )}
          </div>

          {/* Orders History Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-stone-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-amber-700" />
                {t('orderHistory')} ({orders.length})
              </h3>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-8 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                <Package className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="text-xs text-stone-500">
                  {language === 'es' ? 'Aún no has realizado ningún pedido.' : 'You have not placed any orders yet.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => {
                  const isCurrentActive = order.status !== 'entregado';
                  return (
                    <div
                      key={order.id}
                      className={`rounded-2xl border p-4 transition-all ${
                        isCurrentActive
                          ? 'border-amber-400 bg-amber-50/40 shadow-xs'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200/70">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-stone-900 text-sm">#{order.id}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            order.status === 'entregado'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-900 animate-pulse'
                          }`}>
                            {order.status === 'recibido' && t('statusConfirmed')}
                            {order.status === 'preparando' && t('statusPreparing')}
                            {order.status === 'en_camino' && t('statusOnWay')}
                            {order.status === 'entregado' && t('statusDelivered')}
                          </span>
                        </div>

                        <div className="text-[11px] text-stone-500 flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {new Date(order.createdAt).toLocaleDateString(
                              language === 'es' ? 'es-ES' : 'en-US', 
                              { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div className="py-2.5 space-y-1 text-xs">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-stone-700">
                            <span>
                              {item.quantity}x {item.name}
                              {item.selectedMeat && <span className="text-stone-400 text-[11px]"> ({item.selectedMeat})</span>}
                            </span>
                            <span className="font-semibold text-stone-900">{item.totalPrice.toFixed(2)} €</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-2.5 border-t border-stone-200/70 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-xs">
                          <span className="text-stone-500">{t('total')}: </span>
                          <span className="font-black text-amber-900 text-sm">{order.total.toFixed(2)} €</span>
                          <span className="text-[10px] text-stone-400 ml-1">
                            ({order.deliveryMethod === 'domicilio' ? t('deliveryOption') : t('pickupOption')})
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleReorder(order)}
                            className="inline-flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>{t('repeatOrder')}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleTrackOrder(order.id)}
                            className="inline-flex items-center gap-1 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow-2xs cursor-pointer"
                          >
                            <span>{t('liveTracking')}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
