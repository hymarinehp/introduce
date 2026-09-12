import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  Handshake, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

export default function PartnerSection() {
  const scrollRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const isHoveredRef = useRef(false);
  const animFrameIdRef = useRef(null);
  const smoothScrollAnimRef = useRef(null);

  const [isGrabbing, setIsGrabbing] = useState(false);

  const baseLogos = [
    "./partner1.png",
    "./partner2.jpg",
    "./partner3.jpg",
    "./partner4.jpg",
    "./partner5.jpg",
    "./partner7.png",
    "./partner8.png",
    "./partner9.jpg"
  ];

  // Repeat logos 4 times to ensure seamless infinite looping on all screen sizes
  const partnerLogos = [...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos];

  // Keep scroll position wrapped within the middle range
  const checkInfiniteBounds = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const singleSetWidth = container.scrollWidth / 4;

    if (container.scrollLeft >= singleSetWidth * 2.5) {
      container.scrollLeft -= singleSetWidth;
    } else if (container.scrollLeft <= singleSetWidth * 0.5) {
      container.scrollLeft += singleSetWidth;
    }
  }, []);

  // Set initial scroll position to middle set on mount
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const singleSetWidth = container.scrollWidth / 4;
      container.scrollLeft = singleSetWidth;
    }
  }, []);

  // Continuous subtle auto-scroll marquee (60fps)
  useEffect(() => {
    let lastTime = performance.now();

    const autoScrollLoop = (currentTime) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      const container = scrollRef.current;
      if (
        container &&
        !isHoveredRef.current &&
        !isDraggingRef.current &&
        !smoothScrollAnimRef.current
      ) {
        // Speed: ~35 pixels per second for silky smooth continuous movement
        const movePixels = (35 * delta) / 1000;
        container.scrollLeft += movePixels;
        checkInfiniteBounds();
      }

      animFrameIdRef.current = requestAnimationFrame(autoScrollLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(autoScrollLoop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [checkInfiniteBounds]);

  // Smooth custom cubic animation for Next/Prev clicks
  const smoothScrollTo = (targetScrollLeft, duration = 400) => {
    const container = scrollRef.current;
    if (!container) return;

    if (smoothScrollAnimRef.current) {
      cancelAnimationFrame(smoothScrollAnimRef.current);
    }

    const start = container.scrollLeft;
    const distance = targetScrollLeft - start;
    let startTime = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutCubic(progress);

      container.scrollLeft = start + distance * ease;
      checkInfiniteBounds();

      if (progress < 1) {
        smoothScrollAnimRef.current = requestAnimationFrame(step);
      } else {
        smoothScrollAnimRef.current = null;
        checkInfiniteBounds();
      }
    };

    smoothScrollAnimRef.current = requestAnimationFrame(step);
  };

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const firstCard = container.firstElementChild;
    if (firstCard) {
      const style = window.getComputedStyle(container);
      const gap = parseFloat(style.gap) || 24;
      const itemWidth = firstCard.offsetWidth + gap;
      const target = direction === 'next' 
        ? container.scrollLeft + itemWidth * 1.5 
        : container.scrollLeft - itemWidth * 1.5;

      smoothScrollTo(target, 450);
    }
  };

  // Mouse Drag handlers
  const handleMouseDown = (e) => {
    const container = scrollRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    setIsGrabbing(true);
    startXRef.current = e.pageX - container.offsetLeft;
    startScrollLeftRef.current = container.scrollLeft;

    if (smoothScrollAnimRef.current) {
      cancelAnimationFrame(smoothScrollAnimRef.current);
      smoothScrollAnimRef.current = null;
    }
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const container = scrollRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.2; // 1.2x multiplier for responsive feel
    container.scrollLeft = startScrollLeftRef.current - walk;
    checkInfiniteBounds();
  };

  const handleMouseUpOrLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsGrabbing(false);
      checkInfiniteBounds();
    }
  };

  // Touch Handlers for mobile swipe
  const handleTouchStart = (e) => {
    const container = scrollRef.current;
    if (!container || e.touches.length === 0) return;

    isDraggingRef.current = true;
    startXRef.current = e.touches[0].pageX - container.offsetLeft;
    startScrollLeftRef.current = container.scrollLeft;

    if (smoothScrollAnimRef.current) {
      cancelAnimationFrame(smoothScrollAnimRef.current);
      smoothScrollAnimRef.current = null;
    }
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || !scrollRef.current || e.touches.length === 0) return;
    const container = scrollRef.current;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    container.scrollLeft = startScrollLeftRef.current - walk;
    checkInfiniteBounds();
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    checkInfiniteBounds();
  };

  return (
    <section 
      id="partners" 
      className="py-20 lg:py-24 bg-slate-100/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300 relative overflow-hidden"
    >
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
        <div 
          className="relative flex items-center gap-2 sm:gap-4"
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { 
            isHoveredRef.current = false; 
            handleMouseUpOrLeave();
          }}
        >
          {/* Edge Blur Gradients */}
          <div className="absolute left-10 sm:left-14 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-slate-100/90 dark:from-slate-950/90 to-transparent z-10 pointer-events-none hidden sm:block"></div>
          <div className="absolute right-10 sm:right-14 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-slate-100/90 dark:from-slate-950/90 to-transparent z-10 pointer-events-none hidden sm:block"></div>

          {/* Previous (Left) Button */}
          <button
            onClick={() => handleScroll('prev')}
            className="p-3 sm:p-3.5 rounded-full bg-white dark:bg-navy-900 hover:bg-sky-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-cyan-300 transition-all duration-200 shadow-lg shrink-0 z-20 active:scale-90 hover:scale-105"
            aria-label="Đối tác trước"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Logos Slider View */}
          <div 
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`flex-grow flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-4 px-2 select-none ${
              isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              WebkitOverflowScrolling: 'touch',
              overscrollBehaviorX: 'contain'
            }}
          >
            {partnerLogos.map((src, idx) => (
              <div 
                key={idx} 
                className="w-[70%] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] shrink-0 flex transform transition-transform duration-300 pointer-events-none sm:pointer-events-auto"
              >
                <div className="w-full h-32 sm:h-36 rounded-2xl bg-white dark:bg-navy-900/90 border border-slate-200 dark:border-slate-800/90 hover:border-sky-400 dark:hover:border-cyan-500/50 p-4 flex items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sky-500/10 dark:hover:shadow-cyan-500/15 group">
                  <img
                    src={src}
                    alt={`Partner ${(idx % baseLogos.length) + 1}`}
                    draggable={false}
                    className="max-h-full max-w-full object-contain filter dark:brightness-110 group-hover:scale-108 transition-transform duration-300 select-none pointer-events-none"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Next (Right) Button */}
          <button
            onClick={() => handleScroll('next')}
            className="p-3 sm:p-3.5 rounded-full bg-white dark:bg-navy-900 hover:bg-sky-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-300 transition-all duration-200 shadow-lg shrink-0 z-20 active:scale-90 hover:scale-105"
            aria-label="Đối tác tiếp"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

        </div>

      </div>
    </section>
  );
}
