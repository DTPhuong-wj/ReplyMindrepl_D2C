/**
 * @file kb.types.ts
 * @description Định nghĩa các kiểu dữ liệu cho bài viết Cơ sở Tri thức và kết quả tìm kiếm RAG.
 */

// DTO biểu diễn bài viết cơ sở tri thức
export interface KnowledgeBaseArticleDto {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  isPublished: boolean;
  authorId: string;
  authorName?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Tham số truy vấn tìm kiếm tri thức ngữ nghĩa
export interface KBSearchQuery {
  query: string;
  category?: string;
  limit?: number;
}

// Kết quả trích đoạn tri thức tìm kiếm được
export interface KBSearchResult {
  articleId: string;
  title: string;
  contentSnippet: string;
  similarityScore: number;
}
