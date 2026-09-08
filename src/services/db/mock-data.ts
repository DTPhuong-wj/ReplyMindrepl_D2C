/**
 * @file mock-data.ts
 * @description Kho dữ liệu mẫu D2C chuẩn mực cho ReplyMind (Người dùng, Chính sách KB, Cuộc hội thoại, Tin nhắn, Đánh giá AI).
 * @module services/db
 */

import {
  BrandTone,
  ConversationDetailDto,
  ConversationStatus,
  FeedbackAction,
  IntentType,
  KnowledgeBaseArticleDto,
  MessageSender,
  PriorityLevel,
  Role,
  SentimentType,
} from "@/types";

// ==============================================================================
// 1. DANH SÁCH NHÂN VIÊN & QUẢN TRỊ VIÊN HỖ TRỢ
// ==============================================================================
export const SEED_USERS = [
  {
    id: "usr_agent_01",
    email: "dang.nguyen@replymind.io",
    name: "Nguyễn Hải Đăng",
    role: "AGENT" as Role,
    createdAt: new Date("2026-01-15T08:00:00Z"),
    updatedAt: new Date("2026-01-15T08:00:00Z"),
  },
  {
    id: "usr_supervisor_02",
    email: "mai.tran@replymind.io",
    name: "Trần Thị Mai",
    role: "SUPERVISOR" as Role,
    createdAt: new Date("2026-01-10T08:00:00Z"),
    updatedAt: new Date("2026-01-10T08:00:00Z"),
  },
  {
    id: "usr_admin_03",
    email: "nam.le@replymind.io",
    name: "Lê Hoàng Nam",
    role: "ADMIN" as Role,
    createdAt: new Date("2026-01-01T08:00:00Z"),
    updatedAt: new Date("2026-01-01T08:00:00Z"),
  },
];

// ==============================================================================
// 2. BÀI VIẾT CHÍNH SÁCH CƠ SỞ TRI THỨC (KNOWLEDGE BASE D2C)
// ==============================================================================
export const SEED_KB_ARTICLES: KnowledgeBaseArticleDto[] = [
  {
    id: "kb_art_01",
    title: "Chính Sách Đổi Trả Hàng Miễn Phí Trong Vòng 30 Ngày",
    slug: "chinh-sach-doi-tra-30-ngay",
    category: "CHINH_SACH_DOI_TRA",
    content: `
# Chính Sách Đổi Trả Hàng Miễn Phí Trong Vòng 30 Ngày

Thương hiệu cam kết mang lại sự hài lòng tối đa cho khách hàng với chính sách đổi trả thuận tiện:

1. **Thời hạn áp dụng**: Trong vòng **30 ngày** kể từ ngày khách hàng nhận được kiện hàng từ đơn vị vận chuyển.
2. **Điều kiện sản phẩm**:
   - Sản phẩm còn nguyên tem mác, hộp đựng ban đầu, chưa qua giặt ủi và không có mùi lạ (nước hoa, cơ thể).
   - Áp dụng đổi size, đổi màu hoặc đổi sang sản phẩm khác có giá trị tương đương hoặc cao hơn.
3. **Chi phí vận chuyển**:
   - **Miễn phí 100%** phí vận chuyển 2 chiều đối với lần đổi hàng đầu tiên của mỗi đơn hàng.
   - Nhân viên giao vận bưu tá sẽ mang hàng mới tới tận nơi và thu hồi hàng cũ đồng thời (quy trình đổi hàng 1 bước).
4. **Trường hợp từ chối đổi trả**:
   - Các sản phẩm thuộc danh mục đồ lót, đồ bơi vì lý do vệ sinh cá nhân.
   - Sản phẩm mua trong chương trình xả kho giảm giá trên 50% (Flash Sale cuối mùa).
    `.trim(),
    isPublished: true,
    authorId: "usr_admin_03",
    authorName: "Lê Hoàng Nam",
    createdAt: new Date("2026-02-01T09:00:00Z"),
    updatedAt: new Date("2026-02-01T09:00:00Z"),
  },
  {
    id: "kb_art_02",
    title: "Quy Định Giao Hàng, Vận Chuyển & Chính Sách Bồi Thường Giao Chậm",
    slug: "quy-dinh-giao-hang-van-chuyen",
    category: "VAN_CHUYEN",
    content: `
# Quy Định Vận Chuyển & Cam Kết Thời Gian Giao Hàng

1. **Thời gian giao hàng tiêu chuẩn**:
   - Nội thành Hà Nội & TP. Hồ Chí Minh: **24 - 48 giờ** làm việc.
   - Các tỉnh thành phố khác: **2 - 4 ngày** làm việc.
   - Vùng sâu vùng xa hoặc hải đảo: **4 - 6 ngày** làm việc.
2. **Cam kết bồi thường khi giao trễ**:
   - Nếu đơn hàng bị giao trễ quá **3 ngày** so với thời gian dự kiến do lỗi từ phía đơn vị vận chuyển:
     + Tặng ngay voucher giảm giá **15% (tối đa 150.000 VNĐ)** cho đơn hàng kế tiếp.
     + Miễn toàn bộ phí vận chuyển của đơn hàng hiện tại.
   - Nếu thất lạc kiện hàng quá 7 ngày: Khách hàng được quyền chọn gửi lại đơn hàng mới hỏa tốc hoặc hoàn tiền 100% ngay lập tức.
3. **Đơn vị vận chuyển đối tác**: Giao Hàng Nhanh (GHN), Viettel Post và SPX Express.
    `.trim(),
    isPublished: true,
    authorId: "usr_admin_03",
    authorName: "Lê Hoàng Nam",
    createdAt: new Date("2026-02-05T09:00:00Z"),
    updatedAt: new Date("2026-02-05T09:00:00Z"),
  },
  {
    id: "kb_art_03",
    title: "Chính Sách Bảo Hành & Đổi Mới Sản Phẩm Lỗi Sản Xuất",
    slug: "chinh-sach-bao-hanh-san-pham",
    category: "BAO_HANH",
    content: `
# Chính Sách Bảo Hành & Xử Lý Sản Phẩm Lỗi Do Nhà Sản Xuất

1. **Thời hạn bảo hành**: **6 tháng** đối với lỗi đường may, cúc áo, khóa kéo (zipper) và lỗi bạc màu bất thường.
2. **Quy trình 1 Đổi 1 Hỏa Tốc**:
   - Khách hàng chỉ cần gửi ảnh chụp hoặc video ngắn thể hiện lỗi sản phẩm qua khung chat hỗ trợ.
   - Bộ phận CSKH phê duyệt trong vòng **15 phút**.
   - Gửi ngay sản phẩm mới thay thế trong vòng 24h, khách hàng không cần phải gửi hàng lỗi về trước.
3. **Trường hợp không áp dụng bảo hành**:
   - Rách do vật nhọn tác động, cháy xém do là ủi ở nhiệt độ không đúng hướng dẫn.
   - Co rút vải do giặt sấy nhiệt độ cao không tuân thủ tem hướng dẫn giặt giũ (Care label).
    `.trim(),
    isPublished: true,
    authorId: "usr_supervisor_02",
    authorName: "Trần Thị Mai",
    createdAt: new Date("2026-02-10T10:00:00Z"),
    updatedAt: new Date("2026-02-10T10:00:00Z"),
  },
  {
    id: "kb_art_04",
    title: "Hướng Dẫn Chọn Size Chuẩn & Cam Kết Vừa Vặn Hoàn Hảo",
    slug: "huong-dan-chon-size-cam-ket-vua-van",
    category: "TU_VAN_SAN_PHAM",
    content: `
# Bảng Quy Chuẩn Kích Cỡ & Cam Kết Vừa Vặn

1. **Bảng size chuẩn form người Việt Nam**:
   - Size S: Chiều cao 1m55 - 1m65, Cân nặng 48 - 56kg. Vòng ngực: 84 - 88cm, Vòng eo: 66 - 70cm.
   - Size M: Chiều cao 1m64 - 1m72, Cân nặng 57 - 65kg. Vòng ngực: 89 - 94cm, Vòng eo: 71 - 76cm.
   - Size L: Chiều cao 1m70 - 1m78, Cân nặng 66 - 74kg. Vòng ngực: 95 - 100cm, Vòng eo: 77 - 82cm.
   - Size XL: Chiều cao 1m75 - 1m85, Cân nặng 75 - 85kg. Vòng ngực: 101 - 106cm, Vòng eo: 83 - 88cm.
2. **Quy tắc chọn size khi ở giữa 2 mức**:
   - Khách hàng thích mặc ôm gọn (Slim-fit): Chọn size nhỏ hơn.
   - Khách hàng thích mặc thoải mái (Regular/Oversize): Chọn size lớn hơn 1 nấc.
3. **Cam kết hỗ trợ tư vấn**: Nhân viên CSKH sẽ hỗ trợ tư vấn số đo cụ thể để đảm bảo vừa vặn ngay từ đơn đầu tiên.
    `.trim(),
    isPublished: true,
    authorId: "usr_agent_01",
    authorName: "Nguyễn Hải Đăng",
    createdAt: new Date("2026-02-12T14:00:00Z"),
    updatedAt: new Date("2026-02-12T14:00:00Z"),
  },
  {
    id: "kb_art_05",
    title: "Quy Trình Hủy Đơn Hàng & Thời Gian Hoàn Tiền Qua Cổng Thanh Toán",
    slug: "quy-trinh-huy-don-hoan-tien",
    category: "THANH_TOAN",
    content: `
# Quy Định Hủy Đơn & Hoàn Tiền Giao Dịch Trực Tuyến

1. **Hủy đơn hàng trước khi xuất kho**:
   - Nếu đơn hàng ở trạng thái "Chờ xử lý" hoặc "Đang đóng gói", khách hàng có thể bấm Hủy ngay trên ứng dụng hoặc nhắn cho CSKH để hỗ trợ hủy lập tức.
2. **Thời gian hoàn tiền theo phương thức thanh toán**:
   - Ví điện tử (Momo, ZaloPay, ShopeePay): Hoàn tiền trong **24 giờ** làm việc.
   - Thẻ ghi nợ / ATM nội địa: Hoàn tiền trong **1 - 3 ngày** làm việc.
   - Thẻ tín dụng quốc tế (Visa, Mastercard, JCB): Hoàn tiền trong **3 - 7 ngày** làm việc tùy theo chu kỳ sao kê của ngân hàng phát hành thẻ.
3. **Xử lý sự cố trừ tiền 2 lần (Duplicate Charge)**:
   - Trong trường hợp lỗi đường truyền cổng thanh toán dẫn đến trừ tiền 2 lần cho 1 mã đơn: Hệ thống sẽ tự động đối soát và kích hoạt lệnh hoàn tiền đợt 2 trong vòng 2 giờ làm việc sau khi nhận được thông báo từ khách hàng.
    `.trim(),
    isPublished: true,
    authorId: "usr_admin_03",
    authorName: "Lê Hoàng Nam",
    createdAt: new Date("2026-02-15T11:00:00Z"),
    updatedAt: new Date("2026-02-15T11:00:00Z"),
  },
];

// ==============================================================================
// 3. CUỘC HỘI THOẠI & TIN NHẮN MẪU D2C (CONVERSATIONS & MESSAGES)
// ==============================================================================
export const SEED_CONVERSATIONS: ConversationDetailDto[] = [
  // --- Cuộc hội thoại 1: Khiếu nại giao hàng trễ hạn nghiêm trọng ---
  {
    id: "conv_001_order_delay",
    customerEmail: "tuan.pham@gmail.com",
    customerName: "Phạm Minh Tuấn",
    status: "OPEN" as ConversationStatus,
    priority: "URGENT" as PriorityLevel,
    detectedIntent: "ORDER_STATUS" as IntentType,
    latestSentiment: "ANGRY" as SentimentType,
    assignedAgentId: "usr_agent_01",
    assignedAgentName: "Nguyễn Hải Đăng",
    lastMessagePreview: "Đơn hàng ORD-9821 của tôi trễ 4 ngày rồi mà bưu tá chưa gọi, các bạn làm ăn kiểu gì vậy?!",
    createdAt: new Date("2026-03-01T08:30:00Z"),
    updatedAt: new Date("2026-03-01T10:15:00Z"),
    messages: [
      {
        id: "msg_001_1",
        conversationId: "conv_001_order_delay",
        senderType: "CUSTOMER" as MessageSender,
        content: "Chào shop, tôi đặt đơn #ORD-9821 từ thứ 2 tuần trước, hẹn thứ 5 giao mà hôm nay thứ 2 tuần sau rồi vẫn chưa thấy tăm hơi đâu. Tôi cần áo để đi dự tiệc cưới tối mai!",
        intent: "ORDER_STATUS",
        sentiment: "FRUSTRATED",
        confidence: 0.94,
        createdAt: new Date("2026-03-01T08:30:00Z"),
      },
      {
        id: "msg_001_2",
        conversationId: "conv_001_order_delay",
        senderType: "AGENT" as MessageSender,
        senderId: "usr_agent_01",
        content: "Chào anh Tuấn, em rất xin lỗi vì sự chậm trễ này khiến anh lo lắng ạ. Em đang kiểm tra trực tiếp với bưu cục trung chuyển GHN để đốc thúc giao hỏa tốc cho anh ngay sáng nay nhé ạ.",
        createdAt: new Date("2026-03-01T08:45:00Z"),
      },
      {
        id: "msg_001_3",
        conversationId: "conv_001_order_delay",
        senderType: "CUSTOMER" as MessageSender,
        content: "Đơn hàng ORD-9821 của tôi trễ 4 ngày rồi mà bưu tá chưa gọi, các bạn làm ăn kiểu gì vậy?! Nếu trước 14h chiều nay không giao tới nơi thì hủy đơn và bồi thường cho tôi!",
        intent: "ORDER_STATUS",
        sentiment: "ANGRY",
        confidence: 0.98,
        createdAt: new Date("2026-03-01T10:15:00Z"),
      },
    ],
  },

  // --- Cuộc hội thoại 2: Yêu cầu đổi trả size áo ---
  {
    id: "conv_002_return_size",
    customerEmail: "ha.le@outlook.com",
    customerName: "Lê Thu Hà",
    status: "PENDING_CUSTOMER" as ConversationStatus,
    priority: "MEDIUM" as PriorityLevel,
    detectedIntent: "RETURN_REQUEST" as IntentType,
    latestSentiment: "NEUTRAL" as SentimentType,
    assignedAgentId: "usr_agent_01",
    assignedAgentName: "Nguyễn Hải Đăng",
    lastMessagePreview: "Em nhận được đầm rồi chất vải rất ưng, nhưng eo hơi chật em muốn đổi từ size M sang L được không shop?",
    createdAt: new Date("2026-03-02T09:00:00Z"),
    updatedAt: new Date("2026-03-02T09:20:00Z"),
    messages: [
      {
        id: "msg_002_1",
        conversationId: "conv_002_return_size",
        senderType: "CUSTOMER" as MessageSender,
        content: "Em nhận được đầm rồi chất vải rất ưng, nhưng eo hơi chật em muốn đổi từ size M sang L được không shop? Đơn hàng ORD-8412 ạ.",
        intent: "RETURN_REQUEST",
        sentiment: "NEUTRAL",
        confidence: 0.96,
        createdAt: new Date("2026-03-02T09:00:00Z"),
      },
      {
        id: "msg_002_2",
        conversationId: "conv_002_return_size",
        senderType: "AGENT" as MessageSender,
        senderId: "usr_agent_01",
        content: "Dạ hoàn toàn được chị Hà ơi! Bên em có chính sách đổi size miễn phí tận nhà trong 30 ngày ạ. Chị kiểm tra giúp em sản phẩm còn nguyên tem mác chưa giặt nhé, em sẽ tạo đơn gửi size L mới cho chị ngay ạ.",
        createdAt: new Date("2026-03-02T09:20:00Z"),
      },
    ],
  },

  // --- Cuộc hội thoại 3: Sự cố trừ tiền 2 lần trên thẻ tín dụng ---
  {
    id: "conv_003_billing_issue",
    customerEmail: "dung.hoang@gmail.com",
    customerName: "Hoàng Anh Dũng",
    status: "OPEN" as ConversationStatus,
    priority: "HIGH" as PriorityLevel,
    detectedIntent: "BILLING_ISSUE" as IntentType,
    latestSentiment: "FRUSTRATED" as SentimentType,
    assignedAgentId: "usr_supervisor_02",
    assignedAgentName: "Trần Thị Mai",
    lastMessagePreview: "Tài khoản Techcombank của tôi vừa bị trừ 2 lần 1.250.000đ cho đơn hàng ORD-7750, kiểm tra giúp tôi ngay!",
    createdAt: new Date("2026-03-02T11:10:00Z"),
    updatedAt: new Date("2026-03-02T11:10:00Z"),
    messages: [
      {
        id: "msg_003_1",
        conversationId: "conv_003_billing_issue",
        senderType: "CUSTOMER" as MessageSender,
        content: "Lúc nãy tôi thanh toán qua cổng OnePay bị báo timeout, tôi thao tác lại thì tin nhắn ngân hàng báo trừ tiền 2 lần, mỗi lần 1.250.000đ cho đơn #ORD-7750. Đề nghị kiểm tra và hoàn lại 1 lượt cho tôi sớm.",
        intent: "BILLING_ISSUE",
        sentiment: "FRUSTRATED",
        confidence: 0.97,
        createdAt: new Date("2026-03-02T11:10:00Z"),
      },
    ],
  },

  // --- Cuộc hội thoại 4: Tư vấn chọn sản phẩm & cách giặt bảo quản ---
  {
    id: "conv_004_product_inquiry",
    customerEmail: "phuong.do@yahoo.com",
    customerName: "Đỗ Bích Phương",
    status: "RESOLVED" as ConversationStatus,
    priority: "LOW" as PriorityLevel,
    detectedIntent: "PRODUCT_INQUIRY" as IntentType,
    latestSentiment: "POSITIVE" as SentimentType,
    assignedAgentId: "usr_agent_01",
    assignedAgentName: "Nguyễn Hải Đăng",
    lastMessagePreview: "Cảm ơn bạn nhé, tư vấn nhiệt tình lắm mình vừa chốt đặt 1 chiếc blazer màu be size S rồi nè!",
    createdAt: new Date("2026-03-01T14:00:00Z"),
    updatedAt: new Date("2026-03-01T14:40:00Z"),
    messages: [
      {
        id: "msg_004_1",
        conversationId: "conv_004_product_inquiry",
        senderType: "CUSTOMER" as MessageSender,
        content: "Shop ơi mẫu áo Blazer Linen màu be này giặt máy có bị co rút hay nhăn nhiều không ạ? Mình cao 1m58 nặng 50kg mặc size nào đẹp?",
        intent: "PRODUCT_INQUIRY",
        sentiment: "NEUTRAL",
        confidence: 0.95,
        createdAt: new Date("2026-03-01T14:00:00Z"),
      },
      {
        id: "msg_004_2",
        conversationId: "conv_004_product_inquiry",
        senderType: "AGENT" as MessageSender,
        senderId: "usr_agent_01",
        content: "Dạ chào chị Phương! Áo blazer bên em được xử lý tiền co nhiệt (pre-washed) nên giặt máy với chế độ nhẹ (cho vào túi giặt) sẽ giữ form rất tốt ạ. Với số đo 1m58 và 50kg thì chị mặc size S sẽ vừa vặn thanh lịch lắm ạ!",
        createdAt: new Date("2026-03-01T14:15:00Z"),
      },
      {
        id: "msg_004_3",
        conversationId: "conv_004_product_inquiry",
        senderType: "CUSTOMER" as MessageSender,
        content: "Cảm ơn bạn nhé, tư vấn nhiệt tình lắm mình vừa chốt đặt 1 chiếc blazer màu be size S rồi nè!",
        intent: "GENERAL_FEEDBACK",
        sentiment: "POSITIVE",
        confidence: 0.99,
        createdAt: new Date("2026-03-01T14:40:00Z"),
      },
    ],
  },
];

// ==============================================================================
// 4. BẢN GHI ĐÁNH GIÁ PHẢN HỒI AI (AI FEEDBACK MẪU)
// ==============================================================================
export const SEED_AI_FEEDBACK = [
  {
    id: "fb_001",
    conversationId: "conv_002_return_size",
    agentId: "usr_agent_01",
    promptVersion: "1.0.0",
    suggestedReply: "Chào bạn Hà, bên mình hỗ trợ đổi size miễn phí trong 30 ngày. Bạn giữ tem mác giúp mình nhé!",
    finalReplySent: "Dạ hoàn toàn được chị Hà ơi! Bên em có chính sách đổi size miễn phí tận nhà trong 30 ngày ạ. Chị kiểm tra giúp em sản phẩm còn nguyên tem mác chưa giặt nhé, em sẽ tạo đơn gửi size L mới cho chị ngay ạ.",
    actionTaken: "ACCEPTED_WITH_EDITS" as FeedbackAction,
    rating: 5,
    comment: "Gợi ý chính xác điều khoản 30 ngày, mình chỉ thêm giọng điệu xưng hô thân mật hơn.",
    createdAt: new Date("2026-03-02T09:20:00Z"),
  },
  {
    id: "fb_002",
    conversationId: "conv_004_product_inquiry",
    agentId: "usr_agent_01",
    promptVersion: "1.0.0",
    suggestedReply: "Dạ chào chị Phương! Áo blazer bên em được xử lý tiền co nhiệt (pre-washed) nên giặt máy với chế độ nhẹ (cho vào túi giặt) sẽ giữ form rất tốt ạ. Với số đo 1m58 và 50kg thì chị mặc size S sẽ vừa vặn thanh lịch lắm ạ!",
    finalReplySent: "Dạ chào chị Phương! Áo blazer bên em được xử lý tiền co nhiệt (pre-washed) nên giặt máy với chế độ nhẹ (cho vào túi giặt) sẽ giữ form rất tốt ạ. Với số đo 1m58 và 50kg thì chị mặc size S sẽ vừa vặn thanh lịch lắm ạ!",
    actionTaken: "ACCEPTED_UNMODIFIED" as FeedbackAction,
    rating: 5,
    comment: "Bản nháp AI đề xuất xuất sắc, chuẩn form size S và đúng hướng dẫn giặt giũ.",
    createdAt: new Date("2026-03-01T14:15:00Z"),
  },
];

