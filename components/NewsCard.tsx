import Link from "next/link";
import { PublishedPost } from "@/lib/db";

export function NewsCard({ item }: { item: PublishedPost }) {
  return (
    <article className="card" id={`post-${item.id}`}>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="badge">{item.tag}</span>
        <time dateTime={item.createdAt.toISOString()}>
          {item.createdAt.toLocaleDateString("ja-JP")}
        </time>
      </div>
      <h3 className="font-semibold mt-2">
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {item.title}
        </a>
      </h3>
      <p className="text-sm text-gray-600 mt-1">{item.commentary}</p>
      <div className="mt-2 text-xs text-gray-500">
        出典: {item.sourceName}
      </div>
    </article>
  );
}
