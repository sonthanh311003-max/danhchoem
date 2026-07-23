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
        // Nếu ngày kỷ niệm ở tương lai
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [couple.anniversaryDate]);

  return (
    <div className="flex flex-col items-center justify-center p-6 my-10 max-w-2xl mx-auto">
      <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center font-display flex items-center gap-2">
        Chúng mình đã bên nhau được
        <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse inline-block" />
      </h3>
      
      <div className="grid grid-cols-4 gap-3 md:gap-6 w-full max-w-lg">
        {/* Days */}
        <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center border transition-all duration-300 transform hover:scale-105">
          <span className="text-3xl md:text-5xl font-bold font-display text-[var(--color-primary)]">
            {timeLeft.days}
          </span>
          <span className="text-xs md:text-sm uppercase tracking-wider text-[var(--color-text-muted)] mt-2 font-medium">
            Ngày
          </span>
        </div>

        {/* Hours */}
        <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center border transition-all duration-300 transform hover:scale-105">
          <span className="text-3xl md:text-5xl font-bold font-display text-[var(--color-primary)]">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-xs md:text-sm uppercase tracking-wider text-[var(--color-text-muted)] mt-2 font-medium">
            Giờ
          </span>
        </div>

        {/* Minutes */}
        <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center border transition-all duration-300 transform hover:scale-105">
          <span className="text-3xl md:text-5xl font-bold font-display text-[var(--color-primary)]">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-xs md:text-sm uppercase tracking-wider text-[var(--color-text-muted)] mt-2 font-medium">
            Phút
          </span>
        </div>

        {/* Seconds */}
        <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center border transition-all duration-300 transform hover:scale-105">
          <span className="text-3xl md:text-5xl font-bold font-display text-[var(--color-primary)]">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-xs md:text-sm uppercase tracking-wider text-[var(--color-text-muted)] mt-2 font-medium">
            Giây
          </span>
        </div>
      </div>
    </div>
  );
}
