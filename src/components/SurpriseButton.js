'use client';

import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

const SURPRISE_MESSAGES = [
  "Anh yêu em ❤️",
  "Yêu em nhiều hơn mỗi ngày! 💕",
  "Cảm ơn em vì đã xuất hiện bên anh 🌸",
  "Thương em nhất trên đời luôn! 🥰",
  "Đi cùng nhau đến tận cùng thế giới nhé ✈️",
  "Em là điều tuyệt vời nhất của anh ✨",
  "Anh nhớ em, ngay cả khi vừa gặp xong! 🧸",
  "Hứa bên nhau mãi mãi em nhé! 💍"
];

export default function SurpriseButton() {
  const [clickCount, setClickCount] = useState(0);
  const [message, setMessage] = useState('');
  const [isShowingMessage, setIsShowingMessage] = useState(false);

  const handleClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount % 5 === 0) {
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 1000 };
      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 45 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#E96A87', '#D9B36A', '#ffffff'] }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#E96A87', '#D9B36A', '#ffffff'] }));
      }, 250);
    } else {
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 50,
        origin: { x: 0 },
        colors: ['#E96A87', '#D9B36A', '#ffffff']
      });
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 50,
        origin: { x: 1 },
        colors: ['#E96A87', '#D9B36A', '#ffffff']
      });
    }

    const randomMsg = SURPRISE_MESSAGES[Math.floor(Math.random() * SURPRISE_MESSAGES.length)];
    setMessage(randomMsg);
    setIsShowingMessage(true);

    setTimeout(() => {
      setIsShowingMessage(false);
    }, 2800);
  };

  return (
    <div className="py-12 px-4 text-center max-w-sm mx-auto flex flex-col items-center select-none">
      
      {/* Khung hiển thị tin nhắn vẽ tay */}
      <div className="h-16 flex items-center justify-center mb-6">
        <AnimatePresence mode="wait">
          {isShowingMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -8 }}
              className="bg-white border border-pink-100/10 px-6 py-2 rounded-full shadow-sm flex items-center gap-2"
              style={{ boxShadow: '0 10px 25px -8px rgba(233, 106, 135, 0.1)' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D9B36A]" />
              <span className="font-handwriting text-2xl text-[#E96A87] pt-0.5">{message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Con dấu sáp trái tim mộc mạc tối giản */}
      <motion.button
        onClick={handleClick}
        className="w-24 h-24 rounded-full bg-[#FCFBF9] text-[#E96A87] flex flex-col items-center justify-center shadow-md border-2 border-pink-100/15 hover:border-[#E96A87]/30 transition-all duration-300 active:scale-95"
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
        style={{
          boxShadow: '0 15px 35px -10px rgba(233, 106, 135, 0.08)'
        }}
      >
        <Heart className="w-7 h-7 fill-[#E96A87]/10 text-[#E96A87] mb-1 animate-pulse" />
        <span className="text-[9px] tracking-widest font-sans uppercase font-semibold text-[#7A7A7A]">Surprise</span>
      </motion.button>

      <span className="text-[10px] tracking-wider text-[#7A7A7A] uppercase font-light mt-5">
        Click for a sweet note ({clickCount} times)
      </span>
      
    </div>
  );
}
