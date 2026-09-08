/**
 * @file knowledge-base.service.ts
 * @description Dịch vụ quản lý dữ liệu bài viết chính sách và giải đáp câu hỏi thường gặp FAQ.
 * @module services/db
 */

import { KnowledgeBaseArticleDto } from "@/types";

export interface CreateArticleInput {
  title: string;
  slug: string;
  category: string;
  content: string;
  authorId: string;
}

/**
 * Lấy danh sách các bài viết chính sách đã xuất bản hoặc bản nháp.
 * KHUNG MẪU (STUB): Hợp đồng giao diện thuần túy.
 */
export async function listArticles(category?: string): Promise<KnowledgeBaseArticleDto[]> {
  // KHUNG MẪU: Chưa triển khai truy vấn CSDL
  throw new Error("Phương thức listArticles chưa được triển khai.");
}

/**
 * Tạo mới một bài viết trong Cơ sở tri thức.
 * KHUNG MẪU (STUB): Hợp đồng giao diện thuần túy.
 */
export async function createArticle(input: CreateArticleInput): Promise<KnowledgeBaseArticleDto> {
  // KHUNG MẪU: Chưa triển khai ghi CSDL
  throw new Error("Phương thức createArticle chưa được triển khai.");
}
