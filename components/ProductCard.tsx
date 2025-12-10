

import React from 'react';
import { Star, User, ShoppingCart, ArrowRight, Download } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onDetails: (product: Product) => void;
  onBuy?: (product: Product) => void;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, lang, onDetails, onBuy, index }) => {
  const { categories } = useStore();
  const t = TRANSLATIONS;
  const categoryLabel = categories.find(c => c.id === product.category)?.label[lang] || product.category;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const isFree = product.price === 0;

  return (
    <div 
        className="group relative rounded-2xl bg-white dark:bg-cyber-card border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyber-primary/10 neon-border flex flex-col h-full"
        style={{ animationDelay: `${index * 100}ms` }}
    >
      
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <img 
          src={product.imageUrl} 
          alt={product.title[lang]} 
          className="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-transparent to-transparent opacity-80" />

        {/* Badges */}
        <div className="absolute top-3 start-3 flex flex-wrap gap-2 z-10">
           {product.badges?.map((badge, i) => (
             <span key={i} className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-cyber-secondary/80 text-white backdrop-blur-md border border-white/10 shadow-lg shadow-cyber-secondary/20">
                {badge}
             </span>
           ))}
           {hasDiscount && !isFree && (
             <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-cyber-accent/90 text-white backdrop-blur-md border border-white/10 shadow-lg shadow-cyber-accent/20">
                {t.sale[lang]}
             </span>
           )}
           {isFree && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-green-500/90 text-white backdrop-blur-md border border-white/10 shadow-lg shadow-green-500/20">
                {t.free[lang]}
              </span>
           )}
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 end-3 z-10">
           <div className="flex flex-col items-end">
             <span className={`text-lg font-black text-white drop-shadow-md ${isFree ? 'text-green-400' : (hasDiscount ? 'text-cyber-accent' : 'text-cyber-primary')}`}>
                {isFree ? t.free[lang] : <>{hasDiscount ? product.discountPrice : product.price} <span className="text-xs">{product.currency}</span></>}
             </span>
             {hasDiscount && !isFree && (
               <span className="text-[10px] font-bold text-gray-400 line-through">
                  {product.price} {product.currency}
               </span>
             )}
           </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1 relative">
        {/* Glowing Line */}
        <div className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-cyber-primary to-cyber-secondary group-hover:w-full transition-all duration-500" />

        <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 group-hover:text-cyber-primary transition-colors">
                {categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
                <Star size={12} fill="currentColor" />
                <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{product.rating}</span>
            </div>
        </div>

        <h3 
            onClick={() => onDetails(product)}
            className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 cursor-pointer group-hover:text-cyber-primary transition-colors leading-tight"
        >
          {product.title[lang]}
        </h3>

        <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                <User size={10} className="text-gray-500 dark:text-gray-300" />
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{product.seller}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex gap-2">
            <button 
                onClick={() => onDetails(product)}
                className="flex-1 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white text-xs font-bold py-2.5 rounded-lg border border-gray-200 dark:border-white/5 transition-all flex items-center justify-center gap-2 group/btn"
            >
                {t.details[lang]}
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform rtl:group-hover/btn:-translate-x-1" />
            </button>
            
            <button 
                onClick={(e) => { e.stopPropagation(); onBuy?.(product); }}
                className={`px-3 border rounded-lg transition-all flex items-center justify-center ${
                    isFree 
                    ? 'bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white border-green-500/20' 
                    : 'bg-cyber-primary/10 hover:bg-cyber-primary text-cyber-primary hover:text-white border-cyber-primary/20'
                }`}
                title={isFree ? t.download[lang] : t.buy[lang]}
            >
                {isFree ? <Download size={16} /> : <ShoppingCart size={16} />}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;