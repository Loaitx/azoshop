
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import AdminDashboard from './components/admin/AdminDashboard';
import CheckoutPage from './components/CheckoutPage';
import PageViewer from './components/PageViewer';
import { TRANSLATIONS, SOCIAL_LINKS } from './constants';
import { Language, Product, View, PageLink } from './types';
import { StoreProvider, useStore } from './context/StoreContext';
import * as LucideIcons from 'lucide-react';

// Internal component that uses the store
const AppContent: React.FC = () => {
  const { products, categories, siteContent, isAdmin, login } = useStore();
  
  // State
  const [lang, setLang] = useState<Language>('ar');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const [loginError, setLoginError] = useState(false);
  
  // View State (Routing)
  const [currentView, setCurrentView] = useState<View>('home');
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [activePage, setActivePage] = useState<PageLink | null>(null);

  // Initialize Theme and Direction
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.title = siteContent.identity.siteName[lang] || 'AZO ONE SHOP';
  }, [lang, siteContent]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handlers
  const toggleTheme = () => setIsDark(!isDark);
  
  const handleProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleBuyProduct = (product: Product) => {
    setCheckoutProduct(product);
    setIsModalOpen(false); // Close modal if open
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300); // Clear after animation
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(adminUsername, adminPassword)) {
      setShowAdminLogin(false);
      setShowDashboard(true);
      setAdminUsername('');
      setAdminPassword('');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // Filter Products
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const t = TRANSLATIONS;

  // Dynamic Icon Component
  const CategoryIcon = ({ iconName, isActive }: { iconName: string, isActive: boolean }) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
    return <Icon size={20} className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-cyber-primary'}`} />;
  };

  // Original Brand Icons (SVGs)
  const BrandIcons: { [key: string]: React.ReactNode } = {
    discord: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.772-.6083 1.1588a18.4045 18.4045 0 00-8.4962 0c-.1636-.3868-.3973-.7835-.6115-1.1588a.0741.0741 0 00-.0785-.0371 19.718 19.718 0 00-4.8852 1.5152.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.0991.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
      </svg>
    ),
    whatsapp: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    twitter: (
       <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
       </svg>
    ),
    instagram: (
       <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
       </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
         <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  };

  // Render Admin Dashboard if active
  if (showDashboard && isAdmin) {
    return <AdminDashboard onExit={() => setShowDashboard(false)} />;
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-cyber-bg transition-colors duration-500 font-sans pb-20 overflow-x-hidden selection:bg-cyber-primary selection:text-white relative ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
          {/* Animated Grid */}
          <div className="absolute inset-0 bg-cyber-grid bg-[length:40px_40px] opacity-[0.03] dark:opacity-[0.1] animate-grid-flow"></div>
          
          {/* Gradient Spotlights */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyber-primary/20 rounded-full blur-[150px] animate-pulse-slow mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyber-secondary/20 rounded-full blur-[150px] animate-pulse-slow mix-blend-screen" style={{ animationDelay: '2s' }} />
      </div>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white dark:bg-cyber-card p-8 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 border border-white/10">
             <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-cyber-card border border-cyber-primary/30 flex items-center justify-center">
                    <LucideIcons.Lock size={30} className="text-cyber-primary" />
                </div>
             </div>
             <h2 className="text-2xl font-black mb-2 text-center text-gray-900 dark:text-white uppercase tracking-wider">Access Denied</h2>
             <p className="text-center text-gray-500 mb-6 text-sm">Please authenticate to continue to the console.</p>
             <form onSubmit={handleAdminLogin}>
               <input 
                 type="text" 
                 value={adminUsername} 
                 onChange={e => setAdminUsername(e.target.value)}
                 placeholder="Username" 
                 className="w-full p-4 rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-black/40 mb-3 focus:ring-2 ring-cyber-primary outline-none text-gray-900 dark:text-white text-center tracking-widest"
                 autoFocus
               />
               <input 
                 type="password" 
                 value={adminPassword} 
                 onChange={e => setAdminPassword(e.target.value)}
                 placeholder="Password" 
                 className="w-full p-4 rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-black/40 mb-6 focus:ring-2 ring-cyber-primary outline-none text-gray-900 dark:text-white text-center tracking-widest"
               />
               
               {loginError && <p className="text-red-500 text-xs text-center mb-4 font-bold uppercase">Invalid Credentials</p>}

               <div className="flex gap-3">
                 <button type="button" onClick={() => setShowAdminLogin(false)} className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-white/10 transition-colors">Abort</button>
                 <button type="submit" className="flex-1 py-3 rounded-xl bg-cyber-primary text-white font-bold hover:bg-cyan-400 shadow-lg shadow-cyber-primary/20 transition-all">Unlock</button>
               </div>
             </form>
          </div>
        </div>
      )}

      {/* Navbar - Always visible but functionality changes based on view */}
      <Navbar 
          lang={lang} 
          setLang={setLang} 
          isDark={isDark} 
          toggleTheme={toggleTheme}
          activeCategory={activeCategory}
          setActiveCategory={(cat) => {
              setActiveCategory(cat);
              setCurrentView('home'); // Reset view on category click
          }}
      />

      {/* VIEW: CHECKOUT */}
      {currentView === 'checkout' && checkoutProduct ? (
        <CheckoutPage 
            product={checkoutProduct} 
            lang={lang} 
            onBack={() => setCurrentView('home')} 
        />
      ) : currentView === 'page' && activePage ? (
      /* VIEW: CUSTOM PAGE */
        <PageViewer 
            page={activePage} 
            lang={lang} 
            onBack={() => setCurrentView('home')} 
        />
      ) : (
      /* VIEW: HOME */
      <>
        {/* Announcement Bar */}
        {siteContent.announcement?.enabled && (
            <div className="bg-cyber-card/80 backdrop-blur-md border-b border-white/5 text-white text-center py-2 text-xs font-bold tracking-widest uppercase relative z-[60] animate-fade-in-up mt-24 md:mt-0">
            <span className="text-cyber-primary mr-2">Shop Announcement:</span> {siteContent.announcement.text[lang]}
            </div>
        )}

        {/* Hero Section */}
        <section className="relative pt-48 pb-24 overflow-hidden z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                
                <div className="inline-block animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-primary/10 border border-cyber-primary/20 text-cyber-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        <span className="w-2 h-2 rounded-full bg-cyber-primary animate-ping"></span>
                        System Online V3.0
                    </div>
                </div>

                <h1 className="text-6xl sm:text-8xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter leading-none animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 dark:from-white dark:via-gray-300 dark:to-gray-600 drop-shadow-2xl">
                    {siteContent.heroTitle[lang].split(' ')[0]}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary animate-shimmer bg-[length:200%_auto]">
                    {siteContent.heroTitle[lang].split(' ').slice(1).join(' ')}
                </span>
                </h1>

                <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up border-l-2 border-cyber-primary/50 pl-4 text-left md:text-center md:border-l-0 md:pl-0" style={{ animationDelay: '0.3s' }}>
                {siteContent.heroSubtitle[lang]}
                </p>

                <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <button 
                    onClick={() => document.getElementById('products-section')?.scrollIntoView()}
                    className="px-8 py-4 rounded-xl bg-white dark:bg-white text-black font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        {lang === 'ar' ? 'استكشف المتجر' : 'Explore Store'}
                    </button>
                    <button 
                    onClick={() => window.open(SOCIAL_LINKS.discord, '_blank')}
                    className="px-8 py-4 rounded-xl bg-transparent border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white font-bold text-sm tracking-widest uppercase hover:bg-white/5 transition-colors backdrop-blur-sm"
                    >
                        {lang === 'ar' ? 'انضم للدسكورد' : 'Join Discord'}
                    </button>
                </div>
            </div>

            {/* 3D Floating Elements */}
            <div className="absolute top-1/4 left-[10%] hidden xl:block animate-float opacity-40">
                <div className="w-24 h-24 rounded-2xl border border-cyber-primary/30 bg-cyber-primary/5 backdrop-blur-sm rotate-12 flex items-center justify-center neon-border">
                    <LucideIcons.Cpu size={40} className="text-cyber-primary" />
                </div>
            </div>
            <div className="absolute top-1/3 right-[10%] hidden xl:block animate-float opacity-40" style={{ animationDelay: '1.5s' }}>
                <div className="w-20 h-20 rounded-2xl border border-cyber-secondary/30 bg-cyber-secondary/5 backdrop-blur-sm -rotate-6 flex items-center justify-center neon-border">
                    <LucideIcons.Box size={32} className="text-cyber-secondary" />
                </div>
            </div>
        </section>

        {/* Main Content */}
        <main id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
            
            {/* Category Filter Pills (Desktop) */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up">
            {categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 group ${
                        activeCategory === cat.id 
                        ? 'bg-cyber-primary/10 border-cyber-primary text-cyber-primary shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                    }`}
                >
                    <CategoryIcon iconName={cat.icon} isActive={activeCategory === cat.id} />
                    <span className="text-sm font-bold uppercase tracking-wide">{cat.label[lang]}</span>
                </button>
            ))}
            </div>

            {/* Header */}
            <div className="flex items-end justify-between mb-8 border-b border-gray-200 dark:border-white/5 pb-4">
            <div>
                <span className="text-[10px] font-bold text-cyber-secondary uppercase tracking-widest block mb-1">Catalog //</span>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                    {categories.find(c => c.id === activeCategory)?.label[lang] || 'All'}
                </h2>
            </div>
            <span className="text-4xl font-black text-gray-200 dark:text-white/5">
                {String(filteredProducts.length).padStart(2, '0')}
            </span>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {filteredProducts.map((product, index) => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    lang={lang} 
                    onDetails={handleProductDetails}
                    onBuy={handleBuyProduct}
                    index={index}
                />
                ))}
            </div>
            ) : (
            <div className="text-center py-32 rounded-3xl border border-dashed border-gray-300 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 animate-fade-in-up">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 dark:bg-white/5 mb-6 text-gray-400 animate-pulse">
                <LucideIcons.SearchX size={32} />
                </div>
                <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                {t.noResults[lang]}
                </p>
            </div>
            )}
        </main>
      </>
      )}

      {/* Footer */}
      <footer className="relative bg-white dark:bg-black border-t border-gray-200 dark:border-white/10 pt-20 pb-10 overflow-hidden z-10">
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                  <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-cyber-primary rounded flex items-center justify-center text-black font-black">
                            {siteContent.identity.siteName.en.charAt(0)}
                        </div>
                        <span className="font-black text-2xl tracking-tighter text-gray-900 dark:text-white">
                            {siteContent.identity.siteName[lang]}
                        </span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
                          {t.footerDesc[lang]}
                      </p>
                      <div className="flex gap-4">
                          {Object.entries(siteContent.socialLinks || {}).map(([key, url], i) => {
                              if(!url || url === '#') return null;
                              const Icon = BrandIcons[key];
                              return (
                                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyber-primary transition-all">
                                    {Icon}
                                </a>
                              )
                          })}
                      </div>
                  </div>
                  
                  <div>
                      <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-widest text-xs mb-6">Links</h4>
                      <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                          {/* Removed Home Link */}
                          {siteContent.pages?.map(page => (
                              <li key={page.id}>
                                  <a 
                                    href={page.isExternal ? page.url : '#'} 
                                    target={page.isExternal ? '_blank' : undefined}
                                    rel={page.isExternal ? 'noopener noreferrer' : undefined}
                                    onClick={(e) => {
                                        if (!page.isExternal) {
                                            e.preventDefault();
                                            setActivePage(page);
                                            setCurrentView('page');
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                    }}
                                    className="hover:text-cyber-primary transition-colors"
                                  >
                                      {page.title[lang]}
                                  </a>
                              </li>
                          ))}
                      </ul>
                  </div>

                  <div>
                       <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-widest text-xs mb-6">Contact</h4>
                       <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                          {siteContent.contact.email && (
                            <li className="flex items-center gap-2"><LucideIcons.Mail size={14}/> {siteContent.contact.email}</li>
                          )}
                          {siteContent.contact.location[lang] && (
                            <li className="flex items-center gap-2"><LucideIcons.MapPin size={14}/> {siteContent.contact.location[lang]}</li>
                          )}
                       </ul>
                  </div>
              </div>
              
              <div className="pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-gray-400 text-xs font-medium">
                      &copy; {new Date().getFullYear()} {siteContent.identity.siteName[lang]}. {siteContent.footerRights.text[lang]} 
                      {siteContent.footerRights.link && (
                          <a href={siteContent.footerRights.link} className="ml-1 text-cyber-primary hover:underline">{siteContent.footerRights.link.replace(/^https?:\/\//, '')}</a>
                      )}
                  </p>
                  
                  {/* Admin Toggle */}
                  <div>
                    {isAdmin ? (
                       <button onClick={() => setShowDashboard(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-primary/10 text-cyber-primary text-xs font-bold hover:bg-cyber-primary/20 transition-colors">
                          <LucideIcons.LayoutDashboard size={14} /> Dashboard
                       </button>
                    ) : (
                      <button onClick={() => setShowAdminLogin(true)} className="text-[10px] text-gray-600 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-400 uppercase tracking-widest transition-colors flex items-center gap-1">
                          <LucideIcons.Lock size={10} /> Admin
                      </button>
                    )}
                  </div>
              </div>
          </div>
      </footer>

      {/* Modal */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        lang={lang}
        onBuy={handleBuyProduct}
      />

    </div>
  );
};

// Main App Wrapper
const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;