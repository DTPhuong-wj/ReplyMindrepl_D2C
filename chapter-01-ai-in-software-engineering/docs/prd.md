# TÀI LIỆU YÊU CẦU SẢN PHẨM: REPLYMIND (PRD)

<!-- ==============================================================================
THÔNG TIN TÀI LIỆU (PRD METADATA)
- Tên dự án: ReplyMind - AI Co-pilot for D2C Customer Support
- Tài liệu: Product Requirements Document (PRD) Toàn diện
- Phiên bản: 1.0.0
- Trạng thái: DRAFT FOR REVIEW (Căn cứ trên Project Brief đã duyệt)
- Ngày lập: 08-09-2026
- Tác giả: Senior AI Software Architect & Lead Engineer
============================================================================== -->

## 1. Giới Thiệu & Tầm Nhìn Sản Phẩm (Product Vision)

**ReplyMind** là hệ thống AI Co-pilot hỗ trợ chăm sóc khách hàng (CSKH) định hướng Web-first, được thiết kế chuyên biệt cho các thương hiệu Bán lẻ Trực tiếp tới Người tiêu dùng (D2C). 

Hệ thống hoạt động theo tôn chỉ **"Con người kiểm duyệt tối cao" (Strict Human-in-the-Loop)**: AI chịu trách nhiệm phân tích ý định, đo lường cảm xúc, tra cứu chính sách trong Cơ sở tri thức và soạn thảo sẵn bản nháp câu trả lời bám sát văn phong thương hiệu; nhân viên hỗ trợ con người là người đọc, chỉnh sửa và bấm nút gửi cuối cùng.

### 1.1. Mục tiêu Kinh doanh & Chỉ số Đo lường (OKRs / KPIs)
1. **Rút ngắn thời gian phản hồi**: Giảm **60% - 80%** thời gian phản hồi đầu tiên (First Response Time - FRT) và thời gian giải quyết yêu cầu (Average Handle Time - AHT).
2. **Độ chính xác phân loại AI**: Đạt tỷ lệ phân loại ý định (Intent Accuracy) **>= 85%**.
3. **Mức độ đón nhận từ nhân viên**: Tỷ lệ chấp thuận bản nháp gợi ý (Acceptance Rate) **>= 70%** (bao gồm chấp thuận nguyên văn hoặc sau khi sửa nhẹ).
4. **Điểm đánh giá chất lượng**: Điểm số hữu ích của AI (AI Helpful Rating) trung bình **>= 4.0 / 5.0** sao.
5. **Đồng nhất văn phong & Tri thức**: 100% câu trả lời gợi ý tuân thủ văn phong đã chọn và loại bỏ hoàn toàn việc bịa đặt chính sách (Zero Hallucination).

---

## 2. Chân Dung Người Dùng & Câu Chuyện Người Dùng (User Personas & Stories)

### 2.1. Persona 1: Nhân viên Hỗ trợ Tuyến đầu (Tier-1 Support Agent)
- **Đại diện**: Nguyễn Hải Đăng (24 tuổi, nhân viên CSKH ca sáng).
- **Nỗi đau (Pain points)**: Mỗi ngày xử lý hơn 100 cuộc trò chuyện lặp đi lặp lại về đổi trả và tra mã bưu kiện; phải mở nhiều tab tra cứu bảng size và chính sách; gõ phím liên tục gây căng thẳng mệt mỏi.
- **Mục tiêu**: Xem nhanh khách hàng đang muốn gì, cảm xúc thế nào và có sẵn một câu trả lời mẫu chuẩn xác để bấm gửi ngay.
- **User Stories**:
  - *US-01*: Là một Agent, tôi muốn nhìn thấy danh sách hội thoại được sắp xếp theo mức độ ưu tiên (`URGENT` lên đầu) để tôi có thể xử lý các khách hàng bức xúc trước.
  - *US-02*: Là một Agent, tôi muốn AI tự động phát hiện ý định (Intent) và cảm xúc (Sentiment) ngay khi mở cuộc trò chuyện để tôi nắm bắt tâm lý khách hàng trong 3 giây.
  - *US-03*: Là một Agent, tôi muốn AI tự động soạn thảo một bản nháp phản hồi đầy đủ căn cứ theo chính sách đổi trả của shop để tôi không phải gõ lại từ đầu.
  - *US-04*: Là một Agent, tôi muốn có nút "Sử dụng bản nháp" để chèn nội dung vào ô chat và chỉnh sửa thêm bớt trước khi gửi cho khách.
  - *US-05*: Là một Agent, tôi muốn đánh giá 👍/👎 cho gợi ý của AI để hệ thống học và cải thiện độ chuẩn xác.

### 2.2. Persona 2: Quản lý CSKH / Quản trị viên (Support Lead / Admin)
- **Đại diện**: Trần Thị Mai (29 tuổi, Trưởng nhóm Chăm sóc Khách hàng).
- **Nỗi đau (Pain points)**: Nhân viên mới vào ca trả lời sai chính sách đổi trả hoặc xưng hô không đúng tinh thần thương hiệu; khó theo dõi xem công cụ AI có thực sự giúp nhân viên làm việc nhanh hơn không.
- **Mục tiêu**: Quản lý tập trung tài liệu chính sách, chọn văn phong cho toàn đội ngũ và theo dõi tỷ lệ nhân viên áp dụng AI.
- **User Stories**:
  - *US-06*: Là một Admin, tôi muốn thêm/sửa các bài viết chính sách (Return Policy, Shipping FAQ) trong Cơ sở tri thức để AI lấy làm căn cứ trả lời.
  - *US-07*: Là một Admin, tôi muốn chọn văn phong thương hiệu (Thân thiện, Chuyên nghiệp, Gần gũi, Trang trọng) để toàn bộ câu trả lời của AI đồng bộ giọng điệu.
  - *US-08*: Là một Admin, tôi muốn theo dõi biểu đồ tỷ lệ chấp thuận bản nháp và điểm hữu ích của AI để đánh giá ROI của hệ thống.

---

## 3. Đặc Tả Chi Tiết Tính Năng Sản Phẩm (Features F01 - F07)

### F01: Hộp Thư Hợp Nhất & Tiếp Nhận Hội Thoại (Inbox & Ingestion)
- **Mô tả**: Giao diện hiển thị danh sách các cuộc hội thoại khách hàng, hỗ trợ phân loại và lọc thông minh.
- **Yêu cầu chi tiết**:
  - Hiển thị danh sách hội thoại với: Tên khách hàng, email, tóm tắt tin nhắn cuối cùng, nhãn Intent, huy hiệu Sentiment, mức Priority và thời gian cập nhật.
  - Bộ lọc hội thoại theo: Trạng thái (`OPEN`, `PENDING_CUSTOMER`, `RESOLVED`, `CLOSED`) và Mức ưu tiên (`LOW`, `MEDIUM`, `HIGH`, `URGENT`).
  - Hỗ trợ dữ liệu giả lập D2C mẫu tích hợp sẵn (4 hội thoại điển hình: Giao chậm bực tức, Đổi size áo, Trừ tiền 2 lần, Hỏi chất liệu).
  - Cung cấp đầu mối REST API Webhook (`POST /api/conversations/[id]/messages`) để nhận tin nhắn mới từ bên ngoài.

### F02: Bộ Phân Tích Tin Nhắn Tự Động (AI Message Analyzer)
- **Mô tả**: Phân tích nội dung tin nhắn khách hàng bằng mô hình ngôn ngữ lớn (Google Gemini Flash) với đầu ra JSON nghiêm ngặt.
- **Quy chuẩn 7 loại Intent**:
  1. `ORDER_STATUS`: Tra cứu hành trình đơn hàng, thời gian giao hàng dự kiến.
  2. `SHIPPING`: Thắc mắc về đơn vị vận chuyển, phí ship, khu vực giao hàng.
  3. `DELIVERY_ISSUE`: Giao trễ hạn, bưu tá không liên hệ, kiện hàng bị móp méo/thất lạc.
  4. `RETURN`: Yêu cầu đổi size, đổi màu, đổi sang sản phẩm khác trong 30 ngày.
  5. `REFUND`: Yêu cầu trả hàng hoàn tiền, thắc mắc tiến độ hoàn tiền qua thẻ.
  6. `PRODUCT_QUESTION`: Hỏi về bảng size, chất liệu vải, cách giặt ủi, tình trạng còn hàng.
  7. `COMPLAINT`: Khiếu nại thái độ phục vụ, sản phẩm lỗi sản xuất, trải nghiệm tiêu cực.
- **Quy chuẩn 3 mức Sentiment**: `POSITIVE` (Tích cực/Hài lòng), `NEUTRAL` (Bình thường/Hỏi thông tin), `NEGATIVE` (Khó chịu/Thất vọng/Giận dữ).
- **Quy chuẩn 4 mức Priority**:
  - `URGENT`: Khiếu nại giao trễ trên 3 ngày, dọa kiện, trừ tiền 2 lần, sentiment cực kỳ tiêu cực.
  - `HIGH`: Yêu cầu hoàn tiền, khiếu nại sản phẩm lỗi sản xuất.
  - `MEDIUM`: Yêu cầu đổi size, hỏi tiến độ giao hàng thông thường.
  - `LOW`: Hỏi tư vấn mua hàng, lời khen hoặc đóng góp ý kiến chung.

### F03: Cơ Sở Tri Thức & Đối Chiếu Chính Sách (Knowledge Base RAG)
- **Mô tả**: Tầng lưu trữ và tra cứu thông tin chính sách giúp AI đưa ra câu trả lời có bằng chứng xác thực, không bịa đặt.
- **Yêu cầu chi tiết**:
  - Lưu trữ 5 bài viết chính sách cốt lõi của thương hiệu D2C: Đổi trả 30 ngày, Vận chuyển & Giao chậm, Bảo hành 6 tháng, Hướng dẫn chọn size, Quy trình hoàn tiền.
  - Thuật toán tìm kiếm ngữ nghĩa: Trích xuất các đoạn văn bản chính sách có độ tương đồng cao nhất với thắc mắc của khách hàng.
  - Hiển thị khối trích dẫn (Citations) trực tiếp trên thanh bên AI Co-pilot: Tên bài viết chính sách, điều khoản trích đoạn và độ tương đồng.

### F04: Bộ Sinh Câu Phản Hồi AI Co-pilot (Reply Generator)
- **Mô tả**: Tự động sinh câu trả lời đề xuất căn cứ trên ngữ cảnh hội thoại, tài liệu chính sách RAG và văn phong thương hiệu đã cấu hình.
- **Quy chuẩn 4 Brand Tone**:
  1. `FRIENDLY`: Thân thiện, ấm áp, thấu cảm, xưng hô gần gũi ("Dạ em chào chị ạ...").
  2. `PROFESSIONAL`: Chuyên nghiệp, trực diện, lịch thiệp, câu từ gãy gọn.
  3. `CASUAL`: Hiện đại, năng động, tự nhiên, thích hợp với tệp khách hàng Gen Z.
  4. `FORMAL`: Trang trọng, chuẩn mực, kính cẩn, phù hợp với xử lý sự cố nghiêm trọng.
- **Hành động đề xuất (Suggested Actions)**: Tự động đưa ra 1-2 hành động tiếp theo (Ví dụ: "Kiểm tra mã đơn trên hệ thống", "Tạo lệnh đổi size mới miễn phí").

### F05: Bàn Làm Việc Kiểm Duyệt (Human-in-the-Loop Workbench)
- **Mô tả**: Không gian làm việc chính của Agent để kiểm soát 100% nội dung gửi ra bên ngoài.
- **Yêu cầu chi tiết**:
  - Hiển thị luồng chat theo dòng thời gian (tin nhắn khách, tin nhắn nhân viên, tin nhắn hệ thống).
  - Khung "Bản nháp AI Co-pilot" tách biệt rõ ràng với ô nhập liệu chính.
  - Nút **"Chèn Bản Nháp" (1-Click)**: Đưa toàn bộ nội dung gợi ý vào ô soạn thảo để Agent đọc lại và chỉnh sửa trước khi gửi.
  - Nút **"Gửi Phản Hồi"**: Chỉ gửi khi nhân viên chủ động click hoặc nhấn tổ hợp phím tắt. Tuyệt đối không gửi tự động (Zero Auto-pilot).

### F06: Quản Lý Tri Thức & Cấu Hình Văn Phong (Admin Panel)
- **Mô tả**: Khu vực dành cho quản lý thiết lập các tham số vận hành của AI.
- **Yêu cầu chi tiết**:
  - Quản lý bài viết chính sách: Xem danh sách, tạo bài viết mới, chỉnh sửa nội dung định dạng Markdown, xóa bài viết.
  - Bộ chọn Brand Tone trực quan: Cho phép chuyển đổi nhanh văn phong và điền thêm "Hướng dẫn phong cách riêng" (Custom Guidelines).

### F07: Vòng Lặp Đánh Giá Phản Hồi (Feedback Loop & Helpful Score)
- **Mô tả**: Thu thập đánh giá từ Agent để đo lường hiệu quả và cải tiến mô hình.
- **Yêu cầu chi tiết**:
  - Nút đánh giá nhanh 👍 (Hữu ích) và 👎 (Chưa hữu ích) đi kèm mỗi câu gợi ý của AI.
  - Ghi nhận hành động thực tế của Agent: `ACCEPTED_UNMODIFIED` (Dùng nguyên văn), `ACCEPTED_WITH_EDITS` (Có chỉnh sửa), `REJECTED` (Bỏ qua viết câu khác).
  - Widget thống kê hiển thị: Điểm độ hữu ích của AI (AI Helpful Score %), Tổng số lượt gợi ý, Tỷ lệ chấp thuận nguyên văn.

---

## 4. Yêu Cầu Phi Chức Năng (Non-Functional Requirements)

1. **Hiệu năng & Độ trễ (Performance & Latency)**:
   - Thời gian sinh câu trả lời đề xuất (Time to First Token / Complete draft): **< 1.5 giây** khi sử dụng Google Gemini Flash.
   - Thời gian tải trang ban đầu (First Contentful Paint): **< 1.0 giây**.
2. **Khả năng phục hồi & Sẵn sàng Cục bộ (Resilience & Local-first)**:
   - Hệ thống phải khởi chạy và chạy demo được ngay trên máy cá nhân mà không bị sập nếu máy chưa có PostgreSQL (tự động kích hoạt tầng Mock Data In-Memory).
3. **Bảo mật & Quyền riêng tư (Privacy & Security)**:
   - Không lưu cứng thông tin xác thực hoặc API Keys vào Git.
   - Không đưa thông tin thẻ thanh toán đầy đủ hoặc mật khẩu của khách hàng vào Prompt gửi lên LLM.
4. **Trải nghiệm Người dùng (UX & Accessibility)**:
   - Giao diện đáp ứng (Responsive), tối ưu cho màn hình Desktop của nhân viên CSKH (1280px trở lên).
   - Thiết kế sạch sẽ với Tailwind CSS, độ tương phản màu sắc đạt chuẩn WCAG AA.

---

## 5. Ranh Giới Phạm Vi: Trong MVP vs Ngoài MVP

| Hạng mục | Trong Phạm vi MVP (In-Scope) | Ngoài Phạm vi (Out-of-Scope) |
| :--- | :--- | :--- |
| **Cơ chế gửi tin** | **Human-in-the-Loop 100%**: Nhân viên duyệt mới gửi | Auto-pilot tự động gửi tin nhắn cho khách |
| **Kênh tiếp nhận** | Mock Data D2C có sẵn + Webhook API Simulator | Tích hợp Facebook Messenger, Zalo OA, TikTok Shop |
| **Cơ sở tri thức** | 5 bài viết chính sách cốt lõi định dạng Markdown | Đồng bộ tự động từ Notion / Google Docs / Zendesk |
| **Mô hình AI** | Google Gemini (Gemini 1.5/2.0 Flash) qua API | Tự huấn luyện (Fine-tuning) mô hình mã nguồn mở |
| **Báo cáo** | Widget điểm hữu ích AI và tỷ lệ chấp thuận bản nháp | Hệ thống BI phức tạp, xuất báo cáo Excel nâng cao |

---

## 6. Tiêu Chí Nghiệm Thu (Acceptance Criteria & Definition of Done)

Hệ thống được coi là hoàn thành Chương 1 khi đáp ứng đầy đủ các tiêu chí:
- [x] Có tài liệu Project Brief và PRD được phê duyệt và lưu trữ đúng cấu trúc.
- [x] Cây thư mục dự án được tổ chức chuẩn Clean Architecture theo `AGENTS.md`.
- [x] Sơ đồ Prisma ORM định nghĩa đầy đủ 5 thực thể (`User`, `Conversation`, `Message`, `KnowledgeBase`, `AIFeedback`).
- [x] Bộ dữ liệu mẫu Mock Data D2C bao gồm 3 nhân viên, 5 bài viết chính sách, 4 cuộc hội thoại đa dạng cảm xúc/ý định.
- [x] Toàn bộ mã nguồn vượt qua kiểm tra kiểu dữ liệu TypeScript (`npm run typecheck`) không có lỗi.
- [x] File hướng dẫn cài đặt `SETUP_GUIDE.md` rõ ràng, ai cũng có thể làm theo và chạy được ứng dụng.

