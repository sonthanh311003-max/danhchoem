'use client';

import React from 'react';
import { useMemory } from '@/lib/MemoryContext';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Heart, Coffee, Cake, Plane, Star } from 'lucide-react';

export default function Timeline() {
  const { timelines } = useMemory();

  // Helper để lấy icon thích hợp theo tiêu đề mốc kỷ niệm
  const getTimelineIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('gặp') || t.includes('cafe') || t.includes('coffee')) return <Coffee className="w-5 h-5" />;
    if (t.includes('sinh nhật') || t.includes('tuổi') || t.includes('cake')) return <Cake className="w-5 h-5" />;
    if (t.includes('du lịch') || t.includes('đà lạt') || t.includes('chuyến đi') || t.includes('bay')) return <Plane className="w-5 h-5" />;
    if (t.includes('yêu') || t.includes('hẹn hò')) return <Heart className="w-5 h-5" />;
    return <Star className="w-5 h-5" />;
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15
      }
    }
  };

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-display text-[var(--color-primary)]">
        Hành Trình Kỷ Niệm
      </h2>

      {timelines.length === 0 ? (
        <p className="text-center text-[var(--color-text-muted)] italic">Chưa có mốc thời gian nào được lưu giữ...</p>
      ) : (
        <motion.div 
          className="relative border-l-2 border-[var(--color-border)] ml-4 md:ml-32 py-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {timelines.map((item, index) => (
            <motion.div 
              key={item.id || index} 
              className="mb-12 relative pl-8 md:pl-12"
              variants={itemVariants}
            >
              {/* Icon Point */}
              <div 
                className="absolute -left-[21px] top-1 w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-md text-white transition-transform hover:scale-110"
                style={{ 
                  backgroundColor: 'var(--color-primary)',
                  borderColor: 'var(--color-border)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}
              >
                {getTimelineIcon(item.title)}
              </div>

              {/* Date Box on Left Side (Hidden on Mobile) */}
              <div className="hidden md:block absolute -left-32 top-2 w-24 text-right pr-4">
                <span className="text-sm font-semibold text-[var(--color-text-muted)]">
                  {new Date(item.date).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </span>
              </div>

              {/* Event Content Card */}
              <div className="glass-card rounded-2xl p-6 border shadow-sm transition-all duration-300 hover:shadow-md hover:border-[var(--color-primary)]">
                {/* Date display on mobile */}
                <div className="md:hidden flex items-center gap-1 text-xs font-semibold text-[var(--color-text-muted)] mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {new Date(item.date).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-[var(--color-text)] mb-2">
                  {item.title}
                </h3>

                {item.location && (
                  <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] mb-4">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span>{item.location}</span>
                  </div>
                )}

                {item.mediaUrl && (
                  <div className="mb-4 overflow-hidden rounded-xl border border-gray-100 max-h-[350px]">
                    {item.mediaType === 'video' ? (
                      <video 
                        src={item.mediaUrl} 
                        controls 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <img 
                        src={item.mediaUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                    )}
                  </div>
                )}

                <p className="text-[var(--color-text)] leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {item.description}
                </p>
              </div>

              {/* Arrow connector decoration between items */}
              {index < timelines.length - 1 && (
                <div className="absolute left-[3px] bottom-[-24px] text-[var(--color-border)] opacity-50 select-none hidden md:block">
                  ↓
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
