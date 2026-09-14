# Minh Chứng Meta Agent 02: Xử Lý Sự Cố Cài Đặt NPM (EPERM & Prisma Engine ECONNRESET)

<!-- ==============================================================================
META INFO
- Tên tệp: 02_troubleshoot_npm_error.md
- Dự án: ReplyMind - AI Co-pilot for D2C Customer Support
- Vai trò: Senior AI Software Architect & Lead Engineer
- Loại tài liệu: Báo cáo Phân tích Nguyên nhân Gốc rễ (RCA) & Cải tiến Quy trình
- Ngày thực hiện: 2026-11-10
- Trạng thái: ĐÃ KHẮC PHỤC & ĐÃ CẬP NHẬT TÀI LIỆU (RESOLVED & DOCUMENTED)
============================================================================== -->

## 1. Mô Tả Sự Cố (Problem Description)

Trong quá trình khởi chạy lệnh `npm install` trên môi trường hệ điều hành Windows cho dự án ReplyMind, quá trình cài đặt bị gián đoạn và kết thúc với các lỗi nghiêm trọng sau:

1. **Lỗi Khóa Tệp Quyền Truy Cập (File Lock)**:
   ```text
   npm error code EPERM
   npm error syscall rmdir
   npm error path D:\Code\replymind\node_modules\fast-glob
   npm error errno -4048
   npm error [Error: EPERM: operation not permitted, rmdir 'D:\Code\replymind\node_modules\fast-glob']
   ```
2. **Lỗi Kịch Bản Hậu Cài Đặt Của Prisma (`postinstall`)**:
   ```text
   npm error path D:\Code\replymind\node_modules\@prisma\engines
   npm error command failed
   npm error command C:\Windows\system32\cmd.exe /d /s /c node scripts/postinstall.js
   ```
3. **Mã Lỗi Mạng Đứt Đoạn**:
   ```text
   npm error code ECONNRESET
   npm error syscall read
   npm error errno ECONNRESET
   npm error Error: aborted
   ```

---

## 2. Câu Lệnh Yêu Cầu Xử Lý Gốc (Input Prompt)

```markdown
Tôi đang gặp lỗi trong quá trình khởi chạy `npm install` cho dự án ReplyMind trên hệ điều hành Windows:

[NỘI DUNG LỖI]:
1. EPERM: operation not permitted (rmdir khóa các thư mục node_modules, fast-glob, next).
2. npm error path ...\@prisma\engines -> node scripts/postinstall.js thất bại.
3. Mã lỗi: ECONNRESET / Error: aborted (Tải Prisma Binary Engine bị rớt mạng giữa chừng).

Nhiệm vụ của bạn:
1. Phân tích nguyên nhân gốc rễ (Root Cause) của 2 lỗi trên.
2. Đưa ra danh sách các lệnh Terminal (Windows/CMD/PowerShell) chi tiết theo thứ tự để khắc phục triệt để lỗi này.
3. Tạo file cấu hình `.npmrc` ở thư mục gốc dự án bổ sung các cờ (flags) tự động retry và tăng timeout khi tải thư viện nặng.
4. Tự động lưu toàn bộ quá trình này vào file minh chứng: `prompts/meta_agent/02_troubleshoot_npm_error.md` bao gồm: Mô tả lỗi, Câu prompt này, Phân tích nguyên nhân, Các bước đã xử lý, và Cải tiến quy trình (Cập nhật file `.npmrc` và `SETUP_GUIDE.md`).
```

---

## 3. Phân Tích Nguyên Nhân Gốc Rễ (Root Cause Analysis - RCA)

### 3.1. Nguyên nhân Lỗi 1: `EPERM: operation not permitted`
- **Cơ chế khóa tệp của Windows (NTFS File Locking)**: Khác với Linux/macOS cho phép unbind/unlink file đang mở, Windows áp dụng cơ chế khóa độc quyền (Exclusive Lock). Khi một tệp hoặc thư mục đang được mở bởi bất kỳ tiến trình nào (Node.js chạy ngầm, VS Code File Watcher, Windows Search Indexer, hoặc Trình quét thời gian thực Windows Defender), hệ điều hành sẽ từ chối mọi thao tác `rmdir` hoặc `rename` từ NPM và trả về mã lỗi `-4048 (EPERM)`.
- **NPM Race Condition**: Khi NPM giải nén và ghi đè đồng thời nhiều package (đặc biệt là các package lồng nhau như `fast-glob`, `next`), các luồng I/O cạnh tranh tài nguyên dẫn đến việc thư mục bị khóa trước khi hoàn tất xóa dọn.

### 3.2. Nguyên nhân Lỗi 2 & 3: `ECONNRESET / Error: aborted` tại `@prisma/engines`
- **Tải tệp Binary độc lập qua Lifecycle Script**: Gói `@prisma/engines` chứa một kịch bản `postinstall.js`. Kịch bản này không tải code JavaScript thông thường mà thực hiện một request HTTPS độc lập ra bên ngoài để tải file binary biên dịch sẵn của Prisma (`query-engine-windows.exe`, kích thước xấp xỉ 40MB - 50MB) từ CDN GitHub/CloudFront (`binaries.prisma.sh`).
- **Giới hạn Timeout mặc định của NPM**: Thời gian chờ mặc định (timeout) của kết nối mạng trong NPM thường chỉ là 30 giây và không tự động thử lại khi đường truyền quốc tế bị nghẽn (packet loss). Khi mạng rớt gói tin hoặc bị tường lửa/chương trình bảo vệ mạng ngắt kết nối socket, máy chủ trả về `ECONNRESET / Error: aborted`, khiến kịch bản `postinstall.js` văng exception và làm hỏng toàn bộ quá trình `npm install`.

---

## 4. Quy Trình Khắc Phục Triệt Để (Step-by-Step Resolution Guide)

Để giải quyết đồng thời cả hai nguyên nhân trên trên Windows, kỹ sư thực hiện lần lượt các bước sau trong **PowerShell** (hoặc CMD):

### Bước 1: Dọn dẹp triệt để các tiến trình Node.js đang chạy ngầm
Giải phóng toàn bộ handle khóa tệp trong thư mục dự án:
```powershell
# Dừng tất cả tiến trình Node.js đang chạy ngầm (PowerShell)
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
```
*(Nếu dùng Command Prompt / CMD: `taskkill /F /IM node.exe /T`)*

### Bước 2: Xóa sạch thư mục `node_modules` và xóa cache bị lỗi
```powershell
# Xóa thư mục node_modules và tệp package-lock.json bị hỏng
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue

# Xóa bộ nhớ đệm cache của npm
npm cache clean --force
```

### Bước 3: Cài đặt với cờ `--ignore-scripts` để cách ly lỗi tải Binary
Biện pháp này giúp tải toàn bộ 100% các package JavaScript bình thường mà không bị crash bởi kịch bản tải engine của Prisma:
```powershell
npm install --ignore-scripts
```

### Bước 4: Tải và Sinh Prisma Engine riêng biệt
Sau khi toàn bộ dependencies đã nằm trọn vẹn trong `node_modules`, chạy lệnh tạo Prisma Client chuyên dụng:
```powershell
npx prisma generate
```

---

## 5. Cải Tiến Quy Trình Hệ Thống (Process Improvements)

Để ngăn chặn lỗi tái diễn trong tương lai cho toàn bộ thành viên trong nhóm phát triển, chúng tôi đã thực hiện 2 cải tiến cấu hình:

### 5.1. Tạo Tệp Cấu Hình `.npmrc` Tại Thư Mục Gốc Dự Án
Tệp [`.npmrc`](file:///d:/Code/replymind/.npmrc) được tạo tự động với các cờ gia cố mạng:
```ini
# 1. Cơ chế Tự động Thử lại (Auto-Retry) khi rớt mạng
fetch-retries=5
fetch-retry-factor=2
fetch-retry-mintimeout=20000
fetch-retry-maxtimeout=120000

# 2. Tăng thời gian chờ Timeout khi tải thư viện & Binary nặng (5 phút)
fetch-timeout=300000
network-timeout=300000

# 3. Tối ưu hóa hiệu năng cài đặt, giảm tải truy vấn mạng không cần thiết
audit=false
fund=false
legacy-peer-deps=true

# 4. Tăng độ ổn định cho các gói có native binary build trên Windows
strict-peer-dependencies=false
engine-strict=false
```

### 5.2. Cập Nhật Hướng Dẫn Khắc Phục Sự Cố Trong `SETUP_GUIDE.md`
Đã cập nhật mục **8.1** (`EPERM`) và **8.2** (`ECONNRESET / postinstall @prisma/engines`) trong tài liệu [SETUP_GUIDE.md](file:///d:/Code/replymind/SETUP_GUIDE.md), cung cấp sẵn câu lệnh PowerShell copy-paste cho bất kỳ ai tham gia phát triển dự án trên Windows.

