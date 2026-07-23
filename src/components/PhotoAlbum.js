'use client';

import React, { useState, useMemo } from 'react';
import { useMemory } from '@/lib/MemoryContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Info } from 'lucide-react';

export default function PhotoAlbum() {
  const { albums } = useMemory();
  const [selectedYear, setSelectedYear] = useState('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  // Lấy danh sách các năm duy nhất từ album
  const years = useMemo(() => {
    const allYears = albums.map(item => item.year);
    const uniqueYears = [...new Set(allYears)].sort((a, b) => b - a); // Năm mới nhất trước
    return ['all', ...uniqueYears];
  }, [albums]);

  // Lọc album theo năm được chọn
  const filteredAlbums = useMemo(() => {
    if (selectedYear === 'all') return albums;
    return albums.filter(item => item.year === Number(selectedYear));
  }, [albums, selectedYear]);

  // Các hàm điều khiển Lightbox
  const openLightbox = (index) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredAlbums.length);
    }
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + filteredAlbums.length) % filteredAlbums.length);
    }
  };

  const currentPhoto = activePhotoIndex !== null ? filteredAlbums[activePhotoIndex] : null;

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 font-display text-[var(--color-primary)]">
        Album Kỷ Niệm
      </h2>

      {/* Bộ lọc năm */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => {
              setSelectedYear(year);
              setActivePhotoIndex(null);
            }}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border
              ${selectedYear === year
                ? 'bg-[var(--color-primary)] text-white border-transparent shadow-md scale-105'
                : 'bg-white text-[var(--color-text)] border-[var(--color-border)] hover:bg-gray-50'
              }`}
          >
            {year === 'all' ? 'Tất cả' : `Năm ${year}`}
          </button>
        ))}
      </div>

      {/* Masonry Layout */}
      {filteredAlbums.length === 0 ? (
        <p className="text-center text-[var(--color-text-muted)] italic">Không có bức ảnh nào trong năm này...</p>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {filteredAlbums.map((photo, index) => (
            <motion.div
              key={photo.id || index}
              className="break-inside-avoid glass-card rounded-2xl overflow-hidden border cursor-pointer relative group shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => openLightbox(index)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={photo.url}
                alt={photo.caption || "Love Memory"}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Overlay Caption khi hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <p className="text-white text-sm font-semibold mb-1 font-display line-clamp-2">
                  {photo.caption}
                </p>
                <span className="text-white/80 text-xs flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(photo.date).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox Modal (Phóng to ảnh) */}
      <AnimatePresence>
        {currentPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[999] flex flex-col items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Nút đóng */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Điều hướng Trái */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 md:left-6 text-white/50 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all"
            >
              <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" />
            </button>

            {/* Khung ảnh chính */}
            <motion.div
              className="max-w-4xl max-h-[75vh] relative flex flex-col items-center justify-center"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Tránh đóng lightbox khi click vào ảnh
            >
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption}
                className="max-w-full max-h-[70vh] rounded-xl object-contain border border-white/10 shadow-2xl"
              />
            </motion.div>

            {/* Info Box dưới ảnh */}
            <div 
              className="mt-6 text-center text-white max-w-xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-lg md:text-xl font-medium font-display leading-snug">
                {currentPhoto.caption}
              </p>
              <div className="flex items-center justify-center gap-4 mt-2 text-sm text-white/60">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(currentPhoto.date).toLocaleDateString('vi-VN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                <span>•</span>
                <span>Năm {currentPhoto.year}</span>
              </div>
            </div>

            {/* Điều hướng Phải */}
            <button
              onClick={nextPhoto}
              className="absolute right-2 md:right-6 text-white/50 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all"
            >
              <ChevronRight className="w-10 h-10 md:w-12 md:h-12" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
