import { getArticleById } from "@/lib/db";
import { newsTags } from "@/lib/data";
import { createPostAction } from "../actions";

export default async function CreatePostPage({
  searchParams,
}: {
  searchParams: { articleId?: string };
}) {
  const articleId = Number(searchParams.articleId);
  if (!searchParams.articleId || isNaN(articleId)) {
    return <p>Error: Invalid article ID.</p>;
  }

  const article = await getArticleById(articleId);

  if (!article) {
    return <p>Error: Article not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Write Commentary</h1>
      <div className="p-4 border rounded-md bg-gray-50 mb-6">
        <h2 className="font-semibold text-lg">{article.title}</h2>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
          {article.sourceName} - {new Date(article.publishedAt).toLocaleDateString()}
        </a>
      </div>

      <form action={createPostAction} className="space-y-4">
        <input type="hidden" name="rawArticleId" value={article.id} />
        <input type="hidden" name="title" value={article.title} />
        <input type="hidden" name="url" value={article.url} />
        <input type="hidden" name="sourceName" value={article.sourceName} />

        <div>
          <label htmlFor="commentary" className="block text-sm font-medium text-gray-700">
            Your Commentary
          </label>
          <textarea
            id="commentary"
            name="commentary"
            rows={10}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <div>
          <label htmlFor="tag" className="block text-sm font-medium text-gray-700">
            Tag
          </label>
          <select
            id="tag"
            name="tag"
            required
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            {newsTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-brand px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}
