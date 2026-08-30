import React, { useRef, useEffect } from 'react';
import { 
  Handshake, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

export default function PartnerSection() {
  const scrollRef = useRef(null);

  const baseLogos = [
    "./partner1.png",
    "./partner2.jpg",
    "./partner3.jpg",
    "./partner4.jpg",
    "./partner5.jpg",
    "./partner6.png",
    "./partner7.png",
    "./partner8.png",
    "./partner9.jpg"
  ];

  // Repeat logos 3 times to create a seamless infinite loop
  const partnerLogos = [...baseLogos, ...baseLogos, ...baseLogos];

  // Set initial scroll to middle set on mount
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
    }
  }, []);

  const handleScrollEvent = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const singleSetWidth = container.scrollWidth / 3;

    // Reset position silently when crossing boundary
    if (container.scrollLeft >= singleSetWidth * 2) {
      container.style.scrollBehavior = 'auto';
      container.scrollLeft -= singleSetWidth;
      container.style.scrollBehavior = 'smooth';
    } else if (container.scrollLeft <= 5) {
      container.style.scrollBehavior = 'auto';
      container.scrollLeft += singleSetWidth;
      container.style.scrollBehavior = 'smooth';
    }
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const firstCard = container.firstElementChild;
      if (firstCard) {
        const style = window.getComputedStyle(container);
        const gap = parseFloat(style.gap) || 24;
        const itemWidth = firstCard.offsetWidth + gap;
        container.scrollBy({
          left: direction === 'next' ? itemWidth : -itemWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section id="partners" className="py-20 lg:py-24 bg-slate-100/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/5 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 dark:bg-cyan-950/80 border border-sky-300 dark:border-cyan-500/30 text-sky-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Handshake className="w-3.5 h-3.5" />
            <span>Đối Tác Tin Cậy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 dark:from-sky-400 dark:via-cyan-300 dark:to-teal-300">
              Đối tác & Chủ tàu tin cậy
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg transition-colors">
            Hoàng Yến Marine HP tự hào đồng hành cùng các tập đoàn hàng hải, hãng tàu viễn dương và công ty quản lý kỹ thuật quốc tế.
          </p>
        </div>

        {/* Carousel Container with Left & Right Arrow Buttons */}
        <div className="relative flex items-center gap-2 sm:gap-4">
          
          {/* Previous (Left) Button */}
          <button
            onClick={() => handleScroll('prev')}
            className="p-2.5 sm:p-3 rounded-full bg-white dark:bg-navy-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-cyan-300 transition-all shadow-lg shrink-0 z-20 active:scale-95"
            aria-label="Đối tác trước"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Logos Slider View */}
          <div 
            ref={scrollRef}
            onScroll={handleScrollEvent}
            className="flex-grow flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth py-3 px-2"
          >
            {partnerLogos.map((src, idx) => (
              <div 
                key={idx} 
                className="w-[70%] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] shrink-0 snap-center flex"
              >
                <div className="w-full h-32 sm:h-36 rounded-2xl bg-white dark:bg-navy-900/90 border border-slate-200 dark:border-slate-800/90 hover:border-sky-400 dark:hover:border-cyan-500/50 p-4 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10 dark:hover:shadow-cyan-500/10 group">
                  <img
                    src={src}
                    alt={`Partner ${(idx % baseLogos.length) + 1}`}
                    className="max-h-full max-w-full object-contain filter dark:brightness-110 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Next (Right) Button */}
          <button
            onClick={() => handleScroll('next')}
            className="p-2.5 sm:p-3 rounded-full bg-white dark:bg-navy-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-300 transition-all shadow-lg shrink-0 z-20 active:scale-95"
            aria-label="Đối tác tiếp"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

        </div>

      </div>
    </section>
  );
}
