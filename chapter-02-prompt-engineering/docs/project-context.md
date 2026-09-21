# GÓI NGỮ CẢNH DI ĐỘNG DỰ ÁN: REPLYMIND (PROJECT CONTEXT PACKAGE)

<!-- ==============================================================================
THÔNG TIN NGỮ CẢNH (CONTEXT METADATA)
- Tên dự án: ReplyMind - AI Co-pilot for D2C Customer Support
- Tài liệu: Portable Project Context Package (Tài liệu ngữ cảnh di động tái sử dụng)
- Phiên bản: 1.0.0
- Ngày phê duyệt: 20-09-2026
- Trạng thái: APPROVED 
============================================================================== -->

## 1. Tóm Tắt Sản Phẩm (Product Summary)

- **Tên sản phẩm**: **ReplyMind**
- **Định vị & Bản chất**: Hệ thống **AI Co-pilot** hỗ trợ chăm sóc khách hàng (CSKH) định hướng Web-first, thiết kế chuyên biệt cho các thương hiệu Bán lẻ Trực tiếp tới Người tiêu dùng (D2C).
- **Nguyên tắc cốt lõi**: **Human-in-the-Loop (HITL) tuyệt đối** — AI chịu trách nhiệm phân tích ý định, đo lường cảm xúc, tra cứu tài liệu chính sách trong Cơ sở tri thức (RAG) và soạn thảo bản nháp phản hồi; nhân viên hỗ trợ con người là người đọc, chỉnh sửa và bấm nút gửi ra bên ngoài.
- **Mục tiêu chính**:
  1. Giảm **60% – 80%** thời gian phản hồi đầu tiên (FRT) và thời gian giải quyết yêu cầu (AHT).
  2. Đạt độ chính xác phân loại ý định (Intent Accuracy) **>= 85%**.
  3. Đạt tỷ lệ nhân viên chấp thuận bản nháp gợi ý (Acceptance Rate) **>= 70%**.
  4. Đạt điểm số đánh giá mức độ hữu ích của AI (AI Helpful Rating) trung bình **>= 4.0 / 5.0** sao.
  5. Chuẩn hóa văn phong thương hiệu và loại bỏ hoàn toàn việc bịa đặt chính sách (Zero Hallucination).

---

## 2. Luồng Hành Trình Người Dùng Chuẩn (End-to-End User Journey)

Mọi tính năng trong hệ thống đều xoay quanh chu trình làm việc 8 bước khép kín của nhân viên CSKH:

```
[1. Đăng nhập / Chọn Role (Agent / Admin)]
                    │
                    ▼
[2. Xem Hộp thư phân cấp theo Priority & Status (F01)]
                    │
                    ▼
[3. AI Tự động Phân tích Tin nhắn: 7 Intent, 3 Sentiment, 4 Priority (F02)]
                    │
                    ▼
[4. Tra cứu & Đối chiếu Chính sách Cơ sở Tri thức RAG (F03)]
                    │
                    ▼
[5. AI Soạn thảo Bản nháp Phản hồi theo Brand Tone & Đề xuất Action (F04)]
                    │
                    ▼
[6. Bàn làm việc Kiểm duyệt: Đọc, Sửa, hoặc Chèn 1-Click (F05)]
                    │
                    ▼
[7. Nhân viên Bấm Gửi cho Khách hàng (Zero Auto-pilot)]
                    │
                    ▼
[8. Thu thập Đánh giá Phản hồi 👍/👎 & Tính điểm Hữu ích AI (F07)]
```

---

## 3. Các Quyết Định Đã Được Phê Duyệt (Approved Decisions Log)

Mọi AI Agent và lập trình viên bắt buộc tôn trọng các quyết định bất biến sau:

| Mã Quyết Định | Vấn Đề Quyết Định | Lựa Chọn Đã Chốt | Căn Cứ & Phạm Vi Áp Dụng |
| :--- | :--- | :--- | :--- |
| **DEC-01** | Đối tượng người dùng chính | Cả **Agent tuyến đầu** và **Supervisor / Admin** | Agent sử dụng Workbench để xử lý chat; Admin sử dụng Admin Panel để quản lý bài viết chính sách và cấu hình văn phong thương hiệu. |
| **DEC-02** | Mục tiêu thành công chính | Intent Accuracy >= 85%, AI Helpful Rating >= 4.0/5, giảm 60-80% FRT | Tiêu chuẩn nghiệm thu độ chuẩn xác của AI và giá trị thực tế mang lại cho thương hiệu D2C. |
| **DEC-03** | Cơ chế nạp dữ liệu hội thoại | **Mock Data D2C có sẵn** + **Webhook API Simulator** | Có sẵn 4 hội thoại mẫu D2C để demo tức thì, kết hợp endpoint Webhook nhận payload tin nhắn động từ bên ngoài. |
| **DEC-04** | LLM Provider mặc định | **Google Gemini (Gemini 1.5 / 2.0 Flash)** | Đảm bảo tốc độ phản hồi nhanh (< 1.5s), chi phí vận hành tối ưu, sẵn sàng chuyển đổi linh hoạt qua biến môi trường `.env`. |

---

## 4. Bảng Thuật Ngữ Chuẩn Hóa (Canonical Vocabulary)

Tất cả các câu lệnh (prompts), tài liệu kỹ thuật, tên biến và mã nguồn bắt buộc tuân theo bảng thuật ngữ chuẩn này:

- **AI Co-pilot**: Trợ lý AI đồng hành tạo gợi ý câu trả lời và thông tin phân tích, tuyệt đối không tự ý hành động thay con người.
- **Human-in-the-Loop (HITL)**: Cơ chế kiểm duyệt bắt buộc từ nhân viên con người trước khi gửi tin nhắn cho khách hàng.
- **Intent Type (7 loại Intent chuẩn)**:
  1. `ORDER_STATUS`: Tra cứu tiến độ đơn hàng, bưu kiện.
  2. `SHIPPING`: Thắc mắc về đơn vị vận chuyển, cước phí.
  3. `DELIVERY_ISSUE`: Sự cố giao trễ, thất lạc, hàng móp méo.
  4. `RETURN`: Yêu cầu đổi size, đổi màu, đổi sản phẩm trong 30 ngày.
  5. `REFUND`: Yêu cầu trả hàng hoàn tiền, thắc mắc tiến độ tiền về tài khoản.
  6. `PRODUCT_QUESTION`: Tư vấn chất liệu, bảng size, cách giặt ủi bảo quản.
  7. `COMPLAINT`: Khiếu nại sản phẩm lỗi sản xuất, thái độ phục vụ.
- **Sentiment Type (3 mức chuẩn)**: `POSITIVE` (Hài lòng), `NEUTRAL` (Bình thường), `NEGATIVE` (Khó chịu / Bực tức).
- **Priority Level (4 cấp)**: `LOW`, `MEDIUM`, `HIGH`, `URGENT`.
- **Brand Tone (4 phong cách)**:
  1. `FRIENDLY`: Thân thiện, ấm áp, thấu cảm ("Dạ em chào chị ạ...").
  2. `PROFESSIONAL`: Chuyên nghiệp, trực diện, lịch thiệp, gãy gọn.
  3. `CASUAL`: Gần gũi, trẻ trung, hiện đại (phù hợp tệp khách Gen Z).
  4. `FORMAL`: Trang trọng, chuẩn mực, kính cẩn (phù hợp xử lý sự cố nghiêm trọng).
- **Knowledge Base RAG**: Kỹ thuật đối chiếu câu trả lời với Cơ sở tri thức chính sách để triệt tiêu hiện tượng bịa đặt thông tin (Zero Hallucination).
- **AI Helpful Score**: Điểm số đo lường mức độ hữu ích của AI tính trên tỷ lệ chấp thuận bản nháp và đánh giá sao từ nhân viên.

---

## 5. Thứ Tự Ưu Tiên Nguồn Tài Liệu (Source Precedence)

Khi xuất hiện sự mâu thuẫn hoặc chưa rõ ràng trong các chỉ thị tiếp theo, áp dụng thứ tự ưu tiên giảm dần:
1. **Ưu tiên 1 (Cao nhất)**: Quyết định mới nhất được con người phê duyệt rõ ràng trong phiên làm việc hiện tại.
2. **Ưu tiên 2**: Tệp tóm tắt bối cảnh dự án di động (`project-context.md`).
3. **Ưu tiên 3**: Tệp tài liệu yêu cầu tổng quan (`project-brief.md` và `prd.md`).
4. **Ưu tiên 4**: Gợi ý / đề xuất kỹ thuật từ AI Agent.

---

## 6. Ranh Giới Sản Phẩm & Quy Tắc Chống Phình Scope (Anti-Expansion Rules)

Để đảm bảo hoàn thành xuất sắc đồ án trong 9 ngày, mọi tác vụ phải tuân thủ nghiêm ngặt các rào chắn sau:
- 🚫 **Tuyệt đối cấm Auto-pilot 100%**: Từ chối mọi đề xuất hoặc tính năng tự động gửi tin nhắn cho khách hàng mà không qua nút duyệt của nhân viên.
- 🚫 **Loại trừ API Mạng xã hội Trực tiếp**: Không tích hợp Facebook Messenger API, Zalo OA API hay TikTok Shop webhook trong MVP (chỉ dùng Webhook Simulator nội bộ).
- 🚫 **Loại trừ CRM Hoàn chỉnh**: Không phát triển tính năng quản lý khách hàng tiềm năng (Leads), tích điểm thẻ thành viên hay lịch sử thanh toán đa kênh phức tạp.
- 🚫 **Loại trừ Hệ thống BI Nâng cao**: Không tích hợp Data Warehouse, Hadoop hay xuất báo cáo phức tạp.
- 🛡️ **Bảo vệ PII & API Keys**: Tuyệt đối không lưu API Key trong mã nguồn; che giấu số thẻ tín dụng hoặc mật khẩu trước khi gửi tới LLM.

---

## 7. Các Giả Định Đã Xác Nhận (Validated Assumptions)

1. **Cơ chế Chuyển đổi Vai trò (Auth Simulator)**: Trong phạm vi MVP 9 ngày, ứng dụng sử dụng thanh chuyển đổi vai trò nhanh trên giao diện (Role Switcher giữa Agent `Nguyễn Hải Đăng` và Supervisor `Trần Thị Mai`) để kiểm thử tiện lợi mà không cần cổng OAuth2/OTP phức tạp.
2. **Cơ chế Lưu Cấu hình Brand Tone**: Cấu hình Brand Tone được lưu trong cơ sở dữ liệu và tự động áp dụng làm giá trị mặc định cho toàn bộ các lượt sinh phản hồi tiếp theo.
3. **Cơ chế RAG Độc Lập Cục Bộ**: Sử dụng thuật toán so khớp tương đồng nội bộ (Cosine Similarity / text embedding) kết hợp Prisma, đảm bảo hệ thống có thể chạy cục bộ mượt mà không phụ thuộc dịch vụ vector bên ngoài.

