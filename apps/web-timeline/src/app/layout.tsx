import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 大模型多厂商编年史",
  description:
    "2022.01 — 2026.09 全球 AI 大模型厂商并行发展时间线，Mintlify 风格可视化 · 各厂商发版时间战线横向对比 + LLM/AGI 加速编年史。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
