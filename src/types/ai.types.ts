/**
 * @file ai.types.ts
 * @description Định nghĩa các hợp đồng kiểu dữ liệu cho phân tích AI, sinh phản hồi và đánh giá.
 */

import type { BrandTone, FeedbackAction, IntentType, PriorityLevel, SentimentType, UrgencyLevel } from "./enums.ts";

// Kết quả phân tích F02 (Structured JSON Output từ LLM)
export interface F02AnalysisOutput {
  intent: IntentType;
  sentiment: SentimentType;
  priority: PriorityLevel;
  confidence_score: number;
  summary_reason: string;
}

// Kết quả sinh bản nháp F04 (Structured JSON Output từ LLM)
export interface F04ReplyOutput {
  draft_reply: string;
  citations: string[];
  suggested_action: string;
}

// Kết quả phân loại ý định từ LLM (tương thích mở rộng)
export interface IntentAnalysisResult {
  intent: IntentType;
  confidence: number;
  reasoning: string;
  entities: Record<string, string | null>;
}

// Kết quả đánh giá cảm xúc & mức độ khẩn cấp
export interface SentimentAnalysisResult {
  sentiment: SentimentType;
  urgency: UrgencyLevel;
  score: number;
  keyDrivers: string[];
}

// Dữ liệu yêu cầu sinh bản nháp câu trả lời
export interface CopilotReplyRequest {
  conversationId: string;
  brandTone: BrandTone;
  customInstructions?: string;
}

// Dữ liệu trả về chứa bản nháp phản hồi và trích dẫn RAG
export interface CopilotReplyResponse {
  draftReply: string;
  citations: Array<{
    articleId: string;
    title: string;
    snippet: string;
  }>;
  suggestedActions: string[];
  modelUsed: string;
  confidenceScore: number;
}

// Dữ liệu ghi nhận đánh giá của nhân viên về gợi ý của AI
export interface AIFeedbackPayload {
  conversationId: string;
  suggestedReply: string;
  finalReplySent?: string;
  actionTaken: FeedbackAction;
  rating?: number;
  comment?: string;
}
