# Tài liệu Thiết kế Kiến trúc Phần mềm & Cơ sở Dữ liệu ReplyMind (Software Architecture & Data Design)

- **Mã tài liệu**: `RM-ARCH-V1.0.0`
- **Phiên bản**: 1.0.0 (Chính thức được phê duyệt)
- **Tác giả**: Senior Software Architect & Fullstack Lead
- **Hệ thống**: ReplyMind AI Co-pilot Platform for D2C Customer Support
- **Kho lưu trữ mã nguồn**: `d:\Code\replymind`

---

## 1. Tổng quan Kiến trúc Hệ thống (Executive Summary)

**ReplyMind** là hệ thống AI Co-pilot (trợ lý AI có con người kiểm duyệt - Human-in-the-Loop) cấp doanh nghiệp, được thiết kế chuyên biệt để hỗ trợ nhân viên chăm sóc khách hàng (CSKH) cho các thương hiệu D2C (Direct-to-Consumer). Hệ thống vận hành theo thời gian thực để:
1. Phân loại ý định khách hàng (Intent), đánh giá cảm xúc (Sentiment) và phát hiện các trường hợp khẩn cấp (`URGENT`) ngay khi tin nhắn đến (F02).
2. Tự động truy xuất điều khoản chính sách từ Cơ sở tri thức (Knowledge Base) và văn phong thương hiệu (Brand Tone) để sinh bản nháp phản hồi 1-click (F04).
3. Đảm bảo an toàn dữ liệu tuyệt đối giữa các thương hiệu độc lập thông qua kiến trúc Đa thuê bao (Multi-tenant Isolation).

### Bộ Công Nghệ Cốt Lõi (Core Tech Stack)
- **Kiến trúc ứng dụng**: Modular Monolith trên nền tảng **Next.js 15 (App Router, React 19, TypeScript Strict Mode)**.
- **Tầng Giao diện (Presentation Layer)**: Tailwind CSS, Radix UI primitives, Lucide Icons, tối ưu bố cục không tràn màn hình (`100dvh`, thanh cuộn mảnh độc lập từng cột).
- **Cơ sở Dữ liệu & ORM**: **MySQL 8.0** kết hợp **Prisma ORM 6.x** với cơ chế phân vùng logic `brand_id`.
- **Động cơ AI (AI Co-pilot Engine)**: Định tuyến đa mô hình (Google Gemini 2.0 Flash / OpenAI GPT-4o) gọi trực tiếp thông qua LLM Client chuẩn hóa, bắt buộc chế độ **Structured JSON Outputs** kèm kiểm định runtime qua **Zod**.
- **Cơ chế Xác thực & Phân quyền**: Stateless JWT mang ngữ cảnh `{ userId, brandId, role }` hỗ trợ phân quyền 3 cấp (`AGENT`, `SUPERVISOR`, `ADMIN`).

```
+-----------------------------------------------------------------------------------------+
|                                    CLIENT BROWSER                                       |
|               Next.js 15 App Router (Agent Workspace, KB Admin, Dashboard)             |
+--------------------------------------------+--------------------------------------------+
                                             | HTTPS / REST API
+--------------------------------------------v--------------------------------------------+
|                        REPLYMIND MODULAR MONOLITH (NODE.JS)                             |
|                                                                                         |
|   +-----------------------+   +------------------------+   +------------------------+   |
|   |  Auth & RBAC Service  |   |  Conversation Service  |   | Knowledge Base Service |   |
|   +-----------------------+   +------------------------+   +------------------------+   |
|   +-----------------------+   +------------------------+   +------------------------+   |
|   |   Brand Tone Service  |   |   AI Feedback Service  |   |  Analytics Dashboard   |   |
|   +-----------------------+   +------------------------+   +------------------------+   |
|                                                                                         |
|   +---------------------------------------------------------------------------------+   |
|   |                         AI Co-pilot Engine (src/services/ai/)                   |   |
|   |      - Classifier (F02)        - Reply Generator (F04)   - Zod Schema Enforcer  |   |
|   +---------------------------------------------------------------------------------+   |
+----------------------+--------------------------------------------------+---------------+
                       | In-Memory Prisma ORM                             | HTTPS JSON
+----------------------v---------------------+     +----------------------v---------------+
|          MySQL 8.0 DATABASE                |     |          LLM PROVIDER APIS           |
| (7 Bảng: Multi-tenant via brand_id)        |     | (Google Gemini 2.0 Flash / GPT-4o)   |
+--------------------------------------------+     +--------------------------------------+
```

---

## 2. Ranh giới Phân tách Mô-đun (Modular Monolith Boundaries)

Hệ thống được tổ chức theo cấu trúc Modular Monolith nhằm đạt hiệu năng tối đa (Zero Network Latency giữa các tầng dịch vụ) mà vẫn bảo toàn tính độc lập, khả năng mở rộng và dễ kiểm thử.

```
replymind/src/
├── app/
│   ├── api/                          # HTTP Route Handlers (Controller Layer)
│   │   ├── auth/                     # POST /api/auth/login, GET /api/auth/me
│   │   ├── conversations/            # GET /api/conversations, POST /api/conversations/:id/messages
│   │   ├── ai/                       # POST /api/ai/classify, POST /api/ai/generate-reply, POST /api/ai/feedbacks
│   │   ├── knowledge-base/           # GET, POST, PUT, DELETE /api/knowledge-base
│   │   ├── brand-tones/              # GET, PUT /api/brand-tones
│   │   └── dashboard/                # GET /api/dashboard/stats
│   ├── (auth)/login/                 # Màn hình đăng nhập tài khoản
│   └── (dashboard)/                  # Không gian làm việc
│       ├── workspace/                # Agent Workspace (Hộp thư, Chat Box, Copilot Sidebar)
│       ├── knowledge-base/           # Quản trị bài viết chính sách
│       ├── settings/brand-tone/      # Cấu hình văn phong thương hiệu
│       └── analytics/                # Thống kê SLA & Điểm trợ giúp AI
├── components/                       # Giao diện UI (React Server & Client Components)
│   ├── agent/                        # ConversationList, ChatPanel, AICopilotSidebar, OneClickSendCTA
│   ├── knowledge-base/               # KBArticleEditor, KBCategoryFilter, KBModal
│   ├── admin/                        # TonePersonaForm, DosAndDontsEditor
│   └── dashboard/                    # SLAMetricCard, HelpfulnessChart, WorkloadGauge
├── services/                         # Tầng Nghiệp Vụ Cốt Lõi (Domain & Data Services)
│   ├── ai/                           # AI Co-pilot Engine
│   │   ├── classifierService.ts      # Điều phối F02 (Intent, Sentiment, Priority)
│   │   ├── replyGeneratorService.ts  # Điều phối F04 (RAG Context + Tone Guardrails)
│   │   ├── promptLoader.ts           # Đọc system prompts từ thư mục prompts/system/
│   │   └── schemas.ts                # Zod schemas kiểm định JSON đầu ra từ LLM
│   └── db/                           # Tầng Truy Xuất Dữ Liệu (Data Access Layer)
│       ├── prismaClient.ts           # Prisma Client với Tenant Scope Extension
│       ├── conversationRepo.ts       # Truy vấn & Cập nhật Hội thoại/Tin nhắn
│       ├── knowledgeRepo.ts          # Truy xuất bài viết tri thức theo từ khóa
│       └── feedbackRepo.ts           # Lưu trữ đánh giá 👍/👎 và tỷ lệ sửa đổi
└── types/                            # Kiểu dữ liệu TypeScript toàn cục & DTOs
```

---

## 3. Thiết kế Cơ sở Dữ liệu MySQL 8.0 & Từ điển Dữ liệu (Data Dictionary)

Cơ sở dữ liệu bao gồm **7 bảng quan hệ chính**, hỗ trợ đầy đủ toàn bộ luồng nghiệp vụ từ phân loại tin nhắn, sinh câu trả lời, lưu trữ bài viết tri thức đến thu thập phản hồi của nhân viên.

```
+-----------------------------------------------------------------------------------+
|                            DANH SÁCH 7 THỰC THỂ MYSQL                             |
|  1. Brands          : Định danh các doanh nghiệp D2C (Multi-tenant root)          |
|  2. Users           : Tài khoản nhân viên, trưởng nhóm và quản trị viên           |
|  3. BrandTones      : Hồ sơ phong cách văn phong & quy tắc NÊN/CẤM                |
|  4. KnowledgeBase   : Kho bài viết chính sách, FAQ bảo hành, đổi trả              |
|  5. Conversations   : Phiên hội thoại giữa khách hàng và thương hiệu              |
|  6. Messages        : Lịch sử tin nhắn chi tiết kèm kết quả phân tích AI          |
|  7. AIFeedbacks     : Nhật ký đánh giá của nhân viên về độ chính xác gợi ý AI     |
+-----------------------------------------------------------------------------------+
```

### Chi tiết Từ điển Dữ liệu (Data Dictionary)

#### 1. Bảng `Brands` (Thương hiệu D2C)
| Tên Cột | Kiểu Dữ Liệu | Ràng Buộc | Mô Tả |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(36)` | `PRIMARY KEY` | UUID thương hiệu (Tenant ID) |
| `name` | `VARCHAR(100)` | `NOT NULL` | Tên thương hiệu hiển thị (e.g. Lumina Fashion) |
| `code` | `VARCHAR(50)` | `UNIQUE, NOT NULL`| Slug mã định danh duy nhất (e.g. lumina-fashion) |
| `logo_url` | `VARCHAR(255)` | `NULLABLE` | Đường dẫn ảnh logo thương hiệu |
| `status` | `ENUM` | `DEFAULT 'ACTIVE'`| `ACTIVE`, `SUSPENDED`, `TRIAL` |
| `created_at`| `DATETIME(3)` | `DEFAULT NOW()` | Thời điểm khởi tạo |
| `updated_at`| `DATETIME(3)` | `ON UPDATE NOW()`| Thời điểm cập nhật cuối |

#### 2. Bảng `Users` (Người dùng & Phân quyền)
| Tên Cột | Kiểu Dữ Liệu | Ràng Buộc | Mô Tả |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(36)` | `PRIMARY KEY` | UUID người dùng |
| `brand_id` | `VARCHAR(36)` | `FOREIGN KEY (Brands.id)` | Khóa ngoại xác định đơn vị chủ quản |
| `email` | `VARCHAR(150)` | `UNIQUE, NOT NULL`| Email đăng nhập hệ thống |
| `password_hash` | `VARCHAR(255)` | `NOT NULL` | Chuỗi băm mật khẩu bảo mật (Argon2id/Bcrypt) |
| `full_name`| `VARCHAR(100)` | `NOT NULL` | Họ tên nhân viên |
| `role` | `ENUM` | `NOT NULL` | `ADMIN`, `SUPERVISOR`, `AGENT` |
| `status` | `ENUM` | `DEFAULT 'ACTIVE'`| `ACTIVE`, `INACTIVE` |
| `last_login_at` | `DATETIME(3)` | `NULLABLE` | Thời gian đăng nhập gần nhất |
| `created_at`| `DATETIME(3)` | `DEFAULT NOW()` | Thời điểm tạo tài khoản |
| `updated_at`| `DATETIME(3)` | `ON UPDATE NOW()`| Thời điểm cập nhật |

#### 3. Bảng `BrandTones` (Hồ sơ Văn phong Thương hiệu)
| Tên Cột | Kiểu Dữ Liệu | Ràng Buộc | Mô Tả |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(36)` | `PRIMARY KEY` | UUID cấu hình văn phong |
| `brand_id` | `VARCHAR(36)` | `FOREIGN KEY (Brands.id)` | Thuộc về thương hiệu |
| `persona_name`| `VARCHAR(50)` | `NOT NULL` | Tên persona (e.g. Thân thiện D2C, Chuyên nghiệp) |
| `tone_type`| `ENUM` | `NOT NULL` | `FRIENDLY`, `PROFESSIONAL`, `EMPATHETIC`, `FORMAL` |
| `primary_pronoun` | `VARCHAR(50)` | `NOT NULL` | Xưng hô phía CSKH (Shop, Em, Chúng tôi) |
| `customer_pronoun`| `VARCHAR(50)` | `NOT NULL` | Xưng hô với khách (Bạn, Dạ Quý khách) |
| `dos_guidelines` | `TEXT` | `NOT NULL` | Danh sách nguyên tắc NÊN làm (lưu JSON/Markdown) |
| `donts_guidelines`| `TEXT` | `NOT NULL` | Danh sách điều CẤM kỵ (lưu JSON/Markdown) |
| `is_default`| `BOOLEAN` | `DEFAULT TRUE` | Đặt làm văn phong mặc định áp dụng |
| `created_at`| `DATETIME(3)` | `DEFAULT NOW()` | Thời điểm tạo |
| `updated_at`| `DATETIME(3)` | `ON UPDATE NOW()`| Thời điểm cập nhật |

#### 4. Bảng `KnowledgeBase` (Kho Tri thức & Chính sách CSKH)
| Tên Cột | Kiểu Dữ Liệu | Ràng Buộc | Mô Tả |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(36)` | `PRIMARY KEY` | UUID bài viết tri thức |
| `brand_id` | `VARCHAR(36)` | `FOREIGN KEY (Brands.id)` | Phân tách dữ liệu thương hiệu |
| `category` | `VARCHAR(100)` | `NOT NULL` | Phân nhóm: Đổi trả, Bảo hành, Vận chuyển,... |
| `title` | `VARCHAR(255)` | `NOT NULL` | Tiêu đề điều khoản hoặc câu hỏi FAQ |
| `content` | `TEXT` | `NOT NULL` | Nội dung chi tiết các điều kiện và quy tắc xử lý |
| `keywords` | `JSON` | `NULLABLE` | Mảng từ khóa hỗ trợ tìm kiếm nhanh |
| `is_active`| `BOOLEAN` | `DEFAULT TRUE` | Hiệu lực (chỉ bài active mới nạp vào RAG prompt) |
| `created_by`| `VARCHAR(36)` | `FOREIGN KEY (Users.id)` | Nhân viên biên soạn |
| `created_at`| `DATETIME(3)` | `DEFAULT NOW()` | Thời điểm tạo |
| `updated_at`| `DATETIME(3)` | `ON UPDATE NOW()`| Thời điểm chỉnh sửa |

#### 5. Bảng `Conversations` (Hội thoại Khách hàng)
| Tên Cột | Kiểu Dữ Liệu | Ràng Buộc | Mô Tả |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(36)` | `PRIMARY KEY` | UUID phiên hội thoại |
| `brand_id` | `VARCHAR(36)` | `FOREIGN KEY (Brands.id)` | Phân vùng đa thuê bao |
| `customer_name`| `VARCHAR(100)` | `NOT NULL` | Tên hiển thị của khách hàng |
| `customer_identifier`| `VARCHAR(100)`| `NOT NULL` | SĐT, Zalo ID, Facebook Messenger PSID |
| `channel` | `ENUM` | `NOT NULL` | `FACEBOOK`, `ZALO`, `WEB_CHAT`, `SHOPEE` |
| `assigned_agent_id` | `VARCHAR(36)`| `NULLABLE` | Nhân viên đang nhận xử lý |
| `status` | `ENUM` | `DEFAULT 'OPEN'` | `OPEN`, `PENDING`, `RESOLVED`, `CLOSED` |
| `priority` | `ENUM` | `DEFAULT 'MEDIUM'`| `URGENT`, `HIGH`, `MEDIUM`, `LOW` |
| `latest_intent` | `ENUM` | `NULLABLE` | Ý định mới nhất được AI gắn nhãn (F02) |
| `latest_sentiment` | `ENUM` | `NULLABLE` | Cảm xúc khách hàng mới nhất (F02) |
| `sla_deadline` | `DATETIME(3)` | `NULLABLE` | Thời hạn cam kết phản hồi của ca trực |
| `last_message_at` | `DATETIME(3)` | `NOT NULL` | Timestamp tin nhắn mới nhất |
| `created_at`| `DATETIME(3)` | `DEFAULT NOW()` | Bắt đầu hội thoại |
| `updated_at`| `DATETIME(3)` | `ON UPDATE NOW()`| Cập nhật trạng thái |

#### 6. Bảng `Messages` (Lịch sử Tin nhắn)
| Tên Cột | Kiểu Dữ Liệu | Ràng Buộc | Mô Tả |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(36)` | `PRIMARY KEY` | UUID tin nhắn |
| `conversation_id` | `VARCHAR(36)` | `FOREIGN KEY (Conversations.id)` | Thuộc hội thoại nào |
| `brand_id` | `VARCHAR(36)` | `FOREIGN KEY (Brands.id)` | Denormalized để query nhanh |
| `sender_type` | `ENUM` | `NOT NULL` | `CUSTOMER`, `AGENT`, `SYSTEM`, `AI_DRAFT` |
| `sender_id` | `VARCHAR(36)` | `NULLABLE` | ID nhân viên nếu sender_type = AGENT |
| `content` | `TEXT` | `NOT NULL` | Nội dung văn bản tin nhắn |
| `attachments` | `JSON` | `NULLABLE` | Danh sách link hình ảnh / tài liệu gửi kèm |
| `ai_metadata` | `JSON` | `NULLABLE` | Metadata `{intent, confidence, sentiment, urgency_reason, recommended_kb_ids}` |
| `is_read` | `BOOLEAN` | `DEFAULT FALSE` | Trạng thái đọc của nhân viên |
| `sent_at` | `DATETIME(3)` | `NOT NULL` | Thời điểm gửi |
| `created_at`| `DATETIME(3)` | `DEFAULT NOW()` | Thời điểm lưu bản ghi |

#### 7. Bảng `AIFeedbacks` (Nhật ký Phản hồi & Đánh giá Gợi ý AI)
| Tên Cột | Kiểu Dữ Liệu | Ràng Buộc | Mô Tả |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(36)` | `PRIMARY KEY` | UUID bản ghi phản hồi |
| `brand_id` | `VARCHAR(36)` | `FOREIGN KEY (Brands.id)` | Phân vùng đa thuê bao |
| `conversation_id` | `VARCHAR(36)` | `FOREIGN KEY (Conversations.id)` | Hội thoại liên quan |
| `message_id` | `VARCHAR(36)` | `NULLABLE` | Tin nhắn AI gợi ý được đánh giá |
| `agent_id` | `VARCHAR(36)` | `FOREIGN KEY (Users.id)` | Nhân viên thực hiện đánh giá |
| `rating` | `ENUM` | `NOT NULL` | `HELPFUL`, `NOT_HELPFUL` |
| `original_draft` | `TEXT` | `NOT NULL` | Bản nháp ban đầu do AI sinh ra |
| `final_sent_text`| `TEXT` | `NOT NULL` | Bản văn thực tế nhân viên gửi đi sau khi sửa |
| `edit_distance_ratio` | `FLOAT` | `NOT NULL` | Tỷ lệ chỉnh sửa Levenshtein [0.0 - 1.0] |
| `rejection_reason` | `VARCHAR(255)`| `NULLABLE` | Lý do bấm không hữu ích (Sai chính sách,...) |
| `created_at`| `DATETIME(3)` | `DEFAULT NOW()` | Thời điểm gửi feedback |

---

## 4. Chiến lược Cô lập Đa thuê bao (Multi-tenant Isolation Strategy)

Tuân thủ nghiêm ngặt **ADR-0003**, ReplyMind sử dụng mô hình Shared Database với trường phân vùng logic `brand_id`.

### Cơ chế Bảo vệ 3 Lớp (Three-Layer Protection):
1. **Lớp 1: Token Scope Verification (Next.js Middleware)**:
   - Khi request đến, middleware giải mã JWT và trích xuất `brandId`.
   - Nếu endpoint có tham số `:brandId` hoặc `:conversationId`, hệ thống đối soát `brandId` trong token với tài nguyên yêu cầu.
2. **Lớp 2: Prisma Client Tenant Extension**:
   - Tầng Data Access Layer cấu hình Prisma Extension tự động tiêm điều kiện `where: { brandId: currentTenant.brandId }` vào tất cả các phương thức truy vấn (`findMany`, `findFirst`, `count`, `update`, `delete`).
3. **Lớp 3: Database Composite Indexes**:
   - Thiết lập chỉ mục phức hợp để tối ưu hóa truy vấn có điều kiện `brand_id`:
   ```sql
   CREATE INDEX idx_conversations_tenant_priority ON Conversations(brand_id, priority, status, last_message_at DESC);
   CREATE INDEX idx_messages_tenant_conversation ON Messages(brand_id, conversation_id, sent_at ASC);
   CREATE INDEX idx_kb_tenant_active ON KnowledgeBase(brand_id, is_active, category);
   CREATE INDEX idx_feedbacks_tenant_rating ON AIFeedbacks(brand_id, rating, created_at DESC);
   ```

---

## 5. Mô hình Điều phối AI Co-pilot & Structured Outputs Pipeline

Tuân thủ nghiêm ngặt **ADR-0004** và **Quy tắc Agent trong AGENTS.md**:
- **Quy tắc Tuyệt đối 1 (Human-in-the-Loop)**: AI không bao giờ tự động gửi tin nhắn ra bên ngoài; luôn yêu cầu thao tác 1-Click Send hoặc chỉnh sửa của Agent.
- **Quy tắc Tuyệt đối 2 (Structured JSON Outputs)**: Mọi lệnh gọi LLM đều ép kiểu đầu ra dưới dạng JSON thuần túy, được parse và kiểm tra tính hợp lệ bằng thư viện Zod.

```
+-----------------------------------------------------------------------------------------+
|                                LUỒNG XỬ LÝ AI CO-PILOT                                  |
|                                                                                         |
|  1. Tin nhắn mới tới ---> F02 Classifier (Gemini 2.0 Flash / GPT-4o)                    |
|                           [Prompt: prompts/system/intent_classifier.txt]                |
|                           [Output: JSON Intent, Sentiment, Priority, Reason]            |
|                           [Zod Validation: IntentClassificationSchema]                  |
|                                     |                                                   |
|  2. Agent mở chat    ---> F04 Reply Generator Service                                    |
|                           [Truy xuất 2-3 bài viết KB phù hợp nhất từ MySQL]             |
|                           [Lấy Persona Brand Tone từ BrandTones]                        |
|                           [Prompt: prompts/system/reply_generator.txt + Context]        |
|                           [LLM Response: Structured JSON Draft Reply]                   |
|                           [Zod Validation: ReplyGenerationSchema]                       |
|                                     |                                                   |
|  3. Hiển thị UI      ---> Render Copilot Sidebar (Bản nháp + Trích dẫn chính sách)      |
|                                     |                                                   |
|  4. Agent quyết định ---> Bấm "1-Click Send" HOẶC "Chỉnh sửa rồi gửi"                  |
|                           [POST /api/conversations/:id/messages]                        |
|                                     |                                                   |
|  5. Feedback Loop    ---> Ghi nhận 👍/👎 + Tính tỷ lệ sai lệch Edit Distance Ratio       |
|                           [Lưu vào bảng AIFeedbacks phục vụ tối ưu Prompt F07]          |
+-----------------------------------------------------------------------------------------+
```

---

## 6. Cơ chế Xác thực & Ma trận Phân quyền RBAC

Hệ thống triển khai Stateless JWT Authentication theo **ADR-0002**.

### Phân Cấp Vai Trò (Roles):
- **`AGENT`**: Nhân viên trực chat, phụ trách xử lý hội thoại, gửi câu trả lời gợi ý, đánh giá feedback AI.
- **`SUPERVISOR`**: Trưởng ca / QA, có toàn quyền của Agent, bổ sung quyền quản lý Cơ sở tri thức (KB Articles), theo dõi báo cáo SLA và phân bổ hội thoại.
- **`ADMIN`**: Quản trị viên thương hiệu, có toàn quyền hệ thống, quản lý tài khoản nhân viên, cấu hình Brand Tone & Nguyên tắc NÊN/CẤM.

---

## 7. Yêu cầu Phi Chức Năng (Non-Functional Requirements - NFRs)

| Tiêu Chí | Chỉ Tiêu Cam Kết (Target SLA) | Giải Pháp Kiến Trúc Đảm Bảo |
| :--- | :--- | :--- |
| **Độ trễ Gợi ý AI (AI Draft Latency)** | $\le 2.0$ giây (P95) | Sử dụng Gemini 2.0 Flash / GPT-4o-mini với prompt được tối ưu gọn gàng; context KB thu hẹp 2-3 bài liên quan nhất. |
| **Tốc độ tải Hộp thư (Inbox Load Time)**| $\le 100$ ms | Composite index `(brand_id, priority, last_message_at DESC)` trên MySQL; phân trang 20 items/page. |
| **Tính khả dụng (Availability)** | $99.9\%$ Uptime ca trực | Triển khai Stateless Container trên môi trường Cloud có tự động khôi phục (Auto-healing). |
| **Bảo mật Dữ liệu (Security & Isolation)** | 0% Rò rỉ Multi-tenant | Ép buộc lọc `brand_id` qua Prisma Extension, mã hóa mật khẩu bằng Argon2id, kiểm soát RBAC qua JWT. |
| **Khả năng Mở rộng (Scalability)** | Hỗ trợ 200+ agents trực đồng thời / thương hiệu | Kiến trúc Modular Monolith tối ưu bộ nhớ, pooling kết nối MySQL qua Prisma Accelerate hoặc ProxyPool. |

---

## 8. Danh mục Tài liệu & Sơ đồ Kèm theo

1. **Sơ đồ Ngữ cảnh Hệ thống**: `chapter-05-ai-for-software-design-architecture/design/system-context.mmd`
2. **Mô hình Dữ liệu Quan hệ MySQL (ERD)**: `chapter-05-ai-for-software-design-architecture/design/data-model.mmd`
3. **Đặc tả Hợp đồng API (OpenAPI 3.0.3)**: `chapter-05-ai-for-software-design-architecture/design/openapi.yaml`
4. **Hồ sơ Quyết định Kiến trúc (ADRs)**:
   - `docs/decisions/ADR-0001.md`: Kiến trúc Modular Monolith trên Next.js 15
   - `docs/decisions/ADR-0002.md`: Xác thực Stateless JWT & Phân quyền RBAC 3 cấp
   - `docs/decisions/ADR-0003.md`: Chiến lược Đa thuê bao Multi-tenant trên MySQL 8.0
   - `docs/decisions/ADR-0004.md`: Nguyên tắc Điều phối AI Co-pilot & Structured Outputs

