'use client';

import React, { useRef, useEffect } from 'react';
import { useMemory } from '@/lib/MemoryContext';
import { Music, Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const { couple, isPlayingMusic, setIsPlayingMusic } = useMemory();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Âm lượng 50% vừa phải
      if (isPlayingMusic) {
        audioRef.current.play().catch(err => {
          console.log("Autoplay bị chặn bởi trình duyệt, cần tương tác của user: ", err);
          setIsPlayingMusic(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlayingMusic, couple.musicUrl]);

  const togglePlay = () => {
    setIsPlayingMusic(!isPlayingMusic);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src={couple.musicUrl} loop />
      
      <button
        onClick={togglePlay}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border-2 border-white 
          ${isPlayingMusic 
            ? 'bg-rose-500 text-white animate-spin [animation-duration:10s]' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        style={{
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          borderColor: 'var(--color-border)'
        }}
        title={isPlayingMusic ? 'Tắt nhạc' : 'Bật nhạc nền'}
      >
        {isPlayingMusic ? (
          <Volume2 className="w-6 h-6 animate-pulse" />
        ) : (
          <VolumeX className="w-6 h-6 text-gray-400" />
        )}
      </button>

      {/* Hiệu ứng các nốt nhạc bay lên khi đang phát nhạc */}
      {isPlayingMusic && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none flex justify-around w-16">
          <span className="text-rose-500 text-xs animate-bounce" style={{ animationDelay: '0.1s' }}>🎵</span>
          <span className="text-pink-500 text-sm animate-bounce" style={{ animationDelay: '0.4s' }}>🎶</span>
          <span className="text-red-400 text-xs animate-bounce" style={{ animationDelay: '0.7s' }}>🎵</span>
        </div>
      )}
    </div>
  );
}
