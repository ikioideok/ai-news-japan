import Link from "next/link";
import { features } from "@/lib/data";

export const metadata = { title: "特集・深掘り" };

export default function FeaturesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">特集・深掘り</h1>
      <div className="grid md:grid-cols-3 gap-5">
        {features.map(f => (
          <article key={f.slug} className="card">
            <div className="badge">{f.tag}</div>
            <h3 className="text-lg font-bold mt-2"><Link href={`/features/${f.slug}`}>{f.title}</Link></h3>
            <p className="text-gray-600 text-sm mt-1">{f.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
