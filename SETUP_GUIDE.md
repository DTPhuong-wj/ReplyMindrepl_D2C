# HƯỚNG DẪN CÀI ĐẶT & KHỞI CHẠY HỆ THỐNG REPLYMIND (SETUP GUIDE)

<!-- ==============================================================================
TÀI LIỆU HƯỚNG DẪN TRIỂN KHAI & CÀI ĐẶT
Dự án: ReplyMind - AI Co-pilot for D2C Customer Support
Phiên bản: 1.0.0
Ngày cập nhật: 2026-11-10
============================================================================== -->

Tài liệu này cung cấp hướng dẫn từng bước để thiết lập môi trường, cấu hình biến môi trường, cài đặt các gói phụ thuộc và khởi chạy ứng dụng **ReplyMind** trên máy tính cá nhân phục vụ học tập, phát triển và thử nghiệm.

---

## 1. Yêu Cầu Môi Trường (System Prerequisites)

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt các công cụ sau:
- **Node.js**: Phiên bản `18.18.0` trở lên hoặc `20.x` / `22.x` (Khuyến nghị bản LTS).
  ```bash
  node -v
  ```
- **NPM** (hoặc PNPM / Yarn): Thường đi kèm sẵn với Node.js.
  ```bash
  npm -v
  ```
- **Git**: Dùng để quản lý mã nguồn.
- **Khóa API Google Gemini** (Miễn phí qua Google AI Studio): Để kích hoạt tính năng phân tích ý định và sinh câu trả lời Co-pilot.

---

## 2. Các Bước Cài Đặt Từng Bước (Step-by-Step Setup)

### Bước 1: Sao chép Mã Nguồn & Truy cập Thư mục Dự án
```bash
git clone <URL_KHO_MA_NGUON> replymind
cd replymind
```

### Bước 2: Cài Đặt Các Thư Viện Phụ Thuộc (Dependencies)
Thực thi lệnh sau tại thư mục gốc của dự án:
```bash
npm install
```
*Ghi chú: Quá trình cài đặt sẽ kéo các thư viện chính: Next.js 14, React 18, Tailwind CSS, Lucide Icons, Prisma ORM, Zod, Vitest và Playwright.*

---

## 3. Cấu Hình Biến Môi Trường (Environment Variables)

1. Tạo tệp `.env.local` (hoặc chỉnh sửa trực tiếp tệp `.env` có sẵn):
   ```bash
   cp .env.example .env.local
   ```

2. Cập nhật các thông số quan trọng trong `.env.local`:
   ```env
   # Môi trường chạy
   NODE_ENV="development"
   PORT=3000
   NEXT_PUBLIC_APP_URL="http://localhost:3000"

   # Cơ sở dữ liệu (PostgreSQL hoặc SQLite cục bộ)
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/replymind?schema=public"

   # Khóa bí mật phiên làm việc
   NEXTAUTH_SECRET="replymind-super-secure-dev-secret-key-32-chars"
   JWT_SECRET="replymind-dev-jwt-secret-key-12345"

   # Khóa API AI (Google Gemini là nhà cung cấp mặc định đã chốt)
   GEMINI_API_KEY="AIzaSy..." # Thay bằng khóa API Gemini của bạn

   # Mô hình LLM mặc định
   DEFAULT_LLM_PROVIDER="gemini"
   DEFAULT_COMPLETION_MODEL="gemini-1.5-flash"
   ```

> **Mẹo hữu ích (Pro-tip)**: Nếu bạn chưa cài đặt PostgreSQL cục bộ, hệ thống ReplyMind đã được tích hợp sẵn tầng dữ liệu **Mock Data D2C** phong phú (`src/services/db/mock-data.ts`) tự động hoạt động mượt mà mà không làm gián đoạn trải nghiệm giao diện!

---

## 4. Hướng Dẫn Cài Đặt MySQL & Khởi Tạo Database (Chương 5)

Theo quyết định kiến trúc chính thức ở **Chương 5 (ADR-0003)**, ReplyMind sử dụng **MySQL 8.0** làm cơ sở dữ liệu quan hệ chính với mô hình Đa thuê bao (Multi-tenant) cách ly qua `brand_id`. Dưới đây là các bước thiết lập chi tiết để khởi tạo CSDL `replymind_db` và nạp dữ liệu Demo mẫu:

### 4.1. Chuẩn Bị & Cài Đặt MySQL 8.0

Bạn có thể lựa chọn 1 trong 2 cách sau:

#### Cách 1: Khởi chạy nhanh qua Docker (Khuyến nghị)
Khởi chạy container MySQL 8.0 với tên database `replymind_db`:
```bash
docker run --name replymind-mysql -e MYSQL_ROOT_PASSWORD=RootPassword@123 -e MYSQL_DATABASE=replymind_db -p 3306:3306 -d mysql:8.0 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

#### Cách 2: Cài Đặt MySQL Server Cục Bộ (Windows / XAMPP / MySQL Workbench)
1. Cài đặt **MySQL Community Server 8.0** hoặc khởi động dịch vụ MySQL trong XAMPP/Laragon.
2. Mở MySQL Command Line Client hoặc MySQL Workbench, đăng nhập với tài khoản `root` và tạo cơ sở dữ liệu `replymind_db`:
   ```sql
   CREATE DATABASE IF NOT EXISTS replymind_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

---

### 4.2. Cấu Hình Chuỗi Kết Nối DATABASE_URL

Mở tệp `.env.local` (hoặc `.env`) và cập nhật thông số `DATABASE_URL` theo đúng định dạng MySQL:
```env
# Cấu hình Cơ sở dữ liệu MySQL 8.0 cho kiến trúc Đa thuê bao (Chương 5)
DATABASE_URL="mysql://root:RootPassword@123@localhost:3306/replymind_db"
```
*(Lưu ý: Nếu dùng tài khoản root không có mật khẩu cục bộ, đặt `DATABASE_URL="mysql://root:@localhost:3306/replymind_db"`).*

---

### 4.3. Đẩy Cấu Trúc Bảng Lên MySQL (`npx prisma db push`)

Hệ thống quản lý 7 bảng dữ liệu quan hệ (`Brand`, `User`, `BrandTone`, `KnowledgeBase`, `Conversation`, `Message`, `AIFeedback`). Đồng bộ cấu trúc bảng tự động:
```bash
npx prisma db push
```
*(Lệnh này đọc trực tiếp `prisma/schema.prisma` và tự động tạo 7 bảng quan hệ, các khóa ngoại và chỉ mục Composite Index trên MySQL `replymind_db`).*

Đồng thời cập nhật Prisma Client cho TypeScript:
```bash
npx prisma generate
```

---

### 4.4. Nạp Dữ Liệu Demo Mẫu D2C (`npx prisma db seed`)

Chạy kịch bản nạp sẵn dữ liệu Demo cho thương hiệu D2C **"Lumina Skincare"** (1 Brand, 3 tài khoản RBAC Admin/Manager/Agent, 1 BrandTone, 4 bài viết Knowledge Base và 3 Hội thoại mẫu có phân loại AI Intent/Sentiment/Urgency):
```bash
# Cách 1: Sử dụng npx tsx thông qua Prisma (Khuyến nghị cho ESM)
npx prisma db seed

# Cách 2: Thông qua npm script
npm run db:seed

# Cách 3: Chạy trực tiếp bằng Node.js v22+ (Native Type Stripping, không cần thêm tool)
npm run db:seed:node
```

---

### 4.5. Mở Trình Quản Trị Dữ Liệu Trực Quan (`npx prisma studio`)

Để kiểm tra trực quan các bản ghi đã nạp vào 7 bảng dữ liệu trên trình duyệt web:
```bash
npx prisma studio
```
Truy cập: 👉 **[http://localhost:5555](http://localhost:5555)**
Tại đây bạn có thể duyệt qua bảng `brands`, `users`, `conversations`, `messages`, `knowledge_base`, `brand_tones`, `ai_feedbacks` một cách trực quan.

> **Mẹo linh hoạt**: Nếu bạn đang trong môi trường chưa cài đặt MySQL, ứng dụng vẫn có tầng dự phòng **Mock Data D2C** (`src/services/db/mock-data.ts`) tự động hoạt động mượt mà cho giao diện Prototype và các bài kiểm thử tự động!
```
Truy cập: 👉 **[http://localhost:5555](http://localhost:5555)**

> **Mẹo linh hoạt**: Nếu bạn đang trong môi trường không cài đặt MySQL, ứng dụng vẫn có tầng dự phòng **Mock Data D2C** (`src/services/db/mock-data.ts`) tự động hoạt động hoàn hảo cho giao diện Prototype và các bài kiểm thử!

---

## 5. Khởi Chạy Máy Chủ Phát Triển (Development Server)

Khởi động ứng dụng Next.js:
```bash
npm run dev
```

Mở trình duyệt web và truy cập địa chỉ:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 6. Chạy Bộ Kiểm Thử Tự Động (Testing)

### 6.1. Kiểm thử Đơn vị & Dịch vụ (Unit Tests với Vitest)
```bash
# Chạy một lần
npm run test

# Chạy chế độ theo dõi thay đổi (Watch mode)
npm run test:watch
```

### 6.2. Kiểm thử Đầu-Cuối (End-to-End Tests với Playwright)
```bash
# Chạy toàn bộ kịch bản E2E
npm run test:e2e
```

---

## 7. Cấu Trúc Các Thư Mục Quan Trọng

- `src/components/agent/`: Bàn làm việc của nhân viên CSKH (Hộp thư, Khung chat, Phân tích AI, Nút 1-Click).
- `src/components/knowledge-base/`: Giao diện quản lý bài viết chính sách và FAQ.
- `src/components/admin/`: Bảng điều khiển cấu hình văn phong thương hiệu (Brand Tone).
- `src/components/dashboard/`: Biểu đồ thống kê và Tiện ích điểm hữu ích của AI.
- `src/services/ai/`: Bộ điều phối AI (Gemini Client, Context Builder, RAG search, Intent Classifier).
- `src/services/db/`: Tầng truy xuất CSDL Prisma kèm Mock Data D2C dự phòng.
- `prompts/`: Kho lưu trữ quản lý phiên bản các câu lệnh hệ thống.

---

## 8. Xử Lý Sự Cố Thường Gặp (Troubleshooting)

### 8.1. Lỗi `EPERM: operation not permitted` (Khóa tệp trên Windows)
- **Triệu chứng**: `npm error code EPERM`, không thể xóa hoặc ghi đè thư mục `node_modules` (như `fast-glob`, `next`).
- **Nguyên nhân**: Hệ điều hành Windows, phần mềm diệt virus (Windows Defender) hoặc IDE (VS Code) đang giữ khóa độc quyền (file lock) đối với các tệp tin trong `node_modules`.
- **Cách khắc phục triệt để**:
  1. Tắt các tiến trình Node.js đang chạy ngầm:
     ```powershell
     Stop-Process -Name node -Force -ErrorAction SilentlyContinue
     ```
  2. Xóa sạch thư mục cache và `node_modules`:
     ```powershell
     Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue
     npm cache clean --force
     ```
  3. Cài đặt lại với quyền Admin hoặc chạy PowerShell/Terminal ở chế độ thông thường sau khi đã giải phóng khóa tệp.

### 8.2. Lỗi `ECONNRESET` / Thất bại tại `node scripts/postinstall.js` của `@prisma/engines`
- **Triệu chứng**: Quá trình cài đặt bị treo hoặc văng lỗi `Error: aborted`, `ECONNRESET` khi đang tải binary Prisma (`query-engine-windows.exe`).
- **Nguyên nhân**: Mạng internet chập chờn hoặc tường lửa/proxy ngắt kết nối giữa chừng khi tải tệp binary dung lượng lớn (> 40MB) từ CDN GitHub của Prisma.
- **Cách khắc phục**:
  1. Sử dụng tệp cấu hình `.npmrc` đã được tạo sẵn ở thư mục gốc (tăng timeout lên 5 phút và tự động retry 5 lần).
  2. Bỏ qua bước postinstall tự động tải binary khi chạy `npm install`:
     ```powershell
     $env:PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING="1"
     npm install --ignore-scripts
     ```
  3. Sau khi cài xong toàn bộ dependencies, chạy riêng lệnh sinh Prisma Client:
     ```powershell
     npx prisma generate
     ```

### 8.3. Lỗi `GEMINI_API_KEY is not defined`
- Kiểm tra tệp `.env.local` đã có giá trị `GEMINI_API_KEY` hợp lệ chưa và khởi động lại máy chủ `npm run dev`.

### 8.4. Lỗi kết nối PostgreSQL
- Nếu không có PostgreSQL cục bộ, hệ thống tự động kích hoạt chế độ **Mock Data D2C** dự phòng (`src/services/db/mock-data.ts`), giao diện vẫn tải đầy đủ 4 cuộc hội thoại mẫu và 5 bài viết chính sách để kiểm thử bình thường.

### 8.5. Cổng 3000 bị chiếm dụng (Port in use)
- Chạy với cổng khác: `PORT=3001 npm run dev` hoặc tắt tiến trình chiếm cổng:
  ```powershell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
  ```

### 8.6. Lỗi Xung Đột ES Module (ESM) Khi Chạy `npx prisma db seed` với `ts-node`
- **Triệu chứng**:
  - `TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for prisma/seed.ts`
  - Hoặc `SyntaxError: Cannot use import statement outside a module`
- **Nguyên nhân**:
  - Dự án ReplyMind cấu hình TypeScript hiện đại với `moduleResolution: "bundler"` và cú pháp ES Module (`import/export`).
  - Bộ công cụ `ts-node` mặc định chạy ở chế độ CommonJS và thường xung đột với cơ chế tải module trên Node.js v18/v20/v22+ nếu thiếu cờ loader hoặc cấu hình tsconfig phức tạp.
- **Cách khắc phục triệt để**:
  1. **Giải pháp 1 (Khuyến nghị chuẩn của Prisma)**: Thay thế `ts-node` bằng công cụ hiện đại `tsx` (dựa trên esbuild, hỗ trợ ESM và TypeScript out-of-the-box):
     - Trong `package.json`:
       ```json
       "prisma": {
         "seed": "npx tsx prisma/seed.ts"
       }
       ```
     - Chạy lệnh nạp dữ liệu:
       ```bash
       npx prisma db seed
       ```
  2. **Giải pháp 2 (Sử dụng Node.js v22+ Native Type Stripping - Không phụ thuộc tool bên ngoài)**:
     - Chạy trực tiếp bằng script đã cấu hình sẵn trong `package.json`:
       ```bash
       npm run db:seed:node
       ```
     *(Lệnh tương đương: `node --experimental-strip-types prisma/seed.ts`).*


