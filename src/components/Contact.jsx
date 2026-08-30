import React, { useState } from 'react';
import {
  Send,
  Headphones,
  Ship,
  Loader2
} from 'lucide-react';
import { sendQuoteToGoogleSheet } from '../services/googleSheet';

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    vesselName: '',
    phone: '',
    email: '',
    serviceType: '',
    portLocation: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ và tên';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại liên hệ';
    } else if (!/^[0-9+() -]{9,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    await sendQuoteToGoogleSheet({
      ...formData,
    });

    setIsSubmitting(false);
    onShowToast(
      'Gửi yêu cầu thành công!',
      `HOANG YEN MARINE HP sẽ liên hệ với Quý khách qua số ${formData.phone} trong thời gian sớm nhất.`
    );
    setFormData({
      name: '',
      vesselName: '',
      phone: '',
      email: '',
      serviceType: '',
      portLocation: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-16 lg:py-20 bg-slate-100 dark:bg-navy-950 text-slate-800 dark:text-white relative overflow-hidden transition-colors duration-300">

      {/* Ocean Gradient Background with subtle grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-navy-950 dark:to-navy-950 opacity-95"></div>
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-sky-400/10 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/90 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Headphones className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Hỗ Trợ Khẩn Cấp & Báo Giá 24/7</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Kết nối ngay với{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 dark:from-sky-400 dark:via-cyan-300 dark:to-teal-300">
              Chúng tôi
            </span>
          </h2>
        </div>

        {/* Centered Fast Inquiry & RFQ Form */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl bg-white dark:bg-navy-900/90 border border-slate-200 dark:border-sky-500/30 p-6 sm:p-8 lg:p-10 shadow-xl dark:shadow-2xl backdrop-blur-xl transition-colors">

            <div className="mb-6 sm:mb-8 space-y-1">
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
                <Ship className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span>Yêu cầu Báo giá & Tư vấn kỹ thuật</span>
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Họ và tên người liên hệ <span className="text-cyan-600 dark:text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    // placeholder="VD: Nguyễn Văn Nam"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border ${errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                      } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-colors`}
                  />
                  {errors.name && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Số điện thoại / Zalo <span className="text-cyan-600 dark:text-cyan-400">*</span>
                  </label>
                  <input
                    type="tel"
                    // placeholder="VD: 0912 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border ${errors.phone ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                      } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-colors`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.phone}</p>}
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Vessel Name / IMO */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Tên Tàu / Số IMO / Đơn vị quản lý
                  </label>
                  <input
                    type="text"
                    // placeholder="VD: M/V HAI PHONG STAR - IMO 9845..."
                    value={formData.vesselName}
                    onChange={(e) => setFormData({ ...formData, vesselName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Email nhận báo giá
                  </label>
                  <input
                    type="email"
                    // placeholder="VD: tech@shipping-company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-colors"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Service Needed */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Dịch vụ / Hạng mục cần tư vấn
                  </label>
                  <input
                    type="text"
                    // placeholder="VD: M/V HAI PHONG STAR - IMO 9845..."
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-colors"
                  />
                </div>

                {/* Port Location */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Cảng biển dự kiến cấp ứng
                  </label>
                  <input
                    type="text"
                    // placeholder="VD: M/V HAI PHONG STAR - IMO 9845..."
                    value={formData.portLocation}
                    onChange={(e) => setFormData({ ...formData, portLocation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 dark:focus:ring-cyan-400 transition-colors"
                  />
                </div>

              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Mô tả / Ghi chú thêm
                </label>
                <textarea
                  rows="3"
                  // placeholder="VD: Cần 01 bộ piston máy Yanmar 6EY18AL và khảo sát lắp đặt anten Starlink tại phao số 0 Hải Phòng ngày 20/08..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 dark:focus:ring-cyan-400 resize-none transition-colors"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 hover:from-orange-500 hover:to-amber-400 disabled:opacity-75 disabled:cursor-not-allowed text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                    <span>Đang gửi thông tin lên hệ thống...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-white" />
                    <span>GỬI YÊU CẦU BÁO GIÁ</span>
                  </>
                )}
              </button>

            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
