import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Activity, Box, Clock, LayoutDashboard, Target, Zap, ChevronRight, TrendingDown, Users, Mail, Lock, Store, ShoppingCart, Heart, Trash, CheckCircle, Smartphone, CreditCard, MoreVertical, LogOut, Flame, List, Plus, X, Search, MapPin, Star, Truck, Gift, Scan, Share2, Droplets, Wind, Bell, User, Package, Calendar
} from 'lucide-react';

// --- 1. INLINE ICONS (Crash-Proof Fallbacks) ---
const IndianRupee = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></svg>;
const Banknote = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>;
const Sun = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const Moon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
const Leaf = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>;
const Globe = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;

// --- 2. GLOBAL STATE INITIAL DATA ---
const initialProducts = [
  { id: 1, name: 'Amul Taaza Milk (1L)', category: 'Dairy', basePrice: 68, livePrice: 12, inventory: 150, totalShelfLife: 168, timeRemaining: 12, optimalInventory: 50, demand: 'Medium', emoji: '🥛', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80', rating: 4.5, reviews: 850 },
  { id: 2, name: 'Britannia Brown Bread', category: 'Bakery', basePrice: 45, livePrice: 12, inventory: 85, totalShelfLife: 120, timeRemaining: 20, optimalInventory: 30, demand: 'Medium', emoji: '🍞', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80', rating: 4.6, reviews: 540 },
  { id: 3, name: 'Organic Bananas (1kg)', category: 'Fruits', basePrice: 80, livePrice: 46, inventory: 250, totalShelfLife: 240, timeRemaining: 150, optimalInventory: 100, demand: 'Medium', emoji: '🍌', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&q=80', rating: 4.1, reviews: 210 },
  { id: 4, name: 'Farm Fresh Eggs (6pk)', category: 'Grocery', basePrice: 60, livePrice: 57, inventory: 100, totalShelfLife: 336, timeRemaining: 200, optimalInventory: 50, demand: 'Medium', emoji: '🥚', image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=400&q=80', rating: 4.4, reviews: 450 },
  { id: 5, name: 'Fresh Spinach Bunch', category: 'Vegetables', basePrice: 35, livePrice: 11, inventory: 180, totalShelfLife: 72, timeRemaining: 10, optimalInventory: 40, demand: 'Medium', emoji: '🥬', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80', rating: 4.2, reviews: 150 },
  { id: 6, name: 'Aashirvaad Wheat (5kg)', category: 'Grocery', basePrice: 240, livePrice: 240, inventory: 40, totalShelfLife: 720, timeRemaining: 500, optimalInventory: 20, demand: 'High', emoji: '🌾', image: 'https://images.jdmagicbox.com/quickquotes/images_main/-107muc8b.jpg', rating: 4.8, reviews: 1240 },
  { id: 7, name: 'Premium Paneer (200g)', category: 'Dairy', basePrice: 85, livePrice: 21, inventory: 30, totalShelfLife: 72, timeRemaining: 16, optimalInventory: 10, demand: 'Medium', emoji: '🧀', image: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?w=400&q=80', rating: 4.2, reviews: 320 },
  { id: 8, name: 'Chicken Breast (500g)', category: 'Meat', basePrice: 250, livePrice: 113, inventory: 15, totalShelfLife: 168, timeRemaining: 130, optimalInventory: 10, demand: 'High', emoji: '🍗', image: 'https://www.everydaycheapskate.com/wp-content/uploads/20250407-how-to-cook-boneless-skinless-chicken-breast-on-a-cutting-board-with-thyme-garlic-and-red-peppercorns.png', rating: 4.5, reviews: 410 },
  { id: 9, name: 'Kashmiri Apples (1kg)', category: 'Fruits', basePrice: 120, livePrice: 120, inventory: 80, totalShelfLife: 336, timeRemaining: 200, optimalInventory: 30, demand: 'High', emoji: '🍎', image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&q=80', rating: 4.9, reviews: 930 },
  { id: 10, name: 'Fresh Tomatoes (1kg)', category: 'Vegetables', basePrice: 40, livePrice: 30, inventory: 100, totalShelfLife: 240, timeRemaining: 140, optimalInventory: 40, demand: 'Medium', emoji: '🍅', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80', rating: 4.3, reviews: 620 },
  { id: 11, name: 'Greek Yogurt (400g)', category: 'Dairy', basePrice: 150, livePrice: 132, inventory: 40, totalShelfLife: 336, timeRemaining: 160, optimalInventory: 20, demand: 'Medium', emoji: '🥣', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80', rating: 4.7, reviews: 810 },
  { id: 12, name: 'Premium Almonds (500g)', category: 'Grocery', basePrice: 450, livePrice: 450, inventory: 20, totalShelfLife: 720, timeRemaining: 600, optimalInventory: 15, demand: 'Medium', emoji: '🥜', image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&q=80', rating: 4.8, reviews: 340 },
  { id: 13, name: 'Basmati Rice (5kg)', category: 'Grocery', basePrice: 350, livePrice: 350, inventory: 60, totalShelfLife: 720, timeRemaining: 600, optimalInventory: 30, demand: 'High', emoji: '🍚', image: 'https://sinfullyspicy.com/wp-content/uploads/2024/07/1200-by-1200-images-2.jpg', rating: 4.9, reviews: 1120 },
  { id: 14, name: 'Red Onions (1kg)', category: 'Vegetables', basePrice: 30, livePrice: 30, inventory: 200, totalShelfLife: 720, timeRemaining: 400, optimalInventory: 100, demand: 'High', emoji: '🧅', image: 'https://media.istockphoto.com/id/499146870/photo/red-onions.jpg?s=612x612&w=0&k=20&c=OaZUynAtxIJyPaSgAsAGWwAbpTs_EfKF5zT_UvBDpbY=', rating: 4.6, reviews: 500 },
  { id: 15, name: 'Potatoes (1kg)', category: 'Vegetables', basePrice: 25, livePrice: 25, inventory: 300, totalShelfLife: 720, timeRemaining: 500, optimalInventory: 150, demand: 'High', emoji: '🥔', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80', rating: 4.5, reviews: 750 }
];

const initialOrders = [
  { id: 'EP-482910', date: 'May 10, 2026', items: 'Amul Taaza Milk (1L), Britannia Brown Bread', total: 98, status: 'Delivered' },
  { id: 'EP-391822', date: 'May 05, 2026', items: 'Premium Mystery Rescue Bag', total: 99, status: 'Delivered' },
  { id: 'EP-219384', date: 'April 28, 2026', items: 'Organic Bananas, Farm Fresh Eggs', total: 85, status: 'Delivered' },
  { id: 'EP-102938', date: 'April 15, 2026', items: 'Aashirvaad Atta (5kg), Fresh Paneer', total: 290, status: 'Delivered' }
];

const initialProfitData = [
  { month: 'Jan', dynamicProfit: 45000, staticProfit: 35000, expiredLoss: 12000 },
  { month: 'Feb', dynamicProfit: 52000, staticProfit: 38000, expiredLoss: 14000 },
  { month: 'Mar', dynamicProfit: 49000, staticProfit: 37000, expiredLoss: 13500 },
  { month: 'Apr', dynamicProfit: 58000, staticProfit: 41000, expiredLoss: 16000 },
  { month: 'May', dynamicProfit: 64000, staticProfit: 45000, expiredLoss: 18000 },
  { month: 'Jun', dynamicProfit: 71000, staticProfit: 48000, expiredLoss: 21000 },
  { month: 'Jul', dynamicProfit: 75000, staticProfit: 51000, expiredLoss: 23000 },
];

// --- 3. PRICING ALGORITHM ---
const calculateDynamicPrice = (basePrice, T, L, I, O, demand) => {
  const timeRatio = Math.min(1, Math.max(0, T / L)); 
  const alpha = 2.5; 
  const timeDiscount = Math.pow(1 - timeRatio, alpha); 

  const overstockRatio = O > 0 ? Math.max(0, (I - O) / O) : 0;
  const inventoryPenalty = Math.min(0.3, overstockRatio * 0.1); 

  let demandModifier = 0;
  if (demand === 'Low') demandModifier = 0.15; 
  if (demand === 'High') demandModifier = -0.10; 

  let totalDiscount = timeDiscount + inventoryPenalty + demandModifier;
  totalDiscount = Math.min(0.90, Math.max(0, totalDiscount));

  return (basePrice * (1 - totalDiscount)).toFixed(0);
};

// --- 4. UTILITY COMPONENTS ---
function Widget({ title, value, icon, colorClass = "text-blue-500" }) {
  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-lg flex items-center space-x-4 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group cursor-default">
      <div className={`p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl group-hover:scale-110 transition-transform duration-300 ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">{value}</p>
      </div>
    </div>
  );
}

// --- 5. AUTHENTICATION COMPONENT ---
function AuthScreen({ onAuth, isDarkMode, toggleTheme }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth({ 
      name: isLogin ? 'Rahul Sharma' : name || 'New User', 
      email,
      role: 'customer' 
    });
  };

  // CONSUMER LOGIN
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 relative font-sans p-4 overflow-x-hidden overflow-y-auto">
      
      {/* Global Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button onClick={toggleTheme} className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-teal-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/50 dark:border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative z-10 transition-colors duration-500 my-10">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-100 dark:bg-emerald-900/40 p-4 rounded-3xl border border-emerald-200 dark:border-emerald-800/50">
            <Zap className="text-emerald-500 dark:text-emerald-400 w-8 h-8" />
          </div>
        </div>
        <h2 className="text-3xl font-black text-center text-slate-800 dark:text-white mb-2 tracking-tight">EcoPrice</h2>
        <p className="text-center text-emerald-600 dark:text-emerald-400 mb-8 font-medium">Save money. Save food. Together.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
          </div>

          <button type="submit" className="w-full text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-500/30 transform transition-all active:scale-95 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-lg mt-2">
            {isLogin ? 'Sign In' : 'Join the Movement'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {isLogin ? "New to EcoPrice?" : "Already joined?"}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="ml-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-black underline transition-colors">
              {isLogin ? 'Create Account' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// --- 6. MODERN CUSTOMER STOREFRONT & PROFILE ---
function CustomerStorefront({ user, products, onLogout, isDarkMode, toggleTheme, orders, onPlaceOrder, lifetimeStats }) {
  const [activeTab, setActiveTab] = useState('shop'); // 'shop', 'cart', 'profile'
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const [toastMsg, setToastMsg] = useState(null);
  const [checkoutState, setCheckoutState] = useState('cart'); 

  useEffect(() => {
    const names = ['Priya', 'Rahul', 'Anjali', 'Vikram', 'Sneha', 'Amit', 'Neha', 'Rohan'];
    const items = ['2L of Amul Milk', '5kg Aashirvaad Atta', 'Fresh Paneer', 'Kashmiri Apples', 'a Mystery Rescue Bag'];
    
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomItem = items[Math.floor(Math.random() * items.length)];
      setToastMsg(`⚡ ${randomName} from Delhi just rescued ${randomItem}!`);
      setTimeout(() => setToastMsg(null), 4000);
    }, 12000); 
    
    return () => clearInterval(interval);
  }, []);

  const addToCart = useCallback((product, currentPrice) => {
    setCart(prev => [...prev, { ...product, cartPrice: currentPrice, cartId: Date.now() }]);
  }, []);

  const removeFromCart = useCallback((cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  }, []);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + parseFloat(item.cartPrice), 0), [cart]);
  const cartSavings = useMemo(() => cart.reduce((sum, item) => sum + (item.basePrice - parseFloat(item.cartPrice)), 0), [cart]);

  // GLOBAL CHECKOUT HANDLER
  const handleCheckout = () => {
    setCheckoutState('processing');
    setTimeout(() => {
      const totalBase = cart.reduce((sum, item) => sum + item.basePrice, 0);
      // Trigger the global app state update
      onPlaceOrder(cart, cartTotal, totalBase);
      setCheckoutState('receipt');
    }, 2500); 
  };

  const closeReceipt = () => {
    setCart([]);
    setCheckoutState('cart');
    setActiveTab('profile'); // Send them to profile to see the new order
  };

  const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], [products]);
  
  const searchedProducts = useMemo(() => {
    let result = products;
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    return result;
  }, [products, searchQuery, selectedCategory]);

  const stealDeals = useMemo(() => products.filter(p => p.timeRemaining < 24).sort((a,b) => a.timeRemaining - b.timeRemaining), [products]);
  const freshArrivals = useMemo(() => products.filter(p => p.timeRemaining > 100), [products]);

  const ProductCard = ({ p }) => {
    const currentPriceStr = p.livePrice ? p.livePrice.toString() : calculateDynamicPrice(p.basePrice, p.timeRemaining, p.totalShelfLife, p.inventory, p.optimalInventory, p.demand);
    const discountPct = Math.round((1 - (parseFloat(currentPriceStr) / p.basePrice)) * 100);
    const isCritical = p.timeRemaining < 24;

    return (
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden transition-all duration-300 group flex flex-col w-full">
        <div className="h-56 relative overflow-hidden bg-slate-50 dark:bg-slate-700 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
          <img src={p.image} alt={p.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" />
          
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            {discountPct > 0 && (
              <span className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                -{discountPct}% OFF
              </span>
            )}
            {isCritical && (
              <span className="bg-orange-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" /> {p.timeRemaining}h
              </span>
            )}
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col bg-white dark:bg-slate-800">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{p.category}</span>
          </div>
          
          <h3 className="font-extrabold text-xl text-slate-800 dark:text-white mb-4 line-clamp-2 leading-tight">{p.name}</h3>
          
          <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-700/50">
            <div className="flex items-end space-x-3 mb-4">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">₹{currentPriceStr}</span>
              {discountPct > 0 && (
                <span className="text-sm text-slate-400 dark:text-slate-500 line-through font-bold mb-1">₹{p.basePrice}</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center">
                <Truck className="w-4 h-4 mr-1 text-blue-500" /> 30 mins
              </p>
              <button onClick={() => addToCart(p, currentPriceStr)} className="bg-slate-900 hover:bg-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold p-3 rounded-2xl transition-all active:scale-95 shadow-md flex items-center justify-center group/btn">
                <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-y-auto transition-colors duration-500">
      
      {/* 1. MODERN FLOATING NAVBAR */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 sticky top-0 z-50 transition-colors duration-500">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between gap-6">
          
          <div className="flex items-center gap-6 shrink-0">
            <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('shop')}>
              <div className="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-xl border border-emerald-200 dark:border-emerald-800/50 mr-3">
                <Zap className="text-emerald-500 dark:text-emerald-400 w-6 h-6" />
              </div>
              <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white hidden sm:block">EcoPrice</span>
            </div>
            
            <div className="hidden lg:flex items-center cursor-pointer bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-2xl transition-colors">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
              <div className="text-xs leading-tight">
                <p className="text-slate-500 dark:text-slate-400">Delivering to</p>
                <p className="font-bold text-slate-800 dark:text-white">New Delhi 110001</p>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-2xl flex">
            <div className="flex w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:bg-white dark:focus-within:bg-slate-900 border border-transparent focus-within:border-emerald-500/20 transition-all shadow-inner">
              <div className="pl-5 pr-2 flex items-center justify-center text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Search fresh groceries, organic veggies..." 
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value); setActiveTab('shop');}}
                className="flex-1 px-2 py-3.5 text-sm text-slate-900 dark:text-white bg-transparent outline-none w-full placeholder-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button onClick={toggleTheme} className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button onClick={() => setActiveTab('cart')} className="relative p-3 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-sm">
                  {cart.length}
                </span>
              )}
            </button>
            
            <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700 cursor-pointer hover:opacity-80" onClick={() => setActiveTab('profile')}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold shadow-md">
                {user.name.charAt(0)}
              </div>
              <button onClick={(e) => {e.stopPropagation(); onLogout();}} title="Sign Out" className="text-slate-400 hover:text-red-500 p-2">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- TAB: SHOP VIEW --- */}
      {activeTab === 'shop' && (
        <div className="flex-1 pb-20 relative">
          
          {toastMsg && (
            <div className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-slate-800 text-white px-5 py-4 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
              <div className="bg-emerald-500/20 p-2 rounded-full">
                <Bell className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-sm font-bold">{toastMsg}</p>
            </div>
          )}

          {searchQuery === '' && selectedCategory === 'All' && (
            <div className="max-w-[1600px] mx-auto px-6 mt-8 mb-12">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-950 border border-emerald-100 dark:border-slate-800 shadow-xl dark:shadow-2xl group transition-colors duration-500">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-emerald-400/30 dark:bg-emerald-500/10 rotate-12 blur-[120px] pointer-events-none group-hover:bg-emerald-400/40 dark:group-hover:bg-emerald-500/20 transition-all duration-1000"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[120%] bg-teal-400/30 dark:bg-teal-500/10 -rotate-12 blur-[100px] pointer-events-none group-hover:bg-teal-400/40 dark:group-hover:bg-teal-500/20 transition-all duration-1000"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-5 mix-blend-overlay pointer-events-none"></div>

                <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between p-10 sm:p-14 gap-12">
                  <div className="flex-1 w-full max-w-2xl">
                    <div className="inline-flex items-center space-x-3 mb-6 bg-white/60 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-full px-4 py-2 backdrop-blur-md">
                      <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                      <span className="text-emerald-700 dark:text-emerald-300 font-bold tracking-widest uppercase text-xs">Global Impact Dashboard</span>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight transition-colors">
                      Become a <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 drop-shadow-sm">
                        Zero-Waste Hero.
                      </span>
                    </h2>
                    
                    <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl font-medium leading-relaxed mb-8 transition-colors">
                      Every item you rescue here is a direct victory against landfills. Save money while preserving water, cutting CO₂ emissions, and building a sustainable future.
                    </p>
                  </div>

                  <div className="w-full xl:w-auto flex flex-col sm:flex-row xl:flex-col gap-6">
                    <div className="flex-1 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-3xl p-6 sm:p-8 flex items-center space-x-6 shadow-xl hover:bg-white dark:hover:bg-white/10 transition-colors group/card">
                      <div className="bg-blue-100 dark:bg-blue-500/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-500/30 group-hover/card:scale-110 transition-transform">
                        <Globe className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-[spin_12s_linear_infinite]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Community Impact</p>
                        <p className="text-3xl font-black text-slate-800 dark:text-white flex items-baseline gap-2 transition-colors">
                          12,450 <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">kg saved</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-3xl p-6 sm:p-8 flex items-center space-x-6 shadow-xl hover:bg-white dark:hover:bg-white/10 transition-colors group/card">
                      <div className="bg-orange-100 dark:bg-orange-500/20 p-4 rounded-2xl border border-orange-200 dark:border-orange-500/30 group-hover/card:scale-110 transition-transform">
                        <Flame className="w-10 h-10 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">CO₂ Prevented</p>
                        <p className="text-3xl font-black text-slate-800 dark:text-white flex items-baseline gap-2 transition-colors">
                          31.1 <span className="text-base font-bold text-orange-600 dark:text-orange-400">Tons</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-[1600px] mx-auto px-6 space-y-12 relative z-20">
            
            {searchQuery === '' && selectedCategory === 'All' && (
              <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 rounded-[2rem] p-1 shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                   onClick={() => addToCart({ id: 'mystery', name: 'Premium Mystery Rescue Bag', category: 'Mixed', basePrice: 450, inventory: 10, timeRemaining: 2, emoji: '🎁', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80', rating: 4.9, reviews: 890 }, 99)}>
                <div className="bg-white/10 backdrop-blur-sm rounded-[30px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                  <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="flex items-center gap-6 z-10">
                    <div className="bg-white p-4 rounded-2xl shadow-md group-hover:animate-bounce">
                      <Gift className="w-10 h-10 text-orange-500" />
                    </div>
                    <div>
                      <span className="bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest shadow-sm">Limited Time Offer</span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 leading-tight">The Mystery Rescue Bag</h3>
                      <p className="text-amber-50 font-medium mt-1">Get ₹450+ worth of perfectly good, assorted groceries nearing expiry for a flat rate.</p>
                    </div>
                  </div>
                  
                  <div className="z-10 flex items-center gap-4 bg-white dark:bg-slate-900 px-6 py-4 rounded-2xl shadow-xl w-full md:w-auto justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">Flat Price</p>
                      <p className="text-3xl font-black text-slate-900 dark:text-white">₹99</p>
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold p-3 rounded-xl transition-all shadow-md">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pb-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-bold text-sm transition-all shadow-sm ${
                    selectedCategory === category
                      ? 'bg-slate-900 dark:bg-emerald-500 text-white shadow-lg border-transparent scale-105'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {category === 'All' ? '🛒 All Categories' : category}
                </button>
              ))}
            </div>

            {searchQuery === '' && selectedCategory === 'All' && stealDeals.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center tracking-tight">
                    <Flame className="w-7 h-7 text-orange-500 mr-2" /> Steal Deals (Expiring in &lt; 24h)
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {stealDeals.map(p => (
                    <ProductCard key={`steal-${p.id}`} p={p} />
                  ))}
                </div>
              </div>
            )}

            <div className="bg-transparent pt-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory !== 'All' ? `Showing ${selectedCategory}` : 'Explore All Items'}
              </h2>
              
              {searchedProducts.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 p-16 rounded-[2.5rem] text-center shadow-sm border border-slate-100 dark:border-slate-700">
                  <Search className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">No items found</h3>
                  <p className="text-slate-500 text-lg">Try adjusting your search or selecting a different category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-12">
                  {searchedProducts.map(p => (
                    <ProductCard key={`grid-${p.id}`} p={p} />
                  ))}
                </div>
              )}
            </div>

            {searchQuery === '' && selectedCategory === 'All' && freshArrivals.length > 0 && (
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center tracking-tight">
                    <CheckCircle className="w-7 h-7 text-emerald-500 mr-2" /> Fresh Arrivals
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {freshArrivals.map(p => (
                    <ProductCard key={`fresh-${p.id}`} p={p} />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* --- TAB: CART VIEW --- */}
      {activeTab === 'cart' && (
        <div className="p-8 max-w-4xl mx-auto min-h-[70vh] w-full">
          
          {checkoutState === 'cart' && (
            <>
              <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-8">Your Cart ({cart.length} items)</h1>
              <button onClick={() => setActiveTab('shop')} className="text-blue-600 font-bold hover:underline mb-8 flex items-center"><ChevronRight className="w-4 h-4 rotate-180 mr-1"/> Continue Shopping</button>
              
              {cart.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm">
                  <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-xl font-bold text-slate-500">Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1 space-y-4">
                    {cart.map((item) => (
                      <div key={item.cartId} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50 p-4 flex items-center">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-xl flex-shrink-0 flex items-center justify-center text-3xl overflow-hidden">
                          {item.id === 'mystery' ? '🎁' : <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 ml-4">
                          <h3 className="font-bold text-slate-800 dark:text-white">{item.name}</h3>
                          <div className="flex space-x-2 mt-1 items-center">
                            <span className="text-emerald-600 dark:text-emerald-400 font-black">₹{item.cartPrice}</span>
                            <span className="text-slate-400 dark:text-slate-500 line-through text-xs font-bold">₹{item.basePrice}</span>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.cartId)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                          <Trash className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="w-full lg:w-80 h-fit bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700">
                     <div className="space-y-4 mb-6 text-slate-600 dark:text-slate-300 font-medium">
                        <div className="flex justify-between"><span>Items ({cart.length})</span><span>₹{(cartTotal + cartSavings).toFixed(2)}</span></div>
                        <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold"><span>EcoPrice Savings</span><span>-₹{cartSavings.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Delivery</span><span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</span></div>
                     </div>
                     <div className="flex justify-between items-center text-2xl font-black mb-8 text-slate-800 dark:text-white border-t border-slate-100 dark:border-slate-700 pt-4">
                        <span>Total:</span>
                        <span className="text-slate-900 dark:text-white">₹{cartTotal.toFixed(2)}</span>
                     </div>
                     <button onClick={handleCheckout} className="w-full bg-slate-900 hover:bg-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg text-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 mr-2" /> Secure Checkout
                     </button>
                  </div>
                </div>
              )}
            </>
          )}

          {checkoutState === 'processing' && (
            <div className="flex flex-col items-center justify-center py-32">
               <Activity className="w-16 h-16 text-emerald-500 animate-spin-slow mb-6" />
               <h2 className="text-2xl font-black text-slate-800 dark:text-white">Processing your rescue...</h2>
               <p className="text-slate-500 font-medium mt-2">Securing payment and alerting the merchant.</p>
            </div>
          )}

          {checkoutState === 'receipt' && (
            <div className="max-w-md mx-auto animate-in zoom-in-95 duration-500">
               <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2.5rem] p-1 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-20 -mt-20"></div>
                 
                 <div className="bg-white dark:bg-slate-900 rounded-[2.3rem] p-8 relative z-10 text-center">
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
                       <CheckCircle className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Rescue Complete!</h2>
                    <p className="text-slate-500 font-medium mb-8">Order #EP-{Math.floor(100000 + Math.random() * 900000)} confirmed.</p>

                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-100 dark:border-slate-700/50 text-left">
                       <h3 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4 text-center">Your Eco-Receipt</h3>
                       
                       <div className="flex justify-between items-center mb-4">
                          <span className="font-medium text-slate-600 dark:text-slate-300">Amount Paid</span>
                          <span className="font-black text-xl text-slate-900 dark:text-white">₹{cartTotal.toFixed(2)}</span>
                       </div>
                       
                       <div className="h-px bg-slate-200 dark:bg-slate-700 w-full mb-4"></div>

                       <div className="space-y-4">
                          <div className="flex items-center text-blue-600 dark:text-blue-400 font-bold">
                             <Droplets className="w-5 h-5 mr-3" />
                             <div className="flex-1">
                                <p className="text-sm">Water Saved</p>
                                <p className="text-lg">{(cart.length * 150).toLocaleString()} Liters</p>
                             </div>
                          </div>
                          <div className="flex items-center text-orange-500 dark:text-orange-400 font-bold">
                             <Wind className="w-5 h-5 mr-3" />
                             <div className="flex-1">
                                <p className="text-sm">CO₂ Prevented</p>
                                <p className="text-lg">{(cart.length * 0.5).toFixed(1)} kg</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black py-4 rounded-xl shadow-lg shadow-purple-500/30 transition-all active:scale-95 flex items-center justify-center mb-4">
                       <Share2 className="w-5 h-5 mr-2" /> Share to Instagram
                    </button>
                    
                    <button onClick={closeReceipt} className="text-slate-500 dark:text-slate-400 font-bold hover:text-slate-800 dark:hover:text-white transition-colors">
                       View My Profile
                    </button>
                 </div>
               </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB: PROFILE VIEW --- */}
      {activeTab === 'profile' && (
        <div className="flex-1 pb-20 p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700/50 p-8 sm:p-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
               <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white flex items-center justify-center font-black text-5xl shadow-xl shadow-purple-500/30">
                     {user.name.charAt(0)}
                  </div>
                  <div className="text-center md:text-left flex-1">
                     <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest mb-4">
                        <Leaf className="w-3 h-3 mr-1" /> Zero-Waste Hero
                     </div>
                     <h1 className="text-4xl font-black text-slate-800 dark:text-white mb-2">{user.name}</h1>
                     <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center md:justify-start">
                        <Mail className="w-4 h-4 mr-2" /> {user.email}
                     </p>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-8">
                 <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700/50">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-6 uppercase tracking-widest text-xs flex items-center">
                       <Globe className="w-4 h-4 mr-2 text-blue-500" /> Lifetime Impact
                    </h3>
                    <div className="space-y-4">
                       <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent dark:border-slate-700/50">
                          <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold"><Banknote className="w-5 h-5 mr-3"/> Savings</div>
                          <span className="font-black text-slate-800 dark:text-white text-xl">₹{lifetimeStats.savings.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                       </div>
                       <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent dark:border-slate-700/50">
                          <div className="flex items-center text-blue-500 font-bold"><Droplets className="w-5 h-5 mr-3"/> Water</div>
                          <span className="font-black text-slate-800 dark:text-white text-xl">{lifetimeStats.water.toLocaleString()} L</span>
                       </div>
                       <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent dark:border-slate-700/50">
                          <div className="flex items-center text-orange-500 font-bold"><Wind className="w-5 h-5 mr-3"/> CO₂</div>
                          <span className="font-black text-slate-800 dark:text-white text-xl">{lifetimeStats.co2.toFixed(1)} kg</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-2">
                 <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700/50 h-full">
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-6 flex items-center">
                       <Package className="w-6 h-6 mr-3 text-blue-500" /> Past Orders & Rescues
                    </h3>
                    
                    <div className="space-y-4">
                       {orders.map((order, i) => (
                          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 rounded-2xl transition-colors bg-slate-50/50 dark:bg-slate-900/30 group">
                             <div className="mb-4 sm:mb-0">
                                <div className="flex items-center space-x-3 mb-2">
                                   <span className="font-bold text-slate-800 dark:text-white">{order.id}</span>
                                   <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">{order.status}</span>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1.5 flex items-center"><Calendar className="w-4 h-4 mr-1.5"/> {order.date}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-1">{order.items}</p>
                             </div>
                             <div className="text-left sm:text-right">
                                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-1">Total</p>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">₹{order.total}</p>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 7. MERCHANT PORTAL ---
function MerchantDashboard({ products, setProducts, profitData }) {
  const [animate, setAnimate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanStatus, setScanStatus] = useState('Aim camera at barcode');

  const [newProduct, setNewProduct] = useState({
    name: '', category: 'Grocery', basePrice: '', inventory: '', optimalInventory: '', timeRemaining: '', totalShelfLife: '', demand: 'Medium'
  });

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSimulateScan = () => {
    setIsScannerOpen(true);
    setScanStatus('Scanning...');
    setTimeout(() => {
      setScanStatus('Match Found! Fetching ERP data...');
      setTimeout(() => {
        setIsScannerOpen(false);
        setNewProduct({
          name: 'Amul Butter (500g)', 
          category: 'Dairy', 
          basePrice: '260', 
          inventory: '20', 
          optimalInventory: '10', 
          timeRemaining: '48', 
          totalShelfLife: '168', 
          demand: 'High'
        });
        setIsModalOpen(true);
        setScanStatus('Aim camera at barcode'); 
      }, 1500);
    }, 2000);
  };

  const { criticalItems, warningItems, optimalItems } = useMemo(() => {
    return {
      criticalItems: products.filter(p => p.timeRemaining <= 48),
      warningItems: products.filter(p => p.timeRemaining > 48 && p.timeRemaining <= 120),
      optimalItems: products.filter(p => p.timeRemaining > 120)
    };
  }, [products]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const categoryEmojis = { Grocery: '🌾', Dairy: '🥛', Bakery: '🍞', Fruits: '🍎', Vegetables: '🥦', Meat: '🥩' };
    const categoryImages = {
      Grocery: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400&q=80',
      Dairy: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
      Bakery: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
      Fruits: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80',
      Vegetables: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&q=80',
      Meat: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&q=80'
    };

    const productToAdd = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      basePrice: parseFloat(newProduct.basePrice),
      inventory: parseInt(newProduct.inventory),
      optimalInventory: parseInt(newProduct.optimalInventory),
      timeRemaining: parseInt(newProduct.timeRemaining),
      totalShelfLife: parseInt(newProduct.totalShelfLife),
      demand: newProduct.demand,
      emoji: categoryEmojis[newProduct.category] || '📦',
      image: categoryImages[newProduct.category] || categoryImages['Grocery'],
      rating: 4.0,
      reviews: 0
    };

    setProducts([...products, productToAdd]);
    setIsModalOpen(false);
    setNewProduct({ name: '', category: 'Grocery', basePrice: '', inventory: '', optimalInventory: '', timeRemaining: '', totalShelfLife: '', demand: 'Medium' });
  };

  const totalDynamic = useMemo(() => profitData.reduce((sum, day) => sum + day.dynamicProfit, 0), [profitData]);
  const totalStatic = useMemo(() => profitData.reduce((sum, day) => sum + day.staticProfit, 0), [profitData]);
  const netLift = Math.round(((totalDynamic - totalStatic) / totalStatic) * 100);

  const InventoryRiskSection = ({ title, items, icon, borderTheme, badgeTheme }) => (
    <div className={`bg-white dark:bg-slate-800 rounded-3xl shadow-lg border-l-4 ${borderTheme} border-y border-r border-gray-100 dark:border-slate-700/50 overflow-hidden mb-8 transition-all hover:shadow-xl`}>
      <div className="p-5 border-b border-gray-100 dark:border-slate-700/50 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
        <h3 className="font-bold text-slate-800 dark:text-white flex items-center text-lg">
          {icon} <span className="ml-3">{title}</span>
        </h3>
        <span className={`px-4 py-1 rounded-full text-sm font-bold ${badgeTheme}`}>
          {items.length} Items
        </span>
      </div>
      
      {items.length === 0 ? (
        <div className="p-8 text-center text-slate-500 dark:text-slate-400 font-medium">
          No inventory in this category.
        </div>
      ) : (
        <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider border-b border-gray-50 dark:border-slate-700/50">
                <th className="px-6 py-4 font-bold">Product</th>
                <th className="px-6 py-4 font-bold">Actual Cost (MRP)</th>
                <th className="px-6 py-4 font-bold">Dynamic Price</th>
                <th className="px-6 py-4 font-bold">Discount Applied</th>
                <th className="px-6 py-4 font-bold">Expiry Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-700/50">
              {items.map(p => {
                const currentPriceStr = p.livePrice ? p.livePrice.toString() : calculateDynamicPrice(p.basePrice, p.timeRemaining, p.totalShelfLife, p.inventory, p.optimalInventory, p.demand);
                const discountPct = Math.round((1 - (parseFloat(currentPriceStr) / p.basePrice)) * 100);
                
                return (
                  <tr key={`merchant-inv-${p.id}`} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 flex items-center font-bold text-slate-800 dark:text-slate-200">
                      <span className="text-2xl mr-3">{p.emoji}</span> {p.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-400 dark:text-slate-500">
                      ₹{p.basePrice}
                    </td>
                    <td className="px-6 py-4 font-black text-blue-600 dark:text-blue-400 text-lg">
                      ₹{currentPriceStr}
                    </td>
                    <td className="px-6 py-4">
                      {discountPct > 0 ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                          <TrendingDown className="w-3 h-3 mr-1" /> {discountPct}% OFF
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 text-sm font-medium">No Discount</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                        {p.timeRemaining}h left
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 w-full transition-colors duration-500 relative">
      <div className={`flex flex-col p-8 max-w-7xl mx-auto w-full transition-all duration-700 transform ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">Merchant Command Center</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Monitor algorithm performance, analyze profit margins, and review high-risk inventory.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleSimulateScan}
              className="flex items-center justify-center bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold py-3 px-6 rounded-xl shadow-sm transition-all active:scale-95 whitespace-nowrap"
            >
              <Scan className="w-5 h-5 mr-2" /> Scan Barcode
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-5 h-5 mr-2" /> Add Manually
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <Widget 
            title="EcoPrice Revenue (7 Months)" 
            value={`₹${(totalDynamic).toLocaleString()}`} 
            icon={<TrendingDown className="w-8 h-8" />} 
            colorClass="text-emerald-500 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30" 
          />
          <Widget 
            title="Static MRP Revenue (7 Months)" 
            value={`₹${(totalStatic).toLocaleString()}`} 
            icon={<Banknote className="w-8 h-8" />} 
            colorClass="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800" 
          />
          <Widget 
            title="Net Revenue Lift" 
            value={`+${netLift}%`} 
            icon={<Activity className="w-8 h-8" />} 
            colorClass="text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30" 
          />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700/50 p-6 sm:p-8 mb-10 transition-colors">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-xl font-bold flex items-center text-slate-800 dark:text-white">
                <Activity className="w-6 h-6 mr-3 text-emerald-500" />
                Algorithm Profitability vs. Static Pricing
              </h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                Visualizing monthly profit margins and the mitigation of expired food losses.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 text-xs font-bold bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div> EcoPrice Profit
              </div>
              <div className="flex items-center text-slate-500 dark:text-slate-400">
                <div className="w-3 h-3 rounded-full bg-slate-400 mr-2"></div> Standard Profit
              </div>
              <div className="flex items-center text-red-500 dark:text-red-400">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div> Waste Loss
              </div>
            </div>
          </div>

          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={profitData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDynamic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorStatic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" strokeOpacity={0.15} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 600}} tickFormatter={(val) => `₹${val/1000}k`} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', color: '#f8fafc', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, '']}
                />
                <Area type="linear" name="Dynamic Profit" dataKey="dynamicProfit" stroke="#10b981" strokeWidth={2} fill="url(#colorDynamic)" activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} />
                <Area type="linear" name="Food Waste Loss (Static)" dataKey="expiredLoss" stroke="#ef4444" strokeWidth={1.5} fill="url(#colorLoss)" activeDot={{ r: 6, fill: '#ef4444', stroke: '#fff', strokeWidth: 2 }} />
                <Area type="linear" name="Static Profit" dataKey="staticProfit" stroke="#64748b" strokeWidth={2} strokeDasharray="6 6" fill="url(#colorStatic)" activeDot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-6 flex items-center tracking-tight">
          <Box className="w-7 h-7 mr-3 text-blue-600 dark:text-blue-400" />
          Live Inventory Analytics
        </h2>

        <InventoryRiskSection 
          title="Critical Expiry (Under 48 Hours)" 
          items={criticalItems} 
          icon={<Flame className="w-6 h-6 text-red-500 animate-pulse" />} 
          borderTheme="border-l-red-500"
          badgeTheme="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
        />

        <InventoryRiskSection 
          title="Warning Stage (48 - 120 Hours)" 
          items={warningItems} 
          icon={<Clock className="w-6 h-6 text-orange-500" />} 
          borderTheme="border-l-orange-500"
          badgeTheme="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
        />

        <InventoryRiskSection 
          title="Optimal Freshness (Over 120 Hours)" 
          items={optimalItems} 
          icon={<CheckCircle className="w-6 h-6 text-emerald-500" />} 
          borderTheme="border-l-emerald-500"
          badgeTheme="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
        />

      </div>

      {isScannerOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="text-center w-full max-w-md p-6">
             <h2 className="text-2xl font-black text-white mb-8 tracking-tight">Scan Inventory Batch</h2>
             
             <div className="relative w-full aspect-square bg-slate-900 rounded-[3rem] border-4 border-slate-800 overflow-hidden shadow-2xl mb-8 flex items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400 shadow-[0_0_20px_#34d399] animate-[bounce_2s_infinite]"></div>
                
                <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-emerald-500 rounded-tl-xl"></div>
                <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-emerald-500 rounded-tr-xl"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-emerald-500 rounded-bl-xl"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-emerald-500 rounded-br-xl"></div>
                
                <Scan className="w-24 h-24 text-slate-700" />
             </div>

             <div className="bg-slate-800 text-white font-bold py-3 px-6 rounded-full inline-block animate-pulse">
                {scanStatus}
             </div>
             
             <button onClick={() => setIsScannerOpen(false)} className="block w-full text-slate-400 hover:text-white font-bold mt-8 transition-colors">
               Cancel Scan
             </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-slate-900/80 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700/50 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/80 shrink-0">
              <h2 className="text-lg font-extrabold text-slate-800 dark:text-white flex items-center">
                <Box className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                Add New Inventory
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 bg-white dark:bg-slate-700 rounded-full shadow-sm">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="flex flex-col overflow-hidden">
              <div className="p-5 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Product Name</label>
                    <input required type="text" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="e.g. Fresh Salmon" />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Category</label>
                    <select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none">
                      <option value="Grocery">Grocery</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Meat">Meat & Seafood</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Base Price (₹)</label>
                    <input required type="number" min="1" value={newProduct.basePrice} onChange={(e) => setNewProduct({...newProduct, basePrice: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="MRP" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Demand Profile</label>
                    <select value={newProduct.demand} onChange={(e) => setNewProduct({...newProduct, demand: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none">
                      <option value="High">High (Discount slower)</option>
                      <option value="Medium">Medium (Standard)</option>
                      <option value="Low">Low (Discount faster)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Current Stock</label>
                    <input required type="number" min="1" value={newProduct.inventory} onChange={(e) => setNewProduct({...newProduct, inventory: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Actual units" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Target Stock Level</label>
                    <input required type="number" min="1" value={newProduct.optimalInventory} onChange={(e) => setNewProduct({...newProduct, optimalInventory: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Ideal threshold" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Hours to Expiry</label>
                    <input required type="number" min="1" value={newProduct.timeRemaining} onChange={(e) => setNewProduct({...newProduct, timeRemaining: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="e.g. 48" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Total Shelf Life (Hours)</label>
                    <input required type="number" min="1" value={newProduct.totalShelfLife} onChange={(e) => setNewProduct({...newProduct, totalShelfLife: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="e.g. 168 (1 week)" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 p-5 border-t border-gray-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md shadow-blue-500/30 transition-all active:scale-95 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" /> Publish to Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 8. MAIN APP EXPORT (WIRING GLOBAL STATE) ---
export default function App() {
  const [authUser, setAuthUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [profitData, setProfitData] = useState(initialProfitData);
  const [lifetimeStats, setLifetimeStats] = useState({ savings: 3420, water: 850, co2: 12.5 });

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // GLOBAL STATE LINKING (Checkout -> Merchant Graph & User Profile)
  const handlePlaceOrder = (cartItems, totalPaid, totalBasePrice) => {
    // 1. Create order for customer profile
    const newOrder = {
        id: `EP-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: cartItems.map(item => item.name).join(', '),
        total: totalPaid.toFixed(2),
        status: 'Processing'
    };
    setOrders(prev => [newOrder, ...prev]);

    // 2. Update Merchant's financial graph
    setProfitData(prev => {
        const newData = [...prev];
        const latestMonthIdx = newData.length - 1;
        newData[latestMonthIdx] = { 
            ...newData[latestMonthIdx],
            dynamicProfit: newData[latestMonthIdx].dynamicProfit + totalPaid,
            staticProfit: newData[latestMonthIdx].staticProfit + totalBasePrice
        };
        return newData;
    });

    // 3. Update lifetime impact stats
    const savings = totalBasePrice - totalPaid;
    setLifetimeStats(prev => ({
        savings: prev.savings + savings,
        water: prev.water + (cartItems.length * 150),
        co2: prev.co2 + (cartItems.length * 0.5)
    }));
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} h-screen w-full overflow-hidden`}>
      <div className="h-full w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-500 font-sans text-slate-900 dark:text-slate-100">
        
        {!authUser ? (
          <AuthScreen onAuth={(user) => setAuthUser(user)} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        ) : authUser.role === 'customer' ? (
          <CustomerStorefront 
            user={authUser} 
            products={products} 
            onLogout={() => setAuthUser(null)} 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme} 
            orders={orders}
            onPlaceOrder={handlePlaceOrder}
            lifetimeStats={lifetimeStats}
          />
        ) : (
          <div className="h-full flex flex-col">
            <div className="bg-white dark:bg-slate-900 px-8 py-4 flex justify-between items-center shadow-md border-b border-slate-200 dark:border-slate-800 z-50 transition-colors duration-500">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-xl border border-blue-200 dark:border-blue-800/50">
                  <Store className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                </div>
                <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">EcoPrice Business</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right mr-2 hidden sm:block">
                  <p className="text-sm font-bold text-slate-800 dark:text-white">{authUser.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">Store Manager</p>
                </div>
                
                <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors shadow-inner">
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <button onClick={() => setAuthUser(null)} className="flex items-center text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                  <LogOut className="w-5 h-5 sm:mr-2" /> <span className="hidden sm:block font-bold">Logout</span>
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <MerchantDashboard products={products} setProducts={setProducts} profitData={profitData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}