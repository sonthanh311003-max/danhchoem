# Sprint 3 — Memory Editor v1 🎨🛠️

Mục tiêu chính của Sprint 3 là xây dựng trình chỉnh sửa kỉ vật **Experience Editor v1** tối giản, mượt mà và trực quan theo triết lý Project Constitution.

---

## 🌊 LUỒNG NGHIỆP VỤ BIÊN TẬP
`Onboarding Wizard -> Generate Experience -> Open Editor -> Edit in Canvas/Inspector -> Autosave -> Publish`

---

## 📋 DANH SÁCH TÁC VỤ SPRINT 3 (TASKS)

* [ ] **Task 01: Editor Architecture**
  * Bố cục 5 phân vùng phẳng: Top Toolbar, Left Sidebar, Center Canvas, Right Inspector, Bottom Timeline.
* [ ] **Task 02: Left Sidebar (Story Sidebar)**
  * Quản lý phân cảnh dạng câu chuyện lãng mạn. Kéo thả đổi vị trí bằng `<Reorder>` của Framer Motion.
* [ ] **Task 03: Center Canvas**
  * Khung render luôn ở giữa, tự động co giãn qua `ResizeObserver`, hỗ trợ Zoom scale.
* [ ] **Task 04: Letter Editor**
  * Viết thư trực tiếp trên giấy thật nhám mịn, có Undo/Redo, Markdown và bộ đếm chữ.
* [ ] **Task 05: Gallery Editor**
  * Lưới ảnh Polaroid kéo thả sắp xếp, caption, nén ảnh client-side.
* [ ] **Task 06: Theme Editor**
  * Chuyển đổi qua lại giữa 5 theme mẫu tức thì không cần reload trình duyệt qua CSS variables.
* [ ] **Task 07: Music Controller**
  * Tải nhạc nền cá nhân, lặp vô tận, tự động tăng/giảm âm lượng (Audio Fade) mượt mà bằng Web Audio API.
* [ ] **Task 08: Inspector Panel**
  * Bảng điều khiển động đổi nút tương ứng theo từng đối tượng được chọn. Hỗ trợ co kéo chiều rộng.
* [ ] **Task 09: Autosave Engine**
  * Tự động lưu chạy ngầm qua Debounce (800ms) kèm Toast thông báo, không dùng nút Save vật lý.
* [ ] **Task 10: Viewer Synchronization**
  * Cơ chế đồng bộ dữ liệu thời gian thực phản hồi WYSIWYG tức thời.
