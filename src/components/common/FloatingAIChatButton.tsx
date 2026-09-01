import React from 'react';
import { Sparkles, Bot } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FloatingAIChatButton: React.FC = () => {
  const { isAIChatOpen, setIsAIChatOpen } = useApp();

  if (isAIChatOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        id="floating-ask-agri-ai-btn"
        onClick={() => setIsAIChatOpen(true)}
        className="group relative flex items-center space-x-2.5 bg-gradient-to-r from-[#14532D] via-[#16A34A] to-[#14532D] text-white px-5 py-3.5 rounded-full shadow-2xl shadow-[#16A34A]/40 hover:shadow-[#22C55E]/50 hover:scale-105 transition-all duration-300 border border-[#22C55E]/40"
      >
        {/* Animated glowing radar ring */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#22C55E] to-[#FACC15] opacity-40 blur-xs group-hover:opacity-75 transition-opacity" />

        <div className="relative flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-[#22C55E] text-[#0B1F16] flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 text-[#0B1F16]" />
          </div>
          <div className="text-left font-bold text-sm tracking-wide">
            Ask AgriAI
          </div>
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
        </div>
      </button>
    </div>
  );
};
