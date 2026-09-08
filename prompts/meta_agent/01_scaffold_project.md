# Meta Agent Prompt 01: Khởi Tạo Cấu Trúc Sườn Dự Án (Project Scaffolding)

<!-- ==============================================================================
META INFO
- Tên tệp: 01_scaffold_project.md
- Dự án: ReplyMind - AI Co-pilot Chăm sóc Khách hàng D2C
- Vai trò thực thi: Senior AI Software Architect & Lead Engineer
- Phiên bản: 1.0.0
- Ngày tạo: 08-09-2026
- Mục đích: Lưu trữ câu lệnh Meta Prompt chuẩn dùng để khởi tạo toàn bộ sườn dự án (Boilerplate & Directory Tree), các file cấu hình gốc, quy chuẩn AGENTS.md và các file khung rỗng (Stubs) trước khi triển khai các chương nghiệp vụ (Chương 1 - 9).
- Trạng thái thực thi: ĐÃ HOÀN THÀNH (EXECUTED & VERIFIED)
============================================================================== -->

## 1. Thông Tin Tổng Quan (Meta Information)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Dự án** | ReplyMind (AI Co-pilot for D2C Customer Support) |
| **Giai đoạn** | Bước 0: Scaffolding & Agentic Setup (Tiền đề cho Chương 1 - 9) |
| **Bộ công nghệ (Tech Stack)** | Next.js (App Router, React, TypeScript), Tailwind CSS, PostgreSQL (Prisma ORM), Multi-provider LLMs (OpenAI, Claude, Gemini) |
| **Ngôn ngữ chuẩn hóa** | Tiếng Việt (Tài liệu, Header comments, Prompt hướng dẫn) |
| **Quy chuẩn lưu trữ** | Bắt buộc tuân thủ `AGENTS.md` (Strict TypeScript, Clean Architecture, Human-in-the-Loop) |

---

## 2. Nội Dung Meta Prompt Đã Thực Thi (Canonical Execution Prompt)

Dưới đây là nguyên văn câu lệnh (Prompt) tiếng Việt đã được thống nhất và thực thi để thiết lập toàn bộ cấu trúc dự án:

```markdown
Hãy đóng vai một KTS Phần mềm AI Cấp cao (Senior AI Software Architect) và Lập trình viên Trưởng (Lead Engineer).

Tôi đang bắt đầu một dự án AI từ đầu đến cuối (End-to-End / E2E) có tên là "ReplyMind" - Hệ thống AI Co-pilot (trợ lý AI có con người kiểm duyệt) hỗ trợ phản hồi khách hàng cho các thương hiệu D2C (Direct-to-Consumer / Bán hàng trực tiếp tới người tiêu dùng).
Bộ công nghệ chính (Tech Stack) định hướng Web-first gồm: Next.js (React / TypeScript), Tailwind CSS, Node.js (hoặc Next.js API Routes / Express), PostgreSQL (Prisma ORM) / MongoDB, và tích hợp các giao diện lập trình API của mô hình ngôn ngữ lớn LLM (OpenAI / Claude / Gemini).

Trước khi viết bất kỳ mã logic nghiệp vụ (Business Logic) hay tính năng nào (từ Chương 1 đến Chương 9), tôi cần tạo một cấu trúc dự án và bộ mã mẫu ban đầu (Boilerplate) sạch sẽ, sẵn sàng cho sản xuất (Production-ready), đúng chuẩn AI Agent (Agentic Codebase).

Hãy thực hiện từng bước các nhiệm vụ sau:

1. Tạo một file `AGENTS.md` ở thư mục gốc (Root directory) chứa các quy tắc nghiêm ngặt cho kho mã nguồn (Repository rules):
   - Quy chuẩn Kiến trúc & Thư mục (Architecture & Directory conventions): Phân chia tách biệt giữa Giao diện (UI), API, Các dịch vụ (Services), Cơ sở dữ liệu (DB), và Kho lưu trữ Prompt (Prompts).
   - Quy chuẩn Lập trình (Code style guidelines): Chế độ nghiêm ngặt của TypeScript (TypeScript strict mode), định nghĩa Giao diện dữ liệu rõ ràng (Explicit interfaces), xử lý lỗi sạch sẻ (Clean error handling).
   - Quy tắc dành cho các công cụ AI Lập trình (Rules for AI coding agents): Không bao giờ lưu cứng thông tin xác thực (Never hardcode credentials), bắt buộc định dạng đầu ra AI dưới dạng JSON chuẩn (Structured Outputs) khi có yêu cầu, và tuân thủ cơ chế con người duyệt lại (Human-in-the-loop).

2. Tạo toàn bộ cây thư mục dự án với các file khung RỖNG (File stubs - chỉ chứa dòng chú thích header ở đầu file, KHÔNG viết mã logic nghiệp vụ):
   - `docs/`: Chứa tài liệu PRD (Product Requirement Document), Sơ đồ kiến trúc (Architecture Diagram), Đặc tả API (API Specs / OpenAPI / Swagger), và Luồng người dùng (UI User Flows).
   - `prompts/`: Kho lưu trữ quản lý phiên bản các câu lệnh hệ thống (System prompts repository) bao gồm: `intent_classifier.txt` (Phân loại ý định), `sentiment_analyzer.txt` (Phân tích cảm xúc), `reply_generator.txt` (Sinh câu phản hồi).
   - `src/` (hoặc `app/`):
     - `components/`: Các thành phần giao diện UI chia theo vai trò:
       - `agent/`: Danh sách hội thoại (Conversation list), Khung chat (Chat area), Thanh bên phân tích AI (AI Analysis sidebar), Nút thao tác 1-Click.
       - `knowledge-base/`: Giao diện Xem & Form Thêm/Sửa/Xóa bài viết chính sách (Knowledge Base CRUD).
       - `admin/`: Bộ chọn cấu hình phong cách văn phong thương hiệu (Brand Tone selection: Friendly, Professional, Casual, Formal).
       - `dashboard/`: Biểu đồ báo cáo thống kê (Analytics charts) và Tiện ích điểm chất lượng AI (AI Helpful Score widgets).
     - `services/`: Bộ máy xử lý AI (AI Engine stubs: LLM API Client, Context Engineering, RAG stubs), Các dịch vụ kết nối CSDL (Database Services).
     - `api/` (hoặc `controllers/`): Các đầu mối API stubs cho Hội thoại (Conversations), Tin nhắn (Messages), Quản lý KB, Phân tích AI (AI Analysis), Đánh giá (Feedback).
     - `models/` (hoặc `prisma/`): Mô hình sơ đồ CSDL (Database schemas) cho `User`, `Conversation`, `Message`, `KnowledgeBase`, `AIFeedback`.
     - `types/`: Định nghĩa toàn bộ kiểu dữ liệu TypeScript (TypeScript interfaces: `IntentType`, `SentimentType`, `PriorityLevel`, `BrandTone`,...).
   - `tests/`: Bộ khung kiểm thử E2E (End-to-End test stubs bằng Playwright / Cypress) và khung kiểm thử đơn vị (Unit test scaffolding).

3. Tạo các file cấu hình cơ bản ở thư mục gốc:
   - `.env.example` (Chứa các biến môi trường mẫu cho API Keys, DB URL, JWT secrets).
   - `README.md` (Tổng quan dự án, Hướng dẫn cài đặt Setup, Tóm tắt kiến trúc).
   - `package.json` (Danh sách thư viện phụ thuộc Dependencies & Các lệnh Scripts ban đầu).
   - `tsconfig.json` (Cấu hình TypeScript strict).

Hãy tạo toàn bộ các thư mục, file cấu hình và các file khung rỗng này ngay bây giờ. KHÔNG viết mã logic tính năng chi tiết bên trong các file. Sửa nội dung đã làm sang tiếng việt
```

---

## 3. Danh Mục Các Tệp Đã Được Tạo Tương Ứng (Output Deliverables)

1. **Tệp quy chuẩn gốc**:
   - `AGENTS.md` (Bộ luật tối cao cho Kỹ sư & Agent AI).
   - `README.md` (Tổng quan dự án và cẩm nang kỹ thuật).
   - `.env.example` & `.env` (Biến môi trường mẫu & cấu hình cục bộ).
   - `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `.gitignore`.

2. **Tài liệu đặc tả (`docs/`)**:
   - `docs/prd.md`: Tài liệu Yêu cầu Sản phẩm.
   - `docs/architecture.md`: Sơ đồ kiến trúc kỹ thuật & Vòng đời yêu cầu.
   - `docs/openapi.yaml`: Đặc tả REST API chuẩn OpenAPI 3.1.0.
   - `docs/user-flows.md`: Luồng thao tác của nhân viên và quản trị viên.

3. **Kho lưu trữ Prompt (`prompts/`)**:
   - `prompts/README.md`: Quy ước quản lý phiên bản prompt.
   - `prompts/intent_classifier.txt`: Prompt phân loại ý định D2C.
   - `prompts/sentiment_analyzer.txt`: Prompt đánh giá cảm xúc & mức độ khẩn cấp.
   - `prompts/reply_generator.txt`: Prompt sinh phản hồi Co-pilot bám sát RAG.

4. **Sơ đồ cơ sở dữ liệu (`prisma/`)**:
   - `prisma/schema.prisma`: Định nghĩa các thực thể `User`, `Conversation`, `Message`, `KnowledgeBase`, `AIFeedback` và các Enums tương ứng.

5. **Giao diện người dùng (`src/components/`)**:
   - `agent/`: `ConversationList.tsx`, `ChatArea.tsx`, `AIAnalysisSidebar.tsx`, `OneClickActions.tsx`.
   - `knowledge-base/`: `ArticleForm.tsx`, `ArticleList.tsx`.
   - `admin/`: `BrandToneSelector.tsx`.
   - `dashboard/`: `AnalyticsCharts.tsx`, `AIHelpfulScoreWidget.tsx`.

6. **Tầng dịch vụ lõi (`src/services/`)**:
   - `ai/`: `llm-client.ts`, `context-builder.ts`, `rag-service.ts`, `intent-classifier.service.ts`, `reply-generator.service.ts`.
   - `db/`: `prisma.ts`, `conversation.service.ts`, `message.service.ts`, `knowledge-base.service.ts`, `mock-data.ts`.

7. **Các đầu mối API Route Handlers (`src/app/api/`)**:
   - `conversations/route.ts` & `conversations/[id]/messages/route.ts`.
   - `knowledge-base/route.ts`.
   - `ai/analyze/route.ts` & `ai/generate-reply/route.ts`.
   - `feedback/route.ts`.

8. **Kiểu dữ liệu TypeScript (`src/types/`)**:
   - `enums.ts`, `conversation.types.ts`, `ai.types.ts`, `kb.types.ts`, `index.ts`.

9. **Bộ khung kiểm thử (`tests/`)**:
   - `e2e/`: `conversations.spec.ts`, `copilot.spec.ts`.
   - `unit/`: `services/intent-classifier.test.ts`, `components/AgentChat.test.tsx`.

