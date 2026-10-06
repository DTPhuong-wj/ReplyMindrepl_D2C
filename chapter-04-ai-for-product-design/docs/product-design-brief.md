# TÀI LIỆU THIẾT KẾ GIAO DIỆN SẢN PHẨM: REPLYMIND (PRODUCT DESIGN BRIEF)

<!-- ==============================================================================
THÔNG TIN TÀI LIỆU (DESIGN BRIEF METADATA)
- Tên dự án: ReplyMind - AI Co-pilot for D2C Customer Support
- Tài liệu: Product Design Brief (Bản Thiết Kế Giao Diện & Trải Nghiệm Người Dùng)
- Phiên bản: 1.0.0
- Ngày phê duyệt: 06-10-2026
- Trạng thái: APPROVED (Đã được con người kiểm duyệt và phê duyệt chính thức)
- Nguồn tham chiếu:
  + chapter-03-ai-for-requirements-product-analysis/docs/product-requirements.md (PRD v1.1.0)
  + chapter-03-ai-for-requirements-product-analysis/docs/feature-specification.md
  + chapter-02-prompt-engineering/docs/project-context.md
- Tiến trình thực hiện: P4.1 - Product Design Brief ($brainstorm & $frontend-expert)
============================================================================== -->

## 1. Triết Lý Thiết Kế & Hệ Thống Nhận Diện (Design Tokens & Philosophy)

### 1.1. Triết lý Thiết kế (Design Principles)
- **Tập trung & Giảm tải Nhận thức (Glanceable & Low Cognitive Load)**: Nhân viên CSKH phải xử lý hàng trăm cuộc trò chuyện mỗi ngày trong các đợt cao điểm; giao diện ưu tiên bảng màu trung tính, bố cục thoáng đãng, giúp Agent nắm bắt Intent, Sentiment và Priority trong **dưới 3 giây**.
- **Human-in-the-Loop Tối cao (Supervised Agency)**: Mọi nội dung do AI Co-pilot sinh ra đều có ranh giới trực quan riêng biệt (khung tím nhạt, icon ngôi sao AI ✨) tách biệt hoàn toàn với ô soạn thảo chính thức. Nhân viên luôn là người kiểm soát nút gửi cuối cùng.
- **Tiêu chuẩn Khả năng Tiếp cận (Accessibility - WCAG 2.1 AA)**: Độ tương phản văn bản tối thiểu 4.5:1, hỗ trợ 100% điều hướng bằng bàn phím (Keyboard First), vùng chạm tối thiểu 44x44px trên thiết bị cảm ứng, và tôn trọng chế độ giảm chuyển động (`prefers-reduced-motion`).

### 1.2. Bảng Màu Thương Hiệu & Mã Hóa Trạng Thái (Color Tokens)
- **Màu Chủ Đạo (Primary / Brand Accent)**: `Indigo-600` (`#4F46E5`), Hover: `Indigo-700` (`#4338CA`), Light: `Indigo-50` (`#EEF2FF`).
- **Nền & Bề mặt (Surfaces)**:
  - App Background: `Slate-50` (`#F8FAFC`).
  - Card / Panel Surface: `White` (`#FFFFFF`), Border: `Slate-200` (`#E2E8F0`).
  - Active Selection Surface: `Indigo-50/70` (`#F5F7FF`), Border: `Indigo-600`.
- **Mã Hóa Màu Cảm Xúc (Sentiment Tokens)**:
  - `POSITIVE`: Xanh lá (`Emerald-600` / `#059669`, Nền: `Emerald-50` / `#ECFDF5`).
  - `NEUTRAL`: Xám / Xanh đá (`Slate-600` / `#475569`, Nền: `Slate-100` / `#F1F5F9`).
  - `NEGATIVE`: Đỏ cam (`Rose-600` / `#E11D48`, Nền: `Rose-50` / `#FFF1F2`).
- **Mã Hóa Mức Độ Ưu Tiên (Priority Tokens)**:
  - `URGENT`: Viền đỏ rực nhấp nháy nhẹ, Huy hiệu đỏ đậm (`Rose-700`).
  - `HIGH`: Cam hổ phách (`Amber-600` / Nền: `Amber-50`).
  - `MEDIUM`: Xanh lam (`Sky-600` / Nền: `Sky-50`).
  - `LOW`: Xám chì (`Slate-500` / Nền: `Slate-100`).

---

## 2. Bố Cục Không Gian Làm Việc 3 Cột (Workbench 3-Column Layout)

Giao diện làm việc chính của Agent được tổ chức theo mô hình **3 Cột Hợp Nhất (Fixed 3-Column Grid)** tối ưu cho màn hình Desktop (từ 1280px trở lên):

```
+-------------------------------------------------------------------------------------------------------------------------+
| [Header]: Logo ReplyMind | Search All (Ctrl+K) | Tab Navigation | [Role Switcher: Agent / Supervisor (usr_agent_01)]  |
+---------------------------------+---------------------------------------------+-----------------------------------------+
| CỘT 1: HỘP THƯ ĐẾN (320px)      | CỘT 2: KHUNG CHAT CHI TIẾT (Flex-1 / 600px+) | CỘT 3: AI CO-PILOT SIDEBAR (380px)      |
| - Thanh tìm kiếm & Bộ lọc:      | - Header: Tên khách, Email, Trạng thái      | - [F02 Phân tích]:                      |
|   [Tất cả] [URGENT] [Chờ xử lý] | - Lịch sử bong bóng chat dòng thời gian     |   Intent Badge: DELIVERY_ISSUE          |
| - Danh sách hội thoại cuộn:     | - Khung cảnh báo / Banner (nếu có lỗi AI)   |   Sentiment: NEGATIVE | Priority: URGENT|
|   + Card #ORD-9821 (Đỏ rực)     | - Ô soạn thảo tin nhắn (Textarea):          | - [F03 RAG Trích dẫn Chính sách]:       |
|     Khách: Phạm Minh Tuấn       |   + Placeholder: "Soạn tin nhắn..."         |   Thẻ bài viết: "Giao chậm bồi thường"  |
|     Preview: "Trễ 4 ngày..."    |   + Thanh công cụ đính kèm/phím tắt         | - [F04 Bản nháp AI Gợi ý]:              |
|   + Card #ORD-8412 (Xanh)       |   + Nút chính: [ GỬI PHẢN HỒI (Ctrl+Enter) ]|   Khung câu trả lời hoàn chỉnh          |
|     Khách: Lê Thu Hà            |                                             |   Nút: [ ✨ CHÈN BẢN NHÁP AI (1-Click) ]|
|     Preview: "Đổi size L..."    |                                             | - [F07 Đánh giá]: [ 👍 Hữu ích ] [ 👎 ] |
+---------------------------------+---------------------------------------------+-----------------------------------------+
```

---

## 3. Đặc Tả Chi Tiết Từng Phân Hệ Giao Diện

### 3.1. Header & Bộ Chuyển Đổi Vai Trò (Auth Simulator)
- **Role Switcher**: Nút Dropdown bo góc có icon người dùng:
  - Hiển thị Avatar tròn + Tên: `Nguyễn Hải Đăng (Agent)` hoặc `Trần Thị Mai (Supervisor)`.
  - Khi click: Mở menu chọn 2 tài khoản, chọn xong cập nhật ngay không giật trang (< 50ms).
- **Thanh Menu (Navigation Links)**:
  - `Hộp thư hỗ trợ` (`/agent/inbox`): Luôn hiển thị cho cả 2 vai trò.
  - `Cơ sở tri thức` (`/knowledge-base`): Chỉ hiển thị khi là Supervisor/Admin.
  - `Cấu hình văn phong` (`/admin/brand-tone`): Chỉ hiển thị khi là Supervisor/Admin.
  - `Báo cáo & Đánh giá` (`/dashboard`): Chỉ hiển thị khi là Supervisor/Admin.

### 3.2. Cột 1: Hộp Thư Đến & Bộ Lọc (Inbox F01)
- **Bộ lọc nhanh dạng Tabs (Pills)**:
  - `Tất cả` (All) | `Cần gấp (URGENT)` (Badge đỏ đếm số lượng) | `Chưa xử lý (OPEN)` | `Chờ khách (PENDING)`.
- **Card Hội thoại**:
  - Viền trái có dải màu mã hóa theo Priority (Đỏ: URGENT, Cam: HIGH, Lam: MEDIUM).
  - Tên khách hàng (Font đậm `Slate-800`), thời gian gửi (ví dụ: `10 phút trước`).
  - Dòng preview nội dung tin nhắn giới hạn 1 dòng (`truncate`).
  - Huy hiệu nhỏ góc phải: Nhãn Intent (`DELIVERY_ISSUE`) và icon cảm xúc.
  - Trạng thái Active: Nền đổi sang `Indigo-50`, viền xanh `Indigo-600`.

### 3.3. Cột 2: Khung Chat Chi Tiết (Chat Area F05)
- **Header Khung chat**: Hiển thị avatar khách hàng, tên, email, mã đơn hàng (`#ORD-9821`), và nút dropdown chuyển trạng thái hội thoại (`OPEN` -> `RESOLVED`).
- **Luồng tin nhắn (Timeline)**:
  - Tin nhắn khách hàng: Căn lề trái, nền `Slate-100`, chữ `Slate-800`.
  - Tin nhắn nhân viên: Căn lề phải, nền `Indigo-600`, chữ `White`.
  - Tin nhắn hệ thống (System event): Căn giữa, chữ nhỏ `Slate-400`.
- **Ô soạn thảo (Composer)**:
  - Khung `textarea` tự động giãn dòng từ 2 đến 6 dòng khi gõ dài.
  - Nút **"Gửi phản hồi"** màu tím `Indigo-600`, có icon máy bay giấy, kích hoạt bằng click hoặc tổ hợp phím `Ctrl + Enter`.

### 3.4. Cột 3: Thanh Bên AI Co-pilot (Sidebar F02, F03, F04, F07)
- **Thẻ F02 (Triage Insights)**:
  - 3 khối Badge trực quan: Intent (`DELIVERY_ISSUE`), Sentiment (`NEGATIVE`), Priority (`URGENT`).
  - Thanh đo độ tin cậy: `96% Confidence` màu xanh lá.
  - Dòng tóm tắt lý do: Chữ nghiêng nhỏ giải thích ngữ cảnh bực tức của khách.
- **Thẻ F03 (Chính sách RAG Trích dẫn)**:
  - Thẻ accordion có thể thu gọn/mở rộng, hiển thị tên bài viết chính sách kèm trích đoạn điều khoản chính xác phục vụ đối chứng.
- **Thẻ F04 (Bản nháp Phản hồi AI)**:
  - Khung viền nét đứt màu tím nhạt, nền `Indigo-50/50`.
  - Huy hiệu góc trên: Biểu tượng ngôi sao AI ✨ kèm Brand Tone đang áp dụng (`Văn phong: THÂN THIỆN`).
  - Nút chuyển nhanh Brand Tone (Dropdown 4 phong cách: Friendly, Professional, Casual, Formal).
  - **Nút Hành Động Trọng Tâm (Primary CTA)**:
    - Nút to, nổi bật màu tím đậm: **"✨ Chèn Bản Nháp AI"**.
    - Khi bấm: Đoạn văn bản lập tức xuất hiện trong ô soạn thảo ở Cột 2, con trỏ tự động nhảy xuống cuối văn bản.
- **Thẻ F07 (Đánh giá Hữu ích)**:
  - Hàng nút bấm: `[ 👍 Hữu ích ]` và `[ 👎 Chưa đúng ý ]` kèm 5 ngôi sao đánh giá nhanh.

### 3.5. Màn hình Quản trị Tri thức (Knowledge Base F06)
- **Chế độ xem bảng (List View)**: Bảng danh sách bài viết gồm: Tiêu đề bài viết, Danh mục, Trạng thái lập chỉ mục (Huy hiệu xanh: `Indexed in Vector DB`), Ngày cập nhật, và Thao tác (Sửa/Xóa).
- **Chế độ soạn thảo (Editor View)**: Form 2 cột: Cột trái nhập Tiêu đề, Slug, Danh mục; Cột phải là trình soạn thảo nội dung hỗ trợ định dạng Markdown có xem trước trực tiếp (Live Preview).

### 3.6. Màn hình Cấu hình Văn phong (Brand Tone Selector F06)
- Lưới 4 Card lớn đại diện cho 4 phong cách (`Friendly`, `Professional`, `Casual`, `Formal`).
- Mỗi Card hiển thị: Icon đại diện, Tiêu đề, Mô tả sắc thái cảm xúc, và Đoạn hội thoại mẫu minh họa.
- Card đang được chọn có viền kép màu tím và biểu tượng dấu kiểm (Checkmark).
- Khung nhập văn bản "Quy tắc văn phong tùy biến" (Custom Guidelines) tối đa 500 ký tự phía dưới.

### 3.7. Bảng Điều Khiển Thống Kê (Dashboard F07)
- **Card KPI nổi bật**: Điểm Hữu Ích Của AI (`AI Helpful Score: 87.5%`), Thời gian phản hồi trung bình (`FRT: 1.2s`), Tỷ lệ chấp thuận nguyên văn (`Unmodified Rate: 72%`).
- **Biểu đồ trực quan**: Biểu đồ phân bổ 7 loại Intent và Biểu đồ xu hướng giải quyết hội thoại trong 7 ngày qua.

---

## 4. Đặc Tả Trạng Thái Giao Diện (Comprehensive UI States Matrix)

Mọi thành phần giao diện đều bắt buộc đáp ứng đầy đủ 9 trạng thái giao diện chuẩn:

| Trạng Thái (UI State) | Đặc Tả Hành Vi & Trực Quan |
| :--- | :--- |
| **1. Loading** | Hiển thị Skeleton nhấp nháy xám nhẹ (Pulse animation) đúng tỷ lệ khung hình thực tế; không dùng thanh loading toàn trang gây giật mắt. |
| **2. Empty State** | Hiển thị hình minh họa vector nhẹ nhàng kèm câu hướng dẫn rõ ràng: *"Hộp thư đang trống. Toàn bộ yêu cầu hỗ trợ đã được xử lý xong!"* |
| **3. Error State** | Thanh bên AI Co-pilot hiển thị Banner viền vàng nhạt khi rớt mạng: *"Gợi ý AI tạm thời gián đoạn. Bạn vẫn có thể soạn tin nhắn thủ công. [Nút Thử lại]"*. Tuyệt đối không khóa ô nhập liệu. |
| **4. Disabled State** | Nút bấm chuyển sang màu xám `Slate-300`, chữ `Slate-500`, con trỏ chuột `cursor-not-allowed`, vô hiệu hóa sự kiện `onClick`. |
| **5. Focus State** | Mọi thành phần tương tác khi nhấn `Tab` đều hiển thị đường viền `ring-2 ring-indigo-500 ring-offset-2` rõ ràng, không bị ẩn outline. |
| **6. Keyboard Nav** | Hỗ trợ phím tắt chuyên nghiệp: `Ctrl + Enter` để gửi tin nhắn; `Alt + I` để chèn nhanh bản nháp AI; `Esc` để đóng modal/dropdown; mũi tên `Up/Down` để duyệt danh sách hội thoại. |
| **7. Touch & Tap** | Các nút bấm, icon thao tác đều có diện tích bấm tối thiểu **44 x 44 px** trên màn hình cảm ứng, tránh bấm nhầm. |
| **8. Responsive View** | **Desktop (>= 1280px)**: 3 cột cố định song song.<br>**Tablet (768px - 1279px)**: 2 cột (Cột 1 Inbox + Cột 2 Chat), Sidebar AI thu gọn thành thanh trượt (Slide-over Drawer).<br>**Mobile (< 768px)**: 1 cột đơn, điều hướng chuyển đổi tab bằng thanh Bottom Navigation. |
| **9. Reduced Motion** | Khi người dùng bật `prefers-reduced-motion: reduce` trong cài đặt OS: Tắt toàn bộ hiệu ứng chuyển động trượt, đổi thành hiệu ứng mờ dần (opacity fade) hoặc đổi trạng thái tức thì (< 1ms). |

---

## 5. Tiêu Chuẩn Khả Năng Tiếp Cận & Rào Chắn Thiết Kế (Accessibility & Guardrails)

1. **Độ tương phản màu sắc (Color Contrast)**:
   - Toàn bộ văn bản thông thường (Regular text) đạt độ tương phản tối thiểu **4.5:1** so với màu nền.
   - Các biểu tượng và thành phần giao diện phi văn bản (Icons, input borders) đạt tối thiểu **3.0:1**.
2. **Thuộc tính ARIA & Trình đọc màn hình (Screen Readers)**:
   - Các icon hành động (Send, Insert Draft, Thumb up/down) đều có `aria-label` mô tả rõ ràng bằng tiếng Việt.
   - Khung gợi ý AI được đánh dấu bằng thuộc tính `aria-live="polite"` để thông báo cho người khiếm thị khi có bản nháp mới sinh ra mà không làm gián đoạn việc đọc tin nhắn của khách.
3. **Phím tắt nhanh (Productivity Shortcuts)**:
   - `Ctrl + Enter`: Gửi tin nhắn.
   - `Alt + I`: Chèn ngay bản nháp gợi ý từ AI vào ô soạn thảo.
   - `Esc`: Đóng các hộp thoại, dropdown đang mở.

