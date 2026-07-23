'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, SkipForward, Heart, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';

export default function HeroEnvelope({ onEnter }) {
  const router = useRouter();
  const layout = useResponsiveLayout();
  const [scene, setScene] = useState(1); // 1 to 7
  const [isMuted, setIsMuted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [sealBroken, setSealBroken] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const containerRef = useRef(null);

  // Lắng nghe cấu hình giảm chuyển động
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // SCENE TIME MACHINE
  useEffect(() => {
    // Scene 1: 0s -> 2s (Tối nhám + Bụi)
    const timer1 = setTimeout(() => {
      setScene(2);
    }, 2000);

    // Scene 2: 2s -> 4s (Nền thư viện và nắng god rays xuất hiện)
    const timer2 = setTimeout(() => {
      setScene(3);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // CANVAS VẼ BỤI NẮNG BAY LƠ LỬNG
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Dừng chuyển động hạt bụi nếu người dùng bật Reduced Motion
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.3 + 0.1,
      speedX: Math.random() * 0.15 - 0.075,
      speedY: Math.random() * -0.12 - 0.04,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 179, 106, ${p.alpha})`; // Sắc nắng vàng ấm
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scene, prefersReducedMotion]);

  // HIỆU ỨNG TƯƠNG TÁC CHUỘT PARALLAX (Scene 3+)
  const handleMouseMove = (e) => {
    if (scene < 3 || prefersReducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Giới hạn 5-10px chuyển dịch cực kỳ tinh tế
    const x = (e.clientX - rect.left - rect.width / 2) / 80;
    const y = (e.clientY - rect.top - rect.height / 2) / 80;
    setMousePos({ x, y });
  };

  // PHÁT NHẠC PIANO DU DƯƠNG QUA WEB AUDIO API
  const playPianoAmbience = () => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;

      const playNote = (freq, delay, duration) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime + delay);
        gainNode.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + delay + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + duration);

        osc.start(audioCtx.currentTime + delay);
        osc.stop(audioCtx.currentTime + delay + duration);
      };

      // Hợp âm rải piano Ghibli lãng mạn
      playNote(220, 0, 4);       // A3
      playNote(277.18, 0.4, 3.5); // C#4
      playNote(329.63, 0.8, 3);   // E4
      playNote(440, 1.2, 3);      // A4
      
      playNote(261.63, 3.0, 3.5); // C4
      playNote(329.63, 3.4, 3);   // E4
      playNote(392, 3.8, 3);      // G4
      playNote(523.25, 4.2, 3);   // C5
    } catch (e) {
      console.warn(e);
    }
  };

  // CLICK MỞ PHONG BÌ (Scene 7)
  const handleEnvelopeClick = () => {
    if (scene < 3) return;
    setScene(7);
    playPianoAmbience();

    // 200ms delay vật lý -> nứt con dấu sáp đỏ
    setTimeout(() => {
      setSealBroken(true);
    }, 200);

    // 800ms -> mở nắp phong bì & nhấc thư nhô lên
    setTimeout(() => {
      setLetterOpen(true);
    }, 800);

    // 2800ms -> chuyển hướng vào Thư viện
    setTimeout(() => {
      onEnter();
      router.push('/welcome');
    }, 3800);
  };

  const handleSkipIntro = () => {
    setSealBroken(true);
    setLetterOpen(true);
    onEnter();
    router.push('/welcome');
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 w-full h-screen z-50 flex items-center justify-center bg-[#161313] overflow-hidden select-none"
    >
      {/* 🌌 LỚP BỤI NẮNG CANVA */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* 🏛️ MẶT NỀN THƯ VIỆN CỔ KÍNH MỜ ẢO (Depth of Field) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-3000 ease-out z-0 pointer-events-none filter blur-[5px] scale-[1.03]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600')`,
          opacity: scene >= 2 ? 0.32 : 0,
        }}
      />

      {/* ☀️ LỚP NẮNG VOLUMETRIC GOD RAYS */}
      <div 
        className="absolute inset-0 z-5 pointer-events-none transition-all duration-3000"
        style={{
          background: `radial-gradient(circle at 25% 20%, rgba(217, 179, 106, 0.15) 0%, transparent 60%),
                       linear-gradient(135deg, rgba(217, 179, 106, 0.08) 0%, transparent 50%)`,
          opacity: scene >= 2 ? 1 : 0
        }}
      />

      {/* ⚙️ TIỆN ÍCH GÓC TRÊN CÙNG */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2.5 text-gray-400 hover:text-white rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        {scene < 7 && (
          <button
            onClick={handleSkipIntro}
            className="flex items-center gap-1.5 px-4 py-2 text-[9px] uppercase font-bold tracking-widest text-gray-400 hover:text-white rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
          >
            Bỏ qua
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* ✉️ SMART LAYOUT ENVELOPE (Sắp đặt phong bì bám đuổi trung tâm màn hình) */}
      <AnimatePresence>
        {scene >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ 
              opacity: 1, 
              scale: layout.scale * (scene === 7 ? 1.05 : 1),
              y: scene === 7 ? -15 : 0
            }}
            exit={{ opacity: 0, y: -40, filter: 'blur(8px)' }}
            transition={{ duration: prefersReducedMotion ? 0.35 : 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              perspective: '1200px',
              // Cập nhật CSS variables cho fluid coordinates
              '--env-w': 'clamp(280px, 32vw, 460px)',
              '--env-h': 'calc(var(--env-w) * 0.62)'
            }}
            className="relative flex flex-col items-center justify-center z-25"
          >
            
            {/* Volumetric Glow ở tâm phong bì */}
            <div className="absolute w-[350px] h-[350px] rounded-full bg-[#D9B36A]/5 blur-[70px] pointer-events-none" />

            <motion.div
              style={prefersReducedMotion ? {} : {
                rotateX: -mousePos.y * 1.5,
                rotateY: mousePos.x * 1.5,
                transformStyle: 'preserve-3d',
              }}
              onClick={handleEnvelopeClick}
              className="relative w-[var(--env-w)] h-[var(--env-h)] cursor-pointer transition-all duration-300 floating-envelope"
            >
              {/* A. THÂN PHONG BÌ PHÍA SAU (Back Flap) */}
              <div className="absolute inset-0 bg-[#F4EDE4] rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-[#FAF6F0] z-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#FAF6F0_1px,transparent_0)] bg-[size:16px_16px] opacity-25" />
              </div>

              {/* B. LÁ THƯ TÌNH TRƯỢT LÊN */}
              <motion.div
                className="absolute w-[94%] h-[92%] bg-[#FFFDFB] rounded-xl z-25 p-8 flex flex-col justify-between border border-[#FAF6F0]/80 shadow-md"
                style={{ left: '3%' }}
                initial={{ y: 0, scale: 0.98 }}
                animate={letterOpen ? { y: '-65%', scale: 1 } : { y: 0, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 50, damping: 14 }}
              >
                <div className="flex justify-between items-center border-b border-[#FAF6F0] pb-2">
                  <span className="font-display text-[8px] tracking-[0.25em] text-gray-400 uppercase font-bold">MemoryOS</span>
                  <span className="font-display text-[9px] italic text-[#E96A87]">Signature 1.0</span>
                </div>
                <div className="text-center my-auto flex flex-col gap-2">
                  <Heart className="w-5 h-5 text-[#E96A87] fill-current mx-auto opacity-80 animate-pulse" />
                  <span className="font-sans text-[10px] text-gray-400 tracking-widest uppercase">Ấn phẩm kỉ vật</span>
                </div>
                <div className="w-full text-center">
                  <span className="font-sans text-[8px] text-gray-300 tracking-widest uppercase">Click to open</span>
                </div>
              </motion.div>

              {/* C. NẮP PHONG BÌ XOAY LẬT 3D (Lid) */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1/2 bg-[#E9DFD3] rounded-t-2xl z-30 origin-top border-b border-[#FAF6F0]/20"
                initial={{ rotateX: 0 }}
                animate={letterOpen ? { rotateX: 180 } : { rotateX: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
              />

              {/* E. MẶT TRƯỚC PHONG BÌ (Triangles overlay) */}
              <div className="absolute inset-0 z-40 pointer-events-none" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
                <div className="absolute left-0 bottom-0 top-0 w-1/2 bg-[#EFE7DC] rounded-l-2xl" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
                <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-[#EFE7DC] rounded-r-2xl" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-[#E8DFD3] rounded-b-2xl shadow-[0_-4px_12px_rgba(0,0,0,0.05)]" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
              </div>

              {/* F. CON DẤU SÁP ĐỎ NIÊM PHONG (Wax Seal) */}
              <div className="absolute z-45 inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex pointer-events-auto">
                  <motion.div
                    className="w-6 h-12 bg-[#E96A87] rounded-l-full shadow-lg border-r border-red-700/20 flex items-center justify-end"
                    animate={sealBroken ? { x: -35, rotate: -30, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  >
                    <span className="text-[10px] text-white/30 font-bold mr-1.5">M</span>
                  </motion.div>
                  <motion.div
                    className="w-6 h-12 bg-[#E96A87] rounded-r-full shadow-lg border-l border-red-700/20 flex items-center justify-start"
                    animate={sealBroken ? { x: 35, rotate: 30, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  >
                    <span className="text-[10px] text-white/30 font-bold ml-1.5">S</span>
                  </motion.div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Styles cho Dust Float và Chuyển động thả trôi chậm rãi của phong bì */}
      <style jsx global>{`
        .floating-envelope {
          animation: breathe-envelope 6s ease-in-out infinite alternate;
        }
        @keyframes breathe-envelope {
          0% { transform: translateY(0); }
          100% { transform: translateY(-8px); }
        }
      `}</style>

    </div>
  );
}
