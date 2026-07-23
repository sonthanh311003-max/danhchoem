'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useMemory } from '@/lib/MemoryContext';
import { Play, Pause, Music, Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const { couple, isPlayingMusic, setIsPlayingMusic, musicVolume, setMusicVolume } = useMemory();
  const audioRef = useRef(null);
  const [songName, setSongName] = useState('Nhạc Nền Kỷ Niệm');

  // Điều khiển phát/dừng nhạc và âm lượng theo trạng thái context toàn cục
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume;
      
      if (isPlayingMusic) {
        audioRef.current.play().catch(err => {
          console.log("Trình duyệt chặn phát nhạc tự động: ", err);
          setIsPlayingMusic(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlayingMusic, musicVolume, couple.musicUrl, setIsPlayingMusic]);

  // Cập nhật tên bài hát dựa trên URL nhạc
  useEffect(() => {
    if (couple.musicUrl) {
      try {
        const decoded = decodeURIComponent(couple.musicUrl);
        const fileName = decoded.split('/').pop().split('?')[0];
        if (fileName && fileName.includes('.')) {
          setSongName(fileName.split('.')[0].replace(/-/g, ' '));
        }
      } catch (e) {
        setSongName('Nhạc Nền Kỷ Niệm');
      }
    }
  }, [couple.musicUrl]);

  const togglePlay = () => {
    setIsPlayingMusic(!isPlayingMusic);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[45] animate-fade-in select-none">
      <audio ref={audioRef} src={couple.musicUrl} loop />
      
      {/* 🎵 MINI SPOTIFY WIDGET (Tối giản cao cấp) */}
      <div 
        className="flex items-center gap-4 bg-black/80 backdrop-blur-md border border-zinc-850 px-4 py-2.5 rounded-full shadow-lg text-white"
        style={{
          boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Ảnh xoay nhỏ mờ */}
        <div className={`w-8 h-8 rounded-full bg-zinc-850 flex items-center justify-center text-rose-400 overflow-hidden relative border border-zinc-700/50 ${isPlayingMusic ? 'animate-spin [animation-duration:8s]' : ''}`}>
          {couple.avatar1 ? (
            <img src={couple.avatar1} alt="Cover" className="w-full h-full object-cover opacity-80" />
          ) : (
            <Music className="w-4 h-4" />
          )}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Thông tin tên bài hát trượt nhẹ */}
        <div className="flex flex-col text-left max-w-[120px] md:max-w-[150px] overflow-hidden">
          <span className="text-[10px] text-zinc-400 font-sans tracking-widest uppercase font-medium truncate">
            {isPlayingMusic ? 'Playing' : 'Paused'}
          </span>
          <span className="text-xs font-sans font-medium text-zinc-100 truncate tracking-wide">
            {songName}
          </span>
        </div>

        {/* Nút Play/Pause mỏng */}
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center transition-colors border border-zinc-800/80 active:scale-95"
        >
          {isPlayingMusic ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>

        {/* Chỉ báo Volume hoặc tắt bật nhanh */}
        <button
          onClick={() => setMusicVolume(musicVolume === 0 ? 0.5 : 0)}
          className="text-zinc-400 hover:text-white p-1 transition-colors"
          title="Tắt tiếng nhanh"
        >
          {musicVolume === 0 ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>

      </div>
    </div>
  );
}
