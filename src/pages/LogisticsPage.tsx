import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Thermometer, 
  Droplets, 
  Radio, 
  Navigation, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  Layers, 
  Fuel, 
  Cpu, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { mockShipments } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const LogisticsPage: React.FC = () => {
  const { showToast } = useApp();
  const [selectedShipment, setSelectedShipment] = useState(mockShipments[0]);
  const [isSimulatingOptimization, setIsSimulatingOptimization] = useState(false);
  const [routeOptimized, setRouteOptimized] = useState(false);

  const handleSimulateLoadPool = () => {
    setIsSimulatingOptimization(true);
    setTimeout(() => {
      setIsSimulatingOptimization(false);
      setRouteOptimized(true);
      showToast('AI Route Optimized', 'Saved 48 km transit and pooled 2 additional FPO pick-ups into Reefer #AG-4821', 'success');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#16A34A]/10 text-[#14532D] text-xs font-extrabold uppercase tracking-wider mb-2">
              <Truck className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Smart IoT Cold-Chain Command Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#14532D] tracking-tight">
              AgriBridge Fleet & Logistics Operations
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Live multi-drop telemetry, cold room temperature monitoring, and AI milk-run route consolidation.
            </p>
          </div>

          {/* Real-time Telemetry Pill */}
          <div className="flex items-center space-x-3 bg-white p-3 rounded-2xl border border-gray-200 shadow-xs text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-ping" />
            <span className="font-bold text-gray-800">4 Reefer Trucks Active</span>
            <span className="text-gray-400">|</span>
            <span className="text-emerald-700 font-semibold">Zero Thermal Excursions</span>
          </div>
        </div>

        {/* Top 4 Fleet Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold">Route Efficiency</span>
              <Navigation className="w-5 h-5 text-[#16A34A]" />
            </div>
            <div className="text-3xl font-black text-[#16A34A]">23.4%</div>
            <p className="text-xs text-gray-500 mt-1">Total transit distance reduced</p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold">Fuel Saved</span>
              <Fuel className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-3xl font-black text-amber-800">1,480 Liters</div>
            <p className="text-xs text-gray-500 mt-1">Through multi-farm milk runs</p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold">On-Time Arrival</span>
              <Clock className="w-5 h-5 text-[#14532D]" />
            </div>
            <div className="text-3xl font-black text-[#14532D]">98.2%</div>
            <p className="text-xs text-gray-500 mt-1">Strict restaurant morning slots</p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold">Post-Harvest Shrinkage</span>
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-800">0.8%</div>
            <p className="text-xs text-gray-500 mt-1">vs 18% in traditional mandi trucks</p>
          </div>
        </div>

        {/* Interactive Map Visual & Active Shipments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Active Reefer Detail & Telemetry View */}
          <div className="lg:col-span-7 bg-[#0B1F16] rounded-3xl p-6 sm:p-8 border border-[#22C55E]/30 text-white shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-[#16A34A]/30 text-[#22C55E]">
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{selectedShipment.vehicleNumber}</h3>
                  <p className="text-xs text-gray-400">Driver: {selectedShipment.driverName} • {selectedShipment.driverPhone}</p>
                </div>
              </div>

              <span className="bg-[#22C55E]/20 text-[#22C55E] font-bold text-xs px-3 py-1 rounded-full border border-[#22C55E]/40">
                {selectedShipment.status}
              </span>
            </div>

            {/* Route origin to destination */}
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Origin Farmgate</span>
                <p className="font-extrabold text-white text-sm">{selectedShipment.origin}</p>
              </div>

              <div className="flex flex-col items-center px-3">
                <span className="text-[10px] text-[#22C55E] font-bold">In-Transit ETA: {selectedShipment.eta}</span>
                <div className="w-24 h-0.5 bg-[#22C55E] my-1" />
              </div>

              <div className="text-right">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Destination Hub</span>
                <p className="font-extrabold text-white text-sm">{selectedShipment.destination}</p>
              </div>
            </div>

            {/* Live Sensors Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <Thermometer className="w-5 h-5 text-[#22C55E] mx-auto mb-1" />
                <span className="text-[10px] text-gray-400 block">Chamber Temp</span>
                <span className="text-xl font-black text-[#22C55E] font-mono">{selectedShipment.temperatureCurrent}</span>
                <span className="text-[9px] text-gray-400 block mt-0.5">Target: {selectedShipment.temperatureTarget}</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <span className="text-[10px] text-gray-400 block">Reefer Humidity</span>
                <span className="text-xl font-black text-blue-400 font-mono">{selectedShipment.humidity}</span>
                <span className="text-[9px] text-gray-400 block mt-0.5">Optimal Freshness</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center col-span-2 sm:col-span-1">
                <Clock className="w-5 h-5 text-[#FACC15] mx-auto mb-1" />
                <span className="text-[10px] text-gray-400 block">Consignment Load</span>
                <span className="text-xl font-black text-white font-mono">{selectedShipment.cargoWeightTons} Tons</span>
                <span className="text-[9px] text-gray-400 block mt-0.5">{selectedShipment.produceType}</span>
              </div>
            </div>

            {/* Waypoints Timeline */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Milk-run Transit Waypoints
              </h4>
              <div className="space-y-2 text-xs">
                {selectedShipment.waypoints.map((wp, idx) => (
                  <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#16A34A]/30 text-[#22C55E] flex items-center justify-center font-bold text-[10px]">
                        0{idx + 1}
                      </span>
                      <div>
                        <span className="font-bold text-white">{wp.location}</span>
                        <span className="text-[10px] text-gray-400 block">({wp.type})</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      wp.status === 'Completed' ? 'bg-[#22C55E]/20 text-[#22C55E]' :
                      wp.status === 'In Transit' ? 'bg-[#FACC15]/20 text-[#FACC15]' : 'text-gray-400'
                    }`}>
                      {wp.status} • {wp.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: AI Load Pooling Simulator & Fleet Table */}
          <div className="lg:col-span-5 space-y-6">
            {/* AI Load Pooling Optimizer Box */}
            <div className="bg-white rounded-3xl p-6 border border-[#16A34A]/20 shadow-md space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2.5 rounded-xl bg-[#14532D] text-white">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#14532D]">AI Multi-Drop Load Pooling</h3>
                  <p className="text-xs text-gray-500">Consolidate neighboring farm lots to avoid deadhead runs</p>
                </div>
              </div>

              <div className="p-4 bg-[#F8FAF5] rounded-2xl border border-gray-200 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-gray-800">
                  <span>Candidate Pickups:</span>
                  <span className="text-[#14532D]">2 Nearby FPOs (Nashik Belt)</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Available Spare Reefer Payload:</span>
                  <span>1.8 Tons (45% Volume)</span>
                </div>
                <div className="flex items-center justify-between text-emerald-800 font-extrabold pt-1 border-t">
                  <span>Predicted Carbon / Cost Savings:</span>
                  <span>-₹6,400 Transit Cost</span>
                </div>
              </div>

              <button
                id="optimize-load-pool-btn"
                onClick={handleSimulateLoadPool}
                disabled={isSimulatingOptimization}
                className="w-full py-3.5 bg-[#14532D] hover:bg-[#16A34A] text-white rounded-2xl font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-[#FACC15]" />
                <span>{isSimulatingOptimization ? 'Calculating Neural Dispatch...' : 'Run AI Load Optimization'}</span>
              </button>

              {routeOptimized && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Consolidated Devgad + Ratnagiri loads into single outbound corridor.</span>
                </div>
              )}
            </div>

            {/* Active Fleet List */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
              <h3 className="font-black text-base text-[#14532D]">Active Refrigerated Fleet</h3>

              <div className="space-y-3">
                {mockShipments.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedShipment(s)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedShipment.id === s.id
                        ? 'border-[#16A34A] bg-[#16A34A]/5 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-[#F8FAF5]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 font-bold text-xs text-gray-900">
                        <Truck className="w-4 h-4 text-[#14532D]" />
                        <span>Reefer #{s.code}</span>
                      </div>
                      <span className="text-[10px] font-black text-[#16A34A] bg-emerald-100 px-2 py-0.5 rounded-full">
                        {s.temperatureC}°C
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1 flex justify-between">
                      <span>{s.productName} ({s.quantityTons}T)</span>
                      <span className="font-semibold text-gray-800">ETA: {s.eta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
