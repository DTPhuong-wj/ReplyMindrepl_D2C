/**
 * @file OneClickActions.tsx
 * @description Thành phần Giao diện: Các nút hành động 1-Click (Chèn bản nháp, Tạo nhãn hoàn hàng, Chuyển cấp).
 * @module components/agent
 */

"use client";

import React from "react";

export interface OneClickActionsProps {
  suggestedActions: string[];
  onExecuteAction: (actionName: string) => void;
  onApplyDraft: () => void;
  isActionPending?: boolean;
}

export const OneClickActions: React.FC<OneClickActionsProps> = ({
  suggestedActions,
  onExecuteAction,
  onApplyDraft,
  isActionPending = false,
}) => {
  // KHUNG MẪU (STUB): Chưa triển khai logic nghiệp vụ chi tiết
  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <button
        type="button"
        disabled={isActionPending}
        className="px-3 py-1.5 text-xs font-medium rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
      >
        Chèn Bản Nháp AI
      </button>
      {/* Các nút hành động 1-Click đề xuất tự động */}
    </div>
  );
};

export default OneClickActions;
