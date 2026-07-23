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

  // Thử tự động phát nhạc khi vừa truy cập (nếu trình duyệt không chặn)
  useEffect(() => {
    setIsPlayingMusic(true);
  }, [setIsPlayingMusic]);

  // Kích hoạt bóng bay, pháo hoa và phát nhạc khi mở thư
  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Kích hoạt phát nhạc nền (Vượt qua bộ chặn autoplay của trình duyệt nhờ hành động tương tác click của người dùng)
    setIsPlayingMusic(true);
    
    // Đồng bộ thời gian lật nắp phong bì (600ms) rồi trượt thiệp lên
    setTimeout(() => {
      setShowLetter(true);
      // Bắn pháo hoa giấy lấp lánh ngọt ngào
      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.7 },
        colors: ['#ff758f', '#ffb3c1', '#ff4d6d', '#fff']
      });
    }, 700);
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
      className={`fixed inset-0 z-50 transition-all duration-500 overflow-hidden select-none ${isRendered ? 'opacity-100' : 'opacity-0'}`}
      style={{
        // Họa tiết kẻ caro hồng-trắng ngọt ngào (Gingham Pink) y hệt video mẫu
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          {/* Quả bóng 1 (Bên trái) */}
          <div className="absolute left-[25%] bottom-[30%] animate-[floatBalloon_5s_ease-out_forwards]">
            <div className="relative flex flex-col items-center">
              <div className="w-14 h-14 bg-pink-400 rounded-full flex items-center justify-center shadow-md after:content-[''] after:absolute after:bottom-[-4px] after:w-0 after:h-0 after:border-l-[6px] after:border-l-transparent after:border-r-[6px] after:border-r-transparent after:border-t-[8px] after:border-t-pink-400">
                <Heart className="w-8 h-8 fill-white text-white opacity-90" />
              </div>
              <svg className="w-6 h-16 text-pink-400/60 overflow-visible mt-1" viewBox="0 0 20 60">
                <path d="M10,0 Q15,15 5,30 T10,60" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
              </svg>
            </div>
          </div>

          {/* Quả bóng 2 (Giữa - Nhạt hơn) */}
          <div className="absolute left-[48%] bottom-[32%] animate-[floatBalloon_6s_ease-out_0.3s_forwards]">
            <div className="relative flex flex-col items-center">
              <div className="w-16 h-16 bg-pink-300 rounded-full flex items-center justify-center shadow-md after:content-[''] after:absolute after:bottom-[-4px] after:w-0 after:h-0 after:border-l-[6px] after:border-l-transparent after:border-r-[6px] after:border-r-transparent after:border-t-[8px] after:border-t-pink-300">
                <Heart className="w-9 h-9 fill-white text-white opacity-90" />
              </div>
              <svg className="w-6 h-18 text-pink-300/60 overflow-visible mt-1" viewBox="0 0 20 60">
                <path d="M10,0 Q5,15 15,30 T10,60" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
              </svg>
            </div>
          </div>

          {/* Quả bóng 3 (Bên phải - Đậm hơn) */}
          <div className="absolute left-[68%] bottom-[29%] animate-[floatBalloon_4.5s_ease-out_0.6s_forwards]">
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

      {/* CSS KEYFRAMES CHO BÓNG BAY */}
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
      `}} />

      {/* KHUNG CHỨA TRUNG TÂM TUYỆT ĐỐI (Đảm bảo 100% nằm chính giữa màn hình) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl flex flex-col items-center justify-center px-4">
        
        {/* ✉️ 1. PHONG BÌ CĂN GIỮA TUYỆT ĐỐI (Envelope) - Làm to hơn 15% */}
        {!showLetter && (
          <div 
            onClick={handleOpenEnvelope}
            className={`group relative cursor-pointer select-none transition-all duration-500 transform hover:scale-105 active:scale-95 ${isOpen ? 'pointer-events-none' : 'animate-[bounce_3.5s_infinite]'}`}
            style={{ width: '420px', height: '280px' }}
          >
            {/* Bóng đổ phong bì */}
            <div className="absolute inset-0 bg-rose-900/5 rounded-3xl blur-2xl transform translate-y-5 scale-95" />

            {/* Thân phong bì màu kem nhạt, viền hồng đậm */}
            <div className="absolute inset-0 bg-[#fdfbf7] rounded-2xl border-3 border-pink-400 shadow-md overflow-hidden">
              <div className="absolute inset-2 border border-pink-200/50 rounded-xl" />
            </div>

            {/* Thư ló ra ngoài khi chưa mở (chữ thò ra cấu hình được) */}
            <div className={`absolute top-[-15px] inset-x-10 h-22 bg-[#fffdfa] border-t-2 border-x-2 border-pink-300 rounded-t-xl transition-all duration-500 shadow-sm flex items-center justify-center ${isOpen ? 'translate-y-4 opacity-0' : 'group-hover:translate-y-[-10px]'}`} style={{ zIndex: 5 }}>
              <span className="font-handwriting text-pink-700 text-xl font-bold">
                {couple.introEnvelopeText || 'To the Love of My Life'}
              </span>
            </div>

            {/* NẮP PHONG BÌ (Mở lật ngược 180 độ lên trên) */}
            <div 
              className="absolute top-0 left-0 right-0 h-[145px] bg-[#fcf9f2] border-t-3 border-x-3 border-pink-400 rounded-t-2xl origin-top transition-transform duration-500 ease-in-out"
              style={{
                clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
                transform: isOpen ? 'rotateX(180deg) translateY(-1px)' : 'rotateX(0deg)',
                zIndex: isOpen ? 2 : 12
              }}
            />

            {/* Các cánh gập bên trong */}
            <div className="absolute inset-y-0 left-0 w-[210px] bg-[#f9f6ef] border-l-3 border-y-3 border-pink-400" style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)', zIndex: 8 }} />
            <div className="absolute inset-y-0 right-0 w-[210px] bg-[#f9f6ef] border-r-3 border-y-3 border-pink-400" style={{ clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)', zIndex: 8 }} />
            <div className="absolute bottom-0 inset-x-0 h-[155px] bg-[#f5f2e8] border-b-3 border-x-3 border-pink-400 rounded-b-2xl" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)', zIndex: 10 }} />

            {/* Con dấu sáp trái tim niêm phong */}
            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-pink-500 border-2 border-pink-400 shadow-md flex items-center justify-center active:scale-90 transition-transform duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 animate-pulse'}`}
              style={{ zIndex: 15 }}
            >
              <Heart className="w-8 h-8 fill-white text-white" />
            </div>

            {/* Nhãn click nhấp nháy bên dưới (Cấu hình được) */}
            <div className="absolute bottom-[-50px] inset-x-0 text-center text-pink-600 font-bold text-sm tracking-widest">
              {couple.introEnvelopeLabel || 'CLICK TO OPEN 💖'}
            </div>
          </div>
        )}

        {/* 📜 2. LÁ THƯ TÌNH DẠNG THIỆP KÉP LẬT MỞ (Làm to rộng rãi, dễ đọc) */}
        <div 
          className={`w-full bg-[#fcfbf9] rounded-2xl shadow-2xl border-4 border-pink-300 p-6 md:p-8 relative transition-all duration-1000 transform flex flex-col justify-between ${showLetter ? 'translate-y-0 scale-100 opacity-100 rotate-0' : 'translate-y-[200px] scale-75 opacity-0 rotate-6 pointer-events-none'}`}
          style={{
            minHeight: '580px',
            boxShadow: '0 25px 60px -15px rgba(219, 39, 119, 0.25)'
          }}
        >
          {/* Nút "PAUSE TO READ" mờ nhẹ ở góc trái trên (Cấu hình được) */}
          <div className="absolute top-4 left-4 text-[9px] font-bold text-pink-400/50 bg-pink-50/50 px-2 py-0.5 rounded-full tracking-wider uppercase border border-pink-200/30">
            {couple.introLetterNote || 'Pause to read 📖'}
          </div>

          {/* Hình vẽ trái tim nhỏ ở góc */}
          <div className="absolute top-6 right-6 w-5 h-5 text-pink-400/40 animate-pulse">
            <Heart className="w-full h-full fill-current" />
          </div>

          {/* THIỆP KÉP - PHẦN TRÊN */}
          <div className="flex-1 flex flex-col justify-start">
            <h2 className="font-handwriting text-3xl md:text-4xl text-pink-700 font-bold mb-4 tracking-wide pt-2 select-text">
              {couple.introGreeting || 'Hey Samira,'}
            </h2>
            
            {/* Nội dung thư lãng mạn */}
            <p className="font-handwriting text-xl md:text-2xl text-rose-950/90 leading-relaxed tracking-wide whitespace-pre-wrap select-text pr-4 mb-2">
              {couple.introMessage || 'Love is in the air, so I\'m taking this chance to spill the beans...'}
            </p>
          </div>

          {/* ĐƯỜNG CẮT NẾT GẤP THIỆP MỜ Ở GIỮA */}
          <div className="w-full my-4 border-t border-dashed border-pink-200/60 relative">
            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#fcfbf9] flex items-center justify-center">
              <Heart className="w-2.5 h-2.5 text-pink-300 fill-pink-100" />
            </div>
          </div>

          {/* THIỆP KÉP - PHẦN DƯỚI */}
          <div className="relative flex justify-between items-end min-h-[140px] pt-1">
            
            {/* Phần ký tên */}
            <div className="flex flex-col items-start font-handwriting select-text pb-2">
              <span className="text-xl md:text-2xl text-pink-600 italic">{couple.introSignOff || 'Fingers crossed,'}</span>
              <span className="text-2xl md:text-3xl text-pink-750 font-bold mt-1 pl-3">{couple.introSender || 'Aaron'}</span>
            </div>

            {/* 📬 GÓC PHẢI DƯỚI: CON TEM THƯ RĂNG CƯA & DẤU BƯU ĐIỆN */}
            <div className="relative flex flex-col items-end mr-2">
              
              {/* Con tem răng cưa */}
              <div className="w-20 h-24 bg-white p-1 shadow-md border-2 border-dashed border-pink-400/50 rotate-[6deg] flex flex-col items-center justify-between rounded-sm">
                <div className="w-full h-[74%] overflow-hidden bg-rose-50 rounded-sm">
                  <img 
                    src={couple.introStampUrl || "https://images.unsplash.com/photo-1555448248-2571daf6344b?q=80&w=200&auto=format&fit=crop"} 
                    alt="Stamp Image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[7px] text-pink-500 font-bold tracking-widest leading-none pb-0.5">LOVE MAIL</div>
              </div>

              {/* Con dấu bưu điện tròn */}
              <div className="absolute -left-6 bottom-4 w-22 h-22 rounded-full border border-pink-400/30 flex items-center justify-center rotate-[-10deg] z-10 pointer-events-none">
                <div className="absolute right-[86px] w-10 h-6 flex flex-col justify-between opacity-30">
                  <div className="h-[1px] w-full bg-pink-400" />
                  <div className="h-[1px] w-9/12 bg-pink-400" />
                  <div className="h-[1px] w-full bg-pink-400" />
                </div>
                
                <div className="w-[84%] h-[84%] rounded-full border border-dashed border-pink-400/35 flex flex-col items-center justify-center text-center p-0.5">
                  <span className="text-[7px] text-pink-400/40 font-bold tracking-widest leading-none">LOVE MAIL</span>
                  <Heart className="w-3.5 h-3.5 text-pink-400/35 fill-pink-400/5 my-0.5" />
                  <span className="text-[6px] text-pink-400/40 tracking-wider font-mono">SWEET.POST</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* NÚT BẤM BƯỚC VÀO TRANG CHÍNH (Chữ trên nút cấu hình được) */}
        {showLetter && (
          <button
            onClick={handleClose}
            className="mt-8 px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2.5 z-30 font-display text-sm md:text-base animate-[bounce_4s_infinite]"
          >
            <span>{couple.introButtonText || 'Bước vào thế giới của chúng mình'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}

      </div>
    </div>
  );
}
