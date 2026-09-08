/**
 * @file ArticleForm.tsx
 * @description Thành phần Giao diện: Form tạo mới và chỉnh sửa bài viết chính sách / FAQ trong Cơ sở Tri thức.
 * @module components/knowledge-base
 */

"use client";

import React from "react";
import { KnowledgeBaseArticleDto } from "@/types";

export interface ArticleFormProps {
  initialData?: Partial<KnowledgeBaseArticleDto>;
  onSubmit: (articleData: Partial<KnowledgeBaseArticleDto>) => Promise<void>;
  isSaving?: boolean;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
  initialData,
  onSubmit,
  isSaving = false,
}) => {
  // KHUNG MẪU (STUB): Chưa triển khai logic nghiệp vụ chi tiết
  return (
    <form className="space-y-4 max-w-2xl bg-white p-6 rounded-lg border border-slate-200">
      <h3 className="text-lg font-medium text-slate-900">Soạn Thảo Bài Viết Chính Sách</h3>
      {/* Các trường nhập Tiêu đề, Phân loại và Nội dung định dạng Markdown */}
    </form>
  );
};

export default ArticleForm;
