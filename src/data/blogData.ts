export interface BlogPost {
  id: string;
  slug: string;
  title: { es: string; en: string };
  category: { es: string; en: string };
  readTime: string;
  date: string;
  author: string;
  excerpt: { es: string; en: string };
  image: string;
  keywords: string[];
  content: {
    es: {
      intro: string;
      sections: { heading: string; text: string; bulletPoints?: string[] }[];
      conclusion: string;
    };
    en: {
      intro: string;
      sections: { heading: string; text: string; bulletPoints?: string[] }[];
      conclusion: string;
    };
  };
  featuredDishId?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'mejor-kebab-la-zubia-granada-sur',
    title: {
      es: 'El Mejor Kebab de La Zubia: Por Qué Kebab Turki-Pollito es el Favorito de Granada Sur',
      en: 'The Best Kebab in La Zubia: Why Kebab Turki-Pollito is Granada Sur’s Favorite',
    },
    category: { es: 'Gastronomía Local', en: 'Local Dining' },
    readTime: '4 min',
    date: '2026-09-01',
    author: 'Chef Asador Turki-Pollito',
    excerpt: {
      es: 'Descubre los secretos que han convertido a Kebab Turki-Pollito en Calle Greco 2 en la parada gastronómica obligatoria de La Zubia, Ogíjares, Huétor Vega y Granada Sur.',
      en: 'Discover the culinary secrets that made Kebab Turki-Pollito on Calle Greco 2 the go-to dining stop across La Zubia, Ogíjares, Huétor Vega and South Granada.',
    },
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80',
    keywords: ['kebab la zubia', 'mejor kebab granada', 'turki pollito', 'shawarma la zubia', 'comida para llevar la zubia'],
    featuredDishId: 'durum-especial-casa',
    content: {
      es: {
        intro: 'Cuando se trata de encontrar un kebab de calidad superior en el área metropolitana de Granada, La Zubia cuenta con un referente indiscutible: Kebab Turki-Pollito. Situado en Calle Greco Nº 2 (junto a Taberna El Pipe), este restaurante ha conquistado los paladares más exigentes gracias al asado lento en llama abierta, panes recién tostados y generosidad inigualable en cada ración.',
        sections: [
          {
            heading: '1. Carne Asada al Punto Perfecto en Espeto Tradicional',
            text: 'La clave de un döner o shawarma memorable reside en el marinado de la carne. En Turki-Pollito seleccionamos cortes magros de pollo y ternera 100% Halal, sazonados con una mezcla maestra de comino, pimentón dulce, cardamomo y finas hierbas orientales. El asado vertical continuo dora la capa exterior creando un bocado crujiente y jugoso.',
            bulletPoints: [
              'Corte fino y uniforme al momento para evitar sequedad.',
              'Opción mixta (pollo + ternera) favorita de los clientes habituales.',
              'Grasa reducida y sin aditivos artificiales.',
            ],
          },
          {
            heading: '2. Pan Lavash Crujiente y Toque Especial de la Casa',
            text: 'Un dürum solo es tan bueno como su pan. Envolventes suaves y elásticos que pasan por el grill justo antes de servir para aportar esa textura dorada crujiente que no se deshace ni se humedece en el reparto.',
          },
          {
            heading: '3. Ubicación Estratégica y Reparto Rápido en La Zubia',
            text: 'Con servicio para cenar en el local, recoger al paso o pedir a domicilio todas las noches de 20:00h a 23:00h, nos aseguramos de que el pedido llegue caliente, crujiente y en tiempo récord.',
          },
        ],
        conclusion: 'Si vives en La Zubia, Cájar, Ogíjares o Huétor Vega, no te conformes con un kebab común. Pide en nuestra web oficial con 10% de descuento (código APP10) y saborea la auténtica maestría turca.',
      },
      en: {
        intro: 'When it comes to finding exceptional quality kebab in the Granada metropolitan area, La Zubia is home to an undisputed benchmark: Kebab Turki-Pollito. Located on Calle Greco No. 2 (right by Taberna El Pipe), this venue has won over locals through slow-roasted vertical spit meats, crispy toasted wraps, and unmatched portion generosity.',
        sections: [
          {
            heading: '1. Perfectly Spit-Roasted Halal Meats',
            text: 'The secret to memorable shawarma lies in marinade mastery. At Turki-Pollito we select lean 100% Halal chicken and beef cuts seasoned with cumin, sweet paprika, cardamom, and oriental herbs.',
            bulletPoints: [
              'Freshly sliced to order for maximum juiciness.',
              'Customer-favorite mixed blend (chicken and beef).',
              'Lower fat profile with no artificial additives.',
            ],
          },
          {
            heading: '2. Crispy Lavash Flatbread & Signature Recipe',
            text: 'Our handmade lavash wraps are grilled to order right before packing, ensuring a golden, flaky crunch that never gets soggy during delivery.',
          },
          {
            heading: '3. Prime Location & Speedy Local Delivery',
            text: 'Enjoy dine-in, express counter pickup, or hot evening home delivery from 8:00 PM to 11:00 PM across La Zubia.',
          },
        ],
        conclusion: 'Do not settle for generic fast food. Order online with 10% discount using code APP10 and taste authentic Turkish craft.',
      },
    },
  },
  {
    id: 'blog-2',
    slug: 'carne-halal-certificada-la-zubia',
    title: {
      es: 'Carne 100% Halal Certificada: Nuestro Compromiso Inquebrantable con la Calidad',
      en: '100% Certified Halal Meat: Our Uncompromising Commitment to Quality',
    },
    category: { es: 'Calidad y Certificación', en: 'Quality & Sourcing' },
    readTime: '3 min',
    date: '2026-08-28',
    author: 'Dirección Turki-Pollito',
    excerpt: {
      es: 'Garantizamos trazabilidad completa en cada pieza de carne de pollo y ternera servida en nuestro restaurante en La Zubia.',
      en: 'We guarantee complete traceability on every cut of chicken and beef served at our restaurant in La Zubia.',
    },
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    keywords: ['kebab halal la zubia', 'carne halal granada', 'comida halal certificada', 'restaurante halal zubia'],
    content: {
      es: {
        intro: 'El término Halal simboliza pureza, respeto por el bienestar animal y los más rigurosos estándares sanitarios en la cadena de alimentación. En Kebab Turki-Pollito, toda nuestra carne cuenta con certificación oficial Halal comprobada.',
        sections: [
          {
            heading: 'Trazabilidad y Origen Controlado',
            text: 'Cada lote de pechuga de pollo y ternera procede de mataderos autorizados que cumplen con las normas islámicas de sacrificio y la directiva europea de seguridad alimentaria.',
            bulletPoints: [
              '100% libre de carne de cerdo y derivados.',
              'Lavado minucioso e higiene estricta en tablas de corte.',
              'Aceites vegetales limpios de primer uso.',
            ],
          },
          {
            heading: 'Sabor más Limpio, Textura Más Tierna',
            text: 'El método de desangrado completo propio del rito Halal permite que la carne conserve su pureza natural, evitando olores desagradables y favoreciendo la absorción del adobo de especias aromáticas.',
          },
        ],
        conclusion: 'Familias de toda La Zubia y Granada confían en nosotros día tras día sabiendo que cada plato servido en Calle Greco 2 es 100% transparente y respetuoso con sus valores.',
      },
      en: {
        intro: 'The term Halal represents purity, animal welfare respect, and rigorous hygiene standards. At Kebab Turki-Pollito, 100% of our poultry and beef is officially Halal certified.',
        sections: [
          {
            heading: 'Verified Origin & Full Traceability',
            text: 'Every batch is sourced from certified processors adhering to Islamic dietary laws and strict EU hygiene standards.',
            bulletPoints: [
              '100% free of pork and cross-contamination.',
              'Separate cutting stations and sanitary protocol.',
              'Fresh vegetable frying oils only.',
            ],
          },
          {
            heading: 'Cleaner Flavor and Superior Tenderness',
            text: 'Complete blood drainage ensures the meat retains fresh natural flavor, marinating deeply into aromatic spices.',
          },
        ],
        conclusion: 'Families across La Zubia trust Turki-Pollito for transparent, authentic, and delicious halal meals.',
      },
    },
  },
  {
    id: 'blog-3',
    slug: 'secreto-salsa-blanca-kebab-turki-pollito',
    title: {
      es: 'La Auténtica Salsa Blanca de Kebab: El Secreto Artesano de Turki-Pollito',
      en: 'The Authentic White Kebab Sauce: Turki-Pollito’s Artisanal Secret',
    },
    category: { es: 'Recetas y Secretos', en: 'Recipes & Secrets' },
    readTime: '3 min',
    date: '2026-08-22',
    author: 'Chef Asador Turki-Pollito',
    excerpt: {
      es: 'Olvida las salsas industriales aguadas. Te contamos qué hace tan adictiva, cremosa y equilibrada nuestra salsa blanca de yogur y ajo.',
      en: 'Forget watery industrial sauces. Learn what makes our creamy homemade garlic-yogurt white sauce so irresistible.',
    },
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80',
    keywords: ['salsa blanca kebab', 'salsa yogur kebab', 'receta kebab turki pollito', 'salsa picante kebab la zubia'],
    content: {
      es: {
        intro: 'En el mundo del döner kebab, la salsa blanca es el alma del plato. Si la salsa falla, el kebab pierde su magia. En Kebab Turki-Pollito elaboramos diariamente nuestra salsa blanca artesanal en pequeños lotes para garantizar su máxima frescura.',
        sections: [
          {
            heading: 'Base de Yogur Cremoso y Especias Mediterráneas',
            text: 'Utilizamos yogur natural de textura densa, aceite de oliva virgen extra, ajo confitado suave (sin ardor ni pesadez), zumo de limón fresco, hierbabuena seca y un punto secreto de eneldo.',
            bulletPoints: [
              'Textura aterciopelada que abraza la carne caliente.',
              'Equilibrio óptimo entre frescura ácida y notas aromáticas.',
              'Disponible también en versión combinada con salsa roja picante casera.',
            ],
          },
          {
            heading: 'El Maridaje con Nuestra Col Aliñada',
            text: 'Al entrar en contacto con nuestra col dulce finamente laminada y el tomate fresco, la salsa blanca crea esa emulsión única que todos reconocen al primer mordisco.',
          },
        ],
        conclusion: 'Pídela con tu durum, plato combinado o con una ración de patatas doradas. ¡Te aseguramos que no dejarás ni una gota!',
      },
      en: {
        intro: 'In the döner kebab world, the white sauce is the soul of the dish. At Kebab Turki-Pollito, we craft our signature white sauce in small daily batches for unbeatable richness.',
        sections: [
          {
            heading: 'Dense Yogurt Base with Mediterranean Herbs',
            text: 'Crafted with thick natural yogurt, virgin olive oil, sweet mellow garlic, fresh lemon juice, dried mint, and a touch of dill.',
            bulletPoints: [
              'Velvety texture that coats freshly sliced hot meat.',
              'Perfect balance between citrus acidity and herbal freshness.',
              'Available mixed with our spicy harissa chili sauce.',
            ],
          },
        ],
        conclusion: 'Pair it with your durum, combo platter, or golden french fries for pure comfort food bliss.',
      },
    },
  },
  {
    id: 'blog-4',
    slug: 'durum-doner-shawarma-diferencias',
    title: {
      es: 'Dürum, Döner o Shawarma: Conoce las Diferencias y Elige tu Favorito',
      en: 'Dürum, Döner or Shawarma: Know the Differences & Pick Your Match',
    },
    category: { es: 'Guías Gastronómicas', en: 'Food Guides' },
    readTime: '4 min',
    date: '2026-08-16',
    author: 'Redacción Turki-Pollito',
    excerpt: {
      es: '¿Pan de pita, pan lavash enrollado o plato abierto? Despejamos todas las dudas para que pidas exactamente lo que te apetece.',
      en: 'Pita bread, rolled lavash flatbread, or open platter? We explain every option so you order exactly what you crave.',
    },
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    keywords: ['diferencia durum doner', 'que es shawarma', 'pan lavash kebab', 'kebab la zubia'],
    featuredDishId: 'menu-durum-grande',
    content: {
      es: {
        intro: 'Muchas veces se utilizan como sinónimos, pero cada preparación tiene su personalidad propia y su momento ideal:',
        sections: [
          {
            heading: '1. El Döner Kebab Tradicional',
            text: 'Originario de Turquía (Döner significa "que gira"). Se sirve clásicamente dentro de un pan de pita tostado o pan turco crujiente en forma de bolsillo o media luna.',
          },
          {
            heading: '2. El Dürum (En Rollo)',
            text: 'En turco significa "rollo". La carne y vegetales se disponen sobre un pan plano lavash elástico y fino, se enrolla en forma de cilindro prieto y se marca al grill para sellarlo herméticamente.',
            bulletPoints: [
              'Ideal para comer en cualquier sitio sin derramar salsa.',
              'Mayor proporción de carne por bocado.',
              'En Turki-Pollito ofrecemos el "Especial de la Casa" con huevo, queso y toque de col.',
            ],
          },
          {
            heading: '3. El Shawarma (Tradición Árabe Levantina)',
            text: 'De origen árabe levantino, pone especial énfasis en el marinado con canela, clavo, cardamomo y ajo, comúnmente aliñado con salsa tahini o crema de ajo toum.',
          },
        ],
        conclusion: 'En nuestra carta de Calle Greco 2 encontrarás todas las variedades listas para disfrutar en el local o en tu sofá.',
      },
      en: {
        intro: 'Often used interchangeably, each dish offers distinct textures and traditions:',
        sections: [
          {
            heading: '1. Traditional Döner Kebab',
            text: 'Turkish for "rotating", served inside toasted pita pocket bread or half-moon sandwich buns.',
          },
          {
            heading: '2. The Dürum (Rolled Wrap)',
            text: 'Rolled tightly in flat lavash bread, grilled to seal in savory juices. Clean to eat and rich in meat flavor.',
          },
          {
            heading: '3. Shawarma (Levantine Heritage)',
            text: 'Spiced with cinnamon, cloves, cardamom, and garlic, often complemented with tahini and pickles.',
          },
        ],
        conclusion: 'Explore both formats on our online ordering platform with direct delivery to your door in La Zubia.',
      },
    },
  },
  {
    id: 'blog-5',
    slug: 'durum-gratinado-mozzarella-horno-la-zubia',
    title: {
      es: 'El Legendario Dürum Gratinado con Mozzarella: Nuestra Creación al Horno',
      en: 'The Legendary Oven-Baked Gratin Dürum: Our Melted Mozzarella Masterpiece',
    },
    category: { es: 'Especialidades', en: 'Specialties' },
    readTime: '3 min',
    date: '2026-08-10',
    author: 'Chef Asador Turki-Pollito',
    excerpt: {
      es: 'Descubre por qué nuestro durum gratinado con queso mozzarella fundido en bandeja de horno es el plato más aclamado de las noches de fin de semana.',
      en: 'Find out why our oven-baked durum smothered in bubbling melted mozzarella is the undisputed weekend favorite.',
    },
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80',
    keywords: ['durum gratinado la zubia', 'kebab queso fundido', 'plato gratinado mozzarella', 'turki pollito especial'],
    featuredDishId: 'menu-durum-gratinado',
    content: {
      es: {
        intro: 'Si pensabas que un buen durum no podía superarse, el Dürum Gratinado de Kebab Turki-Pollito te hará cambiar de idea. Se trata de una innovación culinaria que fusiona la jugosidad del asador turco con el placer del gratinado al horno tradicional.',
        sections: [
          {
            heading: 'Cómo se Prepara Nuestro Dürum Gratinado',
            text: 'Montamos un durum generoso con carne mixta, verduras crujientes y salsa blanca. Una vez enrollado, lo colocamos en bandeja refractaria, lo bañamos con un toque de salsa de tomate especiada y lo cubrimos con una densa manta de mozzarella 100% natural.',
            bulletPoints: [
              'Horneado a más de 250ºC hasta que el queso hace burbujas doradas.',
              'Toque final de orégano silvestre aromático.',
              'Disponible tanto en versión Menú Completo (con patatas y bebida) como en Plato individual.',
            ],
          },
        ],
        conclusion: 'Pídelo bien caliente a través de nuestra web oficial y prepárate para estirar el queso con cada tenedor.',
      },
      en: {
        intro: 'Taking comfort food to new heights, our Oven-Baked Gratin Dürum is layered with seasoned rotisserie meats and topped with abundant bubbling mozzarella cheese.',
        sections: [
          {
            heading: 'How We Bake It to Perfection',
            text: 'We roll a hearty durum wrap, place it in an oven dish, lightly glaze with spiced savory tomato coulis, and crown with thick shredded mozzarella baked at 250ºC.',
            bulletPoints: [
              'Golden melted cheese crust with aromatic wild oregano.',
              'Available as a full combo menu with fries and beverage, or solo platter.',
            ],
          },
        ],
        conclusion: 'Order it piping hot through our web shop and savor the ultimate cheese pull.',
      },
    },
  },
  {
    id: 'blog-6',
    slug: 'kebab-a-domicilio-la-zubia-guia-pedidos',
    title: {
      es: 'Kebab a Domicilio en La Zubia: Horarios, Precios y Zonas de Entrega',
      en: 'Home Delivery Kebab in La Zubia: Times, Prices & Coverage Zones',
    },
    category: { es: 'Servicio Delivery', en: 'Delivery Service' },
    readTime: '3 min',
    date: '2026-08-04',
    author: 'Equipo de Logística Turki-Pollito',
    excerpt: {
      es: 'Todo lo que necesitas saber para pedir tu cena a domicilio en La Zubia: pedido mínimo de 10€, gastos de envío de solo 1€ y entrega caliente en moto.',
      en: 'Everything you need to know about evening delivery in La Zubia: €10 minimum order, €1 delivery fee and fast courier dispatch.',
    },
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    keywords: ['kebab a domicilio la zubia', 'comida a domicilio la zubia', 'pedir kebab online', 'turki pollito telefono'],
    content: {
      es: {
        intro: '¿Quieres disfrutar de la mejor comida turca sin moverte del sofá? En Kebab Turki-Pollito disponemos de flota propia de reparto en moto que cubre todo el núcleo urbano de La Zubia y urbanizaciones colindantes.',
        sections: [
          {
            heading: 'Horario y Condiciones del Reparto',
            text: 'Nuestro servicio a domicilio opera todas las noches de 20:00h a 23:00h. El pedido mínimo es de solo 10,00€ y el suplemento de entrega es de apenas 1,00€.',
            bulletPoints: [
              'Bolsas térmicas profesionales para mantener la comida a temperatura óptima.',
              'Seguimiento GPS interactivo en tiempo real desde nuestra aplicación.',
              'Pagos cómodos: Efectivo al repartidor, Tarjeta bancaria o Bizum instantáneo.',
            ],
          },
          {
            heading: 'Teléfonos Directos para Encargos',
            text: 'Además de nuestra tienda web oficial, puedes llamarnos directamente al 958 890 208 o al móvil 641 271 079.',
          },
        ],
        conclusion: 'Haz tu pedido online con un par de toques y recibe confirmación por correo electrónico al instante.',
      },
      en: {
        intro: 'Craving top-tier Turkish fast food from the comfort of home? Our dedicated scooter delivery fleet covers La Zubia and surrounding neighborhoods every evening.',
        sections: [
          {
            heading: 'Delivery Hours and Minimums',
            text: 'Delivery runs daily from 8:00 PM to 11:00 PM. Minimum order is only €10.00 with a low €1.00 delivery surcharge.',
            bulletPoints: [
              'Insulated delivery thermal bags ensuring hot arrivals.',
              'Live interactive GPS tracking straight in your browser.',
              'Payment options: Cash on delivery, credit card, or instant Bizum.',
            ],
          },
        ],
        conclusion: 'Place your order online in seconds and track your courier live to your doorstep.',
      },
    },
  },
  {
    id: 'blog-7',
    slug: 'opciones-vegetarianas-falafel-la-zubia',
    title: {
      es: 'Opciones Vegetarianas en La Zubia: Falafel Casero Crujiente y Ensaladas Frescas',
      en: 'Vegetarian Options in La Zubia: Crispy Homemade Falafel & Fresh Salads',
    },
    category: { es: 'Veggie & Saludable', en: 'Veggie & Healthy' },
    readTime: '3 min',
    date: '2026-07-29',
    author: 'Chef Asador Turki-Pollito',
    excerpt: {
      es: 'El kebab no es solo para amantes de la carne. Descubre nuestro falafel 100% casero elaborado con garbanzos selectos, hierbas aromáticas y salsa tahini.',
      en: 'Kebab dining is not just for meat lovers. Taste our 100% handmade falafel crafted with chickpeas, fresh herbs, and tahini sauce.',
    },
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    keywords: ['falafel la zubia', 'comida vegetariana la zubia', 'kebab vegetariano granada', 'falafel casero pita'],
    featuredDishId: 'falafel-vegetal',
    content: {
      es: {
        intro: 'En Kebab Turki-Pollito cuidamos a todos nuestros comensales. Si buscas una opción vegetariana nutritiva, sabrosa y 100% vegetal, nuestro Falafel Artesanal es la elección estrella.',
        sections: [
          {
            heading: 'El Auténtico Falafel de Oriente Medio',
            text: 'A diferencia de los preparados industriales ultracongelados, hidratamos y trituramos garbanzos crudos con perejil fresco, cilantro, cebolla, ajo y una cuidada selección de especias orientales (comino, cardamomo y pimienta blanca).',
            bulletPoints: [
              'Fritura exterior crujiente con interior verde, esponjoso y aromático.',
              'Disponible en Pan de Pita tradicional o enrollado en Pan Shawarma.',
              'Acompañado de lechuga, tomate en dados, col dulce y salsa de yogur o tahini.',
            ],
          },
        ],
        conclusion: 'Una alternativa llena de proteínas vegetales y sabor auténtico que enamora tanto a vegetarianos como a carnívoros.',
      },
      en: {
        intro: 'At Kebab Turki-Pollito we cater to all palates. If you are looking for a nutritious, flavorful, 100% plant-based meal, our Artisanal Falafel is the undisputed star.',
        sections: [
          {
            heading: 'Middle Eastern Falafel Heritage',
            text: 'We soak raw chickpeas and grind them with fresh parsley, cilantro, onion, garlic, and freshly toasted spices.',
            bulletPoints: [
              'Golden crunchy crust with a vibrant green, tender interior.',
              'Served in traditional Pita Pocket or rolled in Shawarma wrap.',
              'Paired with crisp salad and yogurt or tahini drizzle.',
            ],
          },
        ],
        conclusion: 'Packed with plant-based protein and authentic Mediterranean flavor.',
      },
    },
  },
  {
    id: 'blog-8',
    slug: 'lahmacun-pizza-turca-artesanal-calle-greco',
    title: {
      es: 'Pizza Turca (Lahmacun): Tradición Milenaria de Masa Fina en Calle Greco 2',
      en: 'Turkish Pizza (Lahmacun): Millenary Thin-Crust Tradition on Calle Greco 2',
    },
    category: { es: 'Tradición Culinaria', en: 'Culinary Heritage' },
    readTime: '3 min',
    date: '2026-07-21',
    author: 'Chef Asador Turki-Pollito',
    excerpt: {
      es: 'La masa fina horneada con carne picada especiada, verduras frescas y aceitunas negras que revoluciona el concepto de pizza en La Zubia.',
      en: 'The crispy thin flatbread topped with seasoned minced meat, fresh greens, and black olives that redefines pizza in La Zubia.',
    },
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    keywords: ['pizza turca la zubia', 'lahmacun granada', 'comida turca zubia', 'turki pollito carta'],
    featuredDishId: 'menu-pizza-turca',
    content: {
      es: {
        intro: 'Conocida mundialmente como la pizza turca, el Lahmacun es una de las joyas de la gastronomía otomana. Su masa ultrafina y crujiente se estira a mano antes de entrar en contacto con el fuego.',
        sections: [
          {
            heading: 'La Receta Tradicional de Lahmacun',
            text: 'Se unta una fina capa de carne picada sazonada con pimientos rojos asados, cebolla, tomate triturado y perejil. Al salir del horno crujiente, se corona con lechuga fresca, rodajas de tomate, col aliñada, aceitunas negras y un toque de salsa blanca.',
            bulletPoints: [
              'Mucho más ligera y digestiva que la pizza convencional.',
              'Se puede comer enrollada como un taco gigante o en porciones triangulares.',
              'Disponible en menú con patatas y refresco o individual.',
            ],
          },
        ],
        conclusion: 'Si aún no has probado una auténtica pizza turca en La Zubia, añade este clásico a tu próximo pedido.',
      },
      en: {
        intro: 'Often called Turkish pizza, Lahmacun is an Anatolian culinary treasure featuring an ultra-thin, blistered flatbread baked to crackling perfection.',
        sections: [
          {
            heading: 'The Traditional Lahmacun Recipe',
            text: 'Topped with finely spiced minced meat, crushed tomatoes, bell peppers, and parsley. Finished with fresh vegetables, black olives, and signature sauce.',
            bulletPoints: [
              'Light, crunchy, and easier to digest than regular pizza.',
              'Roll it up like a giant Turkish taco or enjoy flat.',
            ],
          },
        ],
        conclusion: 'Taste the millenary flavor of Anatolia right here on Calle Greco 2.',
      },
    },
  },
  {
    id: 'blog-9',
    slug: 'campero-carne-media-luna-kebab-zubia',
    title: {
      es: 'Por Qué el Pan Campero y la Media Luna Triunfan en Nuestra Carta',
      en: 'Why Campero Sandwiches & Media Luna are Big Hits on Our Menu',
    },
    category: { es: 'Especialidades', en: 'Specialties' },
    readTime: '3 min',
    date: '2026-07-15',
    author: 'Chef Asador Turki-Pollito',
    excerpt: {
      es: 'La fusión perfecta entre el clásico mollete campero andaluz tostado al grill y la carne especiada de kebab más jugosa de Granada.',
      en: 'The ideal fusion between toasted Andalusian campero rolls and the juiciest spit-roasted kebab meat in Granada.',
    },
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    keywords: ['campero carne la zubia', 'media luna kebab', 'bocadillo kebab granada', 'turki pollito campero'],
    featuredDishId: 'campero-carne',
    content: {
      es: {
        intro: 'El campero es una religión en Andalucía oriental. En Kebab Turki-Pollito decidimos rendir homenaje a este emblema local uniéndolo con el mejor asado turco.',
        sections: [
          {
            heading: 'El Campero de Carne al Grill',
            text: 'Utilizamos pan mollete redondo con corteza fina y miga esponjosa. Lo tostamos a presión en la plancha con carne de kebab recién cortada, queso fundido, cebolla caramelizada o fresca, rodajas de tomate, lechuga y nuestra salsa.',
          },
          {
            heading: 'El Pan Media Luna: Generosidad sin Límites',
            text: 'Para quienes buscan un bocadillo con personalidad única, nuestro pan semicircular Media Luna permite albergar huevo frito, queso fundido y doble ración de carne sin perder consistencia.',
          },
        ],
        conclusion: 'Una combinación explosiva de crujido y jugosidad que solo encontrarás en Calle Greco 2.',
      },
      en: {
        intro: 'The campero sandwich is an Andalusian institution. At Turki-Pollito, we united this iconic crusty toasted bun with our spit-roasted kebab meats.',
        sections: [
          {
            heading: 'The Grilled Kebab Campero',
            text: 'Fluffy round roll pressed on the plancha grill with hot meat, melted cheese, crisp onion, sliced tomatoes, and zesty sauces.',
          },
          {
            heading: 'The Media Luna Half-Moon Sandwich',
            text: 'Stuffed with fried egg, cheese, and double meat inside a semicircular pocket bun.',
          },
        ],
        conclusion: 'Experience this Granada-Turkish crossover dish on your next evening order.',
      },
    },
  },
  {
    id: 'blog-10',
    slug: 'como-pedir-online-turki-pollito-descuento-gps',
    title: {
      es: 'Guía para Pedir Kebab Turki-Pollito Online con Descuento y Seguimiento en Vivo',
      en: 'Guide to Ordering Kebab Turki-Pollito Online with Discounts & Live GPS',
    },
    category: { es: 'Guías de Pedido', en: 'Ordering Guides' },
    readTime: '3 min',
    date: '2026-07-08',
    author: 'Soporte Turki-Pollito',
    excerpt: {
      es: 'Aprende a personalizar tu pedido, aplicar el cupón APP10 de bienvenida, pagar con Bizum o tarjeta y rastrear al repartidor en tiempo real por La Zubia.',
      en: 'Learn how to customize your order, apply welcome code APP10, pay securely with Bizum or card, and track your courier in real-time.',
    },
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    keywords: ['pedir kebab online la zubia', 'descuento kebab turki pollito', 'cupon APP10', 'seguimiento pedido kebab'],
    content: {
      es: {
        intro: 'Pedir tu kebab favorito en La Zubia nunca fue tan fácil. Nuestra plataforma web oficial está optimizada para que hagas tu pedido en menos de 2 minutos sin intermediarios.',
        sections: [
          {
            heading: 'Paso 1: Elige tus Platos y Personaliza Carnes y Salsas',
            text: 'Accede a la carta oficial y selecciona tu durum, menú o plato gratinado. Puedes elegir carne de pollo, ternera o mixta, tus salsas favoritas e ingredientes extra.',
          },
          {
            heading: 'Paso 2: Aplica el Código Promocional "APP10"',
            text: 'En el carrito de compra introduce el cupón "APP10" para disfrutar de un 10% de descuento automático en tu pedido.',
            bulletPoints: [
              'Válido tanto para entrega a domicilio como recogida en local.',
              'Pago seguro con Tarjeta de crédito, Bizum o Efectivo en mano.',
            ],
          },
          {
            heading: 'Paso 3: Sigue tu Pedido en el Mapa en Vivo y Recibe Confirmación por Email',
            text: 'Una vez enviado, podrás ver en pantalla cómo avanza el estado: Recibido ➔ En Cocina ➔ En Reparto con Mustafa en moto ➔ ¡Entregado! Además, recibirás un email con el desglose completo del ticket.',
          },
        ],
        conclusion: '¡Prueba la experiencia de pedido online más avanzada de La Zubia y disfruta de la mejor cena turca esta noche!',
      },
      en: {
        intro: 'Ordering your favorite kebab in La Zubia has never been smoother. Our web app lets you build your dinner order in under two minutes with direct restaurant dispatch.',
        sections: [
          {
            heading: 'Step 1: Pick Dishes & Customize Ingredients',
            text: 'Browse our menu categories and choose your meat, sauces, drinks, and extra toppings with transparent pricing.',
          },
          {
            heading: 'Step 2: Enter Promo Code "APP10"',
            text: 'Apply coupon code APP10 in your shopping cart for an instant 10% discount on your order.',
          },
          {
            heading: 'Step 3: Live GPS Route Tracking & Email Receipts',
            text: 'Watch your order advance in real time on our interactive map while receiving instant email notifications.',
          },
        ],
        conclusion: 'Start your order now and taste why La Zubia loves Kebab Turki-Pollito!',
      },
    },
  },
];
