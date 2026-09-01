import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  Cpu, 
  BrainCircuit, 
  Layers, 
  ShieldCheck, 
  Info,
  Calendar
} from 'lucide-react';
import { mockDemandData, mockCropForecasts, mockPredictions } from '../../data/mockData';

export const AIDemandForecastSection: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>('Tomatoes');

  const chartData = mockCropForecasts[selectedCrop] || mockDemandData;

  return (
    <section className="py-20 bg-[#0B1F16] text-[#FEFCE8] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#22C55E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#16A34A]/20 border border-[#22C55E]/40 text-[#22C55E] text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Neural Agricultural Intelligence</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Know What the Market Wants Before It Happens.
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            AI-powered demand forecasting helps farmers and FPOs plan production, reduce waste and sell at the right time.
          </p>
        </div>

        {/* Prediction Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Tomato */}
          <div className="p-5 rounded-3xl bg-[#14532D]/40 border border-[#22C55E]/30 backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-300">Vegetable Index</span>
              <span className="flex items-center gap-1 text-xs font-black text-[#22C55E] bg-[#22C55E]/20 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5" /> ↑ 18.4%
              </span>
            </div>
            <div className="my-3">
              <div className="text-2xl font-black text-white">Expected Tomato Demand</div>
              <p className="text-xs text-gray-400 mt-0.5">Peak QSR procurement window: Jun–Aug</p>
            </div>
            <div className="text-[11px] text-[#22C55E] font-semibold">
              Action: Increase polyhouse transplanting
            </div>
          </div>

          {/* Card 2: Onion */}
          <div className="p-5 rounded-3xl bg-[#14532D]/40 border border-[#22C55E]/30 backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-300">Storable Staples</span>
              <span className="flex items-center gap-1 text-xs font-black text-[#22C55E] bg-[#22C55E]/20 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5" /> ↑ 12.7%
              </span>
            </div>
            <div className="my-3">
              <div className="text-2xl font-black text-white">Expected Onion Demand</div>
              <p className="text-xs text-gray-400 mt-0.5">Maharashtra storage release optimization</p>
            </div>
            <div className="text-[11px] text-[#22C55E] font-semibold">
              Action: Stagger warehouse releases
            </div>
          </div>

          {/* Card 3: Potato */}
          <div className="p-5 rounded-3xl bg-[#14532D]/40 border border-amber-500/30 backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-300">Tubers Index</span>
              <span className="flex items-center gap-1 text-xs font-black text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded-full">
                <TrendingDown className="w-3.5 h-3.5" /> ↓ 8.2%
              </span>
            </div>
            <div className="my-3">
              <div className="text-2xl font-black text-white">Expected Potato Demand</div>
              <p className="text-xs text-gray-400 mt-0.5">North India cold harvest influx</p>
            </div>
            <div className="text-[11px] text-amber-300 font-semibold">
              Action: Lock forward chips contracts
            </div>
          </div>

          {/* Card 4: Confidence Score */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#16A34A] to-[#14532D] border border-[#22C55E] text-[#0B1F16] flex flex-col justify-between shadow-xl shadow-[#22C55E]/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-[#FEFCE8]/90">Precision Score</span>
              <Sparkles className="w-4 h-4 text-[#FACC15]" />
            </div>
            <div className="my-2">
              <div className="text-4xl font-black text-white font-sans">94.6%</div>
              <div className="text-xs font-bold text-[#FEFCE8] mt-0.5">AI Model Confidence</div>
            </div>
            <p className="text-[11px] text-white/90 leading-tight">
              Calibrated over 1.4M daily mandi data points & climate satellite radar.
            </p>
          </div>
        </div>

        {/* Analytics Card with Interactive Chart */}
        <div className="bg-[#14532D]/30 border border-[#22C55E]/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
          {/* Chart Header & Crop Selector Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-extrabold text-white">Demand Forecast Curve</h3>
                <span className="bg-[#22C55E]/20 text-[#22C55E] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#22C55E]/30">
                  Live Matrix
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                Comparing actual consumer/commercial demand with predictive neural horizon (Jan – Aug)
              </p>
            </div>

            {/* Crop Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {['Tomatoes', 'Onions', 'Potatoes', 'Mangoes'].map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCrop === crop
                      ? 'bg-[#22C55E] text-[#0B1F16] shadow-md font-extrabold'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          {/* Recharts Analytics Visualization */}
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#FACC15" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FACC15" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0B1F16', 
                    borderColor: '#22C55E', 
                    borderRadius: '16px',
                    color: '#fff',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                  }} 
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', color: '#fff' }} />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  name="Actual Demand (Tons)" 
                  stroke="#22C55E" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorActual)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="forecast" 
                  name="AI Forecast (Tons)" 
                  stroke="#FACC15" 
                  strokeWidth={3} 
                  strokeDasharray="4 4"
                  fillOpacity={1} 
                  fill="url(#colorForecast)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
              <span>Solid: Real-time Transacted Volume</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FACC15] ml-2" />
              <span>Dashed: AI Predictive Wave (Next 60 Days)</span>
            </div>
            <span className="text-[#22C55E] font-semibold">
              Updated 8 mins ago with National Agmarknet Feeds
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
