'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * Parallax wrapper container reacting gently to mouse moves (5-10px max).
 * Instantly respects prefers-reduced-motion to avoid shifts.
 */
export default function ParallaxLayer({ children, intensity = 1 }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Giới hạn dịch chuyển tối đa chỉ 8px
    const x = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 16 * intensity;
    const y = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 16 * intensity;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center"
      style={{
        transform: prefersReducedMotion 
          ? 'none' 
          : `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        transition: 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}
