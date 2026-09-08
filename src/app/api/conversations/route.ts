/**
 * @file route.ts
 * @description Bộ điều hướng API: /api/conversations
 * GET: Lấy danh sách hội thoại đang mở. POST: Khởi tạo cuộc hội thoại mới.
 */

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // KHUNG MẪU (STUB): Chưa triển khai logic chi tiết
  return NextResponse.json({ message: "Đầu mối GET /api/conversations (Khung mẫu)" }, { status: 200 });
}

export async function POST(request: NextRequest) {
  // KHUNG MẪU (STUB): Chưa triển khai logic chi tiết
  return NextResponse.json({ message: "Đầu mối POST /api/conversations (Khung mẫu)" }, { status: 201 });
}
