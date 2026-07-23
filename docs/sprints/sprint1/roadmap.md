# Sprint 1 — Road to Demo MVP 🚀

Đây là lộ trình triển khai chi tiết cho Sprint 1 hướng tới bản Demo MVP hoàn chỉnh cho MemoryOS, đã được tái cấu trúc luồng trải nghiệm (AI-first onboarding) để dẫn dắt cảm xúc người dùng tốt nhất.

---

## 🌊 LUỒNG TRẢI NGHIỆM KHÁCH HÀNG MỚI (USER FLOW)

```
Landing Page
   ↓
Authentication (Đăng ký/Đăng nhập nhanh)
   ↓
AI Onboarding Wizard (Let's create something unforgettable)
   ├── 1. Lựa chọn đối tượng (Partner/Family/Friend/Myself)
   ├── 2. Dịp kỉ niệm (What are we celebrating?)
   ├── 3. Tải hình ảnh (Upload photos)
   └── 4. Kể câu chuyện (Tell the story)
   ↓
AI Generating Scene (Đang dệt kỉ niệm...)
   ↓
Editor & Preview (Tinh chỉnh thực tế và xuất bản)
```

---

## 📋 DANH SÁCH CÁC TÁC VỤ (TASKS ROADMAP)

* [x] **Task 01: Landing Experience** ✅
* [ ] **Task 02: Authentication**
  * Đăng nhập tối giản qua Supabase Auth để định danh người dùng.
* [ ] **Task 03: AI Onboarding Wizard** *(Thay thế cho Dashboard cũ)*
  * Luồng đặt câu hỏi cảm xúc mượt mà, thu thập hình ảnh và câu kể thô để chuẩn bị sinh kỉ niệm.
* [ ] **Task 04: AI Generation Engine & Object Selector**
  * AI gợi ý theme mẫu, nhạc và tự động phân loại kỷ niệm sang các vật thể tương ứng (`Letter`, `Book`, `Locket`, `Film Roll`).
* [ ] **Task 05: Interactive Editor & Preview**
  * Giao diện chỉnh sửa tinh tế (lần đầu tiên người dùng thấy Editor để hoàn thiện).
* [ ] **Task 06: Viewer & Share**
  * Chế độ hiển thị dành cho người nhận, hỗ trợ khóa mật mã bảo mật.
* [ ] **Task 07: Project Dashboard** *(Chuyển thành trang quản lý phụ)*
  * Chỉ truy cập khi người dùng muốn tạo thêm hoặc quản lý nhiều dự án kỉ niệm khác nhau.
