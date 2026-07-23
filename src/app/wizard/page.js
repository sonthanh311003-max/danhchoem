'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWizardStore } from '@/features/wizard/stores/useWizardStore';
import { useProjectStore } from '@/features/projects/stores/useProjectStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Upload, Music, Check, Trash2, Heart } from 'lucide-react';

export default function WizardPage() {
  const router = useRouter();
  const { 
    currentStep, 
    answers, 
    setAnswer, 
    nextStep, 
    prevStep, 
    loadSavedProgress,
    isSaving 
  } = useWizardStore();

  const { createProject } = useProjectStore();
  const [photoInput, setPhotoInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Khôi phục nháp cũ nếu có
  useEffect(() => {
    loadSavedProgress();
  }, [loadSavedProgress]);

  // Điều khiển phím bấm tiện ích
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && currentStep < 8 && currentStep !== 3 && currentStep !== 5) {
      nextStep();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Xử lý nạp ảnh nhanh giả lập
  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!photoInput) return;
    setAnswer('photos', [...answers.photos, photoInput]);
    setPhotoInput('');
  };

  const handleRemovePhoto = (index) => {
    const updated = answers.photos.filter((_, i) => i !== index);
    setAnswer('photos', updated);
  };

  // Hoàn tất dựng bản nháp ở bước 8
  useEffect(() => {
    if (currentStep === 8) {
      setIsGenerating(true);
      const timer = setTimeout(async () => {
        try {
          const projectId = await createProject({
            name: answers.projectName || 'Hành trình kỷ niệm',
            recipient: answers.recipient,
            celebration: answers.celebration,
            theme: answers.theme,
            music: answers.musicOption === 'Choose Later' ? null : answers.musicOption,
            images: answers.photos.map(url => ({ url, caption: '' })),
          });
          // Xóa lưu nháp
          localStorage.removeItem('dmc_wizard_draft');
          localStorage.removeItem('dmc_wizard_step');
          
          router.push(`/projects/${projectId}/preview`);
        } catch (err) {
          console.error(err);
        }
      }, 3500); // 3.5 giây chạy hoạt ảnh điện ảnh mượt mà
      return () => clearTimeout(timer);
    }
  }, [currentStep, answers, createProject, router]);

  // Hoạt ảnh trượt phân cảnh
  const slideVariants = {
    initial: { opacity: 0, x: 25 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -25 }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#FFF9F8] dark:bg-[#161313] min-h-screen text-[#2B2B2B] dark:text-[#F0E6E4] select-none">
      
      {/* 📊 THANH TIẾN TRÌNH TRÊN ĐẦU */}
      <div className="w-full max-w-xl mx-auto flex items-center justify-between py-2 border-b border-[#FAF6F0] dark:border-[#292222]">
        <div className="flex items-center gap-2">
          {currentStep > 1 && currentStep < 8 && (
            <button
              onClick={prevStep}
              className="p-2 text-gray-400 hover:text-[#E96A87] rounded-xl hover:bg-white dark:hover:bg-[#1F1A1A] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] font-sans tracking-widest text-gray-400 uppercase font-bold">
            Thiết lập kỷ niệm
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-gray-300 dark:text-[#7A6D6B] font-mono">
            {isSaving ? 'Đang lưu nháp...' : 'Đã lưu nháp'}
          </span>
          <span className="text-xs font-mono font-bold text-[#E96A87]">
            {currentStep}/8
          </span>
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto h-2 bg-[#FAF6F0] dark:bg-[#292222] rounded-full overflow-hidden mt-2">
        <div 
          className="h-full bg-[#E96A87] transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / 8) * 100}%` }}
        />
      </div>

      {/* 🎭 VÙNG CÂU HỎI TRUNG TÂM */}
      <div className="flex-1 flex items-center justify-center my-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full max-w-md text-center flex flex-col gap-6"
          >
            {/* ── STEP 1: Đối tượng kỷ niệm ── */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-5">
                <h2 className="font-display text-3xl font-medium tracking-wide">
                  Hồi ức này bạn muốn dành tặng cho ai?
                </h2>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {['My Partner', 'Family', 'Friend', 'Myself'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setAnswer('recipient', option);
                        nextStep();
                      }}
                      className={`p-5 rounded-2xl border text-sm font-medium transition-all cursor-pointer text-center
                        ${answers.recipient === option 
                          ? 'border-[#E96A87] bg-[#FFF9F8] dark:bg-[#292222] text-[#E96A87]' 
                          : 'border-[#FAF6F0] dark:border-[#292222] bg-white dark:bg-[#1F1A1A] hover:border-gray-200'}`}
                    >
                      {option === 'My Partner' && 'Người ấy ❤️'}
                      {option === 'Family' && 'Gia đình 🏠'}
                      {option === 'Friend' && 'Bạn thân 🌟'}
                      {option === 'Myself' && 'Chính mình 🕯️'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 2: Dịp tổ chức ── */}
            {currentStep === 2 && (
              <div className="flex flex-col gap-4">
                <h2 className="font-display text-3xl font-medium tracking-wide">
                  Sự kiện đặc biệt gì đang diễn ra?
                </h2>
                <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                  {['Birthday', 'Anniversary', 'Proposal', 'Wedding', 'Trip', 'Graduation', 'Other'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setAnswer('celebration', option);
                        nextStep();
                      }}
                      className={`p-4 rounded-xl border text-xs font-medium transition-all cursor-pointer text-center
                        ${answers.celebration === option 
                          ? 'border-[#E96A87] bg-[#FFF9F8] dark:bg-[#292222] text-[#E96A87]' 
                          : 'border-[#FAF6F0] dark:border-[#292222] bg-white dark:bg-[#1F1A1A] hover:border-gray-200'}`}
                    >
                      {option === 'Birthday' && 'Sinh nhật 🎂'}
                      {option === 'Anniversary' && 'Kỷ niệm ngày yêu 🥂'}
                      {option === 'Proposal' && 'Lời cầu hôn 💍'}
                      {option === 'Wedding' && 'Ngày cưới 👰'}
                      {option === 'Trip' && 'Chuyến đi xa ✈️'}
                      {option === 'Graduation' && 'Ngày tốt nghiệp 🎓'}
                      {option === 'Other' && 'Dịp khác ✨'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 3: Tên dự án ── */}
            {currentStep === 3 && (
              <div className="flex flex-col gap-5 text-left">
                <h2 className="font-display text-3xl font-medium text-center tracking-wide mb-2">
                  Đặt tên cho dự án kỷ niệm
                </h2>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-widest uppercase font-bold text-gray-400 dark:text-[#7A6D6B] px-1">
                    Tên dự án
                  </label>
                  <input
                    type="text"
                    value={answers.projectName}
                    onChange={(e) => setAnswer('projectName', e.target.value)}
                    placeholder="Ví dụ: Ngày hạnh phúc nhất, Kỷ niệm 5 năm..."
                    className="w-full bg-white dark:bg-[#1F1A1A] border border-[#FAF6F0] dark:border-[#292222] rounded-xl px-4 py-3.5 text-sm text-[#2B2B2B] dark:text-[#F0E6E4] outline-none focus:border-[#E96A87]"
                  />
                </div>
                {answers.projectName.trim() && (
                  <button
                    onClick={nextStep}
                    className="w-full bg-[#E96A87] text-white font-medium text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    Tiếp tục
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* ── STEP 4: Lựa chọn Theme màu ── */}
            {currentStep === 4 && (
              <div className="flex flex-col gap-5">
                <h2 className="font-display text-3xl font-medium tracking-wide">
                  Chọn phong cách màu sắc (Theme)
                </h2>
                <div className="flex flex-col gap-2.5">
                  {['Classic', 'Luxury', 'Vintage', 'Minimal', 'Autumn'].map((themeName) => (
                    <button
                      key={themeName}
                      onClick={() => {
                        setAnswer('theme', themeName);
                        nextStep();
                      }}
                      className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer
                        ${answers.theme === themeName 
                          ? 'border-[#E96A87] bg-[#FFF9F8] dark:bg-[#292222] text-[#E96A87]' 
                          : 'border-[#FAF6F0] dark:border-[#292222] bg-white dark:bg-[#1F1A1A] hover:border-gray-200'}`}
                    >
                      <span className="text-xs font-semibold">{themeName}</span>
                      <div className="flex gap-1">
                        {themeName === 'Classic' && (
                          <>
                            <div className="w-3.5 h-3.5 rounded-full bg-[#FFF9F8] border border-gray-200" />
                            <div className="w-3.5 h-3.5 rounded-full bg-[#E96A87]" />
                          </>
                        )}
                        {themeName === 'Luxury' && (
                          <>
                            <div className="w-3.5 h-3.5 rounded-full bg-[#161313]" />
                            <div className="w-3.5 h-3.5 rounded-full bg-[#D9B36A]" />
                          </>
                        )}
                        {themeName === 'Vintage' && (
                          <>
                            <div className="w-3.5 h-3.5 rounded-full bg-[#FCFAF7] border border-gray-200" />
                            <div className="w-3.5 h-3.5 rounded-full bg-[#6B1D2F]" />
                          </>
                        )}
                        {themeName === 'Minimal' && (
                          <>
                            <div className="w-3.5 h-3.5 rounded-full bg-white border border-gray-200" />
                            <div className="w-3.5 h-3.5 rounded-full bg-[#2B2B2B]" />
                          </>
                        )}
                        {themeName === 'Autumn' && (
                          <>
                            <div className="w-3.5 h-3.5 rounded-full bg-[#FFF9F8] border border-gray-200" />
                            <div className="w-3.5 h-3.5 rounded-full bg-[#C87A53]" />
                          </>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 5: Tải hình ảnh lên ── */}
            {currentStep === 5 && (
              <div className="flex flex-col gap-4 text-left">
                <h2 className="font-display text-3xl font-medium text-center tracking-wide mb-2">
                  Tải lên những tấm hình chung
                </h2>
                
                {/* Form giả lập URL ảnh cho demo */}
                <form onSubmit={handleAddPhoto} className="flex gap-2">
                  <input
                    type="url"
                    value={photoInput}
                    onChange={(e) => setPhotoInput(e.target.value)}
                    placeholder="Dán link ảnh tại đây (Ví dụ: https://...)"
                    className="flex-1 bg-white dark:bg-[#1F1A1A] border border-[#FAF6F0] dark:border-[#292222] rounded-xl px-4 py-3 text-xs text-[#2B2B2B] dark:text-[#F0E6E4] outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#E96A87] text-white p-3 rounded-xl hover:bg-[#E96A87]/90 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                </form>

                {/* Polaroid Preview Grid */}
                <div className="grid grid-cols-3 gap-3 my-2 max-h-[220px] overflow-y-auto pr-1">
                  {answers.photos.map((url, index) => (
                    <div
                      key={index}
                      className="relative bg-white dark:bg-[#1F1A1A] p-2 border border-[#FAF6F0] dark:border-[#292222] shadow-sm rounded-lg flex flex-col group aspect-square overflow-hidden"
                    >
                      <img
                        src={url}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                        className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={nextStep}
                    className="flex-1 border border-[#FAF6F0] dark:border-[#292222] text-[#2B2B2B] dark:text-[#F0E6E4] font-medium text-xs py-3.5 rounded-xl text-center hover:bg-white dark:hover:bg-[#1F1A1A] cursor-pointer"
                  >
                    Bỏ qua
                  </button>
                  {answers.photos.length > 0 && (
                    <button
                      onClick={nextStep}
                      className="flex-1 bg-[#E96A87] text-white font-medium text-xs py-3.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Tiếp tục
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ── STEP 6: Thêm nhạc nền ── */}
            {currentStep === 6 && (
              <div className="flex flex-col gap-5">
                <h2 className="font-display text-3xl font-medium tracking-wide">
                  Có muốn chèn nhạc nền lãng mạn?
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Chọn nhạc sau 🎵', val: 'Choose Later' },
                    { label: 'Không chèn nhạc 🔇', val: 'Skip' },
                    { label: 'Mặc định (Love Theme) 🎻', val: 'Love Theme' }
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => {
                        setAnswer('musicOption', item.val);
                        nextStep();
                      }}
                      className={`w-full p-5 rounded-2xl border text-sm font-medium transition-all cursor-pointer text-left flex items-center justify-between
                        ${answers.musicOption === item.val 
                          ? 'border-[#E96A87] bg-[#FFF9F8] dark:bg-[#292222] text-[#E96A87]' 
                          : 'border-[#FAF6F0] dark:border-[#292222] bg-white dark:bg-[#1F1A1A] hover:border-gray-200'}`}
                    >
                      <span>{item.label}</span>
                      <Music className="w-4 h-4 opacity-40" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 7: AI hỗ trợ viết thư ── */}
            {currentStep === 7 && (
              <div className="flex flex-col gap-5">
                <h2 className="font-display text-3xl font-medium tracking-wide">
                  Bạn có muốn AI hỗ trợ viết thư tình cảm?
                </h2>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => {
                      setAnswer('aiLetter', false);
                      nextStep();
                    }}
                    className="flex-1 p-5 rounded-2xl border border-[#FAF6F0] dark:border-[#292222] bg-white dark:bg-[#1F1A1A] hover:border-gray-200 text-sm font-medium transition-all cursor-pointer text-center"
                  >
                    Tự viết từ đầu ✍️
                  </button>
                  <button
                    onClick={() => {
                      setAnswer('aiLetter', true);
                      nextStep();
                    }}
                    className="flex-1 p-5 rounded-2xl border border-[#E96A87] bg-[#FFF9F8] dark:bg-[#292222] text-[#E96A87] hover:border-[#E96A87]/80 text-sm font-semibold transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
                  >
                    Có, trợ giúp AI 🪄
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 8: Tạo lập Cinematic ── */}
            {currentStep === 8 && (
              <div className="flex flex-col items-center gap-6 py-6">
                <div className="relative w-16 h-16 rounded-full bg-white dark:bg-[#1F1A1A] border border-[#FAF6F0] dark:border-[#292222] flex items-center justify-center text-[#E96A87] shadow-sm">
                  <Sparkles className="w-7 h-7 animate-spin duration-3000" />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-display text-3xl font-light tracking-wide animate-pulse">
                    Đang thiết lập trải nghiệm...
                  </h2>
                  <p className="text-xs text-gray-400 dark:text-[#B5A8A6] font-sans">
                    Hệ thống đang thổi cảm xúc vào các kỉ vật của bạn.
                  </p>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* FOOTER ĐỊNH VỊ TĨNH */}
      <div className="w-full text-center text-[10px] text-gray-300 dark:text-[#7A6D6B] tracking-widest uppercase font-bold py-2">
        MemoryOS KeepSake Builder
      </div>

    </div>
  );
}
