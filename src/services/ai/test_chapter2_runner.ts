/**
 * @file test_chapter2_runner.ts
 * @description Script chạy kiểm thử thực tế Hệ thống Prompt Chương 2 (F02 & F04) với 3 tình huống D2C điển hình.
 * @module services/ai
 */

import { analyzeIntentAndSentiment, generateCustomerReply } from "./llmService.ts";
import { BrandTone } from "../../types/enums.ts";

// ==============================================================================
// 1. DỮ LIỆU CHÍNH SÁCH MẪU TỪ KNOWLEDGE BASE ĐỂ ĐỐI CHIẾU RAG
// ==============================================================================
const KB_SHIPPING_POLICY = `
[Chính Sách Vận Chuyển & Giao Hàng]
- Thời gian giao hàng: Nội thành Hà Nội/TP.HCM: 24 - 48 giờ. Các tỉnh thành khác: 2 - 4 ngày làm việc. Khu vực huyện đảo, vùng xa (như Cà Mau, Điện Biên): 4 - 6 ngày làm việc.
- Cước phí: Đơn hàng từ 499.000 VNĐ được miễn phí vận chuyển toàn quốc. Đơn hàng dưới 499.000 VNĐ có phí ship đồng giá 30.000 VNĐ.
`.trim();

const KB_DELAY_COMPLAINT_POLICY = `
[Quy Định Xử Lý Giao Chậm & Bồi Thường]
- Đơn hàng giao trễ quá 3 ngày so với ngày hẹn dự kiến do lỗi vận chuyển:
  + Tặng ngay voucher giảm giá 15% (tối đa 150.000đ) áp dụng cho đơn tiếp theo.
  + Miễn 100% phí vận chuyển của đơn hàng hiện tại.
- Đơn vị đối tác: GHN, Viettel Post. Hotline điều phối khẩn cấp: 1900-6868.
`.trim();

const KB_RETURN_POLICY = `
[Chính Sách Đổi Trả Hàng 30 Ngày]
- Khách hàng được đổi size, đổi màu miễn phí trong vòng 30 ngày kể từ ngày nhận hàng.
- Miễn phí 100% phí vận chuyển 2 chiều cho lần đổi hàng đầu tiên.
- Bưu tá sẽ mang sản phẩm mới đến tận nhà giao đồng thời thu hồi sản phẩm cũ về (Quy trình đổi 1 bước tiện lợi).
- Điều kiện: Sản phẩm còn nguyên tem mác, chưa qua giặt ủi.
`.trim();

// ==============================================================================
// 2. 3 TÌNH HUỐNG KIỂM THỬ THỰC TẾ
// ==============================================================================
interface TestCase {
  id: string;
  title: string;
  customerMessage: string;
  kbContext: string;
  brandTone: BrandTone;
  expectedIntent: string;
  expectedPriority: string;
}

const TEST_CASES: TestCase[] = [
  {
    id: "TC-01",
    title: "Khách hàng hỏi phí ship & thời gian giao hàng",
    customerMessage: "Shop ơi mình ở tận Cà Mau thì phí ship tính thế nào và mấy ngày nhận được hàng vậy shop?",
    kbContext: KB_SHIPPING_POLICY,
    brandTone: "FRIENDLY",
    expectedIntent: "SHIPPING",
    expectedPriority: "LOW",
  },
  {
    id: "TC-02",
    title: "Khách hàng khiếu nại giao chậm URGENT (Bực tức)",
    customerMessage: "Đơn hàng ORD-9821 của tôi hẹn thứ 5 giao mà nay trễ 4 ngày rồi vẫn chưa thấy đâu, các bạn làm ăn kiểu gì vậy?! Nếu chiều nay không có hàng thì hủy đơn và bồi thường ngay cho tôi!",
    kbContext: KB_DELAY_COMPLAINT_POLICY,
    brandTone: "FORMAL",
    expectedIntent: "DELIVERY_ISSUE",
    expectedPriority: "URGENT",
  },
  {
    id: "TC-03",
    title: "Khách hàng yêu cầu đổi trả size áo (Hài lòng chất lượng)",
    customerMessage: "Chào shop, hôm qua mình nhận được áo khoác dạ bên shop chất đẹp lắm nhưng mình mặc bị chật vai một chút. Bên mình có hỗ trợ đổi sang size L được không ạ?",
    kbContext: KB_RETURN_POLICY,
    brandTone: "CASUAL",
    expectedIntent: "RETURN",
    expectedPriority: "MEDIUM",
  },
];

// ==============================================================================
// 3. RUNNER THỰC THI KIỂM THỬ VÀ ĐO ĐỘ TRỄ LATENCY
// ==============================================================================
async function runChapter2Tests() {
  console.log("================================================================================");
  console.log("🚀 KHỞI CHẠY KIỂM THỬ THỰC TẾ HỆ THỐNG PROMPT CHƯƠNG 2: REPLYMIND AI CO-PILOT");
  console.log("================================================================================\n");

  const resultsSummary: any[] = [];

  for (let i = 0; i < TEST_CASES.length; i++) {
    const tc = TEST_CASES[i];
    console.log(`--------------------------------------------------------------------------------`);
    console.log(`▶ KỊCH BẢN ${tc.id}: ${tc.title}`);
    console.log(`💬 Tin nhắn khách hàng: "${tc.customerMessage}"`);
    console.log(`🎨 Văn phong áp dụng: ${tc.brandTone}`);
    console.log(`--------------------------------------------------------------------------------`);

    // 1. Phân tích F02: Intent & Sentiment
    console.log(`\n[1/2] Đang thực thi F02 (Intent & Sentiment Analysis)...`);
    const f02Result = await analyzeIntentAndSentiment(tc.customerMessage);
    console.log(`⏱️ Độ trễ F02: ${f02Result.latencyMs} ms | Provider: ${f02Result.provider}`);
    console.log(`📊 Kết quả JSON F02:`, JSON.stringify(f02Result.data, null, 2));

    // 2. Sinh câu gợi ý F04: Reply Generator
    console.log(`\n[2/2] Đang thực thi F04 (RAG Reply Generator)...`);
    const f04Result = await generateCustomerReply(tc.customerMessage, tc.kbContext, tc.brandTone);
    console.log(`⏱️ Độ trễ F04: ${f04Result.latencyMs} ms | Provider: ${f04Result.provider}`);
    console.log(`📝 Câu phản hồi gợi ý (Draft Reply):\n"${f04Result.data.draft_reply}"`);
    console.log(`📚 Trích dẫn chính sách (Citations):`, f04Result.data.citations);
    console.log(`⚡ Hành động đề xuất (Suggested Action):`, f04Result.data.suggested_action);

    const totalLatency = f02Result.latencyMs + f04Result.latencyMs;
    const isFast = totalLatency < 2000;

    resultsSummary.push({
      id: tc.id,
      title: tc.title,
      intentDetected: f02Result.data.intent,
      sentimentDetected: f02Result.data.sentiment,
      priorityDetected: f02Result.data.priority,
      f02LatencyMs: f02Result.latencyMs,
      f04LatencyMs: f04Result.latencyMs,
      totalLatencyMs: totalLatency,
      isUnder2s: isFast,
      provider: f02Result.provider,
    });

    console.log(`\n✅ Hoàn thành ${tc.id} trong tổng thời gian: ${totalLatency} ms (Đạt chuẩn < 2s: ${isFast ? "ĐẠT" : "CHƯA ĐẠT"})\n`);
  }

  console.log("================================================================================");
  console.log("📊 BẢNG TỔNG HỢP KẾT QUẢ KIỂM THỬ PROMPT SYSTEM (CHƯƠNG 2)");
  console.log("================================================================================");
  console.table(resultsSummary);

  return resultsSummary;
}

// Thực thi nếu chạy trực tiếp
runChapter2Tests().catch((err) => {
  console.error("❌ Lỗi trong quá trình kiểm thử:", err);
  process.exit(1);
});
