import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, AIChatMessage, UserProfile } from '../types';
import { mockProducts, mockAIChatKnowledge } from '../data/mockData';
import { supabase } from '../lib/supabase';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  cart: CartItem[];
  wishlist: string[];
  compareItems: Product[];
  quickViewProduct: Product | null;
  isCartOpen: boolean;
  isAIChatOpen: boolean;
  isAuthModalOpen: boolean;
  isCompareOpen: boolean;
  user: UserProfile | null;
  aiMessages: AIChatMessage[];
  toasts: Toast[];
  appliedCoupon: string | null;
  discountAmount: number;
  
  // Actions
  addToCart: (product: Product, quantityKg?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantityKg: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  setQuickViewProduct: (product: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsAIChatOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsCompareOpen: (open: boolean) => void;
  loginUser: (
  email: string,
  password: string,
  selectedRole: UserProfile['role']
) => Promise<void>;

signUpUser: (
  name: string,
  email: string,
  password: string,
  role: UserProfile['role'],
  fpoOrCompany: string,
  location: string
) => Promise<void>;
logoutUser: () => Promise<void>;
  sendAIMessage: (text: string) => void;
  showToast: (title: string, message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  
  // Derived totals
  cartSubtotal: number;
  cartDeliveryFee: number;
  cartTotal: number;
  farmerDirectPayout: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
  try {
    const saved = localStorage.getItem('agribridge_custom_products');

    if (saved) {
      const customProducts = JSON.parse(saved) as Product[];

      return [
        ...customProducts,
        ...mockProducts.filter(
          mp => !customProducts.some(cp => cp.id === mp.id)
        )
      ];
    }
  } catch (error) {
    console.error('Failed to load saved AgriBridge listings:', error);
  }

  return mockProducts;
});
// Load farmer listings from Supabase
useEffect(() => {
  const loadDatabaseProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('agri_products')
        .select('product_data, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to load Supabase products:', error);
        return;
      }
      useEffect(() => {
  const migrateOldListingsToSupabase = async () => {
    try {
      const saved = localStorage.getItem('agribridge_custom_products');

      if (!saved) {
        return;
      }

      const oldProducts = JSON.parse(saved) as Product[];

      if (!oldProducts.length) {
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.log('No logged-in user. Skipping listing migration.');
        return;
      }

      const productsToMigrate = oldProducts.filter(
        product => product.id.startsWith('p-')
      );

      if (!productsToMigrate.length) {
        return;
      }

      const rows = productsToMigrate.map(product => ({
        id: product.id,
        product_data: product,
        farmer_id: user.id,
        name: product.name,
        category: product.category,
        location: product.location,
        price_per_kg: product.pricePerKg,
        available_quantity_tons: product.availableQuantityTons,
      }));

      const { error } = await supabase
        .from('agri_products')
        .upsert(rows, {
          onConflict: 'id',
        });

      if (error) {
        console.error(
          'Failed to migrate old listings:',
          error
        );
        return;
      }

      console.log(
        `Successfully migrated ${productsToMigrate.length} old listings to Supabase.`
      );
    } catch (error) {
      console.error(
        'Old listing migration failed:',
        error
      );
    }
  };

  migrateOldListingsToSupabase();
}, []);

      const databaseProducts = (data ?? [])
        .map(row => row.product_data as Product)
        .filter(Boolean);

      if (databaseProducts.length === 0) {
        return;
      }

      setProducts(prev => {
        const databaseIds = new Set(
          databaseProducts.map(product => product.id)
        );

        const remainingProducts = prev.filter(
          product => !databaseIds.has(product.id)
        );

        return [...databaseProducts, ...remainingProducts];
      });
    } catch (error) {
      console.error('Failed to load database products:', error);
    }
  };

  loadDatabaseProducts();
}, []);
const addProduct = async (product: Product): Promise<void> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Please log in before listing produce.');
    }

    const { error } = await supabase
      .from('agri_products')
      .upsert(
        {
          id: product.id,
          product_data: product,
          farmer_id: user.id,
          name: product.name,
          category: product.category,
          location: product.location,
          price_per_kg: product.pricePerKg,
          available_quantity_tons: product.availableQuantityTons,
        },
        {
          onConflict: 'id',
        }
      );

    if (error) {
      console.error('Supabase listing save error:', error);
      throw error;
    }

    setProducts(prev => {
      const withoutDuplicate = prev.filter(
        p => p.id !== product.id
      );

      return [product, ...withoutDuplicate];
    });
  } catch (error) {
    console.error('Failed to publish product:', error);
    throw error;
  }
};

useEffect(() => {
  try {
    const customProducts = products.filter(
      product => product.id.startsWith('p-')
    );

    localStorage.setItem(
      'agribridge_custom_products',
      JSON.stringify(customProducts)
    );
  } catch (error) {
    console.error('Failed to save AgriBridge listings:', error);
  }
}, [products]);

  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: mockProducts[0],
      quantityKg: 20,
      selectedTierPrice: 180
    },
    {
      product: mockProducts[1],
      quantityKg: 50,
      selectedTierPrice: 28
    }
  ]);
  
  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(['prod-mango-1', 'prod-greens-8']);
  
  // Compare items (max 3)
  const [compareItems, setCompareItems] = useState<Product[]>([mockProducts[1], mockProducts[2]]);
  
  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  
  // Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('AGRIFIRST');
  
  // Auth state
  const [user, setUser] = useState<UserProfile | null>(null);
   useEffect(() => {
    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Supabase session error:', error);
        return;
      }

      if (data.session?.user) {
        const profile = createUserProfile(data.session.user);
        setUser(profile);
      } else {
        setUser(null);
      }
    };

    loadSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Supabase auth event:', event);

      if (session?.user) {
        const profile = createUserProfile(session.user);
        setUser(profile);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // AI Chat Messages
  const [aiMessages, setAiMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'ai',
      text: 'Namaste! I am AgriAI, your precision agriculture & smart supply chain advisor. Ask me anything about crop demand forecasts, direct mandi pricing, cold chain freight, or planting recommendations.',
      timestamp: 'Just now'
    }
  ]);
  
  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (title: string, message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart actions
  const addToCart = (product: Product, quantityKg?: number) => {
    const qty = quantityKg || product.minOrderKg || 10;
    
    // Find best tier price
    let unitPrice = product.pricePerKg;
    if (product.bulkTiers && product.bulkTiers.length > 0) {
      const matchedTier = [...product.bulkTiers].reverse().find(tier => qty >= tier.minKg);
      if (matchedTier) {
        unitPrice = matchedTier.pricePerKg;
      }
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantityKg + qty;
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantityKg: newQty }
            : item
        );
      }
      return [...prev, { product, quantityKg: qty, selectedTierPrice: unitPrice }];
    });

    showToast('Added to Cart', `${qty} kg of ${product.name} added to your procurement basket.`, 'success');
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find(c => c.product.id === productId);
    setCart(prev => prev.filter(c => c.product.id !== productId));
    if (item) {
      showToast('Removed Item', `${item.product.name} removed from your cart.`, 'info');
    }
  };

  const updateCartQuantity = (productId: string, quantityKg: number) => {
    if (quantityKg <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId) {
          let unitPrice = item.product.pricePerKg;
          if (item.product.bulkTiers) {
            const matchedTier = [...item.product.bulkTiers].reverse().find(tier => quantityKg >= tier.minKg);
            if (matchedTier) unitPrice = matchedTier.pricePerKg;
          }
          return { ...item, quantityKg, selectedTierPrice: unitPrice };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'AGRIFIRST' || cleanCode === 'GREENFARMS' || cleanCode === 'KISAN50') {
      setAppliedCoupon(cleanCode);
      showToast('Coupon Applied!', `Coupon code ${cleanCode} applied with ₹300 direct discount.`, 'success');
      return true;
    } else {
      showToast('Invalid Coupon', 'Try using promo code AGRIFIRST or GREENFARMS.', 'warning');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Promo code removed.', 'info');
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
      if (prod) showToast('Removed from Wishlist', `${prod.name} removed.`, 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      if (prod) showToast('Added to Wishlist', `${prod.name} saved for later.`, 'success');
    }
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Compare actions
  const addToCompare = (product: Product) => {
    if (compareItems.some(p => p.id === product.id)) {
      setIsCompareOpen(true);
      return;
    }
    if (compareItems.length >= 3) {
      showToast('Compare Limit', 'You can compare up to 3 produce varieties at once.', 'warning');
      setIsCompareOpen(true);
      return;
    }
    setCompareItems(prev => [...prev, product]);
    setIsCompareOpen(true);
    showToast('Added to Comparison', `${product.name} added to comparison grid.`, 'success');
  };

  const removeFromCompare = (productId: string) => {
    setCompareItems(prev => prev.filter(p => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareItems([]);
    setIsCompareOpen(false);
  };

  // Auth actions
  // Auth actions

  const createUserProfile = (
    authUser: any,
    fallbackRole?: UserProfile['role']
  ): UserProfile => {
    const metadata = authUser?.user_metadata || {};

    const role = (metadata.role || fallbackRole || 'Buyer') as UserProfile['role'];

    return {
      name: metadata.name || authUser.email?.split('@')[0] || 'User',
      email: authUser.email || '',
      role,
      fpoOrCompany: metadata.fpoOrCompany || '',
      location: metadata.location || '',
      avatar:
        metadata.avatar ||
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    };
  };

  const loginUser = async (
    email: string,
    password: string,
    selectedRole: UserProfile['role']
  ): Promise<void> => {
    try {
      const cleanEmail = email.trim().toLowerCase();

      if (!cleanEmail || !password) {
        showToast(
          'Login Failed',
          'Please enter your email and password.',
          'warning'
        );
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });

      if (error) {
        console.error('Supabase login error:', error);

        showToast(
          'Login Failed',
          error.message || 'Invalid email or password.',
          'warning'
        );
        return;
      }

      if (!data.user) {
        showToast(
          'Login Failed',
          'No user account was returned by Supabase.',
          'warning'
        );
        return;
      }

      const profile = createUserProfile(data.user, selectedRole);

      // Check selected role against saved role
      if (profile.role !== selectedRole) {
        await supabase.auth.signOut();

        showToast(
          'Wrong Role',
          `This account is registered as ${profile.role}. Please select ${profile.role}.`,
          'warning'
        );
        return;
      }

      setUser(profile);
      setIsAuthModalOpen(false);

      showToast(
        `Logged In as ${profile.role}`,
        `Welcome back, ${profile.name}!`,
        'success'
      );
    } catch (error) {
      console.error('Login error:', error);

      showToast(
        'Login Failed',
        'Something went wrong while logging in.',
        'warning'
      );
    }
  };

  const signUpUser = async (
    name: string,
    email: string,
    password: string,
    role: UserProfile['role'],
    fpoOrCompany: string,
    location: string
  ): Promise<void> => {
    try {
      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();
      const cleanCompany = fpoOrCompany.trim();
      const cleanLocation = location.trim();

      if (!cleanName || !cleanEmail || !password) {
        showToast(
          'Signup Failed',
          'Name, email and password are required.',
          'warning'
        );
        return;
      }

      if (password.length < 6) {
        showToast(
          'Signup Failed',
          'Password must contain at least 6 characters.',
          'warning'
        );
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
           emailRedirectTo: `${window.location.origin}/auth/confirm`,
          data: {
            name: cleanName,
            role,
            fpoOrCompany: cleanCompany,
            location: cleanLocation
          }
        }
      });

      if (error) {
        console.error('Supabase signup error:', error);

        showToast(
          'Signup Failed',
          error.message || 'Unable to create account.',
          'warning'
        );
        return;
      }

      // If email confirmation is disabled, Supabase returns a session.
      if (data.session && data.user) {
        const profile = createUserProfile(data.user, role);

        setUser(profile);
        setIsAuthModalOpen(false);

        showToast(
          'Account Created',
          `Welcome to AgriBridge, ${profile.name}!`,
          'success'
        );
      } else {
        // Email confirmation is enabled in Supabase
        showToast(
          'Check Your Email',
          'Account created successfully. Please verify your email before logging in.',
          'info'
        );
      }
    } catch (error) {
      console.error('Signup error:', error);

      showToast(
        'Signup Failed',
        'Something went wrong while creating your account.',
        'warning'
      );
    }
  };

  const logoutUser = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Supabase logout error:', error);

        showToast(
          'Logout Failed',
          error.message || 'Unable to log out.',
          'warning'
        );
        return;
      }

      setUser(null);

      showToast(
        'Logged Out',
        'You have been signed out successfully.',
        'info'
      );
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
    }
  }; 

  // AI Chat action
  const sendAIMessage = (text: string) => {
    const userMsg: AIChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setAiMessages(prev => [...prev, userMsg]);

    // Simulate smart AI response matching knowledge base or answering contextually
    setTimeout(() => {
      const normalized = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
      let match = Object.keys(mockAIChatKnowledge).find(key => normalized.includes(key));
      
      let aiText = "Our AI algorithm has processed your agricultural parameters across 14 APMC markets and regional satellite weather matrices.";
      let snippet = undefined;

      if (match) {
        aiText = mockAIChatKnowledge[match].response;
        snippet = mockAIChatKnowledge[match].snippet;
      } else if (normalized.includes('price') || normalized.includes('rate') || normalized.includes('mandi')) {
        aiText = "Direct farmgate prices on AgriBridge are currently averaging 24% higher for farmers while saving commercial buyers 18% compared to traditional 5-tier mandi brokers.";
        snippet = {
          title: 'Direct Price Realization Index',
          type: 'price',
          metrics: [
            { label: 'Farmer Realization', value: '78-84%' },
            { label: 'Traditional Mandi', value: '38-42%' },
            { label: 'Avg Freight Efficiency', value: '+31%' }
          ],
          recommendation: 'Lock long-term off-take contracts on AgriBridge to hedge seasonal volatility.'
        };
      } else if (normalized.includes('tomato') || normalized.includes('onion') || normalized.includes('potato')) {
        aiText = "Tomatoes and Onions show strong upward demand trends (+18.4% and +12.7%) for next month due to restaurant reopening cycles in Mumbai and Delhi NCR.";
        snippet = {
          title: 'Vegetable Basket Forecast',
          type: 'demand',
          metrics: [
            { label: 'Tomatoes', value: '↑ 18.4%' },
            { label: 'Onions', value: '↑ 12.7%' },
            { label: 'Potatoes', value: '↓ 8.2%' },
            { label: 'AI Accuracy', value: '94.6%' }
          ],
          recommendation: 'Check the AI Insights tab for detailed 8-month historical vs predictive curves.'
        };
      } else {
        aiText = `Here is our precision insight for "${text}": We recommend checking regional collection center schedules and booking your cold-chain truck slot 18 hours prior to harvest for maximum freshness.`;
      }

      const aiMsg: AIChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        sender: 'ai',
        text: aiText,
        timestamp: 'Just now',
        dataSnippet: snippet
      };

      setAiMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.quantityKg * item.selectedTierPrice), 0);
  const discountAmount = appliedCoupon ? 300 : 0;
  const cartDeliveryFee = cartSubtotal > 2500 ? 0 : 150;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + (cart.length > 0 ? cartDeliveryFee : 0));
  
  // Farmer direct payout (approx 78% of product gross)
  const farmerDirectPayout = cart.reduce((sum, item) => {
    const farmerPerKg = item.product.priceBreakdown?.farmerShare || (item.selectedTierPrice * 0.78);
    return sum + (item.quantityKg * farmerPerKg);
  }, 0);

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        wishlist,
        addProduct,
        compareItems,
        quickViewProduct,
        isCartOpen,
        isAIChatOpen,
        isAuthModalOpen,
        isCompareOpen,
        user,
        aiMessages,
        toasts,
        appliedCoupon,
        discountAmount,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        toggleWishlist,
        isWishlisted,
        addToCompare,
        removeFromCompare,
        clearCompare,
        setQuickViewProduct,
        setIsCartOpen,
        setIsAIChatOpen,
        setIsAuthModalOpen,
        setIsCompareOpen,
        loginUser,
        signUpUser,
        logoutUser,
        sendAIMessage,
        showToast,
        removeToast,
        cartSubtotal,
        cartDeliveryFee,
        cartTotal,
        farmerDirectPayout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
