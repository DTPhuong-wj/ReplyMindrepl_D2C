/**
 * @file conversation.types.ts
 * @description Định nghĩa các interface cho cuộc hội thoại, tin nhắn và luồng chat.
 */

import { ConversationStatus, PriorityLevel, IntentType, SentimentType, MessageSender } from "./enums.ts";

// DTO biểu diễn dữ liệu tin nhắn
export interface MessageDto {
  id: string;
  conversationId: string;
  senderType: MessageSender;
  senderId?: string | null;
  content: string;
  intent?: IntentType | null;
  sentiment?: SentimentType | null;
  confidence?: number | null;
  createdAt: Date | string;
}

// DTO tóm tắt cuộc hội thoại phục vụ hiển thị danh sách Inbox
export interface ConversationSummaryDto {
  id: string;
  customerEmail: string;
  customerName?: string | null;
  status: ConversationStatus;
  priority: PriorityLevel;
  detectedIntent?: IntentType | null;
  latestSentiment?: SentimentType | null;
  assignedAgentId?: string | null;
  assignedAgentName?: string | null;
  lastMessagePreview?: string;
  updatedAt: Date | string;
  createdAt: Date | string;
}

// DTO chi tiết cuộc hội thoại gồm toàn bộ tin nhắn
export interface ConversationDetailDto extends ConversationSummaryDto {
  messages: MessageDto[];
}
