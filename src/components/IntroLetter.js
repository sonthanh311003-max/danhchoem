'use client';

import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function IntroLetter({ couple, onEnterSite }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  // Kích hoạt confetti pháo hoa khi mở thư tình thành công
  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Đợi nắp phong bì lật xong (500ms) rồi trượt lá thư lên
    setTimeout(() => {
      setShowLetter(true);
      // Bắn pháo hoa Confetti ngọt ngào
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ff758f', '#ffb3c1', '#ff4d6d', '#fff']
      });
    }, 600);
  };

  const handleClose = () => {
    // Hiệu ứng mờ dần trước khi đóng hẳn
    setIsRendered(false);
    setTimeout(() => {
      onEnterSite();
    }, 500); // khớp với thời gian transition fade-out
  };

  if (!isRendered) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-rose-100/95 via-pink-50/95 to-red-100/95 backdrop-blur-md transition-opacity duration-500 overflow-y-auto ${isRendered ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Cánh hoa rơi lãng mạn phía sau phong bì */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-rose-400 rounded-full animate-falling"
            style={{
              width: `${Math.random() * 12 + 6}px`,
              height: `${Math.random() * 12 + 6}px`,
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 6 + 6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-lg flex flex-col items-center justify-center min-h-[400px]">
        
        {/* 1. CHIẾC PHONG BÌ 3D */}
        {!showLetter && (
          <div 
            onClick={handleOpenEnvelope}
            className={`group relative cursor-pointer select-none transition-all duration-500 transform hover:scale-105 active:scale-95 ${isOpen ? 'pointer-events-none' : ''}`}
            style={{ width: '360px', height: '240px' }}
          >
            {/* Bóng đổ phong bì */}
            <div className="absolute inset-0 bg-black/10 rounded-2xl blur-lg transform translate-y-3 scale-95" />

            {/* Thân phong bì (Mặt sau) */}
            <div className="absolute inset-0 bg-red-700 rounded-2xl border border-red-800 overflow-hidden shadow-inner flex items-center justify-center">
              {/* Sọc đỏ trắng xiên quanh viền (Mẫu bưu điện cổ) */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#fff_25%,transparent_25%,transparent_50%,#fff_50%,#fff_75%,transparent_75%,transparent)] bg-[size:40px_40px]" />
            </div>

            {/* Nắp tam giác phía trên (Lật 3D) */}
            <div 
              className="absolute top-0 left-0 right-0 h-[120px] bg-red-600 rounded-t-2xl origin-top transition-transform duration-500 ease-in-out border-b border-red-700 shadow-md"
              style={{
                clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
                transform: isOpen ? 'rotateX(180deg) translateY(-2px)' : 'rotateX(0deg)',
                zIndex: isOpen ? 5 : 20
              }}
            />

            {/* Cánh bên trái & phải bọc vào */}
            <div 
              className="absolute inset-y-0 left-0 w-[180px] bg-red-700/90 shadow-md"
              style={{
                clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
                zIndex: 10
              }}
            />
            <div 
              className="absolute inset-y-0 right-0 w-[180px] bg-red-700/90 shadow-md"
              style={{
                clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)',
                zIndex: 10
              }}
            />

            {/* Cánh bên dưới bọc lên */}
            <div 
              className="absolute bottom-0 inset-x-0 h-[130px] bg-red-650 rounded-b-2xl shadow-lg"
              style={{
                clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
                zIndex: 15
              }}
            />

            {/* Dấu niêm phong sáp hình Trái Tim giữa phong bì */}
            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-rose-500 border-2 border-rose-400 shadow-lg flex items-center justify-center active:scale-90 transition-transform duration-300 ${isOpen ? 'scale-0 rotate-45 opacity-0' : 'scale-100 rotate-0 opacity-100 animate-pulse'}`}
              style={{ zIndex: 25 }}
            >
              <Heart className="w-8 h-8 fill-white text-white" />
            </div>

            {/* Dòng chữ hướng dẫn */}
            <div className={`absolute bottom-[-50px] inset-x-0 text-center text-red-800 font-bold text-sm tracking-wide animate-pulse transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
              Gửi {couple.partner1 || 'cậu'} ❤️ Click để mở thư tình
            </div>
          </div>
        )}

        {/* 2. LÁ THƯ TÌNH TRƯỢT RA (Kèm các chi tiết kẹp giấy, tem bưu điện) */}
        <div 
          className={`w-full max-w-lg bg-white rounded-2xl shadow-2xl border-8 border-red-700 p-6 md:p-8 relative transition-all duration-1000 transform ${showLetter ? 'translate-y-0 scale-100 opacity-100 rotate-0' : 'translate-y-[200px] scale-75 opacity-0 rotate-3 pointer-events-none'}`}
          style={{
            backgroundImage: 'radial-gradient(#f8f6f0 85%, #f2efe4 100%)',
            boxShadow: '0 25px 50px -12px rgba(127, 29, 29, 0.4)'
          }}
        >
          {/* Viền sọc xiên Bưu điện (Mail border) */}
          <div className="absolute inset-0 border-4 border-double border-red-800/20 pointer-events-none m-1" />
          
          {/* Chi tiết: KẸP GIẤY màu hồng xinh xắn (Paperclip) */}
          <div className="absolute top-[-25px] left-[35px] w-[26px] h-[55px] border-4 border-rose-400/80 rounded-full rotate-12 z-20 pointer-events-none shadow-sm before:content-[''] before:absolute before:inset-1 before:border-2 before:border-rose-400/60 before:rounded-full" 
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 0% 85%)',
              background: 'transparent'
            }}
          />

          {/* Một vài trái tim bay trang trí vẽ tay */}
          <div className="absolute top-8 right-[150px] w-6 h-6 text-red-500/30 animate-pulse pointer-events-none">
            <Heart className="w-full h-full fill-current" />
          </div>
          <div className="absolute top-16 right-[170px] w-4 h-4 text-rose-400/30 animate-bounce pointer-events-none" style={{ animationDelay: '1s' }}>
            <Heart className="w-full h-full fill-current" />
          </div>

          {/* TIÊU ĐỀ LÁ THƯ (Lời chào) */}
          <h2 className="font-handwriting text-3xl md:text-4xl text-red-800 font-bold mb-6 tracking-wide select-text">
            {couple.introGreeting || 'Hey Samira,'}
          </h2>

          {/* NỘI DUNG CHÍNH (Lời nhắn nhủ) */}
          <p className="font-handwriting text-xl md:text-2xl text-red-950/90 leading-relaxed mb-8 whitespace-pre-wrap select-text tracking-wide min-h-[150px]">
            {couple.introMessage || 'Love is in the air, so I\'m taking this chance to spill the beans! You know, you\'ve been my classroom buddy for a while now...'}
          </p>

          {/* CHỮ KÝ */}
          <div className="flex flex-col items-start font-handwriting select-text">
            <span className="text-xl md:text-2xl text-red-800">{couple.introSignOff || 'Fingers crossed,'}</span>
            <span className="text-2xl md:text-3xl text-red-900 font-bold mt-1 pl-4">{couple.introSender || 'Aaron'}</span>
          </div>

          {/* 📬 GÓC PHẢI DƯỚI: TEM THƯ & CON DẤU BƯU ĐIỆN */}
          <div className="absolute bottom-6 right-6 flex flex-col items-end pointer-events-none select-none">
            
            {/* 1. Con tem răng cưa hình Gấu ôm tim (Stamp) */}
            <div className="w-20 h-24 bg-white p-1 shadow-md border-2 border-dashed border-red-700/40 rotate-[8deg] flex flex-col items-center justify-between">
              <div className="w-full h-[72%] overflow-hidden bg-rose-50 border border-gray-100 rounded-sm">
                <img 
                  src={couple.introStampUrl || "https://images.unsplash.com/photo-1555448248-2571daf6344b?q=80&w=200&auto=format&fit=crop"} 
                  alt="Stamp"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[7px] text-red-800 font-bold tracking-widest leading-none pb-0.5">LOVE MAIL</div>
            </div>

            {/* 2. Con dấu bưu điện đè lên tem (Postmark) */}
            <div className="absolute -left-6 bottom-4 w-24 h-24 rounded-full border-2 border-red-650/40 flex items-center justify-center rotate-[-12deg] z-10">
              {/* Sóng thư tín bên trái dấu */}
              <div className="absolute right-[92px] w-12 h-8 flex flex-col justify-between opacity-40">
                <div className="h-0.5 w-full bg-red-650 rounded-full" />
                <div className="h-0.5 w-10/12 bg-red-650 rounded-full" />
                <div className="h-0.5 w-full bg-red-650 rounded-full" />
              </div>
              
              <div className="w-[82%] h-[82%] rounded-full border border-dashed border-red-650/45 flex flex-col items-center justify-center text-center p-1">
                <span className="text-[8px] text-red-650/45 font-bold tracking-widest leading-none">LOVE MAIL</span>
                <Heart className="w-4 h-4 text-red-650/40 fill-red-650/20 my-1 animate-pulse" />
                <span className="text-[6px] text-red-650/45 tracking-widest font-mono">2026.07.23</span>
              </div>
            </div>

          </div>
        </div>

        {/* NÚT BẤM BƯỚC VÀO TRANG CHÍNH */}
        {showLetter && (
          <button
            onClick={handleClose}
            className="mt-8 px-8 py-3.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 animate-bounce [animation-duration:4s] z-30 font-display text-sm md:text-base"
          >
            <span>Khám phá thế giới của chúng mình</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}

      </div>
    </div>
  );
}
