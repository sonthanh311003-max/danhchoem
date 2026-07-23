'use client';

import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { useMemory } from '@/lib/MemoryContext';
import confetti from 'canvas-confetti';

export default function IntroLetter({ couple, onEnterSite }) {
  const { isPlayingMusic, setIsPlayingMusic } = useMemory();
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  // Kích hoạt phát nhạc khi vừa vào trang (nếu trình duyệt cho phép)
  useEffect(() => {
    setIsPlayingMusic(true);
  }, [setIsPlayingMusic]);

  // Rút thư tình ra khỏi phong bì một cách liên tục và mượt mà
  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Bật nhạc nền ngay khi bấm mở phong bì
    setIsPlayingMusic(true);
    
    // Rút lá thư trượt lên (Sau 600ms khi nắp phong bì đã lật mở hoàn toàn)
    setTimeout(() => {
      setShowLetter(true);
      // Bắn confetti chúc mừng lãng mạn
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#ff758f', '#ffb3c1', '#ff4d6d', '#fff']
      });
    }, 600);
  };

  const handleClose = () => {
    setIsRendered(false);
    setTimeout(() => {
      onEnterSite();
    }, 500);
  };

  if (!isRendered) return null;

  return (
    <div 
      className={`fixed inset-0 w-screen h-screen z-50 flex items-center justify-center p-4 transition-opacity duration-500 overflow-hidden select-none ${isRendered ? 'opacity-100' : 'opacity-0'}`}
      style={{
        // Nền caro hồng-trắng ngọt ngào (Gingham Pink) y hệt video mẫu
        backgroundColor: '#fff0f3',
        backgroundImage: `
          linear-gradient(90deg, rgba(255, 179, 193, 0.25) 50%, transparent 50%),
          linear-gradient(rgba(255, 179, 193, 0.25) 50%, transparent 50%)
        `,
        backgroundSize: '70px 70px'
      }}
    >
      
      {/* 🎈 BÓNG BAY TRÁI TIM TRÔI NỔI (3 quả bóng bay lên từ phong bì) */}
      {isOpen && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-40">
          {/* Quả bóng 1 (Bên trái) */}
          <div className="absolute left-[20%] bottom-[25%] animate-[floatBalloon_5s_ease-out_forwards]">
            <div className="relative flex flex-col items-center">
              <div className="w-14 h-14 bg-pink-400 rounded-full flex items-center justify-center shadow-md after:content-[''] after:absolute after:bottom-[-4px] after:w-0 after:h-0 after:border-l-[6px] after:border-l-transparent after:border-r-[6px] after:border-r-transparent after:border-t-[8px] after:border-t-pink-400">
                <Heart className="w-8 h-8 fill-white text-white opacity-90" />
              </div>
              <svg className="w-6 h-16 text-pink-400/60 overflow-visible mt-1" viewBox="0 0 20 60">
                <path d="M10,0 Q15,15 5,30 T10,60" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
              </svg>
            </div>
          </div>

          {/* Quả bóng 2 (Giữa) */}
          <div className="absolute left-[48%] bottom-[28%] animate-[floatBalloon_6s_ease-out_0.3s_forwards]">
            <div className="relative flex flex-col items-center">
              <div className="w-16 h-16 bg-pink-300 rounded-full flex items-center justify-center shadow-md after:content-[''] after:absolute after:bottom-[-4px] after:w-0 after:h-0 after:border-l-[6px] after:border-l-transparent after:border-r-[6px] after:border-r-transparent after:border-t-[8px] after:border-t-pink-300">
                <Heart className="w-9 h-9 fill-white text-white opacity-90" />
              </div>
              <svg className="w-6 h-18 text-pink-300/60 overflow-visible mt-1" viewBox="0 0 20 60">
                <path d="M10,0 Q5,15 15,30 T10,60" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
              </svg>
            </div>
          </div>

          {/* Quả bóng 3 (Bên phải) */}
          <div className="absolute left-[76%] bottom-[24%] animate-[floatBalloon_4.5s_ease-out_0.6s_forwards]">
            <div className="relative flex flex-col items-center">
              <div className="w-13 h-13 bg-rose-500 rounded-full flex items-center justify-center shadow-md after:content-[''] after:absolute after:bottom-[-4px] after:w-0 after:h-0 after:border-l-[5px] after:border-l-transparent after:border-r-[5px] after:border-r-transparent after:border-t-[7px] after:border-t-rose-500">
                <Heart className="w-7 h-7 fill-white text-white opacity-90" />
              </div>
              <svg className="w-6 h-14 text-rose-500/60 overflow-visible mt-1" viewBox="0 0 20 60">
                <path d="M10,0 Q15,15 5,30 T10,60" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* CSS KEYFRAMES */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatBalloon {
          0% {
            transform: translateY(150px) scale(0.6) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(-700px) scale(1.1) rotate(10deg);
            opacity: 0;
          }
        }
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(0.3deg);
          }
        }
        .float-animation {
          animation: floatSlow 4s ease-in-out infinite;
        }
      `}} />

      {/* KHUNG CHỨA TRUNG TÂM TUYỆT ĐỐI (FLEXBOX) */}
      <div className="w-full max-w-xl flex flex-col items-center justify-center px-4 relative z-30">
        
        {/* KHU VỰC DỰNG HÌNH PHONG BÌ 3D LỚP (Layered Envelope container) */}
        <div className="relative flex items-center justify-center float-animation" style={{ width: '420px', height: '280px' }}>
          
          {/* A. BÓNG ĐỔ PHONG BÌ */}
          <div className="absolute inset-0 bg-rose-900/5 rounded-3xl blur-2xl transform translate-y-5 scale-95 z-0" />

          {/* B. MẶT SAU PHONG BÌ (z-index: 1) */}
          <div className="absolute inset-0 bg-[#fdfbf7] rounded-2xl border-3 border-pink-400 shadow-sm overflow-hidden" style={{ zIndex: 1 }}>
            <div className="absolute inset-2 border border-pink-200/50 rounded-xl" />
          </div>

          {/* C. CHỮ "TO THE LOVE OF MY LIFE" THÒ RA (Nằm trong phong bì, z-index: 2) */}
          <div 
            onClick={handleOpenEnvelope}
            className={`absolute inset-x-10 h-22 bg-[#fffdfa] border-t-2 border-x-2 border-pink-300 rounded-t-xl transition-all duration-700 shadow-sm flex items-center justify-center cursor-pointer ${isOpen ? 'translate-y-12 opacity-0' : 'translate-y-[-15px] group-hover:translate-y-[-22px]'}`} 
            style={{ zIndex: 2 }}
          >
            <span className="font-handwriting text-pink-700 text-xl font-bold text-center px-2">
              {couple.introEnvelopeText || 'To the Love of My Life'}
            </span>
          </div>

          {/* D. 📜 LÁ THƯ TÌNH THỰC SỰ (Nằm trong phong bì, z-index: 3)
              Hiệu ứng: Khi chưa mở, lá thư thu nhỏ nằm khuất bên trong phong bì.
              Khi mở: Lá thư trượt mượt mà từ trong phong bì đi lên trên (translate-y-[-230px]), phóng to (scale-125) đè lên tất cả.
          */}
          <div 
            className={`absolute left-4 right-4 bg-[#fcfbf9] rounded-2xl border-4 border-pink-300 p-6 md:p-8 transition-all duration-[1200ms] cubic-bezier(0.34, 1.56, 0.64, 1) flex flex-col justify-between ${showLetter ? 'translate-y-[-130px] scale-[1.25] opacity-100 rotate-0 shadow-2xl pointer-events-auto' : 'translate-y-[20px] scale-[0.82] opacity-0 pointer-events-none shadow-none'}`}
            style={{
              zIndex: showLetter ? 35 : 3, // Khi trượt lên hoàn toàn sẽ đè lên các cánh phong bì
              minHeight: '520px',
              boxShadow: showLetter ? '0 30px 70px -15px rgba(219, 39, 119, 0.3)' : 'none',
              transformOrigin: 'bottom center'
            }}
          >
            {/* Chữ ghi chú góc trái trên */}
            <div className="absolute top-4 left-4 text-[8px] font-bold text-pink-400/50 bg-pink-50/50 px-2 py-0.5 rounded-full tracking-wider uppercase border border-pink-200/30">
              {couple.introLetterNote || 'Pause to read 📖'}
            </div>

            {/* Trái tim trang trí nhỏ */}
            <div className="absolute top-6 right-6 w-5 h-5 text-pink-400/40 animate-pulse">
              <Heart className="w-full h-full fill-current" />
            </div>

            {/* THIỆP PHẦN TRÊN */}
            <div className="flex-1 flex flex-col justify-start text-left">
              <h2 className="font-handwriting text-2xl md:text-3xl text-pink-700 font-bold mb-3 tracking-wide pt-2 select-text">
                {couple.introGreeting || 'Hey Samira,'}
              </h2>
              <p className="font-handwriting text-lg md:text-xl text-rose-950/90 leading-relaxed tracking-wide whitespace-pre-wrap select-text pr-2 mb-1">
                {couple.introMessage || 'Love is in the air, so I\'m taking this chance to spill the beans...'}
              </p>
            </div>

            {/* ĐƯỜNG GẤP THIỆP */}
            <div className="w-full my-3 border-t border-dashed border-pink-200/50 relative">
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#fcfbf9] flex items-center justify-center">
                <Heart className="w-2 text-pink-300 fill-pink-100" />
              </div>
            </div>

            {/* THIỆP PHẦN DƯỚI */}
            <div className="relative flex justify-between items-end min-h-[110px] pt-1">
              {/* Ký tên */}
              <div className="flex flex-col items-start font-handwriting select-text text-left">
                <span className="text-lg text-pink-600 italic">{couple.introSignOff || 'Fingers crossed,'}</span>
                <span className="text-xl md:text-2xl text-pink-750 font-bold mt-0.5 pl-2">{couple.introSender || 'Aaron'}</span>
              </div>

              {/* Tem thư & Dấu */}
              <div className="relative flex flex-col items-end mr-1 scale-90 origin-bottom-right">
                {/* Tem thư */}
                <div className="w-18 h-22 bg-white p-0.5 shadow-md border border-dashed border-pink-400/50 rotate-[6deg] flex flex-col items-center justify-between rounded-sm">
                  <div className="w-full h-[74%] overflow-hidden bg-rose-50 rounded-sm">
                    <img 
                      src={couple.introStampUrl || "https://images.unsplash.com/photo-1555448248-2571daf6344b?q=80&w=200&auto=format&fit=crop"} 
                      alt="Stamp"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[6px] text-pink-500 font-bold tracking-widest pb-0.5">LOVE MAIL</div>
                </div>

                {/* Dấu bưu điện */}
                <div className="absolute -left-5 bottom-3 w-18 h-18 rounded-full border border-pink-400/30 flex items-center justify-center rotate-[-10deg] z-10">
                  <div className="w-[84%] h-[84%] rounded-full border border-dashed border-pink-400/35 flex flex-col items-center justify-center text-center">
                    <span className="text-[6px] text-pink-400/40 font-bold tracking-widest leading-none">LOVE MAIL</span>
                    <Heart className="w-3 h-3 text-pink-400/35 fill-pink-400/5 my-0.5" />
                    <span className="text-[5px] text-pink-400/40 tracking-wider font-mono">SWEET.POST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nút bấm bước vào (Nằm gọn ở đáy lá thư) */}
            <button
              onClick={handleClose}
              className="mt-4 w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 z-30 font-display text-xs md:text-sm"
            >
              <span>{couple.introButtonText || 'Bước vào thế giới của chúng mình'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* E. NẮP PHONG BÌ PHÍA TRÊN (Lật 3D ra phía sau, z-index: 4 khi đóng, z-index: 0 khi mở) */}
          <div 
            onClick={handleOpenEnvelope}
            className="absolute top-0 left-0 right-0 h-[145px] bg-[#fcf9f2] border-t-3 border-x-3 border-pink-400 rounded-t-2xl origin-top transition-transform duration-[600ms] ease-in-out cursor-pointer"
            style={{
              clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
              transform: isOpen ? 'rotateX(180deg) translateY(-1px)' : 'rotateX(0deg)',
              zIndex: isOpen ? 0 : 12
            }}
          />

          {/* F. CÁC CÁNH PHONG BÌ MẶT TRƯỚC (Gấp đè lên lá thư ban đầu, z-index: 10) */}
          <div 
            onClick={handleOpenEnvelope}
            className="absolute inset-y-0 left-0 w-[212px] bg-[#f9f6ef] border-l-3 border-y-3 border-pink-400 cursor-pointer" 
            style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)', zIndex: 10 }} 
          />
          <div 
            onClick={handleOpenEnvelope}
            className="absolute inset-y-0 right-0 w-[212px] bg-[#f9f6ef] border-r-3 border-y-3 border-pink-400 cursor-pointer" 
            style={{ clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)', zIndex: 10 }} 
          />
          <div 
            onClick={handleOpenEnvelope}
            className="absolute bottom-0 inset-x-0 h-[155px] bg-[#f5f2e8] border-b-3 border-x-3 border-pink-400 rounded-b-2xl cursor-pointer" 
            style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)', zIndex: 10 }} 
          />

          {/* G. CON DẤU NIÊM PHONG SÁP HÌNH TRÁI TIM (z-index: 15) */}
          <div 
            onClick={handleOpenEnvelope}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-pink-500 border-2 border-pink-400 shadow-md flex items-center justify-center active:scale-90 transition-all duration-500 cursor-pointer ${isOpen ? 'scale-0 opacity-0 rotate-95' : 'scale-100 opacity-100 rotate-0 animate-pulse'}`}
            style={{ zIndex: 15 }}
          >
            <Heart className="w-8 h-8 fill-white text-white" />
          </div>

          {/* H. NHÃN HƯỚNG DẪN "CLICK TO OPEN 💖" DƯỚI PHONG BÌ (z-index: 15) */}
          <div 
            onClick={handleOpenEnvelope}
            className={`absolute bottom-[-50px] inset-x-0 text-center text-pink-600 font-bold text-sm tracking-widest transition-opacity duration-500 cursor-pointer ${isOpen ? 'opacity-0' : 'opacity-100 animate-pulse'}`}
            style={{ zIndex: 15 }}
          >
            {couple.introEnvelopeLabel || 'CLICK TO OPEN 💖'}
          </div>

        </div>

      </div>
    </div>
  );
}
