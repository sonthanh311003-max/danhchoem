'use client';

import React, { useState, useEffect } from 'react';
import { useMemory } from '@/lib/MemoryContext';
import { Heart } from 'lucide-react';

export default function TimeCounter() {
  const { couple } = useMemory();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const anniversary = new Date(couple.anniversaryDate);
      const now = new Date();
      const difference = now.getTime() - anniversary.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [couple.anniversaryDate]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 max-w-4xl mx-auto text-center select-none">
      
      {/* Tiêu đề phụ thanh nhã */}
      <span className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#7A7A7A] font-sans font-medium mb-6 flex items-center gap-2">
        <span>Our Journey Continued For</span>
        <Heart className="w-3.5 h-3.5 text-[#E96A87] fill-[#E96A87]/30" />
      </span>

      {/* Số ngày khổng lồ (Gia tăng thị giác cực mạnh) */}
      <div className="flex flex-col items-center justify-center my-4 animate-fade-in">
        <span className="font-display text-8xl md:text-[10rem] font-light leading-none text-[#2B2B2B] tracking-tight">
          {timeLeft.days.toLocaleString()}
        </span>
        <span className="font-display italic text-2xl md:text-3xl text-[#E96A87] font-light mt-4">
          beautiful days
        </span>
      </div>

      {/* Giờ, phút, giây phụ mỏng manh ở dưới cùng */}
      <div className="mt-12 flex items-center justify-center gap-3 md:gap-5 text-xs md:text-sm text-[#7A7A7A] tracking-[0.15em] font-sans font-light border-t border-pink-100/10 pt-6 w-full max-w-md">
        <div>
          <span className="font-medium text-[#2B2B2B]">{String(timeLeft.hours).padStart(2, '0')}</span>h
        </div>
        <span className="text-[#E96A87]/30">•</span>
        <div>
          <span className="font-medium text-[#2B2B2B]">{String(timeLeft.minutes).padStart(2, '0')}</span>m
        </div>
        <span className="text-[#E96A87]/30">•</span>
        <div>
          <span className="font-medium text-[#2B2B2B]">{String(timeLeft.seconds).padStart(2, '0')}</span>s
        </div>
      </div>
      
    </div>
  );
}
