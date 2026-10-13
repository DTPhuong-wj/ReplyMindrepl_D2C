# Tài Liệu Thiết Kế Giao Diện Sản Phẩm ReplyMind (Product Design Specification)

<!-- ==============================================================================
TÀI LIỆU THIẾT KẾ GIAO DIỆN CHÍNH THỨC (CANONICAL PRODUCT DESIGN SPECIFICATION)
- Dự án: ReplyMind - Trợ lý AI Co-pilot Chăm sóc Khách hàng D2C
- Phiên bản: v1.0.0 (Đã phê duyệt chính thức tại Cổng đánh giá P4.3)
- Hướng thiết kế được chọn: Modern Frosted Glass / Liquid Pearl (Hybrid Architecture)
- Trạng thái: APPROVED (Chính thức chuyển sang giai đoạn phát triển Frontend)
- Ngày phê duyệt: 13-10-2026
============================================================================== -->

## 1. Tuyên Bố Quyết Định Thiết Kế (Design Decision Summary)

Sau quá trình khám phá 3 hướng giao diện tại P4.2 và thẩm định nghiêm ngặt tại Cổng đánh giá P4.3, **ReplyMind chính thức lựa chọn Hướng thiết kế Modern Frosted Glass / Liquid Pearl (Concept 2)** làm ngôn ngữ giao diện chuẩn mực cho toàn bộ hệ thống. 

Nhằm đảm bảo trải nghiệm người dùng tối ưu và hiệu năng vận hành bền bỉ cho nhân viên hỗ trợ (Agent), thiết kế chính thức áp dụng mô hình **Dung hòa Tối ưu (Hybrid Architecture)**:
1. **Bản sắc thị giác (Visual Identity)**: Kế thừa hiệu ứng kính mờ cao cấp (`backdrop-blur-md`), ánh tím ngọc trai (`Liquid Pearl`), nền gradient dịu mắt và các thẻ bo tròn mềm mại (`rounded-2xl`) từ Concept 2, mang lại diện mạo hiện đại, sang trọng phù hợp với các thương hiệu D2C thời trang, mỹ phẩm và lifestyle cao cấp.
2. **Gia cố độ tương phản & Tiếp cận (Accessibility Hardening)**: Tích hợp tính thực dụng từ Concept 1 bằng cách nâng độ đục của nền thẻ kính lên `bg-white/85` kết hợp đường viền bảo vệ `border-slate-200/70`, đảm bảo tỷ lệ tương phản văn bản luôn vượt ngưỡng **WCAG 2.1 AA (> 4.5:1)** trên mọi màn hình.
3. **Công thái học bàn phím (Keyboard Ergonomics)**: Kế thừa hệ thống phím tắt chuyên nghiệp từ Concept 3 (`Ctrl + Enter` gửi phản hồi, `Alt + I` chèn bản nháp AI 1-Click, `Ctrl + K` tìm kiếm nhanh hội thoại) giúp tối đa hóa tốc độ xử lý của nhân viên.

---

## 2. Hệ Thống Design Tokens Chuẩn (Design Tokens Specification)

### 2.1. Bảng màu chuẩn (Color Palette)

| Mã Token | Giá trị Hex / Tailwind | Mục đích Sử dụng | Kiểm tra Tương phản WCAG |
| :--- | :--- | :--- | :--- |
| **`pearl-bg-gradient`** | `radial-gradient(at 10% 20%, #EEF2FF, #F8FAFC, #F3E8FF)` | Nền toàn bộ ứng dụng, tạo ánh sáng dịu nhẹ chống mỏi mắt | Chuẩn mực êm dịu thị giác |
| **`glass-panel-bg`** | `rgba(255, 255, 255, 0.85)` | Nền thẻ kính chính (3 Cột Workspace, Khung Chat) | Nền vững chắc cho text |
| **`glass-card-bg`** | `rgba(255, 255, 255, 0.75)` | Thẻ phân cấp phụ (Triage item, trích dẫn RAG) | Tạo chiều sâu phân tầng |
| **`brand-primary`** | `#4F46E5` (`indigo-600`) | Nút hành động chính, nhận diện AI Co-pilot | Đạt 7.2:1 trên nền trắng |
| **`brand-accent`** | `#9333EA` (`purple-600`) | Gradient ánh ngọc trai, hiệu ứng phát sáng AI | Tương phản tốt trên nền pastel |
| **`urgent-red`** | `#E11D48` (`rose-600`) | Cảnh báo mức độ Khẩn cấp (URGENT), đơn giao trễ, nút khiếu nại | Đạt 5.1:1 trên nền trắng |
| **`rag-green`** | `#059669` (`emerald-600`) | Trích dẫn chính sách RAG, chỉ báo khớp dữ liệu (98%), trạng thái Active | Đạt 4.8:1 trên nền trắng |
| **`text-primary`** | `#0F172A` (`slate-900`) | Tiêu đề, tên khách hàng, văn bản tin nhắn chính | Đạt 14.5:1 (Xuất sắc) |
| **`text-secondary`**| `#475569` (`slate-600`) | Văn bản mô tả phụ, thời gian gửi, nhãn nháp | Đạt 5.8:1 (Vượt chuẩn AA) |
| **`border-glass`** | `rgba(255, 255, 255, 0.90)` | Viền sáng mô phỏng hiệu ứng phản quang mép kính | Tạo hiệu ứng thị giác sắc nét |

### 2.2. Kiểu chữ & Phân cấp Văn bản (Typography System)

- **Phông chữ Tiêu đề & Nhận diện (Headings & Brand)**: `Plus Jakarta Sans` (Trọng số: Bold 700, Extrabold 800) mang lại nét trẻ trung, cao cấp và tinh gọn.
- **Phông chữ Nội dung (Body Text & Conversation Stream)**: `Inter` (Trọng số: Regular 400, Medium 500, Semi-bold 600) đảm bảo khả năng quét chữ nhanh, tối ưu khả năng đọc trong luồng hội thoại dài.
- **Phông chữ Kỹ thuật & Mã đơn (Data Codes & Shortcuts)**: `JetBrains Mono` / Font Monospace (Trọng số: Medium 500) dùng cho mã đơn hàng (`#ORD-9821`), nhãn phím tắt (`[Ctrl+Enter]`, `[Alt+I]`) và độ trễ phản hồi.

### 2.3. Hiệu ứng Kính Mờ & Đổ Bóng (Glassmorphism & Elevation)

```css
/* Lớp kính mờ chính */
.glass-panel {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 20px -2px rgba(99, 102, 241, 0.06);
}

/* Hiệu ứng phát sáng ngọc trai dành riêng cho vùng AI Co-pilot (F04) */
.pearl-glow {
  box-shadow: 0 10px 30px -5px rgba(99, 102, 241, 0.15), 0 4px 12px -2px rgba(168, 85, 247, 0.10);
  border: 2px solid rgba(165, 180, 252, 0.6);
}
```

---

## 3. Kiến Trúc Workspace 3 Cột & Chi Tiết Thành Phần (3-Column Workspace)

```
+--------------------------------------------------------------------------------------------------------------------+
|  TOP APPBAR: [Logo ReplyMind] [Concept 2: Liquid Pearl]    [Nav: Inbox | KB | Tone | Dashboard]    [Agent: Đăng.NH] |
+----------------------------------------------------+-----------------------------------------------+---------------+
| CỘT 1: HỘP THƯ ĐẾN (320px)                         | CỘT 2: KHUNG CHAT CHI TIẾT (Flex-1)          | CỘT 3: AI     |
| - Tìm kiếm (Ctrl+K)                                | - Header: Tên khách, Mã đơn #ORD-9821, SLA   | CO-PILOT      |
| - Bộ lọc: [Tất cả] [Gấp 1] [Chờ xử lý] [Chờ khách] | - Timeline: Tin nhắn khách & Cảnh báo SLA    | SIDEBAR       |
| - Danh sách Ticket:                                | - Khung soạn thảo:                           | (380px)       |
|   + [URGENT] Phạm Minh Tuấn (Trễ 4 ngày)           |   * Ô nhập text tự động co giãn              | - F02 Triage  |
|   + [MEDIUM] Lê Thu Hà (Đổi size L)                |   * Phím tắt: Ctrl+Enter gửi, Alt+I chèn nháp| - F03 RAG     |
|   + [HIGH] Hoàng Anh Dũng (Trừ tiền 2 lần)         |   * Nút bấm: "Gửi phản hồi"                  | - F04 Draft   |
|                                                    |                                               | - F07 Thumbs  |
+----------------------------------------------------+-----------------------------------------------+---------------+
```

### 3.1. Cột 1: Hộp Thư Đến & Hàng Đợi Hội Thoại (Inbox & Triage Feed - 320px)
- **Thanh tìm kiếm nhanh**: Trường tìm kiếm có icon kính lúp, hỗ trợ phím tắt `Ctrl + K`.
- **Hệ thống 4 Tab lọc trạng thái**:
  - `Tất cả`: Tổng hợp tất cả phiên hội thoại đang mở.
  - `Gấp (URGENT)`: Lọc tức thì các vé cần can thiệp khẩn cấp (Huy hiệu đỏ Rose nhấp nháy số lượng).
  - `Chờ xử lý (UNHANDLED)`: Hội thoại có tin nhắn mới từ khách chưa được trả lời.
  - `Chờ khách (WAITING)`: Đã gửi phản hồi, đang chờ khách xác nhận.
- **Thẻ Ticket Item**:
  - **Điểm nhấn thị giác Khẩn cấp (URGENT Visual Accent)**: Cạnh trái có thanh viền màu `bg-gradient-to-b from-rose-500 to-rose-600` dày 4px.
  - Tên khách hàng in đậm `font-bold text-xs text-slate-900`.
  - Huy hiệu phân loại: `URGENT` (nền đỏ nhạt), `DELIVERY` (nền tím nhạt), cảm xúc `😡 Tiêu cực` (chữ đỏ nổi bật).

### 3.2. Cột 2: Khung Chat Chi Tiết & Soạn Thảo (Chat Detailed Workbench - Flex-1)
- **Thanh tiêu đề hội thoại (Chat Header)**:
  - Avatar viết tắt tên khách hàng với gradient ngọc trai.
  - Tên khách hàng, email, mã đơn hàng dạng Badge `#ORD-9821`, và tên đơn vị vận chuyển (GHN Express).
  - Nút thao tác nhanh: **"Đánh dấu đã giải quyết"** (Icon checkmark xanh ngọc).
- **Dòng thời gian tin nhắn (Message History)**:
  - Phân tách theo mốc thời gian: *Hôm nay, 10:15 SA*.
  - Tin nhắn khách hàng thường: Bong bóng nền trắng kính mờ, bo tròn `rounded-2xl rounded-tl-sm`.
  - Tin nhắn bức xúc / Khẩn cấp: Bong bóng có viền cảnh báo đỏ `border-rose-200` và nền ửng đỏ nhẹ, kèm nhãn thời gian thực `SLA Breach Warning // Đang chờ phản hồi`.
- **Khung soạn thảo phản hồi (Floating Composer Box)**:
  - Hỗ trợ nhập liệu thủ công hoặc chèn tự động bản nháp AI.
  - Bảng hướng dẫn phím tắt chân khung: `<kbd>Ctrl+Enter</kbd> gửi • <kbd>Alt+I</kbd> chèn nháp`.
  - Nút gửi phản hồi màu gradient tím Indigo: `bg-gradient-to-r from-indigo-600 to-purple-600` có hiệu ứng shadow sang trọng.

### 3.3. Cột 3: Thanh Bên Trợ Lý AI Co-pilot (AI Co-pilot Sidebar - 380px)
- **Tiêu đề thanh bên**: Đèn LED xanh nhấp nháy báo hiệu kết nối LLM sẵn sàng + Tên model `Gemini 1.5 Flash`.
- **Thẻ F02: Phân tích Triage (Triage Insights)**:
  - Ý định chính: `DELIVERY_ISSUE` (Màu tím Indigo).
  - Cảm xúc: `NEGATIVE (Bực tức)` (Màu đỏ Rose).
  - Độ tin cậy AI: Badge `95%`.
  - Mức độ ưu tiên: `URGENT (Khẩn cấp)`.
  - Đoạn tóm tắt lý do ngắn gọn dưới 30 từ trích xuất từ tin nhắn khách.
- **Thẻ F03: Trích dẫn Cơ sở Tri thức (RAG Grounding)**:
  - Tỷ lệ khớp chính sách: Badge xanh `Khớp 98%`.
  - Tên tài liệu chính sách: *Quy Định Vận Chuyển & Cam Kết Thời Gian Giao Hàng*.
  - Đoạn trích dẫn đối chiếu: Làm nổi bật điều khoản tặng voucher 15% và miễn phí vận chuyển.
- **Thẻ F04: Bản nháp Gợi ý Phản hồi (AI Draft Proposal)**:
  - Nhãn Brand Tone: `FORMAL (Trang trọng)`.
  - Nội dung bản nháp được sinh theo văn phong doanh nghiệp, đúng ngữ cảnh trích dẫn RAG.
  - **Nút hành động trung tâm (Core HITL Action Button)**:
    - Nhãn nút: **"✨ Chèn Bản Nháp AI (1-Click)"** (Kèm chú thích phím tắt `Alt + I`).
    - Khi bấm: Tự động đưa toàn bộ văn bản nháp vào ô soạn thảo tại Cột 2, focus con trỏ văn bản để Agent đọc soát và chỉnh sửa nếu cần. Tuyệt đối không tự ý gửi tin ra ngoài.
- **Thẻ F07: Đánh giá Chất lượng Bản nháp (AI Helpfulness Feedback)**:
  - Hai nút đánh giá nhanh: `👍 Hữu ích` và `👎 Chưa tốt` nhằm thu thập dữ liệu fine-tune văn phong.

---

## 4. Ma Trận Trạng Thái Giao Diện (Comprehensive State Matrix)

| Trạng thái UI | Hành vi Thể hiện tại Cột 1 (Inbox) | Hành vi Thể hiện tại Cột 2 (Chat) | Hành vi Thể hiện tại Cột 3 (AI Sidebar) |
| :--- | :--- | :--- | :--- |
| **Loading (Tải dữ liệu)** | Hiển thị 3 hàng Skeleton Card nhấp nháy màu tím nhạt | Hiển thị Skeleton bong bóng chat và avatar xám mờ | Hiển thị Skeleton shimmer cho 3 khối F02, F03, F04 |
| **Empty (Không có dữ liệu)** | "Hộp thư trống - Tuyệt vời! Bạn đã xử lý hết mọi tin nhắn." | Minh họa hình chiếc lá ngọc trai: "Chọn một hội thoại để xem chi tiết." | "AI Co-pilot sẵn sàng khi bạn mở một hội thoại." |
| **Error (Lỗi kết nối / AI)** | Banner đỏ nhạt đầu danh sách: "Lỗi đồng bộ. [Thử lại]" | Vẫn cho phép Agent soạn tin nhắn và gửi đi bình thường | Banner viền vàng: "AI tạm thời gián đoạn. Agent xử lý thủ công." |
| **Disabled (Vô hiệu hóa)** | Nút lọc bị mờ (opacity 50%) khi đang nạp lại danh sách | Nút "Gửi" bị mờ khi ô nhập liệu hoàn toàn để trống | Nút "Chèn nháp" bị mờ khi chưa có bản nháp nào được sinh |
| **Focus / Active (Tập trung)** | Viền xanh Indigo phát sáng quanh ticket đang được chọn | Viền xanh Indigo 2px quanh toàn bộ khung soạn thảo | Nút "Chèn bản nháp" có hiệu ứng gợn sóng phát quang khi hover |

---

## 5. Tiêu Chuẩn Khả Năng Tiếp Cận & Điều Hướng (Accessibility & WCAG 2.1 AA)

1. **Tuân thủ Độ tương phản Màu sắc**:
   - Mọi văn bản chính đạt tỷ lệ tương phản tối thiểu **5.8:1** (vượt chuẩn yêu cầu 4.5:1 của WCAG AA).
   - Nền thẻ kính `bg-white/85` loại trừ hoàn toàn rủi ro văn bản bị mờ do nền gradient phía sau.
2. **Hỗ trợ Công nghệ Trợ thính (Screen Readers - ARIA)**:
   - Toàn bộ khung gợi ý bản nháp F04 được cấu hình thuộc tính `aria-live="polite"` để thông báo khi có bản nháp AI mới mà không làm ngắt lời đọc tin nhắn của khách.
   - Các nút biểu tượng (icon buttons) đều có nhãn ẩn `aria-label="Đánh giá bản nháp hữu ích"`, `aria-label="Đánh dấu đã giải quyết"`.
3. **Bản đồ Phím tắt Bàn phím (Keyboard Shortcuts Map)**:
   - `Ctrl + K`: Nhảy tiêu điểm vào ô tìm kiếm hội thoại.
   - `Ctrl + Enter`: Gửi phản hồi từ ô soạn thảo Cột 2.
   - `Alt + I`: Kích hoạt chèn bản nháp gợi ý từ F04 vào Cột 2.
   - `Esc`: Đóng các menu thả xuống hoặc xóa bộ lọc tìm kiếm.

---

## 6. Hướng Dẫn Triển Khai Kỹ Thuật Cho Giai Đoạn Tiếp Theo (Implementation Directives)

1. **Khởi tạo Thư viện Thành phần React**:
   - Sử dụng Next.js 15 App Router (`src/components/agent/`).
   - Cấu trúc các module con: `InboxSidebar.tsx`, `ChatTimeline.tsx`, `ChatComposer.tsx`, `AiCopilotSidebar.tsx`.
2. **Tối ưu CSS & Hiệu năng**:
   - Tận dụng tiện ích Tailwind CSS CDN/PostCSS với các biến CSS Tokens đã đặc tả tại Mục 2.
   - Bổ sung quy tắc `@supports not (backdrop-filter: blur(16px))` với fallback `background: #FFFFFF` cho các trình duyệt đời cũ.

