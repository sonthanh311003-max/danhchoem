'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

/**
 * Reusable cotton envelope with wax seal, hover glow, and physical click-to-open transitions.
 */
export default function FloatingEnvelope({ 
  size = 'md', 
  glowColor = 'gold', 
  onOpen, 
  autoFloat = true, 
  label 
}) {
  const [sealBroken, setSealBroken] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Kích thước co giãn linh hoạt
  const sizeClasses = {
    sm: { w: '260px', h: '160px', font: 'text-[9px]' },
    md: { w: '340px', h: '210px', font: 'text-xs' },
    lg: { w: 'clamp(280px, 32vw, 460px)', h: 'calc(var(--w-val) * 0.62)', font: 'text-sm' }
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const glowStyles = {
    gold: 'rgba(217, 179, 106, 0.08)',
    rose: 'rgba(233, 106, 135, 0.08)'
  };

  const handleEnvelopeClick = () => {
    if (isOpen) return;
    
    // Tạm dừng 200ms vật lý -> nứt con dấu sáp
    setTimeout(() => {
      setSealBroken(true);
    }, 200);

    // 800ms -> mở nắp và bắt đầu trượt thư lên
    setTimeout(() => {
      setIsOpen(true);
      if (onOpen) {
        onOpen();
      }
    }, 800);
  };

  return (
    <div 
      className="flex flex-col items-center justify-center relative select-none"
      style={{
        '--w-val': currentSize.w,
        width: 'var(--w-val)',
        height: currentSize.h,
      }}
    >
      
      {/* Lớp hào quang Glow mờ ảo phía sau */}
      <div 
        className="absolute inset-0 rounded-full blur-[60px] pointer-events-none transition-all duration-500"
        style={{
          background: glowStyles[glowColor] || glowStyles.gold,
          transform: 'scale(1.3)'
        }}
      />

      <motion.div
        onClick={handleEnvelopeClick}
        className={`relative w-full h-full cursor-pointer 
          ${autoFloat ? 'animate-breathe' : ''}`}
        style={{
          perspective: '1200px',
        }}
      >
        {/* A. THÂN PHONG BÌ PHÍA SAU (Back Flap) */}
        <div className="absolute inset-0 bg-[#F4EDE4] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-[#FAF6F0] z-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#FAF6F0_1px,transparent_0)] bg-[size:16px_16px] opacity-25" />
        </div>

        {/* B. LÁ THƯ TÌNH TRƯỢT LÊN */}
        <motion.div
          className="absolute w-[94%] h-[92%] bg-[#FFFDFB] rounded-xl z-25 p-6 flex flex-col justify-between border border-[#FAF6F0]/80 shadow-md"
          style={{ left: '3%' }}
          initial={{ y: 0, scale: 0.98 }}
          animate={isOpen ? { y: '-62%', scale: 1 } : { y: 0, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 50, damping: 14 }}
        >
          <div className="flex justify-between items-center border-b border-[#FAF6F0] pb-1.5">
            <span className="font-display text-[8px] tracking-[0.25em] text-gray-400 uppercase font-bold">MemoryOS</span>
            <Heart className="w-3 h-3 text-[#E96A87] fill-current" />
          </div>
          <div className="text-center my-auto flex flex-col gap-1.5">
            <span className="font-display text-xs italic text-gray-400">Preserving a moment</span>
          </div>
          <div className="w-full text-center">
            <span className="font-sans text-[8px] text-gray-300 tracking-widest uppercase">Click to open</span>
          </div>
        </motion.div>

        {/* C. NẮP PHONG BÌ XOAY LẬT 3D (Lid) */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/2 bg-[#E9DFD3] rounded-t-2xl z-30 origin-top border-b border-[#FAF6F0]/20"
          initial={{ rotateX: 0 }}
          animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
        />

        {/* D. MẶT TRƯỚC PHONG BÌ (Triangles overlay) */}
        <div className="absolute inset-0 z-40 pointer-events-none" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
          <div className="absolute left-0 bottom-0 top-0 w-1/2 bg-[#EFE7DC] rounded-l-2xl" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
          <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-[#EFE7DC] rounded-r-2xl" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-[#E8DFD3] rounded-b-2xl shadow-[0_-4px_12px_rgba(0,0,0,0.05)]" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
        </div>

        {/* E. CON DẤU SÁP VÀNG NIÊM PHONG (Wax Seal) */}
        <div className="absolute z-45 inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex pointer-events-auto">
            <motion.div
              className="w-5.5 h-11 bg-[#E96A87] rounded-l-full shadow-lg border-r border-red-700/20 flex items-center justify-end"
              animate={sealBroken ? { x: -35, rotate: -30, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <span className="text-[10px] text-white/30 font-bold mr-1.5">M</span>
            </motion.div>
            <motion.div
              className="w-5.5 h-11 bg-[#E96A87] rounded-r-full shadow-lg border-l border-red-700/20 flex items-center justify-start"
              animate={sealBroken ? { x: 35, rotate: 30, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <span className="text-[10px] text-white/30 font-bold ml-1.5">S</span>
            </motion.div>
          </div>
        </div>

      </motion.div>

      {/* Caption phụ dưới phong bì */}
      {label && (
        <span className="absolute -bottom-10 text-[9px] tracking-[0.2em] text-gray-400 dark:text-[#7A6D6B] uppercase font-bold text-center w-max">
          {label}
        </span>
      )}

      <style jsx global>{`
        @keyframes float-breathe {
          0% { transform: translateY(0); }
          100% { transform: translateY(-7px); }
        }
        .animate-breathe {
          animation: float-breathe 6s ease-in-out infinite alternate;
        }
      `}</style>

    </div>
  );
}
