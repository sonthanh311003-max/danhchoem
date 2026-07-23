'use client';

import React, { useState } from 'react';
import { useMemory } from '@/lib/MemoryContext';
import { MessageSquare, Send } from 'lucide-react';
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
    }, 400);
  };

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-display text-[var(--color-primary)]">
        Sổ Lưu Bút (Guestbook)
      </h2>
      <p className="text-center text-[var(--color-text-muted)] mb-12 text-sm max-w-md mx-auto">
        Để lại lời nhắn yêu thương hoặc lời chúc đáng yêu dành cho hai tụi mình nhé!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Form gửi lời nhắn */}
        <div className="md:col-span-1">
          <div className="glass-card rounded-2xl p-6 border shadow-sm sticky top-6">
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[var(--color-primary)]" />
              Gửi lời nhắn
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tên */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                  Tên của bạn
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Bạn Thân, Em Gái..."
                  className="w-full px-4 py-2 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white/50 text-sm text-[var(--color-text)]"
                />
              </div>

              {/* Lời chúc */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                  Lời chúc ngọt ngào
                </label>
                <textarea
                  required
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hôm nay mình chúc hai bạn..."
                  className="w-full px-4 py-2 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white/50 text-sm text-[var(--color-text)] resize-none"
                />
              </div>

              {/* Chọn sticker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                  Chọn biểu cảm
                </label>
                <div className="flex flex-wrap gap-2">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border transition-all active:scale-95
                        ${selectedEmoji === emoji
                          ? 'bg-[var(--color-primary)] text-white border-transparent scale-110 shadow-sm'
                          : 'bg-white border-[var(--color-border)] hover:bg-gray-50'
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
                className="w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-95 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Đang gửi...' : 'Gửi lời nhắn'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Danh sách lời nhắn */}
        <div className="md:col-span-2">
          {guestbook.length === 0 ? (
            <div className="text-center py-12 bg-white/40 border border-dashed border-[var(--color-border)] rounded-2xl">
              <p className="text-[var(--color-text-muted)] italic text-sm">Chưa có lời chúc nào, hãy là người đầu tiên!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence initial={false}>
                {guestbook.map((note, index) => {
                  // Tạo độ nghiêng nhẹ ngẫu nhiên để trông như giấy dán note thật (-3deg đến 3deg)
                  const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', 'rotate-0'];
                  const rotationClass = rotations[index % rotations.length];

                  return (
                    <motion.div
                      key={note.id || index}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: -30 }}
                      className={`glass-card rounded-2xl p-5 border shadow-sm relative transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${rotationClass}`}
                      style={{ transformOrigin: 'center' }}
                    >
                      {/* Sticker */}
                      <div className="absolute -top-3 -right-2 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-xl">
                        {note.emoji}
                      </div>

                      {/* Header */}
                      <div className="mb-2">
                        <span className="font-bold font-display text-[var(--color-text)]">
                          {note.sender_name}
                        </span>
                        <span className="block text-[10px] text-[var(--color-text-muted)] mt-0.5">
                          {new Date(note.created_at).toLocaleDateString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Content */}
                      <p className="text-xs md:text-sm text-[var(--color-text)] leading-relaxed whitespace-pre-wrap">
                        {note.message}
                      </p>
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
