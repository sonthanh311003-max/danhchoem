'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { motion } from 'framer-motion';
import { Undo, Redo, Eye, Edit2, Sparkles, BookOpen } from 'lucide-react';

export default function LetterEditor({ initialContent = '', onSave }) {
  const [content, setContent] = useState(initialContent);
  const [mode, setMode] = useState('edit'); // 'edit' | 'preview'
  const [history, setHistory] = useState([initialContent]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [, startTransition] = useTransition();

  const textareaRef = useRef(null);
  const autoSaveTimerRef = useRef(null);

  // 1. Quản lý Undo / Redo lịch sử gõ chữ
  const updateContentWithHistory = (newContent) => {
    setContent(newContent);
    
    // Nếu có sự thay đổi, cập nhật stack history
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(newContent);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setContent(history[prevIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setContent(history[nextIndex]);
    }
  };

  // Bắt phím tắt Ctrl+Z / Ctrl+Y toàn cục trong editor
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  // 2. Tự động lưu chạy ngầm (Auto Save Debounce 800ms)
  useEffect(() => {
    if (content === initialContent) return;

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    setIsSaving(true);
    autoSaveTimerRef.current = setTimeout(() => {
      startTransition(async () => {
        if (onSave) {
          await onSave(content);
        }
        setIsSaving(false);
      });
    }, 800);

    return () => clearTimeout(autoSaveTimerRef.current);
  }, [content, onSave, initialContent]);

  // 3. Tính toán các bộ đếm từ trực quan (Counters Math)
  const charCount = content.length;
  const wordCount = content.trim() === '' ? 0 : content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 180); // Tốc độ đọc 180 từ/phút

  // 4. Custom Parser dịch Markdown thô sang HTML hiển thị Preview
  const renderMarkdown = (text) => {
    if (!text) return '<p className="text-gray-300 italic">Lá thư của bạn đang trống...</p>';
    
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Dịch in đậm **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#2B2B2B]">$1</strong>');
    
    // Dịch in nghiêng *text*
    html = html.replace(/\*(.*?)\*/g, '<em class="italic text-gray-600">$1</em>');
    
    // Dịch trích dẫn > text
    html = html.replace(/^&gt;\s+(.*)$/gm, '<blockquote class="border-l-2 border-[#E96A87] pl-4 italic my-2 text-gray-500">$1</blockquote>');
    
    // Thay đổi ngắt dòng thành thẻ <br/>
    html = html.replace(/\n/g, '<br/>');

    return html;
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 select-none">
      
      {/* 🛠️ THANH CÔNG CỤ ĐIỀU KHIỂN PHÍA TRÊN */}
      <div className="flex items-center justify-between bg-white border border-[#FAF6F0] rounded-xl px-4 py-2 shadow-[0_2px_8px_rgba(61,43,39,0.02)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMode('edit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] tracking-wider uppercase font-semibold transition-all
              ${mode === 'edit' ? 'bg-[#FFF9F8] text-[#E96A87]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Edit2 className="w-3.5 h-3.5" />
            Soạn thảo
          </button>
          <button
            onClick={() => setMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] tracking-wider uppercase font-semibold transition-all
              ${mode === 'preview' ? 'bg-[#FFF9F8] text-[#E96A87]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Eye className="w-3.5 h-3.5" />
            Xem trước
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Nút Undo / Redo */}
          <div className="flex items-center gap-1 border-r border-[#FAF6F0] pr-3">
            <button
              onClick={handleUndo}
              disabled={historyIndex === 0}
              className="p-1.5 text-gray-400 hover:text-[#E96A87] disabled:opacity-30 rounded-lg hover:bg-gray-50"
              title="Hoàn tác (Ctrl+Z)"
            >
              <Undo className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex === history.length - 1}
              className="p-1.5 text-gray-400 hover:text-[#E96A87] disabled:opacity-30 rounded-lg hover:bg-gray-50"
              title="Làm lại (Ctrl+Y)"
            >
              <Redo className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Đèn báo tự động lưu */}
          <span className="text-[9px] font-sans text-gray-400 tracking-wide">
            {isSaving ? (
              <span className="flex items-center gap-1.5 text-[#D9B36A] font-medium">
                <Sparkles className="w-3 h-3 animate-spin" />
                Đang lưu ngầm...
              </span>
            ) : (
              <span className="text-gray-300">Đã lưu tự động</span>
            )}
          </span>
        </div>
      </div>

      {/* 📝 KHỐI GIẤY LÁ THƯ 3D (Center Canvas) */}
      <div 
        className="relative bg-[#FFFDFB] rounded-2xl p-8 sm:p-12 border border-[#FAF6F0] shadow-[0_20px_50px_rgba(61,43,39,0.06)] min-h-[500px] flex flex-col justify-between overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(#FAF6F0 1.2px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      >
        <div className="w-full flex justify-between items-center border-b border-[#FAF6F0] pb-3 text-gray-300 mb-6">
          <span className="font-display text-[9px] tracking-[0.25em] uppercase font-bold">Secret Letter</span>
          <BookOpen className="w-3.5 h-3.5" />
        </div>

        {/* Thân lá thư (Chỉ cuộn nội dung trong lá thư) */}
        <div className="flex-1 overflow-y-auto max-h-[350px] pr-2 scrollbar-thin">
          {mode === 'edit' ? (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => updateContentWithHistory(e.target.value)}
              placeholder="Viết những lời yêu thương chân thành gửi tới người thương của bạn tại đây... (Hỗ trợ định dạng in đậm bằng **chữ**, in nghiêng bằng *chữ*)"
              className="w-full h-full min-h-[300px] bg-transparent border-none outline-none resize-none font-handwriting text-lg sm:text-xl text-[#2B2B2B] leading-relaxed placeholder-gray-300 focus:ring-0"
              style={{ fontFamily: "'Caveat', cursive" }}
            />
          ) : (
            <div 
              className="font-handwriting text-lg sm:text-xl text-[#2B2B2B] leading-relaxed break-words text-left"
              style={{ fontFamily: "'Caveat', cursive" }}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />
          )}
        </div>

        {/* Footer lá thư chứa Signature và Bộ đếm chữ */}
        <div className="w-full border-t border-[#FAF6F0] pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400">
          <div className="flex gap-4 text-[9px] font-sans tracking-wider uppercase font-bold text-gray-300">
            <span>{charCount} Ký tự</span>
            <span>{wordCount} Từ</span>
            <span>{readingTime} Phút đọc</span>
          </div>
          <span className="font-display text-sm italic text-[#E96A87]">Yours, Forever</span>
        </div>
      </div>

    </div>
  );
}
