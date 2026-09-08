/**
 * @file ArticleList.tsx
 * @description Thành phần Giao diện: Hiển thị bảng danh sách bài viết chính sách và trạng thái lập chỉ mục vector.
 * @module components/knowledge-base
 */

"use client";

import React from "react";
import { KnowledgeBaseArticleDto } from "@/types";

export interface ArticleListProps {
  articles: KnowledgeBaseArticleDto[];
  onSelectArticle: (id: string) => void;
  onDeleteArticle?: (id: string) => void;
  isLoading?: boolean;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  onSelectArticle,
  onDeleteArticle,
  isLoading = false,
}) => {
  // KHUNG MẪU (STUB): Chưa triển khai logic nghiệp vụ chi tiết
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <header className="p-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-medium text-slate-800">Danh Sách Bài Viết Cơ Sở Tri Thức</h3>
      </header>
      <div className="divide-y divide-slate-100">
        {/* Các hàng hiển thị thông tin bài viết */}
      </div>
    </div>
  );
};

export default ArticleList;
