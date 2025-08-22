import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-news-japan.example.com"),
  title: { default: "AI News Japan", template: "%s | AI News Japan" },
  description: "世界のAIニュースを、日本語で最速・最深に。速報・深掘り解説・実務ノウハウをワンストップで。",
  openGraph: { title: "AI News Japan", description: "世界のAIニュースを、日本語で最速・最深に。", type: "website" },
  twitter: { card: "summary_large_image", title: "AI News Japan", description: "世界のAIニュースを、日本語で最速・最深に。" },
  alternates: { types: { "application/rss+xml": "/rss.xml" } }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="font-sans">
        <Header />
        <main className="container-max py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
