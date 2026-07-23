'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroEnvelope({ onEnter }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sealBroken, setSealBroken] = useState(false);

  // Tự động kích hoạt chuỗi hoạt ảnh bóc thư điện ảnh sau 1.2s
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setSealBroken(true); // Con dấu sáp nứt đôi
    }, 1200);

    const timer2 = setTimeout(() => {
      setIsOpen(true); // Mở nắp phong bì và kéo thư ra
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen z-50 flex items-center justify-center bg-[#FFF9F8] overflow-hidden select-none">
      
      {/* 🌌 HẠT BỤI NẮNG LƠ LỬNG DỊU NHẸ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#D9B36A]/15 blur-sm"
            style={{
              width: `${(i + 1) * 3}px`,
              height: `${(i + 1) * 3}px`,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animation: `float-dust ${6 + i * 2}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* ✉️ 3D PERSPECTIVE WRAPPER PHONG BÌ */}
      <div className="relative flex flex-col items-center justify-center" style={{ perspective: '1200px' }}>
        
        <motion.div
          className="relative w-[340px] h-[220px] sm:w-[480px] sm:h-[300px] flex items-center justify-center transition-all duration-700"
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6 }}
        >
          {/* A. THÂN PHONG BÌ PHÍA SAU (Envelope Back Flap) */}
          <div className="absolute inset-0 bg-[#F4EDE4] rounded-2xl shadow-[0_20px_50px_rgba(61,43,39,0.08)] border border-[#FAF6F0] z-20 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#FAF6F0_1px,transparent_0)] bg-[size:16px_16px] opacity-20" />
          </div>

          {/* B. LÁ THƯ TÌNH TRƯỢT RA (Letter Inside) */}
          <motion.div
            className="absolute w-[92%] h-[90%] bg-[#FFFDFB] rounded-xl z-25 p-6 flex flex-col items-center justify-between border border-[#FAF6F0]/80 shadow-[0_4px_15px_rgba(61,43,39,0.02)]"
            initial={{ y: 0, scale: 0.96 }}
            animate={isOpen ? { y: '-62%', scale: 1 } : { y: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.2 }}
          >
            <div className="w-full flex justify-between items-center border-b border-[#FAF6F0] pb-2">
              <span className="font-display text-[9px] tracking-[0.25em] text-[#7A7A7A] uppercase font-bold">MemoryOS</span>
              <span className="font-display text-[10px] italic text-[#E96A87]">Est. 2026</span>
            </div>

            {/* Slogan khơi gợi cảm xúc chính */}
            <div className="text-center my-auto px-2">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-[#2B2B2B] leading-tight tracking-wide">
                Every memory deserves<br />
                <span className="text-[#E96A87] italic font-normal">a beautiful home.</span>
              </h2>
            </div>

            <div className="w-full text-center">
              <span className="font-display text-[9px] tracking-widest text-[#A3A3A3] uppercase">Click inside or scroll down</span>
            </div>
          </motion.div>

          {/* C. NẮP PHONG BÌ XOAY LẬT 3D (Envelope Lid) */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#E9DFD3] rounded-t-2xl z-30 origin-top border-b border-[#FAF6F0]/20"
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
          />

          {/* D. MẶT TRƯỚC PHONG BÌ (Envelope Front Cover - Triangles overlay) */}
          <div 
            className="absolute inset-0 z-40 pointer-events-none"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            }}
          >
            {/* Lớp phủ tam giác bên trái */}
            <div className="absolute left-0 bottom-0 top-0 w-1/2 bg-[#EFE7DC] rounded-l-2xl" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
            {/* Lớp phủ tam giác bên phải */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-[#EFE7DC] rounded-r-2xl" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
            {/* Lớp phủ tam giác phía dưới */}
            <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-[#E8DFD3] rounded-b-2xl border-t border-[#FAF6F0]/10 shadow-[0_-4px_12px_rgba(61,43,39,0.02)]" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
          </div>

          {/* E. CON DẤU SÁP VÀNG NỨT ĐÔI (Split Wax Seal) */}
          <div className="absolute z-45 flex items-center justify-center pointer-events-auto">
            {/* Nửa bên trái con dấu sáp */}
            <motion.div
              className="w-5 h-10 bg-[#D9B36A] rounded-l-full shadow-md border-r border-[#B5924F]/30 flex items-center justify-end"
              animate={sealBroken ? { x: -25, rotate: -25, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className="text-[10px] text-white/40 font-bold mr-1 select-none">M</span>
            </motion.div>
            {/* Nửa bên phải con dấu sáp */}
            <motion.div
              className="w-5 h-10 bg-[#D9B36A] rounded-r-full shadow-md border-l border-[#B5924F]/30 flex items-center justify-start"
              animate={sealBroken ? { x: 25, rotate: 25, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className="text-[10px] text-white/40 font-bold ml-1 select-none">O</span>
            </motion.div>
          </div>

        </motion.div>

      </div>

      {/* 🚀 CHỈ DẪN CUỘN TRANG BẮT ĐẦU */}
      {isOpen && (
        <motion.button
          onClick={onEnter}
          className="absolute bottom-12 z-50 flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span className="font-display text-[10px] tracking-[0.25em] text-[#7A7A7A] uppercase font-bold">Mở cánh cửa kỷ niệm</span>
          <motion.div
            className="w-5 h-8 border border-[#7A7A7A]/30 rounded-full flex justify-center p-1"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="w-1 h-1.5 bg-[#E96A87] rounded-full" />
          </motion.div>
        </motion.button>
      )}

      {/* CSS Styles cho Dust Float */}
      <style jsx global>{`
        @keyframes float-dust {
          0% { transform: translateY(0) translateX(0); opacity: 0.2; }
          100% { transform: translateY(-20px) translateX(10px); opacity: 0.45; }
        }
      `}</style>

    </div>
  );
}
