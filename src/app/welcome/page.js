'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useProjectStore } from '@/features/projects/stores/useProjectStore';
import { motion } from 'framer-motion';
import { Heart, Plus, Folder, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function WelcomePage() {
  const router = useRouter();
  const { getRecentProjects } = useProjectStore();

  const recentProjects = useMemo(() => getRecentProjects(), [getRecentProjects]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-6 bg-[#FFF9F8] dark:bg-[#161313] transition-colors duration-500 min-h-screen select-none">
      
      {/* Container chính căn giữa tối giản */}
      <div className="w-full max-w-xl text-center flex flex-col gap-10">
        
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1F1A1A] border border-[#FAF6F0] dark:border-[#292222] flex items-center justify-center text-[#E96A87] shadow-[0_4px_12px_rgba(61,43,39,0.01)]">
            <Heart className="w-4.5 h-4.5 fill-current animate-pulse" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-[#2B2B2B] dark:text-[#F0E6E4] tracking-wide mt-2">
            Chào bạn trở lại
          </h1>
          <p className="text-sm text-gray-400 dark:text-[#B5A8A6] font-sans">
            Hãy cùng nhau tạo dựng những điều tuyệt vời không thể nào quên.
          </p>
        </motion.div>

        {/* Action CTA chính */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <button
            onClick={() => router.push('/wizard')}
            className="w-full sm:w-auto px-10 py-5 bg-[#E96A87] hover:bg-[#E96A87]/90 active:scale-[0.98] text-white font-medium rounded-2xl shadow-[0_12px_32px_rgba(233,106,135,0.18)] flex items-center justify-center gap-3.5 mx-auto transition-all cursor-pointer text-base"
          >
            <Plus className="w-5 h-5" />
            Tạo kỷ niệm mới
          </button>
        </motion.div>

        {/* Danh sách các dự án gần đây */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col gap-4 text-left"
        >
          <h2 className="text-[10px] tracking-[0.2em] uppercase font-bold text-gray-400 dark:text-[#7A6D6B] px-1">
            Dự án gần đây
          </h2>

          {recentProjects.length === 0 ? (
            /* Empty State Illustration */
            <div className="bg-white/40 dark:bg-[#1F1A1A]/40 backdrop-blur-sm border border-[#FAF6F0] dark:border-[#292222] rounded-2xl p-10 text-center flex flex-col items-center gap-3">
              <Folder className="w-8 h-8 text-gray-300 dark:text-[#7A6D6B]" />
              <p className="text-xs text-gray-400 dark:text-[#B5A8A6]">
                Chưa có dự án nào được tạo. Hãy nhấn nút phía trên để bắt đầu!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => router.push(`/projects/${project.id}/preview`)}
                  className="w-full bg-white/50 dark:bg-[#1F1A1A]/50 hover:bg-[#FFFDFB] dark:hover:bg-[#1F1A1A] border border-[#FAF6F0] dark:border-[#292222] rounded-2xl p-4 flex items-center justify-between transition-all cursor-pointer group hover:shadow-[0_8px_20px_rgba(61,43,39,0.01)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF9F8] dark:bg-[#292222] flex items-center justify-center text-[#E96A87] group-hover:scale-105 transition-all">
                      <Folder className="w-4 h-4 fill-current opacity-70" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#2B2B2B] dark:text-[#F0E6E4] group-hover:text-[#E96A87] transition-all">
                        {project.name}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-[#7A6D6B] flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        Cập nhật: {new Date(project.updatedAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 dark:text-[#7A6D6B] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
