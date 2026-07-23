'use client';

import React, { useState, useEffect } from 'react';
import { useMemory } from '@/lib/MemoryContext';
import { Lock, Unlock, Mail, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// Hiệu ứng gõ chữ (Typing Effect Component)
function TypingText({ text }) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    
    const interval = setInterval(() => {
      if (index < text.length) {
        // Lấy ký tự tiếp theo
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 45); // Tốc độ gõ 45ms mỗi chữ

    return () => clearInterval(interval);
  }, [text]);

  return <p className="whitespace-pre-line text-sm md:text-base leading-relaxed text-gray-800 font-serif">{displayedText}</p>;
}

export default function SecretLetter() {
  const { couple } = useMemory();
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    
    if (password === couple.secretLetterKey) {
      setIsUnlocked(true);
      setErrorMsg('');
      
      // Bắn pháo hoa Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setIsShaking(true);
      setErrorMsg('Mật mã chưa chính xác. Gợi ý: Ngày kỷ niệm của hai bạn (DDMMYYYY)');
      setTimeout(() => setIsShaking(false), 500); // Tắt rung sau 500ms
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setPassword('');
    setErrorMsg('');
  };

  return (
    <div className="py-12 px-4 max-w-lg mx-auto">
      <div className="glass-card rounded-3xl p-6 md:p-8 border shadow-sm text-center relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* TRẠNG THÁI KHÓA */
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center py-6"
            >
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-6 border border-rose-200">
                <Lock className="w-10 h-10 animate-pulse" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold font-display text-[var(--color-text)] mb-3">
                Thư Tình Bí Mật (Secret Letter)
              </h3>
              
              <p className="text-sm text-[var(--color-text-muted)] mb-8 px-4">
                Bức thư này đã được khóa lại bằng mật码 bí mật của hai người. Nhập mật mã để mở khóa cảm xúc.
              </p>

              {/* Form nhập mật mã */}
              <form 
                onSubmit={handleUnlock} 
                className={`w-full max-w-sm flex flex-col gap-3 transition-transform ${isShaking ? 'animate-bounce' : ''}`}
                style={isShaking ? { animation: 'shake 0.5s ease-in-out' } : {}}
              >
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật mã bí mật..."
                    className="w-full px-5 py-3 rounded-2xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-center text-lg bg-white/70 tracking-widest placeholder-gray-400 placeholder:tracking-normal"
                  />
                </div>
                
                {errorMsg && (
                  <p className="text-red-500 text-xs font-semibold px-2">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  className="w-full mt-3 py-3 rounded-2xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <span>Mở thư</span>
                  <Unlock className="w-4 h-4" />
                </button>
              </form>

              {/* CSS inline cho hiệu ứng rung (shake) */}
              <style jsx global>{`
                @keyframes shake {
                  0%, 100% { transform: translateX(0); }
                  20%, 60% { transform: translateX(-8px); }
                  40%, 80% { transform: translateX(8px); }
                }
              `}</style>
            </motion.div>
          ) : (
            /* TRẠNG THÁI MỞ KHÓA */
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-4 text-left"
            >
              {/* Tiêu đề & Nút khóa lại */}
              <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-4 mb-6">
                <div className="flex items-center gap-2 text-[var(--color-primary)]">
                  <Mail className="w-5 h-5" />
                  <span className="font-bold font-display text-lg">Dear You,</span>
                </div>
                <button
                  onClick={handleLock}
                  className="px-3.5 py-1.5 rounded-xl border border-[var(--color-border)] hover:bg-red-50 text-xs font-semibold text-red-500 transition-colors"
                >
                  Khóa lại
                </button>
              </div>

              {/* Thư viết dạng phong thư lãng mạn */}
              <div className="bg-amber-50/70 border border-amber-200/50 rounded-2xl p-6 shadow-inner min-h-[250px] relative">
                {/* Dấu niêm phong sáp */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-rose-600/20 border border-rose-600/30 flex items-center justify-center text-rose-600 select-none font-bold text-xs">
                  ❤️
                </div>
                
                {/* Typing Effect */}
                <TypingText text={couple.secretLetterContent} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
