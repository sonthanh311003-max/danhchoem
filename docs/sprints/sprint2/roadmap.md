# Sprint 2 — Experience Creation Flow (MVP Target) 🚀

Mục tiêu tối thượng của Sprint 2 là xây dựng một luồng trải nghiệm khép kín, tối giản nhưng cực kỳ mạnh mẽ:
`Landing → Đăng nhập → Wizard → Preview`

Chúng ta hoàn toàn **loại bỏ Editor khỏi Sprint 2** để người dùng tập trung cảm nhận thành quả nhanh nhất, kích thích mong muốn sở hữu kỉ vật trước khi bước vào tinh chỉnh chi tiết ở các sprint sau.

---

## 📋 DANH SÁCH TÁC VỤ SPRINT 2 (TASKS)

* [ ] **Task 01: Authentication**
  * Tích hợp Supabase Auth (Sign Up, Login, Verification, Logout). Thành công điều hướng về `/welcome`.
* [ ] **Task 02: Welcome Screen**
  * Giao diện chào đón tối giản căn giữa và danh sách Recent Projects.
* [ ] **Task 03: Experience Wizard**
  * Guided Onboarding Wizard 8 bước thu thập thông tin kỷ niệm mượt mà.
* [ ] **Task 04: Project Creation Service**
  * Tầng dịch vụ xác thực dữ liệu qua Zod và ghi dữ liệu dự án/couple vào Supabase DB.
* [ ] **Task 05: Preview Generator**
  * Trình xem thử hoạt ảnh cinematic cuộn dọc (`Envelope -> Letter -> Gallery -> Timeline -> Ending`).
* [ ] **Task 06: Folder Structure Standardization**
  * Chuẩn hóa cấu trúc thư mục phẳng trong `src/` để đảm bảo ranh giới mã nguồn sạch sẽ.
* [ ] **Task 07: State Management (Zustand)**
  * Thiết lập Zustand quản lý tập trung các store dữ liệu.
* [ ] **Task 08: Acceptance Checklist**
  * Quy trình kiểm thử và nghiệm thu hiệu năng, lỗi console trước khi phát hành.
