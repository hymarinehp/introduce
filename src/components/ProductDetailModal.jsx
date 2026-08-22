import React from 'react';
import { 
  X, 
  Check, 
  FileText, 
  ShieldCheck, 
  Layers, 
  Clock, 
  Phone, 
  Zap,
  Award,
  Sparkles,
  Download
} from 'lucide-react';
import { companyInfo } from '../data/mockData';

export default function ProductDetailModal({ product, onClose, onOpenQuote }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-sky-500/40 shadow-2xl text-slate-900 dark:text-white p-6 sm:p-8 transition-colors">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Đóng modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="space-y-6">
          
          {/* Top Tag & Category */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-bold bg-sky-100 dark:bg-cyan-950 text-sky-700 dark:text-cyan-300 rounded-md border border-sky-300 dark:border-cyan-500/40">
              {product.tag}
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-slate-100 dark:bg-navy-950 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700">
              {product.subCategory}
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-md border border-emerald-300 dark:border-emerald-500/30">
              ● {product.availability}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {product.name}
          </h2>

          {/* Grid: Image + Description */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            <div className="md:col-span-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 relative h-64">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Mô tả sản phẩm:
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                  <span>Thông số kỹ thuật & Đăng kiểm:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Outstanding Features */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Đặc điểm nổi bật & Cam kết chất lượng:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-sky-800 dark:text-cyan-200 font-medium">
                    ★ {feat}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
              >
                Đóng
              </button>
              
              <button
                onClick={() => {
                  onClose();
                  onOpenQuote(product);
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 hover:from-orange-500 hover:to-amber-400 text-white text-xs font-extrabold shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {product.category === 'telecom-services' ? (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Mua Ngay Gói Cước Này</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Yêu Cầu Báo Giá Sản Phẩm Này</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
