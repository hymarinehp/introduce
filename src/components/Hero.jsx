import React from 'react';
import {
  ShieldCheck,
  Radio,
  Headphones,
  Globe,
  ArrowRight,
  Anchor,
  Ship
} from 'lucide-react';

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
      <div className="absolute top-0 sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-ocean opacity-50 dark:opacity-100 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">

        {/* Main Title at the top */}
        {/* <div className="text-center max-w-4xl mx-auto mb-10 lg:mb-14">

        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Column: Mission, Actions & Badges */}
          <div className="lg:col-span-8 space-y-7 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight transition-colors">
              Giải Pháp Hàng Hải Toàn Diện
            </h1>
            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal transition-colors">
              Đồng hành đội tàu với phụ tùng chính hãng, thiết bị SOLAS, internet vệ tinh Starlink/VSAT và hỗ trợ kỹ thuật 24/7.
            </p>

            {/* 2 CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={handleExploreProducts}
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 text-sm sm:text-base font-bold text-white dark:text-navy-950 rounded-xl bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 dark:from-cyan-400 dark:via-sky-400 dark:to-cyan-300 hover:from-sky-500 hover:to-cyan-500 dark:hover:from-cyan-300 dark:hover:to-sky-300 shadow-lg shadow-sky-600/25 dark:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Anchor className="w-5 h-5 text-white dark:text-navy-950" />
                <span>Khám phá Vật tư tàu biển</span>
                <ArrowRight className="w-4 h-4 text-white dark:text-navy-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleExploreSatellite}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 text-sm sm:text-base font-bold text-slate-800 dark:text-white rounded-xl bg-white dark:bg-navy-900/80 hover:bg-slate-50 dark:hover:bg-navy-850 border border-slate-300 dark:border-sky-500/40 hover:border-sky-500 dark:hover:border-cyan-400 shadow-md shadow-slate-200/80 dark:shadow-navy-950/50 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Radio className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
                <span>Tư vấn giải pháp vệ tinh</span>
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
                    <div className="text-sm font-bold text-slate-900 dark:text-white">100% Chính hãng</div>
                  </div>
                </div>

                {/* Badge 3 */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-navy-900/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none backdrop-blur hover:border-sky-400 dark:hover:border-cyan-500/40 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Starlink & VSAT</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Phủ sóng toàn cầu</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Maritime Radar (Transparent background, high visibility lines) */}
          <div className="lg:col-span-4 hidden sm:flex justify-center items-center">
            <div className="relative w-full max-w-[420px] aspect-square bg-transparent flex items-center justify-center">

              {/* Concentric Radar Rings */}
              <div className="absolute w-[80%] h-[80%] rounded-full border-2 border-sky-500/50 dark:border-cyan-400/40 shadow-[0_0_8px_rgba(14,165,233,0.25)]"></div>
              <div className="absolute w-[55%] h-[55%] rounded-full border-2 border-sky-600/70 dark:border-cyan-400/70 shadow-[0_0_10px_rgba(14,165,233,0.35)]"></div>
              <div className="absolute w-[30%] h-[30%] rounded-full border-2 border-sky-600 dark:border-cyan-300 shadow-[0_0_12px_rgba(14,165,233,0.45)]"></div>

              {/* Crosshairs (trục tung & hoành dài bằng vòng tròn thứ 2) */}
              <div className="absolute w-[80%] h-[2px] bg-sky-600 dark:bg-cyan-400 shadow-[0_0_8px_rgba(14,165,233,0.6)]"></div>
              <div className="absolute h-[80%] w-[2px] bg-sky-600 dark:bg-cyan-400 shadow-[0_0_8px_rgba(14,165,233,0.6)]"></div>

              {/* Rotating Radar Sweep */}
              <div className="absolute inset-0 flex items-center justify-center animate-radar origin-center pointer-events-none">
                <div className="w-[55%] h-[2.5px] bg-gradient-to-r from-transparent via-sky-500 to-cyan-400 dark:via-cyan-400 dark:to-cyan-300 origin-left shadow-[0_0_12px_#38bdf8]"></div>
              </div>

              {/* Center Vessel Node */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-white dark:bg-navy-950 border-2 border-sky-600 dark:border-cyan-400 flex items-center justify-center shadow-[0_0_16px_rgba(14,165,233,0.5)]">
                <Ship className="w-6 h-6 text-sky-600 dark:text-cyan-300" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
