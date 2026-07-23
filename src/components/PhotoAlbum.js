'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useMemory } from '@/lib/MemoryContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export default function PhotoAlbum() {
  const { albums } = useMemory();
  const [selectedYear, setSelectedYear] = useState('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  // Lấy danh sách các năm duy nhất từ album
  const years = useMemo(() => {
    const allYears = albums.map(item => item.year);
    const uniqueYears = [...new Set(allYears)].sort((a, b) => b - a);
    return ['all', ...uniqueYears];
  }, [albums]);

  // Lọc album theo năm được chọn
  const filteredAlbums = useMemo(() => {
    if (selectedYear === 'all') return albums;
    return albums.filter(item => item.year === Number(selectedYear));
  }, [albums, selectedYear]);

  // Điều hướng bằng bàn phím
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev + 1) % filteredAlbums.length);
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev - 1 + filteredAlbums.length) % filteredAlbums.length);
      } else if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, filteredAlbums]);

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
    <div className="py-24 px-4 max-w-6xl mx-auto select-none">
      
      {/* Tiêu đề mục phong cách tạp chí */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#E96A87] font-sans font-semibold">
          MEMORIES GALLERY
        </span>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#2B2B2B] tracking-wide">
          Kho Báu Kỷ Niệm
        </h2>
        <div className="w-10 h-[1px] bg-[#E96A87]/40 mx-auto mt-4" />
      </div>

      {/* Bộ lọc năm tối giản (Editorial Tabs) */}
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-16 border-b border-pink-100/10 pb-4 max-w-md mx-auto">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => {
              setSelectedYear(year);
              setActivePhotoIndex(null);
            }}
            className={`text-sm tracking-widest uppercase transition-all duration-300 relative pb-2 font-medium font-sans
              ${selectedYear === year
                ? 'text-[#E96A87] scale-105'
                : 'text-[#7A7A7A] hover:text-[#2B2B2B]'
              }`}
          >
            {year === 'all' ? 'Tất cả' : year}
            {selectedYear === year && (
              <motion.div 
                layoutId="activeTabBorder"
                className="absolute bottom-0 inset-x-0 h-[1px] bg-[#E96A87]"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Bố cục Masonry rộng rãi (Pinterest Style) */}
      {filteredAlbums.length === 0 ? (
        <p className="text-center text-[#7A7A7A] italic font-serif py-12">Không có bức ảnh nào trong năm này...</p>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {filteredAlbums.map((photo, index) => (
            <motion.div
              key={photo.id || index}
              className="break-inside-avoid overflow-hidden rounded-lg cursor-pointer relative group bg-white/5 border border-pink-100/5 shadow-sm"
              onClick={() => openLightbox(index)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={photo.url}
                alt={photo.caption || "Love Memory"}
                className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Overlay tối giản hiện lên khi hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end text-left">
                <p className="text-white text-base font-display font-light leading-snug mb-2 line-clamp-2">
                  {photo.caption}
                </p>
                <span className="text-white/70 text-[10px] tracking-widest uppercase font-sans font-light flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#E96A87]" />
                  {new Date(photo.date).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox Modal Cao Cấp (Nền tối tĩnh lặng, hỗ trợ phím mũi tên & ESC) */}
      <AnimatePresence>
        {currentPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[999] flex flex-col items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Nút đóng mảnh dẻ */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/50 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors z-50"
            >
              <X className="w-8 h-8 font-light" />
            </button>

            {/* Điều hướng Trái */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 md:left-8 text-white/40 hover:text-white p-3 hover:bg-white/5 rounded-full transition-all z-50"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 h-10" />
            </button>

            {/* Khung ảnh chính */}
            <motion.div
              className="max-w-4xl max-h-[75vh] relative flex flex-col items-center justify-center"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption}
                className="max-w-full max-h-[68vh] rounded-lg object-contain border border-white/5 shadow-2xl"
              />
            </motion.div>

            {/* Info Box dưới ảnh */}
            <div 
              className="mt-8 text-center text-white max-w-xl px-4 z-40"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-display text-xl md:text-2xl font-light leading-relaxed tracking-wide text-zinc-100">
                {currentPhoto.caption}
              </p>
              <div className="flex items-center justify-center gap-3 mt-3 text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-sans font-light">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#E96A87]" />
                  {new Date(currentPhoto.date).toLocaleDateString('vi-VN')}
                </span>
                <span>•</span>
                <span>Year {currentPhoto.year}</span>
              </div>
            </div>

            {/* Điều hướng Phải */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 md:right-8 text-white/40 hover:text-white p-3 hover:bg-white/5 rounded-full transition-all z-50"
            >
              <ChevronRight className="w-8 h-8 md:w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
