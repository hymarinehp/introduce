import React, { useState, useMemo } from 'react';
import {
  Anchor,
  Radio,
  Search,
  Filter,
  Check,
  FileText,
  Phone,
  ExternalLink,
  Sparkles,
  Layers,
  Zap,
  Info,
  PackageCheck,
  Cog,
  Wrench,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import { productCategories, productsData, supplyGallery } from '../data/mockData';

export default function Products({
  selectedTab,
  setSelectedTab,
  onOpenQuote,
  onSelectProduct
}) {
  const [activeSubCat, setActiveSubCat] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGalleryTab, setActiveGalleryTab] = useState("all");

  // Get current category data
  const currentCategory = useMemo(() => {
    return productCategories.find(c => c.id === selectedTab) || productCategories[0];
  }, [selectedTab]);

  // Handle Tab switch
  const handleTabChange = (tabId) => {
    setSelectedTab(tabId);
    setActiveSubCat("Tất cả");
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return productsData.filter(item => {
      // Must match active tab
      if (item.category !== selectedTab) return false;

      // Subcategory filter
      if (activeSubCat !== "Tất cả" && !activeSubCat.startsWith("Tất cả") && item.subCategory !== activeSubCat) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchTag = item.tag.toLowerCase().includes(q);
        const matchSpecs = item.specs.some(s => s.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchTag && !matchSpecs) return false;
      }

      return true;
    });
  }, [selectedTab, activeSubCat, searchQuery]);

  return (
    <section id="products" className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative transition-colors duration-300">

      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-sky-400/10 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950/80 border border-orange-300 dark:border-amber-500/30 text-orange-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>CUNG ỨNG VẬT TƯ & Dịch Vụ Kỹ thuật</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500">
              Cung Ứng Vật Tư
            </span>
            {' '}&{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500">
              Dịch Vụ Kỹ thuật
            </span>
          </h2>
        </div>

        {/* Primary Tab Switcher (ME Spares vs Docking Spares vs Repair vs Telecom vs SEAView) */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-navy-900 border border-slate-300 dark:border-slate-800 shadow-md dark:shadow-xl max-w-6xl w-full">

            {/* Tab 1: ME Spares */}
            <button
              onClick={() => handleTabChange('me-spares')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${selectedTab === 'me-spares'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
            >
              <Cog className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="truncate">ME Spares Parts</span>
            </button>

            {/* Tab 2: Docking Spares */}
            <button
              onClick={() => handleTabChange('docking-spares')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${selectedTab === 'docking-spares'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
            >
              <Anchor className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="truncate">Docking Spares</span>
            </button>

            {/* Tab 3: Repair Services */}
            <button
              onClick={() => handleTabChange('repair-services')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${selectedTab === 'repair-services'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
            >
              <Wrench className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="truncate">Dịch Vụ Sửa Chữa</span>
            </button>

            {/* Tab 4: Telecom Services */}
            <button
              onClick={() => handleTabChange('telecom-services')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${selectedTab === 'telecom-services'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
            >
              <Radio className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="truncate">Mạng Vệ Tinh</span>
            </button>

            {/* Tab 5: SEAView Solutions */}
            <button
              onClick={() => handleTabChange('seaview-solutions')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${selectedTab === 'seaview-solutions'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
            >
              <Camera className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="truncate">Giải Pháp SEAView</span>
            </button>

          </div>
        </div>

        {/* Category Description & Search / Subcategory Filter Bar */}
        <div className="mb-10 space-y-5">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-navy-900/60 border border-slate-200 dark:border-slate-800/90 shadow-sm backdrop-blur transition-colors">

            {/* Subcategories Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {currentCategory.subCategories.map((sub, idx) => {
                const isActive = activeSubCat === sub || (sub.startsWith("Tất cả") && activeSubCat === "Tất cả");
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveSubCat(sub.startsWith("Tất cả") ? "Tất cả" : sub)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${isActive
                        ? 'bg-orange-600 dark:bg-amber-500/20 text-white dark:text-amber-300 border border-orange-600 dark:border-amber-400/50 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                      }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-navy-900/40 border border-slate-200 dark:border-slate-800">
            <PackageCheck className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Không tìm thấy mã vật tư phù hợp</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Vui lòng thử từ khóa tìm kiếm khác hoặc đổi danh mục.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveSubCat("Tất cả"); }}
              className="px-4 py-2 text-xs font-bold text-orange-700 dark:text-amber-400 bg-orange-50 dark:bg-orange-950/80 border border-orange-300 dark:border-amber-500/40 rounded-lg hover:bg-orange-100"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl bg-white dark:bg-navy-900/80 border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-amber-500/50 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-orange-500/10 flex flex-col justify-between"
              >
                <div>

                  {/* Card Thumbnail with Overlay Badges */}
                  <div className="relative h-56 overflow-hidden bg-slate-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 dark:from-navy-950 via-slate-950/20 to-transparent"></div>

                    {/* Top Tag */}
                    {product.tag && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-navy-950/90 text-amber-300 border border-amber-500/40 backdrop-blur">
                          {product.tag}
                        </span>
                      </div>
                    )}

                    {/* Availability Tag */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px]">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 backdrop-blur font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        {product.availability}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-5 space-y-4">

                    {/* Subcategory Label */}
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-orange-600 dark:text-amber-400">
                      {product.subCategory}
                    </div>

                    {/* Product Name */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>

                    {/* Key Specs List */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200 dark:border-slate-800/80 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Thông số & Tiêu chuẩn:
                      </div>
                      {product.specs.slice(0, 3).map((spec, sIdx) => (
                        <div key={sIdx} className="text-xs text-slate-700 dark:text-slate-200 flex items-start gap-1.5 leading-tight">
                          <Check className="w-3.5 h-3.5 text-orange-500 dark:text-amber-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{spec}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-navy-950 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5 text-orange-500 dark:text-amber-400" />
                    <span>Chi tiết</span>
                  </button>

                  <button
                    onClick={() => onOpenQuote(product)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white text-xs font-bold shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    {product.category === 'telecom-services' ? (
                      <>
                        <Zap className="w-3.5 h-3.5 text-white" />
                        <span>Mua ngay</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-3.5 h-3.5 text-white" />
                        <span>Báo giá</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
