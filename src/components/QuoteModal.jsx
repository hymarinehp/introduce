import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  FileText,
  Ship,
  CheckCircle,
  Phone,
  Zap,
  MapPin,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { companyInfo } from '../data/mockData';
import { sendQuoteToGoogleSheet } from '../services/googleSheet';

export default function QuoteModal({ isOpen, onClose, product, onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    vesselName: '',
    phone: '',
    email: '',
    itemDetails: '',
    quantity: '1',
    portLocation: '',
    urgency: 'Khẩn cấp (Trong 24 giờ)'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(prev => ({
        ...prev,
        itemDetails: `Yêu cầu báo giá: ${product.name}${product.tag ? ` (${product.tag})` : ''}`
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        itemDetails: ''
      }));
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ tên người liên hệ';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
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

    setIsSubmitting(true);

    try {
      await sendQuoteToGoogleSheet({
        ...formData,
        product,
      });

      // Clear / Reset form data
      setFormData({
        name: '',
        vesselName: '',
        phone: '',
        email: '',
        itemDetails: '',
        quantity: '1',
        portLocation: '',
        urgency: 'Khẩn cấp (Trong 24 giờ)'
      });
      setErrors({});
    } catch (err) {
      console.error("Error sending quote:", err);
    } finally {
      setIsSubmitting(false);
      onClose();
      onShowToast(
        'Yêu cầu báo giá đã được tiếp nhận!',
        `HOANG YEN MARINE HP sẽ liên hệ cho bạn qua số ${formData.phone} trong thời gian sớm nhất.`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-sky-500/40 shadow-2xl text-slate-900 dark:text-white p-6 sm:p-8 transition-colors">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Đóng popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-100 dark:bg-cyan-950 text-sky-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider border border-sky-300 dark:border-cyan-500/30">
            <FileText className="w-3.5 h-3.5" />
            <span>Yêu Cầu Báo Giá Tức Thì</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            {product ? `Báo Giá: ${product.name}` : "Gửi Yêu Cầu Cung Ứng & Dịch Vụ Vệ Tinh"}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Cam kết phản hồi và tư vấn kỹ thuật trực tiếp trong thời gian sớm nhất.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Contact Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Họ và tên <span className="text-sky-600 dark:text-cyan-400">*</span>
              </label>
              <input
                type="text"
                // placeholder="VD: Trần Trọng Hải"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border ${errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                  } text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-sky-500 dark:focus:border-cyan-400`}
              />
              {errors.name && <p className="text-[11px] text-red-500 dark:text-red-400 mt-1">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Số điện thoại / Zalo <span className="text-sky-600 dark:text-cyan-400">*</span>
              </label>
              <input
                type="tel"
                // placeholder="VD: 0988 123 456"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border ${errors.phone ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                  } text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-sky-500 dark:focus:border-cyan-400`}
              />
              {errors.phone && <p className="text-[11px] text-red-500 dark:text-red-400 mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Vessel Name / IMO */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Tên Tàu / IMO / Công ty
              </label>
              <input
                type="text"
                // placeholder="VD: Tàu VIMC PACIFIC"
                value={formData.vesselName}
                onChange={(e) => setFormData({ ...formData, vesselName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-sky-500 dark:focus:border-cyan-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Email nhận file PDF
              </label>
              <input
                type="email"
                // placeholder="VD: ops@vimc-shipping.vn"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-sky-500 dark:focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Port Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Cảng cấp hàng / Lắp đặt
              </label>
              <input
                type="text"
                // placeholder="VD: Tàu VIMC PACIFIC"
                value={formData.portLocation}
                onChange={(e) => setFormData({ ...formData, portLocation: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-sky-500 dark:focus:border-cyan-400"
              />
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Mức độ khẩn
              </label>
              <input
                type="text"
                // placeholder="VD: Tàu VIMC PACIFIC"
                value={formData.urgency}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-sky-500 dark:focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Details / Message */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Chi tiết mặt hàng / Số lượng / Yêu cầu Class
            </label>
            <textarea
              rows="3"
              // placeholder="Nhập mã phụ tùng, số lượng hoặc thông số mong muốn..."
              value={formData.itemDetails}
              onChange={(e) => setFormData({ ...formData, itemDetails: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-sky-500 dark:focus:border-cyan-400 resize-none"
            ></textarea>
          </div>

          {/* Guarantee pill */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800 text-[11px] text-sky-800 dark:text-cyan-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Cam kết 100% bảo mật thông tin hải trình & giá cạnh tranh nhất thị trường.</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 hover:from-orange-500 hover:to-amber-400 disabled:opacity-75 disabled:cursor-not-allowed text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 text-white animate-spin" />
                <span>Đang gửi thông tin lên hệ thống...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-white" />
                <span>GỬI YÊU CẦU BÁO GIÁ NHANH</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
