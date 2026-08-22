import React from 'react';
import { 
  ShieldCheck, 
  Radio, 
  Headphones, 
  Globe, 
  ArrowRight, 
  Wifi, 
  Anchor, 
  CheckCircle2, 
  Activity, 
  Satellite,
  Compass,
  Cpu,
  Ship
} from 'lucide-react';
import { companyInfo } from '../data/mockData';

export default function Hero({ onOpenQuote, onSelectTab }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleExploreProducts = () => {
    onSelectTab('me-spares');
    scrollTo('products');
  };

  const handleExploreSatellite = () => {
    onSelectTab('telecom-services');
    scrollTo('products');
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-sky-50/60 via-slate-50 to-white dark:from-navy-950 dark:via-navy-950 dark:to-navy-950 overflow-hidden flex items-center transition-colors duration-300">
      
      {/* Background Graphic Elements & Maritime Grid */}
      <div className="absolute inset-0 maritime-grid-pattern opacity-30 dark:opacity-40 pointer-events-none"></div>
      
      {/* Ocean Tech Glowing Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-sky-400/20 dark:bg-sky-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-cyan-400/15 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-ocean opacity-50 dark:opacity-100 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Mission, Headlines, Actions & Badges */}
          <div className="lg:col-span-7 space-y-7 text-left">

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-900 dark:text-white tracking-tight md:!leading-[1.15] transition-colors">
              Giải Pháp Toàn Diện Cho Ngành Hàng Hải –{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 dark:from-sky-400 dark:via-cyan-300 dark:to-teal-300">
                Vật Tư Chính Hãng
              </span>{' '}
              & Kết Nối Vệ Tinh Không Giới Hạn
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal transition-colors">
              Đồng hành cùng các đội tàu viễn dương và nội địa: Cung ứng hỏa tốc phụ tùng máy chính, 
              thiết bị cứu sinh SOLAS đạt chuẩn Class quốc tế cùng hạ tầng internet vệ tinh 
              <strong className="text-sky-700 dark:text-cyan-300 font-semibold"> Starlink Maritime & VSAT </strong> 
              băng thông cao, cam kết hỗ trợ kỹ thuật trực chiến 24/7 tại mọi phao số 0.
            </p>

            {/* 2 CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={handleExploreProducts}
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 text-sm sm:text-base font-bold text-white dark:text-navy-950 rounded-xl bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 dark:from-cyan-400 dark:via-sky-400 dark:to-cyan-300 hover:from-sky-500 hover:to-cyan-500 dark:hover:from-cyan-300 dark:hover:to-sky-300 shadow-lg shadow-sky-600/25 dark:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Anchor className="w-5 h-5 text-white dark:text-navy-950" />
                <span>Khám phá Vật tư Tàu biển</span>
                <ArrowRight className="w-4 h-4 text-white dark:text-navy-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleExploreSatellite}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 text-sm sm:text-base font-bold text-slate-800 dark:text-white rounded-xl bg-white dark:bg-navy-900/80 hover:bg-slate-50 dark:hover:bg-navy-850 border border-slate-300 dark:border-sky-500/40 hover:border-sky-500 dark:hover:border-cyan-400 shadow-md shadow-slate-200/80 dark:shadow-navy-950/50 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Radio className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
                <span>Tư vấn Giải pháp Vệ tinh</span>
              </button>
            </div>

            {/* 3 Highlight Badges Required */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 transition-colors">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                
                {/* Badge 1 */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-navy-900/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none backdrop-blur hover:border-sky-400 dark:hover:border-cyan-500/40 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Trực chiến kỹ thuật</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Hỗ trợ 24/7</div>
                  </div>
                </div>

                {/* Badge 2 */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-navy-900/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none backdrop-blur hover:border-sky-400 dark:hover:border-cyan-500/40 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">CO/CQ & Class</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">100% Chính Hãng</div>
                  </div>
                </div>

                {/* Badge 3 */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-navy-900/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none backdrop-blur hover:border-sky-400 dark:hover:border-cyan-500/40 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Starlink & VSAT</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Phủ Sóng Toàn Cầu</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Maritime Tech Telemetry & Radar Terminal Simulation */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative backdrop glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-sky-600 rounded-3xl blur-xl opacity-20 dark:opacity-30 group-hover:opacity-60 transition duration-1000"></div>

              {/* Main Terminal Box */}
              <div className="relative rounded-2xl bg-navy-950 dark:bg-navy-900/95 border border-sky-500/30 p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-5 text-white">
                
                {/* Header of Terminal */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-400 pl-2">HOANG YEN MARINE MONITOR v4.2</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    LIVE LINK
                  </div>
                </div>

                {/* Simulated Radar Visual & Vessel Telemetry */}
                <div className="relative aspect-square w-full rounded-2xl bg-navy-900 dark:bg-navy-950 border border-slate-800/80 overflow-hidden flex items-center justify-center">
                  
                  {/* Concentric Radar Rings */}
                  <div className="absolute w-[75%] h-[75%] rounded-full border border-cyan-500/20"></div>
                  <div className="absolute w-[50%] h-[50%] rounded-full border border-cyan-500/30"></div>
                  <div className="absolute w-[25%] h-[25%] rounded-full border border-cyan-500/40"></div>
                  
                  {/* Crosshairs */}
                  <div className="absolute w-full h-[1px] bg-cyan-500/15"></div>
                  <div className="absolute h-full w-[1px] bg-cyan-500/15"></div>

                  {/* Rotating Radar Sweep */}
                  <div className="absolute inset-0 flex items-center justify-center animate-radar origin-center pointer-events-none">
                    <div className="w-3/4 h-[2px] bg-gradient-to-r from-transparent to-cyan-400 origin-left shadow-[0_0_8px_#22d3ee]"></div>
                  </div>

                  {/* Simulated Vessel Targets */}
                  <div className="absolute top-[22%] right-[12%] flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-cyan-300 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span>Tàu PVT HERCULES</span>
                  </div>
                  <div className="absolute bottom-[22%] left-[10%] flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-sky-300">
                    <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                    <span>Tàu VOSCO STAR</span>
                  </div>

                  {/* Center Node */}
                  <div className="relative z-10 w-10 h-10 rounded-full bg-navy-900 border border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                    <Ship className="w-5 h-5 text-cyan-300" />
                  </div>

                  {/* Bottom Telemetry Overlay */}
                  <div className="absolute bottom-3 right-3 text-[10px] sm:text-xs font-mono text-slate-400 bg-navy-900/90 px-2.5 py-1 rounded-lg border border-slate-700">
                    LAT: 20°52'N | LON: 106°41'E
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
