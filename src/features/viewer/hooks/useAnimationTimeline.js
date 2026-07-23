'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function useAnimationTimeline({ active = true, onComplete } = {}) {
  const [playbackState, setPlaybackState] = useState('idle'); // 'idle' | 'playing' | 'paused' | 'completed'
  const [progress, setProgress] = useState(0);
  const timelineRef = useRef(null);

  // Khởi tạo GSAP Timeline cho lá thư
  useEffect(() => {
    if (!active) return;

    // 1. Tạo đối tượng Timeline
    const tl = gsap.timeline({
      paused: true,
      onUpdate: () => {
        setProgress(tl.progress());
      },
      onComplete: () => {
        setPlaybackState('completed');
        if (onComplete) onComplete();
      }
    });

    timelineRef.current = tl;

    // 2. Định nghĩa chuỗi hoạt ảnh lập lịch chính xác (Scheduled timeline)
    // 0.0s: Envelope xuất hiện
    tl.fromTo('#envelope-container', 
      { opacity: 0, y: 100, scale: 0.9 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }, 
      0.0
    );

    // 0.8s: Đổ bóng chìm đa lớp xuất hiện mịn màng
    tl.fromTo('#envelope-shadow',
      { opacity: 0, boxShadow: '0 0px 0px rgba(0,0,0,0)' },
      { opacity: 1, boxShadow: '0 25px 60px rgba(61,43,39,0.12)', duration: 0.6, ease: 'sine.out' },
      0.8
    );

    // 1.4s: Nhấc phong bì 3D nổi nhẹ lên
    tl.to('#envelope-container',
      { y: -15, duration: 0.6, ease: 'power2.out' },
      1.4
    );

    // 2.0s: Nắp phong bì lật mở xoay 180 độ
    tl.to('#envelope-lid',
      { rotateX: 180, duration: 0.6, ease: 'power1.inOut' },
      2.0
    );

    // 2.6s: Lá thư trượt nhô lên khỏi lòng phong bì
    tl.fromTo('#letter-sheet',
      { y: 0, zIndex: 5 },
      { y: -260, zIndex: 20, duration: 0.8, ease: 'power3.out' },
      2.6
    );

    // 3.4s: Dòng tiêu đề Serif mờ dần hiện ra
    tl.fromTo('#letter-headline',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      3.4
    );

    // 4.0s: Nội dung chữ viết tay hiện đầy đủ
    tl.fromTo('#letter-content-body',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power1.out' },
      4.0
    );

    // Tự động phát khi mount phân cảnh
    tl.play();
    setPlaybackState('playing');

    // Dọn dẹp tài nguyên khi unmount phân cảnh
    return () => {
      tl.kill();
    };
  }, [active, onComplete]);

  // 3. Các hàm điều khiển dòng thời gian
  const play = () => {
    if (timelineRef.current) {
      timelineRef.current.play();
      setPlaybackState('playing');
    }
  };

  const pause = () => {
    if (timelineRef.current) {
      timelineRef.current.pause();
      setPlaybackState('paused');
    }
  };

  const skip = () => {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
      setPlaybackState('completed');
    }
  };

  const replay = () => {
    if (timelineRef.current) {
      timelineRef.current.restart();
      setPlaybackState('playing');
    }
  };

  return {
    playbackState,
    progress,
    play,
    pause,
    skip,
    replay
  };
}
