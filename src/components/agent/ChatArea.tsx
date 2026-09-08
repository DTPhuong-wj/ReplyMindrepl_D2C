/**
 * @file ChatArea.tsx
 * @description Thành phần Giao diện: Khung chat tương tác hiển thị lịch sử trao đổi và ô soạn thảo tin nhắn.
 * @module components/agent
 */

"use client";

import React from "react";
import { MessageDto } from "@/types";

export interface ChatAreaProps {
  conversationId: string;
  messages: MessageDto[];
  onSendMessage: (content: string) => void;
  draftReply?: string;
  onDraftChange?: (newDraft: string) => void;
  isSending?: boolean;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  conversationId,
  messages,
  onSendMessage,
  draftReply = "",
  onDraftChange,
  isSending = false,
}) => {
  // KHUNG MẪU (STUB): Chưa triển khai logic nghiệp vụ chi tiết
  return (
    <section className="flex-1 flex flex-col h-full bg-slate-50">
      <header className="p-4 border-b border-slate-200 bg-white">
        <h2 className="text-sm font-medium text-slate-700">Mã cuộc hội thoại: {conversationId}</h2>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Khung hiển thị danh sách tin nhắn mẫu */}
      </div>
      <footer className="p-4 bg-white border-t border-slate-200">
        {/* Khung ô soạn thảo và các nút gửi phản hồi */}
      </footer>
    </section>
  );
};

export default ChatArea;
