import { NextResponse } from "next/server";
import { latestNews } from "@/lib/data";

export async function GET() {
  const items = latestNews.slice(0, 20).map(n => `
    <item>
      <title><![CDATA[${n.title}]]></title>
      <link>https://ai-news-japan.example.com/news#${n.id}</link>
      <pubDate>${new Date(n.date).toUTCString()}</pubDate>
      <description><![CDATA[${n.summary}]]></description>
    </item>
  `).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>AI News Japan</title>
      <link>https://ai-news-japan.example.com</link>
      <description>世界のAIニュースを、日本語で最速・最深に。</description>
      ${items}
    </channel>
  </rss>`;
  return new NextResponse(xml, { headers: { "Content-Type": "application/rss+xml" }});
}
