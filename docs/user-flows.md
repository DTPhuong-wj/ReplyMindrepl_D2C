# Trải Nghiệm Người Dùng & Các Luồng Thao Tác (User Flows) ReplyMind

<!--
  Tài liệu: Đặc tả luồng tương tác người dùng
  Dự án: ReplyMind
  Trạng thái: Bản thảo Khung đặc tả
-->

## 1. Luồng Thao Tác Của Nhân Viên Hỗ Trợ (Vòng Lặp Chính)
1. **Phân loại & Tiếp nhận Hộp thư**: Nhân viên mở danh sách cuộc hội thoại được sắp xếp theo mức độ khẩn cấp và trạng thái.
2. **Tập trung Hội thoại**: Chọn một cuộc hội thoại; màn hình tải lịch sử chat cùng thông tin khách hàng và đơn hàng liên quan.
3. **Phân tích Tự động Từ AI**: Thanh bên AI Co-pilot tự động hiển thị:
   - Ý định khách hàng được nhận diện (Ví dụ: `RETURN_REQUEST` - Yêu cầu đổi trả)
   - Điểm và xu hướng cảm xúc (Ví dụ: `NEGATIVE` -> `NEUTRAL`)
   - Mức độ khẩn cấp (`HIGH` - Cao)
   - Trích dẫn các điều khoản chính sách liên quan từ Cơ sở tri thức (Ví dụ: "Thời hạn đổi trả 30 ngày")
4. **Sinh Bản Nháp Phản Hồi**:
   - AI tự động tạo câu trả lời đề xuất bám sát văn phong thương hiệu đã cấu hình (Ví dụ: `FRIENDLY` - Thân thiện).
   - Đưa ra các gợi ý hành động 1-Click (Ví dụ: "Tạo nhãn đổi trả", "Hoàn tiền qua cổng thanh toán").
5. **Duyệt & Phản Hồi**:
   - Nhân viên có thể bấm "Sử dụng bản nháp", chỉnh sửa thêm bớt rồi gửi cho khách hàng.
   - Hệ thống tự động ghi nhận dữ liệu phản hồi (Feedback) để cải thiện độ chính xác của AI.

## 2. Luồng Quản Lý Cơ Sở Tri Thức (Knowledge Base Flow)
1. Quản trị viên truy cập mục `/knowledge-base`.
2. Tạo mới hoặc cập nhật nội dung bài viết chính sách (hỗ trợ Markdown).
3. Hệ thống tự động kích hoạt tiến trình băm nhỏ văn bản (Chunking) và tạo vector nhúng (Embeddings).
4. Bài viết chuyển sang trạng thái `INDEXED` (Đã lập chỉ mục) và sẵn sàng phục vụ tìm kiếm ngữ nghĩa RAG.

## 3. Luồng Cấu Hình Văn Phong Thương Hiệu (Brand Tone Setup)
1. Quản trị viên truy cập mục cấu hình `/admin/brand-tone`.
2. Lựa chọn một trong các văn phong mẫu (`FRIENDLY`, `PROFESSIONAL`, `CASUAL`, `FORMAL`) hoặc nhập hướng dẫn quy tắc riêng.
3. Hệ thống lưu cấu hình và áp dụng cho toàn bộ các lượt sinh phản hồi tiếp theo.
