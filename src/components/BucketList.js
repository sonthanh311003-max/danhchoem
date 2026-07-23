'use client';

import React, { useState } from 'react';
import { useMemory } from '@/lib/MemoryContext';
import { Check, Plus, Trash2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BucketList() {
  const { bucketList, toggleBucketItem, addBucketItem, deleteBucketItem } = useMemory();
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addBucketItem(newTask.trim());
    setNewTask('');
  };

  const completedCount = bucketList.filter(i => i.is_completed).length;
  const progressPercent = bucketList.length > 0 ? Math.round((completedCount / bucketList.length) * 100) : 0;

  return (
    <div className="w-full max-w-xl mx-auto select-none">
      
      {/* KHUNG TRANG SỔ TAY KẺ DÒNG (Realistic Notebook style) */}
      <div 
        className="bg-[#FFFDFB] rounded-xl border border-[#FAF6F0] p-6 md:p-8 shadow-md relative"
        style={{
          boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.02)',
          backgroundImage: 'linear-gradient(rgba(233, 106, 135, 0.03) 1px, transparent 1px)',
          backgroundSize: '100% 2.2rem',
          lineHeight: '2.2rem'
        }}
      >
        {/* Lò xo sổ tay ở cạnh trái (Ẩn mờ trang nhã) */}
        <div className="absolute left-3 top-6 bottom-6 flex flex-col justify-between w-1 pointer-events-none opacity-20">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full border-2 border-[#2B2B2B] bg-[#FFFDFB]" style={{ marginLeft: '-8px' }} />
          ))}
        </div>

        <div className="pl-6 text-left">
          {/* Tiêu đề mục */}
          <div className="mb-6 space-y-1">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#E96A87] font-semibold">
              OUR WISHES
            </span>
            <h2 className="font-display text-3xl font-light text-[#2B2B2B] tracking-wide">
              Bucket List
            </h2>
          </div>

          {/* Form Thêm Mục Tiêu Nhanh */}
          <form onSubmit={handleSubmit} className="flex gap-2 mb-6 border-b border-[#FAF6F0] pb-4" style={{ lineHeight: 'normal' }}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Cùng ngắm tuyết rơi, cùng đi Đà Lạt..."
              className="flex-1 px-4 py-2 rounded-xl border border-pink-100/10 text-sm bg-white/70 focus:outline-none focus:ring-1 focus:ring-[#E96A87] text-[#2B2B2B] placeholder-gray-400 font-sans"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#E96A87] hover:bg-[#ff758f] text-white rounded-xl flex items-center justify-center transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>

          {/* Danh sách các mục tiêu viết tay */}
          {bucketList.length === 0 ? (
            <p className="text-center text-gray-400 italic text-sm py-4 font-sans" style={{ lineHeight: 'normal' }}>
              Chưa có mục tiêu chung nào...
            </p>
          ) : (
            <div className="space-y-1">
              <AnimatePresence initial={false}>
                {bucketList.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="flex items-center justify-between py-1 group"
                    style={{ lineHeight: '2.2rem' }}
                  >
                    <button
                      onClick={() => toggleBucketItem(item.id)}
                      className="flex items-center gap-3 text-left flex-1"
                    >
                      {/* Checkbox Trái tim vẽ tay */}
                      <div className="flex-shrink-0 transition-transform active:scale-95 mt-1">
                        {item.is_completed ? (
                          <div className="w-5 h-5 rounded-full bg-[#E96A87] flex items-center justify-center text-white border border-[#E96A87]">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-gray-300 hover:border-[#E96A87] flex items-center justify-center text-transparent">
                            <Heart className="w-2.5 h-2.5 hover:text-[#E96A87]/30" />
                          </div>
                        )}
                      </div>
                      
                      {/* Chữ viết tay (Caveat) */}
                      <span 
                        className={`font-handwriting text-2xl transition-all duration-500 pt-1.5
                          ${item.is_completed 
                            ? 'line-through text-gray-400 opacity-60' 
                            : 'text-[#2B2B2B]/95'
                          }`}
                      >
                        {item.task}
                      </span>
                    </button>

                    {/* Nút xóa mảnh */}
                    <button
                      onClick={() => deleteBucketItem(item.id)}
                      className="text-gray-300 hover:text-red-400 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      title="Xóa"
                      style={{ lineHeight: 'normal' }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Tỉ lệ hoàn thành / Progress bar vẽ tay tối giản */}
          {bucketList.length > 0 && (
            <div className="mt-8 pt-6 border-t border-pink-100/10" style={{ lineHeight: 'normal' }}>
              <div className="flex justify-between text-[10px] tracking-widest uppercase font-semibold text-[#7A7A7A] mb-2 font-sans">
                <span>Completed Wishes</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#E96A87] to-[#ff758f] transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
