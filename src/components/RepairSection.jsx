import React from 'react';
import { 
  Wrench, 
  UserCheck, 
  Globe, 
  Anchor, 
  CheckCircle2, 
  Award, 
  Phone, 
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { repairGallery, companyInfo } from '../data/mockData';

export default function RepairSection({ onOpenQuote }) {
  return (
    <section id="repair" className="py-16 lg:py-20 bg-white dark:bg-slate-900 text-slate-800 dark:text-white relative overflow-hidden transition-colors duration-300">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-400/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 dark:bg-amber-950/80 border border-orange-300 dark:border-amber-500/30 text-orange-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>DỊCH VỤ KỸ THUẬT & SỬA CHỮA TÀU BIỂN</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Dịch Vụ Sửa Chữa Kỹ Thuật{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500">
              Chuyên Nghiệp
            </span>
          </h2>

          <p className="text-slate-700 dark:text-slate-200 text-base sm:text-xl font-medium leading-relaxed pt-2">
            "Dịch vụ sửa chữa với các kỹ thuật viên có tay nghề cao, với kinh nghiệm làm việc nhiều năm trên tàu, tận tâm với công việc... Các khách hàng thân thiết của chúng tôi không chỉ có các chủ tàu trong nước mà có cả các công ty quản lý kỹ thuật nước ngoài (Trung Quốc, Châu Âu) có tàu đến các cảng biển của Việt Nam...."
          </p>
        </div>

        {/* 3 Key Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-amber-950/80 border border-orange-300 dark:border-amber-500/30 text-orange-600 dark:text-amber-400 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tay Nghề Cao & Tận Tâm</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Đội ngũ kỹ thuật viên dày dặn kinh nghiệm đi biển, am hiểu sâu sắc hệ thống cơ khí động lực, tự động hóa & viễn thông tàu biển.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-amber-950/80 border border-orange-300 dark:border-amber-500/30 text-orange-600 dark:text-amber-400 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Đối Tác Khách Hàng Quốc Tế</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Tự hào phục vụ các công ty quản lý kỹ thuật nước ngoài (Trung Quốc, Châu Âu...) & chủ tàu Việt Nam cập các cảng biển Việt Nam.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-amber-950/80 border border-orange-300 dark:border-amber-500/30 text-orange-600 dark:text-amber-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Trực Chiến Khẩn Cấp 24/7</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Sẵn sàng điều động kỹ sư lên tàu tại cầu cảng, vùng neo hoặc khu vực phao số 0 Hải Phòng, Quảng Ninh, Cái Mép toàn quốc.
            </p>
          </div>
        </div>

        {/* REAL REPAIR PHOTOS SHOWCASE (suachua1.jpg, suachua2.jpg, suachua3.jpg) */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Hình Ảnh Thi Công Sửa Chữa Thực Tế (suachua1.jpg, suachua2.jpg, suachua3.jpg)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Kỹ thuật viên Hoàng Yến Marine HP trực tiếp làm việc tại mạn tàu & cầu cảng
              </p>
            </div>

            <button
              onClick={() => onOpenQuote()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-xs shadow-lg shadow-orange-500/20"
            >
              Yêu Cầu Kỹ Thuật Lên Tàu 24/7
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {repairGallery.map((item, idx) => (
              <div 
                key={item.id}
                className="group rounded-3xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-900">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                    
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-mono font-bold bg-orange-600 text-white uppercase tracking-wider shadow">
                      ẢNH THỰC TẾ 0{idx + 1} ({item.image.replace('/', '')})
                    </span>
                  </div>

                  {/* Info Section */}
                  <div className="p-6 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-amber-400">
                      {item.subtitle}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-orange-600 dark:group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Nghiệm thu chất lượng trực tiếp với Thuyền trưởng / Máy trưởng</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
