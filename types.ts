

export type Language = 'en' | 'ar';

export type View = 'home' | 'checkout' | 'page';

export interface CategoryItem {
  id: string;
  label: { en: string; ar: string };
  icon: string; // Lucide icon name string
}

export interface Product {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  price: number;
  discountPrice?: number;
  currency: string;
  category: string; // References CategoryItem.id
  rating: number;
  reviewsCount: number;
  seller: string;
  imageUrl: string;
  features: {
    en: string[];
    ar: string[];
  };
  badges?: string[];
}

export interface Announcement {
  enabled: boolean;
  text: { en: string; ar: string };
}

export interface SocialLinks {
  discord: string;
  whatsapp: string;
  twitter: string;
  instagram: string;
  facebook: string;
}

export interface PageLink {
  id: string;
  title: { en: string; ar: string };
  url: string; // External link if isExternal is true
  isExternal?: boolean;
  content?: { en: string; ar: string }; // HTML content for internal pages
}

export interface ContactInfo {
  email: string;
  location: { en: string; ar: string };
}

export interface SiteIdentity {
  siteName: { en: string; ar: string };
}

export interface FooterRights {
  text: { en: string; ar: string };
  link: string;
}

export interface SiteContent {
  identity: SiteIdentity;
  defaultSeller: string; // Display name for products
  heroTitle: { en: string; ar: string };
  heroSubtitle: { en: string; ar: string };
  announcement: Announcement;
  socialLinks: SocialLinks;
  contact: ContactInfo;
  pages: PageLink[];
  footerRights: FooterRights;
}

export interface StoreContextType {
  products: Product[];
  categories: CategoryItem[];
  siteContent: SiteContent;
  
  // Product Actions
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  
  // Category Actions
  addCategory: (category: CategoryItem) => void;
  updateCategory: (category: CategoryItem) => void;
  deleteCategory: (id: string) => void;

  // Content Actions
  updateSiteContent: (content: SiteContent) => void;
  
  // System
  resetToDefaults: () => void;
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  exportData: () => string;
  importData: (jsonData: string) => boolean;
}

export interface Translation {
  [key: string]: {
    en: string;
    ar: string;
  };
}