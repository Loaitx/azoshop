

import React, { useEffect, useState } from 'react';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { useStore } from '../context/StoreContext';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  toggleTheme: () => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  lang, 
  setLang, 
  isDark, 
  toggleTheme, 
  activeCategory, 
  setActiveCategory 
}) => {
  const { categories, siteContent } = useStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = TRANSLATIONS;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className={`pointer-events-auto transition-all duration-500 ease-out 
          ${scrolled 
            ? 'w-full max-w-4xl bg-white/80 dark:bg-cyber-card/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl shadow-black/20 rounded-2xl py-2 px-4' 
            : 'w-full max-w-7xl bg-transparent py-4'
          }`}
        >
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div 
              className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" 
              onClick={() => setActiveCategory('all')}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-cyber-primary blur-md opacity-20 group-hover:opacity-50 transition-opacity duration-300 rounded-full animate-pulse-slow"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-cyber-bg to-cyber-card border border-white/10 rounded-xl flex items-center justify-center text-white shadow-inner transform group-hover:rotate-12 transition-transform duration-300">
                  <span className="font-black text-cyber-primary">
                    {siteContent.identity.siteName.en.charAt(0)}
                  </span>
                </div>
              </div>
              <div className={`flex flex-col ${scrolled ? 'opacity-0 w-0 hidden md:flex md:opacity-100 md:w-auto' : 'opacity-100'} transition-all duration-300`}>
                <span className="font-cairo font-black text-xl tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-primary animate-shimmer bg-[length:200%_auto] drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  {siteContent.identity.siteName[lang]}
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className={`hidden md:flex items-center gap-1 ${scrolled ? 'absolute left-1/2 -translate-x-1/2' : ''}`}>
               {categories.slice(0, 5).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 relative overflow-hidden group ${
                      activeCategory === cat.id
                        ? 'text-cyber-primary bg-cyber-primary/10'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{cat.label[lang]}</span>
                    {activeCategory === cat.id && (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full bg-cyber-primary shadow-[0_0_10px_#06b6d4]"></span>
                    )}
                  </button>
               ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 transition-all font-cairo font-bold text-xs border border-transparent hover:border-gray-200 dark:hover:border-white/10"
              >
                {lang === 'en' ? 'AR' : 'EN'}
              </button>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 transition-all"
              >
                {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-white/95 dark:bg-cyber-bg/95 backdrop-blur-xl transition-all duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setIsMenuOpen(false);
              }}
              className={`text-2xl font-black tracking-tight transition-all ${
                activeCategory === cat.id
                  ? 'text-cyber-primary text-glow'
                  : 'text-gray-500 dark:text-gray-500'
              }`}
            >
              {cat.label[lang]}
            </button>
          ))}
          <button
              onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
              }}
              className="mt-8 px-8 py-3 rounded-full bg-cyber-card border border-white/10 text-white font-bold"
          >
              <Globe size={18} className="inline mx-2" />
              {t.language[lang]}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;