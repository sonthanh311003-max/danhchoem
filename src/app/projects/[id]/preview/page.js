'use client';

import React, { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProjectStore } from '@/features/projects/stores/useProjectStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowLeft, Eye, Edit2, Play, ChevronDown, Sparkles } from 'lucide-react';
import LetterEditor from '@/features/editor/components/LetterEditor';
import TimelineController, { useAnimationTimeline } from '@/features/viewer/hooks/useAnimationTimeline'; // Chúng ta có thể dùng import trực tiếp

// Tạm thời định nghĩa các hàm con của Preview page tại đây
export default function ProjectPreviewPage({ params }) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;
  const router = useRouter();
  
  const { projects, setCurrentProject, currentProject } = useProjectStore();
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'edit'
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [letterContent, setLetterContent] = useState('Gửi em yêu thương chân thành nhất...');

  // Tìm kiếm dự án tương ứng
  const project = projects.find(p => p.id === projectId) || projects[0];

  useEffect(() => {
    if (project) {
      setCurrentProject(project);
    }
  }, [project, setCurrentProject]);

  const handleSaveLetter = async (newContent) => {
    setLetterContent(newContent);
    // Tự động lưu ngầm trong store project
    if (project) {
      project.letterContent = newContent;
      project.updatedAt = new Date().toISOString();
    }
  };

  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-[#FFF9F8]">
        <p className="text-sm text-gray-400">Không tìm thấy dự án kỷ niệm.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#FFF9F8] dark:bg-[#161313] transition-colors duration-500 min-h-screen">
      
      {/* 🛠️ TOP UTILITY TOOLBAR */}
      <div className="w-full bg-white dark:bg-[#1F1A1A] border-b border-[#FAF6F0] dark:border-[#292222] px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-[0_2px_12px_rgba(61,43,39,0.01)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/welcome')}
            className="p-2 text-gray-400 hover:text-[#E96A87] rounded-xl hover:bg-[#FFF9F8] dark:hover:bg-[#292222] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#2B2B2B] dark:text-[#F0E6E4]">
              {project.name}
            </span>
            <span className="text-[9px] text-gray-400 dark:text-[#7A6D6B] font-mono uppercase">
              Chủ đề: {project.theme}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer
              ${activeTab === 'preview' 
                ? 'bg-[#FFF9F8] dark:bg-[#292222] text-[#E96A87]' 
                : 'text-gray-400 dark:text-[#B5A8A6] hover:text-gray-600'}`}
          >
            <Eye className="w-4 h-4" />
            Xem trước
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer
              ${activeTab === 'edit' 
                ? 'bg-[#FFF9F8] dark:bg-[#292222] text-[#E96A87]' 
                : 'text-gray-400 dark:text-[#B5A8A6] hover:text-gray-600'}`}
          >
            <Edit2 className="w-4 h-4" />
            Biên tập thư
          </button>
        </div>
      </div>

      {/* 🎭 VÙNG HIỂN THỊ CHÍNH */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl w-full mx-auto">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: BIÊN TẬP THƯ */}
          {activeTab === 'edit' && (
            <motion.div
              key="edit-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full"
            >
              <LetterEditor 
                initialContent={project.letterContent || letterContent} 
                onSave={handleSaveLetter} 
              />
            </motion.div>
          )}

          {/* TAB 2: XEM TRƯỚC CINEMATIC */}
          {activeTab === 'preview' && (
            <motion.div
              key="preview-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex flex-col gap-16 py-10 text-center"
            >
              
              {/* PHẦN 1: PHONG BÌ 3D BÓC SÁP */}
              <div className="relative min-h-[450px] flex items-center justify-center">
                <AnimatePresence>
                  {!envelopeOpen ? (
                    /* Phong bì kín */
                    <motion.div
                      key="envelope-closed"
                      exit={{ opacity: 0, scale: 0.9, y: -30 }}
                      className="relative w-full max-w-sm bg-[#FFFDFB] dark:bg-[#1F1A1A] p-8 border border-[#FAF6F0] dark:border-[#292222] rounded-3xl shadow-[0_20px_50px_rgba(61,43,39,0.06)] cursor-pointer flex flex-col items-center justify-center gap-6 group"
                      onClick={() => setEnvelopeOpen(true)}
                    >
                      <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 flex items-center justify-center text-red-500 shadow-sm relative z-10 group-hover:scale-105 transition-all duration-300">
                        <Heart className="w-7 h-7 fill-current animate-pulse" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-display text-2xl font-light">Bức thư tình yêu</span>
                        <span className="text-[10px] text-gray-400 dark:text-[#7A6D6B] font-mono tracking-widest uppercase mt-1">
                          Click để mở con dấu sáp
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    /* Lá thư trượt ra */
                    <motion.div
                      key="envelope-opened"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full max-w-xl bg-[#FFFDFB] dark:bg-[#1F1A1A] p-8 sm:p-12 border border-[#FAF6F0] dark:border-[#292222] rounded-2xl shadow-[0_25px_60px_rgba(61,43,39,0.05)] relative overflow-hidden"
                    >
                      <div className="font-handwriting text-left text-xl sm:text-2xl text-[#2B2B2B] dark:text-[#F0E6E4] leading-relaxed select-text whitespace-pre-line" style={{ fontFamily: "'Caveat', cursive" }}>
                        {project.letterContent || letterContent}
                      </div>
                      <div className="w-full border-t border-[#FAF6F0] dark:border-[#292222] pt-4 mt-8 flex justify-between items-center text-gray-400 dark:text-[#7A6D6B]">
                        <span className="text-[9px] font-sans tracking-widest uppercase">Yours, Forever</span>
                        <button
                          onClick={() => setEnvelopeOpen(false)}
                          className="text-[9px] font-sans tracking-widest uppercase hover:text-[#E96A87]"
                        >
                          Gập lại
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* PHẦN 2: GRID LƯỚI ẢNH POLAROID */}
              {project.images && project.images.length > 0 && (
                <div className="flex flex-col gap-6">
                  <h3 className="font-display text-2xl font-light text-gray-400 dark:text-[#7A6D6B] uppercase tracking-widest">
                    Album Hồi Ức
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {project.images.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, rotate: idx % 2 === 0 ? -2 : 2 }}
                        whileInView={{ opacity: 1, rotate: idx % 2 === 0 ? -1 : 1 }}
                        viewport={{ once: true }}
                        className="bg-[#FFFDFB] dark:bg-[#1F1A1A] p-4 pb-8 border border-[#FAF6F0] dark:border-[#292222] shadow-[0_12px_24px_rgba(61,43,39,0.03)] rounded-lg flex flex-col gap-3 group"
                      >
                        <div className="aspect-square w-full overflow-hidden bg-gray-50 rounded">
                          <img
                            src={img.url}
                            alt={`Photo ${idx}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                            loading="lazy"
                          />
                        </div>
                        {img.caption && (
                          <span className="font-handwriting text-sm text-gray-400 mt-2 block" style={{ fontFamily: "'Caveat', cursive" }}>
                            {img.caption}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* PHẦN 3: ĐÈN BÁO KẾT THÚC CẢM XÚC */}
              <div className="w-full border-t border-[#FAF6F0] dark:border-[#292222] pt-12 mt-12 flex flex-col items-center gap-4">
                <Heart className="w-6 h-6 text-[#E96A87] fill-current animate-bounce" />
                <span className="font-display text-lg italic text-[#E96A87]">
                  Trải nghiệm kỷ niệm hoàn tất
                </span>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
