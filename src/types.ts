export type Language = 'es' | 'en';

export type CategoryType = 'menus' | 'durums' | 'platos' | 'burgers' | 'especiales' | 'sides';

export interface MenuItemOption {
  id: string;
  name: string;
  priceDelta?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryType;
  description: string;
  flyerPrice: number; // Original price on flyer
  websitePrice: number; // Flyer price + 1 EUR
  image: string;
  isHalal: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  isVegetarian?: boolean;
  ingredients?: string[];
  options?: {
    meats?: string[];
    sauces?: string[];
    drinks?: string[];
    sizes?: { name: string; flyerPrice: number; websitePrice: number }[];
    extras?: { name: string; price: number }[];
  };
}

export interface CartItem {
  id: string; // unique item id in cart
  menuItemId: string;
  name: string;
  basePrice: number;
  quantity: number;
  selectedMeat?: string;
  selectedSauces?: string[];
  selectedDrink?: string;
  selectedSize?: string;
  selectedExtras?: string[];
  customNotes?: string;
  totalPrice: number;
  image: string;
}

export type OrderStatus = 'recibido' | 'preparando' | 'en_camino' | 'entregado';

export interface OrderTimelineEvent {
  status: OrderStatus;
  label: string;
  description: string;
  time: string;
  completed: boolean;
}

export interface Order {
  id: string; // e.g. KT-8392
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  deliveryMethod: 'domicilio' | 'recogida';
  deliveryAddress?: string;
  postalCode?: string;
  city?: string;
  orderNotes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'tarjeta' | 'bizum' | 'google_apple_pay' | 'efectivo';
  paymentStatus: 'pagado' | 'pendiente_al_repartidor';
  status: OrderStatus;
  estimatedDeliveryTime: string;
  timeline: OrderTimelineEvent[];
  driverName?: string;
  driverPhone?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
  source: 'google' | 'web';
  dishes?: string[];
  likes: number;
}

export interface EmailNotification {
  id: string;
  orderId: string;
  recipientEmail: string;
  subject: string;
  sentAt: string;
  previewText: string;
  statusUpdate: OrderStatus;
  read: boolean;
  orderData: {
    total: number;
    itemsCount: number;
    deliveryAddress: string;
    deliveryMethod: 'domicilio' | 'recogida';
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actions?: { label: string; actionKey: string }[];
}
