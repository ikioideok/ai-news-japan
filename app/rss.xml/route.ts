import { NextResponse } from "next/server";
import { getPublishedPosts } from "@/lib/db";

export async function GET() {
  const posts = await getPublishedPosts();
  const items = posts.slice(0, 20).map(p => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${p.url}</link>
      <guid>${p.url}</guid>
      <pubDate>${p.createdAt.toUTCString()}</pubDate>
      <description><![CDATA[${p.commentary}]]></description>
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
