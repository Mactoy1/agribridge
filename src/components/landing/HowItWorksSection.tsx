import React, { useState } from 'react';
import { Sprout, ShoppingCart, Cpu, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Farmer Lists Produce',
      subtitle: 'Digital Farmgate Onboarding',
      desc: 'Farmers and FPOs list upcoming or harvested crops with transparent photos, soil quality, quantity, and grade specs directly from their phone.',
      icon: Sprout,
      color: 'from-[#14532D] to-[#16A34A]',
      accentText: 'text-[#16A34A]',
      details: ['Zero listing fees', 'Instant digital grading', 'Fair floor price recommendation']
    },
    {
      num: '02',
      title: 'Buyers Discover & Order',
      subtitle: 'Direct Farmgate Marketplace',
      desc: 'Restaurants, supermarkets, retailers, and bulk food processors discover single-origin produce, inspect lab certificates, and lock procurement orders.',
      icon: ShoppingCart,
      color: 'from-[#16A34A] to-[#22C55E]',
      accentText: 'text-[#22C55E]',
      details: ['Bulk volume discounts', 'Custom harvest scheduling', 'Bank-grade escrow security']
    },
    {
      num: '03',
      title: 'AI Predicts Demand',
      subtitle: 'Neural Production Intelligence',
      desc: 'Our proprietary machine learning models analyze 8-month mandi trends, regional rainfall, restaurant footfall, and seasonal surges to align harvest timing.',
      icon: Cpu,
      color: 'from-[#14532D] to-[#8B5E34]',
      accentText: 'text-amber-800',
      details: ['94.6% forecast accuracy', 'Prevent crop glut & distress selling', 'Dynamic price hedging']
    },
    {
      num: '04',
      title: 'Smart Logistics Delivers',
      subtitle: 'IoT Cold-Chain Network',
      desc: 'Consolidated milk-run routes and multi-temperature reefer trucks pick up produce directly from rural collection points and deliver fresh within hours.',
      icon: Truck,
      color: 'from-[#0B1F16] to-[#14532D]',
      accentText: 'text-emerald-800',
      details: ['Live GPS & temp telemetry', '23% route distance reduced', 'Zero transit shrinkage']
    }
  ];

  return (
    <section className="py-20 bg-[#F8FAF5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#16A34A]/10 text-[#14532D] text-xs font-extrabold uppercase tracking-wider">
            <span>Seamless 4-Step Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#14532D] tracking-tight">
            How AgriBridge Powers Direct Food Trade
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Eliminating 5 layers of commission agents, price cartels, and post-harvest spoilage with AI and connected logistics.
          </p>
        </div>

        {/* 4-Step Interactive Grid with Connecting Line */}
        <div className="relative">
          {/* Connecting Desktop Line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-[#16A34A] via-[#22C55E] to-[#14532D] -translate-y-12 z-0 opacity-30" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = activeStep === idx;

              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                    isCurrent
                      ? 'bg-white border-[#16A34A] shadow-xl shadow-[#16A34A]/15 scale-102'
                      : 'bg-white/80 border-gray-200/80 hover:border-[#16A34A]/40 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Step badge & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-black text-gray-300 font-mono">
                        {step.num}
                      </span>
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${step.color} text-white flex items-center justify-center shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block mb-1">
                      {step.subtitle}
                    </span>
                    <h3 className="text-lg font-extrabold text-[#14532D] mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bullet points */}
                  <div className="pt-4 border-t border-gray-100 space-y-1.5">
                    {step.details.map((detail, i) => (
                      <div key={i} className="flex items-center space-x-1.5 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
