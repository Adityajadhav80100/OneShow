import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "OneShow | Book Movie Tickets",
  description:
    "Book movie tickets, discover trending releases, select your favourite cinema seats, and experience seamless entertainment with OneShow.",
  keywords: ["movies", "cinema tickets", "movie booking", "IMAX", "4DX", "OneShow"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#F8F7FC] text-[#181522] antialiased">
        <Suspense fallback={<div className="h-20 w-full bg-white border-b border-[#E9E5F0]" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
