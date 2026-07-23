'use client';

import React, { useState } from 'react';
import { useMemory } from '@/lib/MemoryContext';
import { Lock, Unlock, Mail, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

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
      
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#E96A87', '#D9B36A', '#ffffff']
      });
    } else {
      setIsShaking(true);
      setErrorMsg('Mật mã chưa chính xác. Gợi ý: Ngày kỷ niệm DDMMYYYY');
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setPassword('');
    setErrorMsg('');
  };

  return (
    <div className="w-full max-w-md mx-auto select-none">
      
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          /* ✉️ TRẠNG THÁI KHÓA - PHONG BÌ GIẤY THẬT NIÊM PHONG SÁP ĐỎ */
          <motion.div
            key="locked"
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
            {/* Lỗ khóa mỏng */}
            <div className="w-14 h-14 bg-[#FFF9F8] rounded-full border border-pink-100/10 flex items-center justify-center text-[#E96A87] mb-4">
              <Lock className="w-5 h-5" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-display text-2xl font-light text-[#2B2B2B]">
                Thư Tình Bí Mật
              </h3>
              <p className="text-xs text-[#7A7A7A] max-w-xs leading-relaxed font-sans px-2">
                Được niêm phong bằng mật mã riêng tư của hai bạn. Hãy nhập mật mã để đọc những dòng cảm xúc sâu kín nhất.
              </p>
            </div>

            {/* Hình vẽ phong bì thư tối giản */}
            <div className="relative w-full max-w-[280px] h-32 my-6 bg-[#FAF6F0] border border-pink-200/30 rounded-lg shadow-inner flex items-center justify-center">
              {/* Cánh thư chéo mờ ảo */}
              <div className="absolute inset-0" style={{
                clipPath: 'polygon(0% 0%, 50% 50%, 100% 0%)',
                borderBottom: '1px solid rgba(233, 106, 135, 0.08)'
              }} />
              <div className="absolute inset-0" style={{
                clipPath: 'polygon(0% 100%, 50% 50%, 100% 100%)',
                borderTop: '1px solid rgba(233, 106, 135, 0.08)'
              }} />
              
              {/* Con dấu sáp vàng kim sang trọng giữa phong bì */}
              <div className="relative w-12 h-12 rounded-full bg-[#D9B36A] flex items-center justify-center text-white border border-[#cfa557] shadow-md animate-pulse">
                <Heart className="w-5 h-5 fill-white text-white opacity-95" />
              </div>
            </div>

            {/* Form nhập mã */}
            <form 
              onSubmit={handleUnlock}
              className={`w-full flex flex-col gap-3 transition-transform ${isShaking ? 'animate-shake' : ''}`}
              style={isShaking ? { animation: 'shake 0.5s ease-in-out' } : {}}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật mã..."
                className="w-full px-4 py-2.5 rounded-xl border border-pink-100/20 text-center text-sm bg-white/80 focus:outline-none focus:ring-1 focus:ring-[#E96A87] tracking-widest placeholder-gray-400 placeholder:tracking-normal font-sans"
              />
              {errorMsg && (
                <p className="text-red-500 text-[10px] text-center font-sans tracking-wide">{errorMsg}</p>
              )}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#E96A87] hover:bg-[#ff758f] text-white font-medium text-xs tracking-widest uppercase transition-all duration-300 active:scale-95 shadow-sm"
              >
                Mở Niêm Phong
              </button>
            </form>

            <style dangerouslySetInnerHTML={{__html: `
              @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-6px); }
                40%, 80% { transform: translateX(6px); }
              }
              .animate-shake {
                animation: shake 0.5s ease-in-out;
              }
            `}} />
          </motion.div>
        ) : (
          /* 📜 TRẠNG THÁI MỞ KHÓA - RUỘT GIẤY VIẾT TAY THẬT */
          <motion.div
            key="unlocked"
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
                Dear Samira,
              </span>
              <button
                onClick={handleLock}
                className="text-[10px] font-sans tracking-widest uppercase text-gray-400 hover:text-[#E96A87] transition-colors"
              >
                Khóa lại
              </button>
            </div>

            {/* Ruột giấy viết tay thật (Realistic Paper Texture) */}
            <div className="flex-1 pr-2 relative overflow-y-auto max-h-[300px]">
              {/* Dấu sáp chìm góc dưới */}
              <div className="absolute right-4 bottom-4 w-12 h-12 rounded-full bg-[#E96A87]/5 border border-[#E96A87]/10 flex items-center justify-center text-[#E96A87]/20 pointer-events-none select-none font-bold text-lg rotate-12">
                L &amp; M
              </div>
              
              {/* Nội dung thư viết bằng font tay mượt mà */}
              <p className="font-handwriting text-2xl text-[#2B2B2B]/90 leading-relaxed whitespace-pre-wrap select-text pr-2 pt-2">
                {couple.secretLetterContent}
              </p>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
