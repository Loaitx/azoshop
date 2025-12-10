
import React, { useEffect, useRef } from 'react';
import { X, CheckCircle, User, Star, ShieldCheck, MessageCircle, ShoppingCart, Box, Download } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS, SOCIAL_LINKS } from '../constants';
import { useStore } from '../context/StoreContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onBuy?: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, lang, onBuy }) => {
  const { categories } = useStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const categoryLabel = categories.find(c => c.id === product.category)?.label[lang] || product.category;
  const isFree = product.price === 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-cyber-bg/90 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      />

      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-5xl bg-white dark:bg-cyber-card rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[650px] animate-in zoom-in-95 duration-300 border border-gray-200 dark:border-white/10"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 end-4 z-20 p-2 bg-black/40 hover:bg-black/60 text-white rounded-lg transition-all border border-white/10"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-5/12 h-64 md:h-auto relative overflow-hidden group">
          <img 
            src={product.imageUrl} 
            alt={product.title[lang]} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-cyber-card/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-cyber-card" />
          
          {/* Decorative Grid on Image */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-7/12 flex flex-col bg-white dark:bg-cyber-card h-full relative">
          
          {/* Cyber accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-primary/10 blur-[50px] pointer-events-none rounded-full"></div>

          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 relative z-10">
            
            {/* Header Desktop */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                 <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-cyber-primary/10 text-cyber-primary border border-cyber-primary/20">
                    <Box size={10} className="mr-1.5" />
                    {categoryLabel}
                </span>
                <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md border border-amber-400/20">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[10px] font-bold">{product.rating}</span>
                </div>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-none mb-4 tracking-tight">
                  {product.title[lang]}
              </h2>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 backdrop-blur-sm">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-white/5 flex items-center justify-center border border-white/5">
                        <User size={20} className="text-gray-500 dark:text-gray-300" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-0.5">{t.seller[lang]}</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                            {product.seller}
                            <ShieldCheck size={14} className="text-cyber-primary" />
                        </p>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-0.5">{t.price[lang]}</p>
                    <p className={`text-2xl font-black drop-shadow-lg ${isFree ? 'text-green-400' : 'text-cyber-primary'}`}>
                        {isFree ? t.free[lang] : `${product.price} ${product.currency}`}
                    </p>
                 </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
                <h3 className="text-xs font-bold uppercase text-gray-400 mb-3 tracking-widest border-b border-white/5 pb-2">Overview</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                {product.description[lang]}
                </p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase text-gray-400 mb-3 tracking-widest flex items-center gap-2 border-b border-white/5 pb-2">
                 {t.features[lang]}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features[lang].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <CheckCircle size={14} className="text-cyber-secondary" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions Footer */}
          <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-black/20 backdrop-blur-sm">
             <div className="flex gap-3">
                <button 
                    onClick={() => onBuy?.(product)}
                    className={`flex-1 font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group ${
                      isFree 
                      ? 'bg-green-600 hover:bg-green-500 text-white shadow-green-600/25' 
                      : 'bg-gradient-to-r from-cyber-primary to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyber-primary/25'
                    }`}
                >
                    {isFree ? <Download size={18} className="group-hover:animate-bounce" /> : <ShoppingCart size={18} className="group-hover:animate-bounce" />}
                    <span className="text-sm tracking-wide">{isFree ? t.download[lang] : t.buy[lang]}</span>
                </button>
                <button 
                    onClick={() => window.open(SOCIAL_LINKS.whatsapp, '_blank')}
                    className="flex-none bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 p-3.5 rounded-xl transition-all hover:-translate-y-1"
                >
                    <MessageCircle size={20} />
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductModal;