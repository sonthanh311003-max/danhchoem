'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, BookOpen, Film, Calendar, Archive, Sparkles, Heart } from 'lucide-react';

const OBJECTS_DATA = [
  {
    id: 'letter',
    name: 'Love Letter',
    icon: FileText,
    tagline: 'Lá thư viết tay ngọt ngào',
    description: 'Bóc niêm phong sáp vàng nứt đôi, trải nghiệm kéo thư 3D cinematic đầy chiều sâu cảm xúc.',
    color: '#E96A87'
  },
  {
    id: 'book',
    name: 'Memory Book',
    icon: BookOpen,
    tagline: 'Quyển sách nhật ký kỷ niệm',
    description: 'Realistic page turning lật mở từng trang đôi nhám mịn, gáy sách đổ bóng chiều sâu 3D.',
    color: '#D9B36A'
  },
  {
    id: 'film',
    name: 'Film Roll',
    icon: Film,
    tagline: 'Cuộn phim ký ức âm bản',
    description: 'Khám phá album ảnh dưới dạng dải phim kéo trượt dọc hoài cổ, nhịp điệu ảnh đan xen độc đáo.',
    color: '#6B1D2F'
  },
  {
    id: 'timeline',
    name: 'Milestone Journey',
    icon: Calendar,
    tagline: 'Dòng thời gian trưởng thành',
    description: 'Blur Reveal hiển thị mờ sương nhẹ nhàng các chương kỉ niệm khi cuộn trang, không dính sát viền.',
    color: '#4E8A64'
  },
  {
    id: 'box',
    name: 'Memory Box',
    icon: Archive,
    tagline: 'Chiếc hộp lưu giữ báu vật',
    description: 'Mở nắp hộp gỗ cổ kính để khám phá các vật phẩm xếp chồng độc lập: vé xe, polaroid, hoa khô.',
    color: '#C87A53'
  }
];

export default function PreviewSection() {
  const [activeTab, setActiveTab] = useState('letter');

  return (
    <section className="py-24 px-6 md:px-12 bg-[#FFFDFB] border-t border-[#FAF6F0] select-none text-left">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* 📚 BÊN TRÁI: DANH SÁCH MENU TAB TỐI GIẢN */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="typography-caption text-[#E96A87]">Memory Objects</span>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-[#2B2B2B] leading-tight">
              Kỷ vật số định nghĩa<br />
              <span className="italic font-normal">trải nghiệm cảm xúc.</span>
            </h2>
            <p className="text-xs text-gray-500 font-sans leading-relaxed max-w-sm">
              Chúng tôi loại bỏ các cấu trúc thẻ (cards) web SaaS khô cứng. Mỗi kỉ niệm được tái hiện bằng một vật thể tương tác chân thực.
            </p>
          </div>

          <nav className="flex flex-col space-y-2">
            {OBJECTS_DATA.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-500 text-left border
                    ${isActive 
                      ? 'bg-[#FFF9F8] border-pink-100/10 shadow-sm' 
                      : 'bg-transparent border-transparent hover:bg-[#FFF9F8]/40'}`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                      style={{ backgroundColor: isActive ? `${item.color}15` : '#FAF6F0' }}
                    >
                      <Icon className="w-4.5 h-4.5" style={{ color: isActive ? item.color : '#7A7A7A' }} />
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold font-sans tracking-wide transition-colors ${isActive ? 'text-[#2B2B2B]' : 'text-gray-400'}`}>
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-sans mt-0.5 leading-none">{item.tagline}</p>
                    </div>
                  </div>
                  {isActive && (
                    <motion.div layoutId="active-arrow" className="text-[#E96A87]">
                      <Heart className="w-3.5 h-3.5 fill-[#E96A87]" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 🎨 BÊN PHẢI: KHUNG TRÌNH DIỄN HOẠT ẢNH VISUAL SHOWCASE */}
        <div className="lg:col-span-7 flex justify-center items-center h-[340px] sm:h-[450px] bg-[#FFF9F8] rounded-2xl border border-[#FAF6F0] p-6 relative overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(#FAF6F0_1px,transparent_0)] bg-[size:16px_16px] opacity-30" />
          
          <AnimatePresence mode="wait">
            {activeTab === 'letter' && (
              <motion.div
                key="letter"
                className="relative w-64 h-40 bg-[#FFFDFB] rounded-xl border border-pink-100/10 shadow-lg p-4 flex flex-col justify-between items-center z-10"
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Visual Letter Object */}
                <div className="w-full flex justify-between items-center border-b border-[#FAF6F0] pb-2">
                  <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">Love Letter</span>
                  <div className="w-1.5 h-1.5 bg-[#E96A87] rounded-full" />
                </div>
                <div className="text-center font-display text-[#2B2B2B] text-sm italic py-4">
                  "Dear My Love..."
                </div>
                <div className="w-full h-1 bg-[#FAF6F0] rounded-full" />
                <div className="w-2/3 h-1 bg-[#FAF6F0] rounded-full" />
              </motion.div>
            )}

            {activeTab === 'book' && (
              <motion.div
                key="book"
                className="relative w-72 h-44 bg-[#FFFDFB] rounded-xl border border-[#FAF6F0] shadow-lg flex z-10"
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Visual Book Object - Left page */}
                <div className="w-1/2 border-r border-[#FAF6F0] p-4 flex flex-col justify-between">
                  <div className="w-8 h-8 rounded bg-[#FFF9F8] border border-pink-100/10 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-[#D9B36A]" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-full h-1 bg-[#FAF6F0] rounded" />
                    <div className="w-full h-1 bg-[#FAF6F0] rounded" />
                  </div>
                </div>
                {/* Visual Book Object - Right page */}
                <div className="w-1/2 p-4 flex flex-col justify-between bg-[#FFFDFB] rounded-r-xl">
                  <div className="w-full h-16 bg-[#FFF9F8] rounded border border-pink-100/10" />
                  <div className="w-2/3 h-1 bg-[#FAF6F0] rounded" />
                </div>
                {/* Gáy sách đổ bóng */}
                <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-gradient-to-r from-black/5 via-transparent to-black/5 -translate-x-1/2 pointer-events-none" />
              </motion.div>
            )}

            {activeTab === 'film' && (
              <motion.div
                key="film"
                className="relative flex flex-col gap-2 z-10"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Film frame 1 */}
                <div className="w-52 h-20 bg-[#2B2B2B] rounded-lg p-2 flex gap-2 border-y border-dashed border-[#FAF6F0]/20">
                  <div className="w-16 h-full bg-[#FFFDFB] rounded-sm flex-shrink-0" />
                  <div className="flex flex-col justify-between py-1">
                    <div className="w-20 h-1 bg-[#FFF9F8]/20 rounded" />
                    <div className="w-10 h-1.5 bg-[#E96A87] rounded" />
                  </div>
                </div>
                {/* Film frame 2 */}
                <div className="w-52 h-20 bg-[#2B2B2B] rounded-lg p-2 flex gap-2 border-y border-dashed border-[#FAF6F0]/20 opacity-80 scale-95">
                  <div className="w-16 h-full bg-[#FFFDFB] rounded-sm flex-shrink-0" />
                  <div className="flex flex-col justify-between py-1">
                    <div className="w-20 h-1 bg-[#FFF9F8]/20 rounded" />
                    <div className="w-12 h-1.5 bg-[#D9B36A] rounded" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'timeline' && (
              <motion.div
                key="timeline"
                className="relative flex flex-col gap-3 z-10 w-64 select-none"
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-pink-100/10 shadow-sm text-left">
                  <div className="w-8 h-8 rounded-full bg-[#FFF9F8] flex items-center justify-center text-xs font-bold text-[#E96A87] border border-pink-100/10">1</div>
                  <div>
                    <h5 className="text-[11px] font-bold text-[#2B2B2B]">Lần đầu gặp gỡ</h5>
                    <p className="text-[9px] text-gray-400">20.08.2023 | Highlands Coffee</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-pink-100/10 shadow-sm text-left opacity-75 scale-95">
                  <div className="w-8 h-8 rounded-full bg-[#FFF9F8] flex items-center justify-center text-xs font-bold text-[#D9B36A] border border-pink-100/10">2</div>
                  <div>
                    <h5 className="text-[11px] font-bold text-[#2B2B2B]">Sinh nhật đầu tiên bên nhau</h5>
                    <p className="text-[9px] text-gray-400">15.11.2023 | Sweet Home</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'box' && (
              <motion.div
                key="box"
                className="relative w-52 h-52 bg-[#C87A53]/15 border-2 border-dashed border-[#C87A53]/30 rounded-2xl flex items-center justify-center z-10"
                initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.85, rotate: 5 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Layered Polaroid photos inside box */}
                <div className="absolute w-28 h-32 bg-white rounded border border-gray-100 shadow-md p-1.5 rotate-[-8deg] -translate-x-4">
                  <div className="w-full h-20 bg-gray-50 rounded-sm" />
                  <div className="w-12 h-1 bg-gray-200 rounded mt-2.5 mx-auto" />
                </div>
                <div className="absolute w-28 h-32 bg-white rounded border border-gray-100 shadow-lg p-1.5 rotate-[6deg] translate-x-4">
                  <div className="w-full h-20 bg-gray-50 rounded-sm" />
                  <div className="w-16 h-1 bg-[#E96A87]/30 rounded mt-2.5 mx-auto" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
