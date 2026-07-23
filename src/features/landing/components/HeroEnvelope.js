'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, SkipForward, Heart, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HeroEnvelope({ onEnter }) {
  const router = useRouter();
  const [scene, setScene] = useState(1); // 1 to 6
  const [isMuted, setIsMuted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [sealBroken, setSealBroken] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const containerRef = useRef(null);

  // Kiểm tra cài đặt Reduced Motion của OS
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
    // Scene 1: 0s -> 2s (Tĩnh lặng bóng đêm nhám)
    const timer1 = setTimeout(() => {
      setScene(2);
    }, 2000);

    // Scene 2: 2s -> 4s (Ánh sáng tỏa dần hiện phong bì)
    const timer2 = setTimeout(() => {
      setScene(3);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // CANVAS VẼ BỤI NẮNG BAY LƠ LỬNG (Scene 1 -> Scene 6)
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

    // Mảng hạt bụi
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.3 + 0.1,
      speedX: Math.random() * 0.2 - 0.1,
      speedY: Math.random() * -0.15 - 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(217, 179, 106, 0.2)'; // Bụi vàng nắng ấm

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 179, 106, ${p.alpha})`;
        ctx.fill();

        // Di chuyển
        p.x += p.speedX;
        p.y += p.speedY;

        // Tràn màn hình thì nạp lại ở dưới đáy hoặc hai bên
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) {
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
  }, [scene]);

  // HIỆU ỨNG TƯƠNG TÁC CHUỘT PARALLAX (Scene 3)
  const handleMouseMove = (e) => {
    if (scene !== 3) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    setMousePos({ x, y });
  };

  // PHÁT NHẠC PIANO DU DƯƠNG QUA WEB AUDIO API (Scene 4 & 5)
  // Bọc vào sự kiện click để vượt qua chính sách khóa tự động phát của trình duyệt
  const playPianoAmbience = () => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;

      // Nốt piano 1 (Chậm rãi, ngân nga)
      const playNote = (freq, delay, duration) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.type = 'triangle'; // Âm thanh mềm ấm kiểu sáo/piano mộc
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);

        // Âm lượng ngân vang
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime + delay);
        gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + delay + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + duration);

        osc.start(audioCtx.currentTime + delay);
        osc.stop(audioCtx.currentTime + delay + duration);
      };

      // Hợp âm rải piano hoài niệm của Ghibli (A, C#, E, A)
      playNote(220, 0, 4); // A3
      playNote(277.18, 0.4, 3.5); // C#4
      playNote(329.63, 0.8, 3); // E4
      playNote(440, 1.2, 3); // A4
      
      // Hợp âm tiếp nối
      playNote(261.63, 3.0, 3.5); // C4
      playNote(329.63, 3.4, 3); // E4
      playNote(392, 3.8, 3); // G4
      playNote(523.25, 4.2, 3); // C5
    } catch (e) {
      console.warn('Web Audio API không được hỗ trợ hoặc bị chặn:', e);
    }
  };

  // CLICK MỞ NIÊM PHONG PHONG BÌ (Scene 4)
  const handleEnvelopeClick = () => {
    if (scene !== 3) return;
    setScene(4);
    playPianoAmbience();

    // 200ms delay vật lý -> nứt con dấu sáp
    setTimeout(() => {
      setSealBroken(true);
    }, 200);

    // 800ms -> mở nắp phong bì & nhấc thư nhô lên
    setTimeout(() => {
      setLetterOpen(true);
    }, 800);

    // Chuyển sang Scene 5 (Camera Zoom & Sequential Typography)
    setTimeout(() => {
      setScene(5);
    }, 2800);

    // Chuyển sang Scene 6 (Hồi ức mở ra & hiện nút bấm)
    setTimeout(() => {
      setScene(6);
    }, 8500);
  };

  // SKIP INTRO BỎ QUA NGHI THỨC
  const handleSkipIntro = () => {
    setScene(6);
    setSealBroken(true);
    setLetterOpen(true);
    onEnter();
  };

  // BỎ QUA HOÀN TOÀN CẢ ĐOẠN ĐỂ VÀO LUỒNG CHÍNH
  const handleEnterPlatform = () => {
    onEnter();
    router.push('/welcome');
  };

  const handleContinueDraft = () => {
    onEnter();
    router.push('/wizard');
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 w-full h-screen z-50 flex items-center justify-center bg-[#161313] overflow-hidden select-none"
    >
      {/* 🌌 LỚP BỤI NẮNG LƠ LỬNG */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* ⚙️ NÚT TIỆN ÍCH GÓC TRÊN CÙNG */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2.5 text-gray-400 hover:text-white rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        {scene < 6 && (
          <button
            onClick={handleSkipIntro}
            className="flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-white rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
          >
            Bỏ qua
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 💌 PHÂN CẢNH ENVELOPE (Scene 2, 3, 4, 5) */}
      <AnimatePresence>
        {scene >= 2 && scene <= 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: scene === 5 ? 1.05 : 1 }}
            exit={{ opacity: 0, y: -40, filter: 'blur(8px)' }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: '1200px' }}
            className="relative flex flex-col items-center justify-center z-20"
          >
            
            {/* Lớp hào quang tỏa sáng (Volumetric Glow) */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-[#D9B36A]/5 blur-[80px] pointer-events-none" />

            <motion.div
              style={prefersReducedMotion ? {} : {
                rotateX: -mousePos.y,
                rotateY: mousePos.x,
                transformStyle: 'preserve-3d',
              }}
              onClick={handleEnvelopeClick}
              className={`relative w-[320px] h-[200px] sm:w-[460px] sm:h-[280px] cursor-pointer transition-all duration-300`}
            >
              {/* A. THÂN PHONG BÌ PHÍA SAU (Back Flap) */}
              <div className="absolute inset-0 bg-[#F4EDE4] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-[#FAF6F0] z-20 overflow-hidden">
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

              {/* D. MẶT TRƯỚC PHONG BÌ (Triangles overlay) */}
              <div className="absolute inset-0 z-40 pointer-events-none" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
                <div className="absolute left-0 bottom-0 top-0 w-1/2 bg-[#EFE7DC] rounded-l-2xl" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
                <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-[#EFE7DC] rounded-r-2xl" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-[#E8DFD3] rounded-b-2xl shadow-[0_-4px_12px_rgba(0,0,0,0.05)]" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
              </div>

              {/* E. CON DẤU SÁP VÀNG NIÊM PHONG (Wax Seal) */}
              <div className="absolute z-45 inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex pointer-events-auto">
                  {/* Nửa bên trái */}
                  <motion.div
                    className="w-6 h-12 bg-[#E96A87] rounded-l-full shadow-lg border-r border-red-700/20 flex items-center justify-end"
                    animate={sealBroken ? { x: -35, rotate: -30, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  >
                    <span className="text-[10px] text-white/30 font-bold mr-1.5">M</span>
                  </motion.div>
                  {/* Nửa bên phải */}
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

      {/* 📝 PHÂN CẢNH CHỮ CINEMATIC (Scene 5) */}
      <AnimatePresence>
        {scene === 5 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-35 bg-black/45 backdrop-blur-[2px]">
            <div className="max-w-2xl px-6 text-center flex flex-col gap-6">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="font-display text-3xl sm:text-4xl font-light text-[#F0E6E4] tracking-wide leading-relaxed"
              >
                "Some stories deserve more than a photograph."
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 2.8 }}
                className="font-display text-lg sm:text-xl font-light text-gray-400 italic"
              >
                They deserve a place to live forever.
              </motion.p>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 📚 PHÂN CẢNH TRANG SÁCH & NÚT BẤM (Scene 6) */}
      <AnimatePresence>
        {scene === 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-40 bg-[#FFF9F8] dark:bg-[#161313] transition-colors duration-1000 flex items-center justify-center p-6"
          >
            
            {/* Lớp nền hạt phấn */}
            <div className="absolute inset-0 bg-[radial-gradient(#FAF6F0_1.2px,transparent_0)] bg-[size:32px_32px] opacity-35" />

            <div className="max-w-xl text-center flex flex-col gap-10 relative z-10 select-none">
              
              {/* Header Ghibli/Disney Castle style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-col items-center gap-3.5"
              >
                <div className="w-11 h-11 rounded-full bg-white dark:bg-[#1F1A1A] border border-[#FAF6F0] dark:border-[#292222] flex items-center justify-center text-[#E96A87] shadow-sm">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <h1 className="font-display text-4xl sm:text-5xl font-light text-[#2B2B2B] dark:text-[#F0E6E4] tracking-wide mt-2">
                  MemoryOS
                </h1>
                <p className="text-xs text-gray-400 dark:text-[#B5A8A6] font-sans tracking-widest uppercase">
                  Nơi lưu giữ linh hồn hồi ức
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2"
              >
                <button
                  onClick={handleEnterPlatform}
                  className="w-full sm:w-auto px-10 py-5 bg-[#E96A87] hover:bg-[#E96A87]/90 active:scale-[0.98] text-white font-medium rounded-2xl shadow-[0_12px_32px_rgba(233,106,135,0.18)] flex items-center justify-center gap-2 cursor-pointer transition-all text-sm"
                >
                  Bắt đầu câu chuyện
                </button>
                <button
                  onClick={handleContinueDraft}
                  className="w-full sm:w-auto px-10 py-5 border border-[#FAF6F0] dark:border-[#292222] bg-white/40 dark:bg-[#1F1A1A]/40 text-[#2B2B2B] dark:text-[#F0E6E4] hover:bg-white dark:hover:bg-[#1F1A1A] active:scale-[0.98] font-medium rounded-2xl cursor-pointer transition-all text-sm"
                >
                  Khôi phục bản nháp
                </button>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
