import React from 'react';
import {
  Anchor,
  Radio,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Globe,
  ChevronRight
} from 'lucide-react';
import { companyInfo, navLinks } from '../data/mockData';
import { scrollToSectionId } from '../utils/smoothScroll';

export default function Footer({ onShowToast }) {

  const scrollTo = (id) => {
    scrollToSectionId(id, -80);
  };

  return (
    <footer className="bg-slate-100 dark:bg-navy-950 text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-sky-500/20 pt-12 pb-4 relative overflow-hidden transition-colors duration-300">

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 maritime-grid-pattern opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Grid: 3 Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-12 border-b border-slate-300 dark:border-slate-800">

          {/* Column 1: Company Profile & Brand (Left) */}
          <div className="space-y-4">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative overflow-hidden rounded-xl p-[2px] bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 shadow-md shadow-orange-500/20">
                <img
                  src="./MARINEHP.jpg"
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

            <p className="text-[16px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {companyInfo.legalName}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
              {companyInfo.shortDescription}
            </p>
          </div>

          {/* Column 2: Điều Hướng Nhanh (Middle Column - navLinks Only) */}
          <div className="space-y-4">
            <h4 className="text-[16px] font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500 dark:text-cyan-400" />
              <span>THÔNG TIN LIÊN HỆ</span>
            </h4>

            <div className="space-y-2 text-sm">
              {/* Email */}
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Mail className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0" />
                <span>Email: </span>
                <a href={`mailto:${companyInfo.emailQuote}`} className="font-semibold text-sky-600 dark:text-cyan-300 hover:underline">
                  {companyInfo.emailQuote}
                </a>
              </div>

              {/* Hotline */}
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Hotline: </span>
                <a href={`tel:${(companyInfo.hotline).replace(/\s+/g, '')}`} className="font-bold text-slate-900 dark:text-white hover:text-orange-500 transition-colors">
                  {companyInfo.hotline}
                </a>
              </div>

              {/* Embedded Google Maps */}
              <div className="pt-2">
                <iframe
                  title="Bản đồ vị trí Hoàng Yến Marine HP"
                  src="https://maps.google.com/maps?q=S%E1%BB%91%201B%2F8%2F56%20Ph%C6%B0%C6%A1ng%20L%C6%B0u%2C%20Ph%C6%B0%E1%BB%9Dng%20V%E1%BA%A1n%20M%E1%BB%B9%2C%20Qu%E1%BA%ADn%20Ng%C3%B4%20Quy%E1%BB%81n%2C%20TP%20H%E1%BA%A3i%20Ph%C3%B2ng%2C%20Vi%E1%BB%87t%20Nam&output=embed"
                  className="w-full h-36 rounded-xl border border-slate-300 dark:border-slate-800 shadow-sm"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Column 3: LIÊN HỆ & Map (Right Column) */}
          <div className="space-y-4 md:pl-4">
            <h4 className="text-[16px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Điều Hướng Nhanh
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2 group font-medium"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-sky-500 group-hover:translate-x-0.5 transition-transform" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} {companyInfo.name}. Giữ toàn quyền (All Rights Reserved).
          </div>
        </div>

      </div>
    </footer>
  );
}
