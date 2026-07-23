'use client';

import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { useMemory } from '@/lib/MemoryContext';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function IntroLetter({ couple, onEnterSite }) {
  const { isPlayingMusic, setIsPlayingMusic } = useMemory();
  
  // Các trạng thái của chuỗi chuyển động click mở thư
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [flapOpened, setFlapOpened] = useState(false);
  const [letterExtracted, setLetterExtracted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  // 1. Khóa cuộn toàn trang (body scroll lock) khi lớp phủ Intro đang hiển thị
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

  // Thử tự động phát nhạc khi vừa vào trang (nếu được trình duyệt cho phép)
  useEffect(() => {
    setIsPlayingMusic(true);
  }, [setIsPlayingMusic]);

  // 2. Chuỗi chuyển động Click Sequence mượt mà
  const handleOpenEnvelope = () => {
    if (isClicked) return;
    setIsClicked(true);
    
    // Kích hoạt phát nhạc nền ngay từ hành động click của người dùng
    setIsPlayingMusic(true);

    // Bước 1: Rung phong bì nhẹ vật lý (150ms)
    setIsShaking(true);
    
    setTimeout(() => {
      setIsShaking(false);
      
      // Bước 2: Nắp phong bì từ từ xoay lật ngược lên trên (600ms)
      setFlapOpened(true);
      
      setTimeout(() => {
        // Bước 3: Lá thư bắt đầu trượt lên trên và camera zoom vào, nền blur nhẹ (1200ms)
        setLetterExtracted(true);
        setIsZoomed(true);
        
        // Bắn pháo hoa giấy lấp lánh nhẹ nhàng
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#E96A87', '#D9B36A', '#ffffff']
        });
      }, 550);

    }, 180);
  };

  // 3. Đóng thư và chuyển cảnh vào Hero Section chính
  const handleClose = () => {
    setIsZoomed(false);
    setLetterExtracted(false);
    
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
      className={`fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center p-4 transition-opacity duration-700 select-none ${isRendered ? 'opacity-100' : 'opacity-0'}`}
      style={{
        // Nền kem lụa ấm áp nhã nhặn
        backgroundColor: '#F9F6F0',
        // Vân giấy lụa nhám mịn SVG (subtle grain overlay base64) cực sang trọng
        backgroundImage: `
          radial-gradient(circle at center, rgba(255,255,255,0.75) 0%, rgba(249,246,240,1) 100%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.022'/%3E%3C/svg%3E")
        `,
        // Vignette làm tối 4 góc nhẹ nhàng như thước phim chiếu bóng
        boxShadow: 'inset 0 0 140px rgba(0,0,0,0.06)'
      }}
    >
      
      {/* 🎈 BÓNG BAY TRÁI TIM MỘC MẠC (Chỉ bay lên khi phong bì mở nắp) */}
      {flapOpened && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
          <div className="absolute left-[20%] bottom-[25%] animate-[floatBalloon_5.5s_ease-out_forwards]">
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 bg-pink-400/90 rounded-full flex items-center justify-center shadow-md after:content-[''] after:absolute after:bottom-[-4px] after:w-0 after:h-0 after:border-l-[5px] after:border-l-transparent after:border-r-[5px] after:border-r-transparent after:border-t-[7px] after:border-t-pink-400/90">
                <Heart className="w-6 h-6 fill-white text-white opacity-90" />
              </div>
            </div>
          </div>

          <div className="absolute left-[50%] bottom-[28%] animate-[floatBalloon_6.5s_ease-out_0.3s_forwards]">
            <div className="relative flex flex-col items-center">
              <div className="w-14 h-14 bg-pink-300/90 rounded-full flex items-center justify-center shadow-md after:content-[''] after:absolute after:bottom-[-4px] after:w-0 after:h-0 after:border-l-[6px] after:border-l-transparent after:border-r-[6px] after:border-r-transparent after:border-t-[8px] after:border-t-pink-300/90">
                <Heart className="w-7 h-7 fill-white text-white opacity-90" />
              </div>
            </div>
          </div>

          <div className="absolute left-[78%] bottom-[24%] animate-[floatBalloon_5s_ease-out_0.6s_forwards]">
            <div className="relative flex flex-col items-center">
              <div className="w-11 h-11 bg-rose-500/90 rounded-full flex items-center justify-center shadow-md after:content-[''] after:absolute after:bottom-[-4px] after:w-0 after:h-0 after:border-l-[4px] after:border-l-transparent after:border-r-[4px] after:border-r-transparent after:border-t-[6px] after:border-t-rose-500/90">
                <Heart className="w-5.5 h-5.5 fill-white text-white opacity-90" />
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatBalloon {
          0% { transform: translateY(150px) scale(0.6); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-750px) scale(1.1); opacity: 0; }
        }
        @keyframes envelopeShake {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          20%, 60% { transform: rotate(-1.5deg) translateX(-5px); }
          40%, 80% { transform: rotate(1.5deg) translateX(5px); }
        }
        .envelope-shake-active {
          animation: envelopeShake 0.18s ease-in-out;
        }
        .vân-giấy-nhám {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.028'/%3E%3C/svg%3E");
        }
      `}} />

      {/* 🎬 CONTAINER ZOOM TỰ ĐỘNG (Camera Zoom) - Luôn nằm chính giữa khung hình */}
      <motion.div 
        animate={{
          scale: isZoomed ? 1.08 : 1,
          filter: isZoomed ? 'blur(0px)' : 'blur(0px)'
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl flex items-center justify-center relative z-30"
      >
        
        {/* KHU VỰC PHONG BÌ 3D LỚP (Bảo đảm tỷ lệ to rõ) */}
        <div 
          onMouseEnter={() => !isClicked && setIsHovered(true)}
          onMouseLeave={() => !isClicked && setIsHovered(false)}
          className={`relative flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isShaking ? 'envelope-shake-active' : ''}`}
          style={{ 
            width: '440px', 
            height: '300px',
            transform: isHovered && !isClicked ? 'translateY(-6px) scale(1.03)' : 'translateY(0px) scale(1)',
          }}
        >
          
          {/* A. BÓNG ĐỔ PHONG BÌ CHÂN THỰC */}
          <div 
            className="absolute inset-0 bg-[#3d2b27]/8 rounded-2xl blur-2xl transform translate-y-6 scale-[0.93] transition-all duration-700"
            style={{
              boxShadow: isHovered && !isClicked 
                ? '0 30px 75px -10px rgba(61, 43, 39, 0.22)' 
                : '0 15px 40px -15px rgba(61, 43, 39, 0.12)'
            }}
          />

          {/* B. MẶT SAU PHONG BÌ (z-index: 10) */}
          <div className="absolute inset-0 bg-[#FAF6F0] rounded-2xl border border-pink-100/10 shadow-inner overflow-hidden vân-giấy-nhám" style={{ zIndex: 10 }}>
            {/* Viền chỉ thanh nhã */}
            <div className="absolute inset-2.5 border border-pink-200/20 rounded-xl" />
          </div>

          {/* C. CHỮ "TO THE LOVE OF MY LIFE" THÒ RA (z-index: 12) */}
          <div 
            onClick={handleOpenEnvelope}
            className={`absolute inset-x-10 h-24 bg-[#FCFAF7] border-t border-x border-pink-200/20 rounded-t-xl transition-all duration-750 shadow-sm flex items-center justify-center cursor-pointer vân-giấy-nhám ${flapOpened ? 'translate-y-16 opacity-0' : isHovered ? 'translate-y-[-18px]' : 'translate-y-[-10px]'}`} 
            style={{ zIndex: 12 }}
          >
            <span className="font-display italic text-[#E96A87] text-lg font-light tracking-wide px-4">
              {couple.introEnvelopeText || 'To the Love of My Life'}
            </span>
          </div>

          {/* D. 📜 RUỘT LÁ THƯ TÌNH CHÂN THỰC (z-index: 15)
              - Khi đóng: Thu nhỏ scale-80 nằm chìm trong lòng phong bì.
              - Khi mở: Trượt lên trên chính giữa viewport (translateY(-130px)), phóng to, đè lên các cánh phong bì trước.
          */}
          <div 
            className={`absolute bg-[#FCFAF7] rounded-xl border border-[#FAF6F0] p-8 transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) flex flex-col justify-between vân-giấy-nhám ${letterExtracted ? 'translate-y-[-130px] scale-[1.3] opacity-100 shadow-2xl pointer-events-auto' : 'translate-y-[20px] scale-[0.8] opacity-0 pointer-events-none'}`}
            style={{
              zIndex: letterExtracted ? 40 : 15,
              // Chiều rộng đáp ứng hoàn hảo (Responsive: 720px ở desktop, 75vw ở tablet, 90vw ở mobile)
              width: typeof window !== 'undefined' && window.innerWidth < 640 ? '90vw' : typeof window !== 'undefined' && window.innerWidth < 1024 ? '75vw' : '720px',
              minHeight: '560px',
              boxShadow: letterExtracted ? '0 35px 85px -15px rgba(61, 43, 39, 0.16)' : 'none',
              transformOrigin: 'bottom center'
            }}
          >
            {/* Ghi chú góc trái trên */}
            <div className="absolute top-4 left-4 text-[8px] font-bold text-pink-400/50 bg-pink-50/30 px-2.5 py-0.5 rounded-full tracking-widest uppercase border border-pink-200/20 font-sans">
              {couple.introLetterNote || 'Pause to read 📖'}
            </div>

            {/* Trái tim trang trí nhỏ */}
            <div className="absolute top-5 right-5 w-5 h-5 text-pink-400/30 animate-pulse">
              <Heart className="w-full h-full fill-current" />
            </div>

            {/* THIỆP PHẦN TRÊN (Lời chào & Ruột thư cuộn nội bộ) */}
            <div className="flex-1 flex flex-col justify-start text-left pt-3">
              <h2 className="font-display text-2xl md:text-3xl text-pink-700 font-bold mb-3 tracking-wide select-text">
                {couple.introGreeting || 'Hey Samira,'}
              </h2>
              
              {/* KHÓA CUỘN NGOÀI: CHỈ CUỘN NỘI BỘ NỘI DUNG THƯ (Immersive reading) */}
              <div className="flex-1 overflow-y-auto max-h-[300px] md:max-h-[350px] pr-2 scrollbar-thin scrollbar-thumb-pink-100 select-text">
                <p className="font-handwriting text-2xl text-[#2B2B2B]/90 leading-relaxed whitespace-pre-wrap tracking-wide pr-2">
                  {couple.introMessage || 'Love is in the air, so I\'m taking this chance to spill the beans...'}
                </p>
              </div>
            </div>

            {/* ĐƯỜNG GẤP THIỆP MỜ */}
            <div className="w-full my-4 border-t border-dashed border-pink-200/30 relative">
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FCFAF7] flex items-center justify-center">
                <Heart className="w-2.5 h-2.5 text-[#E96A87]/30 fill-pink-100" />
              </div>
            </div>

            {/* THIỆP PHẦN DƯỚI (Ký tên & Tem thư) */}
            <div className="relative flex justify-between items-end min-h-[110px] pt-1">
              {/* Ký tên viết tay */}
              <div className="flex flex-col items-start font-handwriting select-text text-left">
                <span className="text-lg text-pink-600 italic leading-none">{couple.introSignOff || 'Fingers crossed,'}</span>
                <span className="text-2xl text-[#2B2B2B] font-bold mt-1 pl-2">{couple.introSender || 'Aaron'}</span>
              </div>

              {/* Tem thư & Dấu tròn */}
              <div className="relative flex flex-col items-end mr-1 scale-90 origin-bottom-right">
                {/* Tem thư răng cưa */}
                <div className="w-18 h-22 bg-white p-0.5 shadow-md border border-dashed border-pink-400/40 rotate-[6deg] flex flex-col items-center justify-between rounded-sm">
                  <div className="w-full h-[74%] overflow-hidden bg-rose-50 rounded-sm">
                    <img 
                      src={couple.introStampUrl || "https://images.unsplash.com/photo-1555448248-2571daf6344b?q=80&w=200&auto=format&fit=crop"} 
                      alt="Stamp"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[6px] text-pink-500 font-bold tracking-widest pb-0.5 leading-none">LOVE MAIL</div>
                </div>

                {/* Dấu bưu điện đè lên */}
                <div className="absolute -left-5 bottom-3 w-18 h-18 rounded-full border border-pink-400/25 flex items-center justify-center rotate-[-10deg] z-10 pointer-events-none">
                  <div className="w-[84%] h-[84%] rounded-full border border-dashed border-pink-400/30 flex flex-col items-center justify-center text-center">
                    <span className="text-[6px] text-pink-400/30 font-bold tracking-widest leading-none">LOVE MAIL</span>
                    <Heart className="w-2.5 h-2.5 text-pink-400/25 fill-pink-400/5 my-0.5" />
                    <span className="text-[5px] text-pink-400/30 tracking-wider font-mono">SWEET.POST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nút bấm bước vào (Nằm dưới lá thư) */}
            <button
              onClick={handleClose}
              className="mt-5 w-full py-2.5 bg-gradient-to-r from-pink-500 to-[#E96A87] hover:from-pink-600 hover:to-[#ff5277] text-white font-medium text-xs tracking-widest uppercase rounded-lg shadow-sm hover:shadow transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 z-30 font-sans"
            >
              <span>{couple.introButtonText || 'Bước vào thế giới của chúng mình'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* E. NẮP PHONG BÌ PHÍA TRÊN (z-index: 25 đóng, z-index: 5 mở lật ngược) */}
          <div 
            onClick={handleOpenEnvelope}
            className="absolute top-0 left-0 right-0 h-[155px] bg-[#FAF6F0] border-t-2 border-x-2 border-pink-400/25 rounded-t-2xl origin-top transition-transform duration-[650ms] ease-in-out cursor-pointer vân-giấy-nhám"
            style={{
              clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
              transform: flapOpened ? 'rotateX(180deg) translateY(-1px)' : 'rotateX(0deg)',
              zIndex: flapOpened ? 5 : 25
            }}
          />

          {/* F. CÁC CÁNH PHONG BÌ MẶT TRƯỚC (Gấp chéo, z-index: 20) */}
          <div 
            onClick={handleOpenEnvelope}
            className="absolute inset-y-0 left-0 w-[222px] bg-[#FAF6F0] border-l-2 border-y-2 border-pink-400/25 cursor-pointer vân-giấy-nhám" 
            style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)', zIndex: 20 }} 
          />
          <div 
            onClick={handleOpenEnvelope}
            className="absolute inset-y-0 right-0 w-[222px] bg-[#FAF6F0] border-r-2 border-y-2 border-pink-400/25 cursor-pointer vân-giấy-nhám" 
            style={{ clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)', zIndex: 20 }} 
          />
          <div 
            onClick={handleOpenEnvelope}
            className="absolute bottom-0 inset-x-0 h-[165px] bg-[#F5F2E8] border-b-2 border-x-2 border-pink-400/25 rounded-b-2xl cursor-pointer vân-giấy-nhám" 
            style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)', zIndex: 20 }} 
          />

          {/* G. CON DẤU NIÊM PHONG SÁP VÀNG KIM (z-index: 30) */}
          <div 
            onClick={handleOpenEnvelope}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#D9B36A] border-2 border-[#cfa557] shadow-md flex items-center justify-center active:scale-90 transition-all duration-500 cursor-pointer ${isClicked ? 'scale-0 opacity-0 rotate-45' : 'scale-100 opacity-100 rotate-0 hover:scale-105'}`}
            style={{ 
              zIndex: 30,
              boxShadow: '0 4px 10px rgba(217, 179, 106, 0.35)'
            }}
          >
            <Heart className={`w-8 h-8 fill-white text-white ${isHovered && !isClicked ? 'animate-[pulse_1s_infinite]' : 'animate-pulse'}`} />
          </div>

          {/* H. NHÃN CHỈ DẪN NHẤP NHÁY (z-index: 30) */}
          <div 
            onClick={handleOpenEnvelope}
            className={`absolute bottom-[-50px] inset-x-0 text-center text-[#E96A87] font-bold text-xs tracking-[0.2em] transition-opacity duration-500 cursor-pointer ${isClicked ? 'opacity-0' : 'opacity-100 animate-pulse'}`}
            style={{ zIndex: 30 }}
          >
            {couple.introEnvelopeLabel || 'CLICK TO OPEN 💖'}
          </div>

        </div>

      </motion.div>
    </div>
  );
}
