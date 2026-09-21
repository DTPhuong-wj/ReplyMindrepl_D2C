/**
 * @file llmService.ts
 * @description Dịch vụ kết nối và điều phối các mô hình LLM (Google Gemini & OpenAI) để thực thi các System Prompt F02 và F04.
 * @module services/ai
 */

import fs from "fs";
import path from "path";
import { BrandTone } from "../../types/enums.ts";
import { F02AnalysisOutput, F04ReplyOutput } from "../../types/ai.types.ts";

// ==============================================================================
// 1. CẤU HÌNH & TẢI SYSTEM PROMPT TỪ DISK
// ==============================================================================
const PROMPTS_DIR = path.join(process.cwd(), "prompts", "system");

function loadPromptFile(fileName: string): string {
  const filePath = path.join(PROMPTS_DIR, fileName);
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.warn(`[llmService] Không thể đọc tệp prompt tại ${filePath}, sử dụng template dự phòng.`);
    return "";
  }
}

const F02_SYSTEM_PROMPT = loadPromptFile("F02_intent_sentiment_v2.txt");
const F04_SYSTEM_PROMPT = loadPromptFile("F04_reply_generator_v1.txt");

// ==============================================================================
// 2. HÀM LÀM SẠCH VÀ PARSE JSON AN TOÀN (SAFE JSON PARSER)
// ==============================================================================
export function cleanAndParseJson<T>(rawText: string): T {
  // Loại bỏ các thẻ code block markdown nếu có
  let cleaned = rawText.trim();
  cleaned = cleaned.replace(/^```json\s*/i, "");
  cleaned = cleaned.replace(/^```\s*/i, "");
  cleaned = cleaned.replace(/\s*```$/i, "");
  cleaned = cleaned.trim();

  // Tìm vị trí mở { và đóng } đầu/cuối cùng
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  return JSON.parse(cleaned) as T;
}

// ==============================================================================
// 3. GỌI API GOOGLE GEMINI (NATIVE FETCH)
// ==============================================================================
async function callGeminiApi(
  systemPrompt: string,
  userPrompt: string,
  apiKey: string,
  modelName = "gemini-1.5-flash"
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: userPrompt }],
      },
    ],
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json",
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`[Gemini API Error ${response.status}]: ${errorText}`);
  }

  const result = await response.json();
  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("[Gemini API] Không nhận được phản hồi nội dung từ model.");
  }
  return text;
}

// ==============================================================================
// 4. GỌI API OPENAI (NATIVE FETCH)
// ==============================================================================
async function callOpenAiApi(
  systemPrompt: string,
  userPrompt: string,
  apiKey: string,
  modelName = "gpt-4o-mini"
): Promise<string> {
  const url = "https://api.openai.com/v1/chat/completions";

  const payload = {
    model: modelName,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.2,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`[OpenAI API Error ${response.status}]: ${errorText}`);
  }

  const result = await response.json();
  const text = result?.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error("[OpenAI API] Không nhận được phản hồi nội dung từ model.");
  }
  return text;
}

// ==============================================================================
// 5. CƠ CHẾ DỰ PHÒNG THÔNG MINH (INTELLIGENT D2C SIMULATOR FALLBACK)
// ==============================================================================
// Đảm bảo hệ thống KHÔNG BAO GIỜ CRASH khi chưa nhập API Key hoặc khi mất mạng
function simulateF02Analysis(message: string): F02AnalysisOutput {
  const lower = message.toLowerCase();

  // Nhận diện Intent, Sentiment và Priority theo tập luật D2C
  if (lower.includes("trễ") || lower.includes("chậm") || lower.includes("bực") || lower.includes("làm ăn") || lower.includes("hủy đơn")) {
    return {
      intent: "DELIVERY_ISSUE",
      sentiment: "NEGATIVE",
      priority: lower.includes("4 ngày") || lower.includes("làm ăn kiểu gì") ? "URGENT" : "HIGH",
      confidence_score: 0.96,
      summary_reason: "Khách hàng khiếu nại gay gắt về tiến độ giao hàng trễ hạn và yêu cầu xử lý gấp.",
    };
  }

  if (lower.includes("đổi") || lower.includes("chật") || lower.includes("rộng") || lower.includes("size") || lower.includes("trả")) {
    return {
      intent: "RETURN",
      sentiment: lower.includes("ưng") || lower.includes("cảm ơn") ? "POSITIVE" : "NEUTRAL",
      priority: "MEDIUM",
      confidence_score: 0.94,
      summary_reason: "Khách hàng yêu cầu hỗ trợ đổi kích cỡ size áo theo chính sách đổi trả.",
    };
  }

  if (lower.includes("ship") || lower.includes("phí giao") || lower.includes("bao nhiêu tiền") || lower.includes("vận chuyển")) {
    return {
      intent: "SHIPPING",
      sentiment: "NEUTRAL",
      priority: "LOW",
      confidence_score: 0.92,
      summary_reason: "Khách hàng tìm hiểu về chi phí và thời gian giao nhận hàng.",
    };
  }

  return {
    intent: "PRODUCT_QUESTION",
    sentiment: "NEUTRAL",
    priority: "LOW",
    confidence_score: 0.88,
    summary_reason: "Khách hàng đặt câu hỏi tư vấn về sản phẩm và chính sách chung.",
  };
}

function simulateF04Reply(message: string, kbContext: string, brandTone: BrandTone): F04ReplyOutput {
  const lower = message.toLowerCase();

  if (lower.includes("trễ") || lower.includes("giao chậm")) {
    const greetings: Record<BrandTone, string> = {
      FRIENDLY: "Dạ em chào anh/chị ạ! Em rất tiếc và thành thật xin lỗi vì đơn hàng của mình bị trễ hẹn khiến anh/chị phiền lòng ạ.",
      PROFESSIONAL: "Kính chào quý khách. Bộ phận CSKH ReplyMind đã tiếp nhận thông tin phản ánh về việc đơn hàng giao chậm trễ.",
      CASUAL: "Chào bạn nhé! Rất tiếc vì đơn hàng của bạn bị giao chậm hơn dự kiến, team ReplyMind xin lỗi bạn nhiều nha!",
      FORMAL: "Kính thưa Quý khách hàng. Chúng tôi xin chân thành cáo lỗi cùng Quý khách về sự cố giao hàng chậm trễ ngoài ý muốn này.",
    };

    return {
      draft_reply: `${greetings[brandTone]} Theo chính sách của bên em, đơn hàng giao trễ quá 3 ngày sẽ được tặng ngay voucher giảm giá 15% cho đơn tiếp theo và miễn 100% phí vận chuyển đơn hiện tại ạ. Em đã làm việc khẩn cấp với bưu cục đối tác để điều phối bưu tá phát hỏa tốc ngay trong ngày cho mình nhé ạ!`,
      citations: [
        "Quy Định Vận Chuyển & Cam Kết Thời Gian Giao Hàng - Điều 2: Cam kết bồi thường khi giao trễ quá 3 ngày",
      ],
      suggested_action: "Đốc thúc bưu tá phát hỏa tốc ngay trong ngày và gửi tặng mã voucher giảm giá 15%.",
    };
  }

  if (lower.includes("đổi") || lower.includes("size")) {
    const greetings: Record<BrandTone, string> = {
      FRIENDLY: "Dạ em chào chị ạ! Em rất vui được hỗ trợ chị đổi size đầm cho vừa vặn nhất ạ.",
      PROFESSIONAL: "Kính chào quý khách. Chúng tôi sẵn sàng hỗ trợ quý khách thực hiện thủ tục đổi kích cỡ sản phẩm.",
      CASUAL: "Chào bạn nhé! Không sao đâu nè, bên mình có hỗ trợ đổi size tận nhà siêu nhanh luôn nha!",
      FORMAL: "Kính gửi Quý khách hàng. Chúng tôi đã ghi nhận yêu cầu đổi kích cỡ sản phẩm của Quý khách.",
    };

    return {
      draft_reply: `${greetings[brandTone]} Theo chính sách của thương hiệu, bên em hỗ trợ đổi hàng miễn phí 100% phí vận chuyển 2 chiều trong vòng 30 ngày kể từ ngày nhận hàng ạ. Chị giữ sản phẩm còn nguyên tem mác giúp em, bưu tá sẽ mang size mới tới tận nơi và nhận lại sản phẩm cũ cùng lúc để chị không mất thời gian đi gửi bưu cục nhé ạ!`,
      citations: [
        "Chính Sách Đổi Trả Hàng Miễn Phí Trong Vòng 30 Ngày - Điều 1 và Điều 3: Miễn phí đổi hàng tận nhà",
      ],
      suggested_action: "Tạo phiếu đổi hàng 1 bước (size mới giao tới - size cũ thu hồi đồng thời).",
    };
  }

  // Mặc định cho hỏi phí ship / tư vấn
  return {
    draft_reply: `Dạ chào bạn! Bên mình áp dụng chính sách giao hàng tiêu chuẩn từ 24 - 48h cho nội thành và 2 - 4 ngày cho các tỉnh thành khác ạ. Với các đơn hàng đạt điều kiện chương trình, bên mình sẽ hỗ trợ miễn phí vận chuyển tận nơi. Bạn cho mình xin địa chỉ nhận hàng để mình báo chính xác cước phí và thời gian giao nhé ạ!`,
    citations: [
      "Quy Định Vận Chuyển & Cam Kết Thời Gian Giao Hàng - Điều 1: Thời gian giao hàng tiêu chuẩn",
    ],
    suggested_action: "Hỏi địa chỉ hoặc quận/huyện để tra cứu cước phí vận chuyển chính xác.",
  };
}

// ==============================================================================
// 6. CÁC HÀM XUẤT KHẨU CHÍNH CHO ỨNG DỤNG (EXPORTED PUBLIC API)
// ==============================================================================

/**
 * Phân tích ý định (7 Intent), cảm xúc (3 Sentiment), và mức ưu tiên (4 Priority)
 * @param customerMessage Nội dung tin nhắn của khách hàng
 */
export async function analyzeIntentAndSentiment(customerMessage: string): Promise<{
  data: F02AnalysisOutput;
  latencyMs: number;
  provider: string;
}> {
  const startTime = Date.now();
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const defaultProvider = process.env.DEFAULT_LLM_PROVIDER || "gemini";

  const systemPrompt = F02_SYSTEM_PROMPT || "Bạn là bộ phân tích Intent, Sentiment, Priority. Trả về JSON.";
  const userPrompt = `Hãy phân tích tin nhắn sau của khách hàng:\n"${customerMessage}"`;

  // 1. Thử gọi Google Gemini nếu có key
  if (defaultProvider === "gemini" && geminiKey && geminiKey.trim() !== "") {
    try {
      const rawResponse = await callGeminiApi(systemPrompt, userPrompt, geminiKey, "gemini-1.5-flash");
      const parsed = cleanAndParseJson<F02AnalysisOutput>(rawResponse);
      const latencyMs = Date.now() - startTime;
      return { data: parsed, latencyMs, provider: "Google Gemini 1.5 Flash (Live API)" };
    } catch (err: any) {
      console.warn(`[llmService] Gọi Gemini API thất bại: ${err.message}. Kích hoạt Fallback Simulator.`);
    }
  }

  // 2. Thử gọi OpenAI nếu có key
  if (openaiKey && openaiKey.trim() !== "") {
    try {
      const rawResponse = await callOpenAiApi(systemPrompt, userPrompt, openaiKey, "gpt-4o-mini");
      const parsed = cleanAndParseJson<F02AnalysisOutput>(rawResponse);
      const latencyMs = Date.now() - startTime;
      return { data: parsed, latencyMs, provider: "OpenAI GPT-4o-mini (Live API)" };
    } catch (err: any) {
      console.warn(`[llmService] Gọi OpenAI API thất bại: ${err.message}. Kích hoạt Fallback Simulator.`);
    }
  }

  // 3. Fallback Simulator nội bộ (Tốc độ tức thì < 50ms, 100% không crash)
  const simulated = simulateF02Analysis(customerMessage);
  const latencyMs = Date.now() - startTime;
  return {
    data: simulated,
    latencyMs,
    provider: "ReplyMind D2C Local Engine (Deterministic Simulator)",
  };
}

/**
 * Sinh bản nháp câu trả lời gợi ý CSKH theo RAG Context và Brand Tone
 * @param customerMessage Nội dung tin nhắn của khách hàng
 * @param kbContext Tài liệu trích đoạn chính sách từ Knowledge Base
 * @param brandTone Văn phong thương hiệu đã cấu hình
 */
export async function generateCustomerReply(
  customerMessage: string,
  kbContext: string,
  brandTone: BrandTone = "FRIENDLY"
): Promise<{
  data: F04ReplyOutput;
  latencyMs: number;
  provider: string;
}> {
  const startTime = Date.now();
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const defaultProvider = process.env.DEFAULT_LLM_PROVIDER || "gemini";

  const interpolatedSystem = F04_SYSTEM_PROMPT
    ? F04_SYSTEM_PROMPT.replace("{{CUSTOMER_MESSAGE}}", customerMessage)
        .replace("{{KNOWLEDGE_BASE_CONTEXT}}", kbContext)
        .replace("{{BRAND_TONE}}", brandTone)
    : "Bạn là AI CSKH. Trả về JSON chứa draft_reply, citations, suggested_action.";

  const userPrompt = `Dữ liệu khách hàng cần phản hồi:\n- Tin nhắn khách hàng: "${customerMessage}"\n- Văn phong áp dụng: ${brandTone}\n- Tài liệu chính sách đối chiếu:\n${kbContext}\n\nHãy sinh câu trả lời chuẩn xác.`;

  // 1. Thử gọi Google Gemini nếu có key
  if (defaultProvider === "gemini" && geminiKey && geminiKey.trim() !== "") {
    try {
      const rawResponse = await callGeminiApi(interpolatedSystem, userPrompt, geminiKey, "gemini-1.5-flash");
      const parsed = cleanAndParseJson<F04ReplyOutput>(rawResponse);
      const latencyMs = Date.now() - startTime;
      return { data: parsed, latencyMs, provider: "Google Gemini 1.5 Flash (Live API)" };
    } catch (err: any) {
      console.warn(`[llmService] Gọi Gemini API thất bại: ${err.message}. Kích hoạt Fallback Simulator.`);
    }
  }

  // 2. Thử gọi OpenAI nếu có key
  if (openaiKey && openaiKey.trim() !== "") {
    try {
      const rawResponse = await callOpenAiApi(interpolatedSystem, userPrompt, openaiKey, "gpt-4o-mini");
      const parsed = cleanAndParseJson<F04ReplyOutput>(rawResponse);
      const latencyMs = Date.now() - startTime;
      return { data: parsed, latencyMs, provider: "OpenAI GPT-4o-mini (Live API)" };
    } catch (err: any) {
      console.warn(`[llmService] Gọi OpenAI API thất bại: ${err.message}. Kích hoạt Fallback Simulator.`);
    }
  }

  // 3. Fallback Simulator nội bộ
  const simulated = simulateF04Reply(customerMessage, kbContext, brandTone);
  const latencyMs = Date.now() - startTime;
  return {
    data: simulated,
    latencyMs,
    provider: "ReplyMind D2C Local Engine (Deterministic Simulator)",
  };
}
