import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AIDashboardPage } from './pages/AIDashboardPage';
import { FarmerDashboardPage } from './pages/FarmerDashboardPage';
import { BuyerDashboardPage } from './pages/BuyerDashboardPage';
import { LogisticsPage } from './pages/LogisticsPage';
import { CartDrawer } from './components/common/CartDrawer';
import { AIChatDrawer } from './components/common/AIChatDrawer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { AuthModal } from './components/common/AuthModal';
import { CompareDrawer } from './components/common/CompareDrawer';
import { ToastContainer } from './components/common/ToastContainer';
import { Bot, Sparkles, Scale } from 'lucide-react';

// Scroll to top helper on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Global Floating Widgets
const GlobalFloatingWidgets: React.FC = () => {
  const { isAIChatOpen, setIsAIChatOpen, compareItems, setIsCompareOpen } = useApp();

  return (
    <>
      {/* Compare Floating Button */}
      {compareItems.length > 0 && (
        <button
          id="global-floating-compare-btn"
          onClick={() => setIsCompareOpen(true)}
          className="fixed bottom-24 right-6 z-40 bg-white text-[#14532D] border-2 border-[#16A34A] px-4 py-3 rounded-2xl shadow-xl hover:shadow-2xl flex items-center space-x-2.5 transition-all transform hover:-translate-y-1 font-bold text-xs"
        >
          <Scale className="w-4 h-4 text-[#16A34A]" />
          <span>Compare ({compareItems.length})</span>
        </button>
      )}

      {/* Floating AI Assistant Trigger */}
      {!isAIChatOpen && (
        <button
          id="global-floating-ai-assistant-btn"
          onClick={() => setIsAIChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#14532D] via-[#16A34A] to-[#14532D] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full sm:rounded-2xl shadow-xl shadow-[#16A34A]/30 hover:shadow-2xl hover:shadow-[#16A34A]/50 flex items-center space-x-2.5 transition-all transform hover:-translate-y-1 group border border-[#22C55E]/40"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-[#FEFCE8] group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#22C55E] rounded-full border-2 border-[#14532D] animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#22C55E] rounded-full border-2 border-[#14532D]" />
          </div>
          <span className="hidden sm:inline font-black text-xs tracking-wide">
            Ask AgriAI Advisor
          </span>
        </button>
      )}
    </>
  );
};

export function AppContent() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAF5] font-sans antialiased text-[#14532D] selection:bg-[#22C55E]/30 selection:text-[#14532D]">
      <ScrollToTop />
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Routing */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/marketplace/:id" element={<ProductDetailPage />} />
          <Route path="/ai-insights" element={<AIDashboardPage />} />
          <Route path="/farmers" element={<FarmerDashboardPage />} />
          <Route path="/buyers" element={<BuyerDashboardPage />} />
          <Route path="/logistics" element={<LogisticsPage />} />
          
          {/* Dashboards Aliases */}
          <Route path="/dashboard/farmer" element={<FarmerDashboardPage />} />
          <Route path="/dashboard/buyer" element={<BuyerDashboardPage />} />
          <Route path="/dashboard/logistics" element={<LogisticsPage />} />
          <Route path="/dashboard/ai" element={<AIDashboardPage />} />
          
          {/* Catch-all fallback */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Drawers, Modals & Toast notifications */}
      <CartDrawer />
      <AIChatDrawer />
      <QuickViewModal />
      <AuthModal />
      <CompareDrawer />
      <ToastContainer />
      <GlobalFloatingWidgets />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}
