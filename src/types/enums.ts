/**
 * @file enums.ts
 * @description Định nghĩa các kiểu Enums cốt lõi trong hệ thống, đồng bộ với Prisma schema và hợp đồng AI.
 */

// Vai trò người dùng trong hệ thống
export type Role = "AGENT" | "SUPERVISOR" | "ADMIN";

// Trạng thái cuộc hội thoại
export type ConversationStatus = "OPEN" | "PENDING_CUSTOMER" | "RESOLVED" | "CLOSED";

// Mức độ ưu tiên của hội thoại
export type PriorityLevel = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

// Danh mục ý định của khách hàng
export type IntentType =
  | "ORDER_STATUS"
  | "RETURN_REQUEST"
  | "PRODUCT_INQUIRY"
  | "BILLING_ISSUE"
  | "GENERAL_FEEDBACK"
  | "OTHER";

// Trạng thái cảm xúc của khách hàng
export type SentimentType = "POSITIVE" | "NEUTRAL" | "FRUSTRATED" | "ANGRY";

// Mức độ khẩn cấp cần can thiệp
export type UrgencyLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

// Văn phong thương hiệu áp dụng khi sinh câu trả lời
export type BrandTone = "FRIENDLY" | "PROFESSIONAL" | "CASUAL" | "FORMAL";

// Đối tượng gửi tin nhắn
export type MessageSender = "CUSTOMER" | "AGENT" | "AI_COPILOT" | "SYSTEM";

// Hành động phản hồi của nhân viên với bản nháp AI
export type FeedbackAction =
  | "ACCEPTED_UNMODIFIED"
  | "ACCEPTED_WITH_EDITS"
  | "REJECTED"
  | "FLAGGED_INACCURATE";
