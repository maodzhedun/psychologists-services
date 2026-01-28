// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Psychologists.Services — Знайдіть свого психолога",
  description:
    "Платформа для пошуку професійних психологів. Отримайте підтримку та допомогу від кваліфікованих спеціалістів.",
  keywords: ["психолог", "психологічна допомога", "консультація", "терапія"],
  authors: [{ name: "Psychologists.Services" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Psychologists.Services — Знайдіть свого психолога",
    description:
      "Платформа для пошуку професійних психологів. Отримайте підтримку та допомогу від кваліфікованих спеціалістів.",
    type: "website",
    locale: "uk_UA",
    siteName: "Psychologists.Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Psychologists.Services — Знайдіть свого психолога",
    description:
      "Платформа для пошуку професійних психологів. Отримайте підтримку та допомогу від кваліфікованих спеціалістів.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-[#f3f3f3] font-sans antialiased">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
