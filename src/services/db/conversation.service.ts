/**
 * @file conversation.service.ts
 * @description Các phương thức truy vấn và biến đổi dữ liệu cuộc hội thoại hỗ trợ khách hàng.
 * @module services/db
 */

import { ConversationDetailDto, ConversationSummaryDto, PriorityLevel, ConversationStatus } from "@/types";

export interface ListConversationsFilter {
  status?: ConversationStatus;
  priority?: PriorityLevel;
  assignedAgentId?: string;
  limit?: number;
  offset?: number;
}

/**
 * Lấy danh sách cuộc hội thoại có phân trang kèm thông tin tóm tắt.
 * KHUNG MẪU (STUB): Hợp đồng giao diện thuần túy.
 */
export async function listConversations(
  filter?: ListConversationsFilter
): Promise<ConversationSummaryDto[]> {
  // KHUNG MẪU: Chưa triển khai truy vấn CSDL
  throw new Error("Phương thức listConversations chưa được triển khai.");
}

/**
 * Lấy thông tin chi tiết cuộc hội thoại theo ID kèm toàn bộ luồng tin nhắn.
 * KHUNG MẪU (STUB): Hợp đồng giao diện thuần túy.
 */
export async function getConversationById(
  conversationId: string
): Promise<ConversationDetailDto | null> {
  // KHUNG MẪU: Chưa triển khai truy vấn CSDL
  throw new Error("Phương thức getConversationById chưa được triển khai.");
}

/**
 * Cập nhật trạng thái hoặc nhân viên tiếp nhận cuộc hội thoại.
 * KHUNG MẪU (STUB): Hợp đồng giao diện thuần túy.
 */
export async function updateConversationStatus(
  conversationId: string,
  status: ConversationStatus
): Promise<void> {
  // KHUNG MẪU: Chưa triển khai cập nhật CSDL
  throw new Error("Phương thức updateConversationStatus chưa được triển khai.");
}
