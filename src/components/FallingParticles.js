'use client';

import React, { useEffect, useState } from 'react';
import { useMemory } from '@/lib/MemoryContext';

export default function FallingParticles() {
  const { theme } = useMemory();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Chỉ tạo hạt trên client-side
    let emoji = '🌸';
    if (theme === 'pink') emoji = '🌸';
    else if (theme === 'galaxy') emoji = '✨';
    else if (theme === 'nature') emoji = '🍃';
    else if (theme === 'christmas') emoji = '❄️';
    else if (theme === 'pixel') emoji = '💖';
    else if (theme === 'luxury') emoji = '✨';
    else if (theme === 'anime') emoji = '⭐';
    else emoji = '❤️';

    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      emoji,
      left: Math.random() * 100, // % width
      delay: Math.random() * 15, // s delay
      duration: 10 + Math.random() * 15, // s duration
      size: 10 + Math.random() * 20, // px
      opacity: 0.3 + Math.random() * 0.7
    }));

    setParticles(newParticles);
  }, [theme]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <span
          key={p.id}
          className="falling-particle select-none"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
