import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { 
  LayoutDashboard, Box, ShoppingBag, Settings, LogOut, Search, Bell, Plus, Edit2, 
  Trash2, ChevronLeft, ChevronRight, PackageSearch, TrendingUp, CreditCard, 
  Zap, X, ShieldCheck, Mail, Lock, User, MoreVertical, Clock, Activity, ArrowUpRight, Moon, LineChart as AnalyticsIcon, Cpu, Users, CloudRain, MapPin
} from 'lucide-react';

// --- IMAGE ENGINE AUTOMATION LOOKUP ---
const getHighQualityImage = (name, category) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('milk')) return 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80';
  if (lowerName.includes('butter')) return 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&q=80';
  if (lowerName.includes('bread')) return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80';
  if (lowerName.includes('cheese')) return 'https://images.unsplash.com/photo-1486297678162-ad2a14b34897?w=500&q=80';
  if (lowerName.includes('apple')) return 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80';
  if (lowerName.includes('banana')) return 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&q=80';
  if (lowerName.includes('egg')) return 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=500&q=80';
  if (lowerName.includes('paneer') || lowerName.includes('spinach')) return 'https://images.unsplash.com/photo-1631452180519-c014fe946cea?w=500&q=80';
  if (lowerName.includes('chicken') || lowerName.includes('meat')) return 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&q=80';
  if (lowerName.includes('tomato')) return 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80';
  if (lowerName.includes('yogurt')) return 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=80';
  
  switch(category) {
    case 'Dairy': return 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80';
    case 'Bakery': return 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500&q=80';
    case 'Fruits': return 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&q=80';
    case 'Vegetables': return 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&q=80';
    case 'Meat': return 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&q=80';
    default: return 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80';
  }
};

// --- INITIAL MOCK DATA (15 PRODUCTS) ---
const initialProducts = [
  { id: '#1001', name: 'Amul Taaza Milk (1L)', category: 'Dairy', baseprice: 68, inventory: 150, optimalInventory: 200, timeRemaining: 12, demand: 'High', image: getHighQualityImage('milk', 'Dairy') },
  { id: '#1002', name: 'Britannia Brown Bread', category: 'Bakery', baseprice: 45, inventory: 85, optimalInventory: 150, timeRemaining: 20, demand: 'Medium', image: getHighQualityImage('bread', 'Bakery') },
  { id: '#1003', name: 'Organic Bananas (1kg)', category: 'Fruits', baseprice: 80, inventory: 250, optimalInventory: 300, timeRemaining: 48, demand: 'High', image: getHighQualityImage('banana', 'Fruits') },
  { id: '#1004', name: 'Farm Fresh Eggs (6pk)', category: 'Grocery', baseprice: 60, inventory: 100, optimalInventory: 400, timeRemaining: 120, demand: 'Low', image: getHighQualityImage('egg', 'Grocery') },
  { id: '#1005', name: 'Fresh Spinach Bunch', category: 'Vegetables', baseprice: 35, inventory: 180, optimalInventory: 150, timeRemaining: 24, demand: 'High', image: getHighQualityImage('spinach', 'Vegetables') },
  { id: '#1006', name: 'Aashirvaad Wheat (5kg)', category: 'Grocery', baseprice: 240, inventory: 40, optimalInventory: 100, timeRemaining: 300, demand: 'High', image: getHighQualityImage('wheat', 'Grocery') },
  { id: '#1007', name: 'Premium Paneer (200g)', category: 'Dairy', baseprice: 85, inventory: 30, optimalInventory: 50, timeRemaining: 18, demand: 'Medium', image: getHighQualityImage('paneer', 'Dairy') },
  { id: '#1008', name: 'Chicken Breast (500g)', category: 'Meat', baseprice: 250, inventory: 15, optimalInventory: 40, timeRemaining: 36, demand: 'High', image: getHighQualityImage('chicken', 'Meat') },
  { id: '#1009', name: 'Kashmiri Apples (1kg)', category: 'Fruits', baseprice: 120, inventory: 80, optimalInventory: 120, timeRemaining: 168, demand: 'Medium', image: getHighQualityImage('apple', 'Fruits') },
  { id: '#1010', name: 'Fresh Tomatoes (1kg)', category: 'Vegetables', baseprice: 40, inventory: 100, optimalInventory: 150, timeRemaining: 72, demand: 'High', image: getHighQualityImage('tomato', 'Vegetables') },
  { id: '#1011', name: 'Greek Yogurt (400g)', category: 'Dairy', baseprice: 150, inventory: 40, optimalInventory: 60, timeRemaining: 96, demand: 'Medium', image: getHighQualityImage('yogurt', 'Dairy') },
  { id: '#1012', name: 'Premium Almonds (500g)', category: 'Grocery', baseprice: 450, inventory: 20, optimalInventory: 50, timeRemaining: 720, demand: 'Low', image: getHighQualityImage('almonds', 'Grocery') },
  { id: '#1013', name: 'Basmati Rice (5kg)', category: 'Grocery', baseprice: 350, inventory: 60, optimalInventory: 100, timeRemaining: 720, demand: 'High', image: getHighQualityImage('rice', 'Grocery') },
  { id: '#1014', name: 'Red Onions (1kg)', category: 'Vegetables', baseprice: 30, inventory: 200, optimalInventory: 250, timeRemaining: 168, demand: 'High', image: getHighQualityImage('onions', 'Vegetables') },
  { id: '#1015', name: 'Potatoes (1kg)', category: 'Vegetables', baseprice: 25, inventory: 300, optimalInventory: 350, timeRemaining: 336, demand: 'Medium', image: getHighQualityImage('potatoes', 'Vegetables') },
];

const growthData = [
  { month: 'Jan', revenue: 700, sales: 500 },
  { month: 'Feb', revenue: 850, sales: 650 },
  { month: 'Mar', revenue: 600, sales: 480 },
  { month: 'Apr', revenue: 1000, sales: 800 },
  { month: 'May', revenue: 950, sales: 700 },
  { month: 'Jun', revenue: 1400, sales: 900 },
  { month: 'Jul', revenue: 1100, sales: 1200 },
  { month: 'Aug', revenue: 800, sales: 600 },
  { month: 'Sep', revenue: 1200, sales: 850 },
  { month: 'Oct', revenue: 1050, sales: 1000 },
];

const analyticsData = [
  { month: 'Jan', ecoRevenue: 28000, staticRevenue: 22000 },
  { month: 'Feb', ecoRevenue: 35000, staticRevenue: 26000 },
  { month: 'Mar', ecoRevenue: 32000, staticRevenue: 24000 },
  { month: 'Apr', ecoRevenue: 48000, staticRevenue: 35000 },
  { month: 'May', ecoRevenue: 56000, staticRevenue: 40000 },
  { month: 'Jun', ecoRevenue: 64000, staticRevenue: 45000 },
  { month: 'Jul', ecoRevenue: 82000, staticRevenue: 58000 }
];

const mockOrders = [
  { id: '#5210', name: 'Mahmoud Ali', date: '14/3/2026', amount: 2850.00, status: 'Complete' },
  { id: '#5211', name: 'Mahmoud Ali', date: '14/3/2026', amount: 840.50, status: 'Pending' },
  { id: '#5212', name: 'Rohan Sharma', date: '14/3/2026', amount: 1520.00, status: 'Complete' },
  { id: '#5213', name: 'Jessica Sameh', date: '14/3/2026', amount: 450.00, status: 'Pending' },
  { id: '#5214', name: 'Priya Jenkins', date: '13/3/2026', amount: 3250.00, status: 'Complete' },
];

// --- PRICING ALGORITHM ---
const calculateDynamicPrice = (baseprice, T, settings) => {
    const price = Number(baseprice) || 0;
    const timeRatio = Math.min(1, Math.max(0, T / 168)); 
    const timeDiscount = Math.pow(1 - timeRatio, settings ? settings.decayAlpha : 2.5);
    
    let demandFactor = settings ? settings.demandFactor : 1.0;
    let weatherModifier = settings ? settings.weatherModifier : 1.0;
    let locationSurge = settings ? settings.locationSurge : 1.0;

    let totalDiscount = timeDiscount * (1 / demandFactor) * (1 / weatherModifier) * (1 / locationSurge);
    totalDiscount = Math.min(0.90, Math.max(0, totalDiscount));
    return (price * (1 - totalDiscount)).toFixed(0);
};

// --- AUTHENTICATION SCREEN ---
const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@ecomart.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ name: 'Majed Sh.', email });
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Cool Modern Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[150%] bg-amber-500/10 rotate-12 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[150%] bg-indigo-500/10 -rotate-12 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <span className="font-black text-3xl tracking-tighter text-white">EcoMart</span>
            <span className="bg-amber-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest">Admin</span>
          </div>
        </div>
        <p className="text-center text-slate-300 text-sm mb-8">Sign in to your merchant dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-slate-950/50 border border-slate-700 text-white pl-12 pr-4 py-3.5 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-sm" 
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-slate-950/50 border border-slate-700 text-white pl-12 pr-4 py-3.5 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-sm" 
              />
            </div>
          </div>
          <button type="submit" className="w-full text-slate-900 font-black py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 transition-all active:scale-95 shadow-lg shadow-amber-500/20 flex justify-center items-center gap-2 mt-2">
            <ShieldCheck size={18} /> Secure Login
          </button>
        </form>
      </div>
    </div>
  );
};


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(initialProducts);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'Grocery', baseprice: '', inventory: '', optimalInventory: '', timeRemaining: '48', demand: 'Medium'
  });

  // --- ALGORITHM CONTROLLER STATE ---
  const [algoSettings, setAlgoSettings] = useState({
    decayAlpha: 2.5,
    weatherModifier: 1.0,
    demandFactor: 1.0,
    locationSurge: 1.0
  });
  
  // Draft settings for UI tweaking before applying
  const [draftAlgoSettings, setDraftAlgoSettings] = useState({
    decayAlpha: 2.5,
    weatherModifier: 1.0,
    demandFactor: 1.0,
    locationSurge: 1.0
  });
  
  const [toastMsg, setToastMsg] = useState('');

  const handleApplyAlgorithm = () => {
    setAlgoSettings(draftAlgoSettings);
    setToastMsg('Algorithm parameters applied successfully! Live prices adjusted.');
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setActiveMenu('Overview');
    setSearchQuery('');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (activeMenu !== 'Inventory' && e.target.value !== '') {
      setActiveMenu('Inventory');
    }
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    const generatedImg = getHighQualityImage(newProduct.name, newProduct.category);
    const addedItem = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      name: newProduct.name,
      category: newProduct.category,
      baseprice: parseFloat(newProduct.baseprice) || 100,
      inventory: parseInt(newProduct.inventory) || 50,
      optimalInventory: parseInt(newProduct.optimalInventory) || 100,
      timeRemaining: parseInt(newProduct.timeRemaining) || 48,
      demand: newProduct.demand,
      image: generatedImg
    };
    setProducts([addedItem, ...products]);
    setIsModalOpen(false);
    setNewProduct({ name: '', category: 'Grocery', baseprice: '', inventory: '', optimalInventory: '', timeRemaining: '48', demand: 'Medium' });
  };

  // --- DERIVED METRICS ---
  const analyticsTotals = useMemo(() => {
    let eco = 0, stat = 0;
    analyticsData.forEach(d => { eco += d.ecoRevenue; stat += d.staticRevenue; });
    return { eco, stat, lift: (((eco - stat) / stat) * 100).toFixed(1) };
  }, []);

  const { totalRevenue, profitLift, preventedLoss, optimalCount, warningCount, criticalCount } = useMemo(() => {
    let dynRev = 0, statRev = 0, loss = 0, opt = 0, warn = 0, crit = 0;
    products.forEach(p => {
      const dynPrice = Number(calculateDynamicPrice(p.baseprice, p.timeRemaining, algoSettings));
      dynRev += (dynPrice * p.inventory);
      statRev += (p.baseprice * p.inventory);
      
      if (p.timeRemaining <= 48) loss += (dynPrice * p.inventory * 0.4); 
      
      if (p.timeRemaining > 48) opt += 1;
      else if (p.timeRemaining > 24) warn += 1;
      else crit += 1;
    });

    const lift = statRev > 0 ? (((dynRev + loss) / statRev) * 100) - 100 : 0; 

    return { 
      totalRevenue: dynRev, 
      profitLift: Math.max(12.4, lift).toFixed(1), 
      preventedLoss: loss,
      optimalCount: opt,
      warningCount: warn,
      criticalCount: crit
    };
  }, [products, algoSettings]);

  const donutData = [
    { name: 'Optimal', value: optimalCount, color: '#10b981' }, // Green
    { name: 'Warning', value: warningCount, color: '#3b82f6' }, // Blue
    { name: 'Critical', value: criticalCount, color: '#f59e0b' }, // Orange
  ];

  // --- UI COMPONENTS ---
  const SidebarItem = ({ name, icon: Icon }) => {
    const isActive = activeMenu === name;
    return (
      <button 
        onClick={() => { setActiveMenu(name); setSearchQuery(''); }}
        className={`w-full flex items-center gap-4 px-6 py-3.5 transition-all relative ${
          isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600'
        }`}
      >
        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r-md"></div>}
        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-emerald-600' : 'text-slate-400'} />
        <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>{name}</span>
      </button>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-100 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-slate-500 text-xs font-bold">${payload[1]?.value.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span className="text-indigo-600 text-xs font-bold">${payload[0]?.value.toFixed(2)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  if (!isAuthenticated) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans text-slate-800 overflow-hidden">
      {/* === LIGHT SIDEBAR WITH GREEN ACCENTS === */}
      <aside className="w-[240px] bg-white border-r border-slate-200 flex flex-col shrink-0 z-20 shadow-sm">
        <div className="h-20 flex items-center px-6 mb-4 gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-sm">
            <Box size={18} />
          </div>
          <span className="font-black text-2xl tracking-tighter text-slate-900">EcoMart</span>
        </div>
        
        <nav className="flex-1 flex flex-col space-y-1 w-full">
          <SidebarItem name="Overview" icon={LayoutDashboard} />
          <SidebarItem name="Inventory" icon={Box} />
          <SidebarItem name="Algorithm" icon={Cpu} />
          <SidebarItem name="Orders" icon={ShoppingBag} />
          <SidebarItem name="Analytics" icon={AnalyticsIcon} />
        </nav>

        <div className="mt-auto pb-6 w-full flex flex-col space-y-1">
          <SidebarItem name="Setting" icon={Settings} />
          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-3.5 text-slate-500 font-medium hover:text-rose-600 hover:bg-rose-50 transition-all mt-2">
            <LogOut size={18} /> <span className="text-sm">Log Out</span>
          </button>
        </div>
      </aside>

      {/* === MAIN CONTENT === */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* HEADER */}
        <header className="h-[88px] bg-[#F3F4F6] px-8 flex items-center justify-between shrink-0 z-10 sticky top-0">
          <h1 className="text-xl font-medium text-slate-700 tracking-tight">Welcome, <span className="font-bold">{user?.name.split(' ')[0]}</span></h1>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
              <input 
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search EcoMart" 
                className="bg-white border border-transparent shadow-sm pl-11 pr-4 py-2.5 rounded-full text-sm outline-none focus:ring-2 focus:ring-amber-500 transition-all w-80 font-medium placeholder:text-slate-400"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-slate-600 transition-colors"><Moon size={20}/></button>
              <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
                <Bell size={20}/>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F3F4F6]"></span>
              </button>
            </div>
            
            <div className="flex items-center gap-3 cursor-pointer pl-4 border-l border-slate-300">
              <img src="https://ui-avatars.com/api/?name=Majed+Sh&background=f59e0b&color=fff&rounded=true" alt="Admin" className="w-10 h-10 rounded-full shadow-sm" />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-bold text-slate-800 leading-none">{user?.name} <ChevronRight size={14} className="inline rotate-90 text-slate-400"/></span>
                <span className="text-xs text-slate-500 font-medium mt-1">Business owner</span>
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          
          {/* === DASHBOARD / OVERVIEW VIEW === */}
          {activeMenu === 'Overview' && (
            <div className="animate-in fade-in duration-300">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* LEFT COLUMN (Cards, Graph, Table) */}
                <div className="xl:col-span-2 flex flex-col gap-6">
                  
                  {/* TOP 3 SUMMARY CARDS */}
                  <div className="grid grid-cols-3 gap-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex flex-col items-center text-center px-4 border-r border-slate-100">
                      <p className="text-slate-500 text-xs font-semibold mb-3">Total Revenue</p>
                      <div className="flex items-center gap-4 w-full justify-center">
                        <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-500"><Activity size={20}/></div>
                        <div className="text-left">
                          <h3 className="text-[22px] font-black text-slate-800 leading-tight">₹{analyticsTotals.eco.toLocaleString()}</h3>
                          <p className="text-[10px] text-slate-400 font-medium mt-1 flex items-center"><span className="text-emerald-500 mr-1">+18%</span> vs Static</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center text-center px-4 border-r border-slate-100">
                      <p className="text-slate-500 text-xs font-semibold mb-3">Profit Lift</p>
                      <div className="flex items-center gap-4 w-full justify-center">
                        <div className="bg-indigo-100 p-2.5 rounded-xl text-indigo-500"><TrendingUp size={20}/></div>
                        <div className="text-left">
                          <h3 className="text-[22px] font-black text-slate-800 leading-tight">+{analyticsTotals.lift}%</h3>
                          <p className="text-[10px] text-slate-400 font-medium mt-1 flex items-center"><span className="text-indigo-500 mr-1">+12%</span> Last week</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center px-4">
                      <p className="text-slate-500 text-xs font-semibold mb-3">Static Loss Prevented</p>
                      <div className="flex items-center gap-4 w-full justify-center">
                        <div className="bg-amber-100 p-2.5 rounded-xl text-amber-500"><Zap size={20}/></div>
                        <div className="text-left">
                          <h3 className="text-[22px] font-black text-slate-800 leading-tight">₹{preventedLoss.toLocaleString(undefined,{maximumFractionDigits:0})}</h3>
                          <p className="text-[10px] text-slate-400 font-medium mt-1 flex items-center"><span className="text-amber-500 mr-1">+18%</span> Last week</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* GROWTH GRAPH */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold text-slate-800">Status of EcoMart growth</h2>
                      <div className="flex items-center gap-4 text-xs font-bold">
                        <span className="flex items-center text-indigo-500"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mr-2"></span>Revenue</span>
                        <span className="flex items-center text-amber-500"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-2"></span>Sales</span>
                        <MoreVertical size={16} className="text-slate-400 cursor-pointer ml-2"/>
                      </div>
                    </div>
                    <div className="h-[260px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={growthData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} tickFormatter={(v)=>`$${v/1000}k`} />
                          <Tooltip content={<CustomTooltip />} cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '5 5'}} />
                          <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#colorRev)" activeDot={{r:5, fill:'#6366f1', stroke:'#fff', strokeWidth:2}} />
                          <Area type="monotone" dataKey="sales" stroke="#f59e0b" strokeWidth={2} fill="url(#colorSales)" activeDot={{r:5, fill:'#f59e0b', stroke:'#fff', strokeWidth:2}} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between mt-2 px-8 text-[10px] text-slate-400 font-medium">
                      <span>Lab</span><span>Lab</span><span>Lab</span><span>Lab</span><span>Lab</span><span>Lab</span><span>Lab</span><span>Lab</span><span>Lab</span><span>Lab</span><span>Lab</span>
                    </div>
                  </div>

                  {/* CRITICAL PRIORITY TABLE */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
                    <div className="p-6 pb-4 flex justify-between items-center">
                      <h2 className="text-lg font-bold text-slate-800">Critical Priority Inventory</h2>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                          <input placeholder="Search" className="border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-amber-500 w-40"/>
                        </div>
                        <button className="border border-slate-200 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50"><Box size={14}/> Filters</button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead>
                          <tr className="border-b border-slate-100">
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500">ID</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500">Name</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500">Time Left</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500">Tracking</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {products.filter(p => p.timeRemaining <= 48).slice(0,4).map(p => (
                            <tr key={p.id} className="hover:bg-slate-50/50">
                              <td className="px-6 py-3.5 text-slate-400 text-xs font-medium">{p.id}</td>
                              <td className="px-6 py-3.5 flex items-center gap-3 font-semibold text-slate-700 text-xs">
                                <img src={p.image} className="w-6 h-6 rounded-full object-cover"/> {p.name}
                              </td>
                              <td className="px-6 py-3.5 text-slate-500 text-xs">{p.timeRemaining} Hours</td>
                              <td className="px-6 py-3.5">
                                <span className={`px-2.5 py-1 rounded bg-${p.timeRemaining<=24?'red':'amber'}-50 text-${p.timeRemaining<=24?'red':'amber'}-500 text-[10px] font-bold`}>
                                  {p.timeRemaining<=24 ? 'Critical' : 'Warning'}
                                </span>
                              </td>
                              <td className="px-6 py-3.5 font-bold text-slate-700 text-xs">₹{calculateDynamicPrice(p.baseprice, p.timeRemaining, algoSettings)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-2">Showing <select className="border border-slate-200 rounded p-1 outline-none"><option>5</option></select> of 16</div>
                      <div className="flex gap-1">
                        <button className="p-1 hover:bg-slate-100 rounded text-slate-400"><ChevronLeft size={14}/></button>
                        <button className="w-6 h-6 rounded bg-amber-500 text-white font-bold flex items-center justify-center">1</button>
                        <button className="w-6 h-6 rounded hover:bg-slate-100 flex items-center justify-center">2</button>
                        <button className="w-6 h-6 rounded hover:bg-slate-100 flex items-center justify-center">3</button>
                        <button className="w-6 h-6 rounded hover:bg-slate-100 flex items-center justify-center">4</button>
                        <button className="p-1 hover:bg-slate-100 rounded text-slate-400"><ChevronRight size={14}/></button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN (Pie Chart & Added space) */}
                <div className="xl:col-span-1 flex flex-col gap-6">
                  
                  {/* INVENTORY HEALTH PIE CHART */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-[450px]">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-lg font-bold text-slate-800">Inventory Health</h2>
                      <select className="border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 px-2 py-1 outline-none bg-slate-50">
                        <option>Monthly</option>
                      </select>
                    </div>

                    <div className="flex-1 relative mt-4 min-h-[220px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={donutData} innerRadius={70} outerRadius={95} paddingAngle={3} dataKey="value" stroke="none">
                            {donutData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-slate-800 leading-none">{products.length}</span>
                        <span className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Items</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-6 px-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-emerald-500 mr-3"></span> Optimal (&gt;48h)</div>
                        <span className="font-bold text-slate-800">{optimalCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-3"></span> Warning (24-48h)</div>
                        <span className="font-bold text-slate-800">{warningCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-amber-500 mr-3"></span> Critical (&lt;24h)</div>
                        <span className="font-bold text-slate-800">{criticalCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* QUICK STATS / FILLER to match layout height */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex-1">
                     <h2 className="text-lg font-bold text-slate-800 mb-4">Trending Products</h2>
                     <p className="text-xs text-slate-400 mb-4">Total 9.5k Items</p>
                     <div className="space-y-4">
                        {products.slice(0,3).map(p => (
                          <div key={p.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img src={p.image} className="w-10 h-10 rounded-md object-cover"/>
                              <div>
                                <h4 className="text-xs font-bold text-slate-700">{p.name}</h4>
                                <p className="text-[10px] text-amber-500 font-bold mt-0.5 flex items-center">★ 4.5 <span className="text-slate-400 font-normal ml-1">(120 sales)</span></p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-slate-800">₹{p.baseprice}</span>
                          </div>
                        ))}
                     </div>
                     <button className="w-full text-center text-amber-500 text-xs font-bold mt-6 hover:underline">See all</button>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* === INVENTORY VIEW === */}
          {activeMenu === 'Inventory' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                  <div>
                    <h2 className="font-bold text-slate-800 text-lg">Product Database</h2>
                    <p className="text-xs text-slate-400 mt-1 font-medium">Manage pricing, stock, and shelf-life metrics</p>
                  </div>
                  <button onClick={() => setIsModalOpen(true)} className="bg-amber-500 hover:bg-amber-600 text-slate-900 text-sm font-bold px-4 py-2 rounded-lg flex items-center transition-all shadow-sm">
                    <Plus size={16} className="mr-2"/> Add Product
                  </button>
                </div>
                
                <div className="overflow-x-auto min-h-[400px]">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr className="text-slate-500 text-xs font-semibold">
                        <th className="px-6 py-4">Product Details</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4 text-center">Stock</th>
                        <th className="px-6 py-4">Base Price</th>
                        <th className="px-6 py-4">Live Price</th>
                        <th className="px-6 py-4">Health</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                        <tr><td colSpan={6} className="text-center py-16 text-slate-400 font-medium">No items found matching your search.</td></tr>
                      ) : (
                        products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).map(p => {
                          const dynPrice = calculateDynamicPrice(p.baseprice, p.timeRemaining, algoSettings);
                          const isCrit = p.timeRemaining <= 24;
                          return (
                            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-4 font-semibold text-slate-700 flex items-center text-xs">
                                <img src={p.image} className="w-8 h-8 rounded-full object-cover mr-4 border border-slate-200" alt={p.name}/>
                                {p.name}
                              </td>
                              <td className="px-6 py-4 text-slate-500 font-medium text-xs">{p.category}</td>
                              <td className="px-6 py-4 text-center font-bold text-slate-600 text-xs">{p.inventory}</td>
                              <td className="px-6 py-4 text-slate-400 font-medium line-through text-xs">₹{p.baseprice}</td>
                              <td className="px-6 py-4 font-black text-indigo-600 text-sm">₹{dynPrice}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${isCrit ? 'bg-red-50 text-red-500' : p.timeRemaining<=48 ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                  {isCrit ? 'Critical' : 'Optimal'}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* === ORDERS VIEW === */}
          {activeMenu === 'Orders' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                    <h2 className="font-bold text-slate-800 text-lg">Order Ledger</h2>
                </div>
                <div className="overflow-x-auto min-h-[400px]">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr className="text-slate-500 text-xs font-semibold">
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Tracking</th>
                        <th className="px-6 py-4">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {mockOrders.map(o => (
                        <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-400 text-xs">{o.id}</td>
                          <td className="px-6 py-4 font-semibold text-slate-700 flex items-center text-xs">
                             <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 font-bold">{o.name.charAt(0)}</div>
                             {o.name}
                          </td>
                          <td className="px-6 py-4 text-slate-500 font-medium text-xs">{o.date}</td>
                          <td className="px-6 py-4">
                             <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${o.status==='Complete'?'bg-emerald-50 text-emerald-500':'bg-amber-50 text-amber-500'}`}>{o.status}</span>
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-600 text-xs">₹{o.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* === ALGORITHM CONFIGURATOR VIEW === */}
          {activeMenu === 'Algorithm' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <Cpu className="text-emerald-600 w-8 h-8 flex-shrink-0" />
                  <div>
                    <h3 className="text-emerald-900 font-bold text-lg">Dynamic Price Engine</h3>
                    <p className="text-emerald-700 text-sm mt-1 max-w-3xl">
                      Adjust the physical world modifiers below. The engine calculates the base exponential decay of an item's shelf life, and then applies these weights to determine the final live price on the customer storefront.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleApplyAlgorithm}
                  className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
                >
                  <Zap size={18} /> Apply Changes
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Panel 1: Decay Curve */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="text-indigo-500 w-6 h-6" />
                    <h3 className="font-bold text-slate-800 text-lg">Shelf-Life Decay Curve</h3>
                  </div>
                  <p className="text-sm text-slate-500 mb-6">Determines how aggressively prices drop as items approach expiration. (Alpha Value)</p>
                  
                  <div className="mb-8">
                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                      <span>Linear (Slow)</span>
                      <span className="text-indigo-600 text-sm">{draftAlgoSettings.decayAlpha}x</span>
                      <span>Exponential (Fast)</span>
                    </div>
                    <input 
                      type="range" min="1" max="5" step="0.5" 
                      value={draftAlgoSettings.decayAlpha}
                      onChange={(e) => setDraftAlgoSettings({...draftAlgoSettings, decayAlpha: parseFloat(e.target.value)})}
                      className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Panel 2: Demand Multiplier */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="text-cyan-500 w-6 h-6" />
                    <h3 className="font-bold text-slate-800 text-lg">Market Demand Sensitivity</h3>
                  </div>
                  <p className="text-sm text-slate-500 mb-6">Adjust the general consumer buying intent for your store's category today.</p>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <button 
                      onClick={() => setDraftAlgoSettings({...draftAlgoSettings, demandFactor: 0.8})}
                      className={`p-3 rounded-xl border font-bold text-sm transition-all ${draftAlgoSettings.demandFactor === 0.8 ? 'bg-cyan-50 border-cyan-500 text-cyan-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                    >
                      Low
                    </button>
                    <button 
                      onClick={() => setDraftAlgoSettings({...draftAlgoSettings, demandFactor: 1.0})}
                      className={`p-3 rounded-xl border font-bold text-sm transition-all ${draftAlgoSettings.demandFactor === 1.0 ? 'bg-cyan-50 border-cyan-500 text-cyan-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                    >
                      Normal
                    </button>
                    <button 
                      onClick={() => setDraftAlgoSettings({...draftAlgoSettings, demandFactor: 1.2})}
                      className={`p-3 rounded-xl border font-bold text-sm transition-all ${draftAlgoSettings.demandFactor === 1.2 ? 'bg-cyan-50 border-cyan-500 text-cyan-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                    >
                      High
                    </button>
                  </div>
                </div>

                {/* Panel 3: Weather */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <CloudRain className="text-sky-500 w-6 h-6" />
                    <h3 className="font-bold text-slate-800 text-lg">Weather Modifiers</h3>
                  </div>
                  <p className="text-sm text-slate-500 mb-6">Weather impacts foot traffic. Bad weather means deeper algorithmic discounts to clear shelves.</p>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <button 
                      onClick={() => setDraftAlgoSettings({...draftAlgoSettings, weatherModifier: 1.0})}
                      className={`p-3 rounded-xl border font-bold text-sm transition-all ${draftAlgoSettings.weatherModifier === 1.0 ? 'bg-sky-50 border-sky-500 text-sky-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                    >
                      Sunny
                    </button>
                    <button 
                      onClick={() => setDraftAlgoSettings({...draftAlgoSettings, weatherModifier: 0.85})}
                      className={`p-3 rounded-xl border font-bold text-sm transition-all ${draftAlgoSettings.weatherModifier === 0.85 ? 'bg-sky-50 border-sky-500 text-sky-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                    >
                      Heavy Rain
                    </button>
                    <button 
                      onClick={() => setDraftAlgoSettings({...draftAlgoSettings, weatherModifier: 1.15})}
                      className={`p-3 rounded-xl border font-bold text-sm transition-all ${draftAlgoSettings.weatherModifier === 1.15 ? 'bg-amber-50 border-amber-500 text-amber-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                    >
                      Heatwave
                    </button>
                  </div>
                </div>

                {/* Panel 4: Location Surge */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="text-rose-500 w-6 h-6" />
                    <h3 className="font-bold text-slate-800 text-lg">Geographic Surge</h3>
                  </div>
                  <p className="text-sm text-slate-500 mb-6">Is your store in a premium zone or high-footfall area? Adjust the base floor price.</p>
                  
                  <div className="mb-8">
                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                      <span>Discounted Zone</span>
                      <span className="text-rose-600 text-sm">{draftAlgoSettings.locationSurge}x</span>
                      <span>Premium Surge</span>
                    </div>
                    <input 
                      type="range" min="0.8" max="1.5" step="0.1" 
                      value={draftAlgoSettings.locationSurge}
                      onChange={(e) => setDraftAlgoSettings({...draftAlgoSettings, locationSurge: parseFloat(e.target.value)})}
                      className="w-full accent-rose-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* === ANALYTICS VIEW === */}
          {activeMenu === 'Analytics' && (
            <div className="animate-in fade-in duration-300 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-black text-slate-800">Performance Analytics</h2>
                  <p className="text-sm text-slate-500 mt-1">Track how the Dynamic Pricing Engine improves your revenue.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-1">Static MRP Revenue</p>
                  <h3 className="text-3xl font-black text-slate-700">₹{analyticsTotals.stat.toLocaleString()}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 bg-emerald-50/30 flex flex-col justify-center">
                  <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-1 flex items-center"><Zap size={14} className="mr-1"/> EcoPrice Revenue</p>
                  <h3 className="text-3xl font-black text-emerald-700">₹{analyticsTotals.eco.toLocaleString()}</h3>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-sm text-white flex flex-col justify-center">
                  <p className="text-sm font-bold text-indigo-100 uppercase tracking-widest mb-1">Total Profit Lift</p>
                  <h3 className="text-3xl font-black flex items-center"><TrendingUp className="mr-2" size={28}/> +{analyticsTotals.lift}%</h3>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-bold text-slate-800">Algorithm Impact vs Static Pricing Over Time</h3>
                  <div className="flex items-center gap-4 text-xs font-bold bg-slate-50 px-4 py-2 rounded-lg">
                    <span className="flex items-center text-emerald-600"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2"></span>EcoPrice Applied</span>
                    <span className="flex items-center text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-slate-400 mr-2 border border-slate-400 border-dashed"></span>Before (Static)</span>
                  </div>
                </div>
                
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorEco" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorStat" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} tickFormatter={(v)=>`₹${v/1000}k`} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} 
                        itemStyle={{ color: '#334155' }}
                        formatter={(value) => `₹${value.toLocaleString()}`}
                      />
                      <Area type="monotone" name="EcoPrice Revenue" dataKey="ecoRevenue" stroke="#10b981" strokeWidth={3} fill="url(#colorEco)" activeDot={{r:6, fill:'#10b981', stroke:'#fff', strokeWidth:2}} />
                      <Area type="monotone" name="Static Revenue" dataKey="staticRevenue" stroke="#94a3b8" strokeWidth={3} fill="url(#colorStat)" activeDot={{r:6, fill:'#94a3b8', stroke:'#fff', strokeWidth:2}} strokeDasharray="5 5" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

        </div>
        
        {/* TOAST NOTIFICATION */}
        {toastMsg && (
          <div className="absolute bottom-8 right-8 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 z-50">
            <ShieldCheck size={20} />
            <span className="font-bold text-sm">{toastMsg}</span>
          </div>
        )}
      </main>

      {/* === ADD PRODUCT MODAL === */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-lg p-8 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Add New Product</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleAddProductSubmit} className="space-y-5">
              <div>
                <label className="font-semibold text-slate-500 text-xs block mb-1.5">Product Name</label>
                <input required placeholder="e.g. Organic Almond Milk" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-white border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-1 focus:ring-amber-500 font-medium text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="font-semibold text-slate-500 text-xs block mb-1.5">Category</label>
                  <select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-white border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-1 focus:ring-amber-500 font-medium text-sm">
                    <option>Dairy</option><option>Bakery</option><option>Fruits</option><option>Vegetables</option><option>Meat</option><option>Grocery</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-500 text-xs block mb-1.5">Base Price (₹)</label>
                  <input required type="number" min="1" placeholder="e.g. 150" value={newProduct.baseprice} onChange={(e) => setNewProduct({...newProduct, baseprice: e.target.value})} className="w-full bg-white border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-1 focus:ring-amber-500 font-medium text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="font-semibold text-slate-500 text-xs block mb-1.5">Current Stock</label>
                  <input required type="number" min="1" placeholder="e.g. 50" value={newProduct.inventory} onChange={(e) => setNewProduct({...newProduct, inventory: e.target.value})} className="w-full bg-white border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-1 focus:ring-amber-500 font-medium text-sm" />
                </div>
                <div>
                  <label className="font-semibold text-slate-500 text-xs block mb-1.5">Optimal Stock</label>
                  <input required type="number" min="1" placeholder="e.g. 100" value={newProduct.optimalInventory} onChange={(e) => setNewProduct({...newProduct, optimalInventory: e.target.value})} className="w-full bg-white border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-1 focus:ring-amber-500 font-medium text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="font-semibold text-slate-500 text-xs block mb-1.5">Hrs to Expiry</label>
                  <input required type="number" min="1" placeholder="e.g. 48" value={newProduct.timeRemaining} onChange={(e) => setNewProduct({...newProduct, timeRemaining: e.target.value})} className="w-full bg-white border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-1 focus:ring-amber-500 font-medium text-sm" />
                </div>
                <div>
                  <label className="font-semibold text-slate-500 text-xs block mb-1.5">Demand Curve</label>
                  <select value={newProduct.demand} onChange={(e) => setNewProduct({...newProduct, demand: e.target.value})} className="w-full bg-white border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-1 focus:ring-amber-500 font-medium text-sm">
                    <option value="High">High Demand</option><option value="Medium">Medium Demand</option><option value="Low">Low Demand</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 mt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors text-sm">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg shadow-sm transition-all active:scale-95 text-sm">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}