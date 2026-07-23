import { useState, useEffect } from 'react';

/**
 * Custom Hook calculating viewport geometry and browser zoom adjustments
 * to protect keepsake envelope centering without clippings.
 */
export function useResponsiveLayout() {
  const [layout, setLayout] = useState({
    scale: 1,
    zoomFactor: 1,
    width: 1280,
    height: 800,
    isMobile: false
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Tính toán tỉ lệ zoom của trình duyệt
      const zoomFactor = window.devicePixelRatio || 1;
      
      // Tính toán tỷ lệ scale an toàn cho phong bì dựa trên chiều cao & chiều rộng
      // Mục tiêu: phong bì w=[460px] h=[280px] phải luôn hiển thị vừa vặn kể cả màn hình cực nhỏ
      let scale = 1;
      
      // Giới hạn chiều rộng an toàn
      if (width < 480) {
        scale = Math.min(scale, (width - 40) / 460);
      }
      
      // Giới hạn chiều cao an toàn (Để tránh bị cắt cụp theo trục đứng)
      if (height < 600) {
        scale = Math.min(scale, (height - 180) / 280);
      }

      // Giới hạn khi zoom cao (ví dụ: zoom 125% - 150%)
      if (zoomFactor > 1.2) {
        scale = scale * (1.1 / zoomFactor);
      }

      setLayout({
        scale: Math.max(0.65, scale), // Không scale nhỏ hơn 0.65 để bảo toàn nội dung
        zoomFactor,
        width,
        height,
        isMobile: width < 768
      });
    };

    handleResize();

    // ResizeObserver hỗ trợ cập nhật động nhạy bén
    const observer = new ResizeObserver(handleResize);
    observer.observe(document.documentElement);

    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return layout;
}
