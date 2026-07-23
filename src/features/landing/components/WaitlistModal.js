'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Mail, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WaitlistModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    // Giả lập lưu email waitlist
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#E96A87', '#D9B36A', '#FFFDFB']
      });
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          
          {/* Lớp nền mờ sau */}
          <motion.div
            className="absolute inset-0 bg-[#2B2B2B]/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Hộp thoại đệm giấy nhám đục mờ */}
          <motion.div
            className="relative w-full max-w-md bg-[#FFFDFB] rounded-2xl p-6 sm:p-8 border border-[#FAF6F0] shadow-[0_30px_70px_rgba(61,43,39,0.12)] z-10 overflow-hidden"
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{ backgroundImage: 'radial-gradient(#FAF6F0 1.2px, transparent 0)', backgroundSize: '20px 20px' }}
          >
            {/* Nút đóng góc phải */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-[#E96A87] rounded-full hover:bg-[#FFF9F8] transition-colors"
              aria-label="Đóng"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 text-center select-none">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#FFF9F8] border border-pink-100/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#E96A87] animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-xl sm:text-2xl font-light text-[#2B2B2B] tracking-wide">
                    Bắt đầu hành trình kỷ niệm
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-sans max-w-xs mx-auto">
                    Đăng ký tham gia Waitlist để nhận quyền truy cập sớm nhất khi MemoryOS ra mắt chính thức. Không spam, bảo mật tuyệt đối.
                  </p>
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Địa chỉ email của bạn..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-pink-100/10 focus:outline-none focus:ring-1 focus:ring-[#E96A87] text-xs bg-white text-[#2B2B2B]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#2B2B2B] hover:bg-[#E96A87] text-white font-medium text-[10px] tracking-widest uppercase rounded-xl transition-all duration-300 active:scale-95 shadow-sm disabled:opacity-50"
                >
                  {loading ? "Đang kết nối..." : "Đăng ký nhận quyền truy cập"}
                </button>
              </form>
            ) : (
              <motion.div 
                className="text-center space-y-5 py-4 select-none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-[#FFF9F8] border border-pink-100/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#E96A87] fill-[#E96A87]" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-xl sm:text-2xl font-light text-[#2B2B2B]">
                    Chào mừng bạn đến với MemoryOS!
                  </h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-sans max-w-xs mx-auto">
                    Cảm ơn bạn đã tin tưởng trao gửi những ký ức tuyệt đẹp. Chúng tôi đã ghi nhận email và sẽ gửi thư mời sớm nhất đến bạn.
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-[#FAF6F0] hover:bg-[#FFF9F8] text-[10px] tracking-widest uppercase font-semibold text-[#7A7A7A] rounded-xl transition-all"
                >
                  Đóng cửa sổ
                </button>
              </motion.div>
            )}

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
