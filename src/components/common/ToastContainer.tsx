import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-white border-[#16A34A]/30 text-[#14532D] shadow-xl';
        let icon = <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />;

        if (toast.type === 'info') {
          bg = 'bg-white border-blue-200 text-blue-900 shadow-xl';
          icon = <Info className="w-5 h-5 text-blue-600 shrink-0" />;
        } else if (toast.type === 'warning') {
          bg = 'bg-white border-amber-200 text-amber-900 shadow-xl';
          icon = <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl border flex items-start space-x-3 transition-all duration-300 transform translate-y-0 ${bg}`}
          >
            {icon}
            <div className="flex-1">
              <h5 className="text-xs font-extrabold">{toast.title}</h5>
              <p className="text-xs text-gray-600 mt-0.5 leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-black p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
