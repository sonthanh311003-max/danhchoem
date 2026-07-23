'use client';

import React from 'react';
import { Play, Pause, RotateCcw, FastForward, Sliders } from 'lucide-react';

export default function TimelineController({ 
  playbackState, 
  progress, 
  onPlay, 
  onPause, 
  onSkip, 
  onReplay 
}) {
  const percentage = Math.round(progress * 100);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-2.5 bg-white/70 backdrop-blur-md border border-[#FAF6F0] rounded-2xl p-4 shadow-[0_8px_32px_rgba(61,43,39,0.04)] select-none">
      
      {/* 📊 THANH TIẾN TRÌNH PLAYBACK TIMELINE */}
      <div className="flex items-center justify-between text-[9px] font-sans tracking-widest text-gray-400 uppercase font-bold px-0.5">
        <span>Timeline Hồi ức</span>
        <span className="font-mono tabular-nums text-[#E96A87]">{percentage}%</span>
      </div>

      <div className="relative w-full h-1 bg-[#FAF6F0] rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#E96A87] to-[#D9B36A] transition-all duration-100 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* 🛠️ CÁC NÚT ĐIỀU KHIỂN CHUYÊN NGHIỆP */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          {playbackState === 'playing' ? (
            <button
              onClick={onPause}
              className="p-2 text-gray-500 hover:text-[#E96A87] hover:bg-[#FFF9F8] rounded-xl transition-all"
              title="Tạm dừng"
            >
              <Pause className="w-4 h-4 fill-current" />
            </button>
          ) : (
            <button
              onClick={onPlay}
              className="p-2 text-gray-500 hover:text-[#E96A87] hover:bg-[#FFF9F8] rounded-xl transition-all"
              title="Phát tiếp"
            >
              <Play className="w-4 h-4 fill-current" />
            </button>
          )}

          <button
            onClick={onReplay}
            className="p-2 text-gray-400 hover:text-[#E96A87] hover:bg-[#FFF9F8] rounded-xl transition-all"
            title="Phát lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onSkip}
          disabled={playbackState === 'completed'}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] tracking-wider font-semibold uppercase text-gray-400 hover:text-[#E96A87] disabled:opacity-30 disabled:hover:text-gray-400 rounded-lg hover:bg-[#FFF9F8] transition-all"
          title="Bỏ qua hoạt ảnh"
        >
          <span>Xem nhanh</span>
          <FastForward className="w-3 h-3" />
        </button>
      </div>

    </div>
  );
}
