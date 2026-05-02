import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medical Insurance Risk Classifier",
  description: "AIGC 5005 Final Project — MLP-based patient risk prediction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900">
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold text-gray-900 text-sm tracking-tight">
              Medical Risk Classifier
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
                Overview
              </Link>
              <Link
                href="/predict"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-md transition-colors"
              >
                Predict
              </Link>
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-gray-200 py-4 text-center text-xs text-gray-400">
          AIGC-5005 · Not medical advice
        </footer>
      </body>
    </html>
  );
}
