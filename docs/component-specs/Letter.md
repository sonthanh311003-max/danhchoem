# 💌 ĐẶC TẢ KỸ THUẬT: TRẢI NGHIỆM MỞ PHONG BÌ 3D (LETTER SPEC)

## 1. Thiết Kế Trực Quan (Visual Specs)
* **Envelope (Phong bì)**:
  * Kích thước: `520px` (Desktop) | `90vw` (Mobile).
  * Safe Area: Cách mép trình duyệt tối thiểu `32px` trên mọi trục.
  * Chất liệu: Giấy ngà tự nhiên, nhám mờ (`bg-[#FFFDFB]`), đổ bóng sâu 3 lớp mô phỏng chiều sâu vật lý.
* **Wax Seal (Con dấu sáp)**:
  * Màu sắc: Vàng kim cổ điển (`--color-accent-gold` / `#D9B36A`).
  * Trạng thái click: Tách làm hai nửa rời nhau và trượt chéo ra hai bên, mờ dần theo hiệu ứng lật nắp phong bì.
* **Paper (Lá thư tình)**:
  * Kích thước: `760px` (Desktop) | `90vw` (Mobile).
  * Font chữ: Chữ viết tay tự nhiên `Caveat` (`font-handwriting`), cỡ chữ tối thiểu `1.5rem` (`typography-letter`) để đọc thoải mái.
  * Scroll: Chỉ cuộn nội dung chữ viết bên trong lá thư (`overflow-y-auto`), toàn bộ phông nền phong bì và camera tĩnh lặng.

## 2. Hoạt Ảnh Framer Motion (Motion Specs)
* **Hover Lift (Nấc nhấc phong bì)**:
  * Khi hover: Phong bì nhấc lên nhẹ nhàng (`translateY(-8px)`) bằng spring physics (`stiffness: 300, damping: 20`).
* **Lật nắp (Flip Envelope Lid)**:
  * Xoay trục X (`rotateX: 180deg`) với perspective 3D đặt tại thẻ cha bọc (`perspective: 1200px`).
* **Kéo thư (Pull Letter Out)**:
  * Khi mở: Lá thư trượt lên từ trong lòng phong bì (`translateY(-100%)` rồi trượt lên nằm đè lên phong bì), zoom nhẹ camera (`scale: 1.05`) để đưa lá thư vào trung tâm màn hình của người đọc.

## 3. Khả Năng Tiếp Cận (Accessibility)
* **Phím tắt**:
  * Nhấn `Enter` hoặc `Space` để mở phong bì khi focus.
  * Nhấn `Escape` để gập lá thư trở lại vào trong lòng phong bì, khép niêm phong và đóng camera.
* **ARIA Labels**:
  * Thẻ bọc ngoài phong bì: `role="button" aria-label="Mở lá thư tình gửi cho bạn"`
