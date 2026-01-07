// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Psychologists.Services",
  description: "Знайдіть свого психолога",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-[#f3f3f3] font-sans antialiased">
        {/* Header */}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
