'use client';

import React, { useState } from 'react';
import { useMemory } from '@/lib/MemoryContext';
import { Mail, Send, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EMOJI_OPTIONS = ['❤️', '🎉', '🌸', '✨', '😍', '🧸', '🐱', '🍀'];

export default function Guestbook() {
  const { guestbook, addGuestbookMessage } = useMemory();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('❤️');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    
    // Giả lập gửi nhanh
    setTimeout(() => {
      addGuestbookMessage(name.trim(), message.trim(), selectedEmoji);
      setName('');
      setMessage('');
      setSelectedEmoji('❤️');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="py-16 px-4 max-w-5xl mx-auto select-none">
      
      {/* Tiêu đề mục */}
      <div className="text-center mb-16 space-y-2">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#E96A87] font-semibold">
          GUEST MESSAGES
        </span>
        <h2 className="font-display text-4xl font-light text-[#2B2B2B] tracking-wide">
          Sổ Lưu Bút Kỷ Niệm
        </h2>
        <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
          Hãy để lại một lời nhắn ngọt ngào hoặc lời chúc đáng yêu để cùng lưu giữ trong chiếc hộp ký ức này nhé.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* ✉️ FORM GỬI LỜI NHẮN TỐI GIẢN (Postcard Sender) */}
        <div className="lg:col-span-1">
          <div 
            className="bg-[#FFFDFB] rounded-xl border border-[#FAF6F0] p-6 shadow-md relative"
            style={{
              boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.02)',
              backgroundImage: 'radial-gradient(#FAF6F0 1px, transparent 0)',
              backgroundSize: '16px 16px'
            }}
          >
            <h3 className="font-display text-lg font-light text-[#2B2B2B] mb-6 flex items-center gap-2 pb-3 border-b border-pink-100/10">
              <Mail className="w-4 h-4 text-[#E96A87]" />
              Gửi Bưu Thiếp Lời Chúc
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Tên */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Tên của bạn
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Bạn Thân, Em Gái..."
                  className="w-full px-4 py-2 text-sm bg-white border border-pink-100/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E96A87] text-[#2B2B2B] placeholder-gray-400 font-sans"
                />
              </div>

              {/* Lời chúc */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Lời chúc ngọt ngào
                </label>
                <textarea
                  required
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hôm nay mình muốn chúc hai bạn..."
                  className="w-full px-4 py-2 text-sm bg-white border border-pink-100/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E96A87] text-[#2B2B2B] placeholder-gray-400 font-sans resize-none leading-relaxed"
                />
              </div>

              {/* Chọn sticker tem thư */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Chọn con tem bưu điện
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`h-9 rounded-xl flex items-center justify-center text-lg border transition-all active:scale-95
                        ${selectedEmoji === emoji
                          ? 'bg-[#E96A87] text-white border-transparent scale-105 shadow-sm'
                          : 'bg-white border-pink-100/10 hover:bg-[#FFF9F8] text-[#2B2B2B]'
                        }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Button gửi */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-[#2B2B2B] hover:bg-[#E96A87] text-white font-medium text-xs tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
              >
                <span>{isSubmitting ? 'Đang gửi...' : 'Gửi bưu thiếp'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* 📬 DANH SÁCH LỜI NHẮN (Postcard Wall) */}
        <div className="lg:col-span-2">
          {guestbook.length === 0 ? (
            <div className="text-center py-16 bg-[#FFFDFB]/40 border border-dashed border-pink-150/10 rounded-2xl">
              <p className="text-gray-400 italic text-sm font-sans">Chưa có lời chúc nào, hãy gửi tấm bưu thiếp đầu tiên nhé...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence initial={false}>
                {guestbook.map((note, index) => {
                  // Tạo độ nghiêng nhẹ tự nhiên của bưu thiếp cổ điển (-2deg đến 2deg)
                  const rotations = ['-rotate-1', 'rotate-1', '-rotate-[1.5deg]', 'rotate-[1.5deg]', 'rotate-0'];
                  const rotationClass = rotations[index % rotations.length];

                  return (
                    <motion.div
                      key={note.id || index}
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, x: -20 }}
                      className={`bg-[#FFFDFB] rounded-xl p-6 border border-pink-100/10 shadow-sm relative transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${rotationClass} flex flex-col justify-between min-h-[220px]`}
                      style={{ 
                        transformOrigin: 'center',
                        backgroundImage: 'radial-gradient(#fdfbf8 1px, transparent 0)',
                        backgroundSize: '12px 12px'
                      }}
                    >
                      {/* 🎫 CON TEM THƯ EMOJI (Góc phải tấm bưu thiếp) */}
                      <div className="absolute top-4 right-4 w-12 h-16 bg-white p-1 shadow-sm border border-dashed border-pink-300/40 rotate-[6deg] flex flex-col items-center justify-between rounded-sm">
                        <div className="w-full h-[72%] overflow-hidden bg-rose-50 flex items-center justify-center text-2xl rounded-sm">
                          {note.emoji}
                        </div>
                        <div className="text-[5px] text-pink-400 font-bold tracking-widest leading-none pb-0.5">LOVE MAIL</div>
                      </div>

                      {/* 🏣 DẤU BƯU ĐIỆN IN CHÌM ĐÈ LÊN CON TEM */}
                      <div className="absolute top-2 right-12 w-16 h-16 rounded-full border border-pink-400/15 flex items-center justify-center rotate-[-10deg] pointer-events-none">
                        <div className="w-[84%] h-[84%] rounded-full border border-dashed border-pink-400/20 flex flex-col items-center justify-center text-center">
                          <span className="text-[5px] text-pink-400/25 font-bold tracking-wider leading-none">POSTAGE</span>
                          <Heart className="w-1.5 h-1.5 text-pink-400/20 fill-pink-400/5 my-0.5" />
                          <span className="text-[4px] text-pink-400/25 tracking-widest font-mono">APPROVED</span>
                        </div>
                      </div>

                      {/* Header bưu thiếp (Người gửi) */}
                      <div className="mb-4 pr-14 text-left">
                        <span className="font-display font-light text-lg text-[#2B2B2B] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#D9B36A] animate-pulse" />
                          {note.sender_name}
                        </span>
                        <span className="block text-[9px] tracking-wider uppercase text-gray-400 mt-1 font-sans">
                          {new Date(note.created_at).toLocaleDateString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Body bưu thiếp (Lời chúc viết tay lãng mạn) */}
                      <div className="flex-1 text-left pb-4 border-b border-pink-100/10 border-dashed">
                        <p className="font-handwriting text-2xl text-[#2B2B2B]/90 leading-relaxed whitespace-pre-wrap select-text">
                          {note.message}
                        </p>
                      </div>

                      {/* Footer chìm nhỏ */}
                      <div className="pt-3 flex justify-between items-center text-[8px] tracking-[0.2em] uppercase text-gray-400 font-sans">
                        <span>Digital Postcard</span>
                        <Heart className="w-2.5 h-2.5 text-[#E96A87]/30 fill-pink-50" />
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>
      
    </div>
  );
}
