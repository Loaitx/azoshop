
import React, { useState, useRef } from 'react';
import { Product, Language } from '../types';
import { TRANSLATIONS, SOCIAL_LINKS } from '../constants';
import { ArrowLeft, Upload, CheckCircle, MessageCircle, CreditCard, ShieldCheck, Lock, ExternalLink } from 'lucide-react';

interface CheckoutPageProps {
  product: Product;
  lang: Language;
  onBack: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ product, lang, onBack }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const nextStep = () => setStep(prev => (prev < 3 ? prev + 1 : prev) as 1 | 2 | 3);
  
  // Simulated external payment link action
  const handlePaymentClick = () => {
    // In a real app, this would open stripe or payment gateway
    // For this flow, we simulate opening a link then moving to upload
    setTimeout(() => {
        nextStep();
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-4xl mx-auto font-sans relative z-10">
      
      {/* Back Button */}
      {step !== 3 && (
        <button 
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-gray-500 hover:text-cyber-primary transition-colors font-bold text-sm uppercase tracking-widest"
        >
            <ArrowLeft size={16} className="rtl:rotate-180" />
            {t.backToStore[lang]}
        </button>
      )}

      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-12 relative">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-white/10 -z-10 rounded-full"></div>
         <div className={`absolute top-1/2 left-0 h-1 bg-cyber-primary transition-all duration-500 rounded-full -z-10`} style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
         
         {[1, 2, 3].map((s) => (
             <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-4 ${step >= s ? 'bg-cyber-primary border-cyber-bg text-black scale-110 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-gray-200 dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-400'}`}>
                 {s === 3 && step === 3 ? <CheckCircle size={20}/> : s}
             </div>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
        
        {/* Product Summary (Left Side) */}
        <div className="bg-white dark:bg-cyber-card border border-gray-200 dark:border-white/10 rounded-2xl p-6 h-fit shadow-xl">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 dark:border-white/5 pb-2">Order Summary</h3>
            <div className="flex gap-4 mb-4">
                <img src={product.imageUrl} alt={product.title[lang]} className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-white/10" />
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white leading-tight mb-1">{product.title[lang]}</h4>
                    <p className="text-xs text-gray-500">{product.category}</p>
                </div>
            </div>
            <div className="flex justify-between items-center py-4 border-t border-gray-200 dark:border-white/5">
                <span className="font-bold text-gray-600 dark:text-gray-300">Total</span>
                <span className="text-2xl font-black text-cyber-primary">{product.discountPrice || product.price} {product.currency}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-400 bg-gray-50 dark:bg-black/20 p-2 rounded-lg">
                <Lock size={12} />
                <span>Encrypted & Secure Transaction</span>
            </div>
        </div>

        {/* Action Area (Right Side) */}
        <div className="bg-white dark:bg-cyber-card border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-primary/10 blur-[50px] pointer-events-none"></div>

            {/* STEP 1: PAYMENT LINK */}
            {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                            <CreditCard size={32} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{t.directLink[lang]}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{t.clickToPay[lang]}</p>
                    </div>

                    <button 
                        onClick={handlePaymentClick}
                        className="w-full py-4 bg-gradient-to-r from-cyber-primary to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyber-primary/20 flex items-center justify-center gap-3 transition-transform hover:-translate-y-1 group"
                    >
                        <span>{t.clickToPay[lang]}</span>
                        <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
                    </button>
                    
                    <div className="text-center">
                        <button onClick={nextStep} className="text-xs text-gray-400 hover:text-gray-600 underline">
                            Already paid? Skip to Upload
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 2: UPLOAD PROOF */}
            {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{t.uploadProof[lang]}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t.uploadDesc[lang]}</p>
                    </div>

                    <div 
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors relative group ${uploadedImage ? 'border-cyber-primary bg-cyber-primary/5' : 'border-gray-300 dark:border-gray-700 hover:border-cyber-primary hover:bg-gray-50 dark:hover:bg-white/5'}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                        
                        {uploadedImage ? (
                            <div className="relative">
                                <img src={uploadedImage} alt="Preview" className="max-h-48 mx-auto rounded-lg shadow-lg" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                    <p className="text-white font-bold text-sm">Change Image</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3 py-4">
                                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-cyber-primary group-hover:scale-110 transition-all">
                                    <Upload size={24} />
                                </div>
                                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">Click to upload image</span>
                                <span className="text-xs text-gray-400">JPG, PNG supported</span>
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={nextStep}
                        disabled={!uploadedImage}
                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all ${uploadedImage ? 'bg-cyber-secondary text-white shadow-lg shadow-cyber-secondary/20 hover:bg-violet-500' : 'bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed'}`}
                    >
                        <span>{t.confirmUpload[lang]}</span>
                        <CheckCircle size={18} />
                    </button>
                </div>
            )}

            {/* STEP 3: SUCCESS & CONTACT */}
            {step === 3 && (
                <div className="space-y-8 animate-in zoom-in-95 duration-500 text-center py-4">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-bounce">
                        <CheckCircle size={40} className="text-white" />
                    </div>
                    
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3">{t.successTitle[lang]}</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.successDesc[lang]}</p>
                    </div>

                    <div className="space-y-3">
                        <a 
                            href={SOCIAL_LINKS.whatsapp} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold shadow-lg shadow-green-500/20 transition-transform hover:-translate-y-1"
                        >
                            <MessageCircle size={20} />
                            {t.contactWhatsapp[lang]}
                        </a>
                        
                        <a 
                            href={SOCIAL_LINKS.discord} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold shadow-lg shadow-indigo-500/20 transition-transform hover:-translate-y-1"
                        >
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.772-.6083 1.1588a18.4045 18.4045 0 00-8.4962 0c-.1636-.3868-.3973-.7835-.6115-1.1588a.0741.0741 0 00-.0785-.0371 19.718 19.718 0 00-4.8852 1.5152.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.0991.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
                             </svg>
                            {t.contactDiscord[lang]}
                        </a>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
