import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALFANGARY | الفنجري",
  description: "نظام إدارة المبيعات والمخزون والتقارير للمعاملات التجارية في الفنجري",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
