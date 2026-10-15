/**
 * @file mock-data.js
 * @description Bộ dữ liệu giả lập chuẩn D2C cho Interactive Prototype ReplyMind.
 */

window.REPLYMIND_DATA = {
  currentUser: {
    id: "usr_agent_01",
    name: "Nguyễn Hải Đăng",
    email: "dang.nguyen@replymind.io",
    role: "AGENT",
    avatar: "Đ"
  },

  availableUsers: [
    {
      id: "usr_agent_01",
      name: "Nguyễn Hải Đăng",
      email: "dang.nguyen@replymind.io",
      role: "AGENT",
      avatar: "Đ"
    },
    {
      id: "usr_supervisor_02",
      name: "Trần Thị Mai",
      email: "mai.tran@replymind.io",
      role: "SUPERVISOR",
      avatar: "M"
    }
  ],

  brandTones: {
    current: "FORMAL",
    options: [
      { id: "FORMAL", name: "Trang trọng (Formal)", description: "Lịch thiệp, chuẩn mực doanh nghiệp, thích hợp xử lý khiếu nại" },
      { id: "PROFESSIONAL", name: "Chuyên nghiệp (Professional)", description: "Gãy gọn, chuẩn xác, đầy đủ thông tin" },
      { id: "FRIENDLY", name: "Thân thiện (Friendly)", description: "Ấm áp, cởi mở, dùng từ xưng hô dạ/vâng gần gũi" },
      { id: "CASUAL", name: "Tự nhiên (Casual)", description: "Trẻ trung, năng động, thích hợp khách hàng trẻ Gen Z" }
    ]
  },

  dashboardStats: {
    todayConversations: 48,
    resolvedCount: 41,
    urgentCount: 1,
    avgResponseTime: "1m 18s",
    aiAcceptanceRate: "88.4%",
    slaAdherence: "99.4%",
    intentDistribution: [
      { label: "Vận chuyển & Giao hàng", count: 21, percentage: "44%" },
      { label: "Đổi trả hàng", count: 14, percentage: "29%" },
      { label: "Thanh toán & Hoàn tiền", count: 8, percentage: "17%" },
      { label: "Tư vấn sản phẩm / Size", count: 5, percentage: "10%" }
    ]
  },

  kbArticles: [
    {
      id: "kb_01",
      title: "Chính Sách Đổi Trả Hàng Miễn Phí Trong Vòng 30 Ngày",
      category: "Đổi trả",
      updatedAt: "01/02/2026",
      summary: "Áp dụng đổi size, đổi màu trong 30 ngày. Miễn phí 100% phí ship 2 chiều lần đầu. Bưu tá giao hàng mới và thu hàng cũ đồng thời.",
      content: `1. Thời hạn áp dụng: Trong vòng 30 ngày kể từ ngày nhận hàng.
2. Điều kiện sản phẩm: Còn nguyên tem mác, hộp đựng ban đầu, chưa qua giặt ủi và không có mùi lạ.
3. Chi phí vận chuyển: Miễn phí 100% phí ship 2 chiều cho lần đổi đầu tiên.
4. Trường hợp từ chối: Sản phẩm xả kho giảm >50% hoặc danh mục đồ lót/đồ bơi vì lý do vệ sinh.`
    },
    {
      id: "kb_02",
      title: "Quy Định Vận Chuyển & Cam Kết Bồi Thường Giao Chậm",
      category: "Vận chuyển",
      updatedAt: "05/02/2026",
      summary: "Giao nội thành 24-48h, ngoại tỉnh 2-4 ngày. Giao trễ quá 3 ngày tặng voucher 15% (tối đa 150k) và miễn phí ship 100%.",
      content: `1. Thời gian tiêu chuẩn: Nội thành HN/HCM 24-48h; Tỉnh khác 2-4 ngày làm việc.
2. Cam kết bồi thường khi giao trễ quá 3 ngày do lỗi bưu cục:
   - Tặng voucher giảm giá 15% (tối đa 150.000 VNĐ) cho đơn tiếp theo.
   - Miễn 100% phí vận chuyển của đơn hàng hiện tại.
3. Đơn vị hợp tác: Giao Hàng Nhanh (GHN), Viettel Post và SPX Express.`
    },
    {
      id: "kb_03",
      title: "Chính Sách Bảo Hành & Đổi Mới Sản Phẩm Lỗi Sản Xuất",
      category: "Bảo hành",
      updatedAt: "10/02/2026",
      summary: "Bảo hành 6 tháng đường may, cúc áo, khóa kéo. Đổi mới 1-đổi-1 trong vòng 24h chỉ cần cung cấp hình ảnh/video lỗi.",
      content: `1. Thời hạn: 6 tháng đối với lỗi đường may, khóa kéo, cúc áo, bạc màu bất thường.
2. Quy trình 1 đổi 1 hỏa tốc: Khách gửi ảnh/video lỗi, CSKH duyệt trong 15 phút, gửi hàng mới trong 24h không cần gửi hàng lỗi về trước.`
    },
    {
      id: "kb_04",
      title: "Bảng Quy Chuẩn Kích Cỡ & Cam Kết Vừa Vặn",
      category: "Tư vấn",
      updatedAt: "12/02/2026",
      summary: "Quy chuẩn thông số chiều cao, cân nặng, số đo vòng 1-2-3 cho Size S, M, L, XL form người Việt Nam.",
      content: `Size S: 1m55-1m65 (48-56kg)
Size M: 1m64-1m72 (57-65kg)
Size L: 1m70-1m78 (66-74kg)
Size XL: 1m75-1m85 (75-85kg)
Cam kết tư vấn chuẩn kích thước hoặc đổi hàng tận nơi nếu không vừa vặn.`
    },
    {
      id: "kb_05",
      title: "Quy Trình Hủy Đơn & Hoàn Tiền Giao Dịch Trực Tuyến",
      category: "Thanh toán",
      updatedAt: "15/02/2026",
      summary: "Ví điện tử hoàn tiền trong 24h, ATM 1-3 ngày, Visa/Mastercard 3-7 ngày. Lỗi trừ tiền trùng lặp xử lý trong 2 giờ.",
      content: `1. Hủy đơn: Hủy miễn phí trước khi hàng xuất kho.
2. Thời gian hoàn tiền: Ví điện tử (Momo/ZaloPay) trong 24h; ATM 1-3 ngày; Thẻ tín dụng 3-7 ngày.
3. Sự cố trừ tiền 2 lần: Tự động đối soát và kích hoạt hoàn tiền đợt 2 trong vòng 2 giờ.`
    }
  ],

  conversations: [
    {
      id: "conv_001",
      customerName: "Phạm Minh Tuấn",
      customerEmail: "tuan.pham@gmail.com",
      orderId: "#ORD-9821",
      productSummary: "Áo khoác dạ cao cấp Size M (1.850.000₫) • GHN Express",
      status: "UNHANDLED",
      priority: "URGENT",
      intent: "DELIVERY_ISSUE",
      sentiment: "NEGATIVE",
      sentimentLabel: "😡 Tiêu cực (Bực tức)",
      timeAgo: "10 phút trước",
      messages: [
        {
          id: "m_1_1",
          sender: "customer",
          senderName: "Phạm Minh Tuấn",
          time: "10:15 SA",
          text: "Chào shop, tôi đặt đơn #ORD-9821 từ thứ 2 tuần trước, hẹn thứ 5 giao mà hôm nay thứ 2 tuần sau rồi vẫn chưa thấy tăm hơi đâu. Tôi cần áo để đi dự tiệc cưới tối mai!"
        },
        {
          id: "m_1_2",
          sender: "customer",
          senderName: "Phạm Minh Tuấn",
          time: "10:16 SA",
          isUrgentWarning: true,
          text: "Đơn hàng ORD-9821 của tôi trễ 4 ngày rồi mà bưu tá chưa gọi, các bạn làm ăn kiểu gì vậy?! Nếu trước 14h chiều nay không giao tới nơi thì hủy đơn và bồi thường cho tôi!"
        }
      ],
      aiAnalysis: {
        triage: {
          intent: "DELIVERY_ISSUE",
          sentiment: "NEGATIVE",
          priority: "URGENT",
          confidenceScore: 0.95,
          reason: "Khách hàng bức xúc vì đơn hàng trễ 4 ngày chưa nhận được và yêu cầu giao trước 14h hoặc hủy/bồi thường."
        },
        rag: {
          docTitle: "Quy Định Vận Chuyển & Cam Kết Bồi Thường Giao Chậm",
          matchScore: 98,
          citation: "Điều 2: Đơn hàng giao trễ quá 3 ngày do lỗi bưu cục được tặng voucher giảm giá 15% (tối đa 150k) cho đơn kế tiếp và miễn 100% phí ship đơn hiện tại."
        },
        draft: {
          tone: "FORMAL",
          text: "Dạ em chào anh Tuấn ạ! Em rất tiếc và thành thật xin lỗi anh về việc đơn hàng ORD-9821 bị trễ hạn 4 ngày khiến anh phiền lòng. Theo chính sách của bên em, đơn hàng trễ quá 3 ngày sẽ được tặng ngay voucher giảm giá 15% cho đơn tiếp theo và miễn 100% phí vận chuyển đơn hiện tại ạ. Em đã làm việc trực tiếp với bưu cục GHN yêu cầu bưu tá phát hỏa tốc trước 14h chiều nay cho anh nhé ạ!"
        },
        feedback: null
      }
    },

    {
      id: "conv_002",
      customerName: "Lê Thu Hà",
      customerEmail: "ha.le@outlook.com",
      orderId: "#ORD-8412",
      productSummary: "Đầm lụa xếp ly dự tiệc Size M (1.290.000₫) • Viettel Post",
      status: "WAITING",
      priority: "MEDIUM",
      intent: "RETURN_REQUEST",
      sentiment: "NEUTRAL",
      sentimentLabel: "😐 Bình thường",
      timeAgo: "1 giờ trước",
      messages: [
        {
          id: "m_2_1",
          sender: "customer",
          senderName: "Lê Thu Hà",
          time: "09:00 SA",
          text: "Em nhận được đầm rồi chất vải rất ưng, nhưng eo hơi chật em muốn đổi từ size M sang L được không shop? Đơn hàng ORD-8412 ạ."
        },
        {
          id: "m_2_2",
          sender: "agent",
          senderName: "Nguyễn Hải Đăng",
          time: "09:05 SA",
          text: "Dạ em chào chị Hà ạ! Dạ shop hỗ trợ đổi từ size M sang size L hoàn toàn miễn phí 2 chiều cho chị luôn ạ. Chị kiểm tra giúp em sản phẩm còn giữ nguyên tem mác giúp shop nhé ạ."
        },
        {
          id: "m_2_3",
          sender: "customer",
          senderName: "Lê Thu Hà",
          time: "09:15 SA",
          text: "Dạ váy em chỉ mới ướm thử thôi còn nguyên hộp và tem mác đính trên áo ạ. Bưu tá khi nào qua lấy đổi vậy shop?"
        }
      ],
      aiAnalysis: {
        triage: {
          intent: "RETURN_REQUEST",
          sentiment: "NEUTRAL",
          priority: "MEDIUM",
          confidenceScore: 0.96,
          reason: "Khách hàng muốn xác nhận thời gian bưu tá mang hàng mới tới đổi váy size L tận nơi."
        },
        rag: {
          docTitle: "Chính Sách Đổi Trả Hàng Miễn Phí Trong Vòng 30 Ngày",
          matchScore: 99,
          citation: "Điều 3: Miễn phí 100% phí vận chuyển 2 chiều. Bưu tá mang hàng mới tới tận nơi và thu hồi hàng cũ đồng thời trong vòng 24-48 giờ."
        },
        draft: {
          tone: "FRIENDLY",
          text: "Dạ vâng ạ, chị yên tâm nhé! Em đã tạo đơn đổi hàng size L cho chị rồi ạ. Bưu tá bên em sẽ mang váy mới qua tận nhà giao cho chị và nhận lại váy cũ trong ngày mai hoặc chậm nhất sáng ngày kia ạ. Chị không phải trả thêm bất kỳ chi phí nào nhé!"
        },
        feedback: null
      }
    },

    {
      id: "conv_003",
      customerName: "Hoàng Anh Dũng",
      customerEmail: "dung.hoang@techcombank.com.vn",
      orderId: "#ORD-7750",
      productSummary: "Bộ suit nam may đo Classic Grey (3.450.000₫) • Thanh toán Thẻ",
      status: "UNHANDLED",
      priority: "HIGH",
      intent: "REFUND_REQUEST",
      sentiment: "NEGATIVE",
      sentimentLabel: "🙁 Bực bội (Trừ tiền 2 lần)",
      timeAgo: "3 giờ trước",
      messages: [
        {
          id: "m_3_1",
          sender: "customer",
          senderName: "Hoàng Anh Dũng",
          time: "07:30 SA",
          text: "Thẻ Techcombank của tôi vừa bị trừ 2 lần tiền cho cùng 1 đơn hàng ORD-7750 (mỗi lần 3.450.000 VNĐ). Đề nghị shop hoàn lại ngay số tiền bị trừ thừa!"
        }
      ],
      aiAnalysis: {
        triage: {
          intent: "REFUND_REQUEST",
          sentiment: "NEGATIVE",
          priority: "HIGH",
          confidenceScore: 0.92,
          reason: "Khách hàng khiếu nại sự cố cổng thanh toán trừ tiền trùng lặp 2 lần cho đơn hàng ORD-7750."
        },
        rag: {
          docTitle: "Quy Trình Hủy Đơn & Hoàn Tiền Giao Dịch Trực Tuyến",
          matchScore: 97,
          citation: "Mục 3: Sự cố trừ tiền 2 lần: Hệ thống tự động đối soát và kích hoạt lệnh hoàn tiền đợt 2 trong vòng 2 giờ làm việc sau khi nhận thông báo."
        },
        draft: {
          tone: "PROFESSIONAL",
          text: "Chào anh Dũng, em đã kiểm tra đối soát giao dịch cho đơn ORD-7750 và xác nhận cổng thanh toán ghi nhận trùng 2 lệnh trừ tiền. Bộ phận kế toán đã kích hoạt hoàn trả ngay 3.450.000 VNĐ đợt 2 về thẻ Techcombank của anh, tiền sẽ về tài khoản trong vòng 1-2 giờ tới kèm SMS xác nhận ạ."
        },
        feedback: null
      }
    },

    {
      id: "conv_004",
      customerName: "Vũ Thị Bích Ngọc",
      customerEmail: "ngoc.vu@gmail.com",
      orderId: "#ORD-9910",
      productSummary: "Áo Blazer Linen 2 lớp (890.000₫) • Tư vấn chọn size",
      status: "RESOLVED",
      priority: "LOW",
      intent: "PRODUCT_INQUIRY",
      sentiment: "POSITIVE",
      sentimentLabel: "😊 Tích cực (Hài lòng)",
      timeAgo: "1 ngày trước",
      messages: [
        {
          id: "m_4_1",
          sender: "customer",
          senderName: "Vũ Thị Bích Ngọc",
          time: "Hôm qua",
          text: "Shop ơi mình cao 1m62 nặng 52kg thì nên chọn size S hay M cho mẫu áo Blazer này ạ?"
        },
        {
          id: "m_4_2",
          sender: "agent",
          senderName: "Nguyễn Hải Đăng",
          time: "Hôm qua",
          text: "Chào bạn Ngọc nha! Với số đo 1m62 và 52kg thì bạn mặc Size S sẽ vừa vặn thanh lịch, còn nếu thích phong cách hơi rộng oversize thoải mái thì chọn Size M nhé!"
        },
        {
          id: "m_4_3",
          sender: "customer",
          senderName: "Vũ Thị Bích Ngọc",
          time: "Hôm qua",
          text: "Cảm ơn bạn nhiều nha, mình đã đặt Size S rồi nhé ạ!"
        }
      ],
      aiAnalysis: {
        triage: {
          intent: "PRODUCT_INQUIRY",
          sentiment: "POSITIVE",
          priority: "LOW",
          confidenceScore: 0.98,
          reason: "Khách hàng hài lòng sau khi được tư vấn chọn size Blazer và đã đặt hàng thành công."
        },
        rag: {
          docTitle: "Bảng Quy Chuẩn Kích Cỡ & Cam Kết Vừa Vặn",
          matchScore: 95,
          citation: "Khách hàng cao 1m55-1m65, nặng 48-56kg vừa vặn hoàn hảo với Size S."
        },
        draft: {
          tone: "CASUAL",
          text: "Dạ shop cảm ơn bạn Ngọc đã tin tưởng ủng hộ ạ! Đơn hàng sẽ được đóng gói thơm tho và gửi sớm cho bạn nhé. Chúc bạn có trải nghiệm tuyệt vời với chiếc áo Blazer nha!"
        },
        feedback: "HELPFUL"
      }
    }
  ]
};

