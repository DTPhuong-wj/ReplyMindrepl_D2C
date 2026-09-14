# TÀI LIỆU TỔNG QUAN DỰ ÁN: REPLYMIND (PROJECT BRIEF)

<!-- ==============================================================================
THÔNG TIN TÀI LIỆU (DOCUMENT METADATA)
- Tên dự án: ReplyMind - AI Co-pilot for D2C Customer Support
- Tài liệu: Project Brief Chính thức (Đã được phê duyệt bởi Human-in-the-Loop)
- Phiên bản: 1.0.0
- Ngày phê duyệt: 2026-11-10
- Trạng thái: APPROVED
- Phạm vi: MVP 9 Ngày (Chương 1 - Chương 9)
============================================================================== -->

## 1. Giả thuyết Bài toán (Problem Hypothesis)

### 1.1. Thực tế Đã Khẳng Định (Facts)
- Các thương hiệu Bán lẻ Trực tiếp tới Người tiêu dùng (D2C) tiếp nhận khối lượng hội thoại hỗ trợ lớn mỗi ngày qua nhiều kênh chat và email.
- Khoảng 70% các câu hỏi thường xoay quanh các chủ đề quen thuộc: tra cứu vận đơn, chính sách đổi trả hàng, bảo hành sản phẩm, sự cố thanh toán và tư vấn chọn size/chất liệu.
- Nhân viên hỗ trợ CSKH (Tier-1) thường mất nhiều thời gian tra cứu chính sách phân tán, soạn câu trả lời thủ công lặp đi lặp lại, dẫn đến:
  - Thời gian phản hồi đầu tiên (First Response Time - FRT) bị kéo dài.
  - Chất lượng và giọng văn phản hồi không đồng đều giữa các ca làm việc.
  - Tỷ lệ quá tải và mệt mỏi tinh thần của nhân viên tăng cao trong các đợt cao điểm khuyến mại.

### 1.2. Giả thuyết Giải pháp (Solution Hypothesis)
Nếu xây dựng một hệ thống **AI Co-pilot (Human-in-the-Loop)** hỗ trợ nhân viên CSKH với luồng xử lý:
$$\text{Tin nhắn Khách hàng} \longrightarrow \text{AI Phân tích} \longrightarrow \text{AI Gợi ý Phản hồi (RAG)} \longrightarrow \text{Nhân viên Duyệt / Sửa} \longrightarrow \text{Gửi Khách hàng}$$
thì hệ thống sẽ:
1. **Giảm 60% – 80%** thời gian phản hồi đầu tiên (FRT) và thời gian xử lý trung bình mỗi yêu cầu (AHT).
2. Đạt độ chính xác phân loại ý định (Intent Accuracy) **>= 85%**.
3. Đạt điểm số đánh giá mức độ hữu ích của AI từ nhân viên (AI Helpful Rating) trung bình **>= 4.0 / 5.0**.
4. Chuẩn hóa 100% văn phong thương hiệu và loại trừ hiện tượng bịa đặt chính sách (Zero Hallucination).

---

## 2. Đối tượng Người dùng Chính (Primary Users)

Hệ thống phục vụ trực tiếp 2 nhóm người dùng nội bộ trong doanh nghiệp D2C:

1. **Nhân viên CSKH Tuyến đầu (Tier-1 Support Agent)**:
   - **Mục tiêu**: Phản hồi khách hàng nhanh chóng, chính xác, không mất công gõ tay câu từ lặp lại.
   - **Hành vi**: Mở hộp thư, xem phân tích tự động từ AI (Intent, Sentiment, Priority, Policy snippets), duyệt hoặc chỉnh sửa bản nháp do AI đề xuất và bấm gửi 1-Click.
2. **Quản trị viên / Trưởng nhóm CSKH (Support Supervisor / Admin)**:
   - **Mục tiêu**: Chuẩn hóa chính sách chăm sóc khách hàng, duy trì văn phong thương hiệu đồng nhất và giám sát chất lượng hỗ trợ.
   - **Hành vi**: Cập nhật bài viết chính sách trong Cơ sở tri thức (Knowledge Base), lựa chọn văn phong thương hiệu (Brand Tone), và theo dõi tỷ lệ chấp thuận bản nháp AI qua báo cáo.

---

## 3. Kết quả Kỳ vọng & Chỉ số Thành công (Desired Outcomes & Success Metrics)

| Nhóm Chỉ số | Tên Chỉ số | Mục tiêu Đo lường (Target) |
| :--- | :--- | :--- |
| **Vận hành (Operational)** | Giảm thời gian phản hồi đầu tiên (FRT) | Giảm **60% - 80%** so với xử lý thủ công |
| **Chất lượng AI (AI Quality)** | Độ chính xác phân loại ý định (Intent Accuracy) | Đạt **>= 85%** trên bộ dữ liệu kiểm thử |
| **Sự chấp thuận (Adoption)** | Tỷ lệ chấp thuận bản nháp AI (Acceptance Rate) | Đạt **>= 70%** (Chấp thuận nguyên văn hoặc sau khi sửa nhẹ) |
| **Độ hài lòng (Satisfaction)** | Điểm đánh giá độ hữu ích của AI (AI Helpful Rating) | Đạt trung bình **>= 4.0 / 5.0** sao |

---

## 4. Phạm vi Tính năng MVP (In-Scope Features: F01 – F07)

Hệ thống ReplyMind trong 9 ngày tập trung giải quyết trọn vẹn 7 tính năng cốt lõi:

- **F01 — Hộp thư Hợp nhất & Nạp Hội thoại (Inbox & Message Ingestion)**:
  - Giao diện danh sách cuộc trò chuyện phân loại theo mức độ ưu tiên (`LOW`, `MEDIUM`, `HIGH`, `URGENT`) và trạng thái (`OPEN`, `PENDING_CUSTOMER`, `RESOLVED`, `CLOSED`).
  - Hỗ trợ bộ dữ liệu mẫu phong phú (Pre-seeded D2C Mock Data) kết hợp API Webhook mô phỏng để nhận tin nhắn mới từ bên ngoài.
- **F02 — Bộ Phân tích Tin nhắn Tự động (AI Message Analyzer)**:
  - Phân loại **7 loại Intent**: `ORDER_STATUS`, `SHIPPING`, `DELIVERY_ISSUE`, `RETURN`, `REFUND`, `PRODUCT_QUESTION`, `COMPLAINT`.
  - Đánh giá **3 mức Sentiment**: `POSITIVE`, `NEUTRAL`, `NEGATIVE`.
  - Gán **4 mức Priority**: `LOW`, `MEDIUM`, `HIGH`, `URGENT`.
- **F03 — Cơ sở Tri thức & Đối chiếu Chính sách (Knowledge Base RAG)**:
  - Quản lý các tài liệu chính sách đổi trả, thời gian giao hàng, bảo hành sản phẩm, chọn size và hủy đơn.
  - Tự động tìm kiếm ngữ nghĩa và trích dẫn trực tiếp điều khoản chính sách liên quan để nhân viên đối chứng.
- **F04 — Bộ Sinh Câu Phản Hồi AI Co-pilot (Reply Generator)**:
  - Tự động tạo bản nháp câu trả lời chuẩn xác dựa trên trích dẫn RAG và bám sát **4 Brand Tone**:
    - *Friendly (Thân thiện & Nhiệt tình)*
    - *Professional (Chuyên nghiệp & Rõ ràng)*
    - *Casual (Gần gũi & Trẻ trung)*
    - *Formal (Trang trọng & Lịch thiệp)*
- **F05 — Bàn Làm Việc Kiểm Duyệt (Human-in-the-Loop Workbench)**:
  - Khung chat cho phép nhân viên: đọc tin nhắn khách hàng, xem phân tích AI, chỉnh sửa bản nháp trực tiếp trong ô soạn thảo và bấm 1-Click gửi đi.
  - Tuyệt đối không tự động gửi tin nhắn nếu nhân viên chưa bấm xác nhận.
- **F06 — Quản lý Tri thức & Cấu hình Văn phong (Admin Panel)**:
  - Giao diện CRUD bài viết chính sách (hỗ trợ Markdown) và trạng thái lập chỉ mục.
  - Bảng điều khiển chọn Brand Tone mặc định và tùy chỉnh hướng dẫn phong cách của thương hiệu.
- **F07 — Đánh giá & Vòng lặp Cải tiến (Feedback Loop & Helpful Score)**:
  - Ghi nhận đánh giá của nhân viên cho từng lượt gợi ý (👍 / 👎, thang điểm 1-5 sao, phân loại: chấp thuận nguyên văn, sửa trước khi gửi, hoặc từ chối).
  - Tiện ích thống kê tỷ lệ chấp thuận bản nháp và tỷ lệ chỉnh sửa.

---

## 5. Các Phạm vi Loại trừ Khỏi MVP (Exclusions)

Để đảm bảo chất lượng, tính sư phạm và khả năng hoàn thành xuất sắc trong 9 ngày, các phần sau được **loại trừ rõ ràng**:
- ❌ **Auto-pilot 100%**: Tuyệt đối không kích hoạt chế độ tự động gửi tin nhắn mà không qua nhân viên kiểm duyệt.
- ❌ **Tích hợp API Mạng Xã Hội Trực Tiếp**: Chưa đấu nối trực tiếp Facebook Messenger, Zalo OA hay Instagram Direct API trong giai đoạn này (sử dụng cơ chế Webhook / Ingestion Simulator).
- ❌ **Hệ thống CRM Toàn diện**: Không xây dựng hệ thống quản lý khách hàng chuyên sâu, quản lý tích điểm loyalty hay hệ thống phân tích giỏ hàng đa kênh.
- ❌ **Kho Dữ liệu & BI Nâng cao**: Không xây dựng hạ tầng Data Warehouse hoặc dashboard phân tích Big Data.

---

## 6. Ràng buộc Kỹ thuật & Công nghệ (Constraints)

- **Thời hạn thực hiện**: Hoàn thiện toàn diện trong **9 ngày** (tương ứng với 9 chương của đồ án).
- **Kiến trúc & Nền tảng**:
  - Web-first: Next.js (App Router, React, TypeScript Strict Mode).
  - Giao diện: Tailwind CSS, Radix UI patterns, Lucide Icons.
  - Cơ sở dữ liệu: Prisma ORM với PostgreSQL (tích hợp sẵn Mock Data In-Memory / SQLite fallback cho môi trường dev cục bộ).
- **Mô hình LLM Mặc định**: **Google Gemini (Gemini 1.5 Flash / Gemini 2.0 Flash)** làm bộ xử lý chính nhằm đảm bảo tốc độ suy luận dưới 1.5 giây và tối ưu chi phí vận hành.

---

## 7. Quy tắc Vận hành AI (AI Working Rules)

1. **Nguyên tắc Con người Kiểm soát Tối cao (Strict Human-in-the-Loop)**: Mọi nội dung câu trả lời gửi đến khách hàng bắt buộc phải có sự xác nhận của nhân viên con người.
2. **Định dạng Đầu ra Cấu trúc (Structured JSON Outputs)**: Mọi tác vụ phân loại ý định, đánh giá cảm xúc và trích xuất thực thể đều phải yêu cầu LLM trả về JSON thuần chuẩn theo Zod schema.
3. **Bảo mật Dữ liệu & PII (Zero Credential & PII Leak)**: Không lưu cứng API Keys trong mã nguồn; che giấu thông tin thanh toán nhạy cảm của khách hàng trước khi đưa vào ngữ cảnh Prompt.
4. **Căn cứ Tri thức (Groundedness)**: Câu trả lời đề xuất phải có căn cứ từ Knowledge Base; nếu thiếu dữ liệu, AI phải lịch sự yêu cầu nhân viên tra cứu thêm hoặc xin lỗi khách hàng.

---

## 8. Nhật Ký Quyết Định (Decision Log)

| Mã Quyết Định | Nội Dung Quyết Định | Lựa Chọn Được Duyệt | Lý Do & Căn Cứ |
| :--- | :--- | :--- | :--- |
| **DEC-01** | Đối tượng người dùng chính | Cả Agent tuyến đầu và Supervisor/Admin | Cần một chu trình khép kín: Agent thao tác xử lý chat hàng ngày, Admin cấu hình chính sách & theo dõi chất lượng. |
| **DEC-02** | Mục tiêu thành công chính | Intent Accuracy >= 85%, AI Helpful Rating >= 4.0/5, giảm 60-80% FRT | Tập trung vào độ tin cậy thực tế của AI Co-pilot và năng suất làm việc của nhân viên CSKH. |
| **DEC-03** | Cơ chế nạp dữ liệu hội thoại | Mock Data D2C có sẵn + Webhook Simulator API | Đảm bảo hệ thống có thể demo chạy ngay lập tức mà vẫn hỗ trợ tiếp nhận tin nhắn động từ bên ngoài. |
| **DEC-04** | LLM Provider mặc định | Google Gemini (Gemini 1.5 / 2.0 Flash) | Đáp ứng tiêu chí tốc độ phản hồi nhanh (< 1.5s), chi phí tối ưu và phù hợp với mô hình đồ án thực hành. |

---

## 9. Các Giả định Đã Được Xác Nhận (Validated Assumptions)

1. **Cơ chế Đăng nhập Giả lập (Auth Simulator)**: Trong phạm vi MVP, ứng dụng cho phép chuyển đổi nhanh giữa các tài khoản nhân viên mẫu (`Nguyễn Hải Đăng`, `Trần Thị Mai`) qua giao diện để phục vụ kiểm thử nhanh mọi luồng vai trò.
2. **Cơ chế Tìm kiếm Ngữ nghĩa RAG**: Sử dụng thuật toán so khớp tương đồng nội bộ (Cosine Similarity / text embedding) kết hợp truy vấn Prisma, đảm bảo hệ thống có thể chạy độc lập không phụ thuộc vector database đám mây đắt đỏ.

