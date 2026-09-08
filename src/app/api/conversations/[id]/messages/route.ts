/**
 * @file route.ts
 * @description Bộ điều hướng API: /api/conversations/[id]/messages
 * GET: Lấy lịch sử tin nhắn. POST: Gửi hoặc lưu tin nhắn mới trong luồng chat.
 */

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // KHUNG MẪU (STUB): Chưa triển khai logic chi tiết
  return NextResponse.json(
    { message: `Đầu mối GET /api/conversations/${params.id}/messages (Khung mẫu)` },
    { status: 200 }
  );
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // KHUNG MẪU (STUB): Chưa triển khai logic chi tiết
  return NextResponse.json(
    { message: `Đầu mối POST /api/conversations/${params.id}/messages (Khung mẫu)` },
    { status: 201 }
  );
}
