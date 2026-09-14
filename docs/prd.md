# TÀI LIỆU YÊU CẦU SẢN PHẨM: REPLYMIND (PRD)

<!--
  Tài liệu: Product Requirements Document (PRD) Toàn diện
  Dự án: ReplyMind - AI Co-pilot for D2C Customer Support
  Phiên bản: 1.0.0
  Trạng thái: Hoàn chỉnh (Đồng bộ với chapter-01-ai-in-software-engineering/docs/prd.md)
-->

Vui lòng tham khảo tài liệu PRD chi tiết đầy đủ tại:
👉 **[chapter-01-ai-in-software-engineering/docs/prd.md](file:///d:/Code/replymind/chapter-01-ai-in-software-engineering/docs/prd.md)**

### Tóm tắt các nội dung cốt lõi:
1. **Tầm nhìn & Mục tiêu**: Giảm 60-80% thời gian phản hồi đầu tiên (FRT), đạt độ chính xác phân loại ý định >= 85%, tỷ lệ chấp thuận bản nháp AI >= 70% và điểm đánh giá hữu ích >= 4.0/5.0 sao.
2. **2 Nhóm Người Dùng (Personas)**:
   - *Tier-1 Support Agent (Nguyễn Hải Đăng)*: Xử lý hội thoại, tiếp nhận phân tích AI, duyệt hoặc chỉnh sửa bản nháp 1-Click.
   - *Support Lead / Admin (Trần Thị Mai)*: Quản lý bài viết chính sách Knowledge Base, cấu hình 4 Brand Tone và theo dõi chỉ số hữu ích.
3. **7 Tính Năng Trọng Tâm (F01 - F07)**:
   - F01: Hộp thư hợp nhất & nạp hội thoại (Mock data + Webhook simulator).
   - F02: Phân tích 7 Intent, 3 Sentiment, 4 Priority bằng Google Gemini Flash.
   - F03: Tra cứu & đối chiếu Cơ sở tri thức chính sách (RAG).
   - F04: Sinh câu trả lời dự thảo theo 4 Brand Tone (Friendly, Professional, Casual, Formal).
   - F05: Bàn làm việc kiểm duyệt Human-in-the-Loop (Duyệt, sửa, bấm gửi).
   - F06: Quản lý bài viết chính sách & Cấu hình văn phong thương hiệu.
   - F07: Thu thập đánh giá AI Feedback (👍/👎, sao) và widget điểm hữu ích.
4. **Ranh giới loại trừ (Exclusions)**: Loại trừ 100% Auto-pilot tự động gửi, API mạng xã hội trực tiếp, hệ thống CRM và BI chuyên sâu.
5. **Ràng buộc công nghệ**: Next.js App Router, TypeScript Strict Mode, Tailwind CSS, Prisma ORM với PostgreSQL / Mock Data fallback, Google Gemini LLM API.
