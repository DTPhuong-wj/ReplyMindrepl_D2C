/**
 * @file route.ts
 * @description Bộ điều hướng API: /api/feedback
 * POST: Lưu trữ đánh giá của nhân viên hỗ trợ đối với câu trả lời gợi ý từ AI.
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // KHUNG MẪU (STUB): Chưa triển khai logic chi tiết
  return NextResponse.json({ message: "Đầu mối POST /api/feedback (Khung mẫu)" }, { status: 201 });
}
