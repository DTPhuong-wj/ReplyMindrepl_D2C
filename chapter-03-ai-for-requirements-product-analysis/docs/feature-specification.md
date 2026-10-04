# TÀI LIỆU ĐẶC TẢ TÍNH NĂNG CHI TIẾT: REPLYMIND (FEATURE SPECIFICATION)

<!-- ==============================================================================
THÔNG TIN TÀI LIỆU (FEATURE SPEC METADATA)
- Tên dự án: ReplyMind - AI Co-pilot for D2C Customer Support
- Tài liệu: Feature Specification (Đặc tả Tính năng Chi tiết Phục vụ Thiết kế & Lập trình)
- Phiên bản: 1.0.0
- Ngày phê duyệt: 04-10-2026
- Trạng thái: APPROVED (Đã được con người kiểm duyệt và phê duyệt chính thức)
- Nguồn tham chiếu:
  + chapter-03-ai-for-requirements-product-analysis/docs/product-requirements.md (PRD v1.1.0)
  + chapter-02-prompt-engineering/docs/project-context.md
- Tiến trình thực hiện: P3.3 - Feature Specification ($prd-generator)
============================================================================== -->

## 1. Tổng Quan Kiến Trúc Hành Vi (Behavioral Architecture Overview)

ReplyMind là bàn làm việc Co-pilot hỗ trợ chăm sóc khách hàng (CSKH) theo triết lý **Human-in-the-Loop 100%**. Hệ thống hoạt động theo mô hình điều phối sự kiện thời gian thực giữa:
$$\text{Khách hàng} \xrightarrow{\text{Webhook / Mock}} \text{Hộp thư F01} \xrightarrow{\text{Trigger}} \text{Bộ máy AI (F02 + F03 + F04)} \xrightarrow{\text{Hiển thị}} \text{Bàn làm việc F05} \xrightarrow{\text{Nhân viên duyệt / sửa}} \text{Gửi khách} \xrightarrow{\text{Đánh giá}} \text{F07}$$

Mọi hành vi trong tài liệu này đều được liên kết trực tiếp với các mã định danh **US-\*** (User Stories) và **FR-\*** (Functional Requirements) đã được duyệt trong tài liệu PRD.

---

## 2. Xác Thực Giả Lập & Kiểm Soát Truy Cập (Auth Simulator & RBAC)

### 2.1. Bộ Chuyển Đổi Vai Trò (Role Switcher Component)
- **Vị trí hiển thị**: Góc trên bên phải của thanh điều hướng chính (Top Navigation Bar).
- **Danh sách tài khoản hỗ trợ**:
  1. `AGENT`: Nguyễn Hải Đăng (Mã: `usr_agent_01`, Email: `dang.nguyen@replymind.io`, Quyền: Nhân viên hỗ trợ tuyến đầu).
  2. `SUPERVISOR / ADMIN`: Trần Thị Mai (Mã: `usr_supervisor_02`, Email: `mai.tran@replymind.io`, Quyền: Quản lý & Giám sát CSKH).
- **Hành vi chuyển đổi**:
  - Khi người dùng chọn vai trò từ dropdown, ngữ cảnh phiên làm việc (`CurrentSessionContext`) cập nhật tức thì trong thời gian **< 50ms** mà không làm tải lại toàn bộ trang (Zero Page Reload).
  - Tự động lọc và hiển thị danh mục menu phù hợp với vai trò vừa chọn.

### 2.2. Quy Tắc Bảo Vệ Đường Dẫn (Navigation Route Guard)
- **Ma trận phân quyền đường dẫn**:
  - Route `/agent/*`: Cả `AGENT` và `ADMIN` đều có toàn quyền truy cập.
  - Route `/admin/*` và `/knowledge-base/*`: **CHỈ** `ADMIN` mới có quyền truy cập.
- **Hành vi bảo vệ (Observable Route Guard Behavior)**:
  - Khi vai trò hiện tại là `AGENT`, các nút điều hướng "Quản lý Tri thức" và "Cài đặt Văn phong" trên thanh menu sẽ tự động bị ẩn (`display: none`).
  - Nếu người dùng nhập URL trực tiếp trên thanh địa chỉ trình duyệt (ví dụ: gõ `/admin/brand-tone`), Middleware sẽ chặn lại, thực hiện HTTP 307 Redirect về `/agent/inbox` và kích hoạt Toast cảnh báo màu vàng: *"Bạn không có quyền truy cập trang quản trị này."*

---

## 3. Vòng Đời Cuộc Hội Thoại & Vòng Đời Phân Tích AI

### 3.1. Máy Trạng Thái Cuộc Hội Thoại (Conversation State Machine)
Mỗi cuộc hội thoại (`Conversation`) tuân thủ nghiêm ngặt 4 trạng thái vòng đời sau:

```
      [Tin nhắn mới từ khách]
                 │
                 ▼
              ( OPEN ) ◄──────────────────────────────┐
                 │                                    │
       [Agent bấm nút gửi tin]             [Khách gửi tin nhắn mới]
                 │                                    │
                 ▼                                    │
       ( PENDING_CUSTOMER ) ──────────────────────────┘
                 │
      [Agent bấm 'Đã giải quyết']
                 │
                 ▼
            ( RESOLVED )
                 │
         [Sau 48h không có tin mới]
                 │
                 ▼
             ( CLOSED )
```

- **Quy tắc chuyển dịch trạng thái**:
  1. Khi một tin nhắn mới từ khách hàng xuất hiện (qua Webhook hoặc Mock): Trạng thái hội thoại luôn tự động chuyển về `OPEN`.
  2. Khi Agent bấm gửi câu trả lời gợi ý hoặc câu tự soạn: Trạng thái tự động chuyển thành `PENDING_CUSTOMER`.
  3. Khi Agent bấm nút "Đánh dấu đã giải quyết": Trạng thái chuyển thành `RESOLVED`.
  4. Sau 48 giờ ở trạng thái `RESOLVED` mà không có tin nhắn mới từ khách: Tự động chuyển thành `CLOSED` (Chế độ lưu trữ chỉ đọc).

### 3.2. Vòng Đời Phân Tích AI F02 (AI Analysis Pipeline)
Khi một tin nhắn mới của khách hàng xuất hiện:
1. **Trigger**: Kích hoạt tự động luồng phân tích nền bất đồng bộ (Non-blocking async task).
2. **LLM Inference**: Chuyển nội dung tin nhắn vào System Prompt `F02_intent_sentiment_v2.txt`.
3. **Structured Mapping**:
   - `intent`: Gán vào 1 trong 7 nhóm chuẩn (`ORDER_STATUS`, `SHIPPING`, `DELIVERY_ISSUE`, `RETURN`, `REFUND`, `PRODUCT_QUESTION`, `COMPLAINT`).
   - `sentiment`: Gán vào 1 trong 3 mức (`POSITIVE`, `NEUTRAL`, `NEGATIVE`).
   - `priority`: Gán vào 1 trong 4 cấp (`LOW`, `MEDIUM`, `HIGH`, `URGENT`).
4. **Cập nhật CSDL & Giao diện**: Ghi nhận `latestSentiment`, `detectedIntent` và `priority` vào bản ghi `Conversation` và cập nhật huy hiệu màu tức thì trên giao diện Agent.

---

## 4. Đặc Tả Chi Tiết Các Luồng Thao Tác (Detailed User Flows)

### 4.1. Luồng Chính (Main Flow: 1-Click Send Phản Hồi AI Co-pilot)
- **Bước 1**: Agent truy cập bàn làm việc tại đường dẫn `/agent/inbox`.
- **Bước 2**: Agent click chọn cuộc hội thoại có mức ưu tiên `URGENT` ở đầu danh sách (Ví dụ: Đơn trễ #ORD-9821 của khách hàng Phạm Minh Tuấn).
- **Bước 3**: Khung chat chính tải toàn bộ dòng thời gian tin nhắn; đồng thời Thanh bên AI Co-pilot (Sidebar) kích hoạt luồng F02, F03, F04:
  - **F02 hiển thị**: Huy hiệu đỏ `URGENT`, Nhãn `DELIVERY_ISSUE`, Cảm xúc `NEGATIVE` kèm điểm tin cậy `0.96`.
  - **F03 hiển thị**: Thẻ trích dẫn chính sách "Quy định xử lý giao chậm & bồi thường - Điều 2: Tặng voucher 15% khi trễ > 3 ngày".
  - **F04 hiển thị**: Khung màu xanh chứa bản nháp hoàn chỉnh đúng văn phong `FORMAL` / `FRIENDLY` kèm nút bấm to màu chàm: **"Chèn Bản Nháp AI"**.
- **Bước 4 (Hành vi 1-Click)**:
  - Agent bấm nút **"Chèn Bản Nháp AI"**.
  - Hệ thống sao chép toàn bộ văn bản của bản nháp vào ô soạn thảo (`textarea`) phía dưới khung chat.
  - Con trỏ chuột tự động focus vào cuối đoạn văn bản, cho phép Agent đọc duyệt hoặc sửa đổi tùy ý.
- **Bước 5 (Gửi tin & Đánh giá)**:
  - Agent bấm nút **"Gửi phản hồi"** (hoặc nhấn tổ hợp phím tắt `Ctrl + Enter`).
  - Tin nhắn hiển thị ngay lập tức trên luồng chat với tư cách người gửi là `AGENT`.
  - Hệ thống tự động so sánh chuỗi để ghi nhận bản ghi `AIFeedback`: Nếu không sửa -> `ACCEPTED_UNMODIFIED`; nếu có sửa -> `ACCEPTED_WITH_EDITS`.
  - Thanh bên hiển thị 2 nút đánh giá nhanh 👍 / 👎 để Agent bấm chấm điểm chất lượng câu gợi ý.

### 4.2. Luồng Thay Thế (Alternative Flows)
- **Alt-01 (Agent tự soạn thảo không dùng gợi ý)**:
  - Agent đọc tin nhắn nhưng quyết định không bấm nút "Chèn Bản Nháp AI", tự gõ nội dung trả lời riêng và bấm Gửi.
  - Hệ thống ghi nhận trạng thái bản nháp đó là `REJECTED`.
- **Alt-02 (Agent đổi Brand Tone trực tiếp on-the-fly)**:
  - Trên thanh bên Co-pilot, Agent click chọn nút chuyển nhanh phong cách từ `FRIENDLY` sang `FORMAL`.
  - Hệ thống gọi lại F04 với Brand Tone mới và cập nhật bản nháp mới trong vòng < 1.5s mà không cần reload trang.
- **Alt-03 (Webhook nhận tin nhắn động từ bên ngoài)**:
  - Một hệ thống bên ngoài gửi HTTP POST tới `/api/conversations/[id]/messages`.
  - Hệ thống lưu tin nhắn mới vào CSDL, cập nhật trạng thái hội thoại thành `OPEN`, và tự động đẩy cập nhật lên giao diện Agent.

### 4.3. Luồng Xử Lý Lỗi (Error Flows & Phục Hồi Gián Đoạn)
- **Err-01 (Mạng ngắt kết nối hoặc LLM Timeout > 2.5s)**:
  - Nếu kết nối tới API Gemini/OpenAI bị gián đoạn hoặc vượt ngưỡng timeout 2.5s, thanh bên AI Co-pilot KHÔNG bị sập giao diện (No UI Crash).
  - Hiển thị Banner cảnh báo màu vàng: *"Gợi ý AI tạm thời gián đoạn. Bạn có thể tự soạn tin nhắn hoặc bấm 'Thử lại'"*.
  - Ô soạn thảo tin nhắn của Agent vẫn hoạt động 100% bình thường; Agent tự do gõ tin nhắn và gửi đi mà không bị bất kỳ rào cản nào.
  - Nút **"Thử lại"** cho phép gọi lại tác vụ sinh gợi ý khi mạng ổn định trở lại.
- **Err-02 (LLM trả về định dạng JSON lỗi)**:
  - Hàm `cleanAndParseJson` phát hiện lỗi cú pháp JSON -> Kích hoạt cơ chế Fallback Engine cục bộ (`simulateF02Analysis` / `simulateF04Reply`) đảm bảo dữ liệu hiển thị tức thì cho Agent mà không văng exception ra màn hình.

---

## 5. Đặc Tả Trạng Thái Giao Diện Người Dùng Bắt Buộc (UI States)

Mỗi mô-đun UI bắt buộc phải thiết kế và xử lý đủ **4 trạng thái hiển thị chuẩn**:

| Mô-đun Giao Diện | Trạng Thái Loading | Trạng Thái Empty | Trạng Thái Error | Trạng Thái Success |
| :--- | :--- | :--- | :--- | :--- |
| **Hộp Thư Đến (F01)** | Hiển thị 3 khung Skeleton nhấp nháy xám mô phỏng hàng hội thoại. | Hiển thị minh họa hộp thư trống: *"Không có cuộc trò chuyện nào cần xử lý."* | Hiển thị Banner đỏ: *"Không thể tải danh sách hội thoại. [Nút Tải lại]"* | Hiển thị danh sách hội thoại kèm huy hiệu màu Priority và Intent. |
| **Khung Chat & Lịch Sử (F05)** | Hiển thị vòng xoay Spinner mờ ở giữa khung chat. | Hiển thị thông báo: *"Bắt đầu cuộc trò chuyện bằng cách gửi tin nhắn đầu tiên."* | Hiển thị thông báo lỗi gửi tin kèm nút *"Gửi lại"*. | Hiển thị đầy đủ bong bóng chat theo thứ tự thời gian tăng dần. |
| **AI Co-pilot Sidebar (F02/F04)** | Hiển thị Skeleton nhấp nháy tại ô Intent và ô Bản nháp ("Đang phân tích..."). | Hiển thị thông báo: *"Chọn một cuộc trò chuyện để AI bắt đầu phân tích."* | Hiển thị Banner vàng: *"AI gián đoạn. [Nút Thử lại]"* (Ô chat không bị khóa). | Hiển thị đầy đủ Intent, Sentiment, Priority, Trích dẫn RAG và Bản nháp câu trả lời. |
| **Quản Lý Tri Thức (F06)** | Skeleton bảng dữ liệu đang tải danh sách bài viết. | *"Chưa có bài viết chính sách nào. [Nút Thêm bài viết mới]"* | Báo lỗi không lưu được bài viết kèm thông báo nguyên nhân. | Hiển thị danh sách bài viết chính sách kèm nhãn `Published` xanh lá. |

---

## 6. Quy Tắc Xác Thực Dữ Liệu Tầng API & CSDL (Validation Schemas)

Mọi dữ liệu đầu vào tại các đầu mối API đều được kiểm định nghiêm ngặt bằng **Zod Schema**:

1. **Tin nhắn mới gửi đi (`CreateMessageSchema`)**:
   - `conversationId`: String không rỗng.
   - `content`: String có độ dài tối thiểu 1 ký tự, tối đa 2000 ký tự (loại trừ khoảng trắng thừa).
   - `senderType`: Enum `CUSTOMER | AGENT | AI_COPILOT | SYSTEM`.
2. **Cấu hình Brand Tone (`UpdateBrandToneSchema`)**:
   - `brandTone`: Enum `FRIENDLY | PROFESSIONAL | CASUAL | FORMAL`.
   - `customGuidelines`: String tùy chọn, tối đa 500 ký tự.
3. **Phản hồi đánh giá AI (`AIFeedbackSchema`)**:
   - `conversationId`: String hợp lệ.
   - `actionTaken`: Enum `ACCEPTED_UNMODIFIED | ACCEPTED_WITH_EDITS | REJECTED`.
   - `rating`: Số nguyên từ 1 đến 5 sao (hoặc null nếu bấm nhanh 👍/👎).

---

## 7. Ma Trận Truy Xuất Nguồn Gốc (Traceability Matrix)

| Mã Tính Năng | User Story | Yêu Cầu Chức Năng | Tiêu Chí Kiểm Thử (AC) | Trạng Thái Đặc Tả |
| :---: | :---: | :---: | :---: | :---: |
| **F01** | US-01 | FR-01.1, FR-01.2, FR-01.3 | AC-01 | ✅ Đã đặc tả hoàn tất |
| **F02** | US-02 | FR-02.1, FR-02.2, FR-02.3, FR-02.4 | AC-01 | ✅ Đã đặc tả hoàn tất |
| **F03** | US-03 | FR-03.1, FR-03.2, FR-03.3 | AC-02 | ✅ Đã đặc tả hoàn tất |
| **F04** | US-04 | FR-04.1, FR-04.2, FR-04.3, FR-04.4 | AC-02 | ✅ Đã đặc tả hoàn tất |
| **F05** | US-05 | FR-05.1, FR-05.2, FR-05.3, FR-05.4 | AC-03, AC-05 | ✅ Đã đặc tả hoàn tất |
| **F06** | US-06 | FR-06.1, FR-06.2, FR-06.3 | AC-02 | ✅ Đã đặc tả hoàn tất |
| **F07** | US-07 | FR-07.1, FR-07.2, FR-07.3 | AC-04 | ✅ Đã đặc tả hoàn tất |

