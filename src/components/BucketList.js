'use client';

import React, { useState } from 'react';
import { useMemory } from '@/lib/MemoryContext';
import { Check, Square, CheckSquare, Plus, Trash2 } from 'lucide-react';
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

  return (
    <div className="py-12 px-4 max-w-xl mx-auto">
      <div className="glass-card rounded-3xl p-6 md:p-8 border shadow-sm">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 font-display text-[var(--color-primary)]">
          Danh Sách Mục Tiêu (Bucket List)
        </h2>

        {/* Form Thêm Mục Tiêu Nhanh */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Cùng đi Nhật Bản, cùng nuôi mèo..."
            className="flex-1 px-4 py-2 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white/50 text-[var(--color-text)] placeholder-gray-400 text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-xl flex items-center justify-center transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

        {/* Danh sách */}
        {bucketList.length === 0 ? (
          <p className="text-center text-[var(--color-text-muted)] italic text-sm py-4">Chưa có mục tiêu chung nào...</p>
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {bucketList.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300
                    ${item.is_completed 
                      ? 'bg-green-50/40 border-green-200/50 opacity-70' 
                      : 'bg-white/80 border-[var(--color-border)]'
                    }`}
                >
                  <button
                    onClick={() => toggleBucketItem(item.id)}
                    className="flex items-center gap-3 text-left flex-1"
                  >
                    <div className="flex-shrink-0 transition-transform active:scale-95">
                      {item.is_completed ? (
                        <div className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center text-white border border-green-500">
                          <Check className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-lg border-2 border-gray-300 hover:border-[var(--color-primary)] flex items-center justify-center text-transparent">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    
                    <span 
                      className={`text-sm md:text-base font-medium transition-all duration-300
                        ${item.is_completed 
                          ? 'line-through text-gray-400' 
                          : 'text-[var(--color-text)]'
                        }`}
                    >
                      {item.task}
                    </span>
                  </button>

                  <button
                    onClick={() => deleteBucketItem(item.id)}
                    className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    title="Xóa mục tiêu"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Tỉ lệ hoàn thành */}
        {bucketList.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
            <div className="flex justify-between text-xs font-semibold text-[var(--color-text-muted)] mb-2">
              <span>Tiến trình hoàn thành</span>
              <span>
                {Math.round((bucketList.filter(i => i.is_completed).length / bucketList.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-500"
                style={{ 
                  width: `${(bucketList.filter(i => i.is_completed).length / bucketList.length) * 100}%` 
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
