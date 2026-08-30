import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  BookOpen, 
  Calendar, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { newsArticles } from '../data/mockData';

export default function News({ onSelectArticle }) {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const scrollRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const smoothAnimRef = useRef(null);
  const isHoveredRef = useRef(false);

  const [isGrabbing, setIsGrabbing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ["Tất cả", "Mạng Vệ Tinh", "CCTV", "PMS Software"];

  const baseNews = newsArticles.filter(item => {
    if (activeCategory === "Tất cả") return true;
    return item.category === activeCategory;
  });

  // Infinite looping when having 4 or more items
  const isInfinite = baseNews.length >= 4;
  const displayNews = isInfinite ? [...baseNews, ...baseNews, ...baseNews] : baseNews;

  // Infinite bounds check
  const checkInfiniteBounds = useCallback(() => {
    const container = scrollRef.current;
    if (!container || !isInfinite) return;
    const singleSetWidth = container.scrollWidth / 3;

    if (container.scrollLeft >= singleSetWidth * 2) {
      container.scrollLeft -= singleSetWidth;
    } else if (container.scrollLeft <= 5) {
      container.scrollLeft += singleSetWidth;
    }
  }, [isInfinite]);

  // Update active dot index based on scroll position
  const updateActiveIndex = useCallback(() => {
    const container = scrollRef.current;
    if (!container || baseNews.length === 0) return;

    const firstCard = container.firstElementChild;
    if (!firstCard) return;

    const style = window.getComputedStyle(container);
    const gap = parseFloat(style.gap) || 24;
    const itemWidth = firstCard.offsetWidth + gap;

    let relativeScroll = container.scrollLeft;
    if (isInfinite) {
      const singleSetWidth = container.scrollWidth / 3;
      relativeScroll = container.scrollLeft % singleSetWidth;
    }

    const currentIdx = Math.round(relativeScroll / itemWidth) % baseNews.length;
    setActiveIndex(Math.max(0, Math.min(baseNews.length - 1, currentIdx)));
  }, [baseNews.length, isInfinite]);

  // Reset scroll on category change
  useEffect(() => {
    if (smoothAnimRef.current) {
      cancelAnimationFrame(smoothAnimRef.current);
      smoothAnimRef.current = null;
    }

    if (isInfinite && scrollRef.current) {
      const container = scrollRef.current;
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
    } else if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
    setActiveIndex(0);
  }, [activeCategory, isInfinite]);

  // Silky Smooth Custom Cubic Animation (rAF)
  const smoothScrollTo = (targetScrollLeft, duration = 450) => {
    const container = scrollRef.current;
    if (!container) return;

    if (smoothAnimRef.current) {
      cancelAnimationFrame(smoothAnimRef.current);
    }

    const start = container.scrollLeft;
    const distance = targetScrollLeft - start;
    let startTime = null;

    // Quartic ease-out for ultra silky stopping
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutQuart(progress);

      container.scrollLeft = start + distance * ease;
      checkInfiniteBounds();
      updateActiveIndex();

      if (progress < 1) {
        smoothAnimRef.current = requestAnimationFrame(step);
      } else {
        smoothAnimRef.current = null;
        checkInfiniteBounds();
        updateActiveIndex();
      }
    };

    smoothAnimRef.current = requestAnimationFrame(step);
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
        ? container.scrollLeft + itemWidth
        : container.scrollLeft - itemWidth;

      smoothScrollTo(target, 480);
    }
  };

  const scrollToCardIndex = (index) => {
    const container = scrollRef.current;
    if (!container) return;

    const firstCard = container.firstElementChild;
    if (firstCard) {
      const style = window.getComputedStyle(container);
      const gap = parseFloat(style.gap) || 24;
      const itemWidth = firstCard.offsetWidth + gap;

      if (isInfinite) {
        const singleSetWidth = container.scrollWidth / 3;
        const target = singleSetWidth + index * itemWidth;
        smoothScrollTo(target, 500);
      } else {
        const target = index * itemWidth;
        smoothScrollTo(target, 500);
      }
    }
  };

  // Auto-advance every 6s if not hovered or dragging
  useEffect(() => {
    if (!isInfinite) return;

    const timer = setInterval(() => {
      if (!isHoveredRef.current && !isDraggingRef.current && !smoothAnimRef.current) {
        handleScroll('next');
      }
    }, 6000);

    return () => clearInterval(timer);
  }, [isInfinite]);

  // Mouse Drag handlers
  const handleMouseDown = (e) => {
    const container = scrollRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    setIsGrabbing(true);
    dragDistanceRef.current = 0;
    startXRef.current = e.pageX - container.offsetLeft;
    startScrollLeftRef.current = container.scrollLeft;

    if (smoothAnimRef.current) {
      cancelAnimationFrame(smoothAnimRef.current);
      smoothAnimRef.current = null;
    }
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const container = scrollRef.current;
    const x = e.pageX - container.offsetLeft;
    const delta = x - startXRef.current;
    dragDistanceRef.current = Math.abs(delta);
    
    container.scrollLeft = startScrollLeftRef.current - delta * 1.15;
    checkInfiniteBounds();
    updateActiveIndex();
  };

  const handleMouseUpOrLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsGrabbing(false);
      checkInfiniteBounds();
      updateActiveIndex();
    }
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    const container = scrollRef.current;
    if (!container || e.touches.length === 0) return;

    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    startXRef.current = e.touches[0].pageX - container.offsetLeft;
    startScrollLeftRef.current = container.scrollLeft;

    if (smoothAnimRef.current) {
      cancelAnimationFrame(smoothAnimRef.current);
      smoothAnimRef.current = null;
    }
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || !scrollRef.current || e.touches.length === 0) return;
    const container = scrollRef.current;
    const x = e.touches[0].pageX - container.offsetLeft;
    const delta = x - startXRef.current;
    dragDistanceRef.current = Math.abs(delta);

    container.scrollLeft = startScrollLeftRef.current - delta * 1.15;
    checkInfiniteBounds();
    updateActiveIndex();
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    checkInfiniteBounds();
    updateActiveIndex();
  };

  const handleCardClick = (article) => {
    // Only open article modal if the user wasn't dragging
    if (dragDistanceRef.current < 8) {
      onSelectArticle(article);
    }
  };

  return (
    <section 
      id="news" 
      className="py-16 lg:py-20 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 relative transition-colors duration-300 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 dark:bg-cyan-950/80 border border-sky-300 dark:border-cyan-500/30 text-sky-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kiến Thức & Tin Tức Hàng Hải</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 dark:from-sky-400 dark:via-cyan-300 dark:to-teal-300">
              Xu hướng công nghệ biển
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg transition-colors">
            Cập nhật các quy chuẩn đăng kiểm quốc tế mới nhất, giải pháp bảo dưỡng máy tàu và xu hướng chuyển đổi số mạng vệ tinh hàng hải.
          </p>
        </div>

        {/* Category Filters & Carousel Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-none">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-md shadow-sky-600/30'
                    : 'bg-slate-100 dark:bg-navy-950 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Prev / Next Navigation Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleScroll('prev')}
              className="p-2.5 sm:p-3 rounded-xl bg-slate-100 dark:bg-navy-950 hover:bg-sky-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-300 transition-all duration-200 shadow-sm active:scale-90 hover:scale-105"
              aria-label="Bài trước"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => handleScroll('next')}
              className="p-2.5 sm:p-3 rounded-xl bg-slate-100 dark:bg-navy-950 hover:bg-sky-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-300 transition-all duration-200 shadow-sm active:scale-90 hover:scale-105"
              aria-label="Bài tiếp"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
            handleMouseUpOrLeave();
          }}
          className="relative"
        >
          <div 
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onScroll={() => {
              checkInfiniteBounds();
              updateActiveIndex();
            }}
            className={`flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-3 px-1 select-none ${
              isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              WebkitOverflowScrolling: 'touch',
              overscrollBehaviorX: 'contain'
            }}
          >
            {displayNews.map((article, idx) => (
              <div 
                key={`${article.id}-${idx}`} 
                className="w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 flex transform transition-transform duration-300"
              >
                <article 
                  onClick={() => handleCardClick(article)}
                  className="w-full rounded-2xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-cyan-500/50 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sky-500/10 dark:hover:shadow-cyan-500/15 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden bg-slate-950">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        draggable={false}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 select-none pointer-events-none"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 dark:from-navy-950/80 via-transparent to-transparent pointer-events-none"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-navy-900/90 text-cyan-300 border border-cyan-500/40 backdrop-blur">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                          {article.date}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-200 transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                        {article.summary}
                      </p>
                    </div>
                  </div>

                  {/* Read More Trigger */}
                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(article);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-navy-900 hover:bg-sky-50 dark:hover:bg-sky-950/80 border border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-cyan-500/50 text-sky-700 dark:text-cyan-300 text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn shadow-sm dark:shadow-none"
                    >
                      <span>Đọc tiếp</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots Indicator */}
        {baseNews.length > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            {baseNews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToCardIndex(idx)}
                aria-label={`Chuyển đến tin tức ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === idx
                    ? 'w-7 h-2 bg-gradient-to-r from-sky-500 to-cyan-400 shadow-sm shadow-cyan-400/50'
                    : 'w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
