# Kiến Trúc Hệ Thống & Luồng Dữ Liệu ReplyMind

<!--
  Tài liệu: Sơ đồ kiến trúc & Thiết kế kỹ thuật
  Dự án: ReplyMind
  Trạng thái: Bản thảo Kiến trúc (Architecture Blueprint Stub)
-->

## 1. Sơ Đồ Kiến Trúc Mức Cao

```
+-------------------------------------------------------------------------+
|                              Tầng Client                                |
|   Next.js App Router (React Server Components + Giao diện Workbench)    |
|   Tailwind CSS / Lucide Icons / Kênh kết nối thời gian thực             |
+------------------------------------+------------------------------------+
                                     |
                                     | Giao thức HTTP / REST API Routes
                                     v
+-------------------------------------------------------------------------+
|                            Next.js API Gateway                          |
|         /api/conversations | /api/ai | /api/knowledge-base             |
+------------------+------------------------------------+-----------------+
                   |                                    |
                   v                                    v
+------------------------------------+ +----------------------------------+
|           Tầng Dữ Liệu             | |        Bộ Điều Phối AI           |
|  Prisma ORM với PostgreSQL         | |  Kỹ nghệ Ngữ cảnh & RAG          |
|  - Nhân viên & Người dùng          | |  - pgvector / Tìm kiếm Ngữ nghĩa |
|  - Cuộc hội thoại & Tin nhắn       | |  - Bộ định tuyến Mô hình (OpenAI/|
|  - Bài viết Cơ sở Tri thức         | |    Claude / Gemini APIs)         |
|  - Đánh giá phản hồi AI            | |  - Rào chắn & Chuẩn hóa Văn phong|
+------------------------------------+ +----------------------------------+
```

## 2. Vòng Đời Xử Lý Yêu Cầu: Sinh Bản Nháp AI Co-pilot

1. **Tiếp nhận Sự kiện**: Tin nhắn mới của khách hàng gửi tới qua Webhook hoặc Hộp thư hỗ trợ.
2. **Làm giàu Ngữ cảnh (Context Enrichment)**:
   - Truy vấn 5 tin nhắn gần nhất từ Prisma.
   - Vector hóa nội dung tin nhắn mới của khách hàng.
   - Thực hiện tìm kiếm vector đối chiếu với bảng `KnowledgeBase` (RAG).
3. **Lắp ráp Prompt (Prompt Assembly)**: Ghép nối System Prompt + Văn phong Thương hiệu + Chính sách liên quan + Lịch sử hội thoại.
4. **Suy luận Đầu ra Chuẩn hóa (Structured Inference)**: Yêu cầu LLM trả về cấu trúc JSON nghiêm ngặt (Ý định, Cảm xúc, Bản nháp trả lời, Hành động đề xuất tiếp theo).
5. **Truyền tải tới Giao diện Nhân viên**: Thanh bên AI Co-pilot hiển thị thông tin ngay tức thì.
6. **Nhân viên Phê duyệt**: Nhân viên con người kiểm tra, có thể chỉnh sửa văn bản rồi bấm "Duyệt & Gửi".
