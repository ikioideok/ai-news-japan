import { latestNews } from "@/lib/data";
import { NewsCard } from "@/components/NewsCard";

export const metadata = { title: "最新ニュース" };

export default function NewsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">最新ニュース</h1>
      <div className="grid md:grid-cols-3 gap-5">
        {latestNews.map(n => <NewsCard key={n.id} item={n} />)}
      </div>
    </div>
  );
}
