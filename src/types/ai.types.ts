/**
 * @file ai.types.ts
 * @description Định nghĩa các hợp đồng kiểu dữ liệu cho phân tích AI, sinh phản hồi và đánh giá.
 */

import { BrandTone, FeedbackAction, IntentType, SentimentType, UrgencyLevel } from "./enums";

// Kết quả phân loại ý định từ LLM
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
