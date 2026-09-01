import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  ArrowRight, 
  Thermometer, 
  Droplets, 
  Fuel, 
  Clock, 
  CheckCircle2, 
  Radio, 
  Layers 
} from 'lucide-react';

export const SmartLogisticsSection: React.FC = () => {
  const [activeWaypoint, setActiveWaypoint] = useState<number>(2);

  const waypoints = [
    { name: 'Ratnagiri Farmgate', type: 'Origin', lat: '16.99', lon: '73.31', status: 'Dispatched (04:30 AM)' },
    { name: 'Devgad Pre-Cooling Center', type: 'Collection Center', lat: '16.37', lon: '73.37', status: 'Graded & Chilled (06:00 AM)' },
    { name: 'Navi Mumbai Cold Matrix', type: 'Distribution Hub', lat: '19.03', lon: '73.02', status: 'Active Reefer Bay #4' },
    { name: 'Bandra Consumer Collective', type: 'Final Consumer', lat: '19.05', lon: '72.82', status: 'ETA: 45 Mins' }
  ];

  return (
    <section className="py-20 bg-[#F8FAF5] relative overflow-hidden border-b border-[#16A34A]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Map Visualization (SVG/CSS) */}
          <div className="lg:col-span-7">
            <div className="bg-[#0B1F16] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#22C55E]/30 relative overflow-hidden text-white">
              {/* Map Header Status */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-[#16A34A]/20 text-[#22C55E]">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">Active Cold-Chain Route #AG4821</h4>
                    <p className="text-[11px] text-gray-400">Ratnagiri Orchards → Mumbai MMR Central</p>
                  </div>
                </div>
                <span className="bg-[#22C55E]/20 text-[#22C55E] text-xs font-bold px-3 py-1 rounded-full border border-[#22C55E]/40 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                  AI In-Transit
                </span>
              </div>

              {/* Interactive SVG Route Map Visual */}
              <div className="relative w-full aspect-16/10 rounded-2xl bg-[#081811] border border-white/10 p-4 flex flex-col justify-between overflow-hidden">
                {/* Background topographic contour lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 600 360">
                  <path d="M 50 180 Q 200 80 400 200 T 580 140" fill="none" stroke="#22C55E" strokeWidth="1" />
                  <path d="M 20 240 Q 180 140 380 260 T 560 200" fill="none" stroke="#22C55E" strokeWidth="1" />
                  <path d="M 80 100 Q 260 40 440 140 T 590 80" fill="none" stroke="#22C55E" strokeWidth="1" />
                </svg>

                {/* Animated Waypoint Route Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 360">
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#16A34A" />
                      <stop offset="50%" stopColor="#22C55E" />
                      <stop offset="100%" stopColor="#FACC15" />
                    </linearGradient>
                  </defs>
                  {/* Glowing line from Farm to Consumer */}
                  <path
                    d="M 80 280 C 180 260, 200 160, 310 170 S 450 80, 520 80"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="4"
                    strokeDasharray="6 6"
                    className="animate-dash"
                  />
                </svg>

                {/* Nodes on Map */}
                <div className="relative z-10 grid grid-cols-4 gap-2 h-full items-center">
                  {/* 1. Farmer Node */}
                  <div
                    onClick={() => setActiveWaypoint(0)}
                    className={`cursor-pointer p-3 rounded-2xl border transition-all text-center flex flex-col items-center ${
                      activeWaypoint === 0
                        ? 'bg-[#14532D] border-[#22C55E] shadow-lg shadow-[#22C55E]/30 scale-105'
                        : 'bg-[#0B1F16]/80 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#16A34A]/30 text-[#22C55E] flex items-center justify-center mb-1 text-xs font-bold">
                      01
                    </div>
                    <span className="text-[11px] font-extrabold text-white">Farmer Gate</span>
                    <span className="text-[9px] text-[#22C55E]">Ratnagiri</span>
                  </div>

                  {/* 2. Collection Center Node */}
                  <div
                    onClick={() => setActiveWaypoint(1)}
                    className={`cursor-pointer p-3 rounded-2xl border transition-all text-center flex flex-col items-center ${
                      activeWaypoint === 1
                        ? 'bg-[#14532D] border-[#22C55E] shadow-lg shadow-[#22C55E]/30 scale-105'
                        : 'bg-[#0B1F16]/80 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center mb-1 text-xs font-bold">
                      02
                    </div>
                    <span className="text-[11px] font-extrabold text-white">Collection Hub</span>
                    <span className="text-[9px] text-emerald-300">Pre-Cooled</span>
                  </div>

                  {/* 3. Distribution Hub Node */}
                  <div
                    onClick={() => setActiveWaypoint(2)}
                    className={`cursor-pointer p-3 rounded-2xl border transition-all text-center flex flex-col items-center ${
                      activeWaypoint === 2
                        ? 'bg-[#14532D] border-[#22C55E] shadow-lg shadow-[#22C55E]/30 scale-105'
                        : 'bg-[#0B1F16]/80 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-500/30 text-[#FACC15] flex items-center justify-center mb-1 text-xs font-bold">
                      03
                    </div>
                    <span className="text-[11px] font-extrabold text-white">Dist. Matrix</span>
                    <span className="text-[9px] text-[#FACC15]">Navi Mumbai</span>
                  </div>

                  {/* 4. Consumer / Buyer Node */}
                  <div
                    onClick={() => setActiveWaypoint(3)}
                    className={`cursor-pointer p-3 rounded-2xl border transition-all text-center flex flex-col items-center ${
                      activeWaypoint === 3
                        ? 'bg-[#14532D] border-[#22C55E] shadow-lg shadow-[#22C55E]/30 scale-105'
                        : 'bg-[#0B1F16]/80 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500/30 text-blue-300 flex items-center justify-center mb-1 text-xs font-bold">
                      04
                    </div>
                    <span className="text-[11px] font-extrabold text-white">Buyer / Table</span>
                    <span className="text-[9px] text-blue-300">Mumbai</span>
                  </div>
                </div>

                {/* Telemetry Sensor Bar */}
                <div className="mt-3 p-3 bg-[#0B1F16]/90 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-[#22C55E]" />
                    <span className="text-gray-300">Cold Chamber:</span>
                    <span className="font-mono font-bold text-[#22C55E]">13.8°C</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">Humidity:</span>
                    <span className="font-mono font-bold text-blue-300">86%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#FACC15]" />
                    <span className="text-gray-300">ETA:</span>
                    <span className="font-mono font-bold text-[#FACC15]">4h 20m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Headline, Metric Cards & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#16A34A]/15 text-[#14532D] text-xs font-extrabold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Smart IoT Cold Chain</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#14532D] tracking-tight leading-tight">
              Deliver Smarter, Not Harder.
            </h2>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
              AgriBridge AI synchronizes farmgate harvest schedules with multi-drop refrigerated trucks, reducing transit bruising, fuel consumption, and unnecessary warehousing delays.
            </p>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-4 bg-white rounded-2xl border border-[#16A34A]/20 shadow-xs">
                <div className="text-2xl font-black text-[#16A34A]">23%</div>
                <div className="text-xs font-bold text-gray-800 mt-0.5">Distance Reduced</div>
                <p className="text-[11px] text-gray-500">AI dynamic routing</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-xs">
                <div className="text-2xl font-black text-amber-800">18%</div>
                <div className="text-xs font-bold text-gray-800 mt-0.5">Fuel Saved</div>
                <p className="text-[11px] text-gray-500">Consolidated loads</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#14532D]/20 shadow-xs">
                <div className="text-2xl font-black text-[#14532D]">31%</div>
                <div className="text-xs font-bold text-gray-800 mt-0.5">Faster Route Planning</div>
                <p className="text-[11px] text-gray-500">Automated dispatch</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-xs">
                <div className="text-2xl font-black text-emerald-700">94%</div>
                <div className="text-xs font-bold text-gray-800 mt-0.5">On-time Prediction</div>
                <p className="text-[11px] text-gray-500">Zero cold chain breaks</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                to="/logistics"
                id="explore-logistics-btn"
                className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-[#14532D] hover:bg-[#16A34A] text-white rounded-2xl font-extrabold text-sm shadow-md transition-all active:scale-95"
              >
                <span>Explore Logistics Control</span>
                <ArrowRight className="w-4 h-4 text-[#22C55E]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
