import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  BarChart3, 
  MapPin, 
  Layers,
  Leaf
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AIChatDrawer: React.FC = () => {
  const { isAIChatOpen, setIsAIChatOpen, aiMessages, sendAIMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What should I plant next month?",
    "Which market has the highest tomato demand?",
    "How can I reduce delivery cost?",
    "Where should I sell my produce?"
  ];

  useEffect(() => {
    if (isAIChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages, isAIChatOpen]);

  if (!isAIChatOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendAIMessage(inputText);
    setInputText('');
  };

  const handleSuggestedClick = (q: string) => {
    sendAIMessage(q);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsAIChatOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-lg bg-[#0B1F16] text-[#FEFCE8] h-full shadow-2xl flex flex-col z-10 border-l border-[#16A34A]/30">
        {/* Top bar */}
        <div className="p-4 bg-[#14532D]/40 border-b border-[#16A34A]/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#16A34A] to-[#22C55E] flex items-center justify-center shadow-lg shadow-[#22C55E]/30">
              <Bot className="w-5 h-5 text-[#0B1F16]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white text-base">AgriAI Advisor</h3>
                <span className="bg-[#22C55E]/20 text-[#22C55E] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#22C55E]/40 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> 94.6% Accuracy
                </span>
              </div>
              <p className="text-xs text-gray-300">Live precision agriculture & demand intelligence</p>
            </div>
          </div>

          <button
            id="close-ai-chat-btn"
            onClick={() => setIsAIChatOpen(false)}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Prompts Carousel */}
        <div className="px-4 py-2.5 bg-[#0F291E] border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-gray-400 uppercase whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#22C55E]" /> Suggested:
          </span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestedClick(q)}
              className="text-xs text-emerald-200 bg-[#14532D]/80 hover:bg-[#16A34A]/40 border border-[#16A34A]/30 px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5"
            >
              <span>{q}</span>
              <ArrowRight className="w-3 h-3 text-[#22C55E]" />
            </button>
          ))}
        </div>

        {/* Message stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {aiMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#16A34A] text-white rounded-br-none shadow-md'
                    : 'bg-[#14532D]/50 border border-[#16A34A]/25 text-gray-100 rounded-bl-none shadow-lg'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-1.5 text-xs font-semibold text-emerald-300">
                  {msg.sender === 'ai' ? (
                    <>
                      <Bot className="w-3.5 h-3.5 text-[#22C55E]" />
                      <span>AgriAI Engine</span>
                    </>
                  ) : (
                    <span>You</span>
                  )}
                  <span className="text-gray-400 text-[10px] ml-auto">{msg.timestamp}</span>
                </div>

                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Rich Data Snippet if present */}
                {msg.dataSnippet && (
                  <div className="mt-3 p-3 rounded-xl bg-[#0B1F16] border border-[#22C55E]/30 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-[#22C55E]">
                      <span className="flex items-center gap-1.5">
                        <BarChart3 className="w-3.5 h-3.5" />
                        {msg.dataSnippet.title}
                      </span>
                      <span className="bg-[#22C55E]/20 text-[#22C55E] px-1.5 py-0.5 rounded text-[10px]">
                        Live Metric
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {msg.dataSnippet.metrics.map((m, idx) => (
                        <div key={idx} className="bg-white/5 p-2 rounded-lg border border-white/5">
                          <div className="text-[10px] text-gray-400">{m.label}</div>
                          <div className="text-xs font-bold text-white mt-0.5">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-amber-200 bg-amber-950/40 p-2 rounded-lg border border-amber-500/20">
                      💡 <strong>Action:</strong> {msg.dataSnippet.recommendation}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <form onSubmit={handleSubmit} className="p-4 bg-[#14532D]/40 border-t border-[#16A34A]/20">
          <div className="relative flex items-center">
            <input
              id="ai-chat-input-field"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about crop planting, prices, mandi trends..."
              className="w-full bg-[#0B1F16] border border-[#16A34A]/40 rounded-2xl py-3.5 pl-4 pr-12 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all"
            />
            <button
              id="send-ai-message-btn"
              type="submit"
              disabled={!inputText.trim()}
              className="absolute right-2 p-2 bg-[#22C55E] text-[#0B1F16] rounded-xl hover:bg-[#16A34A] disabled:opacity-40 disabled:cursor-not-allowed transition-all font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-400 mt-2 px-1">
            <span>Powered by AgriBridge Neural Agriculture Graph</span>
            <span>Real-time APMC Mandi Grounding</span>
          </div>
        </form>
      </div>
    </div>
  );
};
