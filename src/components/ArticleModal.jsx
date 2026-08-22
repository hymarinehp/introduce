import React from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  BookOpen, 
  ChevronRight,
  Phone,
  Tag
} from 'lucide-react';
import { companyInfo } from '../data/mockData';

export default function ArticleModal({ article, onClose, onOpenQuote }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-sky-500/40 shadow-2xl text-slate-900 dark:text-white p-6 sm:p-8 transition-colors">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Đóng bài viết"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body */}
        <div className="space-y-6">
          
          {/* Header Tag & Meta */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-bold bg-sky-100 dark:bg-cyan-950 text-sky-700 dark:text-cyan-300 rounded-md border border-sky-300 dark:border-cyan-500/40">
                {article.category}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                {article.date}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
              {article.title}
            </h1>
          </div>

          {/* Hero Image */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 h-64 sm:h-72">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-xl bg-sky-50 dark:bg-navy-950/80 border-l-4 border-sky-500 dark:border-cyan-400 text-sm text-sky-900 dark:text-cyan-100 italic leading-relaxed">
            "{article.summary}"
          </div>

          {/* Article Detailed Body */}
          <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-normal">
            {article.content}
          </div>

          {/* Footer Close */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold"
            >
              Đóng bài viết
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
