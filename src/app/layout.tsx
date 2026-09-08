/**
 * @file layout.tsx
 * @description Thành phần Layout gốc cho toàn bộ ứng dụng Next.js ReplyMind.
 */

import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReplyMind | Trợ lý AI Co-pilot Hỗ trợ Khách hàng D2C",
  description: "Giải pháp nâng cao hiệu suất chăm sóc khách hàng với AI phân loại và đề xuất câu trả lời chuẩn xác.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
