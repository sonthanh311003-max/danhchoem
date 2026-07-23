'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { useMemory } from '@/lib/MemoryContext';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function IntroLetter({ couple, onEnterSite }) {
  const { isPlayingMusic, setIsPlayingMusic } = useMemory();
  const waxSealRef = useRef(null);
  const letterButtonRef = useRef(null);
  
  // Các trạng thái của chuỗi tương tác mở thư
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [flapOpened, setFlapOpened] = useState(false);
  const [letterExtracted, setLetterExtracted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  // 1. Khóa cuộn trang chính khi đang đọc thư tình mở đầu
  useEffect(() => {
    if (isRendered) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isRendered]);

  // Thử phát nhạc tự động nếu được trình duyệt cho phép
  useEffect(() => {
    setIsPlayingMusic(true);
  }, [setIsPlayingMusic]);

  // 2. Phím tắt điều khiển (Accessibility - Bấm Enter/Space để mở, Escape để đóng)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isRendered) return;

      if (e.key === 'Enter' || e.key === ' ') {
        // Nếu chưa mở, nhấn Enter/Space sẽ mở thư
        if (!isClicked) {
          e.preventDefault();
          handleOpenEnvelope();
        }
      } else if (e.key === 'Escape') {
        // Nếu đã mở thư, nhấn Escape sẽ đóng và bước vào trang chủ
        if (letterExtracted) {
          e.preventDefault();
          handleClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRendered, isClicked, letterExtracted]);

  // Focus con dấu sáp khi tải xong để sẵn sàng bấm phím
  useEffect(() => {
    if (waxSealRef.current) {
      waxSealRef.current.focus();
    }
  }, []);

  // Tự động focus nút bước vào sau khi thư trượt lên
  useEffect(() => {
    if (letterExtracted && letterButtonRef.current) {
      letterButtonRef.current.focus();
    }
  }, [letterExtracted]);

  // 3. Chuỗi chuyển động Click Sequence mượt mà
  const handleOpenEnvelope = () => {
    if (isClicked) return;
    setIsClicked(true);
    
    // Phát nhạc nền lập tức qua hành động tương tác click của người dùng
    setIsPlayingMusic(true);

    // Bước 1: Rung phong bì vật lý (120ms)
    setIsShaking(true);
    
    setTimeout(() => {
      setIsShaking(false);
      
      // Bước 2: Nắp phong bì từ từ xoay lật ngược lên trên (600ms)
      setFlapOpened(true);
      
      setTimeout(() => {
        // Bước 3: Lá thư trượt lên, camera zoom tiến và nền mờ dần (1200ms)
        setLetterExtracted(true);
        setIsZoomed(true);
        
        // Bắn pháo hoa giấy lấp lánh dịu nhẹ
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#E96A87', '#D9B36A', '#ffffff']
        });
      }, 500);

    }, 120);
  };

  // 4. Đóng thư: Gập thư lại, camera zoom lùi và chuyển cảnh vào Hero Section
  const handleClose = () => {
    // Trượt thư lùi xuống phong bì & zoom lùi máy quay
    setLetterExtracted(false);
    setIsZoomed(false);
    
    setTimeout(() => {
      setIsRendered(false);
      setTimeout(() => {
        onEnterSite();
      }, 500);
    }, 600);
  };

  if (!isRendered) return null;

  return (
    <div 
      className={`fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center p-6 sm:p-8 md:p-12 transition-opacity duration-700 select-none overflow-hidden ${isRendered ? 'opacity-100' : 'opacity-0'}`}
      style={{
        // Nền kem lụa ấm áp nhã nhặn
        backgroundColor: '#F9F6F0',
        // Vân giấy lụa nhám mịn SVG (subtle grain overlay base64)
        backgroundImage: `
          radial-gradient(circle at center, rgba(255,255,255,0.7) 0%, rgba(249,246,240,1) 100%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E")
        `,
        // Vignette mờ tối 4 góc sâu lắng như phim chiếu bóng
        boxShadow: 'inset 0 0 160px rgba(61,43,39,0.08)'
      }}
    >
      
      {/* ✨ HẠT BỤI ÁNH SÁNG TRÔI NỔI DỊU NHẸ (Ambient Floating Dust) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white/20 blur-[2px]"
            style={{
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              animation: `floatDust ${Math.random() * 12 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatDust {
          0% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0; }
          10% { opacity: 0.45; }
          90% { opacity: 0.45; }
          100% { transform: translateY(-120px) translateX(40px) scale(0.8); opacity: 0; }
        }
        @keyframes envelopeShake {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          20%, 60% { transform: rotate(-1.5deg) translateX(-4px); }
          40%, 80% { transform: rotate(1.5deg) translateX(4px); }
        }
        .envelope-shake-active {
          animation: envelopeShake 0.12s ease-in-out;
        }
        .vân-giấy-lụa {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.025'/%3E%3C/svg%3E");
        }
        /* Custom scrollbar siêu mỏng mờ, gần như vô hình */
        .letter-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .letter-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .letter-scroll::-webkit-scrollbar-thumb {
          background: rgba(233, 106, 135, 0.12);
          border-radius: 9px;
        }
        .letter-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(233, 106, 135, 0.25);
        }
      `}} />

      {/* 🎬 CONTAINER CAMERA ZOOM (Neo chính xác ở trọng tâm viewport 100%) */}
      <motion.div 
        animate={{
          scale: isZoomed ? 1.06 : 1,
          filter: isZoomed ? 'blur(0px)' : 'blur(0px)'
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-h-full flex items-center justify-center relative z-20"
      >
        
        {/* ✉️ 1. PHONG BÌ CO GIÃN TỰ ĐỘNG THEO VIEWPORT (Fluid Size) */}
        {!letterExtracted && (
          <div 
            onClick={handleOpenEnvelope}
            onMouseEnter={() => !isClicked && setIsHovered(true)}
            onMouseLeave={() => !isClicked && setIsHovered(false)}
            className={`relative flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isShaking ? 'envelope-shake-active' : ''}`}
            style={{ 
              // Co giãn fluid theo tỉ lệ vàng aspect ratio 23:15
              width: '100%',
              maxWidth: '460px',
              aspectRatio: '23/15',
              transform: isHovered && !isClicked ? 'translateY(-6px) scale(1.03)' : 'translateY(0px) scale(1)',
            }}
          >
            {/* Bóng đổ phong bì đa tầng mịn màng */}
            <div 
              className="absolute inset-0 bg-[#3d2b27]/6 rounded-2xl blur-2xl transform translate-y-5 scale-[0.94] transition-all duration-700"
              style={{
                boxShadow: isHovered && !isClicked 
                  ? '0 30px 80px -10px rgba(61, 43, 39, 0.2)' 
                  : '0 15px 45px -15px rgba(61, 43, 39, 0.1)'
              }}
            />

            {/* Thân sau phong bì (z-index: 10) */}
            <div className="absolute inset-0 bg-[#FAF6F0] rounded-2xl border border-pink-100/10 shadow-inner overflow-hidden vân-giấy-lụa" style={{ zIndex: 10 }}>
              <div className="absolute inset-2 border border-pink-200/15 rounded-xl" />
            </div>

            {/* Chữ thò ra mấp mé phong bì (z-index: 12) */}
            <div 
              className={`absolute inset-x-8 h-[28%] bg-[#FCFAF7] border-t border-x border-pink-200/20 rounded-t-xl transition-all duration-750 shadow-sm flex items-center justify-center cursor-pointer vân-giấy-lụa ${flapOpened ? 'translate-y-16 opacity-0' : isHovered ? 'translate-y-[-18px]' : 'translate-y-[-10px]'}`} 
              style={{ zIndex: 12, top: '-10%' }}
            >
              <span className="font-display italic text-[#E96A87] text-base md:text-lg font-light tracking-wide px-4 text-center truncate">
                {couple.introEnvelopeText || 'To the Love of My Life'}
              </span>
            </div>

            {/* NẮP PHONG BÌ TRÊN (z-index: 25 đóng, z-index: 5 mở lật ra sau) */}
            <div 
              className="absolute top-0 left-0 right-0 h-[52%] bg-[#FAF6F0] border-t-2 border-x-2 border-pink-400/20 rounded-t-2xl origin-top transition-transform duration-[650ms] ease-in-out cursor-pointer vân-giấy-lụa"
              style={{
                clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
                transform: flapOpened ? 'rotateX(180deg) translateY(-1px)' : 'rotateX(0deg)',
                zIndex: flapOpened ? 5 : 25
              }}
            />

            {/* CÁNH GẤP MẶT TRƯỚC PHONG BÌ (z-index: 20) */}
            <div className="absolute inset-y-0 left-0 w-[50%] bg-[#FAF6F0] border-l-2 border-y-2 border-pink-400/20 cursor-pointer vân-giấy-lụa" style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)', zIndex: 20 }} />
            <div className="absolute inset-y-0 right-0 w-[50%] bg-[#FAF6F0] border-r-2 border-y-2 border-pink-400/20 cursor-pointer vân-giấy-lụa" style={{ clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)', zIndex: 20 }} />
            <div className="absolute bottom-0 inset-x-0 h-[58%] bg-[#F5F2E8] border-b-2 border-x-2 border-pink-400/20 rounded-b-2xl cursor-pointer vân-giấy-lụa" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)', zIndex: 20 }} />

            {/* CON DẤU NIÊM PHONG SÁP VÀNG CỔ ĐIỂN (z-index: 30) */}
            <button
              ref={waxSealRef}
              onClick={(e) => { e.stopPropagation(); handleOpenEnvelope(); }}
              aria-label="Mở phong bì thư tình"
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#D9B36A] border-2 border-[#cfa557] shadow-md flex items-center justify-center active:scale-90 transition-all duration-500 cursor-pointer outline-none focus:ring-2 focus:ring-[#E96A87] ${isClicked ? 'scale-0 opacity-0 rotate-45' : 'scale-100 opacity-100 rotate-0'}`}
              style={{ 
                zIndex: 30,
                boxShadow: '0 4px 12px rgba(217, 179, 106, 0.4)'
              }}
            >
              <Heart className={`w-7 h-7 fill-white text-white ${isHovered && !isClicked ? 'animate-[pulse_1s_infinite]' : 'animate-pulse'}`} />
            </button>

            {/* CHỮ CHỈ DẪN NHẤP NHÁY DƯỚI PHONG BÌ (z-index: 30) */}
            <div 
              className={`absolute bottom-[-45px] inset-x-0 text-center text-[#E96A87] font-bold text-[10px] tracking-[0.2em] transition-opacity duration-500 uppercase font-sans ${isClicked ? 'opacity-0' : 'opacity-100 animate-pulse'}`}
              style={{ zIndex: 30 }}
            >
              {couple.introEnvelopeLabel || 'CLICK TO OPEN 💖'}
            </div>
          </div>
        )}

        {/* 📜 2. RUỘT LÁ THƯ TAY CO GIÃN THÍCH ỨNG THEO VIEWPORT (Adaptive Height & Width) */}
        <div 
          className={`bg-[#FCFAF7] rounded-xl border border-[#FAF6F0] p-6 md:p-8 transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) flex flex-col justify-between vân-giấy-lụa ${letterExtracted ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto shadow-2xl' : 'opacity-0 translate-y-[80px] scale-[0.92] pointer-events-none absolute'}`}
          style={{
            zIndex: letterExtracted ? 40 : 5,
            // Chiều rộng co giãn: 760px ở desktop, 75vw ở tablet, 90vw ở mobile
            width: typeof window !== 'undefined' && window.innerWidth < 640 ? '90vw' : typeof window !== 'undefined' && window.innerWidth < 1024 ? '75vw' : '760px',
            // CHIỀU CAO THÍCH ỨNG: Không bao giờ vượt quá chiều cao viewport sau khi trừ đi safe area padding
            maxHeight: 'calc(100vh - 96px)',
            minHeight: 'min(580px, calc(100vh - 96px))',
            boxShadow: letterExtracted ? '0 30px 80px -15px rgba(61, 43, 39, 0.12)' : 'none'
          }}
        >
          {/* Header thiệp: Lời chào đầu thư (Cố định chiều cao tự nhiên) */}
          <div className="flex justify-between items-start border-b border-pink-100/10 pb-3 relative">
            <span className="font-display text-[#E96A87] text-xl font-light tracking-wide">
              {couple.introGreeting || 'Hey Samira,'}
            </span>
            <button
              onClick={handleClose}
              className="text-[9px] font-sans tracking-[0.2em] uppercase text-zinc-400 hover:text-[#E96A87] transition-colors focus:outline-none focus:ring-1 focus:ring-[#E96A87] px-2 py-1 rounded"
              title="Đóng lại"
            >
              Close
            </button>
            {/* Nhãn ghi chú góc mỏng */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] font-bold text-pink-400/30 tracking-widest uppercase font-sans">
              {couple.introLetterNote || 'Pause to read 📖'}
            </div>
          </div>

          {/* Body thiệp: RUỘT THƯ KỆ KÈM SCROLL NỘI BỘ (Chỉ cuộn vùng này!) */}
          <div className="flex-1 overflow-y-auto pr-2 my-5 letter-scroll select-text text-left">
            <p className="font-handwriting text-2xl text-[#2B2B2B]/95 leading-relaxed tracking-wide whitespace-pre-wrap select-text">
              {couple.introMessage || 'Love is in the air, so I\'m taking this chance to spill the beans...'}
            </p>
          </div>

          {/* Footer thiệp: Ký tên & Con tem & Nút bấm (Cố định chiều cao tự nhiên ở đáy) */}
          <div className="border-t border-pink-100/10 pt-4 flex flex-col gap-5">
            <div className="flex justify-between items-end">
              {/* Ký tên viết tay */}
              <div className="flex flex-col items-start font-handwriting select-text text-left">
                <span className="text-base text-pink-600 italic leading-none">{couple.introSignOff || 'Fingers crossed,'}</span>
                <span className="text-2xl text-[#2B2B2B] font-bold mt-1 pl-2">{couple.introSender || 'Aaron'}</span>
              </div>

              {/* Tem thư & Dấu tròn */}
              <div className="relative flex flex-col items-end scale-90 origin-bottom-right">
                <div className="w-16 h-20 bg-white p-0.5 shadow-md border border-dashed border-pink-400/40 rotate-[6deg] flex flex-col items-center justify-between rounded-sm">
                  <div className="w-full h-[74%] overflow-hidden bg-rose-50 rounded-sm">
                    <img 
                      src={couple.introStampUrl || "https://images.unsplash.com/photo-1555448248-2571daf6344b?q=80&w=200&auto=format&fit=crop"} 
                      alt="Stamp"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[5px] text-pink-500 font-bold tracking-widest pb-0.5 leading-none">LOVE MAIL</div>
                </div>

                <div className="absolute -left-4 bottom-2 w-14 h-14 rounded-full border border-pink-400/25 flex items-center justify-center rotate-[-10deg] z-10 pointer-events-none">
                  <div className="w-[84%] h-[84%] rounded-full border border-dashed border-pink-400/30 flex flex-col items-center justify-center text-center">
                    <span className="text-[5px] text-pink-400/30 font-bold tracking-widest leading-none">LOVE</span>
                    <Heart className="w-2 h-2 text-pink-400/25 fill-pink-400/5 my-0.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Nút bấm bước vào sang trọng (Không dùng hồng gắt, màu xám đen/hồng ấm tinh tế) */}
            <button
              ref={letterButtonRef}
              onClick={handleClose}
              className="w-full py-3 bg-[#2B2B2B] hover:bg-[#E96A87] text-white font-medium text-xs tracking-widest uppercase rounded-lg shadow-sm hover:shadow transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#E96A87] font-sans"
            >
              <span>{couple.introButtonText || 'Bước vào thế giới của chúng mình'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
