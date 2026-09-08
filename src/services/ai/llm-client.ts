/**
 * @file llm-client.ts
 * @description Giao diện định tuyến đa nhà cung cấp LLM (OpenAI, Anthropic, Gemini).
 * @module services/ai
 */

export type ModelProvider = "openai" | "anthropic" | "gemini";

export interface LLMCompletionOptions {
  provider?: ModelProvider;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  responseFormat?: "json" | "text";
}

export interface LLMResponse<T = unknown> {
  rawText: string;
  parsedJson?: T;
  provider: ModelProvider;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * Thực thi một lượt gọi suy luận LLM cấu trúc đa nhà cung cấp.
 * KHUNG MẪU (STUB): Hợp đồng giao diện thuần túy, chưa viết logic chi tiết.
 */
export async function executeCompletion<T = unknown>(
  systemPrompt: string,
  userPrompt: string,
  options?: LLMCompletionOptions
): Promise<LLMResponse<T>> {
  // KHUNG MẪU: Bộ điều phối đa mô hình sẽ được cài đặt tại đây
  throw new Error("Phương thức executeCompletion chưa được triển khai.");
}
