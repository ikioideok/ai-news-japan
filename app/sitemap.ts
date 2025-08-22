import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ai-news-japan.example.com";
  const routes = ["/", "/news", "/features", "/tools", "/newsletter", "/about", "/contact", "/legal/privacy", "/legal/terms"];
  return routes.map((p) => ({ url: base + p, lastModified: new Date(), changeFrequency: "daily", priority: p === "/" ? 1 : 0.7 }));
}
