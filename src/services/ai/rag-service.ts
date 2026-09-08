/**
 * @file rag-service.ts
 * @description Dịch vụ RAG (Retrieval-Augmented Generation): Xử lý nhúng vector (Embeddings), tìm kiếm tương đồng và lập chỉ mục.
 * @module services/ai
 */

import { KBSearchResult, KBSearchQuery } from "@/types";

/**
 * Tìm kiếm các điều khoản chính sách trong Cơ sở tri thức theo độ tương đồng ngữ nghĩa vector.
 * KHUNG MẪU (STUB): Hợp đồng giao diện thuần túy.
 */
export async function searchKnowledgeBase(query: KBSearchQuery): Promise<KBSearchResult[]> {
  // KHUNG MẪU: Tìm kiếm vector chưa được triển khai
  throw new Error("Phương thức searchKnowledgeBase chưa được triển khai.");
}

/**
 * Tạo vector nhúng (Embedding vector) cho một đoạn văn bản.
 * KHUNG MẪU (STUB): Hợp đồng giao diện thuần túy.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  // KHUNG MẪU: Tạo embedding chưa được triển khai
  throw new Error("Phương thức generateEmbedding chưa được triển khai.");
}

/**
 * Lập chỉ mục hoặc cập nhật vector cho bài viết chính sách vào cơ sở dữ liệu vector.
 * KHUNG MẪU (STUB): Hợp đồng giao diện thuần túy.
 */
export async function indexArticleVector(articleId: string, content: string): Promise<void> {
  // KHUNG MẪU: Lập chỉ mục vector chưa được triển khai
  throw new Error("Phương thức indexArticleVector chưa được triển khai.");
}
