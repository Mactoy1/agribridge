import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  Layers, 
  TrendingUp, 
  Truck, 
  Cpu, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  User as UserIcon, 
  ChevronDown, 
  Activity,
  ArrowRight,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardsOpen, setDashboardsOpen] = useState(false);

  const { 
    cart, 
    wishlist, 
    compareItems,
    setIsCartOpen, 
    setIsAuthModalOpen, 
    setIsCompareOpen,
    user, 
    logoutUser 
  } = useApp();

  const totalCartCount = cart.reduce((sum, i) => sum + 1, 0);

  const navLinks = [
    { name: 'Marketplace', path: '/marketplace', icon: Layers },
    { name: 'For Farmers', path: '/farmers', icon: Sprout },
    { name: 'For Buyers', path: '/buyers', icon: ShieldCheck },
    { name: 'Logistics', path: '/logistics', icon: Truck },
    { name: 'AI Insights', path: '/ai-insights', icon: Cpu },
    { name: 'About', path: '/about', icon: Activity },
  ];

  const dashboardLinks = [
    { name: 'Farmer Hub', path: '/dashboard/farmer', desc: 'Earnings, harvest listings & AI crop demand' },
    { name: 'Buyer Portal', path: '/dashboard/buyer', desc: 'Procurement orders, suppliers & savings' },
    { name: 'Logistics Control', path: '/dashboard/logistics', desc: 'Live fleet telemetry & cold chain routes' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8FAF5]/90 backdrop-blur-md border-b border-[#16A34A]/10 transition-all">
      {/* Top micro bar with environmental & network status */}
      <div className="bg-[#0B1F16] text-[#FEFCE8] text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between border-b border-[#16A34A]/20">
        <div className="flex items-center space-x-3 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="flex items-center space-x-1.5 text-[#22C55E] font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
            </span>
            <span>Supply Network Online</span>
          </span>
          <span className="hidden md:inline text-white/30">•</span>
          <span className="hidden md:inline text-white/70">
            Direct farmer settlements active across 18 FPO clusters
          </span>
        </div>

        <div className="flex items-center space-x-4 text-xs font-medium text-white/80">
          <span className="hidden sm:inline text-[#FACC15] flex items-center gap-1">
            🌱 180K kg food waste avoided
          </span>
          <span className="text-[#22C55E]/90 hidden lg:inline">
            Zero Middleman Markups
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link 
            to="/" 
            id="brand-logo-link"
            className="flex items-center space-x-3 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#14532D] via-[#16A34A] to-[#22C55E] flex items-center justify-center shadow-md shadow-[#16A34A]/20 group-hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <Sprout className="w-6 h-6 text-[#FEFCE8]" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FACC15] rounded-full border-2 border-[#14532D]" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-[#14532D]">
                  Agri<span className="text-[#16A34A]">Bridge</span>
                </span>
                <span className="bg-[#22C55E]/15 text-[#14532D] border border-[#22C55E]/30 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full">
                  AI
                </span>
              </div>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-[#8B5E34]">
                Direct Farm Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-[#16A34A]/15 text-[#14532D] shadow-xs'
                      : 'text-[#14532D]/80 hover:text-[#14532D] hover:bg-[#16A34A]/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#16A34A]' : 'text-slate-500'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* Dashboards Dropdown */}
            <div className="relative group">
              <button
                id="dashboards-dropdown-btn"
                onClick={() => setDashboardsOpen(!dashboardsOpen)}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-[#14532D]/80 hover:text-[#14532D] hover:bg-[#16A34A]/10 transition-all"
              >
                <TrendingUp className="w-4 h-4 text-slate-500" />
                <span>Portals</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#16A34A]/15 py-2 hidden group-hover:block transition-all z-50">
                <div className="px-3 py-2 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Interactive Dashboards
                </div>
                {dashboardLinks.map((dash) => (
                  <Link
                    key={dash.name}
                    to={dash.path}
                    id={`dropdown-link-${dash.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block px-3.5 py-2.5 hover:bg-[#F8FAF5] transition-colors rounded-xl mx-1"
                  >
                    <div className="text-sm font-bold text-[#14532D] flex items-center justify-between">
                      <span>{dash.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#16A34A] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{dash.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Compare produce button */}
            {compareItems.length > 0 && (
              <button
                id="compare-trigger-btn"
                onClick={() => setIsCompareOpen(true)}
                className="relative p-2.5 rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60 transition-all"
                title="Compare Produce"
              >
                <Scale className="w-5 h-5 text-amber-700" />
                <span className="absolute -top-1.5 -right-1.5 bg-[#8B5E34] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {compareItems.length}
                </span>
              </button>
            )}

            {/* Wishlist Button */}
            <Link
              to="/marketplace"
              id="wishlist-trigger-btn"
              className="relative p-2.5 rounded-xl bg-[#16A34A]/10 text-[#14532D] hover:bg-[#16A34A]/20 transition-all"
              title="Saved Items"
            >
              <Heart className="w-5 h-5 text-[#16A34A]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#14532D] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              id="cart-trigger-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#16A34A]/10 text-[#14532D] hover:bg-[#16A34A]/20 transition-all flex items-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5 text-[#16A34A]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#22C55E] text-[#0B1F16] text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Auth / Profile */}
            {user ? (
              <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-2xl border border-[#16A34A]/20 shadow-xs">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-xl object-cover border border-[#16A34A]/30"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-[#14532D] max-w-[110px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] font-semibold text-[#16A34A]">
                    {user.role}
                  </span>
                </div>
                <button
                  id="user-logout-btn"
                  onClick={logoutUser}
                  className="text-xs text-gray-400 hover:text-red-500 font-semibold ml-1 p-1"
                  title="Sign Out"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  id="nav-login-btn"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 text-sm font-bold text-[#14532D] hover:text-[#16A34A] transition-colors"
                >
                  Login
                </button>
                <button
                  id="nav-get-started-btn"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-5 py-2.5 text-sm font-bold text-[#FEFCE8] bg-gradient-to-r from-[#14532D] via-[#16A34A] to-[#14532D] hover:shadow-lg hover:shadow-[#16A34A]/25 rounded-2xl transition-all duration-300 active:scale-95"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu trigger */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              id="mobile-cart-trigger-btn"
              onClick={() => setIsCartOpen(true)}
              className="p-2 rounded-xl bg-[#16A34A]/10 text-[#14532D] relative"
            >
              <ShoppingBag className="w-5 h-5 text-[#16A34A]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#22C55E] text-[#0B1F16] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white border border-[#16A34A]/20 text-[#14532D]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8FAF5] border-b border-[#16A34A]/20 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#16A34A]/10">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  id={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 p-3 rounded-xl text-sm font-bold ${
                    isActive(link.path)
                      ? 'bg-[#16A34A] text-white'
                      : 'bg-white text-[#14532D] border border-[#16A34A]/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="text-xs font-bold text-gray-500 uppercase px-1">
              Portals & Dashboards
            </div>
            {dashboardLinks.map((dash) => (
              <Link
                key={dash.name}
                to={dash.path}
                id={`mobile-dash-${dash.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-gray-100 text-sm font-semibold text-[#14532D]"
              >
                <span>{dash.name}</span>
                <ArrowRight className="w-4 h-4 text-[#16A34A]" />
              </Link>
            ))}
          </div>

          <div className="pt-3 flex gap-2">
            {!user ? (
              <>
                <button
                  id="mobile-login-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="flex-1 py-3 text-center rounded-xl bg-white border border-[#14532D]/20 text-[#14532D] font-bold text-sm"
                >
                  Login
                </button>
                <button
                  id="mobile-get-started-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="flex-1 py-3 text-center rounded-xl bg-[#14532D] text-white font-bold text-sm shadow-md"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-[#16A34A]/20">
                <div className="flex items-center space-x-2">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-bold text-[#14532D]">{user.name}</p>
                    <p className="text-[10px] text-[#16A34A]">{user.role}</p>
                  </div>
                </div>
                <button
                  id="mobile-logout-btn"
                  onClick={logoutUser}
                  className="text-xs text-red-600 font-bold px-2 py-1 bg-red-50 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
