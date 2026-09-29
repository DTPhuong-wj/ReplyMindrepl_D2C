# TÀI LIỆU YÊU CẦU SẢN PHẨM: REPLYMIND (PRODUCT REQUIREMENTS DOCUMENT - PRD)

<!-- ==============================================================================
THÔNG TIN TÀI LIỆU (PRD METADATA)
- Tên dự án: ReplyMind - AI Co-pilot for D2C Customer Support
- Tài liệu: Product Requirements Document (PRD) Chính Thức
- Phiên bản: 1.0.0
- Ngày phê duyệt: 2026-11-11
- Trạng thái: APPROVED (Đã được con người kiểm duyệt và phê duyệt chính thức)
- Nguồn tham chiếu:
  + chapter-01-ai-in-software-engineering/docs/project-brief.md
  + chapter-02-prompt-engineering/docs/project-context.md
- Tiến trình thực hiện: P3.1 - Create PRD ($prd-generator)
============================================================================== -->

## 1. Tầm Nhìn & Mục Tiêu Sản Phẩm (Product Vision & Goals)

### 1.1. Tầm nhìn Sản phẩm
**ReplyMind** là hệ thống AI Co-pilot hỗ trợ chăm sóc khách hàng (CSKH) định hướng Web-first, thiết kế chuyên biệt cho các thương hiệu Bán lẻ Trực tiếp tới Người tiêu dùng (D2C). 

Hệ thống vận hành theo nguyên tắc cốt lõi **"Con người kiểm duyệt tối cao" (Strict Human-in-the-Loop - HITL)**: AI đóng vai trò phân tích ý định, đo lường cảm xúc, tra cứu tài liệu chính sách và đề xuất bản nháp câu trả lời; nhân viên CSKH con người là người đọc, chỉnh sửa và bấm nút gửi ra bên ngoài.

### 1.2. Mục tiêu Định lượng (Acceptance Signals & KPIs)
- **K-01 (Tốc độ phản hồi)**: Giảm **60% - 80%** thời gian phản hồi đầu tiên (First Response Time - FRT) và thời gian giải quyết yêu cầu (Average Handle Time - AHT).
- **K-02 (Độ chính xác AI)**: Độ chính xác phân loại ý định (Intent Accuracy) đạt **>= 85%**.
- **K-03 (Tỷ lệ đón nhận)**: Tỷ lệ nhân viên chấp thuận bản nháp gợi ý (Acceptance Rate) đạt **>= 70%** (bao gồm chấp thuận nguyên văn hoặc sau khi sửa nhẹ).
- **K-04 (Độ hữu ích)**: Điểm đánh giá hữu ích của AI (AI Helpful Rating) trung bình đạt **>= 4.0 / 5.0** sao.
- **K-05 (Kiểm soát ảo giác)**: **0%** trường hợp AI tự ý phát biểu sai lệch về chính sách đổi trả, bảo hành hoặc bồi thường (Zero Policy Hallucination).

---

## 2. Người Dùng, Vai Trò & Kiểm Soát Truy Cập (Users, Roles & RBAC)

Hệ thống hỗ trợ 2 vai trò người dùng nội bộ, đi kèm thanh chuyển đổi vai trò nhanh (Role Switcher) phục vụ kiểm thử tiện lợi trong MVP 9 ngày:

| Vai Trò | Người Dùng Mẫu | Trách Nhiệm Chính | Quyền Hạn (RBAC) |
| :--- | :--- | :--- | :--- |
| **Agent** (Nhân viên tuyến đầu) | `Nguyễn Hải Đăng` | Xử lý hội thoại, kiểm duyệt bản nháp AI, gửi tin nhắn, đánh giá gợi ý AI. | Xem Inbox; Gửi tin nhắn; Chèn bản nháp AI; Đánh giá 👍/👎. Không có quyền sửa Knowledge Base hoặc Brand Tone toàn cục. |
| **Supervisor / Admin** (Quản lý) | `Trần Thị Mai` | Giám sát chất lượng CSKH, cấu hình chính sách, quản lý văn phong thương hiệu. | Toàn quyền Agent + CRUD bài viết Knowledge Base; Cấu hình Brand Tone mặc định; Xem dashboard báo cáo chỉ số AI. |

---

## 3. Danh Mục Tính Năng Trong Phạm Vi MVP (F01 – F07)

Hệ thống tập trung hiện thực hóa trọn vẹn 7 tính năng cốt lõi:
- **F01**: Hộp thư Hợp nhất & Tiếp nhận Hội thoại (Inbox & Ingestion).
- **F02**: Bộ Phân tích Tin nhắn Tự động (7 Intent, 3 Sentiment, 4 Priority).
- **F03**: Cơ sở Tri thức & Đối chiếu Chính sách RAG (Knowledge Base RAG).
- **F04**: Bộ Sinh Câu Trả Lời AI Co-pilot theo 4 Brand Tone.
- **F05**: Bàn Làm Việc Kiểm Duyệt (Human-in-the-Loop Workbench).
- **F06**: Quản trị Cơ sở Tri thức & Cấu hình Brand Tone (Admin Panel).
- **F07**: Vòng lặp Phản hồi Đánh giá & Widget Điểm Hữu ích (AI Helpful Score).

---

## 4. Yêu Cầu Chức Năng Chi Tiết (Functional Requirements) & User Stories

### 4.1. F01 — Hộp thư Hợp nhất & Tiếp nhận Hội thoại
- **US-01**: Là một **Agent**, tôi muốn xem danh sách các cuộc hội thoại được sắp xếp theo mức độ ưu tiên (`URGENT` lên đầu) để tôi có thể xử lý các khách hàng bức xúc trước.
- **FR-01.1**: Hệ thống phải hiển thị danh sách hội thoại kèm: Tên khách hàng, email, trích đoạn tin nhắn mới nhất, nhãn Intent, nhãn Sentiment, huy hiệu Priority và thời gian cập nhật.
- **FR-01.2**: Hệ thống phải hỗ trợ bộ lọc đa chiều theo: Trạng thái (`OPEN`, `PENDING_CUSTOMER`, `RESOLVED`, `CLOSED`) và Mức ưu tiên (`LOW`, `MEDIUM`, `HIGH`, `URGENT`).
- **FR-01.3**: Hệ thống phải cung cấp sẵn 4 cuộc hội thoại D2C mẫu thực tế (giao trễ bực tức, đổi size áo, trừ tiền 2 lần, tư vấn giặt ủi) và 1 endpoint API Webhook (`POST /api/conversations/[id]/messages`) để tiếp nhận tin nhắn mới từ bên ngoài.

### 4.2. F02 — Bộ Phân tích Tin nhắn Tự động (AI Analyzer)
- **US-02**: Là một **Agent**, tôi muốn hệ thống tự động nhận diện ý định, cảm xúc và mức độ khẩn cấp của khách hàng ngay khi có tin nhắn mới để tôi nắm bắt ngữ cảnh trong 3 giây.
- **FR-02.1**: Hệ thống phải phân loại chính xác tin nhắn vào **1 trong 7 nhóm Intent**:
  `ORDER_STATUS`, `SHIPPING`, `DELIVERY_ISSUE`, `RETURN`, `REFUND`, `PRODUCT_QUESTION`, `COMPLAINT`.
- **FR-02.2**: Hệ thống phải đánh giá cảm xúc theo **1 trong 3 mức Sentiment**: `POSITIVE`, `NEUTRAL`, `NEGATIVE`.
- **FR-02.3**: Hệ thống phải xếp loại mức độ ưu tiên theo **1 trong 4 cấp Priority**: `LOW`, `MEDIUM`, `HIGH`, `URGENT`. (Gắn `URGENT` khi giao trễ > 3 ngày, đe dọa kiện/phốt, hoặc sentiment cực kỳ tiêu cực).
- **FR-02.4**: Đầu ra phân tích từ LLM bắt buộc tuân thủ định dạng JSON thuần chứa: `intent`, `sentiment`, `priority`, `confidence_score` (0.00 - 1.00) và `summary_reason`.

### 4.3. F03 — Cơ sở Tri thức & Đối chiếu Chính sách (Knowledge Base RAG)
- **US-03**: Là một **Agent**, tôi muốn xem các điều khoản chính sách liên quan trực tiếp đến vấn đề của khách để tôi đối chiếu tính xác thực trước khi trả lời.
- **FR-03.1**: Hệ thống phải lưu trữ 5 bài viết chính sách cốt lõi của thương hiệu D2C: Đổi trả 30 ngày, Vận chuyển & Giao chậm, Bảo hành 6 tháng, Hướng dẫn chọn size, Quy trình hoàn tiền.
- **FR-03.2**: Hệ thống phải tự động truy xuất các đoạn trích dẫn (Citations) có độ tương đồng ngữ nghĩa cao nhất với câu hỏi của khách hàng.
- **FR-03.3**: Hệ thống phải hiển thị rõ ràng nguồn trích dẫn (Tên bài viết + Điều khoản trích xuất) ngay trên thanh bên AI Co-pilot.

### 4.4. F04 — Bộ Sinh Câu Trả Lời AI Co-pilot (Reply Generator)
- **US-04**: Là một **Agent**, tôi muốn AI soạn thảo sẵn câu trả lời đầy đủ, đúng chính sách và chuẩn văn phong thương hiệu để tôi không phải gõ phím thủ công.
- **FR-04.1**: Hệ thống phải sinh câu trả lời tiếng Việt chuẩn mực dựa trên ngữ cảnh hội thoại, tài liệu chính sách RAG và Brand Tone đang được chọn.
- **FR-04.2**: Hệ thống phải hỗ trợ linh hoạt **4 phong cách Brand Tone**:
  - `FRIENDLY`: Xưng hô ấm áp, thấu cảm, cởi mở ("Dạ em chào anh/chị ạ...").
  - `PROFESSIONAL`: Chuẩn mực, trực diện vào giải pháp, câu từ gãy gọn.
  - `CASUAL`: Hiện đại, năng động, thân mật tự nhiên (hợp Gen Z).
  - `FORMAL`: Trang trọng, lịch thiệp, tôn trọng tuyệt đối (hợp xử lý sự cố nghiêm trọng).
- **FR-04.3 (Chống ảo giác)**: Tuyệt đối không sinh các cam kết hoặc số liệu không có trong tài liệu chính sách. Nếu thiếu thông tin, AI phải xin phép kiểm tra thêm hoặc hướng dẫn khách cung cấp mã đơn để tra cứu.
- **FR-04.4**: Đề xuất kèm 1 hành động nghiệp vụ cụ thể cho Agent (`suggested_action`).

### 4.5. F05 — Bàn Làm Việc Kiểm Duyệt (Human-in-the-Loop Workbench)
- **US-05**: Là một **Agent**, tôi muốn có nút "Sử dụng bản nháp" để chèn nhanh câu trả lời vào ô chat và chỉnh sửa theo ý mình trước khi bấm gửi.
- **FR-05.1**: Giao diện phải tách biệt hoàn toàn giữa: Khung hiển thị bản nháp AI Co-pilot và Ô soạn thảo tin nhắn chính thức.
- **FR-05.2**: Hệ thống phải cung cấp nút thao tác 1-Click "Chèn Bản Nháp AI" để sao chép nguyên văn câu gợi ý vào ô nhập liệu mà không gửi ngay.
- **FR-05.3 (Cấm Auto-pilot)**: Tin nhắn chỉ được phát đi khi nhân viên bấm nút "Gửi" hoặc phím tắt xác nhận. Không có bất kỳ luồng ngầm nào tự gửi tin nhắn ra bên ngoài.

### 4.6. F06 — Quản Trị Tri Thức & Cấu Hình Văn Phong (Admin Panel)
- **US-06**: Là một **Admin**, tôi muốn cập nhật nội dung chính sách và chọn văn phong thương hiệu để đồng bộ chất lượng trả lời của toàn bộ đội ngũ.
- **FR-06.1**: Hệ thống phải cung cấp giao diện CRUD bài viết chính sách (Tiêu đề, Danh mục, Nội dung hỗ trợ Markdown, trạng thái Publish).
- **FR-06.2**: Hệ thống phải cung cấp bộ chọn Brand Tone trực quan kèm ô nhập "Hướng dẫn phong cách riêng" (Custom Brand Guidelines).
- **FR-06.3**: Cấu hình Brand Tone phải được lưu vào CSDL và tự động áp dụng cho các lượt sinh phản hồi tiếp theo.

### 4.7. F07 — Vòng Lặp Phản Hồi Đánh Giá (Feedback Loop & Helpful Score)
- **US-07**: Là một **Admin / Agent**, tôi muốn đánh giá mức độ hữu ích của AI và theo dõi tỷ lệ chấp thuận bản nháp để đo lường hiệu quả công việc.
- **FR-07.1**: Hệ thống phải cung cấp nút đánh giá nhanh 👍 (Hài lòng) và 👎 (Chưa hài lòng) kèm lựa chọn đánh giá 1-5 sao cạnh mỗi bản nháp AI.
- **FR-07.2**: Hệ thống phải tự động ghi nhận hành vi của Agent: `ACCEPTED_UNMODIFIED` (Dùng nguyên bản), `ACCEPTED_WITH_EDITS` (Có sửa), hoặc `REJECTED` (Không dùng).
- **FR-07.3**: Hệ thống phải hiển thị Widget thống kê: Điểm số Hữu ích của AI (AI Helpful Score %), Tổng số lượt gợi ý và Tỷ lệ chấp thuận.

---

## 5. Tiêu Chí Chấp Nhận Có Thể Quan Sát Được (Observable Acceptance Criteria)

| Mã | Kịch Bản Kiểm Thử | Điều Kiện & Hành Động (Given - When) | Kết Quả Quan Sát Được (Then) |
| :--- | :--- | :--- | :--- |
| **AC-01** | Phân loại tin nhắn giao chậm bực tức | **Given**: Khách gửi tin "Đơn ORD-9821 trễ 4 ngày rồi, làm ăn kiểu gì vậy?!"<br>**When**: Hệ thống kích hoạt phân tích F02 | **Then**: Trả về JSON: `intent="DELIVERY_ISSUE"`, `sentiment="NEGATIVE"`, `priority="URGENT"`, độ trễ < 1.5s. |
| **AC-02** | Kiểm soát ảo giác chính sách đổi trả | **Given**: Khách hỏi đổi size trong 30 ngày<br>**When**: F04 sinh phản hồi theo Brand Tone `FRIENDLY` | **Then**: Bản nháp khẳng định đổi miễn phí 30 ngày tận nhà đúng theo KB; không bịa đặt thêm phí phát sinh; trích dẫn đúng bài viết chính sách. |
| **AC-03** | Thao tác Human-in-the-Loop 1-Click | **Given**: Bản nháp AI hiển thị trên sidebar<br>**When**: Agent click "Chèn Bản Nháp AI" | **Then**: Nội dung được đưa vào ô soạn thảo, con trỏ sẵn sàng cho Agent gõ thêm; tin nhắn **chưa** bị gửi đi cho đến khi Agent bấm nút "Gửi". |
| **AC-04** | Ghi nhận phản hồi đánh giá | **Given**: Agent bấm nút 👍 và gửi tin nhắn đã sửa nhẹ<br>**When**: Yêu cầu gửi hoàn tất | **Then**: Bản ghi `AIFeedback` được lưu trong DB với trạng thái `ACCEPTED_WITH_EDITS`; Widget điểm hữu ích tự động cập nhật tỷ lệ. |

---

## 6. Yêu Cầu Phi Chức Năng (Non-Functional Requirements - NFR)

1. **Hiệu năng & Độ trễ (NFR-01: Performance)**:
   - Tổng độ trễ toàn trình phân tích F02 và sinh phản hồi F04 (End-to-End Latency) phải **< 2.0 giây** (mục tiêu trung bình < 1.5s trên Google Gemini Flash).
   - Tốc độ phản hồi giao diện người dùng (UI Response Time): Các tương tác lọc, chuyển tab, chèn 1-Click phải phản hồi **< 200 ms**.
2. **Khả năng Cách ly Dữ liệu (NFR-02: Multi-tenant / Brand Isolation)**:
   - Toàn bộ dữ liệu cuộc hội thoại, bài viết chính sách và phản hồi của thương hiệu D2C phải được phân tách rành mạch theo cấu trúc quan hệ CSDL, không để rò rỉ dữ liệu chéo giữa các thương hiệu.
3. **An toàn Xác thực & Bảo mật PII (NFR-03: Security & Privacy)**:
   - Không lưu cứng API Keys trong mã nguồn Git (bắt buộc dùng `.env.local`).
   - Mọi thông tin nhạy cảm của khách hàng (số thẻ ngân hàng, mã PIN, mật khẩu) phải được che giấu (redacted) trước khi đưa vào ngữ cảnh Prompt gửi lên LLM.
4. **Khả năng Phục hồi Cục bộ (NFR-04: Resilience & Local Fallback)**:
   - Ứng dụng phải khởi chạy và chạy demo được 100% thời gian trên máy tính cá nhân ngay cả khi mất mạng internet hoặc chưa cài PostgreSQL (kích hoạt chế độ Mock Data D2C và Deterministic Engine Simulator).

---

## 7. Giả Định & Phạm Vi Loại Trừ Khỏi MVP (Assumptions & Exclusions)

### 7.1. Các Giả định (Assumptions)
1. **Auth Simulator**: Trong phạm vi MVP 9 ngày, tính năng chuyển đổi người dùng sử dụng thanh Role Switcher mô phỏng vai trò Agent và Supervisor mà không cần hệ thống OAuth2/SSO phức tạp.
2. **Nạp dữ liệu ngoài**: Khách hàng bên ngoài gửi tin nhắn vào hệ thống thông qua API Webhook Simulator chuẩn REST JSON.

### 7.2. Phạm vi Loại trừ Rõ ràng (Strict Exclusions)
- ❌ **Auto-pilot 100%**: Tuyệt đối không hỗ trợ tính năng tự động gửi tin nhắn mà không có sự kiểm duyệt của con người.
- ❌ **Tích hợp API Mạng Xã Hội Trực tiếp**: Không tích hợp Facebook Graph API, Zalo OA hay TikTok Shop webhook trong MVP.
- ❌ **Hệ thống CRM Hoàn chỉnh**: Không xây dựng hệ thống quản lý khách hàng tiềm năng, chấm điểm khách hàng hay quản lý giỏ hàng đa kênh.
- ❌ **Phân tích Dữ liệu Nâng cao (BI & Data Warehouse)**: Không xây dựng hạ tầng dữ liệu lớn hoặc công cụ trực quan hóa phức tạp.

