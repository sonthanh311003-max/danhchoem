'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * Stage container calculating viewport scales to keep elements beautifully centered.
 * Uses ResizeObserver and fluid scale factors to prevent overflow on zoom or small viewports.
 */
export default function SceneStage({ children }) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const zoomFactor = window.devicePixelRatio || 1;

      let calculatedScale = 1;

      // Giới hạn chiều rộng an toàn (Envelope w=460px)
      if (width < 480) {
        calculatedScale = Math.min(calculatedScale, (width - 40) / 460);
      }

      // Giới hạn chiều cao an toàn (Envelope h=280px)
      if (height < 600) {
        calculatedScale = Math.min(calculatedScale, (height - 180) / 280);
      }

      // Điều chỉnh khi zoom trình duyệt cao
      if (zoomFactor > 1.2) {
        calculatedScale = calculatedScale * (1.1 / zoomFactor);
      }

      setScale(Math.max(0.65, calculatedScale));
    };

    handleResize();

    const observer = new ResizeObserver(handleResize);
    observer.observe(document.documentElement);

    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        '--stage-scale': scale,
      }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden z-10 w-full h-full"
    >
      <div 
        style={{
          transform: 'scale(var(--stage-scale))',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="relative flex flex-col items-center justify-center w-full h-full"
      >
        {children}
      </div>
    </div>
  );
}
