'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useWizardStore } from '@/features/wizard/stores/useWizardStore';
import { useProjectStore } from '@/features/projects/stores/useProjectStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Upload, Music, Trash2, Heart, Smile } from 'lucide-react';

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
  const [aiSpeech, setAiSpeech] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [thinkingIndex, setThinkingIndex] = useState(0);

  // 1. Phản hồi hội thoại của AI tương ứng với lựa chọn
  const aiResponses = {
    recipient: {
      'My Partner': '❤️ Thật tuyệt vời. Người ấy chắc chắn sẽ cảm nhận được sự lãng mạn này.',
      'Family': '🏠 Gia đình là nơi ấm áp nhất. Hãy cùng nhau lưu giữ những nụ cười của họ.',
      'Friend': '🌟 Một tình bạn chân thành xứng đáng có một món quà hồi ức vô giá.',
      'Myself': '🕯️ Dành tặng bản thân một khoảng lặng ngọt ngào. Một sự trân quý ý nghĩa.'
    },
    celebration: {
      'Birthday': '🎂 Ngày sinh nhật đặc biệt! Hãy làm cho tuổi mới ngập tràn niềm vui.',
      'Anniversary': '🥂 Kỷ niệm ngày yêu! Cột mốc minh chứng cho một chặng đường gắn bó.',
      'Proposal': '💍 Lời cầu hôn thiêng liêng! Hãy để khoảnh khắc này đọng lại mãi mãi.',
      'Wedding': '👰 Ngày cưới trọng đại! Thời khắc lộng lẫy và thiêng liêng nhất đời người.',
      'Trip': '✈️ Chuyến đi xa đáng nhớ! Những cung đường đầy tiếng cười và khám phá.',
      'Graduation': '🎓 Ngày tốt nghiệp ý nghĩa! Cánh cửa tương lai đang mở rộng chào đón.',
      'Other': '✨ Một dịp đặc biệt ngọt ngào! Hãy viết nên câu chuyện của riêng bạn.'
    },
    theme: {
      'Classic': '📜 Theme Classic: Tông màu ấm áp cổ điển đưa hồi ức trở nên thơ mộng.',
      'Luxury': '✨ Theme Luxury: Sự kết hợp đen huyền bí và vàng kim sang trọng quý phái.',
      'Vintage': '🍷 Theme Vintage: Màu đỏ rượu vang sậm đong đầy sự hoài niệm.',
      'Minimal': '🖤 Theme Minimal: Phong cách tối giản hiện đại tôn vinh mọi khung hình.',
      'Autumn': '🍁 Theme Autumn: Sắc cam đất ấm áp khơi gợi những mùa thu ngọt ngào.'
    }
  };

  // 2. Trợ lý ảo Emma đồng hành đổi thoại theo từng bước
  const emmaSpeech = {
    1: 'Xin chào! Mình là Emma 💌. Mình sẽ đồng hành cùng bạn để thêu dệt nên một trải nghiệm hồi ức điện ảnh. Hãy bắt đầu bằng cách cho mình biết bạn muốn gửi gắm kỷ niệm này tới ai nhé?',
    2: 'Thật tuyệt! Vậy dịp đặc biệt nào đang gắn liền với những kỷ niệm của hai bạn thế?',
    3: 'Một cái tên thật hay và đong đầy cảm xúc sẽ là tựa đề hoàn hảo cho cuốn sách kỷ niệm này đấy.',
    4: 'Hãy chọn một tông màu sắc (Theme) thể hiện đúng tinh thần và không khí của câu chuyện tình yêu nhé.',
    5: 'Những bức ảnh tự nhiên, không chuẩn bị trước luôn là những mảnh ghép mang nhiều cảm xúc chân thật nhất. Đừng ngần ngại tải lên nhé!',
    6: 'Một chút âm thanh du dương sẽ là nhịp cầu tuyệt vời để kết nối các hồi ức lại với nhau.',
    7: 'Bạn có cần mình trợ giúp viết một bức thư tình cảm thật bay bổng và ý nghĩa không?',
    8: 'Mọi thứ đã sẵn sàng rồi! Đợi mình một chút nhé, mình đang dệt những hồi ức này thành một tác phẩm nghệ thuật điện ảnh.'
  };

  // 3. Thông điệp suy nghĩ của AI ở bước 8 (Thinking Loop 2s)
  const thinkingMessages = [
    '✨ Đang xem qua các tấm ảnh kỷ niệm...',
    '❤️ Tìm kiếm những khoảnh khắc hạnh phúc nhất...',
    '📸 Sắp xếp gọn gàng các khung hình Polaroid...',
    '✉ Chuẩn bị các nét chữ viết tay lãng mạn...',
    '🎵 Hòa phối các giai điệu du dương...',
    '✨ Dựng bản nháp điện ảnh đầu tiên cho bạn...'
  ];

  // Vòng lặp đổi chữ suy nghĩ ở bước 8
  useEffect(() => {
    if (currentStep === 8) {
      const interval = setInterval(() => {
        setThinkingIndex((prev) => (prev + 1) % thinkingMessages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  // Khôi phục nháp
  useEffect(() => {
    loadSavedProgress();
  }, [loadSavedProgress]);

  // Xử lý chọn và phản hồi hội thoại
  const handleSelectOption = (key, value) => {
    if (isTransitioning) return;
    setAnswer(key, value);

    // Kích hoạt AI response bubble
    const response = aiResponses[key]?.[value];
    if (response) {
      setAiSpeech(response);
      setIsTransitioning(true);
      
      // Chờ 1.2s rồi mới chuyển bước
      setTimeout(() => {
        setAiSpeech('');
        setIsTransitioning(false);
        nextStep();
      }, 1200);
    } else {
      nextStep();
    }
  };

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

  // Hoàn tất dựng bản nháp
  useEffect(() => {
    if (currentStep === 8) {
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
          
          localStorage.removeItem('dmc_wizard_draft');
          localStorage.removeItem('dmc_wizard_step');
          
          router.push(`/projects/${projectId}/preview`);
        } catch (err) {
          console.error(err);
        }
      }, 7000); // 7 giây chạy hoạt ảnh suy nghĩ mượt mà trải nghiệm sâu sắc
      return () => clearTimeout(timer);
    }
  }, [currentStep, answers, createProject, router]);

  // Micro Transition variants (300-500ms)
  const cardVariants = {
    initial: { opacity: 0, scale: 0.98, x: 25 },
    animate: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 0.98, x: -25, transition: { duration: 0.35, ease: 'easeIn' } }
  };

  // Ánh xạ chặng đường Journey Indicator (P0)
  const getJourneyActive = () => {
    if (currentStep <= 1) return 0; // Recipient
    if (currentStep <= 3) return 1; // Celebration & Name
    if (currentStep <= 5) return 2; // Theme & Photos
    if (currentStep <= 7) return 3; // Music & AI
    return 4; // Creation
  };

  const journeySteps = [
    { label: 'Người ấy', icon: '❤️' },
    { label: 'Kỷ niệm', icon: '📖' },
    { label: 'Hình ảnh', icon: '📸' },
    { label: 'Âm nhạc', icon: '🎵' },
    { label: 'Tạo lập', icon: '✨' }
  ];

  const activeJourney = getJourneyActive();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#FFF9F8] dark:bg-[#161313] transition-colors duration-500 min-h-screen text-[#2B2B2B] dark:text-[#F0E6E4] select-none">
      
      {/* 🗺️ JOURNEY PROGRESS INDICATOR (Thanh tiến trình chặng đường P0) */}
      <div className="w-full max-w-xl mx-auto flex items-center justify-between py-4 border-b border-[#FAF6F0] dark:border-[#292222]">
        {currentStep > 1 && currentStep < 8 && (
          <button
            onClick={prevStep}
            className="p-2 text-gray-400 hover:text-[#E96A87] rounded-xl hover:bg-white dark:hover:bg-[#1F1A1A] transition-all cursor-pointer flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Trở lại
          </button>
        )}
        
        {/* Journey Dots Flow */}
        <div className="flex items-center gap-2 sm:gap-4 mx-auto">
          {journeySteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center relative group">
                <span 
                  className={`text-base transition-all duration-300 ${idx === activeJourney ? 'scale-125 opacity-100 filter drop-shadow-[0_0_8px_#E96A87]' : 'opacity-35 scale-95'}`}
                >
                  {step.icon}
                </span>
                <span className="absolute -bottom-5 text-[8px] tracking-wider uppercase font-bold text-gray-400 dark:text-[#7A6D6B] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                  {step.label}
                </span>
              </div>
              {idx < journeySteps.length - 1 && (
                <div className={`h-[1px] w-8 sm:w-16 transition-all duration-500 ${idx < activeJourney ? 'bg-[#E96A87]' : 'bg-[#FAF6F0] dark:bg-[#292222]'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="text-xs font-mono font-bold text-[#E96A87] hidden sm:block">
          Chặng {activeJourney + 1}/5
        </div>
      </div>

      {/* 🎭 VÙNG HỘI THOẠI TRUNG TÂM */}
      <div className="flex-1 flex flex-col items-center justify-center my-6 gap-6 relative">
        
        {/* Bong bóng AI Phản hồi nhanh (Instant conversation bubble P0) */}
        <AnimatePresence>
          {aiSpeech && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-2 px-5 py-3 rounded-2xl bg-[#FFF9F8] dark:bg-[#292222] border border-[#E96A87]/30 text-xs font-medium text-[#E96A87] shadow-sm max-w-sm text-center"
            >
              {aiSpeech}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-md text-center flex flex-col gap-6"
          >
            {/* ── STEP 1: Đối tượng kỷ niệm ── */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-5">
                <h2 className="font-display text-3xl font-medium tracking-wide">
                  💌 Before we begin...<br/>
                  <span className="font-sans text-lg text-gray-400 font-normal">Tell us who this memory belongs to.</span>
                </h2>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {['My Partner', 'Family', 'Friend', 'Myself'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSelectOption('recipient', option)}
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
                      onClick={() => handleSelectOption('celebration', option)}
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
                      onClick={() => handleSelectOption('theme', themeName)}
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

                {/* Polaroid Grid Layout có chủ đích (AI layout style P2) */}
                <div className="grid grid-cols-3 gap-3 my-2 max-h-[220px] overflow-y-auto pr-1">
                  {answers.photos.map((url, index) => {
                    // Sắp đặt Polaroid: ảnh đầu tiên nằm giữa z-index cao nhất, ảnh tiếp theo nghiêng trái/phải
                    const isFirst = index === 0;
                    const rotation = isFirst ? 'rotate-0 z-20 scale-105' : index % 2 === 0 ? '-rotate-3 z-10' : 'rotate-3 z-10';
                    return (
                      <div
                        key={index}
                        className={`relative bg-white dark:bg-[#1F1A1A] p-2 border border-[#FAF6F0] dark:border-[#292222] shadow-md rounded-lg flex flex-col group aspect-square overflow-hidden transform transition-all duration-300 ${rotation}`}
                      >
                        <img
                          src={url}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover rounded"
                        />
                        {isFirst && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-[#E96A87] text-white text-[7px] px-1 py-0.5 rounded tracking-wide uppercase font-bold">
                            Ảnh bìa
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(index)}
                          className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
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
                      onClick={() => handleSelectOption('musicOption', item.val)}
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
                    onClick={() => handleSelectOption('aiLetter', false)}
                    className="flex-1 p-5 rounded-2xl border border-[#FAF6F0] dark:border-[#292222] bg-white dark:bg-[#1F1A1A] hover:border-gray-200 text-sm font-medium transition-all cursor-pointer text-center"
                  >
                    Tự viết từ đầu ✍️
                  </button>
                  <button
                    onClick={() => handleSelectOption('aiLetter', true)}
                    className="flex-1 p-5 rounded-2xl border border-[#E96A87] bg-[#FFF9F8] dark:bg-[#292222] text-[#E96A87] hover:border-[#E96A87]/80 text-sm font-semibold transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
                  >
                    Có, trợ giúp AI 🪄
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 8: Tạo lập Hồi ức - Hoạt ảnh đổi chữ (P1) ── */}
            {currentStep === 8 && (
              <div className="flex flex-col items-center gap-6 py-6">
                <div className="relative w-16 h-16 rounded-full bg-white dark:bg-[#1F1A1A] border border-[#FAF6F0] dark:border-[#292222] flex items-center justify-center text-[#E96A87] shadow-sm">
                  <Sparkles className="w-7 h-7 animate-spin duration-3000" />
                </div>
                <div className="flex flex-col gap-2">
                  {/* Chữ đổi động sau mỗi 2 giây để người dùng bớt chờ đợi cảm nhận được chiều sâu */}
                  <h2 className="font-display text-2xl font-light tracking-wide text-center h-16 flex items-center justify-center">
                    {thinkingMessages[thinkingIndex]}
                  </h2>
                  <p className="text-[10px] text-gray-400 dark:text-[#B5A8A6] font-sans tracking-widest uppercase mt-2">
                    MemoryOS generative engine
                  </p>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* 👩‍💼 AI ASSISTANT AVATAR (Trợ lý ảo Emma đồng hành P1) */}
      {currentStep < 8 && (
        <div className="w-full max-w-xl mx-auto flex items-end gap-3.5 py-4 border-t border-[#FAF6F0] dark:border-[#292222] px-2">
          <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1F1A1A] border border-[#FAF6F0] dark:border-[#292222] flex items-center justify-center text-[#E96A87] shadow-sm shrink-0">
            <Smile className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1 text-left">
            <span className="text-[9px] font-sans tracking-wider uppercase font-bold text-[#E96A87]">Emma 💌</span>
            <p className="text-xs text-gray-500 dark:text-[#B5A8A6] leading-relaxed max-w-md">
              {emmaSpeech[currentStep]}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
