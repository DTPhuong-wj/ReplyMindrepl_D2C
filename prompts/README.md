# Kho Lưu Trữ Quản Lý Phiên Bản System Prompts

Thư mục này lưu trữ các câu lệnh hệ thống (System Prompts) và các ví dụ mẫu (Few-shot exemplars) được quản lý phiên bản phục vụ cho bộ máy điều phối AI của ReplyMind.

## Các Quy Chuẩn Bắt Buộc
1. **Quy ước Đặt tên File**: Sử dụng định dạng snake_case mô tả rõ chức năng (ví dụ: `intent_classifier.txt`).
2. **Header Quản lý Phiên bản**: Mọi prompt bắt buộc phải có phần header ghi rõ tên, phiên bản (Version) và mô tả.
3. **Định dạng Đầu ra Cấu trúc (Structured Outputs)**: Các prompt phục vụ ra quyết định tự động bắt buộc phải yêu cầu trả về định dạng JSON thuần tuân thủ đúng Schema định sẵn.
4. **Tham số Động**: Sử dụng cú pháp dấu ngoặc nhọn kép (`{{TEN_BIEN}}`) cho các giá trị được điền tự động tại thời điểm chạy (runtime) bởi dịch vụ Context Builder.
