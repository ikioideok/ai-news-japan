import Link from "next/link";

export function NewsCard({ item }: { item: { id: string; title: string; date: string; summary: string; tag: string; } }) {
  return (
    <article className="card" id={item.id}>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="badge">{item.tag}</span>
        <time dateTime={item.date}>{new Date(item.date).toLocaleDateString("ja-JP")}</time>
      </div>
      <h3 className="font-semibold mt-2">{item.title}</h3>
      <p className="text-sm text-gray-600">{item.summary}</p>
      <div className="mt-2 text-xs">
        <Link href="/features" className="underline">関連解説</Link>
      </div>
    </article>
  );
}
