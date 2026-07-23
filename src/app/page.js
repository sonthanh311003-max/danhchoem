'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useMemory } from '@/lib/MemoryContext';
import FallingParticles from '@/components/FallingParticles';
import MusicPlayer from '@/components/MusicPlayer';
import TimeCounter from '@/components/TimeCounter';
import Timeline from '@/components/Timeline';
import PhotoAlbum from '@/components/PhotoAlbum';
import SecretLetter from '@/components/SecretLetter';
import FutureLetter from '@/components/FutureLetter';
import BucketList from '@/components/BucketList';
import Guestbook from '@/components/Guestbook';
import SurpriseButton from '@/components/SurpriseButton';
import IntroLetter from '@/components/IntroLetter';
import { Heart, ChevronDown, Settings, Sparkles, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { couple, isPlayingMusic, setIsPlayingMusic, setMusicVolume } = useMemory();
  const contentRef = useRef(null);
  const endingRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasEntered, setHasEntered] = useState(true);

  // 1. Quản lý màn hình tải trang (Loading Screen)
  useEffect(() => {
    // Giả lập loading mượt mà
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // 2. Kiểm tra trạng thái đã đọc thư mở đầu chưa
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const entered = sessionStorage.getItem('dmc_entered_intro');
      if (!entered) {
        setHasEntered(false);
      }
    }
  }, []);

  // 3. Cơ chế giảm âm lượng nhạc khi cuộn đến Ending Section
  useEffect(() => {
    const handleScroll = () => {
      if (!endingRef.current) return;
      
      const rect = endingRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Khối Ending bắt đầu xuất hiện từ đáy màn hình
      if (rect.top < windowHeight) {
        // Tính toán tỷ lệ phần trăm khối Ending đã hiển thị
        const visibleHeight = windowHeight - rect.top;
        const totalHeight = rect.height;
        const ratio = Math.min(visibleHeight / (totalHeight * 0.7), 1); // Đạt âm lượng 0 khi hiển thị 70%
        
        // Giảm tuyến tính âm lượng từ 0.5 (mặc định) về 0
        const volume = 0.5 * (1 - ratio);
        setMusicVolume(Math.max(volume, 0));
      } else {
        setMusicVolume(0.5); // Trả lại âm lượng mặc định khi cuộn lên trên
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setMusicVolume]);

  const handleEnterSite = () => {
    setHasEntered(true);
    setIsPlayingMusic(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('dmc_entered_intro', 'true');
    }
    // Cuộn mượt mà xuống vùng nội dung kỷ niệm
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollTocontent = () => {
    if (!hasEntered) {
      // Nếu chưa đọc thư, đưa người dùng mở thư trước
      const introBtn = document.querySelector('[class*="CLICK TO OPEN"]');
      if (introBtn) {
        introBtn.scrollIntoView({ behavior: 'smooth' });
      } else {
        setHasEntered(false);
      }
    } else {
      contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF9F8] transition-colors duration-1000">
      
      {/* ⏳ A. LOADING SCREEN (Trải nghiệm chào sân đẳng cấp điện ảnh) */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFF9F8] transition-opacity duration-700">
          <div className="text-center flex flex-col items-center space-y-6">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#2B2B2B] tracking-[0.2em] font-light animate-pulse [animation-duration:2.5s]">
              OUR STORY
            </h2>
            <div className="w-16 h-[1.5px] bg-[#E96A87]/30 overflow-hidden relative rounded-full">
              <div className="absolute inset-0 bg-[#E96A87] w-1/2 rounded-full animate-[loadingLine_2s_ease-in-out_infinite]" />
            </div>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes loadingLine {
              0% { transform: translateX(-100%); }
              50% { transform: translateX(200%); }
              100% { transform: translateX(-100%); }
            }
          `}} />
        </div>
      )}

      {/* Tích hợp hiệu ứng hạt bay nhẹ (đã giảm 80% nhiễu) & widget phát nhạc */}
      <FallingParticles />
      <MusicPlayer />

      {/* 🎬 B. HERO SECTION (Bìa phim điện ảnh phong cách Editorial) */}
      <header className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Nền ảnh bìa được cinematic overlay làm tối sang trọng */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 transform scale-100"
          style={{ 
            backgroundImage: `url(${couple.coverImage})`,
            filter: 'brightness(0.35) contrast(1.05)'
          }}
        />
        
        {/* Dải gradient che mờ chân trang tinh tế */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FFF9F8] to-transparent z-10" />

        {/* Nội dung bìa thơ mộng */}
        <div className="relative z-20 text-center text-white flex flex-col items-center max-w-4xl px-4">
          
          {/* Hai avatar giao thoa mỏng manh, tối giản */}
          <div className="flex items-center gap-4 md:gap-6 mb-6">
            <img 
              src={couple.avatar1} 
              alt={couple.partner1} 
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white/40 shadow-xl"
            />
            <div className="w-6 h-[1px] bg-white/30" />
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 fill-white text-white opacity-80" />
            </div>
            <div className="w-6 h-[1px] bg-white/30" />
            <img 
              src={couple.avatar2} 
              alt={couple.partner2} 
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white/40 shadow-xl"
            />
          </div>

          {/* Tiêu đề Serif cực kỳ sang trọng */}
          <h1 className="font-display text-5xl md:text-8xl font-light tracking-wide mb-6 flex items-center gap-2 drop-shadow-md">
            <span>{couple.partner1}</span>
            <span className="font-display italic text-white/50 px-2">&amp;</span>
            <span>{couple.partner2}</span>
          </h1>

          {/* Ngày kỷ niệm phong cách tối giản */}
          <span className="text-xs md:text-sm tracking-[0.25em] font-sans font-medium uppercase text-white/80 border-b border-white/25 pb-2 mb-10">
            {new Date(couple.anniversaryDate).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>

          {/* Nút bấm duy nhất cuốn hút */}
          <button
            onClick={scrollTocontent}
            className="group px-8 py-3.5 bg-white text-[#2B2B2B] hover:bg-[#E96A87] hover:text-white font-medium tracking-wider rounded-full shadow-lg transition-all duration-500 flex items-center gap-2 transform hover:scale-[1.03] active:scale-95 text-sm uppercase"
          >
            <span>Khám phá hành trình</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Scroll Indicator mỏng manh góc dưới */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-1.5 opacity-50">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white font-light">Scroll</span>
          <div className="w-1 h-3 border border-white rounded-full flex justify-center p-0.5">
            <div className="w-0.5 h-1 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </header>

      {/* 📜 C. TRANG NỘI DUNG KỶ NIỆM (Sau khi mở thư hoặc cuộn xuống) */}
      <main ref={contentRef} className="relative w-full z-20 bg-[#FFF9F8] transition-colors duration-1000">
        
        {/* 1. Bộ đếm thời gian bên nhau tối giản số lớn */}
        <section className="py-24 max-w-6xl mx-auto px-4">
          <TimeCounter />
        </section>

        {/* 2. Dòng thời gian kể chuyện (Netflix-style Chapters) */}
        <section className="py-12 bg-white/30">
          <Timeline />
        </section>

        {/* 3. Album ảnh Masonry rộng rãi và Lightbox */}
        <section className="py-24 max-w-7xl mx-auto px-4">
          <PhotoAlbum />
        </section>

        {/* 4. Bản đồ & Spotify nhúng sang trọng */}
        <section className="py-24 bg-white/40 border-y border-pink-100/20">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Spotify Playlist nhúng tối giản */}
            <div className="glass-card rounded-2xl p-8 border border-pink-150/10 flex flex-col min-h-[460px]">
              <h3 className="font-display text-2xl font-light text-[#2B2B2B] mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E96A87]" />
                Bản Nhạc Của Chúng Mình
              </h3>
              <div className="flex-1 rounded-xl overflow-hidden border border-pink-50 bg-[#fffbfb]">
                {couple.spotifyPlaylistUrl ? (
                  <iframe 
                    src={couple.spotifyPlaylistUrl} 
                    width="100%" 
                    height="100%" 
                    allowFullScreen="" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    className="border-none min-h-[350px]"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center p-6 text-center text-gray-400 italic text-sm">
                    Chưa cấu hình playlist Spotify...
                  </div>
                )}
              </div>
            </div>

            {/* Google Maps nhúng mềm mại */}
            <div className="glass-card rounded-2xl p-8 border border-pink-150/10 flex flex-col min-h-[460px]">
              <h3 className="font-display text-2xl font-light text-[#2B2B2B] mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#E96A87]" />
                Nơi Tình Yêu Bắt Đầu
              </h3>
              <div className="flex-1 rounded-xl overflow-hidden border border-pink-50 bg-[#fffbfb]">
                {couple.mapsEmbedUrl ? (
                  <iframe 
                    src={couple.mapsEmbedUrl} 
                    width="100%" 
                    height="100%" 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="border-none min-h-[350px]"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center p-6 text-center text-gray-400 italic text-sm">
                    Chưa cấu hình bản đồ địa điểm...
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* 5. Thư tình bí mật & Thư tương lai dạng Realistic Paper */}
        <section className="py-24 bg-white/20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-display text-4xl md:text-5xl font-light text-center text-[#2B2B2B] mb-16 tracking-wide">
              Những Lá Thư Tình
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <SecretLetter />
              <FutureLetter />
            </div>
          </div>
        </section>

        {/* 6. Sổ tay Bucket List & Surprise Button */}
        <section className="py-24 border-t border-pink-100/10">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2">
              <BucketList />
            </div>
            <div className="md:col-span-1 flex flex-col items-center justify-center">
              <SurpriseButton />
            </div>
          </div>
        </section>

        {/* 7. Lời chúc mừng của mọi người (Guestbook) */}
        <section className="py-24 bg-white/30 border-t border-pink-100/10">
          <Guestbook />
        </section>

        {/* 🎬 D. ENDING SECTION (Kết thúc tĩnh lặng, dư âm cảm xúc) */}
        <section 
          ref={endingRef} 
          className="relative h-screen bg-[#121212] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
          style={{ transition: 'background-color 1s ease' }}
        >
          {/* Lớp overlay sao mờ mỏng manh */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-[#121212] to-black opacity-80" />
          
          <div className="relative z-10 max-w-2xl flex flex-col items-center">
            {/* Biểu tượng trái tim nhỏ mờ nhạt từ bóng tối */}
            <Heart className="w-8 h-8 text-[#E96A87]/30 fill-[#E96A87]/5 mb-8 animate-pulse [animation-duration:4s]" />
            
            {/* Câu nói duy nhất lơ lửng */}
            <p className="font-display text-3xl md:text-5xl italic font-extralight text-[#F5F5F7] leading-relaxed tracking-wide drop-shadow-lg px-4">
              "Thank you for becoming my favorite memory."
            </p>
            
            {/* Chữ ký mảnh nhỏ */}
            <span className="mt-8 text-[10px] tracking-[0.4em] uppercase text-zinc-500 font-light">
              {couple.partner1} &amp; {couple.partner2}
            </span>
          </div>
        </section>

      </main>

      {/* E. FOOTER CUỐI CÙNG (Dưới Ending Section) */}
      <footer className="py-12 bg-[#121212] border-t border-zinc-900 text-center relative z-10 text-zinc-500">
        <p className="text-[10px] tracking-widest font-light mb-6 uppercase text-zinc-600">
          © {new Date().getFullYear()} Digital Memory Capsule. Cùng nhau viết tiếp câu chuyện tình yêu.
        </p>

        {/* Nút vào trang Admin */}
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-850 text-zinc-400 transition-colors border border-zinc-800"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Quản lý Memory Capsule (Admin)</span>
        </Link>
      </footer>

      {/* F. LỚP PHỦ THƯ MỞ ĐẦU (IntroLetter Gingham Caro) */}
      {!hasEntered && (
        <IntroLetter couple={couple} onEnterSite={handleEnterSite} />
      )}
    </div>
  );
}
