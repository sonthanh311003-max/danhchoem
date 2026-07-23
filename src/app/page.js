'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Compass, Shield, Zap, ArrowDown } from 'lucide-react';
import HeroEnvelope from '@/features/landing/components/HeroEnvelope';
import PreviewSection from '@/features/landing/components/PreviewSection';
import FaqSection from '@/features/landing/components/FaqSection';
import WaitlistModal from '@/features/landing/components/WaitlistModal';

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  // Đảm bảo khóa cuộn trang khi chưa mở thư
  useEffect(() => {
    if (!hasEntered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [hasEntered]);

  const handleEnterSite = () => {
    setHasEntered(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F8] text-[#2B2B2B] font-sans selection:bg-pink-100 selection:text-[#E96A87] overflow-x-hidden relative">
      
      {/* 1. MÀN HÌNH CHÀO CINEMATIC 3D PHONG BÌ (Khóa cuộn ban đầu) */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            key="intro-envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50"
          >
            <HeroEnvelope onEnter={handleEnterSite} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HEADER TỐI GIẢN (Chỉ hiển thị sau khi vào trang) */}
      {hasEntered && (
        <motion.header
          className="fixed top-0 left-0 right-0 z-40 bg-[#FFF9F8]/80 backdrop-blur-md border-b border-[#FAF6F0] py-4 px-6 md:px-12 flex items-center justify-between"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Heart className="w-4 h-4 text-[#E96A87] fill-[#E96A87]" />
            <span className="font-display text-sm font-bold tracking-wider text-[#2B2B2B]">MemoryOS</span>
          </div>

          {/* Một nút duy nhất tối đa hóa chuyển đổi */}
          <button
            onClick={() => setIsWaitlistOpen(true)}
            className="px-4 py-2 bg-[#2B2B2B] hover:bg-[#E96A87] text-white text-[9px] tracking-widest uppercase font-semibold rounded-xl transition-all duration-300 active:scale-95 shadow-sm"
          >
            Create My Memory
          </button>
        </motion.header>
      )}

      {/* 3. NỘI DUNG CHÍNH CỦA LANDING PAGE */}
      {hasEntered && (
        <motion.main
          className="pt-24 space-y-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          
          {/* A. HERO SLOGAN SECTION */}
          <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-12 relative">
            <div className="absolute inset-0 bg-[radial-gradient(#FAF6F0_1.2px,transparent_0)] bg-[size:24px_24px] opacity-35 pointer-events-none" />
            
            <div className="max-w-3xl space-y-8 relative z-10 select-none">
              <div className="flex items-center justify-center gap-1.5 mx-auto">
                <Sparkles className="w-4 h-4 text-[#D9B36A] animate-pulse" />
                <span className="typography-caption text-gray-400">Preserve your timeline</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-[#2B2B2B] leading-tight tracking-wide">
                Xây dựng tổ ấm cho<br />
                <span className="italic font-normal text-[#E96A87]">những hồi ức tươi đẹp.</span>
              </h1>

              <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed max-w-lg mx-auto">
                Lưu giữ trọn vẹn những câu chuyện tình yêu, album ảnh và ước nguyện chung dưới dạng một tác phẩm nghệ thuật điện ảnh, mộc mạc và sang trọng.
              </p>

              <div className="pt-4 flex flex-col items-center gap-4">
                <button
                  onClick={() => setIsWaitlistOpen(true)}
                  className="px-8 py-3 bg-[#E96A87] hover:bg-[#ff758f] text-white text-[10px] tracking-widest uppercase font-semibold rounded-xl transition-all duration-300 active:scale-95 shadow-md"
                >
                  Create My Memory
                </button>
                <span className="text-[10px] text-gray-400 font-sans tracking-wide">Quyền truy cập sớm miễn phí cho 100 người đầu tiên</span>
              </div>
            </div>
          </section>

          {/* B. FEATURES GRID SECTION (Các giá trị cốt lõi) */}
          <section className="py-16 px-6 md:px-12 bg-[#FFFDFB] border-t border-[#FAF6F0] text-left">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="p-6 rounded-xl border border-pink-100/5 bg-[#FFF9F8]/40 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-[#E96A87]/10 flex items-center justify-center text-[#E96A87]">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold font-sans text-[#2B2B2B] uppercase tracking-wider">Trực Quan Vật Lý</h3>
                <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
                  Các trang nhật ký và album không còn là bố cục phẳng thông thường. Chúng phản hồi như các vật thể 3D chân thực, có độ dày và bóng đổ tự nhiên.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-pink-100/5 bg-[#FFF9F8]/40 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-[#D9B36A]/10 flex items-center justify-center text-[#D9B36A]">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold font-sans text-[#2B2B2B] uppercase tracking-wider">Tối Giản Điện Ảnh</h3>
                <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
                  Mỗi chuyển cảnh, lật nắp phong bì hay trượt kéo hình ảnh đều có nhịp điệu cinematic trôi chảy, tập trung 100% sự chú ý vào hồi ức của bạn.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-pink-100/5 bg-[#FFF9F8]/40 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-[#4E8A64]/10 flex items-center justify-center text-[#4E8A64]">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold font-sans text-[#2B2B2B] uppercase tracking-wider">Riêng Tư Tuyệt Đối</h3>
                <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
                  Bảo vệ các sự kiện thầm kín bằng mật khẩu khóa trang hoặc chia sẻ link bảo mật chỉ dành riêng cho hai người.
                </p>
              </div>

            </div>
          </section>

          {/* C. VISUAL PREVIEW SECTION (5 Kỷ Vật 3D) */}
          <PreviewSection />

          {/* D. TEMPLATES EXHIBITION SECTION (3 Mẫu giao diện sang trọng) */}
          <section className="py-24 px-6 md:px-12 bg-[#FFFDFB] border-t border-[#FAF6F0] text-center select-none">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="space-y-3">
                <span className="typography-caption text-[#E96A87]">Elegant Themes</span>
                <h2 className="font-display text-3xl sm:text-4xl font-light text-[#2B2B2B]">
                  Lựa chọn phong cách thiết kế
                </h2>
                <div className="w-12 h-[1px] bg-pink-100/30 mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Template 1 */}
                <div className="group cursor-pointer space-y-4 text-left">
                  <div className="h-64 rounded-xl bg-[#FAF6F0] border border-[#FAF6F0] overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:scale-[1.01] flex items-center justify-center p-6 relative">
                    <div className="w-full h-full bg-[#FFFDFB] rounded border border-pink-100/10 shadow-sm p-4 flex flex-col justify-between">
                      <div className="w-6 h-6 rounded-full bg-[#E96A87]/15" />
                      <div className="w-full h-2 bg-gray-100 rounded" />
                      <div className="w-2/3 h-2 bg-gray-100 rounded" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2B2B2B] tracking-wide font-sans">Vintage Paper (Kem lụa ấm)</h4>
                    <p className="text-[10px] text-gray-400 font-sans mt-0.5">Hoài cổ, ấm áp, nhám mịn tinh tế</p>
                  </div>
                </div>

                {/* Template 2 */}
                <div className="group cursor-pointer space-y-4 text-left">
                  <div className="h-64 rounded-xl bg-[#1A1616] border border-[#2A2222] overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:scale-[1.01] flex items-center justify-center p-6 relative">
                    <div className="w-full h-full bg-[#231E1E] rounded border border-pink-200/5 shadow-sm p-4 flex flex-col justify-between">
                      <div className="w-6 h-6 rounded-full bg-[#D9B36A]/15" />
                      <div className="w-full h-2 bg-gray-800 rounded" />
                      <div className="w-2/3 h-2 bg-gray-800 rounded" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2B2B2B] tracking-wide font-sans">Midnight Galaxy (Vũ trụ sâu thẳm)</h4>
                    <p className="text-[10px] text-gray-400 font-sans mt-0.5">Huyền ảo, tinh tú, lấp lánh ánh sao</p>
                  </div>
                </div>

                {/* Template 3 */}
                <div className="group cursor-pointer space-y-4 text-left">
                  <div className="h-64 rounded-xl bg-[#FCFAF7] border border-[#FAF6F0] overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:scale-[1.01] flex items-center justify-center p-6 relative">
                    <div className="w-full h-full bg-[#FFFDFB] rounded border border-[#FAF6F0] shadow-sm p-4 flex flex-col justify-between">
                      <div className="w-6 h-6 rounded-full bg-[#4E8A64]/15" />
                      <div className="w-full h-2 bg-gray-100 rounded" />
                      <div className="w-2/3 h-2 bg-gray-100 rounded" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2B2B2B] tracking-wide font-sans">Autumn Linen (Linen Mùa Thu)</h4>
                    <p className="text-[10px] text-gray-400 font-sans mt-0.5">Tự nhiên, mộc mạc, yên bình ấm cúng</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* E. FAQ SECTION */}
          <FaqSection />

          {/* F. FOOTER LÃNG MẠN */}
          <footer className="py-16 px-6 border-t border-[#FAF6F0] text-center select-none bg-[#FFFDFB]">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#E96A87] fill-[#E96A87]" />
                <span className="font-display text-xs font-bold tracking-wider text-[#2B2B2B]">MemoryOS</span>
              </div>
              <p className="font-display text-sm italic text-gray-400 max-w-sm mx-auto">
                "Vì mỗi kỷ niệm bên nhau đều xứng đáng có một tổ ấm tuyệt vời."
              </p>
              <div className="text-[9px] tracking-widest text-[#A3A3A3] uppercase font-bold pt-4">
                &copy; {new Date().getFullYear()} MemoryOS. All rights reserved.
              </div>
            </div>
          </footer>

        </motion.main>
      )}

      {/* 🚀 WAITLIST DIALOG THU THẬP EMAIL */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

    </div>
  );
}
