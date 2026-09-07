import { Language, MenuItem, CategoryType } from '../types';

export const TRANSLATIONS = {
  es: {
    // Top Bar
    halalBadge: '100% CARNE HALAL',
    landmark: 'Junto a Taberna El Pipe',
    deliveryHoursNotice: 'Reparto: 20:00h a 23:00h (Mín. 10€ · Envío +1€)',
    ordersPhone: 'Encargos:',
    googleReviewsCount: 'reseñas',
    
    // Header
    searchPlaceholder: 'Buscar menú, durum, falafel, hamburguesa...',
    searchMobilePlaceholder: 'Buscar en la carta (durums, gratinados, menús)...',
    trackingActive: 'Pedido',
    statusReceived: 'Confirmado',
    statusCooking: 'En Cocina',
    statusOnTheWay: 'En Moto',
    statusDelivered: 'Entregado',
    orderApp: 'Pedir por App',
    orderAppDiscount: '-10%',
    orderEmails: 'Emails de Pedidos',
    myAccount: 'Mi Cuenta',
    cartTotal: '€',
    navLanguage: 'Idioma',
    
    // Hero Banner
    bestFlavor: 'El Mejor Sabor de La Zubia',
    halalCertified: '100% Carne Halal Certificada',
    googleRatingText: '4.9 / 5 en Google Maps',
    heroTitlePart1: 'Kebab Turki-Pollito',
    heroTitlePart2: 'Shawarma & Döner Artesanal',
    heroSubtitle: 'Auténtica carne marinada al asador, nuestra inconfundible salsa blanca casera, durum gratinados al horno con mozzarella y platos abundantes. Haz tu pedido online o a través de nuestra App con entrega rápida a domicilio.',
    pricingNoticeTitle: 'Precios Oficiales de la Carta Web (+1€ vs carta en mostrador)',
    pricingNoticeText: 'Disfruta de la comodidad del pedido online y seguimiento en vivo por sólo 1€ de diferencia con la carta de mostrador. ¡Y con el código',
    pricingNoticeCoupon: 'APP10',
    pricingNoticeText2: 'tienes un 10% de descuento en tu primer pedido!',
    ctaOrderOnline: 'Hacer Pedido Online',
    ctaAppOrder: 'Descargar App (-10%)',
    ctaTrackOrder: 'Seguir Pedido',
    statsRating: 'Puntuación Google',
    statsRatingSub: '384+ opiniones reales',
    statsDelivery: 'Reparto Rápido',
    statsDeliverySub: 'La Zubia y alrededores',
    statsHalal: '100% Halal',
    statsHalalSub: 'Certificado de origen',
    statsService: 'Horario Extendido',
    statsServiceSub: 'Comidas y cenas',

    // Menu Section
    menuOfficialBadge: 'Carta Oficial · La Zubia',
    menuWebPriceNotice: '(Precios web con +1€ aplicados)',
    menuHeading: 'Nuestra Colección de Especialidades',
    menuSubheading: 'Selecciona tu comida favorita y personaliza la carne, salsas y extras a tu gusto con ingredientes 100% Halal recién preparados al momento.',
    filterPopular: 'Más Populares',
    filterHalal: 'Halal',
    filterVegetarian: 'Vegetariano',
    flyerPriceTag: 'Mostrador:',
    webPriceTag: 'Web:',
    customizeCTA: 'Personalizar y Pedir',
    addCTA: 'Añadir al Carrito',
    noResultsFound: 'No se encontraron platos que coincidan con tu búsqueda.',
    resetFilters: 'Restablecer filtros',

    // Categories
    catAll: 'Toda la Carta',
    catMenus: 'Menús (+ patatas y bebida)',
    catDurums: 'Shawarma y Durums',
    catPlatos: 'Platos y Gratinados',
    catBurgers: 'Hamburguesas y Camperos',
    catEspeciales: 'Media Luna, Falafel y Especiales',
    catSides: 'Patatas',

    // Item Customization Modal
    modalTitle: 'Personalizar Plato',
    flyerPriceInfo: 'Precio de mostrador:',
    webPriceApplied: '(+1,00€ tarifa web y preparación incluido)',
    sectionMeat: 'Elige tu Carne',
    meatRequired: 'Obligatorio',
    sectionSauce: 'Elige tus Salsas (máx. 2)',
    sectionDrink: 'Elige tu Bebida (Incluida en el menú)',
    sectionSize: 'Elige el Tamaño de la Ración',
    sectionExtras: 'Extras Opcionales',
    sectionNotes: 'Instrucciones Especiales para Cocina',
    notesPlaceholder: 'Ej: Sin cebolla, extra salsa picante aparte, etc.',
    quantityLabel: 'Cantidad',
    totalPriceLabel: 'Total a Pagar',
    addToCartButton: 'Añadir al Carrito',

    // Cart Drawer
    cartTitle: 'Tu Pedido',
    cartEmptyTitle: 'Tu carrito está vacío',
    cartEmptyDesc: 'Explora nuestra deliciosa carta de kebabs, durums gratinados y menús completos para añadir tus platos favoritos.',
    cartEmptyCTA: 'Ver la Carta y Pedir',
    deliveryMethodTitle: 'Método de Entrega',
    deliveryHome: 'Reparto a Domicilio',
    deliveryHomeDesc: 'Directo a tu puerta en La Zubia',
    deliveryPickup: 'Recogida en Local',
    deliveryPickupDesc: 'Calle Greco Nº 2 (Listo en 15-20 min)',
    minOrderNotice: 'El pedido mínimo para reparto a domicilio es de 10,00€ (te faltan',
    minOrderReached: '¡Has alcanzado el pedido mínimo de 10,00€ para reparto a domicilio!',
    couponTitle: 'Código de Descuento',
    couponPlaceholder: 'Ej: APP10',
    couponApply: 'Aplicar',
    couponSuccess: 'Cupón APP10 aplicado (-10% de descuento)',
    couponInvalid: 'Código no válido',
    summarySubtotal: 'Subtotal productos',
    summaryDelivery: 'Gastos de envío',
    summaryDiscount: 'Descuento aplicado',
    summaryTotal: 'Total a Pagar',
    checkoutCTA: 'Tramitar Pedido Seguro',
    itemQuantityNotice: 'Unidades',

    // Checkout Modal
    checkoutModalTitle: 'Finalizar y Pagar Pedido',
    checkoutStep1: 'Datos de Contacto',
    checkoutName: 'Nombre Completo',
    checkoutEmail: 'Correo Electrónico (para confirmación)',
    checkoutPhone: 'Teléfono Móvil (para el repartidor)',
    checkoutStep2: 'Dirección de Entrega en La Zubia',
    checkoutStreet: 'Calle y Número',
    checkoutFloor: 'Piso, Letra o Portal (Opcional)',
    checkoutCity: 'Localidad / Código Postal',
    checkoutInstructions: 'Notas para la entrega o portero',
    checkoutStep3: 'Método de Pago Seguro (PSD2)',
    payCard: 'Tarjeta de Crédito o Débito',
    payCardDesc: 'Visa, Mastercard, Maestro con 3D-Secure',
    payBizum: 'Bizum',
    payBizumDesc: 'Pago instantáneo con tu teléfono móvil',
    payDigital: 'Google Pay / Apple Pay',
    payDigitalDesc: 'Pago seguro en un solo clic',
    payCash: 'Efectivo al Repartidor',
    payCashDesc: 'Pago en mano al recibir el pedido',
    cashChangeNeeded: '¿Necesitas cambio?',
    cashChangeExact: 'Importe exacto',
    cashChange20: 'Cambio de 20€',
    cashChange50: 'Cambio de 50€',
    cardHolderName: 'Titular de la Tarjeta',
    cardNumber: 'Número de Tarjeta',
    cardExpiry: 'Caducidad (MM/AA)',
    cardCVC: 'CVC / CVV',
    bizumNumber: 'Número de teléfono registrado en Bizum',
    orderSummaryTitle: 'Resumen de tu Pedido',
    sslEncryptedNotice: 'Pago 100% Seguro cifrado con SSL 256 bits y verificación bancaria.',
    payAndConfirmCTA: 'Confirmar y Pagar',
    processingOrder: 'Procesando pago seguro...',

    // Order Tracking Modal
    trackingModalTitle: 'Seguimiento del Pedido en Tiempo Real',
    orderRef: 'Pedido #',
    liveMapTitle: 'Ruta de Entrega en La Zubia',
    driverStatus: 'Mustafa está en camino en moto con tu pedido caliente',
    driverCall: 'Llamar al Repartidor',
    driverPhoneLabel: 'Repartidor:',
    etaEstimate: 'Tiempo estimado de entrega:',
    stepReceived: 'Pedido Confirmado',
    stepReceivedDesc: 'Hemos recibido tu encargo y comprobado el pago.',
    stepCooking: 'En el Asador y Horno',
    stepCookingDesc: 'Preparando tu carne marinada fresca y horneando el pan.',
    stepOnTheWay: 'En Reparto con Mustafa',
    stepOnTheWayDesc: 'El repartidor va de camino a tu dirección en La Zubia.',
    stepDelivered: 'Entregado con Éxito',
    stepDeliveredDesc: '¡Que aproveche tu comida! Déjanos una reseña en Google.',
    simulateNextStep: 'Simular siguiente estado (Demo)',
    closeModal: 'Cerrar',

    // Account Modal
    accountModalTitle: 'Mi Cuenta y Pedidos',
    tabProfile: 'Mis Datos',
    tabOrders: 'Historial de Pedidos',
    saveChanges: 'Guardar Cambios',
    dataUpdatedSuccess: 'Tus datos se han guardado correctamente.',
    noPastOrders: 'Aún no has realizado ningún pedido.',
    reorderCTA: 'Volver a Pedir',
    viewDetailsCTA: 'Ver Estado en Vivo',

    // Emails Modal
    emailsModalTitle: 'Buzón de Notificaciones por Email',
    emailsModalSubtitle: 'Aquí recibes los correos de confirmación oficiales de Kebab Turki-Pollito con tu factura y enlace de seguimiento.',
    markAllAsRead: 'Marcar todos como leídos',
    noEmails: 'No tienes mensajes de pedidos en este momento.',
    emailSubjectPrefix: 'Confirmación y Factura del Pedido',
    viewEmailDetails: 'Ver correo completo',

    // Reviews Section
    reviewsHeading: 'Lo Que Dicen Nuestros Clientes',
    reviewsSubheading: 'La opinión de quienes disfrutan a diario de nuestro sabor en La Zubia y Granada.',
    reviewsGoogleBadge: 'Puntuación Oficial de Google Maps',
    reviewsBasedOn: 'Basado en más de 384 reseñas verificadas',
    reviewsWriteCTA: 'Escribir una Reseña',
    verifiedCustomerBadge: 'Cliente Verificado',
    writeReviewModalTitle: 'Comparte tu Experiencia en Turki-Pollito',
    yourRatingLabel: 'Tu Valoración',
    yourCommentLabel: 'Tu Comentario',
    yourNameLabel: 'Tu Nombre',
    dishesRecommendedLabel: 'Platos que probaste o recomiendas',
    submitReviewCTA: 'Publicar Reseña',

    // App Download Section
    appSectionTitle: 'Descarga Nuestra App Móvil Oficial',
    appSectionSubtitle: 'Pide tus shawarmas favoritos más rápido, acumula puntos y consigue un 10% de descuento automático en tu primer pedido con el código APP10.',
    appFeature1Title: 'Seguimiento GPS en Directo',
    appFeature1Desc: 'Mira en el mapa en qué punto de La Zubia está tu repartidor.',
    appFeature2Title: 'Ofertas y Cupones Exclusivos',
    appFeature2Desc: 'Descuentos semanales para clientes fieles de la App.',
    appFeature3Title: 'Repetición de Pedido en 1 Clic',
    appFeature3Desc: 'Guarda tus combinaciones de salsas y extras favoritos.',
    appScanQR: 'Escanea el código QR para instalar',
    appSimulateInstall: 'Abrir Simulador de la App',

    // Chat Support Widget
    chatWidgetTitle: 'Soporte y Preguntas Frecuentes',
    chatBotName: 'Asistente Turki-Pollito',
    chatOnlineBadge: 'En línea',
    chatPlaceholder: 'Escribe tu pregunta aquí...',
    chatQuickHours: '¿Cuáles son los horarios?',
    chatQuickDelivery: '¿Llegáis a mi zona?',
    chatQuickHalal: '¿Toda la comida es Halal?',
    chatQuickTracking: '¿Dónde está mi pedido?',

    // Footer
    footerTagline: 'El auténtico sabor del Döner Kebab, Shawarma al asador y durum gratinados al horno en La Zubia.',
    footerSchedulesTitle: 'Horarios de Apertura',
    footerDeliveryTitle: 'Servicio a Domicilio',
    footerContactTitle: 'Contacto y Ubicación',
    footerLegalTitle: 'Compromiso de Calidad',
    footerHalalText: 'Toda nuestra carne de pollo y ternera dispone de certificado 100% Halal garantizado.',
    footerCopyright: 'Todos los derechos reservados.',
    footerMadeFor: 'Calle Greco Nº 2, La Zubia (Granada).'
  },

  en: {
    // Top Bar
    halalBadge: '100% HALAL CERTIFIED MEAT',
    landmark: 'Next to Taberna El Pipe',
    deliveryHoursNotice: 'Delivery: 8:00 PM to 11:00 PM (Min. €10 · Delivery +€1)',
    ordersPhone: 'Phone Orders:',
    googleReviewsCount: 'reviews',
    
    // Header
    searchPlaceholder: 'Search menus, durums, falafel, burgers...',
    searchMobilePlaceholder: 'Search menu (durums, gratin, combos)...',
    trackingActive: 'Order',
    statusReceived: 'Confirmed',
    statusCooking: 'In Kitchen',
    statusOnTheWay: 'On The Way',
    statusDelivered: 'Delivered',
    orderApp: 'Order via App',
    orderAppDiscount: '-10%',
    orderEmails: 'Order Emails',
    myAccount: 'My Account',
    cartTotal: '€',
    navLanguage: 'Language',
    
    // Hero Banner
    bestFlavor: 'The Best Flavor in La Zubia',
    halalCertified: '100% Certified Halal Meat',
    googleRatingText: '4.9 / 5 on Google Maps',
    heroTitlePart1: 'Kebab Turki-Pollito',
    heroTitlePart2: 'Artisan Shawarma & Döner',
    heroSubtitle: 'Authentic spit-roasted marinated meat, our signature homemade garlic sauce, oven-baked mozzarella gratin durums, and hearty platters. Order online or through our App with fast home delivery.',
    pricingNoticeTitle: 'Official Online Menu Prices (+€1 vs counter menu)',
    pricingNoticeText: 'Enjoy the convenience of online ordering and live tracking for just €1 difference from the counter menu. Plus use promo code',
    pricingNoticeCoupon: 'APP10',
    pricingNoticeText2: 'to receive 10% off your first order!',
    ctaOrderOnline: 'Order Online Now',
    ctaAppOrder: 'Download App (-10%)',
    ctaTrackOrder: 'Track Order',
    statsRating: 'Google Rating',
    statsRatingSub: '384+ authentic reviews',
    statsDelivery: 'Fast Delivery',
    statsDeliverySub: 'La Zubia & surroundings',
    statsHalal: '100% Halal',
    statsHalalSub: 'Certified origin',
    statsService: 'Extended Hours',
    statsServiceSub: 'Lunch & dinner service',

    // Menu Section
    menuOfficialBadge: 'Official Menu · La Zubia',
    menuWebPriceNotice: '(Online prices with +€1 applied)',
    menuHeading: 'Our Specialty Collection',
    menuSubheading: 'Select your favorite meal and customize meats, sauces, and toppings to your preference with 100% Halal ingredients made fresh to order.',
    filterPopular: 'Most Popular',
    filterHalal: 'Halal',
    filterVegetarian: 'Vegetarian',
    flyerPriceTag: 'Counter:',
    webPriceTag: 'Online:',
    customizeCTA: 'Customize & Order',
    addCTA: 'Add to Cart',
    noResultsFound: 'No dishes found matching your search.',
    resetFilters: 'Reset filters',

    // Categories
    catAll: 'Full Menu',
    catMenus: 'Combo Menus (+ fries & drink)',
    catDurums: 'Shawarma & Durums',
    catPlatos: 'Platters & Gratins',
    catBurgers: 'Burgers & Camperos',
    catEspeciales: 'Half-Moon, Falafel & Specials',
    catSides: 'French Fries',

    // Item Customization Modal
    modalTitle: 'Customize Your Dish',
    flyerPriceInfo: 'In-store counter price:',
    webPriceApplied: '(+€1.00 web order & packaging fee included)',
    sectionMeat: 'Choose Your Meat',
    meatRequired: 'Required',
    sectionSauce: 'Choose Your Sauces (up to 2)',
    sectionDrink: 'Choose Your Drink (Included with combo)',
    sectionSize: 'Choose Portion Size',
    sectionExtras: 'Optional Toppings & Extras',
    sectionNotes: 'Special Kitchen Instructions',
    notesPlaceholder: 'E.g.: No onions, extra spicy sauce on the side, etc.',
    quantityLabel: 'Quantity',
    totalPriceLabel: 'Total to Pay',
    addToCartButton: 'Add to Cart',

    // Cart Drawer
    cartTitle: 'Your Order',
    cartEmptyTitle: 'Your cart is empty',
    cartEmptyDesc: 'Explore our delicious menu of kebabs, oven-baked gratin durums, and full meal combos to add your favorite dishes.',
    cartEmptyCTA: 'Explore Menu & Order',
    deliveryMethodTitle: 'Delivery Method',
    deliveryHome: 'Home Delivery',
    deliveryHomeDesc: 'Direct to your door in La Zubia',
    deliveryPickup: 'Store Pickup',
    deliveryPickupDesc: 'Calle Greco Nº 2 (Ready in 15-20 min)',
    minOrderNotice: 'Minimum order for home delivery is €10.00 (you need €',
    minOrderReached: 'You have reached the €10.00 minimum for home delivery!',
    couponTitle: 'Discount Coupon',
    couponPlaceholder: 'E.g.: APP10',
    couponApply: 'Apply',
    couponSuccess: 'Coupon APP10 applied (-10% discount)',
    couponInvalid: 'Invalid coupon code',
    summarySubtotal: 'Item Subtotal',
    summaryDelivery: 'Delivery Fee',
    summaryDiscount: 'Discount Applied',
    summaryTotal: 'Total to Pay',
    checkoutCTA: 'Proceed to Secure Checkout',
    itemQuantityNotice: 'Units',

    // Checkout Modal
    checkoutModalTitle: 'Checkout & Secure Payment',
    checkoutStep1: 'Contact Information',
    checkoutName: 'Full Name',
    checkoutEmail: 'Email Address (for confirmation & receipt)',
    checkoutPhone: 'Mobile Phone (for delivery driver)',
    checkoutStep2: 'Delivery Address in La Zubia',
    checkoutStreet: 'Street Name and Number',
    checkoutFloor: 'Apartment, Floor or Unit (Optional)',
    checkoutCity: 'Town / Postal Code',
    checkoutInstructions: 'Delivery notes or buzzer code',
    checkoutStep3: 'Secure Payment Method (PSD2)',
    payCard: 'Credit or Debit Card',
    payCardDesc: 'Visa, Mastercard, Maestro with 3D-Secure',
    payBizum: 'Bizum',
    payBizumDesc: 'Instant mobile payment with your phone',
    payDigital: 'Google Pay / Apple Pay',
    payDigitalDesc: 'Secure 1-click payment',
    payCash: 'Cash to Delivery Driver',
    payCashDesc: 'Pay in cash upon receiving your food',
    cashChangeNeeded: 'Do you require change?',
    cashChangeExact: 'Exact amount',
    cashChange20: 'Change for €20',
    cashChange50: 'Change for €50',
    cardHolderName: 'Cardholder Name',
    cardNumber: 'Card Number',
    cardExpiry: 'Expiry Date (MM/YY)',
    cardCVC: 'CVC / CVV',
    bizumNumber: 'Phone number registered on Bizum',
    orderSummaryTitle: 'Order Summary',
    sslEncryptedNotice: '100% Secure Payment encrypted with 256-bit SSL & bank authentication.',
    payAndConfirmCTA: 'Confirm & Pay Order',
    processingOrder: 'Processing secure payment...',

    // Order Tracking Modal
    trackingModalTitle: 'Real-Time Order Tracking',
    orderRef: 'Order #',
    liveMapTitle: 'Delivery Route in La Zubia',
    driverStatus: 'Mustafa is on his way on motorbike with your hot food',
    driverCall: 'Call Driver',
    driverPhoneLabel: 'Driver:',
    etaEstimate: 'Estimated delivery time:',
    stepReceived: 'Order Confirmed',
    stepReceivedDesc: 'We received your order and confirmed payment.',
    stepCooking: 'On the Spit & Oven',
    stepCookingDesc: 'Preparing fresh spit-roasted meat and baking bread.',
    stepOnTheWay: 'On Delivery with Mustafa',
    stepOnTheWayDesc: 'The driver is heading to your address in La Zubia.',
    stepDelivered: 'Delivered Successfully',
    stepDeliveredDesc: 'Enjoy your meal! Please leave us a review on Google.',
    simulateNextStep: 'Simulate next status (Demo)',
    closeModal: 'Close',

    // Account Modal
    accountModalTitle: 'My Account & Orders',
    tabProfile: 'Profile Info',
    tabOrders: 'Order History',
    saveChanges: 'Save Changes',
    dataUpdatedSuccess: 'Your contact info was saved successfully.',
    noPastOrders: 'You have not placed any orders yet.',
    reorderCTA: 'Reorder Dish',
    viewDetailsCTA: 'View Live Status',

    // Emails Modal
    emailsModalTitle: 'Email Notifications Inbox',
    emailsModalSubtitle: 'Here you can view official order confirmations from Kebab Turki-Pollito with your itemized receipt and live tracking link.',
    markAllAsRead: 'Mark all as read',
    noEmails: 'You have no order notifications at this time.',
    emailSubjectPrefix: 'Order Confirmation and Receipt',
    viewEmailDetails: 'View full email',

    // Reviews Section
    reviewsHeading: 'What Our Customers Say',
    reviewsSubheading: 'Real reviews from guests enjoying our authentic food every day in La Zubia and Granada.',
    reviewsGoogleBadge: 'Official Google Maps Rating',
    reviewsBasedOn: 'Based on 384+ verified reviews',
    reviewsWriteCTA: 'Write a Review',
    verifiedCustomerBadge: 'Verified Buyer',
    writeReviewModalTitle: 'Share Your Experience at Turki-Pollito',
    yourRatingLabel: 'Your Rating',
    yourCommentLabel: 'Your Review',
    yourNameLabel: 'Your Name',
    dishesRecommendedLabel: 'Dishes you tried or recommend',
    submitReviewCTA: 'Publish Review',

    // App Download Section
    appSectionTitle: 'Download Our Official Mobile App',
    appSectionSubtitle: 'Order your favorite shawarmas in seconds, collect points, and get 10% off your first order with coupon code APP10.',
    appFeature1Title: 'Live GPS Tracking',
    appFeature1Desc: 'Follow your delivery driver in real-time across La Zubia.',
    appFeature2Title: 'Exclusive App Coupons',
    appFeature2Desc: 'Weekly special deals and discounts for app users.',
    appFeature3Title: '1-Click Fast Reorder',
    appFeature3Desc: 'Save your favorite sauce pairings and meat options.',
    appScanQR: 'Scan QR code to install',
    appSimulateInstall: 'Open Mobile App Simulator',

    // Chat Support Widget
    chatWidgetTitle: 'Support & FAQs',
    chatBotName: 'Turki-Pollito Assistant',
    chatOnlineBadge: 'Online',
    chatPlaceholder: 'Type your question here...',
    chatQuickHours: 'What are your opening hours?',
    chatQuickDelivery: 'Do you deliver to my area?',
    chatQuickHalal: 'Is all meat 100% Halal?',
    chatQuickTracking: 'Where is my order?',

    // Footer
    footerTagline: 'Authentic Döner Kebab, spit-roasted Shawarma, and oven-baked mozzarella gratin durums in La Zubia.',
    footerSchedulesTitle: 'Opening Hours',
    footerDeliveryTitle: 'Delivery Service',
    footerContactTitle: 'Contact & Location',
    footerLegalTitle: 'Quality Commitment',
    footerHalalText: 'All chicken and beef served has 100% certified Halal guarantee.',
    footerCopyright: 'All rights reserved.',
    footerMadeFor: 'Calle Greco Nº 2, La Zubia (Granada).'
  }
};

export const MENU_ITEM_TRANSLATIONS: Record<string, { name: string; description: string; ingredients?: string[] }> = {
  'menu-durum-grande': {
    name: 'Large Durum Combo + Fries & Drink',
    description: 'Our signature durum rolled in artisan lavash bread, choice of spit-roasted meat, fresh crisp vegetables, accompanied by golden fries and a refreshing soda of your choice.',
    ingredients: ['Artisan lavash flatbread', 'Spit-roasted meat', 'Lettuce', 'Tomato', 'Onion', 'Homemade white garlic sauce', 'French fries', '330ml Drink']
  },
  'menu-durum-gratinado': {
    name: 'Oven Gratin Durum Combo + Fries & Drink',
    description: 'Full durum covered and oven-baked with plenty of melted mozzarella cheese with a crispy golden crust, served with French fries and cold beverage.',
    ingredients: ['Artisan flatbread', 'Spit-roasted mixed meat', 'Melted mozzarella', 'White sauce', 'French fries', '330ml Drink']
  },
  'menu-campero-carne': {
    name: 'Grilled Campero Meat Combo + Fries & Drink',
    description: 'Genuine toasted round campero mollete bread packed with chicken or beef, lettuce, onion, sliced tomato, crisp cabbage, sauces, fries and drink.',
    ingredients: ['Toasted campero bread', 'Kebab meat', 'Onion', 'Fresh tomato', 'Crisp cabbage', 'White sauce', 'Fries', 'Drink']
  },
  'menu-zinger-burger': {
    name: 'Zinger Burger Combo + Fries & Drink',
    description: 'Ultra-crispy seasoned breaded chicken breast fillet burger, fresh lettuce, creamy mayonnaise, golden fries and cold drink.',
    ingredients: ['Crispy breaded chicken', 'Sesame bun', 'Lettuce', 'Mayonnaise', 'Fries', 'Drink']
  },
  'menu-hamburguesa': {
    name: 'Complete Burger Combo + Fries & Drink',
    description: 'Grilled 100% halal beef or chicken patty with melted cheese, fried egg, fresh vegetables, fries and drink.',
    ingredients: ['100% Halal beef patty', 'Cheese', 'Egg', 'Lettuce', 'Tomato', 'Fries', 'Drink']
  },
  'menu-media-luna': {
    name: 'Half-Moon Pita Combo + Fries & Drink',
    description: 'Semicircular pita pocket generously packed with roasted meat, egg, cheese, fresh salad and white garlic sauce, with fries and drink.',
  },
  'menu-pizza-turca': {
    name: 'Turkish Pizza (Lahmacun) Combo + Fries & Drink',
    description: 'Crispy Turkish-style thin crust dough topped with seasoned kebab meat, lettuce, tomato, cabbage, black olives, house sauce, fries and drink.',
  },
  'menu-alitas-pollo': {
    name: 'Chicken Wings Platter Combo + Fries & Drink',
    description: 'Succulent marinated chicken wings browned to perfection, served with a hearty portion of golden french fries and drink.',
  },
  'menu-nuggets': {
    name: 'Chicken Nuggets Platter Combo + Fries & Drink',
    description: 'Crispy premium chicken breast nuggets accompanied by freshly made french fries and cold drink.',
  },
  'durum-especial-casa': {
    name: 'House Special SHAWARMA-DURUM (SUPER)',
    description: 'The king of the house: Chicken and beef, fried egg, melted cheese, fresh lettuce, tomato, onion, special house seasoned cabbage and delicious homemade white sauce.',
    ingredients: ['Mixed chicken & beef meat', 'Egg', 'Cheese', 'Lettuce', 'Tomato', 'Onion', 'House seasoned cabbage', 'White sauce']
  },
  'durum-patata': {
    name: 'Durum POTATO (Fries Inside)',
    description: 'Savory combination of spit-roasted meat, crisp salad, house white sauce, and crispy french fries rolled right inside the durum.',
    ingredients: ['Spit-roasted meat', 'French fries inside', 'Fresh vegetables', 'White sauce']
  },
  'durum-strogo': {
    name: 'Durum STROGO Special',
    description: 'Recipe inspired by our strogo recipe with tender seasoned meat, crisp greens, light cream touch and fragrant spices.',
  },
  'shawarma-maiz': {
    name: 'Sweet Corn Shawarma',
    description: 'Tender chicken or beef, selected lettuce, diced tomato, sweet corn, and our traditional creamy white garlic sauce.',
  },
  'shawarma-strogo-picante': {
    name: 'Spicy Strogo Shawarma',
    description: 'Juicy mixed meat, crispy lettuce, fried egg, house smoky chili sauce and the secret recipe of Turki-Pollito.',
  },
  'shawarma-solo-carne': {
    name: 'Shawarma (Meat Only - No Veggies)',
    description: 'No vegetables: 100% pure spit-roasted chicken, beef, or mixed meat with generous homemade white sauce of your choice.',
  },
  'plato-gratinado-mozzarella': {
    name: 'Oven Gratin Platter (Meat, Fries & Mozzarella)',
    description: 'Oven-baked tray layered with golden french fries, abundant marinated kebab meat, and a rich layer of golden melted mozzarella cheese.',
  },
  'plato-arroz-con-carne': {
    name: 'Rice & Meat Platter',
    description: 'Fragrant steamed seasoned rice served with tender kebab meat fresh from the spit and dressed with artisan sauces.',
  },
  'plato-durum-gratinado-solo': {
    name: 'Gratin Durum Platter',
    description: 'Durum roll served on a platter, covered with house sauce and topped with melted mozzarella gratin with a touch of oregano.',
  },
  'plato-especial-casa': {
    name: 'House Special Platter',
    description: 'Spit-roasted chicken and beef, fried egg, melted cheese, lettuce, tomato, onion, special seasoned cabbage and white garlic sauce.',
  },
  'campero-carne': {
    name: 'CAMPERO CARNE Sandwich',
    description: 'Chicken or beef meat, lettuce, onion, tomato, cabbage and sauce.',
  },
  'zinger-burger': {
    name: 'ZINGER BURGER',
    description: 'Crispy breaded chicken with fresh lettuce and sauce.',
  },
  'hamburguesa': {
    name: 'HAMBURGUESA',
    description: 'Chicken or beef burger. Cheese, egg and vegetables.',
  },
  'media-luna': {
    name: 'MEDIA LUNA',
    description: 'Chicken and beef, egg, cheese, lettuce, tomato, onion, special house cabbage and white sauce. SUPER: choose any ingredients to your liking.',
  },
  'media-luna-solo-carne': {
    name: 'MEDIA LUNA (Meat Only)',
    description: 'Meat only inside artisanal half-moon pita.',
  },
  'falafel-vegetal': {
    name: 'FALAFEL VEGETAL',
    description: 'Choice of ingredients. Available in Pita Bread (4€) or Shawarma Flatbread (4.50€).',
  },
  'pizza-turca': {
    name: 'PIZZA TURCA (Lahmacun)',
    description: 'Choice of ingredients (chicken or beef, lettuce, tomato, cabbage, olives).',
  },
  'patatas': {
    name: 'PATATAS (French Fries)',
    description: 'Crispy french fries. Small €1.50 · Medium €2.00 · Large €3.00.',
  }
};

export const OPTION_TRANSLATIONS: Record<string, string> = {
  // Meats
  'Pollo': 'Chicken',
  'Ternera': 'Beef',
  'Mixto (Pollo y Ternera)': 'Mixed (Chicken & Beef)',
  'Mixto': 'Mixed Meat',
  'Pollo y Ternera Mixto': 'Mixed (Chicken & Beef)',
  'Sólo Pollo': 'Chicken Only',
  'Sólo Ternera': 'Beef Only',
  'Carne Mixta (Recomendada)': 'Mixed Meat (Recommended)',

  // Sauces
  'Salsa Blanca': 'White Garlic Sauce',
  'Salsa Blanca Especial': 'Special White Sauce',
  'Salsa Blanca Casera': 'Homemade White Sauce',
  'Salsa Blanca Kebab': 'Kebab White Sauce',
  'Salsa Blanca de Yogur': 'White Yogurt Sauce',
  'Salsa Picante': 'Spicy Chili Sauce',
  'Salsa Picante Casera': 'Homemade Spicy Sauce',
  'Salsa Picante Fuerte': 'Hot Spicy Sauce',
  'Picante Medio con Blanca': 'Medium Spicy with White Sauce',
  'Mixta (Blanca + Picante)': 'Mixed (White + Spicy)',
  'Salsa Barbacoa': 'BBQ Sauce',
  'Mayonesa': 'Mayonnaise',
  'Ketchup': 'Ketchup',
  'Ketchup y Mayonesa': 'Ketchup & Mayo',
  'Salsa Suave': 'Mild Sauce',
  'Tahini': 'Tahini Sauce',
  'Sin salsa': 'No sauce',
  'Sin Salsa': 'No sauce',

  // Sizes
  'Pequeño': 'Small',
  'Pequeñas': 'Small',
  'Mediano': 'Medium',
  'Medianas': 'Medium',
  'Grande': 'Large',
  'Grandes': 'Large',
  'En Pan Pita': 'In Pita Bread',
  'En Pan Shawarma enrollado': 'In Rolled Shawarma Flatbread',

  // Extras
  'Queso fundido extra': 'Extra melted cheese',
  'Huevo a la plancha': 'Grilled fried egg',
  'Jalapeños picantes': 'Hot jalapeños',
  'Doble ración queso': 'Double portion cheese',
  'Extra queso fundido': 'Extra melted cheese',
  'Jalapeños': 'Jalapeños',
  'Añadir Huevo': 'Add Fried Egg',
  'Añadir Queso': 'Add Cheese',
  'Queso Cheddar': 'Cheddar Cheese',
  'Añadir queso cheddar': 'Add Cheddar Cheese',
  'Añadir bacon halal': 'Add Halal Bacon'
};

export function getLocalizedText(key: keyof typeof TRANSLATIONS.es, lang: Language): string {
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.es[key] || '';
}

export function getLocalizedMenuItem(item: MenuItem, lang: Language): MenuItem {
  if (lang === 'es') return item;
  
  const translation = MENU_ITEM_TRANSLATIONS[item.id];
  if (!translation) return item;

  return {
    ...item,
    name: translation.name || item.name,
    description: translation.description || item.description,
    ingredients: translation.ingredients || item.ingredients,
    options: item.options ? {
      ...item.options,
      meats: item.options.meats?.map(m => OPTION_TRANSLATIONS[m] || m),
      sauces: item.options.sauces?.map(s => OPTION_TRANSLATIONS[s] || s),
      sizes: item.options.sizes?.map(sz => ({
        ...sz,
        name: OPTION_TRANSLATIONS[sz.name] || sz.name
      })),
      extras: item.options.extras?.map(ex => ({
        ...ex,
        name: OPTION_TRANSLATIONS[ex.name] || ex.name
      }))
    } : undefined
  };
}

export function getLocalizedCategoryName(categoryId: string, lang: Language): string {
  const dict = TRANSLATIONS[lang];
  switch (categoryId) {
    case 'all': return dict.catAll;
    case 'menus': return dict.catMenus;
    case 'durums': return dict.catDurums;
    case 'platos': return dict.catPlatos;
    case 'burgers': return dict.catBurgers;
    case 'especiales': return dict.catEspeciales;
    case 'sides': return dict.catSides;
    default: return categoryId;
  }
}
