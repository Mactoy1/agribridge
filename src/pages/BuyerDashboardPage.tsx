import React, { useState } from 'react';
import { 
  Building2, 
  Utensils, 
  Package, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Truck, 
  TrendingDown, 
  FileText, 
  Repeat, 
  Star, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const BuyerDashboardPage: React.FC = () => {
  const { user, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'subscriptions' | 'cooperatives'>('orders');

  const [orders, setOrders] = useState([
    {
      id: 'PO-2026-901',
      crop: 'Ratnagiri Alphonso Mango (Grade A)',
      fpo: 'Konkan Krishi Vikas FPO',
      qty: '150 kg',
      total: '₹27,000',
      status: 'Out for Delivery',
      eta: 'Today, 11:30 AM',
      temp: '13.2°C Active Reefer',
      driver: 'Mahesh Patil (MH-08-AG-4912)'
    },
    {
      id: 'PO-2026-884',
      crop: 'Nashik Organic Roma Tomatoes',
      fpo: 'Sahyadri Farmers Co.',
      qty: '300 kg',
      total: '₹8,400',
      status: 'Delivered',
      eta: 'Delivered Yesterday',
      temp: '14.0°C Verified',
      driver: 'Suresh Rao (MH-15-BT-1122)'
    }
  ]);

  const subscriptions = [
    { crop: 'Organic Roma Tomatoes', schedule: 'Every Tue & Fri (50kg)', fpo: 'Sahyadri Farmers Co.', rate: '₹28/kg Locked' },
    { crop: 'Nashik Red Onions', schedule: 'Every Monday (100kg)', fpo: 'Godavari FPO Collective', rate: '₹34/kg Locked' },
    { crop: 'Devgad Alphonso Mangoes', schedule: 'Weekly Harvest Drop (40kg)', fpo: 'Konkan Krishi Vikas', rate: '₹180/kg Locked' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF5] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-gray-500 mb-1">
              <span className="font-bold text-[#16A34A]">Commercial Portal</span>
              <span>•</span>
              <span className="text-gray-800 font-semibold">{user ? `${user.name} (${user.role})` : 'Hospitality & Bulk Off-taker'}</span>
            </div>
            <h1 className="text-3xl font-black text-[#14532D]">Commercial Procurement Suite</h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Track farmgate consignments, manage scheduled recurring deliveries, and inspect lot lab certificates.
            </p>
          </div>

          <Link
            to="/marketplace"
            className="px-6 py-3.5 bg-[#14532D] hover:bg-[#16A34A] text-white rounded-2xl font-extrabold text-xs shadow-lg shadow-[#16A34A]/25 transition-all flex items-center space-x-2 active:scale-95"
          >
            <span>Procure Produce</span>
            <ArrowRight className="w-4 h-4 text-[#22C55E]" />
          </Link>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-bold">Active Orders</span>
              <Package className="w-5 h-5 text-[#16A34A]" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-black text-[#14532D]">1 Consignment</div>
              <p className="text-xs text-gray-500 mt-0.5">150 kg in transit</p>
            </div>
            <div className="text-[11px] text-[#16A34A] font-bold">Cold Chain Monitored</div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-bold">Monthly Spend Saved</span>
              <TrendingDown className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-black text-emerald-800">₹34,200</div>
              <p className="text-xs text-gray-500 mt-0.5">vs APMC Mandi Markups</p>
            </div>
            <div className="text-[11px] text-emerald-700 font-bold">22.4% Net Savings</div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-bold">Recurring Schedules</span>
              <Repeat className="w-5 h-5 text-amber-600" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-black text-gray-900">3 Subscriptions</div>
              <p className="text-xs text-gray-500 mt-0.5">Automated kitchen drops</p>
            </div>
            <div className="text-[11px] text-amber-700 font-bold">Guaranteed morning ETA</div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-bold">Traceability Quality</span>
              <Star className="w-5 h-5 text-[#FACC15] fill-current" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-black text-gray-900">4.94 / 5.0</div>
              <p className="text-xs text-gray-500 mt-0.5">0% transit bruising rate</p>
            </div>
            <div className="text-[11px] text-[#16A34A] font-bold">100% GAP Certified</div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
          {[
            { key: 'orders', label: 'Procurement Orders & Shipments' },
            { key: 'subscriptions', label: 'Automated Harvest Drops' },
            { key: 'cooperatives', label: 'Direct Partner FPOs (4)' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === tab.key
                  ? 'bg-[#14532D] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map((ord) => (
              <div key={ord.id} className="p-6 bg-white rounded-3xl border border-gray-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-xs text-[#14532D]">{ord.id}</span>
                    <span className="bg-[#16A34A]/10 text-[#14532D] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      {ord.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-gray-900">{ord.crop}</h3>
                  <p className="text-xs text-gray-500">
                    Grower FPO: <strong>{ord.fpo}</strong> • {ord.qty}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-gray-600">
                    <span className="flex items-center gap-1 text-blue-700 font-semibold">
                      <Truck className="w-3.5 h-3.5" /> {ord.temp}
                    </span>
                    <span>•</span>
                    <span className="text-gray-500">ETA: <strong className="text-gray-900">{ord.eta}</strong></span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:text-right">
                  <div>
                    <span className="text-xs text-gray-400 block">Total Escrow Billed</span>
                    <span className="text-2xl font-black text-[#14532D]">{ord.total}</span>
                    <span className="text-[10px] text-emerald-800 font-bold block">Digital Invoice Generated</span>
                  </div>

                  <div className="space-y-2 w-full sm:w-auto">
                    <button
                      onClick={() => showToast('Receipt Downloaded', `Invoice for ${ord.id} downloaded`, 'info')}
                      className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Download Receipt</span>
                    </button>
                    <Link
                      to="/logistics"
                      className="w-full px-4 py-2 bg-[#14532D] hover:bg-[#16A34A] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5 text-[#22C55E]" />
                      <span>Live Reefer GPS</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Recurring Subscriptions */}
        {activeTab === 'subscriptions' && (
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="font-black text-base text-[#14532D]">Standing Farm Supply Schedules</h3>
                <p className="text-xs text-gray-500">Automated harvest drops locked at negotiated farmgate rates</p>
              </div>
              <button
                onClick={() => showToast('Subscription Flow', 'Select any crop in the marketplace to add a recurring schedule', 'info')}
                className="px-4 py-2 bg-[#14532D] text-white rounded-xl text-xs font-bold"
              >
                + New Harvest Schedule
              </button>
            </div>

            <div className="space-y-3">
              {subscriptions.map((sub, idx) => (
                <div key={idx} className="p-4 bg-[#F8FAF5] rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#14532D]">{sub.crop}</h4>
                    <p className="text-gray-500 mt-0.5">{sub.fpo} • <strong className="text-gray-800">{sub.schedule}</strong></p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-black text-base text-[#16A34A]">{sub.rate}</span>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px]">
                      Active Recurring
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Direct Partner FPOs */}
        {activeTab === 'cooperatives' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Konkan Krishi Vikas FPO', location: 'Devgad, Maharashtra', crops: 'Alphonso Mango, Cashews', farmers: '840 Farmers', cert: 'NPOP Organic' },
              { name: 'Sahyadri Farmers Producer Co.', location: 'Nashik, Maharashtra', crops: 'Tomatoes, Grapes, Onions', farmers: '2,400 Farmers', cert: 'Global GAP' },
              { name: 'Malwa Agro Producer Org', location: 'Indore, Madhya Pradesh', crops: 'Potatoes, Sharbati Wheat', farmers: '1,120 Farmers', cert: 'FSSAI Certified' },
              { name: 'Kalyana Karnataka FPO', location: 'Gulbarga, Karnataka', crops: 'Red Gram, Pulses, Millets', farmers: '980 Farmers', cert: 'Chemical-Free' }
            ].map((fpo, idx) => (
              <div key={idx} className="p-5 bg-white rounded-3xl border border-gray-200 shadow-xs flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-base text-[#14532D]">{fpo.name}</h4>
                    <span className="text-[10px] font-bold text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded-full">
                      {fpo.cert}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" /> {fpo.location}
                  </p>
                  <div className="mt-2 text-xs text-gray-700">
                    Key Crops: <strong className="text-[#14532D]">{fpo.crops}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-semibold">{fpo.farmers}</span>
                  <Link to="/marketplace" className="text-[#16A34A] font-bold hover:underline">
                    Browse FPO Lots →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
