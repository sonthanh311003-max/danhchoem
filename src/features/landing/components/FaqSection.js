'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ_DATA = [
  {
    question: 'MemoryOS là gì?',
    answer: 'MemoryOS là một nền tảng xây dựng kỉ vật số (keepsake builder) giúp các cặp đôi lưu giữ những ký ức, câu chuyện tình yêu, ảnh chụp và các mốc hành trình ý nghĩa dưới dạng các đối tượng tương tác 3D lãng mạn.'
  },
  {
    question: 'Tại sao MemoryOS không phải là web builder thông thường?',
    answer: 'Chúng tôi không tạo ra các khối giao diện chứa thông tin khô khan hay landing page bán hàng. Chúng tôi thiết kế lại trải nghiệm tương tác xung quanh các vật phẩm vật lý như phong bì thư mở nắp, nhật ký lật trang, cuộn phim kéo và hộp báu vật ký ức để tạo ra cảm xúc chân thực nhất.'
  },
  {
    question: 'Thông tin cá nhân của chúng tôi có được bảo mật không?',
    answer: 'MemoryOS sử dụng Supabase RLS (Row Level Security) bảo mật tuyệt đối. Bạn hoàn toàn có thể cài đặt chế độ riêng tư (Private) hoặc khóa mật mã (Password Protected) cho từng trang kỷ niệm.'
  },
  {
    question: 'Tôi có thể tải ảnh và video chất lượng cao lên không?',
    answer: 'Có. MemoryOS tích hợp CDN phân phối Cloudinary giúp tự động nén, tối ưu hóa kích thước nhưng vẫn giữ nguyên độ sắc nét cao của ảnh và video kỷ niệm.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-[#FFFDFB] border-t border-[#FAF6F0] select-none text-left">
      <div className="max-w-3xl mx-auto space-y-12">
        
        <div className="text-center space-y-3">
          <span className="typography-caption text-[#E96A87]">Hỏi &amp; Đáp</span>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-[#2B2B2B]">
            Những câu hỏi thường gặp
          </h2>
          <div className="w-12 h-[1px] bg-pink-100/30 mx-auto" />
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="border-b border-[#FAF6F0] pb-4 transition-all duration-300"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between py-3 text-left focus:outline-none"
                >
                  <span className="text-xs font-bold text-[#2B2B2B] tracking-wide font-sans">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="text-[11px] text-gray-500 font-sans leading-relaxed pt-2 pb-1 pr-6">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
