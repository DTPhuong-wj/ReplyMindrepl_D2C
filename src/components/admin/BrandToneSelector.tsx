/**
 * @file BrandToneSelector.tsx
 * @description Thành phần Giao diện: Bảng điều khiển cấu hình văn phong thương hiệu (Thân thiện, Chuyên nghiệp, Gần gũi, Trang trọng).
 * @module components/admin
 */

"use client";

import React from "react";
import { BrandTone } from "@/types";

export interface BrandToneSelectorProps {
  currentTone: BrandTone;
  onToneChange: (tone: BrandTone) => void;
  customGuidelines?: string;
  onGuidelinesChange?: (guidelines: string) => void;
  isSaving?: boolean;
}

export const BrandToneSelector: React.FC<BrandToneSelectorProps> = ({
  currentTone,
  onToneChange,
  customGuidelines = "",
  onGuidelinesChange,
  isSaving = false,
}) => {
  // KHUNG MẪU (STUB): Chưa triển khai logic nghiệp vụ chi tiết
  const availableTones: Array<{ tone: BrandTone; label: string; description: string }> = [
    { tone: "FRIENDLY", label: "Thân thiện", description: "Ấm áp, thấu cảm, cởi mở" },
    { tone: "PROFESSIONAL", label: "Chuyên nghiệp", description: "Rõ ràng, trực diện, lịch sự" },
    { tone: "CASUAL", label: "Gần gũi", description: "Hiện đại, trẻ trung, tự nhiên" },
    { tone: "FORMAL", label: "Trang trọng", description: "Nghiêm cẩn, chuẩn mực, tôn trọng" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 max-w-xl space-y-4">
      <h3 className="text-base font-semibold text-slate-900">Cấu Hình Văn Phong Thương Hiệu</h3>
      <div className="grid grid-cols-2 gap-3">
        {availableTones.map(({ tone, label, description }) => (
          <button
            key={tone}
            type="button"
            className={`p-3 text-sm font-medium border rounded-md text-left transition-colors ${
              currentTone === tone
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="font-semibold">{label}</div>
            <div className="text-xs text-slate-500 mt-1">{description}</div>
          </button>
        ))}
      </div>
      {/* Khung nhập hướng dẫn quy tắc văn phong tùy chỉnh */}
    </div>
  );
};

export default BrandToneSelector;
