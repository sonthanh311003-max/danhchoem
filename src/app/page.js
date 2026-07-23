'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneStage, ParticleField, GodRayLight, FloatingEnvelope, ParallaxLayer } from '@/components/scene';

export default function Home() {
  const router = useRouter();
  const { user, checkUser } = useAuthStore();
  const [sceneState, setSceneState] = useState(1); // 1: Dark, 2: Reveal library

  useEffect(() => {
    // Nạp phiên kiểm tra user hiện hành
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    // Sau 1 giây chuyển sang Scene 2 (Reveal)
    const timer = setTimeout(() => {
      setSceneState(2);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenEnvelope = () => {
    // Chuyển tiếp an toàn sang trang thích hợp sau khi click bóc niêm phong sáp
    setTimeout(() => {
      if (user) {
        router.push('/welcome');
      } else {
        router.push('/auth/login');
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 w-full h-screen bg-[#161313] overflow-hidden select-none flex items-center justify-center">
      
      {/* 🌌 CANVAS BỤI NẮNG */}
      <ParticleField density="medium" />

      {/* 🏛️ MẶT NỀN THƯ VIỆN CỔ KÍNH */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-3000 ease-out z-0 filter blur-[4px] scale-[1.03]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600')`,
          opacity: sceneState === 2 ? 0.35 : 0,
        }}
      />

      {/* ☀️ LỚP ÁNH SÁNG VOLUMETRIC GOD RAYS */}
      {sceneState === 2 && <GodRayLight />}

      {/* ✉️ STAGE HỘI TỤ ENVELOPE TRUNG TÂM */}
      <AnimatePresence>
        {sceneState === 2 && (
          <SceneStage>
            <ParallaxLayer intensity={0.6}>
              <div className="flex flex-col items-center gap-14">
                
                {/* Tiêu đề Serif Sang Trọng */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                  className="text-center px-4"
                >
                  <h1 className="font-display text-4xl sm:text-5xl font-light text-[#F0E6E4] tracking-wide leading-tight">
                    Thư Viện Hồi Ức
                  </h1>
                  <p className="text-[10px] text-gray-400 font-sans tracking-[0.25em] uppercase mt-2">
                    MemoryOS Archive Vessel
                  </p>
                </motion.div>

                {/* Phong Bì Lớn Tương Tác */}
                <FloatingEnvelope 
                  size="lg" 
                  glowColor="gold" 
                  onOpen={handleOpenEnvelope} 
                  autoFloat={true}
                  label="Mở cánh cửa kỷ niệm"
                />

              </div>
            </ParallaxLayer>
          </SceneStage>
        )}
      </AnimatePresence>

    </div>
  );
}
