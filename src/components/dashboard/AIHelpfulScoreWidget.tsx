/**
 * @file AIHelpfulScoreWidget.tsx
 * @description Thành phần Giao diện: Thẻ chỉ số đo lường tỷ lệ chấp thuận bản nháp AI và mức độ can thiệp của nhân viên.
 * @module components/dashboard
 */

"use client";

import React from "react";

export interface AIHelpfulScoreWidgetProps {
  acceptanceRatePercentage?: number;
  totalSuggestions?: number;
  unmodifiedAcceptedRate?: number;
}

export const AIHelpfulScoreWidget: React.FC<AIHelpfulScoreWidgetProps> = ({
  acceptanceRatePercentage = 0,
  totalSuggestions = 0,
  unmodifiedAcceptedRate = 0,
}) => {
  // KHUNG MẪU (STUB): Chưa triển khai logic nghiệp vụ chi tiết
  return (
    <div className="bg-white p-5 rounded-lg border border-slate-200">
      <span className="text-xs font-semibold uppercase text-slate-500">Điểm Hữu Ích Của AI (Helpful Score)</span>
      <div className="mt-2 text-3xl font-bold text-slate-900">{acceptanceRatePercentage}%</div>
      <p className="text-xs text-slate-500 mt-1">Tính trên tổng số {totalSuggestions} đề xuất từ AI Co-pilot</p>
    </div>
  );
};

export default AIHelpfulScoreWidget;
