import React, { useEffect } from 'react';
import { CheckCircle, X, Info } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show, onClose]);

  if (!toast.show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-short">
      <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-sky-400 dark:border-cyan-500/50 shadow-2xl shadow-slate-400/30 dark:shadow-cyan-950/80 text-slate-900 dark:text-white backdrop-blur-xl flex items-start gap-3 transition-colors">
        <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
          <CheckCircle className="w-5 h-5" />
        </div>

        <div className="flex-1 space-y-1">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {toast.title}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {toast.message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1"
          aria-label="Đóng thông báo"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
