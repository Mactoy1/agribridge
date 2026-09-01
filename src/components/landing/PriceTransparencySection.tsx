import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Coins, 
  ShieldCheck, 
  AlertCircle, 
  Leaf, 
  Sparkles,
  QrCode,
  Star,
  Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { mockTestimonials } from '../../data/mockData';

export const PriceTransparencySection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-[#16A34A]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold uppercase tracking-wider">
            <Coins className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Radical Economics & Fair Distribution</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#14532D] tracking-tight">
            Make Every Rupee Count.
          </h2>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
            More value reaches the farmer. Less cost reaches the consumer.
          </p>
        </div>

        {/* Visual Rupee Flow Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Card 1: Traditional Supply Chain */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAF5] border border-red-200/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-red-100 mb-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-600">Old Mandi System</span>
                  <h3 className="text-xl font-extrabold text-gray-900">Traditional 5-Tier Chain</h3>
                </div>
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                  60% Value Lost in Middle
                </span>
              </div>

              <div className="space-y-4 text-xs font-semibold">
                {/* Traditional Step Breakdown */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-gray-100">
                  <span className="text-gray-600 font-bold">Farmer Net Gate Payout</span>
                  <span className="text-sm font-extrabold text-red-600">₹20</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-gray-100 text-gray-500">
                  <span>Mandi Middlemen & Arthiya Commissions</span>
                  <span className="font-bold text-gray-700">+₹10</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-gray-100 text-gray-500">
                  <span>Regional Wholesale Distributor Cut</span>
                  <span className="font-bold text-gray-700">+₹8</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-gray-100 text-gray-500">
                  <span>Local Retailer / Vendor Markup</span>
                  <span className="font-bold text-gray-700">+₹12</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-red-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 block">Final Consumer Pays</span>
                <span className="text-3xl font-black text-gray-900">₹50 <span className="text-xs font-normal">/ kg</span></span>
              </div>
              <div className="text-right">
                <span className="text-xs text-red-600 font-bold block">Farmer Gets Only</span>
                <span className="text-lg font-extrabold text-red-600">40% of Total</span>
              </div>
            </div>
          </div>

          {/* Card 2: AgriBridge Direct AI Model */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0B1F16] to-[#14532D] text-white border border-[#22C55E]/40 shadow-xl shadow-[#16A34A]/20 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#22C55E]/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#22C55E]">AgriBridge Direct AI Model</span>
                  <h3 className="text-xl font-extrabold text-white">Direct Farmgate Marketplace</h3>
                </div>
                <span className="px-3 py-1 bg-[#22C55E] text-[#0B1F16] text-xs font-black rounded-full shadow-xs">
                  80% To The Grower
                </span>
              </div>

              <div className="space-y-4 text-xs font-semibold">
                {/* AgriBridge Step Breakdown */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#14532D]/70 border border-[#22C55E]/40 text-white">
                  <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" /> Farmer Direct Payout (+60% Gain)
                  </span>
                  <span className="text-base font-black text-[#22C55E]">₹32</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 text-gray-300">
                  <span>AgriBridge Platform & Escrow Fee</span>
                  <span className="font-bold text-gray-200">+₹3</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 text-gray-300">
                  <span>Smart Cold-Chain Transit & Pre-cooling</span>
                  <span className="font-bold text-gray-200">+₹5</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block">Final Consumer / Buyer Pays</span>
                <span className="text-3xl font-black text-[#22C55E]">₹40 <span className="text-xs text-gray-300 font-normal">/ kg (20% Cheaper)</span></span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#22C55E] font-bold block">Farmer Realization</span>
                <span className="text-lg font-black text-white">80% Direct Share</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TrustSection: React.FC = () => {
  const badges = [
    { name: 'Verified Farmers', desc: '100% Aadhaar & 7/12 Land Record KYC Passed' },
    { name: 'Verified FPOs', desc: 'Registered under Ministry of Agriculture & NABARD' },
    { name: 'Quality Checked', desc: 'NABL-accredited Lab Brix, Moisture & Residue Audits' },
    { name: 'Secure Payments', desc: 'Direct Bank Digital Escrow within 24 Hours' },
    { name: 'Transparent Pricing', desc: 'Zero Hidden Markups or Intermediary Levies' },
    { name: 'Tracked Logistics', desc: 'IoT Sensors & Reefer Temperature Monitored' }
  ];

  return (
    <section className="py-20 bg-[#F8FAF5] border-b border-[#16A34A]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#16A34A]/10 text-[#14532D] text-xs font-extrabold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Integrity & Verification Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#14532D] tracking-tight">
            Built on Trust
          </h2>
          <p className="text-sm text-gray-600">
            Every lot on AgriBridge is digitally certified for origin, soil health, pesticide tolerance, and moisture content.
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {badges.map((badge, idx) => (
            <div key={idx} className="p-4 bg-white rounded-2xl border border-[#16A34A]/20 text-center shadow-xs flex flex-col justify-between">
              <ShieldCheck className="w-6 h-6 text-[#16A34A] mx-auto mb-2" />
              <h4 className="font-extrabold text-xs text-[#14532D]">{badge.name}</h4>
              <p className="text-[10px] text-gray-500 mt-1 leading-tight">{badge.desc}</p>
            </div>
          ))}
        </div>

        {/* Farmer Verification Dossier Preview Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#16A34A]/20 shadow-md">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-[#16A34A]">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80"
                alt="Farmer Ramesh Patil"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h4 className="text-lg font-black text-[#14532D]">Sanjay Salunkhe</h4>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#16A34A]" /> Verified Producer Lead
                </span>
              </div>
              <p className="text-xs text-gray-600">
                Konkan Krishi Vikas FPO • Devgad Block, Ratnagiri, Maharashtra
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className="bg-[#F8FAF5] p-2 rounded-xl border border-gray-100">
                  <div className="text-[10px] text-gray-500">Acreage</div>
                  <div className="font-extrabold text-[#14532D]">14 Acres</div>
                </div>
                <div className="bg-[#F8FAF5] p-2 rounded-xl border border-gray-100">
                  <div className="text-[10px] text-gray-500">Pesticide Residue</div>
                  <div className="font-extrabold text-[#16A34A]">0.00 ppm</div>
                </div>
                <div className="bg-[#F8FAF5] p-2 rounded-xl border border-gray-100">
                  <div className="text-[10px] text-gray-500">NPOP Cert</div>
                  <div className="font-mono font-bold text-gray-800">#0018-RTG</div>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="p-3 bg-[#F8FAF5] rounded-2xl border border-gray-200 text-center shrink-0 hidden sm:block">
              <QrCode className="w-16 h-16 text-[#14532D] mx-auto" />
              <span className="text-[9px] font-mono text-gray-500 block mt-1">SCAN LOT ID</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-[#16A34A]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 text-emerald-900 text-xs font-extrabold uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Community Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#14532D] tracking-tight">
            Voices Across the Supply Network
          </h2>
          <p className="text-sm text-gray-600">
            Real feedback from agricultural producers, Michelin-rated chefs, and conscious consumers.
          </p>
        </div>

        {/* 3 Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockTestimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#F8FAF5] border border-gray-200/90 hover:border-[#16A34A]/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center space-x-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center space-x-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-2xl object-cover border border-gray-300"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-[#14532D]">{t.name}</h4>
                  <p className="text-[11px] text-gray-500">{t.organization}</p>
                  <span className="inline-block mt-0.5 text-[10px] font-bold text-[#16A34A] bg-emerald-100/60 px-2 py-0.5 rounded-full">
                    {t.metricBadge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const EnvironmentalStatsSection: React.FC = () => {
  return (
    <section className="py-12 bg-[#0B1F16] text-white border-b border-[#16A34A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-3xl sm:text-4xl font-black text-[#22C55E]">2.4M kg</div>
            <div className="text-xs font-bold text-gray-300 mt-1">Farm Produce Moved Direct</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-3xl sm:text-4xl font-black text-[#FACC15]">180K kg</div>
            <div className="text-xs font-bold text-gray-300 mt-1">Post-Harvest Food Waste Avoided</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-3xl sm:text-4xl font-black text-white">₹4.8 Cr</div>
            <div className="text-xs font-bold text-gray-300 mt-1">Additional Farmer Value Created</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FinalCTASection: React.FC = () => {
  const { setIsAuthModalOpen } = useApp();

  return (
    <section className="py-20 bg-gradient-to-b from-[#14532D] to-[#0B1F16] text-white relative overflow-hidden">
      {/* Background leaf aesthetics */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#22C55E]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#FACC15]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#22C55E] text-xs font-bold uppercase tracking-wider">
          <Leaf className="w-3.5 h-3.5" />
          <span>Sustainable Agri-Commerce</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Let's Build a Fairer Food Supply Chain.
        </h2>

        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
          Technology should connect the people who grow our food with the people who need it. Join AgriBridge today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/marketplace"
            id="final-cta-explore-marketplace-btn"
            className="w-full sm:w-auto px-8 py-4 bg-[#22C55E] hover:bg-[#16A34A] text-[#0B1F16] hover:text-white rounded-2xl font-extrabold text-sm shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 active:scale-95"
          >
            <span>Explore Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            id="final-cta-join-agribridge-btn"
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-extrabold text-sm shadow-md transition-all duration-300 flex items-center justify-center space-x-2 active:scale-95"
          >
            <span>Join AgriBridge</span>
          </button>
        </div>
      </div>
    </section>
  );
};
