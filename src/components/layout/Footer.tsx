import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, Cpu, ArrowUpRight, Heart, Globe, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1F16] text-[#FEFCE8] pt-16 pb-12 border-t border-[#16A34A]/20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#22C55E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#16A34A] to-[#22C55E] flex items-center justify-center shadow-lg shadow-[#16A34A]/30">
                <Sprout className="w-5 h-5 text-[#0B1F16]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Agri<span className="text-[#22C55E]">Bridge</span>
              </span>
            </div>
            
            <p className="text-sm text-gray-300 max-w-md leading-relaxed">
              Empowering Indian agriculture through AI-driven demand prediction, direct farmer-to-buyer marketplaces, and climate-resilient cold-chain logistics.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#22C55E] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span>FPO Verified Network</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#FACC15] flex items-center gap-1.5">
                <span>⚡ AI Cold Matrix 4.0</span>
              </div>
            </div>
          </div>

          {/* Col 2: Marketplace */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#22C55E] mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/marketplace" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Browse Fresh Produce</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#22C55E] transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Fruits" className="hover:text-white transition-colors">
                  GI-Tagged Mangoes & Fruits
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Vegetables" className="hover:text-white transition-colors">
                  Farm-Fresh Vegetables
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Grains" className="hover:text-white transition-colors">
                  Heritage Wheat & Rice
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Organic" className="hover:text-white transition-colors">
                  Certified Organic Produce
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Stakeholders */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#22C55E] mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/farmers" className="hover:text-white transition-colors">
                  For Farmers & FPOs
                </Link>
              </li>
              <li>
                <Link to="/buyers" className="hover:text-white transition-colors">
                  For Restaurants & QSRs
                </Link>
              </li>
              <li>
                <Link to="/buyers" className="hover:text-white transition-colors">
                  Bulk Supermarket Sourcing
                </Link>
              </li>
              <li>
                <Link to="/logistics" className="hover:text-white transition-colors">
                  Smart Cold Fleet
                </Link>
              </li>
              <li>
                <Link to="/ai-insights" className="hover:text-white transition-colors">
                  AgriAI Demand Engine
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Portals & Help */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#22C55E] mb-4">
              Portals & AI
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/dashboard/farmer" className="hover:text-white transition-colors">
                  Farmer Hub
                </Link>
              </li>
              <li>
                <Link to="/dashboard/buyer" className="hover:text-white transition-colors">
                  Buyer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/logistics" className="hover:text-white transition-colors">
                  Logistics Control Center
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Our Impact & Mission
                </Link>
              </li>
              <li className="pt-2 text-xs text-gray-400">
                Support: contact@agribridge.io
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & ESG indicators */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} AgriBridge Technologies Ltd. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center gap-6">
            <span>🌿 100% Traceable Single-Origin</span>
            <span>🔒 Bank-Grade Digital Escrow</span>
            <span>⚡ Solar-Powered Cold Hubs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
