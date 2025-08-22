import { notFound } from "next/navigation";
import { features } from "@/lib/data";

export function generateStaticParams() {
  return features.map(f => ({ slug: f.slug }));
}
export const dynamicParams = false;

export default function FeatureDetail({ params }: { params: { slug: string } }) {
  const article = features.find(f => f.slug === params.slug);
  if (!article) return notFound();
  return (
    <article className="prose">
      <h1>{article.title}</h1>
      <p className="text-gray-600">{article.excerpt}</p>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: article.html }} />
    </article>
  );
}
