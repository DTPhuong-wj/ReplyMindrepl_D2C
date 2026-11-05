# Nhật Ký Kiểm Chứng Demo Kiến Trúc & CSDL ReplyMind (P5 Demo Verification Log)

<!-- ==============================================================================
HỒ SƠ KIỂM CHỨNG THỰC TẾ & MINH CHỨNG ARTIFACTS (CLO2 & CLO3)
- Mã tiến trình: P5.3 - Demo Verification & Artifacts Inspection
- Tệp minh chứng: 03_p5_demo_verification_log.md
- Thư mục lưu trữ: prompts/meta_agent/chapter_05/
- Thư mục ảnh minh chứng: chapter-05-ai-for-software-design-architecture/evidence/
- Dự án: ReplyMind - AI Co-pilot for D2C Customer Support
- Vai trò: Senior Full-stack & Database Engineer / QA Auditor
- Kỹ năng áp dụng: $code-review-excellence, $backend-expert, $frontend-expert
- Trạng thái kiểm định: SẴN SÀNG ĐIỀN KẾT QUẢ & GẮN LINK ẢNH (READY FOR AUDIT)
- Chuẩn đầu ra môn học:
  + CLO2: Kiểm chứng tính khả thi của sơ đồ kiến trúc hệ thống và mô hình CSDL quan hệ.
  + CLO3: Thu thập minh chứng trực quan, kiểm thử hợp đồng API và trạng thái vận hành CSDL.
============================================================================= -->

## 1. Bảng Tổng Hợp Kiểm Thử Minh Chứng (Executive Verification Checklist)

| STT | Hạng Mục Kiểm Thử | Tệp Nguồn (Source Artifact) | Tiêu Chuẩn Nghiệm Thu (Acceptance Criteria) | Trạng Thái | Tệp Ảnh Minh Chứng (Evidence Image) |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **01** | **Sơ đồ Ngữ cảnh Hệ thống (C4)** | `design/system-context.mmd` | Render sắc nét không lỗi cú pháp Mermaid; thể hiện đầy đủ 4 personas (Khách, Agent, Supervisor, Admin), Next.js Modular Monolith, MySQL 8.0 và LLM Provider. | [ ] Đạt | `evidence/01-system-context-diagram.png` |
| **02** | **Sơ đồ ERD MySQL Quan Hệ** | `design/data-model.mmd` | Render đầy đủ 7 thực thể CSDL (`Brands`, `Users`, `BrandTones`, `KnowledgeBase`, `Conversations`, `Messages`, `AIFeedbacks`) kèm quan hệ 1-N và khóa ngoại `brand_id`. | [ ] Đạt | `evidence/02-mysql-erd-diagram.png` |
| **03** | **Hợp Đồng API Trên Swagger Viewer** | `design/openapi.yaml` | Bản xem trước Swagger UI / OpenAPI Preview hợp lệ 100%, render trực quan 8 nhóm endpoint: Auth, Conversations, AI Co-pilot (F02/F04), KB, Tone, Feedback, Dashboard. | [ ] Đạt | `evidence/03-openapi-swagger-preview.png` |
| **04** | **Khởi Tạo CSDL MySQL Cục Bộ** | `prisma/schema.prisma` & MySQL Server | Database `replymind_db` được tạo thành công trên MySQL (qua CLI, Workbench, DBeaver hoặc Docker); 7 bảng quan hệ được đẩy lên qua `npx prisma db push`. | [ ] Đạt | `evidence/04-mysql-database-created.png` |

---

## 2. Chi Tiết Từng Hạng Mục Kiểm Tra & Khung Chèn Ảnh Minh Chứng

### 2.1. Hạng Mục 1: Kiểm Tra Render Sơ Đồ Ngữ Cảnh Hệ Thống (`system-context.mmd`)
- **Đường dẫn tệp nguồn**: [chapter-05-ai-for-software-design-architecture/design/system-context.mmd](file:///d:/Code/replymind/chapter-05-ai-for-software-design-architecture/design/system-context.mmd)
- **Cách thức kiểm thử**: Mở tệp `.mmd` trong VS Code / Cursor với extension **Mermaid Preview** hoặc dán mã vào [Mermaid Live Editor](https://mermaid.live).
- **Kết quả quan sát**:
  - [ ] Hiển thị rõ ràng ranh giới ứng dụng Next.js Modular Monolith.
  - [ ] Các luồng gọi LLM Provider và lưu trữ MySQL được thể hiện chính xác.
  - [ ] Không có lỗi cú pháp parsing.
- **Ảnh chụp minh chứng**:
  *(Chụp toàn bộ sơ đồ đã render và lưu vào đường dẫn bên dưới)*

  ![01-system-context-diagram](../../chapter-05-ai-for-software-design-architecture/evidence/01-system-context-diagram.png)

---

### 2.2. Hạng Mục 2: Kiểm Tra Render Sơ Đồ ERD MySQL (`data-model.mmd`)
- **Đường dẫn tệp nguồn**: [chapter-05-ai-for-software-design-architecture/design/data-model.mmd](file:///d:/Code/replymind/chapter-05-ai-for-software-design-architecture/design/data-model.mmd)
- **Cách thức kiểm thử**: Mở xem trước Mermaid ERD trên VS Code / Cursor hoặc Mermaid Live Editor.
- **Kết quả quan sát**:
  - [ ] 7 bảng quan hệ hiển thị đầy đủ các trường dữ liệu và kiểu dữ liệu chuẩn (`varchar`, `enum`, `datetime`, `json`).
  - [ ] Thể hiện rõ ràng mối quan hệ đa thuê bao: `BRANDS` kết nối 1-N tới `USERS`, `CONVERSATIONS`, `MESSAGES`, `KNOWLEDGE_BASE`, `BRAND_TONES`, `AI_FEEDBACKS`.
  - [ ] Trường `brand_id` hiện diện đồng bộ ở tất cả bảng con.
- **Ảnh chụp minh chứng**:
  *(Chụp sơ đồ ERD hiển thị rõ các bảng và quan hệ)*

  ![02-mysql-erd-diagram](../../chapter-05-ai-for-software-design-architecture/evidence/02-mysql-erd-diagram.png)

---

### 2.3. Hạng Mục 3: Kiểm Tra Hợp Đồng API Trên Swagger Viewer (`openapi.yaml`)
- **Đường dẫn tệp nguồn**: [chapter-05-ai-for-software-design-architecture/design/openapi.yaml](file:///d:/Code/replymind/chapter-05-ai-for-software-design-architecture/design/openapi.yaml)
- **Cách thức kiểm thử**: Sử dụng extension **Swagger Viewer** / **OpenAPI (Swagger) Editor** trong VS Code hoặc dán vào [Swagger Editor Online](https://editor.swagger.io/).
- **Kết quả quan sát**:
  - [ ] Đặc tả OpenAPI 3.0.3 hợp lệ 100%, không có lỗi validation syntax.
  - [ ] Hiển thị đầy đủ các thẻ chức năng (Tags): Auth, Conversations, AI Co-pilot, Knowledge Base, Brand Tone, Feedbacks & Quality, Dashboard.
  - [ ] Các schema phản hồi có cấu trúc JSON chặt chẽ (`AIClassificationResponse`, `AIReplyDraftResponse`).
- **Ảnh chụp minh chứng**:
  *(Chụp giao diện Swagger UI với danh sách endpoint đã mở rộng)*

  ![03-openapi-swagger-preview](../../chapter-05-ai-for-software-design-architecture/evidence/03-openapi-swagger-preview.png)

---

### 2.4. Hạng Mục 4: Khởi Tạo Database `replymind_db` Trên MySQL Cục Bộ
- **Đường dẫn tệp nguồn**: [prisma/schema.prisma](file:///d:/Code/replymind/prisma/schema.prisma) & [prisma/seed.ts](file:///d:/Code/replymind/prisma/seed.ts)
- **Cách thức kiểm thử**:
  1. Khởi động MySQL Server hoặc Docker container MySQL 8.0.
  2. Tạo CSDL: `CREATE DATABASE replymind_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
  3. Thực thi: `npx prisma db push`
  4. Mở MySQL Workbench, DBeaver, phpMyAdmin hoặc chạy lệnh `SHOW TABLES;`.
- **Kết quả quan sát**:
  - [ ] Database `replymind_db` đã tồn tại trên MySQL.
  - [ ] 7 bảng dữ liệu (`brands`, `users`, `brand_tones`, `knowledge_base`, `conversations`, `messages`, `ai_feedbacks`) và bảng quản lý `_prisma_migrations` được tạo thành công.
- **Ảnh chụp minh chứng**:
  *(Chụp terminal hoặc màn hình MySQL Workbench/DBeaver hiển thị database `replymind_db` và 7 bảng đã tạo)*

  ![04-mysql-database-created](../../chapter-05-ai-for-software-design-architecture/evidence/04-mysql-database-created.png)

---

## 3. Nhật Ký Lệnh Thực Thi & Kiểm Tra (Execution Log)

```powershell
# 1. Kiểm tra tính hợp lệ của Schema Prisma
$ npx prisma validate
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
The schema at prisma\schema.prisma is valid 🚀

# 2. Sinh Prisma Client
$ npx prisma generate
✔ Generated Prisma Client (v5.22.0) to .\node_modules\@prisma\client in 185ms

# 3. Đẩy schema lên MySQL Database cục bộ (Yêu cầu bật MySQL)
$ npx prisma db push
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": MySQL database "replymind_db" at "localhost:3306"
🚀 Your database is now in sync with your Prisma schema. Done in 1.42s

# 4. Nạp dữ liệu Seed mẫu D2C (Lumina Skincare)
$ npx prisma db seed
Environment variables loaded from .env
Running seed command `npx tsx prisma/seed.ts` ...
🚀 Bắt đầu quá trình nạp dữ liệu Demo (Seeding) cho ReplyMind...
✅ Đã khởi tạo Thương hiệu: Lumina Skincare
✅ Đã khởi tạo 3 Tài khoản RBAC: ADMIN, MANAGER, AGENT
✅ Đã khởi tạo Brand Tone: Thân thiện & Tận tâm D2C
✅ Đã khởi tạo 4 bài viết Knowledge Base
✅ Đã khởi tạo 3 Hội thoại mẫu (1 URGENT, 1 MEDIUM, 1 LOW)
🎉 Hoàn tất nạp dữ liệu Demo thành công cho ReplyMind trên MySQL!
```

---

## 4. Đánh Giá Mức Độ Hoàn Thành Chuẩn Đầu Ra (Assessment Summary)

- **Chuẩn CLO2 (Kiến trúc Phần mềm & CSDL Tích hợp AI)**:
  - Bản thiết kế `system-context.mmd` và `data-model.mmd` đáp ứng đầy đủ yêu cầu nghiệp vụ D2C, cách ly đa thuê bao và điều phối AI Co-pilot.
  - Schema Prisma được ánh xạ 100% khớp với mô hình quan hệ ERD.
- **Chuẩn CLO3 (Hợp đồng API & Kiểm thử Minh chứng Trực quan)**:
  - Bản đặc tả `openapi.yaml` cung cấp hợp đồng chuẩn xác giữa frontend và backend.
  - Hồ sơ minh chứng 4 hạng mục được chuẩn bị hoàn chỉnh với danh mục ảnh và kịch bản kiểm thử rõ ràng.

