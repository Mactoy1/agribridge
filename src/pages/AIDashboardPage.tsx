import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  AlertTriangle, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  Send,
  CloudRain,
  Layers
} from 'lucide-react';
import { mockDemandData, mockCropForecasts, mockPredictions } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const AIDashboardPage: React.FC = () => {
  const { showToast } = useApp();
  const [selectedCrop, setSelectedCrop] = useState<string>('Tomatoes');
  const [queryInput, setQueryInput] = useState<string>('');
  const [simulatedAnswer, setSimulatedAnswer] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);

  const chartData = mockCropForecasts[selectedCrop] || mockDemandData;

  const handleSimulatePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;

    setIsAnswering(true);
    setTimeout(() => {
      setIsAnswering(false);
      setSimulatedAnswer(
        `Based on regional soil moisture indices and 6-month historical mandi arrivals, planting high-density polyhouse ${queryInput} will yield +28% higher floor realizations by July. We anticipate a 14% supply deficit in Mumbai MMR markets due to delayed unseasonal rains.`
      );
      showToast('AI Intelligence Generated', 'Analysis completed with 94.6% model confidence', 'success');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#16A34A]/10 text-[#14532D] text-xs font-extrabold uppercase tracking-wider mb-2">
              <Cpu className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Neural Crop Planning & Price Foresight</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#14532D] tracking-tight">
              AgriBridge AI Intelligence Suite
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Real-time predictive analytics aggregating 1.4M mandi price feeds, rainfall satellite models, and commercial buyer off-take forecasts.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white p-3 rounded-2xl border border-gray-200 shadow-xs text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-ping" />
            <span className="font-bold text-gray-800">Model Confidence: 94.6%</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500 font-semibold">Feed: Agmarknet Live</span>
          </div>
        </div>

        {/* Prediction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPredictions.map((pred, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-[#14532D]">{pred.crop}</span>
                  <span className={`text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    pred.trend === 'up' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {pred.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {pred.trend === 'up' ? `+${pred.changePercent}%` : `-${pred.changePercent}%`}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-gray-900 leading-tight">
                  {pred.recommendedAction}
                </h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {pred.priceOutlook} • Hub: {pred.topBuyingHub}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-400">Volume: <strong>{pred.projectedVolumeTons} Tons</strong></span>
                <span className="font-bold text-[#16A34A]">{pred.confidenceScore}% Conf.</span>
              </div>
            </div>
          ))}
        </div>

        {/* Primary Forecast Chart Container */}
        <div className="bg-[#0B1F16] rounded-3xl p-6 sm:p-8 border border-[#22C55E]/30 text-white shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-black text-white">
                Supply vs. Demand Horizon Curve
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                8-month historical consumption vs neural model projection for major commercial hubs
              </p>
            </div>

            {/* Crop Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {['Tomatoes', 'Onions', 'Potatoes', 'Mangoes'].map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCrop === crop
                      ? 'bg-[#22C55E] text-[#0B1F16] font-extrabold shadow-md'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="h-[360px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="aiColorActual" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="aiColorForecast" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#FACC15" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FACC15" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#081811', 
                    borderColor: '#22C55E', 
                    borderRadius: '16px',
                    color: '#fff',
                    fontSize: '12px'
                  }} 
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', color: '#fff' }} />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  name="Actual Consumption (Tons)" 
                  stroke="#22C55E" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#aiColorActual)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="forecast" 
                  name="AI Expected Demand (Tons)" 
                  stroke="#FACC15" 
                  strokeWidth={3} 
                  strokeDasharray="4 4"
                  fillOpacity={1} 
                  fill="url(#aiColorForecast)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Interactive AI Prompt Query Engine */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#16A34A]/20 shadow-md space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#14532D] to-[#16A34A] text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#14532D]">Ask the AgriBridge Agronomy AI</h3>
              <p className="text-xs text-gray-500">Query optimal sowing calendars, expected price peaks, or pest risk indicators</p>
            </div>
          </div>

          <form onSubmit={handleSimulatePrompt} className="relative mt-2">
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="e.g. When will Nashik onion prices peak in Mumbai, and should I harvest early?"
              className="w-full pl-5 pr-32 py-4 bg-[#F8FAF5] border border-gray-300 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#16A34A]"
            />
            <button
              type="submit"
              disabled={isAnswering}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-[#14532D] hover:bg-[#16A34A] text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors disabled:opacity-50"
            >
              {isAnswering ? (
                <span>Analyzing...</span>
              ) : (
                <>
                  <span>Consult AI</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick preset query suggestions */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-[11px] font-bold text-gray-400 self-center">Try asking:</span>
            {[
              'Tomato planting window in Nashik',
              'Alphonso export demand trend 2026',
              'Organic basmati rice wholesale floor rate'
            ].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setQueryInput(q)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3 py-1.5 rounded-full transition-colors"
              >
                "{q}"
              </button>
            ))}
          </div>

          {/* AI Response Output */}
          {simulatedAnswer && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-xs sm:text-sm text-emerald-950 leading-relaxed mt-4 flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{simulatedAnswer}</p>
                <div className="text-[10px] text-emerald-700 font-bold mt-2 flex items-center gap-2">
                  <span>✓ Validated by ICAR crop models</span>
                  <span>•</span>
                  <span>Confidence: 94.6%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
