import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import News from './components/News';
import PartnerSection from './components/PartnerSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import ProductDetailModal from './components/ProductDetailModal';
import ArticleModal from './components/ArticleModal';
import Toast from './components/Toast';
import { Phone, MessageSquareQuote, ChevronUp } from 'lucide-react';
import { companyInfo } from './data/mockData';
import { smoothScrollTo } from './utils/smoothScroll';

export default function App() {
  // Theme state: Default is 'light' as requested by the user
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('marisat_theme');
    return savedTheme || 'light';
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('marisat_theme', next);
      return next;
    });
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Navigation active section
  const [activeSection, setActiveSection] = useState('hero');

  // Products Tab state
  const [selectedProductTab, setSelectedProductTab] = useState('me-spares');

  // Modals state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState(null);

  const [detailProduct, setDetailProduct] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);

  // Floating Back to Top state
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Toast Notification state
  const [toast, setToast] = useState({
    show: false,
    title: '',
    message: ''
  });

  const showToastNotification = (title, message) => {
    setToast({
      show: true,
      title,
      message
    });
  };

  const handleOpenQuote = (product = null) => {
    setQuoteProduct(product);
    setQuoteModalOpen(true);
  };

  // Lock body scroll when any modal is open
  const isAnyModalOpen = quoteModalOpen || Boolean(detailProduct) || Boolean(activeArticle);
  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAnyModalOpen]);

  // Scroll listener for active section & Back to top button
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'products', 'news', 'partners', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }

      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    smoothScrollTo(0, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white transition-colors duration-300">

      {/* Sticky Smart Navbar with Theme Toggle */}
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">

        {/* A. Hero Section */}
        <Hero
          onOpenQuote={() => handleOpenQuote()}
          onSelectTab={(tabId) => setSelectedProductTab(tabId)}
        />

        {/* B. About Us & 4 Core Values */}
        <About
          onOpenQuote={() => handleOpenQuote()}
        />

        {/* C. Products & Satellite Solutions */}
        <Products
          selectedTab={selectedProductTab}
          setSelectedTab={setSelectedProductTab}
          onOpenQuote={(product) => handleOpenQuote(product)}
          onSelectProduct={(product) => setDetailProduct(product)}
        />

        {/* D. Maritime Insights & News */}
        <News
          onSelectArticle={(article) => setActiveArticle(article)}
        />

        {/* E. Partners & Shipping Companies */}
        <PartnerSection />

        {/* F. Contact & Emergency 24/7 Support Form */}
        <Contact
          onShowToast={showToastNotification}
        />

      </main>

      {/* G. Footer */}
      <Footer
        onShowToast={showToastNotification}
      />

      {/* Floating Action Buttons (Hotline, RFQ, Back To Top) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        {/* Hotline 24/7 */}
        <a
          href={`tel:${(companyInfo.hotline).replace(/\s+/g, '')}`}
          className="relative group flex items-center"
        >
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900/90 dark:bg-slate-800/95 text-white text-xs font-semibold whitespace-nowrap shadow-lg backdrop-blur opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 border border-slate-700/50">
            Gọi Hotline Kỹ thuật 24/7
          </span>
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-xl shadow-emerald-950/60 font-bold transition-all transform group-hover:scale-105">
            <Phone className="w-5 h-5" />
          </div>
        </a>

        {/* Báo giá nhanh */}
        <button
          onClick={() => handleOpenQuote()}
          className="relative group flex items-center"
        >
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900/90 dark:bg-slate-800/95 text-white text-xs font-semibold whitespace-nowrap shadow-lg backdrop-blur opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 border border-slate-700/50">
            Báo giá nhanh
          </span>
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white shadow-xl shadow-cyan-950/60 font-bold transition-all transform group-hover:scale-105">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
        </button>

        {/* Lên đầu trang */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="relative group flex items-center"
            aria-label="Lên đầu trang"
          >
            <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900/90 dark:bg-slate-800/95 text-white text-xs font-semibold whitespace-nowrap shadow-lg backdrop-blur opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 border border-slate-700/50">
              Lên đầu trang
            </span>
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white dark:bg-navy-900/90 border border-slate-200 dark:border-sky-500/40 text-sky-700 dark:text-cyan-300 hover:text-white hover:bg-sky-600 dark:hover:bg-sky-600 shadow-xl backdrop-blur transition-all duration-300 transform group-hover:scale-105">
              <ChevronUp className="w-5 h-5" />
            </div>
          </button>
        )}
      </div>

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => {
          setQuoteModalOpen(false);
          setQuoteProduct(null);
        }}
        product={quoteProduct}
        onShowToast={showToastNotification}
      />

      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onOpenQuote={(product) => {
          setDetailProduct(null);
          handleOpenQuote(product);
        }}
      />

      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onOpenQuote={() => {
          setActiveArticle(null);
          handleOpenQuote();
        }}
      />

      {/* Toast Feedback */}
      <Toast
        toast={toast}
        onClose={() => setToast({ ...toast, show: false })}
      />

    </div>
  );
}
