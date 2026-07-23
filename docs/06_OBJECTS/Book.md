# 📖 ĐẶC TẢ KỸ THUẬT: TRẢI NGHIỆM LẬT TRANG SÁCH KỶ NIỆM (BOOK SPEC)

## 1. Thiết Kế Trực Quan (Visual Specs)
* **Kích thước Quyển sách**:
  * Desktop: Chiều rộng `960px` (trang đôi), chiều cao `600px`.
  * Mobile: Tự động chuyển sang chế độ trang đơn (`100% width`), hỗ trợ cuộn dọc hoặc lật vuốt ngang.
* **Surface (Bề mặt)**:
  * Chất liệu: Giấy linen cổ mịn (`bg-[#FCFAF7]`), vân giấy mờ nhạt.
  * Độ dày: Viền sách hiển thị 3-5 lớp giấy bóng đổ chồng lên nhau để giả lập độ dày thực tế của gáy sách.
* **Gáy sách (Spine)**:
  * Đổ bóng chìm ở giữa rãnh hai trang để giả lập nếp gấp gáy sách chân thực.

## 2. Hoạt Ảnh Lật Trang (Motion Specs)
* **Page Flip (Lật trang)**:
  * Trục xoay nằm ở mép gáy sách (`transform-origin: left center` cho trang phải, `right center` cho trang trái).
  * Góc xoay: `rotateY: -180deg` khi lật trang sang trái.
  * Easing: Dùng `ease-in-out` mượt mà (duration: `0.8s` - Cinematic) để tạo cảm giác trang giấy có trọng lượng vật lý, tránh xoay quá nhanh.
* **Shadow Reveal**:
  * Khi lật trang, một bóng mờ nhẹ chạy quét qua trang giấy nền dưới để mô phỏng bóng đổ của trang giấy đang bay trong không khí.

## 3. Khả Năng Tiếp Cận (Accessibility)
* **Phím tắt**:
  * `ArrowRight` (Mũi tên phải): Lật sang trang tiếp theo.
  * `ArrowLeft` (Mũi tên trái): Lật về trang trước đó.
* **ARIA Labels**:
  * Thân sách: `role="region" aria-label="Sách ảnh và nhật ký hành trình tình yêu"`
  * Các trang: `aria-live="polite"` để thông báo nội dung trang mới khi lật.
