# ReplyMind - AI Co-pilot Hỗ Trợ Chăm Sóc Khách Hàng Cho Thương Hiệu D2C

ReplyMind là hệ thống AI Co-pilot hiện đại, định hướng Web-first được thiết kế chuyên biệt cho các thương hiệu Bán lẻ Trực tiếp tới Người tiêu dùng (D2C). Hệ thống tăng cường năng lực cho đội ngũ chăm sóc khách hàng bằng cách phân loại hội thoại thời gian thực, nhận diện ý định & cảm xúc, truy xuất chính sách tri thức (RAG), và đề xuất câu trả lời dự thảo 1-click chuẩn văn phong thương hiệu.

---

## 🌟 Các Tính Năng Nổi Bật

- **Bàn Làm Việc Hợp Nhất Cho Nhân Viên**: Hộp thư thống nhất và khung chat trực tiếp đi kèm dòng thời gian cùng lịch sử đơn hàng của khách.
- **AI Phân Tích & Triage Thời Gian Thực**: Tự động nhận diện ý định (đổi trả hàng, giao chậm, lỗi sản phẩm, thanh toán), đánh giá mức độ khẩn cấp và theo dõi diễn biến tâm trạng khách hàng.
- **Tích Hợp Cơ Sở Tri Thức RAG (Retrieval-Augmented Generation)**: Nạp các chính sách đổi trả, bảo hành, FAQ để đối chiếu câu trả lời, loại bỏ hoàn toàn hiện tượng AI bịa đặt (Hallucination).
- **Tùy Chỉnh Văn Phong Thương Hiệu (Brand Voice)**: Chuyển đổi linh hoạt giữa các phong cách (Thân thiện & Nhiệt tình, Chuyên nghiệp & Thẳng thắn, Thoải mái & Trẻ trung, Trang trọng).
- **Thao Tác 1-Click Tiện Lợi**: Chèn nhanh câu trả lời gợi ý, gửi yêu cầu tạo nhãn đổi trả, áp dụng mã ưu đãi hoặc chuyển tiếp lên cấp quản lý.
- **Vòng Lặp Phản Hồi & Báo Cáo Thống Kê**: Đo lường tỷ lệ chấp thuận câu trả lời của AI, điểm độ hữu ích (AI Helpfulness) và tối ưu thời gian phản hồi đầu tiên.

---

## 🏗️ Tổng Quan Kiến Trúc Hệ Thống

ReplyMind được xây dựng theo mô hình kiến trúc sạch (Clean Architecture), sẵn sàng cho các Agent tự hành:

```
[Kênh Khách Hàng (Email/Chat)] ---> [Next.js API Gateway / Webhooks]
                                                │
                                                ▼
                                    [Context Builder Service]
                                    ├── Postgres / Prisma (Lịch sử hội thoại & Người dùng)
                                    └── Vector Store / RAG (Chính sách & Cơ sở tri thức)
                                                │
                                                ▼
                                  [Bộ Điều Phối Đa Mô Hình AI]
                                  ├── Phân loại Ý định (GPT-4o / Claude 3.5 / Gemini)
                                  ├── Đánh giá Cảm xúc & Mức độ Khẩn cấp
                                  └── Tạo Dự thảo Phản hồi theo Văn phong
                                                │
                                                ▼
                                  [Giao Diện Nhân Viên (Human-in-the-Loop)]
                                  └── Xem xét, Hiệu chỉnh hoặc Bấm duyệt 1-Click
```

---

## 🚀 Hướng Dẫn Cài Đặt Môi Trường Phát Triển

### Yêu Cầu Tiên Quyết
- Node.js phiên bản 18.x hoặc 20.x trở lên
- Cơ sở dữ liệu PostgreSQL (phiên bản 14+ khuyến nghị)
- Khóa API của một trong các nhà cung cấp: OpenAI, Anthropic, hoặc Google Gemini

### Các Bước Cài Đặt

1. **Sao chép mã nguồn và cài đặt các gói phụ thuộc**:
   ```bash
   git clone <repo-url> replymind
   cd replymind
   npm install
   ```

2. **Cấu hình biến môi trường**:
   ```bash
   cp .env.example .env.local
   # Điền DATABASE_URL và các API Keys tương ứng trong file .env.local
   ```

3. **Khởi tạo cơ sở dữ liệu với Prisma**:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. **Khởi chạy máy chủ phát triển**:
   ```bash
   npm run dev
   ```
   Mở trình duyệt tại địa chỉ [http://localhost:3000](http://localhost:3000).

---

## 🧪 Kiểm Thử Tự Động

- **Kiểm thử Đơn vị & Dịch vụ (Unit tests)**:
  ```bash
  npm run test
  ```
- **Kiểm thử Đầu-Cuối (End-to-End tests)**:
  ```bash
  npm run test:e2e
  ```

---

## 📜 Quy Ước Cho Lập Trình Viên & AI Agent
Để nắm rõ các quy tắc lập trình nghiêm ngặt và tiêu chuẩn của dự án, vui lòng tham khảo [AGENTS.md](./AGENTS.md).
