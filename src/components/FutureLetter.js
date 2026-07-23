'use client';

import React, { useState, useEffect } from 'react';
import { useMemory } from '@/lib/MemoryContext';
import { Hourglass, Lock, Unlock, Calendar } from 'lucide-react';
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
      } else {
        setIsTimePassed(false);
        // Tính toán năm, ngày, giờ, phút, giây
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
    <div className="py-12 px-4 max-w-lg mx-auto">
      <div className="glass-card rounded-3xl p-6 md:p-8 border shadow-sm text-center relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!isOpened ? (
            /* TRẠNG THÁI CHƯA MỞ (ĐANG ĐẾM NGƯỢC HOẶC CHỜ MỞ) */
            <motion.div
              key="closed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center py-4"
            >
              <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center text-violet-500 mb-6 border border-violet-200">
                <Hourglass className="w-10 h-10 animate-spin [animation-duration:15s]" />
              </div>

              <h3 className="text-xl md:text-2xl font-bold font-display text-[var(--color-text)] mb-2">
                Thư Gửi Tương Lai (Future Letter)
              </h3>
              
              <div className="flex items-center gap-1 text-xs font-semibold text-[var(--color-text-muted)] mb-6 bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
                <Calendar className="w-3.5 h-3.5" />
                <span>Mở vào ngày: {new Date(couple.futureLetterOpenDate).toLocaleDateString('vi-VN')}</span>
              </div>

              {!isTimePassed ? (
                /* CHƯA ĐẾN NGÀY: HIỂN THỊ COUNTDOWN */
                <div className="w-full">
                  <p className="text-sm text-[var(--color-text-muted)] mb-6 px-4">
                    Bức thư này được niêm phong bằng dòng chảy của thời gian. Hãy kiên nhẫn chờ đợi đến ngày được mở nhé!
                  </p>

                  <div className="grid grid-cols-5 gap-2 w-full max-w-sm mx-auto">
                    {/* Years */}
                    <div className="flex flex-col items-center bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                      <span className="text-xl font-bold text-gray-700">{timeLeft.years}</span>
                      <span className="text-[10px] text-gray-500 font-medium">Năm</span>
                    </div>
                    {/* Days */}
                    <div className="flex flex-col items-center bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                      <span className="text-xl font-bold text-gray-700">{timeLeft.days}</span>
                      <span className="text-[10px] text-gray-500 font-medium">Ngày</span>
                    </div>
                    {/* Hours */}
                    <div className="flex flex-col items-center bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                      <span className="text-xl font-bold text-gray-700">{String(timeLeft.hours).padStart(2, '0')}</span>
                      <span className="text-[10px] text-gray-500 font-medium">Giờ</span>
                    </div>
                    {/* Minutes */}
                    <div className="flex flex-col items-center bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                      <span className="text-xl font-bold text-gray-700">{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <span className="text-[10px] text-gray-500 font-medium">Phút</span>
                    </div>
                    {/* Seconds */}
                    <div className="flex flex-col items-center bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                      <span className="text-xl font-bold text-red-500">{String(timeLeft.seconds).padStart(2, '0')}</span>
                      <span className="text-[10px] text-gray-500 font-medium">Giây</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* ĐÃ ĐẾN NGÀY: CHO PHÉP MỞ */
                <div className="w-full">
                  <p className="text-sm text-green-600 font-semibold mb-6">
                    ✨ Thời khắc đã đến! Niêm phong thời gian đã được gỡ bỏ.
                  </p>
                  <button
                    onClick={() => setIsOpened(true)}
                    className="w-full max-w-xs py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 mx-auto"
                  >
                    <span>Mở thư tương lai</span>
                    <Unlock className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            /* TRẠNG THÁI ĐÃ MỞ THƯ */
            <motion.div
              key="opened"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-4 text-left"
            >
              <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-4 mb-6">
                <span className="font-bold font-display text-indigo-600 text-lg">Thư gửi tương lai</span>
                <button
                  onClick={() => setIsOpened(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-500 transition-colors"
                >
                  Đóng lại
                </button>
              </div>

              <div className="bg-indigo-50/40 border border-indigo-100 rounded-2xl p-6 shadow-inner min-h-[200px] text-gray-700 leading-relaxed font-serif whitespace-pre-line text-sm md:text-base">
                {couple.futureLetterContent}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
