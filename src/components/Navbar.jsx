import React, { useState, useEffect } from 'react';
import { 
  Anchor, 
  Radio, 
  Menu, 
  X, 
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { navLinks } from '../data/mockData';
import { scrollToSectionId } from '../utils/smoothScroll';

export default function Navbar({ activeSection, theme = 'light', toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    scrollToSectionId(id, -80);
  };

  const isDark = theme === 'dark';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? isDark
          ? 'bg-navy-950/90 backdrop-blur-md shadow-lg shadow-navy-950/40 border-b border-sky-500/20 py-3'
          : 'bg-white/90 backdrop-blur-md shadow-md shadow-slate-200/60 border-b border-slate-200/80 py-3' 
        : isDark
          ? 'bg-gradient-to-b from-navy-950/95 via-navy-950/80 to-transparent py-4 sm:py-5'
          : 'bg-gradient-to-b from-white/95 via-slate-50/80 to-transparent py-4 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group select-none flex-1"
          >
            <div className="relative overflow-hidden rounded-xl p-[2px] bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
              <img 
                src="./MARINEHP.jpg" 
                alt="HOANG YEN MARINE HP" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-[10px] bg-white"
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none font-sans">
                HOANG YEN
              </span>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] text-slate-600 dark:text-slate-300 uppercase leading-snug font-sans mt-0.5">
                MARINE HP
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 mr-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'text-sky-600 dark:text-cyan-400 bg-sky-100/80 dark:bg-sky-500/15 shadow-sm shadow-sky-500/10' 
                      : 'text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Day/Night Theme Toggle Switch */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={toggleTheme}
              className={`px-3 py-2 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 ${
                isDark 
                  ? 'bg-navy-900 border-sky-500/30 text-amber-300 hover:text-amber-200 hover:bg-navy-850 hover:border-cyan-400 shadow-inner'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-navy-950 hover:bg-sky-50 hover:border-sky-300 shadow-sm'
              }`}
              title={isDark ? "Chuyển sang Chế độ Sáng (Ngày)" : "Chuyển sang Chế độ Tối (Đêm)"}
              aria-label="Chuyển đổi giao diện sáng/tối"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-sky-600" />
                </>
              )}
            </button>
          </div>

          {/* Mobile Actions: Theme button & Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-navy-900 border-sky-500/30 text-amber-300' 
                  : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
              title="Chuyển chế độ sáng/tối"
              aria-label="Chuyển đổi giao diện sáng/tối"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Mở danh mục điều hướng"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div 
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen 
            ? 'max-h-[450px] opacity-100 border-b border-slate-200 dark:border-sky-500/20 bg-white/98 dark:bg-navy-950/98 backdrop-blur-xl shadow-xl' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-3 pb-5 space-y-2">
          
          {/* Mobile Theme Indicator Bar */}
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold mb-3">
            <span className="text-slate-600 dark:text-slate-300">Giao diện hiện tại:</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white dark:bg-navy-950 border border-slate-300 dark:border-slate-700 text-sky-700 dark:text-amber-300 shadow-sm"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-sky-600" />}
              <span>{isDark ? 'Chế độ Tối (Đêm)' : 'Chế độ Sáng (Ngày)'}</span>
            </button>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                activeSection === link.id 
                  ? 'bg-sky-500/15 text-sky-700 dark:text-cyan-300 border-l-4 border-sky-600 dark:border-cyan-400' 
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
