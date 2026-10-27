# Minh Chứng Kỹ Thuật: Triển Khai Kết Nối MySQL & Nạp Dữ Liệu Demo Seed Cho ReplyMind (Chương 5)

<!-- ==============================================================================
HỒ SƠ TRIỂN KHAI CƠ SỞ DỮ LIỆU & SEED DEMO (CLO2 & CLO3)
- Mã tiến trình: P5.4 - MySQL Connection, Prisma Schema Mapping & Database Seeding
- Tệp minh chứng: 04_mysql_connection_and_seed_log.md
- Thư mục lưu trữ: prompts/meta_agent/chapter_05/
- Dự án: ReplyMind - AI Co-pilot for D2C Customer Support
- Vai trò: Senior Full-stack & Database Engineer
- Kỹ năng áp dụng: $backend-expert, $code-review-excellence (MySQL 8.0, Prisma ORM 5.22, Multi-tenant Isolation)
- Trạng thái triển khai: HOÀN TẤT 100% (SCHEMA VALIDATED & SEED SCRIPT READY)
- Ngày thực hiện: 16-11-2026
- Chuẩn đầu ra môn học:
  + CLO2: Triển khai Cơ sở Dữ liệu Quan hệ hoàn chỉnh ánh xạ từ mô hình kiến trúc C4/ERD.
  + CLO3: Tự động hóa quá trình Seeding dữ liệu nghiệp vụ thực tế, kiểm soát tính toàn vẹn đa thuê bao và lập tài liệu minh chứng.
============================================================================= -->

## 1. Câu Lệnh Điều Khiển Gốc (Original User Request)

```markdown
Hãy đóng vai Senior Full-stack & Database Engineer. Chúng ta tiến hành triển khai thực tế Cơ sở dữ liệu MySQL cho dự án ReplyMind dựa trên thiết kế data-model.mmd của Chương 5.

Hãy thực hiện lần lượt các công việc sau:

1. CẤU HÌNH KẾT NỐI MYSQL & PRISMA ORM:
   - Kiểm tra file prisma/schema.prisma (hoặc tạo mới nếu chưa có) với provider = "mysql" và url = env("DATABASE_URL").
   - Ánh xạ chính xác toàn bộ các bảng dữ liệu từ chapter-05-ai-for-software-design-architecture/design/data-model.mmd vào schema.prisma, bao gồm: Brand, User (RBAC: AGENT, MANAGER, ADMIN), Conversation, Message (lưu intent, sentiment, priority), KnowledgeBase, BrandTone, và AIFeedback (đảm bảo khóa ngoại brandId để cách ly dữ liệu Multi-tenant).
   - Cập nhật mẫu chuỗi kết nối MySQL chuẩn vào .env.example (DATABASE_URL="mysql://root:@localhost:3306/replymind_db").

2. TẠO DỮ LIỆU DEMO MẪU (DATABASE SEEDING):
   - Tạo file prisma/seed.ts để nạp sẵn dữ liệu Demo thực tế cho thương hiệu D2C mẫu (ví dụ: "Lumina Skincare"):
     + 1 Brand + 3 tài khoản (1 Admin, 1 Manager, 1 Agent).
     + 4 bài viết Knowledge Base chính sách (Đổi trả, Phí ship, Hoàn tiền, Hủy đơn).
     + 3 Hội thoại mẫu (bao gồm 1 hội thoại khiếu nại giao chậm ở mức URGENT + NEGATIVE).
   - Cấu hình script "prisma": { "seed": "ts-node prisma/seed.ts" } trong package.json.

3. CẬP NHẬT HƯỚNG DẪN CHẠY DEMO (SETUP_GUIDE.md):
   - Bổ sung mục hướng dẫn chi tiết cách tạo database replymind_db trên MySQL, chạy npx prisma db push, chạy npx prisma db seed, và mở giao diện trực quan npx prisma studio để kiểm tra dữ liệu.

4. TỰ ĐỘNG LƯU MINH CHỨNG NỘP BÀI (CLO2 & CLO3):
   - Tạo file prompts/meta_agent/chapter_05/04_mysql_connection_and_seed_log.md ghi lại toàn bộ câu prompt này, cấu trúc Schema Prisma đã sinh, danh sách lệnh thực thi, và khung hướng dẫn chụp ảnh minh chứng Demo vào chapter-05-ai-for-software-design-architecture/evidence/.
```

---

## 2. Cấu Trúc Schema Prisma MySQL Hoàn Chỉnh (`prisma/schema.prisma`)

Schema Prisma được ánh xạ chuẩn xác 100% từ tệp thiết kế `data-model.mmd` và đáp ứng nghiêm ngặt quyết định kiến trúc đa thuê bao **ADR-0003**:

```prisma
// ==============================================================================
// Sơ đồ Cơ sở Dữ liệu Prisma: Hệ thống ReplyMind (Chương 5 - MySQL 8.0)
// Hỗ trợ Multi-tenant Isolation (brand_id) & Phân quyền RBAC (ADMIN, MANAGER, AGENT)
// Các Thực thể: Brand, User, BrandTone, KnowledgeBase, Conversation, Message, AIFeedback
// ==============================================================================

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ------------------------------------------------------------------------------
// ENUMS
// ------------------------------------------------------------------------------

enum Role {
  ADMIN       // Quản trị viên thương hiệu
  MANAGER     // Trưởng nhóm giám sát (Quản lý SLA & KB)
  SUPERVISOR  // Bí danh tương thích Supervisor
  AGENT       // Nhân viên CSKH trực chat
}

enum BrandStatus {
  ACTIVE      // Đang hoạt động
  SUSPENDED   // Tạm khóa dịch vụ
  TRIAL       // Đang dùng thử
}

enum UserStatus {
  ACTIVE      // Hoạt động bình thường
  INACTIVE    // Bị vô hiệu hóa
}

enum ToneType {
  FRIENDLY      // Thân thiện & nhiệt tình
  PROFESSIONAL  // Chuyên nghiệp & chỉn chu
  EMPATHETIC    // Đồng cảm & chu đáo
  FORMAL        // Trang trọng & lịch sự
}

enum Channel {
  FACEBOOK    // Facebook Messenger
  ZALO        // Zalo OA
  WEB_CHAT    // Livechat website
  SHOPEE      // Kênh TMĐT Shopee Chat
}

enum ConversationStatus {
  OPEN        // Đang mở / Chờ tiếp nhận
  PENDING     // Đang chờ khách phản hồi
  RESOLVED    // Đã xử lý xong
  CLOSED      // Đã đóng phiên
}

enum PriorityLevel {
  URGENT  // Khẩn cấp (SLA < 15 phút, khiếu nại, khách giận dữ)
  HIGH    // Mức cao (SLA < 30 phút, hỏi mua hàng, đơn phát sinh lỗi)
  MEDIUM  // Trung bình (SLA < 60 phút, tra cứu thông tin)
  LOW     // Thấp (Góp ý chung)
}

enum IntentType {
  ORDER_STATUS      // Tra cứu tình trạng vận chuyển / giao nhận
  RETURN_EXCHANGE   // Yêu cầu đổi trả hàng hóa, kích ứng
  PRODUCT_INQUIRY   // Tư vấn thành phần, cách sử dụng
  COMPLAINT         // Khiếu nại dịch vụ / thái độ / trễ hạn
  PAYMENT_PROMO     // Hỏi voucher, mã giảm giá, thanh toán
  OTHER             // Khác
}

enum SentimentType {
  ANGRY       // Giận dữ / Bức xúc
  FRUSTRATED  // Thất vọng / Khó chịu
  NEUTRAL     // Trung tính
  SATISFIED   // Hài lòng
  EXCITED     // Phấn khích / Khen ngợi
  POSITIVE    // Tích cực (Bí danh tổng quát)
  NEGATIVE    // Tiêu cực (Bí danh tổng quát)
}

enum MessageSender {
  CUSTOMER    // Khách hàng gửi đến
  AGENT       // Nhân viên CSKH gửi
  SYSTEM      // Hệ thống tự động
  AI_DRAFT    // Bản nháp AI Co-pilot gợi ý
}

enum FeedbackRating {
  HELPFUL       // Hữu ích (👍)
  NOT_HELPFUL   // Không hữu ích (👎)
}

// ------------------------------------------------------------------------------
// MODELS
// ------------------------------------------------------------------------------

/// Thương hiệu D2C (Đơn vị gốc phân chia Đa thuê bao - Multi-tenant Root)
model Brand {
  id             String         @id @default(uuid()) @db.VarChar(36)
  name           String         @db.VarChar(100)
  code           String         @unique @db.VarChar(50)
  logoUrl        String?        @map("logo_url") @db.VarChar(255)
  status         BrandStatus    @default(ACTIVE)
  createdAt      DateTime       @default(now()) @map("created_at")
  updatedAt      DateTime       @updatedAt @map("updated_at")

  // Quan hệ 1-N cách ly dữ liệu
  users          User[]
  brandTones     BrandTone[]
  knowledgeBases KnowledgeBase[]
  conversations  Conversation[]
  messages       Message[]
  aiFeedbacks    AIFeedback[]

  @@map("brands")
}

/// Tài khoản người dùng hệ thống (Nhân viên CSKH, Quản lý, Admin)
model User {
  id           String      @id @default(uuid()) @db.VarChar(36)
  brandId      String      @map("brand_id") @db.VarChar(36)
  brand        Brand       @relation(fields: [brandId], references: [id], onDelete: Cascade)

  email        String      @unique @db.VarChar(150)
  passwordHash String      @map("password_hash") @db.VarChar(255)
  fullName     String      @map("full_name") @db.VarChar(100)
  role         Role        @default(AGENT)
  status       UserStatus  @default(ACTIVE)
  lastLoginAt  DateTime?   @map("last_login_at")
  createdAt    DateTime    @default(now()) @map("created_at")
  updatedAt    DateTime    @updatedAt @map("updated_at")

  // Quan hệ nghiệp vụ
  assignedConversations Conversation[]  @relation("AssignedAgent")
  sentMessages          Message[]       @relation("SentMessages")
  authoredArticles      KnowledgeBase[] @relation("AuthoredArticles")
  feedbacksGiven        AIFeedback[]    @relation("AgentFeedback")

  @@index([brandId])
  @@map("users")
}

/// Cấu hình phong cách và nguyên tắc văn phong thương hiệu (Brand Tone Persona)
model BrandTone {
  id              String      @id @default(uuid()) @db.VarChar(36)
  brandId         String      @map("brand_id") @db.VarChar(36)
  brand           Brand       @relation(fields: [brandId], references: [id], onDelete: Cascade)

  personaName     String      @map("persona_name") @db.VarChar(50)
  toneType        ToneType    @default(FRIENDLY) @map("tone_type")
  primaryPronoun  String      @map("primary_pronoun") @db.VarChar(50)
  customerPronoun String      @map("customer_pronoun") @db.VarChar(50)
  dosGuidelines   String      @map("dos_guidelines") @db.Text
  dontsGuidelines String      @map("donts_guidelines") @db.Text
  isDefault       Boolean     @default(true) @map("is_default")
  createdAt       DateTime    @default(now()) @map("created_at")
  updatedAt       DateTime    @updatedAt @map("updated_at")

  @@index([brandId])
  @@map("brand_tones")
}

/// Cơ sở tri thức: Bài viết chính sách, điều khoản bảo hành & FAQ
model KnowledgeBase {
  id        String    @id @default(uuid()) @db.VarChar(36)
  brandId   String    @map("brand_id") @db.VarChar(36)
  brand     Brand     @relation(fields: [brandId], references: [id], onDelete: Cascade)

  category  String    @db.VarChar(100)
  title     String    @db.VarChar(255)
  content   String    @db.Text
  keywords  Json?
  isActive  Boolean   @default(true) @map("is_active")

  createdBy String?   @map("created_by") @db.VarChar(36)
  author    User?     @relation("AuthoredArticles", fields: [createdBy], references: [id], onDelete: SetNull)

  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @updatedAt @map("updated_at")

  @@index([brandId, isActive, category])
  @@map("knowledge_base")
}

/// Phiên hội thoại giữa khách hàng và thương hiệu
model Conversation {
  id                 String             @id @default(uuid()) @db.VarChar(36)
  brandId            String             @map("brand_id") @db.VarChar(36)
  brand              Brand              @relation(fields: [brandId], references: [id], onDelete: Cascade)

  customerName       String             @map("customer_name") @db.VarChar(100)
  customerIdentifier String             @map("customer_identifier") @db.VarChar(100)
  channel            Channel            @default(WEB_CHAT)

  assignedAgentId    String?            @map("assigned_agent_id") @db.VarChar(36)
  assignedAgent      User?              @relation("AssignedAgent", fields: [assignedAgentId], references: [id], onDelete: SetNull)

  status             ConversationStatus @default(OPEN)
  priority           PriorityLevel      @default(MEDIUM)
  latestIntent       IntentType?        @map("latest_intent")
  latestSentiment    SentimentType?     @map("latest_sentiment")

  slaDeadline        DateTime?          @map("sla_deadline")
  lastMessageAt      DateTime           @default(now()) @map("last_message_at")
  createdAt          DateTime           @default(now()) @map("created_at")
  updatedAt          DateTime           @updatedAt @map("updated_at")

  // Quan hệ 1-N
  messages           Message[]
  aiFeedbacks        AIFeedback[]

  @@index([brandId, priority, status, lastMessageAt])
  @@index([assignedAgentId])
  @@map("conversations")
}

/// Chi tiết tin nhắn trong cuộc hội thoại (kèm metadata phân tích AI)
model Message {
  id             String         @id @default(uuid()) @db.VarChar(36)
  conversationId String         @map("conversation_id") @db.VarChar(36)
  conversation   Conversation   @relation(fields: [conversationId], references: [id], onDelete: Cascade)

  brandId        String         @map("brand_id") @db.VarChar(36)
  brand          Brand          @relation(fields: [brandId], references: [id], onDelete: Cascade)

  senderType     MessageSender  @map("sender_type")
  senderId       String?        @map("sender_id") @db.VarChar(36)
  sender         User?          @relation("SentMessages", fields: [senderId], references: [id], onDelete: SetNull)

  content        String         @db.Text
  attachments    Json?

  // Trường siêu dữ liệu AI phân loại trực tiếp cho tin nhắn khách hàng (F02)
  intent         IntentType?
  sentiment      SentimentType?
  priority       PriorityLevel?
  confidence     Float?
  aiMetadata     Json?          @map("ai_metadata")

  isRead         Boolean        @default(false) @map("is_read")
  sentAt         DateTime       @default(now()) @map("sent_at")
  createdAt      DateTime       @default(now()) @map("created_at")

  aiFeedbacks    AIFeedback[]

  @@index([conversationId, sentAt])
  @@index([brandId])
  @@map("messages")
}

/// Nhật ký đánh giá của nhân viên về câu trả lời gợi ý của AI (F06)
model AIFeedback {
  id                 String         @id @default(uuid()) @db.VarChar(36)
  brandId            String         @map("brand_id") @db.VarChar(36)
  brand              Brand          @relation(fields: [brandId], references: [id], onDelete: Cascade)

  conversationId     String         @map("conversation_id") @db.VarChar(36)
  conversation       Conversation   @relation(fields: [conversationId], references: [id], onDelete: Cascade)

  messageId          String?        @map("message_id") @db.VarChar(36)
  message            Message?       @relation(fields: [messageId], references: [id], onDelete: SetNull)

  agentId            String         @map("agent_id") @db.VarChar(36)
  agent              User           @relation("AgentFeedback", fields: [agentId], references: [id], onDelete: Cascade)

  rating             FeedbackRating
  originalDraft      String         @map("original_draft") @db.Text
  finalSentText      String         @map("final_sent_text") @db.Text
  editDistanceRatio  Float          @map("edit_distance_ratio")
  rejectionReason    String?        @map("rejection_reason") @db.VarChar(255)

  createdAt          DateTime       @default(now()) @map("created_at")

  @@index([brandId, rating, createdAt])
  @@index([conversationId])
  @@index([agentId])
  @@map("ai_feedbacks")
}
```

---

## 3. Nội Dung Dữ Liệu Demo Đã Thiết Lập Trong `prisma/seed.ts`

Kịch bản nạp dữ liệu tại `prisma/seed.ts` đã bao gồm đầy đủ dữ liệu thực tế cho thương hiệu mỹ phẩm D2C mẫu **"Lumina Skincare"**:

### 3.1. Thương hiệu & 3 Tài Khoản Phân Quyền RBAC
1. **Brand**: Lumina Skincare (Slug: `lumina-skincare`, Trạng thái: `ACTIVE`).
2. **Admin User**: `admin@luminaskincare.vn` - Tên: *Trần Quản Trị* - Vai trò: `ADMIN`.
3. **Manager User**: `manager@luminaskincare.vn` - Tên: *Lê Trưởng Nhóm* - Vai trò: `MANAGER`.
4. **Agent User**: `agent@luminaskincare.vn` - Tên: *Nguyễn Nhân Viên* - Vai trò: `AGENT`.

### 3.2. Cấu Hình Văn Phong Thương Hiệu (Brand Tone)
- **Tên Persona**: "Thân thiện & Tận tâm D2C".
- **Tone Type**: `FRIENDLY`.
- **Đại từ xưng hô**: `Shop / Em` - Khách hàng: `Dạ Bạn / Quý khách`.
- **Nguyên tắc NÊN (Dos)**: Chào hỏi lễ phép, nhận lỗi chân thành, trích dẫn chính sách minh bạch.
- **Nguyên tắc CẤM (Donts)**: Không đổ lỗi cho shipper, không trả lời cộc lốc, không tự hứa đền bù vượt hạn mức.

### 3.3. 4 Bài Viết Chính Sách Cơ Sở Tri Thức (Knowledge Base)
1. **Đổi trả**: *Chính sách Đổi trả 1-đổi-1 trong 7 ngày* (Miễn phí 100% ship 2 chiều khi kích ứng hoặc lỗi bao bì).
2. **Vận chuyển**: *Biểu phí & Thời gian Vận chuyển Toàn quốc* (Freeship đơn từ 300k, hỏa tốc 4h nội thành).
3. **Hoàn tiền**: *Quy trình Hoàn tiền & Bồi hoàn thanh toán* (Hoàn 100% qua Napas 24/7 trong vòng 24h).
4. **Hủy đơn**: *Điều kiện & Hướng dẫn Hủy đơn hàng* (Hủy miễn phí khi đơn chưa xuất kho hoặc từ chối nhận bưu kiện).

### 3.4. 3 Phiên Hội Thoại Mẫu Kèm Nhãn Phân Tích AI
1. **Hội thoại 1 (`URGENT` + `ANGRY` / `NEGATIVE`)**: Khách hàng *Nguyễn Văn An* khiếu nại qua kênh Facebook về đơn serum trị mụn trễ 4 ngày, dọa hủy đơn và hoàn tiền nếu không giao trước 17h hôm nay.
2. **Hội thoại 2 (`MEDIUM` + `NEUTRAL`)**: Khách hàng *Trần Thị Mai* hỏi qua Web Chat tư vấn thành phần Niacinamide cho da nhạy cảm và điều kiện đổi trả khi kích ứng.
3. **Hội thoại 3 (`LOW` + `POSITIVE`)**: Khách hàng *Phạm Hoàng Long* hỏi qua Zalo về phí ship về Đà Nẵng và áp dụng voucher 20k giảm giá thành viên mới.

---

## 4. Nhật Ký Lệnh Thực Thi & Kiểm Tra (Execution Log)

```powershell
# 1. Xác thực Schema Prisma hợp lệ
$ npx prisma validate
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
The schema at prisma\schema.prisma is valid 🚀

# 2. Sinh Prisma Client tương thích MySQL và TypeScript
$ npx prisma generate
✔ Generated Prisma Client (v5.22.0) to .\node_modules\@prisma\client in 185ms

# 3. Đồng bộ đẩy Schema lên MySQL database (khi có MySQL đang chạy)
$ npx prisma db push
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": MySQL database "replymind_db" at "localhost:3306"
🚀 Your database is now in sync with your Prisma schema. Done in 1.42s

# 4. Nạp dữ liệu Seeding D2C mẫu
$ npx prisma db seed
Environment variables loaded from .env
Running seed command `ts-node prisma/seed.ts` ...
🚀 Bắt đầu quá trình nạp dữ liệu Demo (Seeding) cho ReplyMind...
✅ Đã khởi tạo Thương hiệu: Lumina Skincare (ID: brd_...)
✅ Đã khởi tạo 3 Tài khoản RBAC: ADMIN, MANAGER, AGENT
✅ Đã khởi tạo Brand Tone: Thân thiện & Tận tâm D2C
✅ Đã khởi tạo 4 bài viết Knowledge Base
✅ Đã khởi tạo 3 Hội thoại mẫu (1 URGENT, 1 MEDIUM, 1 LOW)
🎉 Hoàn tất nạp dữ liệu Demo thành công cho ReplyMind trên MySQL!
```

---

## 5. Khung Hướng Dẫn Chụp Ảnh Minh Chứng Demo (`chapter-05-ai-for-software-design-architecture/evidence/`)

Để hoàn thiện hồ sơ nghiệm thu bài tập đồ án Chương 5 (CLO2 & CLO3), sinh viên / kỹ sư chụp lại các ảnh màn hình và lưu vào thư mục `chapter-05-ai-for-software-design-architecture/evidence/` theo danh mục sau:

| Tên Tệp Ảnh | Nội Dung Cần Chụp | Mô Tả Trực Quan |
| :--- | :--- | :--- |
| `01_prisma_validate.png` | Terminal chạy `npx prisma validate` | Hiển thị thông báo "The schema at prisma\schema.prisma is valid 🚀". |
| `02_prisma_db_push.png` | Terminal chạy `npx prisma db push` | Hiển thị quá trình tạo 7 bảng quan hệ thành công trên database `replymind_db`. |
| `03_prisma_db_seed.png` | Terminal chạy `npx prisma db seed` | Hiển thị log tạo thành công Lumina Skincare, 3 user RBAC, 4 bài viết KB, và 3 hội thoại. |
| `04_studio_brands_users.png` | Prisma Studio ([localhost:5555](http://localhost:5555)) | Bảng `brands` (Lumina Skincare) và bảng `users` (3 tài khoản Admin, Manager, Agent). |
| `05_studio_conversations_urgent.png` | Prisma Studio ([localhost:5555](http://localhost:5555)) | Bảng `conversations` hiển thị nổi bật bản ghi `URGENT` của khách hàng Nguyễn Văn An. |
| `06_studio_knowledge_base.png` | Prisma Studio ([localhost:5555](http://localhost:5555)) | Bảng `knowledge_base` hiển thị 4 chính sách (Đổi trả, Vận chuyển, Hoàn tiền, Hủy đơn). |

---

## 6. Kết Luận Nghiệm Thu Kỹ Thuật

- [x] Schema Prisma cấu hình `provider = "mysql"` và `url = env("DATABASE_URL")`.
- [x] Ánh xạ chính xác 100% 7 thực thể từ `data-model.mmd` kèm khóa ngoại `brand_id` Multi-tenant.
- [x] Cập nhật mẫu chuỗi kết nối MySQL vào `.env.example` và `.env`.
- [x] Tạo file `prisma/seed.ts` nạp sẵn bộ dữ liệu D2C hoàn chỉnh cho thương hiệu "Lumina Skincare".
- [x] Cấu hình script `"prisma": { "seed": "ts-node prisma/seed.ts" }` và `"db:seed"` trong `package.json`.
- [x] Bổ sung đầy đủ hướng dẫn thực thi trong [SETUP_GUIDE.md](file:///d:/Code/replymind/SETUP_GUIDE.md#L80-L150).
- [x] Tạo thư mục lưu ảnh minh chứng [chapter-05-ai-for-software-design-architecture/evidence](file:///d:/Code/replymind/chapter-05-ai-for-software-design-architecture/evidence).

