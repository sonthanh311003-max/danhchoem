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

    // Bắn pháo hoa Confetti
    if (nextCount % 5 === 0) {
      // Pháo hoa lớn mỗi 5 lần bấm
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    } else {
      // Confetti nhỏ bình thường
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }

    // Chọn thông điệp tiếp theo
    const randomMsg = SURPRISE_MESSAGES[Math.floor(Math.random() * SURPRISE_MESSAGES.length)];
    setMessage(randomMsg);
    setIsShowingMessage(true);

    // Ẩn thông điệp sau 3 giây
    setTimeout(() => {
      setIsShowingMessage(false);
    }, 3000);
  };

  return (
    <div className="py-12 px-4 text-center max-w-sm mx-auto flex flex-col items-center">
      
      {/* Hiển thị thông điệp ẩn hiện */}
      <div className="h-16 flex items-center justify-center mb-4">
        <AnimatePresence mode="wait">
          {isShowingMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className="bg-white/90 border border-rose-200 text-rose-600 font-bold px-6 py-2.5 rounded-full shadow-md text-sm md:text-base font-display flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nút Surprise quả tim lớn */}
      <motion.button
        onClick={handleClick}
        className="w-28 h-28 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex flex-col items-center justify-center shadow-lg border-4 border-white hover:from-rose-600 hover:to-pink-600 transition-all active:scale-90"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }}
        style={{
          boxShadow: '0 8px 30px rgba(244, 63, 94, 0.4)',
          borderColor: 'var(--color-border)'
        }}
      >
        <Heart className="w-8 h-8 fill-white mb-1" />
        <span className="text-xs uppercase font-extrabold tracking-widest">Surprise!</span>
      </motion.button>

      <span className="text-xs text-[var(--color-text-muted)] mt-4 font-semibold">
        Click để nhận bất ngờ ngọt ngào ({clickCount} lần đã nhấn)
      </span>
    </div>
  );
}
