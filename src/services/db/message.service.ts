/**
 * @file message.service.ts
 * @description Các phương thức đọc và ghi tin nhắn trong luồng hội thoại.
 * @module services/db
 */

import { MessageDto, MessageSender } from "@/types";

export interface CreateMessageInput {
  conversationId: string;
  senderType: MessageSender;
  senderId?: string;
  content: string;
}

/**
 * Thêm một tin nhắn mới vào cuộc hội thoại.
 * KHUNG MẪU (STUB): Hợp đồng giao diện thuần túy.
 */
export async function createMessage(input: CreateMessageInput): Promise<MessageDto> {
  // KHUNG MẪU: Chưa triển khai ghi tin nhắn vào CSDL
  throw new Error("Phương thức createMessage chưa được triển khai.");
}

/**
 * Lấy danh sách lịch sử tin nhắn của một cuộc hội thoại.
 * KHUNG MẪU (STUB): Hợp đồng giao diện thuần túy.
 */
export async function getMessagesByConversation(
  conversationId: string,
  limit?: number
): Promise<MessageDto[]> {
  // KHUNG MẪU: Chưa triển khai truy vấn CSDL
  throw new Error("Phương thức getMessagesByConversation chưa được triển khai.");
}
