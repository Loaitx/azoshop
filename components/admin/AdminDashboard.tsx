

import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, CategoryItem, PageLink } from '../../types';
import ProductCard from '../ProductCard';
import { Plus, Trash2, Edit, Save, X, LayoutDashboard, Package, Type, LogOut, ArrowLeft, Settings, TrendingUp, Megaphone, Upload, Download, Monitor, Layers, List, Link as LinkIcon, Mail, Globe, FileText, Share2, Database, User } from 'lucide-react';

interface AdminDashboardProps {
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const { products, categories, siteContent, addProduct, updateProduct, deleteProduct, addCategory, updateCategory, deleteCategory, updateSiteContent, logout, resetToDefaults, exportData, importData } = useStore();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'content' | 'settings'>('overview');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  
  const [importText, setImportText] = useState('');
  const [previewLang, setPreviewLang] = useState<'en' | 'ar'>('en');

  // Category State
  const [categoryForm, setCategoryForm] = useState<CategoryItem>({ id: '', label: { en: '', ar: '' }, icon: 'Box' });
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);

  // Page State
  const [pageModalOpen, setPageModalOpen] = useState(false);
  const [pageForm, setPageForm] = useState<PageLink>({ 
      id: '', 
      title: { en: '', ar: '' }, 
      url: '', 
      isExternal: false, 
      content: { en: '', ar: '' } 
  });
  const [isEditingPage, setIsEditingPage] = useState(false);

  // Form State for Products
  const initialProductState: Product = {
    id: '',
    title: { en: '', ar: '' },
    description: { en: '', ar: '' },
    price: 0,
    discountPrice: 0,
    currency: '$',
    category: categories[0]?.id || 'systems',
    rating: 5,
    reviewsCount: 0,
    seller: 'Admin',
    imageUrl: 'https://picsum.photos/400/300',
    features: { en: [], ar: [] },
    badges: []
  };
  
  const [productForm, setProductForm] = useState<Product>(initialProductState);
  const [contentForm, setContentForm] = useState(siteContent);

  // --- Handlers ---

  const handleEditProduct = (product: Product) => {
    setProductForm(product);
    setEditingProduct(product);
    setIsAddingProduct(false);
    setActiveTab('products');
  };

  const handleAddProduct = () => {
    setProductForm({ 
        ...initialProductState, 
        id: Date.now().toString(), 
        category: categories[0]?.id || 'systems',
        seller: siteContent.defaultSeller || 'AZO Team' // Auto-fill seller name from settings
    });
    setEditingProduct(null);
    setIsAddingProduct(true);
    setActiveTab('products');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAddingProduct) {
      addProduct(productForm);
    } else {
      updateProduct(productForm);
    }
    setIsAddingProduct(false);
    setEditingProduct(null);
  };

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent(contentForm);
    alert('Content updated successfully!');
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAddingCategory) {
        addCategory({ ...categoryForm, id: categoryForm.id || Date.now().toString() });
    } else if (editingCategory) {
        updateCategory(categoryForm);
    }
    setIsAddingCategory(false);
    setEditingCategory(null);
    setCategoryForm({ id: '', label: { en: '', ar: '' }, icon: 'Box' });
  };

  const handleOpenAddPage = () => {
    setPageForm({ 
        id: Date.now().toString(), 
        title: { en: '', ar: '' }, 
        url: '', 
        isExternal: false, 
        content: { en: '', ar: '' } 
    });
    setIsEditingPage(false);
    setPageModalOpen(true);
  };

  const handleOpenEditPage = (page: PageLink) => {
    setPageForm({
        ...page,
        content: page.content || { en: '', ar: '' }
    });
    setIsEditingPage(true);
    setPageModalOpen(true);
  };

  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedPages = [...contentForm.pages];
    if (isEditingPage) {
        updatedPages = updatedPages.map(p => p.id === pageForm.id ? pageForm : p);
    } else {
        updatedPages.push(pageForm);
    }
    setContentForm({ ...contentForm, pages: updatedPages });
    setPageModalOpen(false);
  };

  const handleDeletePage = (id: string) => {
      if(confirm('Delete this page?')) {
        setContentForm({ ...contentForm, pages: contentForm.pages.filter(p => p.id !== id) });
      }
  };

  const handleImport = () => {
    if (importData(importText)) {
      alert('Data imported successfully! The page will refresh.');
      window.location.reload();
    } else {
      alert('Invalid JSON data.');
    }
  };

  // Stats
  const totalRevenue = products.reduce((acc, p) => acc + (p.price * 12), 0); // Simulated
  const activeOffers = products.filter(p => p.discountPrice && p.discountPrice < p.price).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex font-sans text-gray-900 dark:text-gray-100" dir="ltr">
      
      {/* Sidebar */}
      <div className="w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col fixed h-full z-20 shadow-xl shadow-gray-200/50 dark:shadow-none">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Settings size={20} />
             </div>
             <h1 className="text-xl font-black tracking-tight">AZO<span className="text-blue-600">ADMIN</span></h1>
          </div>
          <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase pl-10">Command Center</p>
        </div>
        
        {/* System Status Indicator */}
        <div className="px-8 pb-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500">
                <Database size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">System Online</span>
                <span className="relative flex h-2 w-2 ml-auto">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
            </div>
        </div>
        
        <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
           {[
             { id: 'overview', label: 'Overview', icon: LayoutDashboard },
             { id: 'products', label: 'Products', icon: Package },
             { id: 'categories', label: 'Categories', icon: Layers },
             { id: 'content', label: 'Content CMS', icon: Type },
             { id: 'settings', label: 'System', icon: Settings },
           ].map((item) => (
             <button 
                key={item.id}
                onClick={() => { setActiveTab(item.id as any); setIsAddingProduct(false); setEditingProduct(null); }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium text-sm ${
                  activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
                <item.icon size={18} />
                <span>{item.label}</span>
                {item.id === 'products' && (
                    <span className="ml-auto text-[10px] bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-500 dark:text-gray-300 font-bold">{products.length}</span>
                )}
            </button>
           ))}
        </nav>

        <div className="p-4 m-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 space-y-2">
          <button 
            onClick={() => { logout(); onExit(); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-500 hover:text-red-500 transition-colors"
          >
            <LogOut size={14} />
            Sign Out
          </button>
          <button 
            onClick={onExit}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all font-bold text-gray-700 dark:text-gray-200"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-72 p-8 overflow-y-auto">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <header className="flex justify-between items-center mb-10">
                 <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, Admin. Here's what's happening.</p>
                 </div>
                 <div className="flex gap-2">
                     <button className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-blue-600"><Monitor size={20}/></button>
                 </div>
             </header>
             
             {/* Stats Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'blue' },
                    { label: 'Total Products', value: products.length, icon: Package, color: 'purple' },
                    { label: 'Active Promotions', value: activeOffers, icon: Megaphone, color: 'orange' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 hover:border-blue-500/30 transition-colors group">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                                <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600 dark:text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                    </div>
                ))}
             </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="h-[calc(100vh-6rem)] animate-in fade-in slide-in-from-bottom-4 duration-500">
            {(!isAddingProduct && !editingProduct) ? (
              // Product List View
               <div className="max-w-6xl mx-auto space-y-6">
                 <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Products Inventory</h2>
                    <button onClick={handleAddProduct} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2">
                        <Plus size={18} /> Add New
                    </button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-xl transition-all relative">
                            <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button onClick={() => handleEditProduct(product)} className="p-2 bg-white rounded-lg text-gray-900 hover:bg-blue-50 hover:text-blue-600"><Edit size={18}/></button>
                                    <button onClick={() => deleteProduct(product.id)} className="p-2 bg-white rounded-lg text-gray-900 hover:bg-red-50 hover:text-red-600"><Trash2 size={18}/></button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 dark:text-white truncate">{product.title.en}</h3>
                                <p className="text-sm text-gray-500">{categories.find(c => c.id === product.category)?.label.en || product.category}</p>
                            </div>
                        </div>
                    ))}
                 </div>
               </div>
            ) : (
              // SPLIT VIEW EDITOR
              <div className="flex h-full gap-6">
                 {/* Left: Editor Form */}
                 <div className="w-1/2 overflow-y-auto pr-2">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                         <div className="flex justify-between items-center mb-6">
                             <h3 className="text-xl font-bold">{isAddingProduct ? 'Create Product' : 'Edit Product'}</h3>
                             <button onClick={() => { setIsAddingProduct(false); setEditingProduct(null); }} className="text-gray-400 hover:text-red-500"><X size={20}/></button>
                         </div>
                         
                         <form onSubmit={handleSaveProduct} className="space-y-5">
                            {/* Basic Inputs */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Title (EN)</label>
                                        <input required value={productForm.title.en} onChange={e => setProductForm({...productForm, title: {...productForm.title, en: e.target.value}})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm focus:ring-2 ring-blue-500 outline-none" placeholder="Product Title" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Title (AR)</label>
                                        <input required value={productForm.title.ar} onChange={e => setProductForm({...productForm, title: {...productForm.title, ar: e.target.value}})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm focus:ring-2 ring-blue-500 outline-none text-right" placeholder="اسم المنتج" dir="rtl" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                     <div className="col-span-1">
                                         <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Price ($)</label>
                                         <input required type="number" value={productForm.price} onChange={e => setProductForm({...productForm, price: Number(e.target.value)})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm" />
                                     </div>
                                     <div className="col-span-1">
                                         <label className="text-xs font-bold text-red-500 uppercase tracking-wide mb-1 block">Sale Price</label>
                                         <input type="number" value={productForm.discountPrice || ''} onChange={e => setProductForm({...productForm, discountPrice: Number(e.target.value)})} className="w-full bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg p-2.5 text-sm" placeholder="Optional" />
                                     </div>
                                     <div className="col-span-1">
                                         <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Category</label>
                                         <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm">
                                             {categories.map(c => <option key={c.id} value={c.id}>{c.label.en}</option>)}
                                         </select>
                                     </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Seller (Display Name)</label>
                                    <input required value={productForm.seller} onChange={e => setProductForm({...productForm, seller: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Image URL</label>
                                    <input required value={productForm.imageUrl} onChange={e => setProductForm({...productForm, imageUrl: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm font-mono" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Description (EN)</label>
                                    <textarea rows={3} value={productForm.description.en} onChange={e => setProductForm({...productForm, description: {...productForm.description, en: e.target.value}})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Description (AR)</label>
                                    <textarea rows={3} value={productForm.description.ar} onChange={e => setProductForm({...productForm, description: {...productForm.description, ar: e.target.value}})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm text-right" dir="rtl" />
                                </div>
                                
                                <div>
                                    <label className="text-xs font-bold text-purple-500 uppercase tracking-wide mb-1 block">Badges (Comma separated)</label>
                                    <input 
                                        placeholder="e.g. Hot, New, Best Seller" 
                                        value={productForm.badges?.join(', ') || ''} 
                                        onChange={e => setProductForm({...productForm, badges: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} 
                                        className="w-full bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-900/30 rounded-lg p-2.5 text-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                     <div>
                                         <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Features (EN)</label>
                                         <input value={productForm.features.en.join(', ')} onChange={e => setProductForm({...productForm, features: {...productForm.features, en: e.target.value.split(',').map(s => s.trim())}})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm" />
                                     </div>
                                     <div>
                                         <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Features (AR)</label>
                                         <input value={productForm.features.ar.join(', ')} onChange={e => setProductForm({...productForm, features: {...productForm.features, ar: e.target.value.split(',').map(s => s.trim())}})} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm text-right" dir="rtl" />
                                     </div>
                                </div>
                            </div>
                            
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 sticky bottom-0 bg-white dark:bg-gray-800 pb-2">
                                <button type="button" onClick={() => { setIsAddingProduct(false); setEditingProduct(null); }} className="px-5 py-2.5 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium">Cancel</button>
                                <button type="submit" className="px-8 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/25">
                                    {isAddingProduct ? 'Create Product' : 'Save Changes'}
                                </button>
                            </div>
                         </form>
                    </div>
                 </div>

                 {/* Right: Live Preview */}
                 <div className="w-1/2 flex flex-col items-center">
                    <div className="bg-gray-100 dark:bg-black/20 p-8 rounded-3xl w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center relative">
                        <div className="absolute top-4 right-4 flex bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
                             <button onClick={() => setPreviewLang('en')} className={`px-3 py-1 text-xs font-bold rounded ${previewLang === 'en' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>EN</button>
                             <button onClick={() => setPreviewLang('ar')} className={`px-3 py-1 text-xs font-bold rounded ${previewLang === 'ar' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>AR</button>
                        </div>
                        <h4 className="absolute top-4 left-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Live Preview</h4>
                        
                        <div className="w-full max-w-sm pointer-events-none transform scale-100 transition-transform">
                             <ProductCard 
                                product={productForm}
                                lang={previewLang}
                                onDetails={() => {}}
                                index={0}
                             />
                        </div>
                    </div>
                 </div>
              </div>
            )}
          </div>
        )}

        {/* CATEGORIES TAB */}
        {activeTab === 'categories' && (
           <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex justify-between items-center">
                   <h2 className="text-2xl font-bold">Category Management</h2>
                   <button onClick={() => { setEditingCategory(null); setIsAddingCategory(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                       <Plus size={18} /> Add Category
                   </button>
               </div>

               {/* Add/Edit Form */}
               {(isAddingCategory || editingCategory) && (
                   <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mb-8">
                       <h3 className="font-bold mb-4">{isAddingCategory ? 'New Category' : 'Edit Category'}</h3>
                       <form onSubmit={handleSaveCategory} className="space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <div>
                                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">ID (Slug)</label>
                                   <input disabled={!!editingCategory} required value={categoryForm.id} onChange={e => setCategoryForm({...categoryForm, id: e.target.value.toLowerCase().replace(/\s+/g,'-')})} className="w-full p-2.5 rounded-lg border dark:bg-gray-900 dark:border-gray-700 bg-gray-50" placeholder="e.g. systems" />
                               </div>
                               <div>
                                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Icon (Lucide Name)</label>
                                   <input required value={categoryForm.icon} onChange={e => setCategoryForm({...categoryForm, icon: e.target.value})} className="w-full p-2.5 rounded-lg border dark:bg-gray-900 dark:border-gray-700 bg-gray-50" placeholder="e.g. Box, Cpu, Zap" />
                               </div>
                               <div>
                                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Label (EN)</label>
                                   <input required value={categoryForm.label.en} onChange={e => setCategoryForm({...categoryForm, label: {...categoryForm.label, en: e.target.value}})} className="w-full p-2.5 rounded-lg border dark:bg-gray-900 dark:border-gray-700 bg-gray-50" />
                               </div>
                               <div>
                                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Label (AR)</label>
                                   <input required value={categoryForm.label.ar} onChange={e => setCategoryForm({...categoryForm, label: {...categoryForm.label, ar: e.target.value}})} className="w-full p-2.5 rounded-lg border dark:bg-gray-900 dark:border-gray-700 bg-gray-50 text-right" dir="rtl" />
                               </div>
                           </div>
                           <div className="flex justify-end gap-2">
                               <button type="button" onClick={() => { setIsAddingCategory(false); setEditingCategory(null); }} className="px-4 py-2 text-sm font-bold text-gray-500">Cancel</button>
                               <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold text-sm">Save</button>
                           </div>
                       </form>
                   </div>
               )}

               <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                   <table className="w-full text-left text-sm">
                       <thead className="bg-gray-50 dark:bg-gray-900/50 uppercase font-semibold text-xs text-gray-500">
                           <tr>
                               <th className="px-6 py-4">ID</th>
                               <th className="px-6 py-4">Icon</th>
                               <th className="px-6 py-4">Label (EN/AR)</th>
                               <th className="px-6 py-4 text-right">Actions</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                           {categories.map(cat => (
                               <tr key={cat.id}>
                                   <td className="px-6 py-4 font-mono text-xs">{cat.id}</td>
                                   <td className="px-6 py-4">{cat.icon}</td>
                                   <td className="px-6 py-4 font-medium">{cat.label.en} / {cat.label.ar}</td>
                                   <td className="px-6 py-4 text-right flex justify-end gap-2">
                                       <button onClick={() => { setCategoryForm(cat); setEditingCategory(cat); setIsAddingCategory(false); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={16}/></button>
                                       <button onClick={() => { if(confirm('Delete category?')) deleteCategory(cat.id); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                                   </td>
                               </tr>
                           ))}
                       </tbody>
                   </table>
               </div>
           </div>
        )}

        {/* CONTENT TAB */}
        {activeTab === 'content' && (
           <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
             <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-bold">Content CMS</h2>
                 <button onClick={handleSaveContent} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-600/20">
                     <Save size={18} /> Save Changes
                 </button>
             </div>
             
             {/* Identity Section */}
             <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Globe size={20} className="text-purple-500"/> Site Identity</h3>
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Site Name (EN)</label>
                        <input type="text" value={contentForm.identity.siteName.en} onChange={e => setContentForm({...contentForm, identity: {...contentForm.identity, siteName: {...contentForm.identity.siteName, en: e.target.value}}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 focus:bg-white transition-colors" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Site Name (AR)</label>
                        <input type="text" value={contentForm.identity.siteName.ar} onChange={e => setContentForm({...contentForm, identity: {...contentForm.identity, siteName: {...contentForm.identity.siteName, ar: e.target.value}}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 text-right" dir="rtl" />
                    </div>
                </div>
                <div>
                     <label className="block text-xs font-bold text-blue-500 uppercase tracking-wide mb-2 flex items-center gap-1"><User size={12}/> Default Seller Name (Display Only)</label>
                     <input type="text" value={contentForm.defaultSeller || ''} onChange={e => setContentForm({...contentForm, defaultSeller: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 focus:bg-white transition-colors" placeholder="e.g. AZO Team" />
                     <p className="text-[10px] text-gray-400 mt-1">This name will be automatically applied to new products you create.</p>
                </div>
             </div>

             {/* Footer Pages Section */}
             <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                 <div className="flex justify-between items-center mb-6">
                     <h3 className="text-lg font-bold flex items-center gap-2"><LinkIcon size={20} className="text-teal-500"/> Footer Links (Pages)</h3>
                     <button onClick={handleOpenAddPage} className="flex items-center gap-1 text-xs font-bold bg-teal-500/10 text-teal-600 px-3 py-1.5 rounded-lg hover:bg-teal-500 hover:text-white transition-colors">
                        <Plus size={14} /> Add Page
                     </button>
                 </div>
                 
                 <div className="space-y-3 mb-6">
                     {contentForm.pages.map((page) => (
                         <div key={page.id} className="flex items-center justify-between bg-gray-50 dark:bg-black/20 p-4 rounded-xl border border-gray-100 dark:border-white/5 hover:border-teal-500/30 transition-colors">
                             <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${page.isExternal ? 'bg-orange-100 text-orange-500' : 'bg-blue-100 text-blue-500'}`}>
                                    {page.isExternal ? <Globe size={16}/> : <FileText size={16}/>}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">{page.title.en} / {page.title.ar}</h4>
                                    <p className="text-xs text-gray-500 font-mono">{page.isExternal ? page.url : 'Internal Content'}</p>
                                </div>
                             </div>
                             <div className="flex gap-2">
                                 <button onClick={() => handleOpenEditPage(page)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-white/5 rounded-lg"><Edit size={16}/></button>
                                 <button onClick={() => handleDeletePage(page.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-white/5 rounded-lg"><Trash2 size={16}/></button>
                             </div>
                         </div>
                     ))}
                     {contentForm.pages.length === 0 && <p className="text-center text-gray-400 text-sm py-4">No pages defined.</p>}
                 </div>
             </div>

             {/* Social Links Management */}
             <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Share2 size={20} className="text-indigo-500"/> Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Discord</label>
                        <input type="text" value={contentForm.socialLinks.discord} onChange={e => setContentForm({...contentForm, socialLinks: {...contentForm.socialLinks, discord: e.target.value}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 font-mono text-sm" placeholder="#" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">WhatsApp</label>
                        <input type="text" value={contentForm.socialLinks.whatsapp} onChange={e => setContentForm({...contentForm, socialLinks: {...contentForm.socialLinks, whatsapp: e.target.value}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 font-mono text-sm" placeholder="#" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Twitter / X</label>
                        <input type="text" value={contentForm.socialLinks.twitter} onChange={e => setContentForm({...contentForm, socialLinks: {...contentForm.socialLinks, twitter: e.target.value}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 font-mono text-sm" placeholder="#" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Instagram</label>
                        <input type="text" value={contentForm.socialLinks.instagram} onChange={e => setContentForm({...contentForm, socialLinks: {...contentForm.socialLinks, instagram: e.target.value}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 font-mono text-sm" placeholder="#" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Facebook</label>
                        <input type="text" value={contentForm.socialLinks.facebook} onChange={e => setContentForm({...contentForm, socialLinks: {...contentForm.socialLinks, facebook: e.target.value}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 font-mono text-sm" placeholder="#" />
                    </div>
                </div>
             </div>

             {/* Contact Info */}
             <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Mail size={20} className="text-pink-500"/> Contact Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Support Email</label>
                        <input type="text" value={contentForm.contact.email} onChange={e => setContentForm({...contentForm, contact: {...contentForm.contact, email: e.target.value}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Location Text (EN)</label>
                        <input type="text" value={contentForm.contact.location.en} onChange={e => setContentForm({...contentForm, contact: {...contentForm.contact, location: {...contentForm.contact.location, en: e.target.value}}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Location Text (AR)</label>
                        <input type="text" value={contentForm.contact.location.ar} onChange={e => setContentForm({...contentForm, contact: {...contentForm.contact, location: {...contentForm.contact.location, ar: e.target.value}}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 text-right" dir="rtl" />
                    </div>
                </div>
             </div>

              {/* Copyright Info */}
             <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Monitor size={20} className="text-gray-500"/> Footer Copyright</h3>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Copyright Text (EN)</label>
                        <input type="text" value={contentForm.footerRights.text.en} onChange={e => setContentForm({...contentForm, footerRights: {...contentForm.footerRights, text: {...contentForm.footerRights.text, en: e.target.value}}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Copyright Text (AR)</label>
                        <input type="text" value={contentForm.footerRights.text.ar} onChange={e => setContentForm({...contentForm, footerRights: {...contentForm.footerRights, text: {...contentForm.footerRights.text, ar: e.target.value}}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 text-right" dir="rtl" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Footer Link URL</label>
                        <input type="text" value={contentForm.footerRights.link} onChange={e => setContentForm({...contentForm, footerRights: {...contentForm.footerRights, link: e.target.value}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 font-mono" />
                    </div>
                </div>
             </div>

             {/* Hero Section */}
             <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Type size={20} className="text-blue-500"/> Hero Section</h3>
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Main Title (EN)</label>
                            <input type="text" value={contentForm.heroTitle.en} onChange={e => setContentForm({...contentForm, heroTitle: {...contentForm.heroTitle, en: e.target.value}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 focus:bg-white transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Main Title (AR)</label>
                            <input type="text" value={contentForm.heroTitle.ar} onChange={e => setContentForm({...contentForm, heroTitle: {...contentForm.heroTitle, ar: e.target.value}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 focus:bg-white transition-colors text-right" dir="rtl" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Subtitle (EN)</label>
                        <textarea rows={2} value={contentForm.heroSubtitle.en} onChange={e => setContentForm({...contentForm, heroSubtitle: {...contentForm.heroSubtitle, en: e.target.value}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 focus:bg-white transition-colors" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Subtitle (AR)</label>
                        <textarea rows={2} value={contentForm.heroSubtitle.ar} onChange={e => setContentForm({...contentForm, heroSubtitle: {...contentForm.heroSubtitle, ar: e.target.value}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 focus:bg-white transition-colors text-right" dir="rtl" />
                    </div>
                </div>
             </div>

             {/* Announcement */}
             <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2"><Megaphone size={20} className="text-orange-500"/> Announcement Bar</h3>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">Status:</span>
                        <button 
                            onClick={() => setContentForm({...contentForm, announcement: {...(contentForm.announcement || {text:{en:'',ar:''}}), enabled: !contentForm.announcement?.enabled}})}
                            className={`w-12 h-6 rounded-full p-1 transition-colors ${contentForm.announcement?.enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${contentForm.announcement?.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <input type="text" placeholder="Announcement (EN)" value={contentForm.announcement?.text.en} onChange={e => setContentForm({...contentForm, announcement: {...(contentForm.announcement || {enabled:true}), text: {...(contentForm.announcement?.text || {ar:''}), en: e.target.value}}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50" />
                    <input type="text" placeholder="Announcement (AR)" value={contentForm.announcement?.text.ar} onChange={e => setContentForm({...contentForm, announcement: {...(contentForm.announcement || {enabled:true}), text: {...(contentForm.announcement?.text || {en:''}), ar: e.target.value}}})} className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 text-right" dir="rtl" />
                 </div>
             </div>
           </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">System Settings</h2>
                
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Download size={20} className="text-blue-500"/> Backup Data</h3>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">Download a full JSON backup of your products, texts, categories, and configurations. Keep this safe.</p>
                    <button 
                        onClick={() => {
                            const data = exportData();
                            const blob = new Blob([data], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `azo_shop_backup_${Date.now()}.json`;
                            a.click();
                        }}
                        className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-bold transition-all w-full flex items-center justify-center gap-2"
                    >
                        Download Backup.json
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Upload size={20} className="text-blue-500"/> Restore Data</h3>
                    <textarea 
                        rows={5}
                        className="w-full p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white font-mono text-xs mb-4"
                        placeholder='Paste your backup JSON content here...'
                        value={importText}
                        onChange={e => setImportText(e.target.value)}
                    />
                    <button 
                        onClick={handleImport}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all w-full"
                    >
                        Restore Database
                    </button>
                </div>

                 <div className="bg-red-50 dark:bg-red-900/10 p-8 rounded-2xl border border-red-100 dark:border-red-900/20">
                     <h3 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h3>
                     <p className="text-sm text-red-500/70 mb-6">This action cannot be undone. It will remove all your custom products and reset configuration.</p>
                     <button 
                        onClick={() => {
                            if(window.confirm('Are you sure? This will delete all custom products and reset texts to default.')) {
                                resetToDefaults();
                                window.location.reload();
                            }
                        }}
                        className="text-red-600 hover:text-red-700 bg-red-100 dark:bg-red-900/20 px-6 py-3 rounded-xl font-bold w-full transition-colors flex items-center justify-center gap-2"
                    >
                        <Trash2 size={18} /> Factory Reset
                    </button>
                 </div>
            </div>
        )}

      </div>

      {/* Page Editor Modal */}
      {pageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-white dark:bg-gray-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in zoom-in-95">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold dark:text-white">{isEditingPage ? 'Edit Page' : 'New Page'}</h3>
                    <button onClick={() => setPageModalOpen(false)} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"><X size={20}/></button>
                </div>
                <form onSubmit={handleSavePage} className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Title (EN)</label>
                            <input required value={pageForm.title.en} onChange={e => setPageForm({...pageForm, title: {...pageForm.title, en: e.target.value}})} className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Title (AR)</label>
                            <input required value={pageForm.title.ar} onChange={e => setPageForm({...pageForm, title: {...pageForm.title, ar: e.target.value}})} className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-gray-50 text-right" dir="rtl" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" checked={!pageForm.isExternal} onChange={() => setPageForm({...pageForm, isExternal: false})} className="w-4 h-4 text-teal-600" />
                            <span className="font-medium dark:text-gray-300">Custom Content Page</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" checked={pageForm.isExternal} onChange={() => setPageForm({...pageForm, isExternal: true})} className="w-4 h-4 text-teal-600" />
                            <span className="font-medium dark:text-gray-300">External Link</span>
                        </label>
                    </div>

                    {pageForm.isExternal ? (
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">External URL</label>
                            <input required value={pageForm.url} onChange={e => setPageForm({...pageForm, url: e.target.value})} className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-gray-50" placeholder="https://example.com" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Content (EN) - HTML Supported</label>
                                <textarea required rows={10} value={pageForm.content?.en || ''} onChange={e => setPageForm({...pageForm, content: {...(pageForm.content || {ar: ''}), en: e.target.value}})} className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-gray-50 font-mono text-sm" placeholder="<h1>Title</h1><p>Content...</p>" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Content (AR) - HTML Supported</label>
                                <textarea required rows={10} value={pageForm.content?.ar || ''} onChange={e => setPageForm({...pageForm, content: {...(pageForm.content || {en: ''}), ar: e.target.value}})} className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-gray-50 font-mono text-sm text-right" dir="rtl" placeholder="<h1>العنوان</h1><p>المحتوى...</p>" />
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                        <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-teal-500/20">Save Page</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;