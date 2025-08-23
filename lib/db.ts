// This file simulates a database for the purpose of this task.

export type RawArticle = {
  id: number;
  title: string;
  url: string;
  sourceName: string;
  publishedAt: Date;
  status: 'pending_review' | 'hidden' | 'published';
};

export type PublishedPost = {
  id: number;
  rawArticleId: number;
  title: string;
  url: string;
  sourceName: string;
  commentary: string;
  tag: "国内" | "海外" | "規制" | "資金調達" | "技術";
  createdAt: Date;
};

// --- In-memory "database" tables ---

let rawArticles: RawArticle[] = [];
let publishedPosts: PublishedPost[] = [];
let nextRawArticleId = 1;
let nextPublishedPostId = 1;

// --- Database access functions ---

export const getPublishedPosts = async (): Promise<PublishedPost[]> => {
  // Sort by most recent first
  return [...publishedPosts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const getPendingArticles = async (): Promise<RawArticle[]> => {
  return rawArticles.filter(a => a.status === 'pending_review');
};

export const getArticleById = async (id: number): Promise<RawArticle | undefined> => {
  return rawArticles.find(a => a.id === id);
};

export const addRawArticle = async (article: Omit<RawArticle, 'id' | 'status' | 'publishedAt'> & { publishedAt: string }) => {
  const exists = rawArticles.some(a => a.url === article.url);
  if (!exists) {
    const newArticle: RawArticle = {
      ...article,
      id: nextRawArticleId++,
      status: 'pending_review',
      publishedAt: new Date(article.publishedAt),
    };
    rawArticles.push(newArticle);
  }
};

export const updateArticleStatus = async (id: number, status: RawArticle['status']) => {
  const article = await getArticleById(id);
  if (article) {
    article.status = status;
  }
};

export const addPublishedPost = async (post: Omit<PublishedPost, 'id' | 'createdAt'>) => {
  const newPost: PublishedPost = {
    ...post,
    id: nextPublishedPostId++,
    createdAt: new Date(),
  };
  publishedPosts.push(newPost);
  await updateArticleStatus(post.rawArticleId, 'published');
};

// For seeding initial data if needed, e.g. for local development
/*
export const __seedData = () => {
  rawArticles = [
    { id: 1, title: 'Test Article 1', url: 'https://example.com/1', sourceName: 'Test Source', publishedAt: new Date(), status: 'pending_review' },
    { id: 2, title: 'Test Article 2', url: 'https://example.com/2', sourceName: 'Test Source', publishedAt: new Date(), status: 'pending_review' },
  ];
  publishedPosts = [];
  nextRawArticleId = 3;
  nextPublishedPostId = 1;
}
*/
