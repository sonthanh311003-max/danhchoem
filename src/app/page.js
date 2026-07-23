'use client';

import React, { useRef } from 'react';
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
import { Heart, ChevronDown, Settings, ShieldAlert, Sparkles, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { couple, isPlayingMusic, setIsPlayingMusic } = useMemory();
  const contentRef = useRef(null);

  const scrollTocontent = () => {
    // Tự động bật nhạc khi người dùng nhấn "Enter" để tránh bị chặn autoplay
    setIsPlayingMusic(true);
    
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* 1. Hiệu ứng động nền & Nhạc nền trôi nổi */}
      <FallingParticles />
      <MusicPlayer />

      {/* 2. TRANG ĐẦU (COVER PAGE) */}
      <header className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Ảnh nền mờ nhẹ */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
          style={{ 
            backgroundImage: `url(${couple.coverImage})`,
            filter: 'brightness(0.4) contrast(1.1)' 
          }}
        />

        {/* Nội dung trang bìa */}
        <div className="relative z-10 text-center text-white flex flex-col items-center max-w-3xl">
          {/* Avatar hai người tròn xinh */}
          <div className="flex items-center gap-4 md:gap-8 mb-8 animate-bounce [animation-duration:3s]">
            <img 
              src={couple.avatar1} 
              alt={couple.partner1} 
              className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover border-4 border-white/60 shadow-lg"
            />
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-rose-500/80 border border-white flex items-center justify-center animate-pulse">
              <Heart className="w-5 h-5 md:w-6 md:h-6 fill-white text-white" />
            </div>
            <img 
              src={couple.avatar2} 
              alt={couple.partner2} 
              className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover border-4 border-white/60 shadow-lg"
            />
          </div>

          {/* Tên cặp đôi */}
          <h1 className="text-4xl md:text-7xl font-extrabold font-display tracking-wide mb-4 flex items-center gap-3 drop-shadow-md">
            {couple.partner1}
            <Heart className="w-8 h-8 md:w-14 md:h-14 text-rose-500 fill-rose-500 animate-pulse flex-shrink-0" />
            {couple.partner2}
          </h1>

          {/* Câu trích dẫn tình yêu */}
          <p className="text-base md:text-xl italic font-serif text-white/95 px-6 max-w-xl mb-6 leading-relaxed drop-shadow-sm font-display">
            "Every love story is beautiful, but ours is my favorite."
          </p>

          {/* Ngày kỷ niệm */}
          <span className="text-sm md:text-lg font-bold tracking-widest bg-white/20 backdrop-blur-sm border border-white/20 px-6 py-2 rounded-full mb-12 shadow-sm font-display">
            {new Date(couple.anniversaryDate).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </span>

          {/* Nút Enter memories */}
          <button
            onClick={scrollTocontent}
            className="group px-8 py-3.5 rounded-full bg-white text-gray-900 font-bold hover:bg-rose-500 hover:text-white transition-all duration-300 flex items-center gap-2.5 shadow-lg transform hover:scale-105 active:scale-95"
          >
            <span>Khám phá kỷ niệm</span>
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Overlay hiệu ứng sóng nước hoặc sương mù phía dưới cùng */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none" />
      </header>

      {/* 3. TRANG NỘI DUNG CHÍNH (Được cuộn tới) */}
      <main ref={contentRef} className="flex-1 bg-[var(--color-bg)] transition-colors duration-500">
        
        {/* Bộ đếm thời gian bên nhau */}
        <section className="py-12 border-b border-[var(--color-border)]/40">
          <TimeCounter />
        </section>

        {/* Dòng thời gian kỷ niệm */}
        <section className="py-12 border-b border-[var(--color-border)]/40 bg-white/10">
          <Timeline />
        </section>

        {/* Album ảnh Masonry */}
        <section className="py-12 border-b border-[var(--color-border)]/40">
          <PhotoAlbum />
        </section>

        {/* Tích hợp Maps & Spotify */}
        <section className="py-16 border-b border-[var(--color-border)]/40 bg-white/20">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Spotify Embed */}
            <div className="glass-card rounded-3xl p-6 border shadow-sm flex flex-col">
              <h3 className="text-xl font-bold font-display text-[var(--color-text)] mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-500" />
                Playlist Của Chúng Mình
              </h3>
              <div className="flex-1 min-h-[350px] rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
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

            {/* Google Maps Embed */}
            <div className="glass-card rounded-3xl p-6 border shadow-sm flex flex-col">
              <h3 className="text-xl font-bold font-display text-[var(--color-text)] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                Nơi Tình Yêu Bắt Đầu
              </h3>
              <div className="flex-1 min-h-[350px] rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
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

        {/* Thư tình bí mật & Thư tương lai */}
        <section className="py-16 border-b border-[var(--color-border)]/40 bg-white/5">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-display text-[var(--color-primary)]">
              Những Lá Thư Tình
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SecretLetter />
              <FutureLetter />
            </div>
          </div>
        </section>

        {/* Bucket List & Surprise Button */}
        <section className="py-16 border-b border-[var(--color-border)]/40">
          <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <BucketList />
            </div>
            <div className="md:col-span-1 flex flex-col items-center">
              <SurpriseButton />
            </div>
          </div>
        </section>

        {/* Guestbook Lời Chúc */}
        <section className="py-16 bg-white/10">
          <Guestbook />
        </section>

      </main>

      {/* 4. FOOTER */}
      <footer className="py-12 border-t border-[var(--color-border)]/20 bg-white/40 text-center relative z-10">
        <p className="font-display font-bold text-lg md:text-xl text-[var(--color-text)] flex items-center justify-center gap-1.5 mb-2">
          {couple.partner1}
          <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
          {couple.partner2}
        </p>
        <p className="text-xs text-[var(--color-text-muted)] font-medium mb-6">
          © {new Date().getFullYear()} Digital Memory Capsule. Cùng nhau viết tiếp câu chuyện tình yêu.
        </p>

        {/* Nút vào trang Admin */}
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors border border-gray-200"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Quản lý Memory Capsule (Admin)</span>
        </Link>
      </footer>
    </div>
  );
}
