# Kho Lưu Trữ Quản Lý Phiên Bản Prompts (Prompt Repository)

Thư mục `prompts/` được cấu trúc thành 2 phân hệ chuyên biệt nhằm tách bạch rõ ràng giữa **System Prompts vận hành ứng dụng** và **Meta Prompts minh chứng tiến trình phát triển theo 9 chương**.

---

## 1. Cấu Trúc Phân Cấp Thư Mục

```
prompts/
├── README.md                                    # Tài liệu hướng dẫn & quy chuẩn quản lý Prompt
├── system/                                      # System Prompts vận hành ứng dụng ReplyMind (F01 - F07)
│   ├── intent_classifier.txt                    # Prompt phân loại 7 nhóm ý định (F02)
│   ├── sentiment_analyzer.txt                   # Prompt đánh giá 3 mức cảm xúc & 4 cấp khẩn cấp (F02)
│   └── reply_generator.txt                      # Prompt sinh bản nháp bám sát RAG & 4 Brand Tone (F04)
│
└── meta_agent/                                  # Meta Prompts & Minh chứng phát triển qua 9 chương học
    ├── chapter_01/                              # Chương 1: AI in Software Engineering & Scaffolding
    │   ├── 01_scaffold_project.md               # Prompt khởi tạo sườn dự án & bộ quy tắc
    │   ├── 01_p1.1_clarify_idea.md              # Prompt & biên bản làm rõ ý tưởng (Project Brief)
    │   └── 02_troubleshoot_npm_error.md         # Báo cáo RCA & xử lý lỗi npm install Windows
    ├── chapter_02/                              # Chương 2: Quản lý Yêu cầu & Thiết kế PRD
    ├── chapter_03/                              # Chương 3: Kiến trúc Hệ thống & Thiết kế CSDL
    ├── chapter_04/                              # Chương 4: Kỹ nghệ Ngữ cảnh & Quản lý Prompt
    ├── chapter_05/                              # Chương 5: Xây dựng Bộ máy AI & Đa nhà cung cấp
    ├── chapter_06/                              # Chương 6: Xây dựng Cơ sở Tri thức & RAG
    ├── chapter_07/                              # Chương 7: Phát triển Giao diện Human-in-the-Loop
    ├── chapter_08/                              # Chương 8: Kiểm thử Tự động & Đánh giá AI
    └── chapter_09/                              # Chương 9: Đóng gói, Vận hành & Giám sát
```

---

## 2. Quy Chuẩn Kỹ Thuật

### 2.1. Đối với `prompts/system/`
1. **Định dạng & Đặt tên**: Dùng file `.txt` hoặc `.prompt`, tên dạng `snake_case` (ví dụ: `intent_classifier.txt`).
2. **Metadata Header**: Bắt buộc ghi rõ Tên prompt, Phiên bản (`Version: x.y.z`), Mô tả và Định dạng đầu ra mong muốn.
3. **Structured Outputs**: Mọi prompt phục vụ suy luận tự động bắt buộc yêu cầu định dạng JSON thuần tuân thủ đúng Schema định sẵn, không có markdown fences.
4. **Tham số Nội suy (Interpolation)**: Sử dụng cú pháp dấu ngoặc nhọn kép `{{TEN_THAM_SO}}` để dịch vụ Context Builder điền dữ liệu động tại runtime.

### 2.2. Đối với `prompts/meta_agent/`
1. **Phân chia theo chương**: Mỗi chương từ `chapter_01` đến `chapter_09` chứa toàn bộ câu lệnh tương tác, biên bản phản hồi và nhật ký phê duyệt tương ứng.
2. **Cấu trúc tệp minh chứng**:
   - Khối chú thích Meta Info ở đầu tệp (Mã tiến trình, Dự án, Vai trò, Ngày thực hiện).
   - Câu prompt gốc đầy đủ.
   - Nội dung đàm thoại / hỏi đáp làm rõ với người dùng.
   - Nhật ký quyết định (Decision Log) và Nhật ký phê duyệt (Human Approval Audit).
