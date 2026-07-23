'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { useMemory } from '@/lib/MemoryContext';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function IntroLetter({ couple, onEnterSite }) {
  const { isPlayingMusic, setIsPlayingMusic } = useMemory();
  const letterButtonRef = useRef(null);
  
  // Trạng thái chuỗi tương tác mở thư tình 3D
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [step, setStep] = useState('closed'); // 'closed', 'shaking', 'opening-flap', 'extracting-letter', 'opened', 'exiting'
  const [isMounted, setIsMounted] = useState(false);

  // 1. Chỉ kích hoạt các logic Client sau khi Mount thành công (Chống lỗi Hydration sập trang)
  useEffect(() => {
    setIsMounted(true);
    
    // Khóa cuộn trang chính
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  // Thử phát nhạc tự động nếu được trình duyệt cho phép
  useEffect(() => {
    setIsPlayingMusic(true);
  }, [setIsPlayingMusic]);

  // 2. Phím tắt tương tác (Accessibility)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (step === 'closed') {
          e.preventDefault();
          handleOpenEnvelope();
        }
      } else if (e.key === 'Escape') {
        if (step === 'opened') {
          e.preventDefault();
          handleClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step]);

  // Tự động focus nút bước vào sau khi thư trượt lên xong
  useEffect(() => {
    if (step === 'opened' && letterButtonRef.current) {
      letterButtonRef.current.focus();
    }
  }, [step]);

  // 3. Chuỗi chuyển động điện ảnh Click Sequence mượt mà (Spring Physics)
  const handleOpenEnvelope = () => {
    if (isClicked) return;
    setIsClicked(true);
    setIsPlayingMusic(true);

    // Bước 1: Rung phong bì vật lý (120ms)
    setStep('shaking');
    
    setTimeout(() => {
      // Bước 2: Bẻ niêm phong sáp vàng + Lật nắp phong bì ra sau (600ms)
      setStep('opening-flap');
      
      setTimeout(() => {
        // Bước 3: Rút thư trượt thẳng lên trên & Camera zoom lại gần, nền mờ dần (1200ms)
        setStep('extracting-letter');
        
        setTimeout(() => {
          setStep('opened');
          // Bắn pháo hoa confetti lấp lánh nhẹ nhàng ăn mừng
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.65 },
            colors: ['#E96A87', '#D9B36A', '#ffffff']
          });
        }, 1200);

      }, 600);

    }, 120);
  };

  // 4. Chuỗi đóng thư: Gập thư chìm xuống phong bì -> Zoom lùi camera -> Vào trang chủ Hero
  const handleClose = () => {
    setStep('exiting');
    
    // Gập thư lùi xuống mất 600ms, sau đó tắt lớp phủ và enter site
    setTimeout(() => {
      onEnterSite();
    }, 600);
  };

  const containerVariants = {
    closed: { scale: 1, filter: 'blur(0px)' },
    shaking: { scale: 1, x: [0, -5, 5, -4, 4, 0], transition: { duration: 0.12 } },
    'opening-flap': { scale: 1 },
    'extracting-letter': { scale: 1.06 },
    opened: { scale: 1.06 },
    exiting: { scale: 0.94, opacity: 0, transition: { duration: 0.6, ease: [0.32, 9.6, 0.44, 1] } }
  };

  const flapOpened = step === 'opening-flap' || step === 'extracting-letter' || step === 'opened';
  const letterExtracted = step === 'extracting-letter' || step === 'opened';

  // Tránh render DOM sai biệt trước khi hydrate xong ở Client
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {step !== 'exiting' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center p-6 sm:p-8 md:p-12 select-none overflow-hidden"
          style={{
            backgroundColor: '#F9F6F0',
            backgroundImage: `
              radial-gradient(circle at center, rgba(255,255,255,0.7) 0%, rgba(249,246,240,1) 100%),
              url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E")
            `,
            boxShadow: 'inset 0 0 160px rgba(61,43,39,0.08)'
          }}
        >
          
          {/* ✨ HẠT BỤI ÁNH SÁNG TRÔI NỔI DỊU NHẸ (Dùng chỉ số index để sinh thông số đồng bộ Server-Client) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="absolute rounded-full bg-white/25 blur-[2px]"
                style={{
                  width: `${(i % 3) * 1.5 + 3.5}px`,
                  height: `${(i % 3) * 1.5 + 3.5}px`,
                  left: `${(i * 13 + 17) % 80 + 10}%`,
                  top: `${(i * 9 + 25) % 80 + 10}%`,
                  animation: `floatDust ${(i % 4) * 3 + 12}s linear infinite`,
                  animationDelay: `${(i % 3) * 2.2}s`
                }}
              />
            ))}
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes floatDust {
              0% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0; }
              10% { opacity: 0.4; }
              90% { opacity: 0.4; }
              100% { transform: translateY(-140px) translateX(30px) scale(0.7); opacity: 0; }
            }
            .vân-giấy-lụa {
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.025'/%3E%3C/svg%3E");
            }
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
            .perspective-1000 {
              perspective: 1200px;
            }
          `}} />

          {/* 🎬 CONTAINER CAMERA ZOOM */}
          <motion.div 
            variants={containerVariants}
            animate={step}
            className="w-full max-h-full flex items-center justify-center relative z-20 perspective-1000"
          >
            
            {/* ✉️ 1. PHONG BÌ GIẤY THẬT (Fluid co giãn) */}
            {(step === 'closed' || step === 'shaking' || step === 'opening-flap' || step === 'extracting-letter') && (
              <div 
                onClick={handleOpenEnvelope}
                onMouseEnter={() => step === 'closed' && setIsHovered(true)}
                onMouseLeave={() => step === 'closed' && setIsHovered(false)}
                className="relative flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ 
                  width: '100%',
                  maxWidth: '460px',
                  aspectRatio: '23/15',
                  transform: isHovered && step === 'closed' ? 'translateY(-6px) scale(1.03)' : 'translateY(0px) scale(1)',
                }}
              >
                <div 
                  className="absolute inset-0 bg-[#3d2b27]/6 rounded-2xl blur-2xl transform translate-y-5 scale-[0.94] transition-all duration-700"
                  style={{
                    boxShadow: isHovered && step === 'closed'
                      ? '0 30px 80px -10px rgba(61, 43, 39, 0.2)' 
                      : '0 15px 45px -15px rgba(61, 43, 39, 0.1)'
                  }}
                />

                <div className="absolute inset-0 bg-[#FAF6F0] rounded-2xl border border-pink-100/10 shadow-inner overflow-hidden vân-giấy-lụa" style={{ zIndex: 10 }}>
                  <div className="absolute inset-2.5 border border-pink-200/15 rounded-xl" />
                </div>

                <div 
                  className={`absolute inset-x-8 h-[28%] bg-[#FCFAF7] border-t border-x border-pink-200/20 rounded-t-xl transition-all duration-750 shadow-sm flex items-center justify-center cursor-pointer vân-giấy-lụa ${flapOpened ? 'translate-y-16 opacity-0' : isHovered ? 'translate-y-[-18px]' : 'translate-y-[-10px]'}`} 
                  style={{ zIndex: 12, top: '-10%' }}
                >
                  <span className="font-display italic text-[#E96A87] text-base md:text-lg font-light tracking-wide px-4 text-center truncate">
                    {couple.introEnvelopeText || 'To the Love of My Life'}
                  </span>
                </div>

                <motion.div 
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: flapOpened ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute top-0 left-0 right-0 h-[52%] bg-[#FAF6F0] border-t-2 border-x-2 border-pink-400/20 rounded-t-2xl origin-top cursor-pointer vân-giấy-lụa"
                  style={{
                    clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
                    zIndex: flapOpened ? 5 : 25,
                    transformStyle: 'preserve-3d'
                  }}
                />

                <div className="absolute inset-y-0 left-0 w-[50%] bg-[#FAF6F0] border-l-2 border-y-2 border-pink-400/20 cursor-pointer vân-giấy-lụa" style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)', zIndex: 20 }} />
                <div className="absolute inset-y-0 right-0 w-[50%] bg-[#FAF6F0] border-r-2 border-y-2 border-pink-400/20 cursor-pointer vân-giấy-lụa" style={{ clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)', zIndex: 20 }} />
                <div className="absolute bottom-0 inset-x-0 h-[58%] bg-[#F5F2E8] border-b-2 border-x-2 border-pink-400/20 rounded-b-2xl cursor-pointer vân-giấy-lụa" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)', zIndex: 20 }} />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 pointer-events-none" style={{ zIndex: 30 }}>
                  <motion.div 
                    animate={{ 
                      x: flapOpened ? -24 : 0, 
                      opacity: flapOpened ? 0 : 1,
                      scale: isHovered && step === 'closed' ? 1.05 : 1 
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-y-0 left-0 w-8 bg-[#D9B36A] border-y-2 border-l-2 border-[#cfa557] rounded-l-full shadow-md flex items-center justify-end pr-0.5 text-white"
                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                  >
                    <Heart className="w-5 h-5 fill-white text-white opacity-90 translate-x-[9.5px]" />
                  </motion.div>

                  <motion.div 
                    animate={{ 
                      x: flapOpened ? 24 : 0, 
                      opacity: flapOpened ? 0 : 1,
                      scale: isHovered && step === 'closed' ? 1.05 : 1 
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-y-0 right-0 w-8 bg-[#D9B36A] border-y-2 border-r-2 border-[#cfa557] rounded-r-full shadow-md flex items-center justify-start pl-0.5 text-white"
                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                  >
                    <Heart className="w-5 h-5 fill-white text-white opacity-90 -translate-x-[9.5px]" />
                  </motion.div>
                </div>

                <div 
                  className={`absolute bottom-[-45px] inset-x-0 text-center text-[#E96A87] font-bold text-[10px] tracking-[0.2em] transition-opacity duration-500 uppercase font-sans ${isClicked ? 'opacity-0' : 'opacity-100 animate-pulse'}`}
                  style={{ zIndex: 30 }}
                >
                  {couple.introEnvelopeLabel || 'CLICK TO OPEN 💖'}
                </div>
              </div>
            )}

            {/* 📜 2. RUỘT LÁ THƯ TAY THÍCH ỨNG VIEWPORT
                Sử dụng các class responsive của Tailwind: w-[90vw] sm:w-[75vw] lg:w-[760px]
                để bảo đảm an toàn tuyệt đối trước Hydration Mismatch.
            */}
            <motion.div 
              initial={{ y: 80, scale: 0.92, opacity: 0 }}
              animate={{ 
                y: letterExtracted ? 0 : 80, 
                scale: letterExtracted ? 1 : 0.92, 
                opacity: letterExtracted ? 1 : 0
              }}
              transition={{ type: "spring", stiffness: 65, damping: 15, mass: 1 }}
              className={`bg-[#FCFAF7] rounded-xl border border-[#FAF6F0] p-6 md:p-8 flex flex-col justify-between vân-giấy-lụa w-[90vw] sm:w-[75vw] lg:w-[760px] ${letterExtracted ? 'pointer-events-auto shadow-2xl' : 'pointer-events-none absolute'}`}
              style={{
                zIndex: letterExtracted ? 40 : 5,
                maxHeight: 'calc(100vh - 96px)',
                minHeight: 'min(580px, calc(100vh - 96px))',
                boxShadow: letterExtracted ? '0 30px 80px -15px rgba(61, 43, 39, 0.12)' : 'none'
              }}
            >
              {/* Header thiệp */}
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
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] font-bold text-pink-400/30 tracking-widest uppercase font-sans">
                  {couple.introLetterNote || 'Pause to read 📖'}
                </div>
              </div>

              {/* Body thiệp */}
              <div className="flex-1 overflow-y-auto pr-2 my-5 letter-scroll select-text text-left">
                <p className="font-handwriting text-2xl text-[#2B2B2B]/95 leading-relaxed tracking-wide whitespace-pre-wrap select-text">
                  {couple.introMessage || 'Love is in the air, so I\'m taking this chance to spill the beans...'}
                </p>
              </div>

              {/* Footer thiệp */}
              <div className="border-t border-pink-100/10 pt-4 flex flex-col gap-5">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col items-start font-handwriting select-text text-left">
                    <span className="text-base text-pink-600 italic leading-none">{couple.introSignOff || 'Fingers crossed,'}</span>
                    <span className="text-2xl text-[#2B2B2B] font-bold mt-1 pl-2">{couple.introSender || 'Aaron'}</span>
                  </div>

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
                        <Heart className="w-2.5 h-2.5 text-pink-400/25 fill-pink-400/5 my-0.5" />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  ref={letterButtonRef}
                  onClick={handleClose}
                  className="w-full py-3 bg-[#2B2B2B] hover:bg-[#E96A87] text-white font-medium text-xs tracking-widest uppercase rounded-lg shadow-sm hover:shadow transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#E96A87] font-sans"
                >
                  <span>{couple.introButtonText || 'Bước vào thế giới của chúng mình'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
