import {
  PrismaClient,
  BrandStatus,
  UserStatus,
  Role,
  ToneType,
  Channel,
  ConversationStatus,
  PriorityLevel,
  IntentType,
  SentimentType,
  MessageSender,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu quá trình nạp dữ liệu Demo (Seeding) cho ReplyMind...');

  // 1. Tạo thương hiệu D2C mẫu: Lumina Skincare
  const brand = await prisma.brand.upsert({
    where: { code: 'lumina-skincare' },
    update: {
      name: 'Lumina Skincare',
      status: BrandStatus.ACTIVE,
      logoUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=120&auto=format&fit=crop&q=80',
    },
    create: {
      name: 'Lumina Skincare',
      code: 'lumina-skincare',
      logoUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=120&auto=format&fit=crop&q=80',
      status: BrandStatus.ACTIVE,
    },
  });

  console.log(`✅ Đã khởi tạo Thương hiệu: ${brand.name} (ID: ${brand.id})`);

  // 2. Tạo 3 tài khoản người dùng theo phân quyền RBAC
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@luminaskincare.vn' },
    update: {
      fullName: 'Trần Quản Trị',
      role: Role.ADMIN,
      brandId: brand.id,
      status: UserStatus.ACTIVE,
    },
    create: {
      email: 'admin@luminaskincare.vn',
      passwordHash: '$2a$12$e8YkC3YyQkF78oMv6Q9L.e4W8L7jVqX7H1x5O3k5L.Z.DemoAdminHash',
      fullName: 'Trần Quản Trị',
      role: Role.ADMIN,
      brandId: brand.id,
      status: UserStatus.ACTIVE,
    },
  });

  const managerUser = await prisma.user.upsert({
    where: { email: 'manager@luminaskincare.vn' },
    update: {
      fullName: 'Lê Trưởng Nhóm',
      role: Role.MANAGER,
      brandId: brand.id,
      status: UserStatus.ACTIVE,
    },
    create: {
      email: 'manager@luminaskincare.vn',
      passwordHash: '$2a$12$e8YkC3YyQkF78oMv6Q9L.e4W8L7jVqX7H1x5O3k5L.Z.DemoManagerHash',
      fullName: 'Lê Trưởng Nhóm',
      role: Role.MANAGER,
      brandId: brand.id,
      status: UserStatus.ACTIVE,
    },
  });

  const agentUser = await prisma.user.upsert({
    where: { email: 'agent@luminaskincare.vn' },
    update: {
      fullName: 'Nguyễn Nhân Viên',
      role: Role.AGENT,
      brandId: brand.id,
      status: UserStatus.ACTIVE,
    },
    create: {
      email: 'agent@luminaskincare.vn',
      passwordHash: '$2a$12$e8YkC3YyQkF78oMv6Q9L.e4W8L7jVqX7H1x5O3k5L.Z.DemoAgentHash',
      fullName: 'Nguyễn Nhân Viên',
      role: Role.AGENT,
      brandId: brand.id,
      status: UserStatus.ACTIVE,
    },
  });

  console.log(`✅ Đã khởi tạo 3 Tài khoản RBAC:`);
  console.log(`   - ADMIN: ${adminUser.email} (${adminUser.fullName})`);
  console.log(`   - MANAGER: ${managerUser.email} (${managerUser.fullName})`);
  console.log(`   - AGENT: ${agentUser.email} (${agentUser.fullName})`);

  // 3. Tạo cấu hình Văn phong Thương hiệu (Brand Tone Persona)
  const existingTone = await prisma.brandTone.findFirst({
    where: { brandId: brand.id },
  });

  if (!existingTone) {
    await prisma.brandTone.create({
      data: {
        brandId: brand.id,
        personaName: 'Thân thiện & Tận tâm D2C',
        toneType: ToneType.FRIENDLY,
        primaryPronoun: 'Shop / Em',
        customerPronoun: 'Dạ Bạn / Quý khách',
        dosGuidelines: JSON.stringify([
          'Chào hỏi niềm nở, dạ thưa lễ phép với khách hàng',
          'Luôn chủ động nhận lỗi và thể hiện sự đồng cảm sâu sắc khi xảy ra sự cố',
          'Trích dẫn chính xác điều khoản hỗ trợ theo chính sách công khai',
          'Kết thúc tin nhắn bằng lời chúc chu đáo hoặc cam kết theo sát đơn hàng',
        ]),
        dontsGuidelines: JSON.stringify([
          'Tuyệt đối không tranh cãi hoặc đổ lỗi cho khách hàng hay shipper',
          'Không tự ý hứa hẹn đền bù tiền mặt vượt quá thẩm quyền của Agent',
          'Không trả lời cộc lốc hoặc dùng các thuật ngữ logistics khó hiểu',
        ]),
        isDefault: true,
      },
    });
    console.log(`✅ Đã khởi tạo Brand Tone: Thân thiện & Tận tâm D2C`);
  }

  // 4. Tạo 4 bài viết Cơ sở tri thức (Knowledge Base FAQ & Policies)
  const kbData = [
    {
      category: 'Đổi trả',
      title: 'Chính sách Đổi trả 1-đổi-1 trong 7 ngày',
      keywords: ['đổi trả', 'kích ứng', 'lỗi bao bì', '1 đổi 1', '7 ngày'],
      content: `1. Điều kiện áp dụng:
- Sản phẩm gặp sự cố bao bì (nứt vỡ, hỏng vòi xịt, rò rỉ nắp) do vận chuyển hoặc đóng gói.
- Khách hàng bị kích ứng mẩn đỏ khi sử dụng (kèm hình ảnh chụp tình trạng da trong vòng 7 ngày kể từ khi nhận hàng).
2. Quy trình xử lý:
- Lumina Skincare gửi shipper giao sản phẩm mới tận nhà và thu hồi sản phẩm cũ đồng thời (thu hồi 2 chiều).
- Khách hàng được MIỄN PHÍ 100% cước vận chuyển 2 chiều.`,
    },
    {
      category: 'Vận chuyển',
      title: 'Biểu phí & Thời gian Vận chuyển Toàn quốc',
      keywords: ['vận chuyển', 'phí ship', 'giao hàng', 'freeship', 'hỏa tốc'],
      content: `1. Chính sách cước phí:
- Miễn phí vận chuyển (Freeship) tiêu chuẩn toàn quốc cho tất cả đơn hàng có giá trị thanh toán từ 300.000đ trở lên.
- Đơn hàng dưới 300.000đ áp dụng đồng giá phí vận chuyển 25.000đ trên toàn quốc.
2. Thời gian giao hàng dự kiến:
- Nội thành Hà Nội & TP.HCM: 24 - 48 giờ làm việc.
- Các tỉnh thành khác: 2 - 4 ngày làm việc.
- Dịch vụ Hỏa tốc 4h nội thành áp dụng phụ phí 30.000đ khi khách yêu cầu nhận gấp trước 17h.`,
    },
    {
      category: 'Hoàn tiền',
      title: 'Quy trình Hoàn tiền & Bồi hoàn thanh toán',
      keywords: ['hoàn tiền', 'chuyển khoản', 'bồi hoàn', 'hủy đơn', '24h'],
      content: `1. Các trường hợp được hoàn tiền:
- Đơn hàng giao trễ quá 5 ngày làm việc so với cam kết và khách hàng từ chối nhận tiếp.
- Đơn hàng giao sai sản phẩm và kho đã hết hàng thay thế.
2. Thời gian hoàn tiền:
- Chuyển khoản ngân hàng (Napas 24/7): Tiền về tài khoản khách hàng trong vòng 24 giờ sau khi CSKH xác nhận số tài khoản.
- Thanh toán qua thẻ tín dụng / Ví điện tử: Bồi hoàn theo chu kỳ 3 - 5 ngày làm việc của cổng thanh toán.`,
    },
    {
      category: 'Hủy đơn',
      title: 'Điều kiện & Hướng dẫn Hủy đơn hàng',
      keywords: ['hủy đơn', 'ngừng giao', 'đổi ý', 'chưa gửi hàng'],
      content: `1. Đơn hàng chưa xuất kho:
- Khách hàng có thể yêu cầu hủy đơn hàng hoàn toàn miễn phí bất kỳ lúc nào khi đơn ở trạng thái 'Chờ xử lý'.
2. Đơn hàng đang trên đường giao (Đã xuất kho):
- Nếu khách đổi ý, vui lòng thông báo cho CSKH hoặc từ chối nhận bưu kiện khi shipper gọi giao. Lumina Skincare hỗ trợ thu hồi miễn phí không phạt phí hoàn.`,
    },
  ];

  for (const item of kbData) {
    const existingArticle = await prisma.knowledgeBase.findFirst({
      where: { brandId: brand.id, title: item.title },
    });

    if (!existingArticle) {
      await prisma.knowledgeBase.create({
        data: {
          brandId: brand.id,
          category: item.category,
          title: item.title,
          content: item.content,
          keywords: item.keywords,
          isActive: true,
          createdBy: managerUser.id,
        },
      });
    }
  }

  console.log(`✅ Đã khởi tạo 4 bài viết Knowledge Base (Đổi trả, Vận chuyển, Hoàn tiền, Hủy đơn).`);

  // 5. Tạo 3 Hội thoại mẫu D2C
  // ----------------------------------------------------------------------------
  // Hội thoại 1: KHIẾU NẠI GIAO CHẬM (Mức URGENT + ANGRY/NEGATIVE)
  // ----------------------------------------------------------------------------
  const conv1 = await prisma.conversation.create({
    data: {
      brandId: brand.id,
      customerName: 'Nguyễn Văn An',
      customerIdentifier: '0912345678',
      channel: Channel.FACEBOOK,
      assignedAgentId: agentUser.id,
      status: ConversationStatus.OPEN,
      priority: PriorityLevel.URGENT,
      latestIntent: IntentType.COMPLAINT,
      latestSentiment: SentimentType.ANGRY,
      slaDeadline: new Date(Date.now() + 15 * 60 * 1000), // SLA < 15 phút
      messages: {
        create: [
          {
            brandId: brand.id,
            senderType: MessageSender.CUSTOMER,
            content:
              'Shop làm ăn kiểu gì thế này? Đơn serum trị mụn đặt từ thứ 2 hẹn 2 ngày giao mà nay 4 ngày vẫn chưa thấy bưu tá gọi! Mai tôi đi công tác nước ngoài rồi, hôm nay không giao trước 17h thì hủy đơn hoàn tiền gấp cho tôi!',
            intent: IntentType.COMPLAINT,
            sentiment: SentimentType.ANGRY,
            priority: PriorityLevel.URGENT,
            confidence: 0.98,
            aiMetadata: {
              urgency_reason: 'Khách hàng giận dữ vì giao trễ 4 ngày, yêu cầu giao trước 17h hoặc hoàn tiền gấp.',
              recommended_kb: ['Quy trình Hoàn tiền & Bồi hoàn thanh toán', 'Biểu phí & Thời gian Vận chuyển Toàn quốc'],
            },
          },
        ],
      },
    },
  });

  // ----------------------------------------------------------------------------
  // Hội thoại 2: TƯ VẤN SẢN PHẨM & KÍCH ỨNG (Mức MEDIUM + NEUTRAL)
  // ----------------------------------------------------------------------------
  const conv2 = await prisma.conversation.create({
    data: {
      brandId: brand.id,
      customerName: 'Trần Thị Mai',
      customerIdentifier: 'mai.tran@gmail.com',
      channel: Channel.WEB_CHAT,
      assignedAgentId: agentUser.id,
      status: ConversationStatus.OPEN,
      priority: PriorityLevel.MEDIUM,
      latestIntent: IntentType.PRODUCT_INQUIRY,
      latestSentiment: SentimentType.NEUTRAL,
      slaDeadline: new Date(Date.now() + 60 * 60 * 1000), // SLA < 60 phút
      messages: {
        create: [
          {
            brandId: brand.id,
            senderType: MessageSender.CUSTOMER,
            content:
              'Chào shop, da mình thuộc tuýp dầu mụn nhạy cảm thì dùng Serum Niacinamide 10% bên shop có bị châm chích không ạ? Nếu lỡ mua về dùng mà da bị kích ứng thì shop có hỗ trợ đổi trả không bạn?',
            intent: IntentType.PRODUCT_INQUIRY,
            sentiment: SentimentType.NEUTRAL,
            priority: PriorityLevel.MEDIUM,
            confidence: 0.94,
            aiMetadata: {
              urgency_reason: 'Khách hỏi tư vấn thành phần sản phẩm và điều kiện đổi trả khi kích ứng.',
              recommended_kb: ['Chính sách Đổi trả 1-đổi-1 trong 7 ngày'],
            },
          },
        ],
      },
    },
  });

  // ----------------------------------------------------------------------------
  // Hội thoại 3: HỎI PHÍ SHIP & VOUCHER (Mức LOW + POSITIVE)
  // ----------------------------------------------------------------------------
  const conv3 = await prisma.conversation.create({
    data: {
      brandId: brand.id,
      customerName: 'Phạm Hoàng Long',
      customerIdentifier: '0988776655',
      channel: Channel.ZALO,
      assignedAgentId: agentUser.id,
      status: ConversationStatus.RESOLVED,
      priority: PriorityLevel.LOW,
      latestIntent: IntentType.PAYMENT_PROMO,
      latestSentiment: SentimentType.POSITIVE,
      slaDeadline: new Date(Date.now() + 120 * 60 * 1000),
      messages: {
        create: [
          {
            brandId: brand.id,
            senderType: MessageSender.CUSTOMER,
            content:
              'Chào shop nhé! Đơn kem chống nắng gửi về quận Hải Châu, Đà Nẵng thì phí ship thế nào ạ? Mình có mã giảm 20k cho đơn đầu tiên có được áp dụng chung freeship không?',
            intent: IntentType.PAYMENT_PROMO,
            sentiment: SentimentType.POSITIVE,
            priority: PriorityLevel.LOW,
            confidence: 0.96,
          },
          {
            brandId: brand.id,
            senderType: MessageSender.AGENT,
            senderId: agentUser.id,
            content:
              'Dạ em chào anh Long ạ! Đơn hàng kem chống nắng từ 300.000đ bên em được Miễn phí vận chuyển toàn quốc về Đà Nẵng luôn anh nhé. Mã giảm giá 20k cho khách hàng mới áp dụng đồng thời với chính sách Freeship ạ!',
          },
        ],
      },
    },
  });

  console.log(`✅ Đã khởi tạo 3 Hội thoại mẫu:`);
  console.log(`   - [URGENT] ${conv1.customerName} (Khiếu nại giao trễ 4 ngày, dọa hủy đơn)`);
  console.log(`   - [MEDIUM] ${conv2.customerName} (Tư vấn da nhạy cảm & chính sách kích ứng)`);
  console.log(`   - [LOW/RESOLVED] ${conv3.customerName} (Hỏi phí ship Đà Nẵng & voucher)`);

  console.log('\n🎉 Hoàn tất nạp dữ liệu Demo thành công cho ReplyMind trên MySQL!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi trong quá trình nạp dữ liệu Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

