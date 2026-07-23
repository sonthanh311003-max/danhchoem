'use client';

import React, { useState, useEffect } from 'react';
import { useMemory } from '@/lib/MemoryContext';
import { Hourglass, Calendar, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FutureLetter() {
  const { couple } = useMemory();
  const [isTimePassed, setIsTimePassed] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const openDate = new Date(couple.futureLetterOpenDate);
      const now = new Date();
      const diff = openDate.getTime() - now.getTime();

      if (diff <= 0) {
        setIsTimePassed(true);
        // Tự động cho phép mở khi qua hạn mở khóa
      } else {
        setIsTimePassed(false);
        const msInSecond = 1000;
        const msInMinute = 1000 * 60;
        const msInHour = 1000 * 60 * 60;
        const msInDay = 1000 * 60 * 60 * 24;
        const msInYear = 1000 * 60 * 60 * 24 * 365;

        const years = Math.floor(diff / msInYear);
        const days = Math.floor((diff % msInYear) / msInDay);
        const hours = Math.floor((diff % msInDay) / msInHour);
        const minutes = Math.floor((diff % msInHour) / msInMinute);
        const seconds = Math.floor((diff % msInMinute) / msInSecond);

        setTimeLeft({ years, days, hours, minutes, seconds });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [couple.futureLetterOpenDate]);

  return (
    <div className="w-full max-w-md mx-auto select-none">
      
      <AnimatePresence mode="wait">
        {!isOpened ? (
          /* ✉️ TRẠNG THÁI KHÓA - PHONG BÌ GIẤY THẬT NIÊM PHONG SÁP VÀNG CÙNG ĐỒNG HỒ ĐẾM NGƯỢC */
          <motion.div
            key="closed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="relative bg-[#FFFDFB] rounded-xl border border-pink-100/30 p-8 shadow-md flex flex-col items-center min-h-[460px] justify-between"
            style={{
              backgroundImage: 'radial-gradient(#fbf9f6 1px, transparent 0), radial-gradient(#fbf9f6 1px, transparent 0)',
              backgroundSize: '16px 16px',
              backgroundPosition: '0 0, 8px 8px'
            }}
          >
            {/* Biểu tượng đồng hồ cát */}
            <div className="w-14 h-14 bg-[#FFF9F8] rounded-full border border-pink-100/10 flex items-center justify-center text-rose-400 mb-4">
              <Hourglass className="w-5 h-5 animate-spin [animation-duration:15s]" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-display text-2xl font-light text-[#2B2B2B]">
                Thư Gửi Tương Lai
              </h3>
              
              <div className="inline-flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-[#7A7A7A] bg-[#FFF9F8] px-3 py-1 rounded-full border border-pink-100/10">
                <Calendar className="w-3.5 h-3.5 text-[#E96A87]" />
                <span>Mở ngày: {new Date(couple.futureLetterOpenDate).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>

            {/* Phong bì niêm phong sáp vàng */}
            <div className="relative w-full max-w-[280px] h-32 my-6 bg-[#FAF6F0] border border-pink-200/30 rounded-lg shadow-inner flex items-center justify-center">
              <div className="absolute inset-0" style={{
                clipPath: 'polygon(0% 0%, 50% 50%, 100% 0%)',
                borderBottom: '1px solid rgba(233, 106, 135, 0.08)'
              }} />
              <div className="absolute inset-0" style={{
                clipPath: 'polygon(0% 100%, 50% 50%, 100% 100%)',
                borderTop: '1px solid rgba(233, 106, 135, 0.08)'
              }} />
              
              {/* Con dấu sáp vàng kim niêm phong */}
              <div className="relative w-12 h-12 rounded-full bg-[#D9B36A] flex items-center justify-center text-white border border-[#cfa557] shadow-md">
                <span className="text-[10px] font-sans font-bold">LOCKED</span>
              </div>
            </div>

            {/* Bộ đếm ngược thời gian hoặc nút mở */}
            {!isTimePassed ? (
              /* ĐANG ĐẾM NGƯỢC (Tối giản hoàn toàn) */
              <div className="w-full text-center space-y-4">
                <p className="text-xs text-[#7A7A7A] leading-relaxed max-w-xs mx-auto px-4">
                  Bức thư này được niêm phong bởi thời gian. Hãy kiên nhẫn đợi đến ngày mở khóa nhé.
                </p>
                
                {/* Countdown ngang mỏng mượt */}
                <div className="flex items-center justify-center gap-3 text-xs text-[#7A7A7A] tracking-wider font-sans pt-2 border-t border-pink-100/10 w-full max-w-[280px] mx-auto">
                  {timeLeft.years > 0 && (
                    <>
                      <div><span className="font-semibold text-[#2B2B2B]">{timeLeft.years}</span>y</div>
                      <span>•</span>
                    </>
                  )}
                  <div><span className="font-semibold text-[#2B2B2B]">{timeLeft.days}</span>d</div>
                  <span>•</span>
                  <div><span className="font-semibold text-[#2B2B2B]">{String(timeLeft.hours).padStart(2, '0')}</span>h</div>
                  <span>•</span>
                  <div><span className="font-semibold text-[#2B2B2B]">{String(timeLeft.minutes).padStart(2, '0')}</span>m</div>
                  <span>•</span>
                  <div><span className="font-semibold text-[#E96A87]">{String(timeLeft.seconds).padStart(2, '0')}</span>s</div>
                </div>
              </div>
            ) : (
              /* ĐÃ QUA THỜI HẠN - CHO PHÉP MỞ */
              <div className="w-full text-center">
                <p className="text-xs text-emerald-600 font-semibold mb-4 tracking-wider uppercase">
                  ✨ Niêm phong đã mở khóa!
                </p>
                <button
                  onClick={() => setIsOpened(true)}
                  className="w-full py-2.5 rounded-xl bg-[#E96A87] hover:bg-[#ff758f] text-white font-medium text-xs tracking-widest uppercase transition-all duration-300 active:scale-95 shadow-sm"
                >
                  Mở Thư Tương Lai
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          /* 📜 TRẠNG THÁI MỞ KHÓA - RUỘT GIẤY VIẾT TAY THẬT */
          <motion.div
            key="opened"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6 }}
            className="relative bg-[#FCFBF9] rounded-xl border border-[#FAF6F0] p-8 shadow-xl min-h-[460px] flex flex-col justify-between"
            style={{
              boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.04)'
            }}
          >
            {/* Thanh tiêu đề mỏng */}
            <div className="flex justify-between items-center border-b border-pink-100/10 pb-3 mb-6">
              <span className="font-display text-[#E96A87] text-lg font-light flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                Dear Us,
              </span>
              <button
                onClick={() => setIsOpened(false)}
                className="text-[10px] font-sans tracking-widest uppercase text-gray-400 hover:text-[#E96A87] transition-colors"
              >
                Đóng lại
              </button>
            </div>

            {/* Ruột thư viết tay lãng mạn */}
            <div className="flex-1 pr-2 relative overflow-y-auto max-h-[340px]">
              <p className="font-handwriting text-2xl text-[#2B2B2B]/90 leading-relaxed whitespace-pre-wrap select-text pr-2 pt-2">
                {couple.futureLetterContent}
              </p>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
