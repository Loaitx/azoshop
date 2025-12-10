

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, SiteContent, StoreContextType, CategoryItem } from '../types';
import { PRODUCTS, DEFAULT_CONTENT, DEFAULT_CATEGORIES } from '../constants';
import { supabase } from '../lib/supabase';

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [settingsId, setSettingsId] = useState<number | null>(null);

  // Initial Data Fetch from Supabase
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch Categories
        const { data: catData, error: catError } = await supabase.from('categories').select('*');
        if (!catError && catData && catData.length > 0) {
          setCategories(catData);
        } else {
           // Seed if empty
           if(catData?.length === 0) {
               await supabase.from('categories').insert(DEFAULT_CATEGORIES);
               setCategories(DEFAULT_CATEGORIES);
           }
        }

        // 2. Fetch Products
        const { data: prodData, error: prodError } = await supabase.from('products').select('*');
        if (!prodError && prodData && prodData.length > 0) {
           const mappedProducts = prodData.map((p: any) => ({
             ...p,
             discountPrice: p.discount_price,
             reviewsCount: p.reviews_count,
             imageUrl: p.image_url
           }));
           setProducts(mappedProducts);
        } else if (prodData?.length === 0) {
             const seedProducts = PRODUCTS.map(p => ({
                 id: p.id,
                 title: p.title,
                 description: p.description,
                 price: p.price,
                 discount_price: p.discountPrice,
                 currency: p.currency,
                 category: p.category,
                 rating: p.rating,
                 reviews_count: p.reviewsCount,
                 seller: p.seller,
                 image_url: p.imageUrl,
                 features: p.features,
                 badges: p.badges
             }));
             await supabase.from('products').insert(seedProducts);
             setProducts(PRODUCTS);
        }

        // 3. Fetch Settings (Site Content) with Smart Deep Merge
        const { data: settingsData, error: settingsError } = await supabase.from('site_settings').select('*').limit(1);
        
        if (!settingsError && settingsData && settingsData.length > 0) {
            setSettingsId(settingsData[0].id);
            const dbData = settingsData[0].data;

            // SMART MERGE LOGIC:
            // This ensures that if we add a new field in DEFAULT_CONTENT (code), 
            // it doesn't get wiped out by the old object from DB.
            const mergedContent: SiteContent = {
                ...DEFAULT_CONTENT, // Start with latest code defaults
                ...dbData,          // Overwrite with DB data
                
                // Manually deep merge nested objects to protect new keys (e.g. new social links)
                identity: { ...DEFAULT_CONTENT.identity, ...dbData.identity },
                defaultSeller: dbData.defaultSeller || DEFAULT_CONTENT.defaultSeller,
                heroTitle: { ...DEFAULT_CONTENT.heroTitle, ...dbData.heroTitle },
                heroSubtitle: { ...DEFAULT_CONTENT.heroSubtitle, ...dbData.heroSubtitle },
                announcement: { 
                    ...DEFAULT_CONTENT.announcement, 
                    ...dbData.announcement,
                    text: { ...DEFAULT_CONTENT.announcement.text, ...dbData.announcement?.text }
                },
                socialLinks: { 
                    ...DEFAULT_CONTENT.socialLinks, // Contains all latest keys (discord, whatsapp, etc)
                    ...dbData.socialLinks           // Overwrites only the keys that exist in DB
                },
                contact: {
                    ...DEFAULT_CONTENT.contact,
                    ...dbData.contact,
                    location: { ...DEFAULT_CONTENT.contact.location, ...dbData.contact?.location }
                },
                footerRights: {
                    ...DEFAULT_CONTENT.footerRights,
                    ...dbData.footerRights,
                    text: { ...DEFAULT_CONTENT.footerRights.text, ...dbData.footerRights?.text }
                }
                // Pages are arrays, we generally accept the DB version if it exists as it's a list.
            };

            setSiteContent(mergedContent);
        } else {
            // Create initial row
            const { data: newSettings } = await supabase.from('site_settings').insert([{ data: DEFAULT_CONTENT }]).select();
            if(newSettings && newSettings[0]) {
                setSettingsId(newSettings[0].id);
                setSiteContent(DEFAULT_CONTENT);
            }
        }

      } catch (e) {
        console.error("Supabase fetch error:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
    
    // Check Local Admin State
    const savedAdmin = localStorage.getItem('azo_is_admin') === 'true';
    setIsAdmin(savedAdmin);
  }, []);

  // Persist Admin State
  useEffect(() => {
    localStorage.setItem('azo_is_admin', String(isAdmin));
  }, [isAdmin]);

  // --- Product Actions ---
  const addProduct = async (product: Product) => {
    setProducts(prev => [product, ...prev]);
    const dbProduct = {
         id: product.id,
         title: product.title,
         description: product.description,
         price: product.price,
         discount_price: product.discountPrice,
         currency: product.currency,
         category: product.category,
         rating: product.rating,
         reviews_count: product.reviewsCount,
         seller: product.seller,
         image_url: product.imageUrl,
         features: product.features,
         badges: product.badges
    };
    await supabase.from('products').insert([dbProduct]);
  };

  const updateProduct = async (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    const dbProduct = {
         title: updatedProduct.title,
         description: updatedProduct.description,
         price: updatedProduct.price,
         discount_price: updatedProduct.discountPrice,
         currency: updatedProduct.currency,
         category: updatedProduct.category,
         rating: updatedProduct.rating,
         reviews_count: updatedProduct.reviewsCount,
         seller: updatedProduct.seller,
         image_url: updatedProduct.imageUrl,
         features: updatedProduct.features,
         badges: updatedProduct.badges
    };
    await supabase.from('products').update(dbProduct).eq('id', updatedProduct.id);
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    await supabase.from('products').delete().eq('id', id);
  };

  // --- Category Actions ---
  const addCategory = async (category: CategoryItem) => {
    setCategories(prev => [...prev, category]);
    await supabase.from('categories').insert([category]);
  };

  const updateCategory = async (updatedCategory: CategoryItem) => {
    setCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c));
    await supabase.from('categories').update({
        label: updatedCategory.label,
        icon: updatedCategory.icon
    }).eq('id', updatedCategory.id);
  };

  const deleteCategory = async (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    await supabase.from('categories').delete().eq('id', id);
  };

  // --- Content Actions ---
  const updateSiteContent = async (content: SiteContent) => {
    setSiteContent(content);
    if (settingsId) {
        await supabase.from('site_settings').update({ data: content }).eq('id', settingsId);
    } else {
        const { data } = await supabase.from('site_settings').insert([{ data: content }]).select();
        if(data && data[0]) setSettingsId(data[0].id);
    }
  };

  const resetToDefaults = async () => {
    await supabase.from('products').delete().neq('id', '0'); 
    const seedProducts = PRODUCTS.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        price: p.price,
        discount_price: p.discountPrice,
        currency: p.currency,
        category: p.category,
        rating: p.rating,
        reviews_count: p.reviewsCount,
        seller: p.seller,
        image_url: p.imageUrl,
        features: p.features,
        badges: p.badges
    }));
    await supabase.from('products').insert(seedProducts);
    setProducts(PRODUCTS);

    if(settingsId) {
        await supabase.from('site_settings').update({ data: DEFAULT_CONTENT }).eq('id', settingsId);
        setSiteContent(DEFAULT_CONTENT);
    }
  };

  const login = (username: string, password: string) => {
    setIsAdmin(true);
    return true;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  const exportData = () => {
    const data = {
      products,
      categories,
      siteContent
    };
    return JSON.stringify(data, null, 2);
  };

  const importData = (jsonData: string) => {
    try {
      const data = JSON.parse(jsonData);
      if (data.products && data.siteContent) {
        setProducts(data.products);
        if (data.categories) setCategories(data.categories);
        updateSiteContent(data.siteContent);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  return (
    <StoreContext.Provider value={{
      products,
      categories,
      siteContent,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      updateSiteContent,
      resetToDefaults,
      isAdmin,
      login,
      logout,
      exportData,
      importData
    }}>
      {isLoading ? (
          <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500 font-bold animate-pulse">
              <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="tracking-widest">CONNECTING TO DATABASE...</span>
              </div>
          </div>
      ) : (
          children
      )}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};