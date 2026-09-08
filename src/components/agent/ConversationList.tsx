/**
 * @file ConversationList.tsx
 * @description Thành phần Giao diện: Hiển thị danh sách hộp thư các cuộc hội thoại được ưu tiên theo thời gian thực.
 * @module components/agent
 */

"use client";

import React from "react";
import { ConversationSummaryDto } from "@/types";

export interface ConversationListProps {
  conversations: ConversationSummaryDto[];
  selectedId?: string;
  onSelectConversation: (id: string) => void;
  isLoading?: boolean;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedId,
  onSelectConversation,
  isLoading = false,
}) => {
  // KHUNG MẪU (STUB): Chưa triển khai logic nghiệp vụ chi tiết
  return (
    <aside className="w-80 border-r border-slate-200 bg-white flex flex-col h-full">
      <header className="p-4 border-b border-slate-200 font-semibold text-slate-800">
        Hộp thư đến ({conversations.length})
      </header>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {/* Khung hiển thị danh sách hội thoại sẽ nằm ở đây */}
      </div>
    </aside>
  );
};

export default ConversationList;
