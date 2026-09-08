# Quy chuẩn Kỹ thuật AI & Giao thức Agent ReplyMind (AGENTS.md)

Tài liệu này xác định các quy tắc lưu trữ bắt buộc, quy ước cấu trúc dự án và quy trình phát triển dành cho kỹ sư con người và các Agent AI lập trình hoạt động trong kho mã nguồn **ReplyMind**.

---

## 1. Tầm nhìn Hệ thống & Kiến trúc Tổng thể

**ReplyMind** là hệ thống AI Co-pilot (trợ lý AI có con người kiểm duyệt) cấp doanh nghiệp, được thiết kế chuyên biệt để hỗ trợ chăm sóc khách hàng cho các thương hiệu D2C (Direct-to-Consumer / Bán lẻ trực tiếp tới người tiêu dùng). Hệ thống cung cấp cho nhân viên hỗ trợ khả năng phân loại hội thoại theo thời gian thực, tổng hợp ngữ cảnh tự động, nhận diện ý định (Intent), theo dõi cảm xúc (Sentiment), và đề xuất bản nháp phản hồi 1-click tuân thủ nghiêm ngặt văn phong thương hiệu.

### Bộ công nghệ chính (Tech Stack)
- **Frontend / Fullstack Framework**: Next.js (App Router, React, TypeScript)
- **Styling**: Tailwind CSS, Radix UI / Headless UI patterns, Lucide Icons
- **Cơ sở dữ liệu & ORM**: PostgreSQL thông qua Prisma ORM
- **Tích hợp Mô hình AI / LLM**: Định tuyến đa mô hình (OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 1.5/2.0 Pro/Flash) thông qua client chuẩn hóa
- **Tìm kiếm Vector / RAG**: PostgreSQL pgvector hoặc Vector DB chuyên dụng để truy xuất tài liệu chính sách
- **Kiểm thử tự động**: Playwright (E2E) và Vitest (Unit & Integration tests)

---

## 2. Cấu trúc Thư mục & Nguyên tắc Phân tách Mô-đun

Để đảm bảo ranh giới rõ ràng giữa Giao diện (UI), Hợp đồng API, Nghiệp vụ cốt lõi (Domain Logic) và Cơ sở dữ liệu, toàn bộ dự án tuân thủ cấu trúc phân cấp sau:

```
replymind/
├── AGENTS.md                   # Các quy định và nguyên tắc tối cao dành cho AI Agent
├── README.md                   # Tổng quan dự án & hướng dẫn cài đặt môi trường
├── .env.example                # Khung tham chiếu biến môi trường chuẩn
├── package.json                # Thư viện phụ thuộc và kịch bản thực thi (Scripts)
├── tsconfig.json               # Cấu hình TypeScript Strict mode với alias path
├── tailwind.config.ts          # Cấu hình Design Tokens Tailwind CSS
├── docs/                       # Tài liệu PRD, Sơ đồ kiến trúc, Đặc tả API, Luồng người dùng
│   ├── prd.md
│   ├── architecture.md
│   ├── openapi.yaml
│   └── user-flows.md
├── prompts/                    # Kho lưu trữ System Prompts được quản lý phiên bản
│   ├── intent_classifier.txt
│   ├── sentiment_analyzer.txt
│   └── reply_generator.txt
├── prisma/                     # Sơ đồ CSDL Prisma Schema & Migrations
│   └── schema.prisma
├── src/
│   ├── app/                    # Next.js App Router (Layouts, Pages, API Route Handlers)
│   │   ├── api/                # Các đầu mối REST API route handlers
│   │   ├── (auth)/             # Nhóm route xác thực người dùng
│   │   ├── (dashboard)/        # Không gian làm việc của nhân viên & quản trị
│   │   └── globals.css         # Stylesheet gốc Tailwind
│   ├── components/             # Các mô-đun UI phân chia theo vai trò
│   │   ├── agent/              # Bàn làm việc hỗ trợ (Hộp thư, Khung chat, Sidebar, Thao tác 1-Click)
│   │   ├── knowledge-base/     # Quản lý bài viết chính sách, FAQ, đồng bộ dữ liệu
│   │   ├── admin/              # Cấu hình văn phong thương hiệu & rào chắn bảo vệ (Guardrails)
│   │   └── dashboard/          # Biểu đồ hiệu suất, Điểm hữu ích của AI (AI Helpfulness)
│   ├── services/               # Nghiệp vụ điều phối AI và truy xuất dữ liệu thuần túy
│   │   ├── ai/                 # Multi-provider LLM clients, context builder, RAG
│   │   └── db/                 # Tầng truy xuất dữ liệu & truy vấn thực thể
│   └── types/                  # Định nghĩa kiểu dữ liệu toàn cục, DTOs và Enums
└── tests/                      # Bộ kiểm thử tự động
    ├── e2e/                    # Luồng kiểm thử đầu-cuối (Playwright E2E)
    └── unit/                   # Kiểm thử đơn vị cho các dịch vụ và thành phần độc lập
```

---

## 3. Tiêu chuẩn Lập trình & Quy chuẩn TypeScript

1. **Tuân thủ TypeScript Strict Mode**:
   - `strict: true` được kích hoạt bắt buộc trong `tsconfig.json`.
   - Tuyệt đối không sử dụng kiểu `any`. Sử dụng `unknown` kết hợp thu hẹp kiểu tại runtime (runtime type narrowing với Zod) hoặc generic constraints.
   - Toàn bộ dữ liệu đầu vào API, tham số truy vấn và webhook payloads bắt buộc phải được kiểm định bằng Zod schemas.

2. **Định nghĩa Giao diện Dữ liệu Rõ ràng (Explicit Interfaces)**:
   - Mọi thực thể nghiệp vụ, tham số phương thức dịch vụ và Props của React Component đều phải có `interface` hoặc `type` tường minh.
   - Đặt interface Props cùng file với Component tương ứng.

3. **Xử lý Lỗi Chặt chẽ & Ghi Nhật ký (Clean Error Handling & Logging)**:
   - Tuyệt đối không nuốt lỗi (nuốt exception) bằng các khối `catch` rỗng.
   - Các phương thức dịch vụ phải trả về cấu trúc `Result<T, E>` tiêu chuẩn hoặc ném lỗi ứng dụng định danh (`AppError`).
   - Che giấu thông tin định danh cá nhân (PII) và mã bảo mật trước khi ghi vào log.

4. **Tách biệt Thành phần Giao diện (Component Isolation)**:
   - Các UI Components trong `src/components/` không được gọi trực tiếp xuống Database.
   - Việc nạp dữ liệu diễn ra ở Next.js Server Components hoặc thông qua Custom Hooks kết nối tới API Routes.

---

## 4. Quy tắc Hoạt động Bắt buộc cho các AI Coding Agent

Khi làm việc trong kho mã nguồn này, mọi Agent AI tự hành (bao gồm Antigravity, Claude Code, Cursor, Copilot) PHẢI TUÂN THỦ NGHIÊM NGẶT các điều răn sau:

1. **Không Bao giờ Lưu Cứng Thông tin Xác thực (Zero Credential Exposure)**:
   - Tuyệt đối không hardcode API keys, secrets, access tokens, hay chuỗi kết nối cơ sở dữ liệu vào mã nguồn.
   - Luôn tham chiếu thông qua biến môi trường đã được kiểm định (`process.env.OPENAI_API_KEY`,...).

2. **Bắt buộc Định dạng Đầu ra AI Dưới dạng JSON Chuẩn (Structured JSON Outputs)**:
   - Khi gọi LLM cho các tác vụ tự động hóa (phân loại ý định, trích xuất thực thể, tính điểm cảm xúc), luôn kích hoạt chế độ JSON mode / Structured Outputs schema (ví dụ: OpenAI Structured Outputs, Zod parsing).
   - Prompt luôn phải chứa câu lệnh rào chắn: `"Output strictly valid JSON matching the specified schema with no markdown fences or preamble."`

3. **Nguyên tắc Con người Phê duyệt Bắt buộc (Human-in-the-Loop - HITL)**:
   - AI Co-pilot chỉ tạo ra bản nháp gợi ý (*draft suggestions*) và thông tin chi tiết. Hệ thống tuyệt đối KHÔNG tự ý gửi tin nhắn ra bên ngoài tới khách hàng khi chưa có hành động phê duyệt rõ ràng của nhân viên hỗ trợ con người.
   - Mọi thao tác mang tính hủy hoại (xóa bài viết cơ sở tri thức, ghi đè cài đặt văn phong thương hiệu toàn cục) đều yêu cầu bước xác nhận từ con người.

4. **Kế thừa & Không Phá vỡ Cấu trúc (Non-Destructive Iteration)**:
   - Giữ nguyên các chú thích, hợp đồng dữ liệu và các interface hiện có trừ khi có chỉ thị tái cấu trúc cụ thể.
   - Khi tạo mô-đun mới, luôn cung cấp header mô tả và hợp đồng kiểu dữ liệu trước khi triển khai logic chi tiết.
