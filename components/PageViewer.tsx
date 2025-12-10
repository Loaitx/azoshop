import React from 'react';
import { PageLink, Language } from '../types';
import { ArrowLeft } from 'lucide-react';

interface PageViewerProps {
  page: PageLink;
  lang: Language;
  onBack: () => void;
}

const PageViewer: React.FC<PageViewerProps> = ({ page, lang, onBack }) => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-4xl mx-auto relative z-10 animate-fade-in-up">
      <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-gray-500 hover:text-cyber-primary transition-colors font-bold text-sm uppercase tracking-widest bg-white dark:bg-white/5 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10"
      >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {lang === 'ar' ? 'العودة' : 'Back'}
      </button>

      <div className="bg-white dark:bg-cyber-card border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
         {/* Decoration */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-primary/5 rounded-full blur-3xl pointer-events-none"></div>

         <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 tracking-tight relative z-10">
            {page.title[lang]}
         </h1>

         <div 
            className="prose prose-lg dark:prose-invert max-w-none relative z-10 
            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-p:text-gray-600 dark:prose-p:text-gray-300
            prose-a:text-cyber-primary hover:prose-a:text-cyber-secondary prose-a:transition-colors
            prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-ul:list-disc prose-ol:list-decimal"
            dangerouslySetInnerHTML={{ __html: page.content?.[lang] || '' }}
         />
      </div>
    </div>
  );
};

export default PageViewer;