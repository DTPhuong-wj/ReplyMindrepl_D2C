/**
 * @file route.ts
 * @description Bộ điều hướng API: /api/knowledge-base
 * GET: Lấy danh sách bài viết chính sách. POST: Thêm mới và lập chỉ mục vector cho bài viết.
 */

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // KHUNG MẪU (STUB): Chưa triển khai logic chi tiết
  return NextResponse.json({ message: "Đầu mối GET /api/knowledge-base (Khung mẫu)" }, { status: 200 });
}

export async function POST(request: NextRequest) {
  // KHUNG MẪU (STUB): Chưa triển khai logic chi tiết
  return NextResponse.json({ message: "Đầu mối POST /api/knowledge-base (Khung mẫu)" }, { status: 201 });
}
