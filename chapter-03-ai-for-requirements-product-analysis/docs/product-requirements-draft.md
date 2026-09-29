# BẢN NHÁP YÊU CẦU SẢN PHẨM: REPLYMIND (PRODUCT REQUIREMENTS DRAFT)

<!-- ==============================================================================
THÔNG TIN TÀI LIỆU (PRD DRAFT METADATA)
- Dự án: ReplyMind - AI Co-pilot for D2C Customer Support
- Tài liệu: Bản nháp Product Requirements Document (PRD Draft)
- Phiên bản: 1.0.0-draft
- Trạng thái: DRAFT APPROVED
- Nguồn tham chiếu:
  + chapter-01-ai-in-software-engineering/docs/project-brief.md
  + chapter-02-prompt-engineering/docs/project-context.md
============================================================================== -->

> Tài liệu này lưu trữ bản nháp PRD đã được rà soát và phê duyệt bởi Human-in-the-Loop tại tiến trình P3.1.
> Phiên bản chính thức được duy trì đồng thời tại: [product-requirements.md](./product-requirements.md).

---

## 1. Mục Tiêu Sản Phẩm (Goals)
- **Tầm nhìn**: Xây dựng AI Co-pilot hỗ trợ CSKH cho thương hiệu D2C, Web-first, tuân thủ nguyên tắc Human-in-the-Loop tuyệt đối.
- **KPIs cốt lõi**:
  - Giảm 60-80% thời gian phản hồi đầu tiên (FRT) & AHT.
  - Độ chính xác phân loại ý định (Intent Accuracy) >= 85%.
  - Tỷ lệ chấp thuận bản nháp gợi ý (Acceptance Rate) >= 70%.
  - Điểm đánh giá hữu ích của AI (AI Helpful Rating) >= 4.0/5.0 sao.
  - 0% ảo giác thông tin chính sách (Zero Policy Hallucination).

---

## 2. Người Dùng & Phân Quyền (Users & RBAC)
- **Agent (Nguyễn Hải Đăng)**: Xem Inbox, gửi tin nhắn, chèn bản nháp AI, đánh giá gợi ý 👍/👎.
- **Supervisor/Admin (Trần Thị Mai)**: Toàn quyền Agent + Quản lý bài viết Knowledge Base, cấu hình văn phong Brand Tone, xem báo cáo thống kê.
- **Auth Simulator**: Chuyển đổi vai trò nhanh qua thanh Role Switcher phục vụ kiểm thử nhanh trong MVP 9 ngày.

---

## 3. Phạm Vi Tính Năng MVP (F01 - F07)
- **F01**: Hộp thư hợp nhất & Tiếp nhận hội thoại (Pre-seeded Mock Data + Webhook Simulator API).
- **F02**: Bộ phân tích tin nhắn AI (7 Intent, 3 Sentiment, 4 Priority, JSON Structured Output).
- **F03**: Cơ sở tri thức RAG (5 chính sách D2C cốt lõi, trích dẫn Citations minh bạch).
- **F04**: Bộ sinh câu trả lời theo 4 Brand Tone (Friendly, Professional, Casual, Formal; Chống ảo giác).
- **F05**: Bàn làm việc kiểm duyệt Human-in-the-Loop (Chèn 1-Click, chỉnh sửa trực tiếp, CẤM Auto-pilot).
- **F06**: Quản trị bài viết chính sách & Cấu hình Brand Tone mặc định.
- **F07**: Vòng lặp phản hồi đánh giá & Widget điểm hữu ích AI.

---

## 4. Yêu Cầu Chức Năng (FR-01 đến FR-07) & User Stories (US-01 đến US-07)
- **US-01 / FR-01**: Xem danh sách hội thoại ưu tiên, lọc đa chiều, nạp tin nhắn qua Webhook API.
- **US-02 / FR-02**: Nhận diện 7 loại Intent, 3 mức Sentiment, 4 cấp Priority; trả về JSON nghiêm ngặt.
- **US-03 / FR-03**: Tra cứu ngữ nghĩa chính sách và trích dẫn điều khoản liên quan.
- **US-04 / FR-04**: Sinh câu trả lời dự thảo theo 4 Brand Tone, kèm gợi ý hành động nghiệp vụ.
- **US-05 / FR-05**: Bàn làm việc kiểm duyệt, thao tác chèn nháp 1-Click, người bấm nút gửi mới phát tin.
- **US-06 / FR-06**: CRUD bài viết Markdown và bộ chọn Brand Tone toàn cục.
- **US-07 / FR-07**: Ghi nhận đánh giá 👍/👎, sao và tính tỷ lệ chấp thuận bản nháp.

---

## 5. Tiêu Chí Chấp Nhận Có Thể Quan Sát Được (Observable AC)
- **AC-01 (Phân tích F02)**: Khách gửi tin bực tức giao trễ -> Trả về JSON `intent="DELIVERY_ISSUE"`, `sentiment="NEGATIVE"`, `priority="URGENT"`, độ trễ < 1.5s.
- **AC-02 (Chống ảo giác F04)**: Khách hỏi đổi size -> Sinh câu trả lời căn cứ đúng chính sách 30 ngày, miễn phí đổi 1 bước tận nhà, không tự bịa phụ phí.
- **AC-03 (Kiểm duyệt F05)**: Agent click "Chèn Bản Nháp AI" -> Nội dung điền vào ô soạn thảo, không tự động gửi cho tới khi Agent bấm "Gửi".
- **AC-04 (Phản hồi F07)**: Agent bấm 👍 và gửi câu trả lời -> Bản ghi feedback được lưu với `ACCEPTED_WITH_EDITS` hoặc `ACCEPTED_UNMODIFIED`.

---

## 6. Yêu Cầu Phi Chức Năng (NFR)
- **Hiệu năng**: Độ trễ sinh phản hồi < 2.0s (mục tiêu < 1.5s trên Gemini Flash). Phản hồi giao diện < 200ms.
- **Cách ly dữ liệu**: Dữ liệu hội thoại và chính sách phân tách theo cấu trúc quan hệ CSDL.
- **Bảo mật**: Không lưu API Key trong Git, che giấu PII nhạy cảm trước khi gửi lên LLM.
- **Khả năng phục hồi**: Chạy được cục bộ 100% thời gian nhờ Mock Data D2C và Engine Simulator.

---

## 7. Ranh Giới Loại Trừ Khỏi MVP (Exclusions)
- ❌ Cấm Auto-pilot 100% (tự động gửi không qua con người).
- ❌ Không kết nối trực tiếp Facebook, Zalo OA, TikTok Shop APIs trong MVP.
- ❌ Không xây dựng hệ thống CRM hoàn chỉnh.
- ❌ Không xây dựng kho dữ liệu phân tích BI nâng cao.

