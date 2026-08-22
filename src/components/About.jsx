import React from 'react';
import { 
  ShieldCheck, 
  Radio, 
  Headphones, 
  Gauge, 
  CheckCircle, 
  Anchor, 
  Award, 
  Clock, 
  MapPin, 
  Phone,
  Mail,
  Cog,
  Wrench,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { companyInfo, coreServicesList } from '../data/mockData';

export default function About({ onOpenQuote }) {
  return (
    <section id="about" className="py-16 lg:py-20 bg-white dark:bg-slate-900 text-slate-800 dark:text-white relative overflow-hidden transition-colors duration-300">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 dark:bg-sky-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 dark:bg-cyan-950/80 border border-sky-300 dark:border-cyan-500/30 text-sky-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Anchor className="w-3.5 h-3.5" />
            <span>Về Chúng Tôi – HOANG YEN MARINE HP</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
            Cung Cấp Toàn Diện Vật Tư & Dịch Vụ Duy Trì{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-amber-600">
              Vận Hành Tàu Biển
            </span>
          </h2>
        </div>

        {/* 3 Core Commitments Banner */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 text-white shadow-xl shadow-orange-500/15">
          <div className="text-center mb-6">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              CAM KẾT THƯƠNG HIỆU HOÀNG YẾN MARINE HP
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Chúng Tôi Cam Kết Sẽ Cung Cấp Tới Quý Công Ty
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companyInfo.commitments.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-4 hover:bg-white/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white text-orange-600 flex items-center justify-center shrink-0 shadow-lg font-black text-lg">
                  0{idx + 1}
                </div>
                <div className="text-base sm:text-lg font-bold text-white leading-snug">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Pillars Grid (Spare Parts, Deck Supplies, Repair, Satellite) */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              4 Mảng Dịch Vụ Trọng Tâm
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Giải pháp trọn gói đáp ứng đầy đủ quy chuẩn kỹ thuật hàng hải quốc tế
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServicesList.map((svc) => (
              <div 
                key={svc.id}
                className="group relative rounded-2xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-amber-500/50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-orange-500/10 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-orange-500 dark:text-amber-400">
                      {svc.number}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-amber-300 border border-orange-300 dark:border-amber-500/30">
                      Dịch vụ
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-amber-400 transition-colors">
                      {svc.title}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                      {svc.subtitle}
                    </p>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
                  {svc.items.map((it, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-orange-500 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info & Office Address Box */}
        <div className="rounded-2xl bg-white dark:bg-navy-900/90 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Info */}
            <div className="lg:col-span-6 space-y-4">
              {/* Brand Logo */}
              <div className="flex items-center gap-3 mb-1">
                <div className="relative overflow-hidden rounded-xl p-[2px] bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 shadow-md shadow-orange-500/20 shrink-0">
                  <img
                    src="/MARINEHP.jpg"
                    alt="HOANG YEN MARINE HP"
                    className="w-10 h-10 object-cover rounded-[10px] bg-white"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xl font-black text-slate-900 dark:text-white tracking-wider uppercase leading-none font-sans">
                    HOANG YEN
                  </span>
                  <span className="text-xs font-semibold tracking-[0.18em] text-slate-600 dark:text-slate-300 uppercase leading-snug font-sans mt-0.5">
                    MARINE HP
                  </span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Công Ty TNHH Hoàng Yến Marine HP
              </h3>
              
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0 mt-1" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Địa chỉ: </strong>
                    <span>{companyInfo.mainAddress}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Email: </strong>
                    <a href={`mailto:${companyInfo.emailQuote}`} className="text-sky-600 dark:text-cyan-400 font-medium hover:underline">{companyInfo.emailQuote}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0 mt-1" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Hotline 24/7:</strong>
                    <div className="flex flex-col space-y-1 mt-0.5">
                      {companyInfo.hotlines.map((h, i) => (
                        <a key={i} href={`tel:${h.replace(/\s+/g, '')}`} className="font-semibold text-sky-600 dark:text-cyan-400 hover:underline font-mono">
                          {h}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenQuote()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-sm shadow-md transition-all"
                >
                  <span>Gửi Yêu Cầu Báo Giá</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Company Description */}
            <div className="lg:col-span-6 space-y-3 text-xs text-justify sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 pt-6 lg:pt-0 lg:pl-8">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                <span>Giới Thiệu</span>
              </div>
              {companyInfo.fullDescription.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

          </div>
        </div>

        {/* Stats Counter Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12">
          {companyInfo.stats.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800 text-center space-y-1 shadow-sm dark:shadow-none transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 dark:from-amber-400 dark:to-orange-400 font-mono">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
