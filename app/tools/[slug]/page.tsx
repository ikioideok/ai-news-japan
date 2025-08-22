import { notFound } from "next/navigation";
import Link from "next/link";
import { tools } from "@/lib/data";

export function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }));
}
export const dynamicParams = false;

export default function ToolDetail({ params }: { params: { slug: string } }) {
  const t = tools.find(x => x.slug === params.slug);
  if (!t) return notFound();
  return (
    <article className="prose">
      <p><Link href="/tools" className="text-sm">&larr; ツール一覧に戻る</Link></p>
      <h1>{t.name}</h1>
      <p className="text-gray-600">{t.summary}</p>
      <ul>
        <li>カテゴリ：{t.category}</li>
        <li>提供：{t.vendor}</li>
        <li>価格目安：¥{t.price}/月</li>
      </ul>
      <h3>概要</h3>
      <p>{t.details}</p>
    </article>
  );
}
