import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sprout, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Truck, 
  ShieldCheck, 
  Users, 
  Store, 
  Cpu, 
  Leaf, 
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HeroSection: React.FC = () => {
  const { setIsAuthModalOpen } = useApp();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient lighting & soft organic grid */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#22C55E]/10 via-[#16A34A]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-[#FACC15]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#16A34A]/25 shadow-xs text-xs font-bold text-[#14532D]">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
              </span>
              <span>Next-Gen Agricultural Intelligence & Direct Trade</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#14532D] tracking-tight leading-[1.1] font-sans">
              From Farm to Future.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16A34A] via-[#22C55E] to-[#14532D]">
                Without the Middlemen.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Connect directly with farmers and FPOs, discover fresh produce at better prices, and move it smarter with AI-powered logistics.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/marketplace"
                id="hero-explore-marketplace-btn"
                className="w-full sm:w-auto px-7 py-4 bg-[#14532D] hover:bg-[#16A34A] text-white rounded-2xl font-extrabold text-sm shadow-xl shadow-[#16A34A]/25 hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2.5 active:scale-95"
              >
                <span>Explore Marketplace</span>
                <ArrowRight className="w-4 h-4 text-[#22C55E]" />
              </Link>

              <button
                id="hero-join-farmer-btn"
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-[#FEFCE8] text-[#14532D] border-2 border-[#16A34A]/30 rounded-2xl font-extrabold text-sm shadow-md transition-all duration-300 flex items-center justify-center space-x-2 active:scale-95"
              >
                <Sprout className="w-4 h-4 text-[#16A34A]" />
                <span>Join as a Farmer</span>
              </button>
            </div>

            {/* Trust Indicator */}
            <div className="pt-4 border-t border-[#16A34A]/15 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-gray-600">
              <span className="flex items-center gap-1.5 text-[#14532D]">
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                Connecting Farmers • Consumers • Bulk Buyers
              </span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span className="text-emerald-800 font-bold bg-emerald-100/60 px-2.5 py-1 rounded-full">
                ₹0 Commission Direct Escrow
              </span>
            </div>
          </div>

          {/* Right Column: Futuristic Agricultural Ecosystem Visualization */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-square max-w-[540px] mx-auto bg-gradient-to-b from-[#0B1F16] to-[#14532D] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#22C55E]/30 overflow-hidden text-white">
              {/* Background futuristic circuit grid lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#22C55E_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />

              {/* Central Eco-Engine Visualizer */}
              <div className="relative h-full flex flex-col justify-between z-10">
                {/* Top Node: Farmers / FPO */}
                <div className="flex justify-center">
                  <div className="relative group p-3.5 rounded-2xl bg-[#0B1F16]/90 border border-[#22C55E]/40 shadow-lg shadow-[#22C55E]/20 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#22C55E] flex items-center justify-center">
                      <Sprout className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#22C55E]">Producer Gate</span>
                      <h4 className="text-sm font-bold text-white">Farmers & FPOs</h4>
                    </div>
                  </div>
                </div>

                {/* Animated Connecting SVG Lines */}
                <div className="relative my-2 h-36 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 160">
                    <defs>
                      <linearGradient id="grad-pulse" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22C55E" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#FACC15" stopOpacity="1" />
                        <stop offset="100%" stopColor="#22C55E" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                    {/* Paths from top to center */}
                    <line x1="200" y1="0" x2="200" y2="70" stroke="#22C55E" strokeWidth="2.5" strokeDasharray="4,4" className="animate-dash" />
                    {/* Branching from center to left, right, bottom */}
                    <line x1="200" y1="90" x2="90" y2="150" stroke="#22C55E" strokeWidth="2" strokeDasharray="4,4" className="animate-dash" />
                    <line x1="200" y1="90" x2="310" y2="150" stroke="#22C55E" strokeWidth="2" strokeDasharray="4,4" className="animate-dash" />
                    <line x1="200" y1="90" x2="200" y2="150" stroke="#FACC15" strokeWidth="2" strokeDasharray="3,3" className="animate-dash" />
                  </svg>

                  {/* Central AgriBridge AI Nexus Node */}
                  <div className="relative z-20 p-4 rounded-2xl bg-gradient-to-tr from-[#16A34A] to-[#22C55E] text-[#0B1F16] shadow-xl shadow-[#22C55E]/40 border-2 border-white flex items-center space-x-2.5 animate-pulse-glow">
                    <Cpu className="w-6 h-6 animate-spin text-[#0B1F16]" style={{ animationDuration: '8s' }} />
                    <div>
                      <div className="text-xs font-black tracking-wide">AgriBridge AI Engine</div>
                      <div className="text-[10px] font-bold opacity-85">Dynamic Demand & Logistics</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Nodes: Consumer, Bulk Buyer, Logistics */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-[#0B1F16]/90 border border-white/10 flex flex-col items-center">
                    <Users className="w-4 h-4 text-[#22C55E] mb-1" />
                    <span className="text-[11px] font-bold text-white">Consumer</span>
                    <span className="text-[9px] text-gray-400">Direct Gate</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#0B1F16]/90 border border-amber-400/30 flex flex-col items-center">
                    <Store className="w-4 h-4 text-[#FACC15] mb-1" />
                    <span className="text-[11px] font-bold text-white">Bulk Buyer</span>
                    <span className="text-[9px] text-gray-400">QSRs & Chains</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#0B1F16]/90 border border-emerald-400/30 flex flex-col items-center">
                    <Truck className="w-4 h-4 text-[#22C55E] mb-1" />
                    <span className="text-[11px] font-bold text-white">Logistics</span>
                    <span className="text-[9px] text-gray-400">Smart Reefer</span>
                  </div>
                </div>
              </div>

              {/* Floating Live Stat Cards on Hero Visual */}
              <div className="absolute top-8 left-2 sm:-left-3 bg-[#0B1F16]/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#22C55E]/40 shadow-xl text-white flex items-center space-x-2 text-xs animate-float-slow">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                <span className="font-bold text-[#22C55E]">Farmer earnings +24%</span>
              </div>

              <div className="absolute top-28 right-2 sm:-right-3 bg-[#0B1F16]/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#FACC15]/40 shadow-xl text-white flex items-center space-x-2 text-xs animate-float-slow" style={{ animationDelay: '1.5s' }}>
                <Cpu className="w-3.5 h-3.5 text-[#FACC15]" />
                <span className="font-bold text-white">Delivery optimized by AI</span>
              </div>

              <div className="absolute bottom-16 left-4 bg-[#0B1F16]/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 shadow-xl text-white flex items-center space-x-2 text-xs animate-float-slow" style={{ animationDelay: '2.5s' }}>
                <Users className="w-3.5 h-3.5 text-[#22C55E]" />
                <span className="font-bold text-gray-200">12,480+ farmers connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
