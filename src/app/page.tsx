/**
 * @file page.tsx
 * @description Trang chủ bàn làm việc hỗ trợ khách hàng của hệ thống ReplyMind.
 */

import React from "react";

export default function HomePage() {
  // KHUNG MẪU (STUB): Trang chào mừng khởi tạo dự án
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
          ReplyMind AI Co-pilot
        </h1>
        <p className="text-slate-600 mb-8">
          Khung dự án (Boilerplate) sẵn sàng cho sản xuất đã được khởi tạo thành công. Sẵn sàng triển khai các tính năng từ Chương 1 đến Chương 9.
        </p>
      </div>
    </main>
  );
}
