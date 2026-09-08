/**
 * @file reply-generator.service.ts
 * @description Dịch vụ điều phối RAG và kích hoạt LLM để sinh bản nháp phản hồi AI Co-pilot chuẩn văn phong.
 * @module services/ai
 */

import { CopilotReplyRequest, CopilotReplyResponse } from "@/types";

/**
 * Sinh bản nháp câu trả lời đề xuất cho nhân viên trong một cuộc trò chuyện.
 * KHUNG MẪU (STUB): Hợp đồng giao diện thuần túy.
 */
export async function generateCopilotReply(
  request: CopilotReplyRequest
): Promise<CopilotReplyResponse> {
  // KHUNG MẪU: Bộ sinh câu trả lời Co-pilot chưa được triển khai
  throw new Error("Phương thức generateCopilotReply chưa được triển khai.");
}
