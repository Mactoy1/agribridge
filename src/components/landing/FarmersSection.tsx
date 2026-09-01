import React, { useState } from 'react';
import { 
  Sprout, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Coins, 
  ShieldCheck, 
  Calculator,
  Layers,
  Leaf
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FarmersSection: React.FC = () => {
  const { setIsAuthModalOpen } = useApp();

  const [cropType, setCropType] = useState<'Tomatoes' | 'Onions' | 'Mangoes' | 'Wheat'>('Tomatoes');
  const [acres, setAcres] = useState<number>(5);

  const cropRates: Record<string, { yieldPerAcreTons: number; traditionalRatePerKg: number; directRatePerKg: number }> = {
    Tomatoes: { yieldPerAcreTons: 12, traditionalRatePerKg: 18, directRatePerKg: 28 },
    Onions: { yieldPerAcreTons: 10, traditionalRatePerKg: 22, directRatePerKg: 34 },
    Mangoes: { yieldPerAcreTons: 4, traditionalRatePerKg: 110, directRatePerKg: 180 },
    Wheat: { yieldPerAcreTons: 2.5, traditionalRatePerKg: 30, directRatePerKg: 46 }
  };

  const selectedData = cropRates[cropType];
  const totalProductionKg = acres * selectedData.yieldPerAcreTons * 1000;
  const traditionalTotal = totalProductionKg * selectedData.traditionalRatePerKg;
  const directTotal = totalProductionKg * selectedData.directRatePerKg;
  const netGain = directTotal - traditionalTotal;
  const percentageGain = Math.round((netGain / traditionalTotal) * 100);

  const benefits = [
    'Direct access to thousands of verified commercial buyers',
    'Better price discovery with real-time APMC mandi benchmarks',
    'AI-powered demand predictions before planting cycles',
    'Integrated cold-chain logistics & farmgate collection',
    'Guaranteed digital escrow payments within 24 hours of delivery',
    'Reduced post-harvest wastage through predictive demand matching'
  ];

  return (
    <section className="py-20 bg-white border-b border-[#16A34A]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#16A34A]/10 text-[#14532D] text-xs font-extrabold uppercase tracking-wider">
              <Sprout className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>For Farmers & FPOs</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#14532D] tracking-tight leading-tight">
              Sell More. Waste Less. Earn Better.
            </h2>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
              Take back control of your harvest. AgriBridge gives grower cooperatives and individual farmers direct access to high-value retail, restaurant, and wholesale markets without middleman exploitation.
            </p>

            {/* Benefit Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start space-x-2.5 p-3 rounded-2xl bg-[#F8FAF5] border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-gray-800 leading-snug">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-3">
              <button
                id="farmers-section-start-selling-btn"
                onClick={() => setIsAuthModalOpen(true)}
                className="px-8 py-4 bg-[#14532D] hover:bg-[#16A34A] text-white rounded-2xl font-extrabold text-sm shadow-xl shadow-[#16A34A]/25 transition-all flex items-center space-x-2.5 active:scale-95"
              >
                <span>Start Selling on AgriBridge</span>
                <ArrowRight className="w-4 h-4 text-[#22C55E]" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Farmer Earning Calculator & Visual */}
          <div className="lg:col-span-6">
            <div className="bg-[#0B1F16] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#22C55E]/30 text-white relative">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2.5 rounded-xl bg-[#16A34A]/30 text-[#22C55E]">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">Farmer Realization Calculator</h3>
                    <p className="text-xs text-gray-400">Estimate your additional income with direct trade</p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase text-[#22C55E] bg-[#22C55E]/20 px-2 py-1 rounded-full border border-[#22C55E]/30">
                  AI Calibrated
                </span>
              </div>

              {/* Interactive Controls */}
              <div className="space-y-4 mb-6">
                {/* Crop Selection */}
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-2">Select Your Harvest Crop:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['Tomatoes', 'Onions', 'Mangoes', 'Wheat'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setCropType(c as any)}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                          cropType === c
                            ? 'bg-[#22C55E] text-[#0B1F16] font-extrabold shadow-md'
                            : 'bg-white/10 text-gray-300 hover:bg-white/15'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Acreage Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-gray-300">Cultivated Farm Land:</span>
                    <span className="text-[#22C55E] text-sm font-extrabold">{acres} Acres</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="1"
                    value={acres}
                    onChange={(e) => setAcres(Number(e.target.value))}
                    className="w-full accent-[#22C55E] h-2 bg-white/10 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>1 Acre</span>
                    <span>Estimated Yield: {Math.round(totalProductionKg / 1000)} Tons</span>
                    <span>25 Acres</span>
                  </div>
                </div>
              </div>

              {/* Comparison Result Visualizer */}
              <div className="p-5 rounded-2xl bg-[#14532D]/40 border border-[#22C55E]/30 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Traditional Mandi Payout</span>
                    <div className="text-lg sm:text-xl font-bold text-gray-300 mt-0.5">
                      ₹{Math.round(traditionalTotal).toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-gray-400">@ ₹{selectedData.traditionalRatePerKg}/kg</span>
                  </div>

                  <div className="bg-[#16A34A]/20 p-3 rounded-xl border border-[#22C55E]/40">
                    <span className="text-[10px] text-[#22C55E] uppercase font-bold">AgriBridge Direct Realization</span>
                    <div className="text-lg sm:text-xl font-black text-white mt-0.5">
                      ₹{Math.round(directTotal).toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-[#22C55E] font-semibold">@ ₹{selectedData.directRatePerKg}/kg</span>
                  </div>
                </div>

                {/* Extra Profit Highlight */}
                <div className="p-3.5 bg-gradient-to-r from-[#16A34A] to-[#22C55E] rounded-xl text-[#0B1F16] flex items-center justify-between shadow-lg">
                  <div>
                    <span className="text-xs font-bold opacity-90">Net Additional Farmer Income</span>
                    <div className="text-2xl font-black font-sans">
                      +₹{Math.round(netGain).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold opacity-90">Earnings Boost</span>
                    <div className="text-xl font-black">+{percentageGain}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const BuyersSection: React.FC = () => {
  const { setIsAuthModalOpen } = useApp();
  const [activeBuyerTab, setActiveBuyerTab] = useState<'Restaurants' | 'Retailers' | 'Supermarkets' | 'Wholesalers' | 'Food Businesses'>('Restaurants');

  const buyerCategories = [
    {
      name: 'Restaurants',
      desc: 'Farm-fresh ingredients delivered daily before your kitchen prep starts. Consistent quality, zero morning mandi visits.',
      metrics: '18% Savings • Delivered by 8:00 AM'
    },
    {
      name: 'Retailers',
      desc: 'Stock premium GI-tagged fruits and crisp vegetables directly from verified producer clusters with extended shelf life.',
      metrics: 'Zero Transit Spoilage • Graded Batches'
    },
    {
      name: 'Supermarkets',
      desc: 'Full lot traceability with farmgate soil tests, zero pesticide residue certificates, and scheduled reefer drops.',
      metrics: '100% Quality Audited • Direct FPO Contracts'
    },
    {
      name: 'Wholesalers',
      desc: 'Lock truckload and multi-ton consignments with transparent floor prices and scheduled logistics across interstate corridors.',
      metrics: '20+ Ton Single Orders • Escrow Security'
    },
    {
      name: 'Food Businesses',
      desc: 'Direct industrial off-take contracts for processing chips, pulps, flour, and spices with custom moisture & brix specifications.',
      metrics: 'Annual Price Hedging • Custom Specs'
    }
  ];

  const features = [
    'Bulk ordering with transparent volume discounts',
    'Verified FPOs and audited grower cooperatives',
    'Transparent pricing with zero hidden commission markups',
    'Reliable supply chain with guaranteed delivery windows',
    'AI demand insights to forecast seasonal menu prices',
    'Scheduled temperature-controlled cold-chain logistics'
  ];

  return (
    <section className="py-20 bg-[#F8FAF5] border-b border-[#16A34A]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#16A34A]/10 text-[#14532D] text-xs font-extrabold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Commercial Procurement Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#14532D] tracking-tight">
            Source Directly. Scale Confidently.
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
            Whether you operate a boutique farm-to-table bistro or manage nationwide supermarket chains, AgriBridge delivers verified produce with complete traceability.
          </p>
        </div>

        {/* Buyer Categories Tabs */}
        <div className="flex justify-center gap-2 overflow-x-auto no-scrollbar mb-10 pb-2">
          {buyerCategories.map((b) => (
            <button
              key={b.name}
              onClick={() => setActiveBuyerTab(b.name as any)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                activeBuyerTab === b.name
                  ? 'bg-[#14532D] text-white shadow-lg shadow-[#14532D]/20 scale-102 font-extrabold'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>

        {/* Active Tab Showcase Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#16A34A]/20 shadow-md mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#16A34A] bg-[#16A34A]/10 px-3 py-1 rounded-full">
                Tailored for {activeBuyerTab}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14532D]">
                {activeBuyerTab} Procurement Solutions
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {buyerCategories.find((b) => b.name === activeBuyerTab)?.desc}
              </p>
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/70 text-xs font-bold text-[#14532D]">
                ✨ Key Highlight: {buyerCategories.find((b) => b.name === activeBuyerTab)?.metrics}
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feat, idx) => (
                <div key={idx} className="p-3 bg-[#F8FAF5] rounded-xl border border-gray-100 text-xs font-semibold text-gray-800 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            id="become-bulk-buyer-btn"
            onClick={() => setIsAuthModalOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-[#14532D] via-[#16A34A] to-[#14532D] hover:shadow-xl hover:shadow-[#16A34A]/25 text-white rounded-2xl font-extrabold text-sm transition-all inline-flex items-center space-x-2 active:scale-95"
          >
            <span>Become a Verified Bulk Buyer</span>
            <ArrowRight className="w-4 h-4 text-[#22C55E]" />
          </button>
        </div>
      </div>
    </section>
  );
};
