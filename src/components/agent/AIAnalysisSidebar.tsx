/**
 * @file AIAnalysisSidebar.tsx
 * @description Thành phần Giao diện: Thanh bên hiển thị phân tích AI, theo dõi cảm xúc và trích dẫn chính sách.
 * @module components/agent
 */

"use client";

import React from "react";
import { IntentAnalysisResult, SentimentAnalysisResult, KBSearchResult } from "@/types";

export interface AIAnalysisSidebarProps {
  intent?: IntentAnalysisResult | null;
  sentiment?: SentimentAnalysisResult | null;
  citations?: KBSearchResult[];
  isLoading?: boolean;
}

export const AIAnalysisSidebar: React.FC<AIAnalysisSidebarProps> = ({
  intent,
  sentiment,
  citations = [],
  isLoading = false,
}) => {
  // KHUNG MẪU (STUB): Chưa triển khai logic nghiệp vụ chi tiết
  return (
    <aside className="w-96 border-l border-slate-200 bg-white flex flex-col h-full p-4 space-y-4">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Thông Tin Phân Tích AI</h3>
      {/* Khung hiển thị Ý định, Điểm cảm xúc & Mức độ khẩn cấp */}
      {/* Khung hiển thị các điều khoản chính sách trích dẫn từ RAG */}
    </aside>
  );
};

export default AIAnalysisSidebar;
