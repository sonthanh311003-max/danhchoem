'use client';

import React from 'react';
import { useMemory } from '@/lib/MemoryContext';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';

export default function Timeline() {
  const { timelines } = useMemory();

  // Biến thể hoạt ảnh cho chuyển cảnh mượt mà
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.35
      }
    }
  };

  const chapterVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 45,
        damping: 15,
        mass: 1
      }
    }
  };

  return (
    <div className="py-24 px-4 max-w-6xl mx-auto select-none">
      
      {/* Tiêu đề mục phong cách tạp chí */}
      <div className="text-center mb-24 space-y-4">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#E96A87] font-sans font-semibold">
          OUR LOVE STORY
        </span>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#2B2B2B] tracking-wide">
          Hành Trình Kỷ Niệm
        </h2>
        <div className="w-10 h-[1px] bg-[#E96A87]/40 mx-auto mt-4" />
      </div>

      {timelines.length === 0 ? (
        <p className="text-center text-[#7A7A7A] italic font-serif">Chưa có chương kỷ niệm nào được lưu giữ...</p>
      ) : (
        <motion.div 
          className="space-y-36"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {timelines.map((item, index) => {
            const isEven = index % 2 === 0;
            const chapterNumber = String(index + 1).padStart(2, '0');

            return (
              <motion.div 
                key={item.id || index}
                variants={chapterVariants}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
              >
                
                {/* 📸 PHẦN ẢNH KỶ NIỆM (Chiếm 1/2 chiều rộng) */}
                <div className="w-full lg:w-1/2 relative group">
                  {/* Số chương mờ nhạt cực lớn lơ lửng phía trên ảnh */}
                  <span className="absolute -top-12 -left-4 font-display text-7xl md:text-8xl lg:text-9xl text-[#E96A87]/10 font-bold tracking-tight select-none">
                    CH {chapterNumber}
                  </span>
                  
                  <div className="overflow-hidden rounded-lg bg-white/5 border border-pink-100/5 shadow-md aspect-[4/3] w-full">
                    {item.mediaUrl ? (
                      item.mediaType === 'video' ? (
                        <video 
                          src={item.mediaUrl} 
                          controls 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <img 
                          src={item.mediaUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
                        />
                      )
                    ) : (
                      <div className="w-full h-full bg-[#fdfaf8] flex items-center justify-center text-gray-300 italic text-sm">
                        Chưa tải ảnh kỷ niệm...
                      </div>
                    )}
                  </div>
                </div>

                {/* 📝 PHẦN CHỮ KỂ CHUYỆN (Chiếm 1/2 chiều rộng) */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center text-left space-y-5">
                  
                  {/* Mốc thời gian & Địa điểm mỏng mảnh */}
                  <div className="flex flex-wrap items-center gap-3 text-xs tracking-widest uppercase text-[#7A7A7A] font-sans font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#E96A87]" />
                      {new Date(item.date).toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </span>
                    {item.location && (
                      <>
                        <span className="text-[#E96A87]/30">•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#E96A87]" />
                          {item.location}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Tiêu đề chương Serif */}
                  <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-[#2B2B2B] tracking-wide leading-tight">
                    {item.title}
                  </h3>

                  {/* Vạch chia mỏng */}
                  <div className="w-8 h-[1px] bg-[#E96A87]/40" />

                  {/* Nội dung kể chuyện phong cách tạp chí */}
                  <p className="text-sm md:text-base leading-relaxed text-[#2B2B2B]/90 font-light whitespace-pre-line tracking-wide">
                    {item.description}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
