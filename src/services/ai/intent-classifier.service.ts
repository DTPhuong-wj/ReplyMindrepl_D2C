/**
 * @file intent-classifier.service.ts
 * @description Dịch vụ phân loại ý định (Intent Classification) và đánh giá cảm xúc & mức độ khẩn cấp của khách hàng.
 * @module services/ai
 */

import { IntentAnalysisResult, SentimentAnalysisResult } from "@/types";

/**
 * Phân loại ý định của khách hàng bằng đầu ra JSON chuẩn từ LLM.
 * KHUNG MẪU (STUB): Hợp đồng giao diện thuần túy.
 */
export async function classifyIntent(messageText: string): Promise<IntentAnalysisResult> {
  // KHUNG MẪU: Bộ phân loại ý định chưa được triển khai
  throw new Error("Phương thức classifyIntent chưa được triển khai.");
}

/**
 * Phân tích trạng thái cảm xúc và tính toán điểm mức độ khẩn cấp của tin nhắn.
 * KHUNG MẪU (STUB): Hợp đồng giao diện thuần túy.
 */
export async function analyzeSentiment(messageText: string): Promise<SentimentAnalysisResult> {
  // KHUNG MẪU: Bộ phân tích cảm xúc chưa được triển khai
  throw new Error("Phương thức analyzeSentiment chưa được triển khai.");
}
