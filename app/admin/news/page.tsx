import { getPendingArticles } from "@/lib/db";
import Link from "next/link";
import { hideArticleAction } from "./actions";

export default async function AdminNewsPage() {
  const articles = await getPendingArticles();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pending News Articles for Review</h1>
      <div className="space-y-4">
        {articles.length === 0 ? (
          <p>No pending articles found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {articles.map((article) => (
              <li key={article.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                <div>
                  <h2 className="font-semibold">{article.title}</h2>
                  <p className="text-sm text-gray-600">
                    Source: {article.sourceName} | Published: {new Date(article.publishedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Link href={`/admin/news/create?articleId=${article.id}`} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Write Comment
                  </Link>
                  <form action={hideArticleAction}>
                    <input type="hidden" name="articleId" value={article.id} />
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                      Hide
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
