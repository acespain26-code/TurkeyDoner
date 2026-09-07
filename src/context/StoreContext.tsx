import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Order, Review, EmailNotification, ChatMessage, OrderStatus, Language } from '../types';
import { INITIAL_REVIEWS } from '../data/reviewsData';
import { RESTAURANT_INFO } from '../data/menuData';
import { TRANSLATIONS, getLocalizedText } from '../i18n/translations';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

interface StoreContextType {
  // Language & i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS.es) => string;

  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  deliveryMethod: 'domicilio' | 'recogida';
  setDeliveryMethod: (method: 'domicilio' | 'recogida') => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  discountAmount: number;
  deliveryFee: number;
  cartTotal: number;

  // User & Profile
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;

  // Orders & Tracking
  orders: Order[];
  activeOrder: Order | null;
  createOrder: (orderData: Partial<Order>) => Order;
  setActiveOrderById: (orderId: string) => void;
  simulateNextStatus: (orderId: string) => void;

  // Email Notifications
  emails: EmailNotification[];
  unreadEmailsCount: number;
  markEmailsAsRead: () => void;
  selectedEmail: EmailNotification | null;
  setSelectedEmail: (email: EmailNotification | null) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'likes'>) => void;

  // Chat Support
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;

  // Navigation / Modal States
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isEmailModalOpen: boolean;
  setIsEmailModalOpen: (open: boolean) => void;
  isAppModalOpen: boolean;
  setIsAppModalOpen: (open: boolean) => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;

  // Toasts
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_USER: UserProfile = {
  name: 'Samir Benítez',
  email: 'samir.cliente@gmail.com',
  phone: '641 289 401',
  address: 'Calle Real, 14, 2ºB',
  city: 'La Zubia (Granada)',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language & i18n
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('ktp_language');
      if (saved === 'es' || saved === 'en') return saved;
    } catch {
      // ignore
    }
    return 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('ktp_language', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: keyof typeof TRANSLATIONS.es): string => {
    return getLocalizedText(key, language);
  };

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ktp_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'domicilio' | 'recogida'>('domicilio');
  const [promoCode, setPromoCode] = useState<string>('');
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('ktp_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ktp_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default mock initial order so dashboard has immediate rich data
    const initialOrder: Order = {
      id: 'KT-7824',
      createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
      customerName: INITIAL_USER.name,
      email: INITIAL_USER.email,
      phone: INITIAL_USER.phone,
      deliveryMethod: 'domicilio',
      deliveryAddress: `${INITIAL_USER.address}, ${INITIAL_USER.city}`,
      items: [
        {
          id: 'mock-1',
          menuItemId: 'menu-durum-grande',
          name: 'Menú Durum Grande + Patatas y Bebida',
          basePrice: 7.0,
          quantity: 2,
          selectedMeat: 'Mixto (Pollo y Ternera)',
          selectedSauces: ['Salsa Blanca', 'Salsa Picante'],
          selectedDrink: 'Coca-Cola Zero',
          totalPrice: 14.0,
          image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'mock-2',
          menuItemId: 'patatas-fritas',
          name: 'Ración de Patatas Fritas Crujientes',
          basePrice: 3.0,
          quantity: 1,
          selectedSize: 'Medianas',
          totalPrice: 3.0,
          image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
        },
      ],
      subtotal: 17.0,
      deliveryFee: 1.0,
      discount: 0,
      total: 18.0,
      paymentMethod: 'bizum',
      paymentStatus: 'pagado',
      status: 'en_camino',
      estimatedDeliveryTime: '15 - 25 min',
      driverName: 'Mustafa (Repartidor Turki-Pollito)',
      driverPhone: '641 271 079',
      timeline: [
        {
          status: 'recibido',
          label: 'Pedido Confirmado',
          description: 'Recibido en el sistema de Calle Greco 2',
          time: '20:15',
          completed: true,
        },
        {
          status: 'preparando',
          label: 'En Cocina / Asador',
          description: 'Carne recién cortada y pan tostado al punto',
          time: '20:25',
          completed: true,
        },
        {
          status: 'en_camino',
          label: 'En Camino con Repartidor',
          description: 'Repartidor en moto rumbo a tu dirección en La Zubia',
          time: '20:38',
          completed: true,
        },
        {
          status: 'entregado',
          label: 'Entregado',
          description: '¡Disfruta de tu pedido recién hecho!',
          time: '20:50 (Estimado)',
          completed: false,
        },
      ],
    };
    return [initialOrder];
  });

  const [activeOrderId, setActiveOrderId] = useState<string | null>('KT-7824');

  // Automated Email notifications
  const [emails, setEmails] = useState<EmailNotification[]>(() => {
    try {
      const saved = localStorage.getItem('ktp_emails');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'email-init-1',
        orderId: 'KT-7824',
        recipientEmail: INITIAL_USER.email,
        subject: '✓ Pedido Confirmado #KT-7824 - Kebab Turki-Pollito (La Zubia)',
        sentAt: 'Hace 38 min',
        previewText: 'Gracias por tu pedido. Estamos preparando tu comida en Calle Greco 2 con ingredientes 100% Halal.',
        statusUpdate: 'recibido',
        read: false,
        orderData: {
          total: 18.0,
          itemsCount: 3,
          deliveryAddress: `${INITIAL_USER.address}, ${INITIAL_USER.city}`,
          deliveryMethod: 'domicilio',
        },
      },
      {
        id: 'email-init-2',
        orderId: 'KT-7824',
        recipientEmail: INITIAL_USER.email,
        subject: '🛵 ¡Tu pedido #KT-7824 va en camino! - Repartidor asignado',
        sentAt: 'Hace 12 min',
        previewText: 'Mustafa ha salido del local con tu pedido en moto. Llegará en unos 10-15 minutos.',
        statusUpdate: 'en_camino',
        read: false,
        orderData: {
          total: 18.0,
          itemsCount: 3,
          deliveryAddress: `${INITIAL_USER.address}, ${INITIAL_USER.city}`,
          deliveryMethod: 'domicilio',
        },
      },
    ];
  });

  const [selectedEmail, setSelectedEmail] = useState<EmailNotification | null>(null);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('ktp_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Chat Messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'chat-1',
      sender: 'bot',
      text: '¡Hola! 👋 Te damos la bienvenida a Kebab Turki-Pollito (Calle Greco Nº 2, La Zubia). ¿En qué podemos ayudarte con tu pedido hoy?',
      timestamp: 'Ahora',
      actions: [
        { label: '📍 Ver Horario y Reparto', actionKey: 'horario' },
        { label: '🛵 ¿Dónde está mi pedido?', actionKey: 'estado_pedido' },
        { label: '🥩 ¿Todo es 100% Halal?', actionKey: 'halal' },
        { label: '📞 Llamar al local', actionKey: 'telefono' },
      ],
    },
  ]);

  // Modal states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('ktp_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('ktp_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('ktp_emails', JSON.stringify(emails));
    } catch (e) {
      console.error(e);
    }
  }, [emails]);

  useEffect(() => {
    try {
      localStorage.setItem('ktp_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('ktp_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3800);
  };

  // Cart operations
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      // Check if identical item already exists (same id, meat, sauces, size, extras)
      const existingIndex = prev.findIndex(
        (i) =>
          i.menuItemId === item.menuItemId &&
          i.selectedMeat === item.selectedMeat &&
          i.selectedSize === item.selectedSize &&
          JSON.stringify(i.selectedSauces?.sort()) === JSON.stringify(item.selectedSauces?.sort()) &&
          JSON.stringify(i.selectedExtras?.sort()) === JSON.stringify(item.selectedExtras?.sort()) &&
          i.selectedDrink === item.selectedDrink
      );

      if (existingIndex > -1) {
        const next = [...prev];
        const exist = next[existingIndex];
        const newQty = exist.quantity + item.quantity;
        next[existingIndex] = {
          ...exist,
          quantity: newQty,
          totalPrice: Number(((exist.totalPrice / exist.quantity) * newQty).toFixed(2)),
        };
        return next;
      }
      return [...prev, item];
    });
    showToast(`✓ "${item.name}" añadido al pedido`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            const unitPrice = item.totalPrice / item.quantity;
            return {
              ...item,
              quantity: nextQty,
              totalPrice: Number((unitPrice * nextQty).toFixed(2)),
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = Number(cart.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2));
  const deliveryFee = deliveryMethod === 'domicilio' && cart.length > 0 ? RESTAURANT_INFO.deliveryCost : 0.0;
  const isAppPromo = promoCode.trim().toUpperCase() === 'APP10';
  const discountAmount = isAppPromo ? Number((cartSubtotal * 0.1).toFixed(2)) : 0.0;
  const cartTotal = Number(Math.max(0, cartSubtotal + deliveryFee - discountAmount).toFixed(2));

  // Orders
  const activeOrder = orders.find((o) => o.id === activeOrderId) || orders[0] || null;

  const setActiveOrderById = (orderId: string) => {
    setActiveOrderId(orderId);
  };

  const createOrder = (orderData: Partial<Order>): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `KT-${randomNum}`;
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newOrder: Order = {
      id: newOrderId,
      createdAt: now.toISOString(),
      customerName: orderData.customerName || user.name,
      email: orderData.email || user.email,
      phone: orderData.phone || user.phone,
      deliveryMethod: orderData.deliveryMethod || deliveryMethod,
      deliveryAddress: orderData.deliveryAddress || `${user.address}, ${user.city}`,
      orderNotes: orderData.orderNotes,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee: deliveryFee,
      discount: discountAmount,
      total: cartTotal,
      paymentMethod: orderData.paymentMethod || 'tarjeta',
      paymentStatus: orderData.paymentMethod === 'efectivo' ? 'pendiente_al_repartidor' : 'pagado',
      status: 'recibido',
      estimatedDeliveryTime: orderData.deliveryMethod === 'recogida' ? '15 - 20 min' : '30 - 40 min',
      driverName: 'Mustafa (Repartidor Turki-Pollito)',
      driverPhone: '641 271 079',
      timeline: [
        {
          status: 'recibido',
          label: 'Pedido Confirmado',
          description: 'Recibido y validado con éxito',
          time: timeString,
          completed: true,
        },
        {
          status: 'preparando',
          label: 'En Cocina / Asador',
          description: 'Cocinando al momento en Calle Greco 2',
          time: '~' + timeString,
          completed: false,
        },
        {
          status: 'en_camino',
          label: 'En Camino con Repartidor',
          description: 'Reparto a domicilio en La Zubia y alrededores',
          time: 'En espera',
          completed: false,
        },
        {
          status: 'entregado',
          label: 'Entregado',
          description: '¡Que aproveche!',
          time: 'En espera',
          completed: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderId(newOrderId);
    clearCart();

    // Automated confirmation email generation
    const confirmEmail: EmailNotification = {
      id: `email-${Date.now()}`,
      orderId: newOrderId,
      recipientEmail: newOrder.email,
      subject: `✓ Pedido Confirmado #${newOrderId} - Kebab Turki-Pollito`,
      sentAt: 'Hace unos instantes',
      previewText: `¡Hola ${newOrder.customerName}! Hemos recibido tu pedido online por un total de ${newOrder.total.toFixed(2)}€. Puedes seguir su preparación en tiempo real.`,
      statusUpdate: 'recibido',
      read: false,
      orderData: {
        total: newOrder.total,
        itemsCount: newOrder.items.reduce((sum, i) => sum + i.quantity, 0),
        deliveryAddress: newOrder.deliveryAddress || 'Recogida en local (Calle Greco 2)',
        deliveryMethod: newOrder.deliveryMethod,
      },
    };

    setEmails((prev) => [confirmEmail, ...prev]);
    showToast(`🎉 ¡Pedido #${newOrderId} completado! Notificación enviada a ${newOrder.email}`);

    // Auto-advance demo order status after a short delay for interactive realism
    setTimeout(() => {
      simulateNextStatus(newOrderId);
    }, 14000);

    return newOrder;
  };

  const simulateNextStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        let nextStatus: OrderStatus = order.status;
        const now = new Date();
        const timeNow = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        if (order.status === 'recibido') nextStatus = 'preparando';
        else if (order.status === 'preparando') nextStatus = 'en_camino';
        else if (order.status === 'en_camino') nextStatus = 'entregado';

        const updatedTimeline = order.timeline.map((evt) => {
          if (evt.status === nextStatus) {
            return { ...evt, completed: true, time: timeNow };
          }
          return evt;
        });

        // Trigger automated email on status update
        if (nextStatus !== order.status) {
          const statusEmail: EmailNotification = {
            id: `email-status-${Date.now()}`,
            orderId: order.id,
            recipientEmail: order.email,
            subject:
              nextStatus === 'preparando'
                ? `🔥 Pedido #${order.id} en cocina - Kebab Turki-Pollito`
                : nextStatus === 'en_camino'
                ? `🛵 ¡Tu pedido #${order.id} va en camino! - Repartidor asignado`
                : `🎉 ¡Pedido #${order.id} entregado! - Valora tu experiencia`,
            sentAt: 'Ahora mismo',
            previewText:
              nextStatus === 'preparando'
                ? 'Nuestros cocineros están preparando tus platos en Calle Greco 2.'
                : nextStatus === 'en_camino'
                ? `${order.driverName} ha salido del restaurante en moto rumbo a tu domicilio.`
                : '¡Esperamos que lo disfrutes! Déjanos una reseña en Google Maps.',
            statusUpdate: nextStatus,
            read: false,
            orderData: {
              total: order.total,
              itemsCount: order.items.reduce((sum, i) => sum + i.quantity, 0),
              deliveryAddress: order.deliveryAddress || 'Recogida en local',
              deliveryMethod: order.deliveryMethod,
            },
          };
          setEmails((ePrev) => [statusEmail, ...ePrev]);
          showToast(`📧 Actualización de pedido: ${statusEmail.subject}`);
        }

        return {
          ...order,
          status: nextStatus,
          timeline: updatedTimeline,
        };
      })
    );
  };

  const unreadEmailsCount = emails.filter((e) => !e.read).length;

  const markEmailsAsRead = () => {
    setEmails((prev) => prev.map((e) => ({ ...e, read: true })));
  };

  // Reviews
  const addReview = (newRev: Omit<Review, 'id' | 'date' | 'likes'>) => {
    const createdReview: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'Hoy',
      likes: 1,
    };
    setReviews((prev) => [createdReview, ...prev]);
    showToast('⭐ ¡Gracias por tu reseña verificada! Ha sido publicada.');
  };

  // Chat assistance logic
  const sendChatMessage = (text: string) => {
    const isEn = language === 'en';
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: isEn ? 'Just now' : 'Ahora',
    };
    setChatMessages((prev) => [...prev, userMsg]);

    const lower = text.toLowerCase();
    setTimeout(() => {
      let botReply = '';
      let botActions: { label: string; actionKey: string }[] | undefined = undefined;

      if (
        lower.includes('horario') ||
        lower.includes('hora') ||
        lower.includes('abierto') ||
        lower.includes('cerrado') ||
        lower.includes('hour') ||
        lower.includes('open') ||
        lower.includes('time')
      ) {
        botReply = isEn
          ? `🕒 Opening Hours at Calle Greco Nº 2 (La Zubia):
- Mon & Thu: 1:00 PM to 4:00 PM and 7:00 PM to 2:00 AM
- Tue & Wed: 7:00 PM to 2:00 AM
- Fri, Holidays & Weekends: 1:00 PM to 4:00 PM and 7:00 PM to 2:00 AM
🛵 Home delivery service available from 8:00 PM to 11:00 PM with €10 minimum order (+€1 delivery fee).`
          : `🕒 Nuestro horario en Calle Greco Nº 2 (La Zubia):
- Lunes y Jueves: 13:00h a 16:00h y 19:00h a 2:00h
- Martes y Miércoles: 19:00h a 2:00h
- Viernes, Festivos y Fin de semana: 13:00h a 16:00h y 19:00h a 2:00h
🛵 Servicio a domicilio disponible de 20:00h a 23:00h con pedido mínimo de 10€ (+1€ envío).`;
      } else if (
        lower.includes('pedido') ||
        lower.includes('donde') ||
        lower.includes('reparto') ||
        lower.includes('camino') ||
        lower.includes('tarda') ||
        lower.includes('order') ||
        lower.includes('where') ||
        lower.includes('track') ||
        lower.includes('courier')
      ) {
        if (activeOrder) {
          const statusTextEn =
            activeOrder.status === 'recibido'
              ? 'Received at restaurant'
              : activeOrder.status === 'preparando'
              ? 'In kitchen preparing with fresh meat'
              : activeOrder.status === 'en_camino'
              ? `On route with our courier (${activeOrder.driverName})`
              : 'Delivered successfully';

          const statusTextEs =
            activeOrder.status === 'recibido'
              ? 'Recibido en el restaurante'
              : activeOrder.status === 'preparando'
              ? 'En cocina preparándose con carne fresca'
              : activeOrder.status === 'en_camino'
              ? `En camino con nuestro repartidor (${activeOrder.driverName})`
              : 'Entregado con éxito';

          botReply = isEn
            ? `📦 Your active order is #${activeOrder.id}.
Status: ${statusTextEn}.
Estimated delivery: ${activeOrder.estimatedDeliveryTime}. You can open the live tracking map anytime.`
            : `📦 Tu pedido activo es #${activeOrder.id}.
Estado actual: ${statusTextEs}.
Tiempo estimado restante: ${activeOrder.estimatedDeliveryTime}. Puedes abrir el rastreador en tiempo real en la pantalla.`;

          botActions = [{ label: isEn ? '🗺️ Open Live Tracker' : '🗺️ Abrir Seguimiento en Vivo', actionKey: 'open_tracking' }];
        } else {
          botReply = isEn
            ? 'You have no active orders right now. Explore our menu and place your order online!'
            : 'No tienes ningún pedido activo en este momento. ¡Explora nuestra carta y haz tu pedido online!';
        }
      } else if (
        lower.includes('halal') ||
        lower.includes('carne') ||
        lower.includes('vegetariano') ||
        lower.includes('meat') ||
        lower.includes('beef') ||
        lower.includes('chicken')
      ) {
        botReply = isEn
          ? `🥩 At Kebab Turki-Pollito we guarantee certified 100% Halal beef and chicken of top quality.
🥗 We also offer vegetarian choices like our 100% homemade falafel in pita or shawarma wrap, plus fresh salads.`
          : `🥩 En Kebab Turki-Pollito garantizamos carne 100% Halal certificada de ternera y pollo de máxima calidad.
🥗 También contamos con opciones vegetarianas como nuestro delicioso Falafel 100% casero en pan pita o pan shawarma, y ensaladas frescas con col dulce.`;
      } else if (
        lower.includes('telefono') ||
        lower.includes('llamar') ||
        lower.includes('contacto') ||
        lower.includes('direccion') ||
        lower.includes('phone') ||
        lower.includes('call') ||
        lower.includes('address')
      ) {
        botReply = isEn
          ? `📍 We are located at Calle Greco Nº 2 (La Zubia - Granada), right next to Taberna El Pipe.
📞 Phone numbers for orders & questions: 958 890 208 / 641 271 079.`
          : `📍 Estamos situados en Calle Greco Nº 2 (La Zubia - Granada), justo al lado de Taberna El Pipe.
📞 Teléfonos para encargos o consultas: 958 890 208 / 641 271 079. ¡Estaremos encantados de atenderte!`;
      } else if (
        lower.includes('descuento') ||
        lower.includes('cupon') ||
        lower.includes('promo') ||
        lower.includes('app') ||
        lower.includes('discount') ||
        lower.includes('coupon')
      ) {
        botReply = isEn
          ? `🎁 Active promotion! Use promo coupon code 'APP10' in cart or in our official App for 10% off your first order.`
          : `🎁 ¡Tenemos una promoción activa! Usa el código promocional 'APP10' en el carrito o pide desde nuestra App Oficial para obtener un 10% de descuento en tu primer pedido.`;
      } else {
        botReply = isEn
          ? `Thank you for reaching out! You can browse our official menu, order for home delivery (8:00 PM - 11:00 PM, min. €10) or call us directly at 958 890 208 for special requests.`
          : `Gracias por tu mensaje. Puedes consultar nuestra carta oficial, pedir a domicilio (20:00h - 23:00h, mín. 10€) o llamarnos directamente al 958 890 208 si necesitas una petición especial.`;
        botActions = [
          { label: isEn ? '🍟 View Menus & Combos' : '🍟 Ver Menús y Ofertas', actionKey: 'ver_menu' },
          { label: isEn ? '⭐ View Google Reviews' : '⭐ Ver Reseñas en Google', actionKey: 'google_review' },
        ];
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: isEn ? 'Just now' : 'Ahora',
        actions: botActions,
      };
      setChatMessages((prev) => [...prev, botMsg]);
    }, 650);
  };

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        t,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        deliveryMethod,
        setDeliveryMethod,
        promoCode,
        setPromoCode,
        discountAmount,
        deliveryFee,
        cartTotal,
        user,
        setUser,
        orders,
        activeOrder,
        createOrder,
        setActiveOrderById,
        simulateNextStatus,
        emails,
        unreadEmailsCount,
        markEmailsAsRead,
        selectedEmail,
        setSelectedEmail,
        reviews,
        addReview,
        chatMessages,
        sendChatMessage,
        isChatOpen,
        setIsChatOpen,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        isAccountOpen,
        setIsAccountOpen,
        isEmailModalOpen,
        setIsEmailModalOpen,
        isAppModalOpen,
        setIsAppModalOpen,
        isReviewModalOpen,
        setIsReviewModalOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
