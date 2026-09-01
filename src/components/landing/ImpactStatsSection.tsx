import React from 'react';
import { Users, TrendingUp, Sparkles, Truck } from 'lucide-react';

export const ImpactStatsSection: React.FC = () => {
  const stats = [
    {
      value: '12,480+',
      label: 'Farmers Connected',
      detail: 'Across 18 FPO grower clusters',
      icon: Users,
      color: 'text-[#16A34A]',
      bg: 'bg-[#16A34A]/10',
      border: 'border-[#16A34A]/20'
    },
    {
      value: '₹18.6 Cr',
      label: 'Value Transacted',
      detail: 'Zero middleman commission leakage',
      icon: TrendingUp,
      color: 'text-[#14532D]',
      bg: 'bg-[#14532D]/10',
      border: 'border-[#14532D]/20'
    },
    {
      value: '27%',
      label: 'Better Farmer Realization',
      detail: 'Compared to local APMC mandis',
      icon: Sparkles,
      color: 'text-amber-800',
      bg: 'bg-amber-100/60',
      border: 'border-amber-300/60'
    },
    {
      value: '31%',
      label: 'Lower Logistics Inefficiency',
      detail: 'Reefer load pooling & route AI',
      icon: Truck,
      color: 'text-emerald-700',
      bg: 'bg-emerald-100/60',
      border: 'border-emerald-300/60'
    }
  ];

  return (
    <section className="py-12 bg-white/70 border-y border-[#16A34A]/15 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl bg-white border ${stat.border} shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    Verified
                  </span>
                </div>
                <div>
                  <div className={`text-3xl sm:text-4xl font-black ${stat.color} tracking-tight font-sans`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-gray-900 mt-1">
                    {stat.label}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {stat.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
