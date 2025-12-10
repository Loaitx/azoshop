

import { Product, Translation, SiteContent, CategoryItem } from './types';

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 'systems', label: { en: 'Metin2 Systems', ar: 'أنظمة ماتين2' }, icon: 'Cpu' },
  { id: 'models', label: { en: '3D Models', ar: 'موديلات 3D' }, icon: 'Box' },
  { id: 'scripts', label: { en: 'Web Scripts', ar: 'سكربتات ويب' }, icon: 'Code' },
  { id: 'services', label: { en: 'Dev Services', ar: 'خدمات برمجية' }, icon: 'Wrench' },
  { id: 'discord', label: { en: 'Discord', ar: 'دسكورد' }, icon: 'MessageCircle' },
];

export const SOCIAL_LINKS = {
  discord: 'https://discord.com/invite/5We4AutPK4',
  whatsapp: 'https://wa.me/message/T5G3GMFH7BD5J1'
};

export const TRANSLATIONS: Translation = {
  heroTitle: {
    en: 'Upgrade Your Metin2 Server Today',
    ar: 'طور سيرفر ماتين2 الخاص بك اليوم'
  },
  heroSubtitle: {
    en: 'The best marketplace for systems, models, scripts, and professional development services.',
    ar: 'أفضل متجر للأنظمة والموديلات والسكربتات وخدمات التطوير الاحترافية.'
  },
  searchPlaceholder: {
    en: 'Search for systems, models...',
    ar: 'ابحث عن أنظمة، موديلات...'
  },
  details: { en: 'Details', ar: 'التفاصيل' },
  contact: { en: 'Contact', ar: 'تواصل' },
  buy: { en: 'Buy Now', ar: 'شراء الآن' },
  download: { en: 'Download', ar: 'تحميل' },
  free: { en: 'FREE', ar: 'مجاني' },
  seller: { en: 'Seller', ar: 'البائع' },
  close: { en: 'Close', ar: 'إغلاق' },
  features: { en: 'Features', ar: 'المميزات' },
  price: { en: 'Price', ar: 'السعر' },
  rights: { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
  toggleTheme: { en: 'Toggle Theme', ar: 'تبديل المظهر' },
  language: { en: 'العربية', ar: 'English' }, 
  noResults: { en: 'No products found.', ar: 'لا توجد منتجات.' },
  footerDesc: {
    en: 'Your premium destination for Metin2 development and resources.',
    ar: 'وجهتك الأولى لتطوير وموارد ماتين2.'
  },
  contactVia: { en: 'Contact via Discord', ar: 'تواصل عبر دسكورد' },
  purchaseNote: { 
    en: 'Instant delivery after payment.', 
    ar: 'تسليم فوري بعد الدفع.' 
  },
  sale: { en: 'SALE', ar: 'عرض' },
  checkoutTitle: { en: 'Secure Checkout', ar: 'دفع آمن' },
  step1: { en: 'Payment', ar: 'الدفع' },
  step2: { en: 'Proof', ar: 'الإثبات' },
  step3: { en: 'Finish', ar: 'إنهاء' },
  directLink: { en: 'Direct Purchase Link', ar: 'رابط الشراء المباشر' },
  uploadProof: { en: 'Upload Payment Proof', ar: 'رفع صورة التحويل' },
  uploadDesc: { en: 'Please upload a screenshot of your transaction.', ar: 'يرجى رفع لقطة شاشة لعملية التحويل.' },
  confirmUpload: { en: 'Confirm & Send', ar: 'تأكيد وإرسال' },
  successTitle: { en: 'Order Received!', ar: 'تم استلام الطلب!' },
  successDesc: { en: 'Please contact us via WhatsApp or Discord to receive your product immediately.', ar: 'يرجى التواصل معنا عبر الواتساب أو دسكورد لاستلام منتجك فوراً.' },
  contactWhatsapp: { en: 'Contact via WhatsApp', ar: 'تواصل عبر واتساب' },
  contactDiscord: { en: 'Contact via Discord', ar: 'تواصل عبر دسكورد' },
  backToStore: { en: 'Back to Store', ar: 'العودة للمتجر' },
  clickToPay: { en: 'Click here to Pay', ar: 'اضغط هنا للدفع' }
};

export const DEFAULT_CONTENT: SiteContent = {
  identity: {
    siteName: { en: 'AZO.ONE', ar: 'AZO.ONE' }
  },
  defaultSeller: 'AZO Team',
  heroTitle: TRANSLATIONS.heroTitle,
  heroSubtitle: TRANSLATIONS.heroSubtitle,
  announcement: {
    enabled: true,
    text: { en: '🔥 Special Offer: Get 20% OFF on all Systems this week!', ar: '🔥 عرض خاص: خصم 20% على جميع الأنظمة هذا الأسبوع!' }
  },
  socialLinks: {
    discord: SOCIAL_LINKS.discord,
    whatsapp: SOCIAL_LINKS.whatsapp,
    twitter: '#',
    instagram: '#',
    facebook: '#'
  },
  contact: {
    email: 'support@azo.one',
    location: { en: 'Digital World', ar: 'العالم الرقمي' }
  },
  pages: [
    { 
      id: '1', 
      title: { en: 'Support', ar: 'الدعم الفني' }, 
      url: '#',
      isExternal: false,
      content: {
        en: '<h1 class="text-3xl font-bold mb-4">Support Center</h1><p>We are here to help you 24/7. Please contact us via Discord for immediate assistance.</p>',
        ar: '<h1 class="text-3xl font-bold mb-4">مركز الدعم</h1><p>نحن هنا لمساعدتك على مدار الساعة. يرجى التواصل معنا عبر دسكورد للحصول على مساعدة فورية.</p>'
      }
    },
    { 
      id: '2', 
      title: { en: 'Terms of Service', ar: 'شروط الخدمة' }, 
      url: '#',
      isExternal: false,
      content: {
        en: '<h1 class="text-3xl font-bold mb-4">Terms of Service</h1><p>By purchasing our digital products, you agree that there are <strong>no refunds</strong> once files are delivered.</p><ul><li>Do not share files.</li><li>Support is provided for installation only.</li></ul>',
        ar: '<h1 class="text-3xl font-bold mb-4">شروط الخدمة</h1><p>عند شراء منتجاتنا الرقمية، فإنك توافق على أنه <strong>لا يوجد استرداد للأموال</strong> بمجرد تسليم الملفات.</p><ul><li>لا تقم بمشاركة الملفات.</li><li>الدعم مقدم للتركيب فقط.</li></ul>'
      }
    }
  ],
  footerRights: {
    text: { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
    link: 'https://azo.one'
  }
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: { en: 'Advanced Battle Pass System', ar: 'نظام باتل باس متطور' },
    description: {
      en: 'A fully customizable Battle Pass system with premium and free tracks, missions, and rewards UI.',
      ar: 'نظام باتل باس قابل للتخصيص بالكامل مع مسارات مجانية ومدفوعة، مهام، وواجهة مستخدم للمكافآت.'
    },
    price: 150,
    discountPrice: 120,
    currency: '$',
    category: 'systems',
    rating: 4.8,
    reviewsCount: 42,
    seller: 'DevAhmed',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    features: {
      en: ['Clean C++ Source', 'Python UI Included', 'Configurable Missions', 'Optimized Performance'],
      ar: ['سورس C++ نظيف', 'واجهة بايثون متضمنة', 'مهام قابلة للتعديل', 'أداء محسن']
    },
    badges: ['Best Seller', 'Hot']
  },
  {
    id: '2',
    title: { en: 'Legendary Armor Set 3D', ar: 'طقم دروع أسطوري 3D' },
    description: {
      en: 'High quality 3D armor set for all classes. Includes textures, GR2 files, and icons.',
      ar: 'طقم دروع ثلاثي الأبعاد عالي الجودة لجميع الشخصيات. يشمل التكسترات وملفات GR2 والأيقونات.'
    },
    price: 45,
    currency: '$',
    category: 'models',
    rating: 5.0,
    reviewsCount: 15,
    seller: '3D_Master',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    features: {
      en: ['Warrior, Ninja, Sura, Shaman', 'High Res Textures', 'Shiny Effect Ready'],
      ar: ['محارب، نينجا، سورا، شامان', 'تكسرات عالية الدقة', 'جاهز للمعة']
    },
    badges: ['New']
  },
  {
    id: '3',
    title: { en: 'Professional Server Website', ar: 'موقع سيرفر احترافي' },
    description: {
      en: 'Modern, responsive PHP/Laravel website with ranking, item shop, and user panel.',
      ar: 'موقع PHP/Laravel حديث ومتجاوب مع التصنيف، متجر الأدوات، ولوحة المستخدم.'
    },
    price: 200,
    currency: '$',
    category: 'scripts',
    rating: 4.9,
    reviewsCount: 28,
    seller: 'WebWizard',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    features: {
      en: ['Admin Panel', 'Payment Integration', 'SEO Optimized', 'Ranking System'],
      ar: ['لوحة تحكم', 'بوابات دفع', 'محسن لمحركات البحث', 'نظام ترتيب']
    },
    badges: []
  },
  {
    id: '4',
    title: { en: 'Discord Setup & Security Bot', ar: 'إنشاء دسكورد وبوت حماية' },
    description: {
      en: 'Full Discord server setup with roles, channels, and a custom security bot for anti-raid.',
      ar: 'إعداد كامل لسيرفر دسكورد مع الرتب والقنوات وبوت حماية مخصص ضد الهجمات.'
    },
    price: 80,
    currency: '$',
    category: 'discord',
    rating: 4.7,
    reviewsCount: 56,
    seller: 'AzoBotDev',
    imageUrl: 'https://picsum.photos/400/300?random=4',
    features: {
      en: ['Ticket System', 'Auto Moderation', 'Leveling System', 'Welcome Messages'],
      ar: ['نظام تذاكر', 'إدارة تلقائية', 'نظام لفلات', 'رسائل ترحيب']
    },
    badges: ['Recommended']
  },
  {
    id: '5',
    title: { en: 'Offlineshop System', ar: 'نظام المتاجر الأوفلاين' },
    description: {
      en: 'Allow players to sell items while offline. Includes search filter and bank system.',
      ar: 'اسمح للاعبين ببيع الأدوات وهم غير متصلين. يشمل فلتر بحث ونظام بنك.'
    },
    price: 300,
    currency: '$',
    category: 'systems',
    rating: 4.5,
    reviewsCount: 112,
    seller: 'SystemKing',
    imageUrl: 'https://picsum.photos/400/300?random=5',
    features: {
      en: ['Item Search', 'Yang Storage', 'Time Limit Config', 'Cache Optimized'],
      ar: ['بحث عن أدوات', 'تخزين يانغ', 'وقت قابل للتعديل', 'كاش محسن']
    },
    badges: ['Top Rated']
  },
  {
    id: '6',
    title: { en: 'Custom Quest Service', ar: 'خدمة كويستات مخصصة' },
    description: {
      en: 'We will write any Lua quest for your Metin2 server based on your story or requirements.',
      ar: 'سنقوم بكتابة أي كويست Lua لسيرفر ماتين2 الخاص بك بناءً على قصتك أو متطلباتك.'
    },
    price: 20,
    currency: '$',
    category: 'services',
    rating: 5.0,
    reviewsCount: 8,
    seller: 'LuaExpert',
    imageUrl: 'https://picsum.photos/400/300?random=6',
    features: {
      en: ['Bug Free', 'Optimized Functions', 'Fast Delivery', 'Revisions Included'],
      ar: ['خالي من الأخطاء', 'دوال محسنة', 'تسليم سريع', 'تعديلات مشمولة']
    },
    badges: []
  }
];