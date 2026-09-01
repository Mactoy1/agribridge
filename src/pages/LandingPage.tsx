import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { ImpactStatsSection } from '../components/landing/ImpactStatsSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { MarketplacePreviewSection } from '../components/landing/MarketplacePreviewSection';
import { AIDemandForecastSection } from '../components/landing/AIDemandForecastSection';
import { SmartLogisticsSection } from '../components/landing/SmartLogisticsSection';
import { FarmersSection, BuyersSection } from '../components/landing/FarmersSection';
import { 
  PriceTransparencySection, 
  TrustSection, 
  TestimonialsSection, 
  EnvironmentalStatsSection, 
  FinalCTASection 
} from '../components/landing/PriceTransparencySection';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAF5]">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Impact Stats */}
      <ImpactStatsSection />

      {/* 3. How It Works Timeline */}
      <HowItWorksSection />

      {/* 4. Marketplace Preview with search & filters */}
      <MarketplacePreviewSection />

      {/* 5. AI Demand Forecast with Recharts visualization */}
      <AIDemandForecastSection />

      {/* 6. Smart Logistics with interactive route visual */}
      <SmartLogisticsSection />

      {/* 7. For Farmers & FPOs + Interactive Earnings Calculator */}
      <FarmersSection />

      {/* 8. For Buyers & Commercial Off-takers */}
      <BuyersSection />

      {/* 9. Price Transparency Comparison (Traditional vs AgriBridge) */}
      <PriceTransparencySection />

      {/* 10. Trust & Verification Badges + Farmer Dossier */}
      <TrustSection />

      {/* 11. Testimonials */}
      <TestimonialsSection />

      {/* 12. Global Environmental Stats */}
      <EnvironmentalStatsSection />

      {/* 13. Final CTA */}
      <FinalCTASection />
    </div>
  );
};
