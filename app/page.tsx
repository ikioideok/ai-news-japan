import Link from "next/link";
import { features, tools } from "@/lib/data";
import { NewsCard } from "@/components/NewsCard";
import { getPublishedPosts } from "@/lib/db";

export default async function HomePage() {
  const latestNews = await getPublishedPosts();

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          世界のAIニュースを、<span className="text-brand">日本語で最速・最深</span>に。
        </h1>
        <p className="text-gray-600 mt-3">速報・深掘り・実務ノウハウをワンストップで届けるテックメディア。</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/news" className="px-5 py-3 rounded-lg bg-brand text-white font-semibold">最新ニュースを見る</Link>
          <Link href="/newsletter" className="px-5 py-3 rounded-lg border font-semibold">メール速報を受け取る</Link>
          <Link href="/features" className="px-5 py-3 rounded-lg border font-semibold">特集を読む</Link>
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold">速報</h2>
          <Link href="/news" className="text-sm underline">もっと見る</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-4">
          {latestNews.slice(0, 6).map(n => <NewsCard key={n.id} item={n} />)}
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold">特集・深掘り</h2>
          <Link href="/features" className="text-sm underline">もっと見る</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-4">
          {features.slice(0,3).map(f => (
            <article key={f.slug} className="card">
              <div className="badge">{f.tag}</div>
              <h3 className="text-lg font-bold mt-2"><Link href={`/features/${f.slug}`}>{f.title}</Link></h3>
              <p className="text-gray-600 text-sm mt-1">{f.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold">AIツールDB（抜粋）</h2>
          <Link href="/tools" className="text-sm underline">すべて見る</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {tools.slice(0,6).map(t => (
            <div key={t.slug} className="border rounded-lg p-4">
              <div className="text-xs text-gray-500">{t.category}</div>
              <h3 className="font-semibold"><Link href={`/tools/${t.slug}`}>{t.name}</Link></h3>
              <p className="text-sm text-gray-600">{t.summary}</p>
              <div className="mt-2 text-xs">¥{t.price}/月  ・ {t.vendor}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
