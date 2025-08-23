import fs from "fs/promises";
import path from "path";

// Define types
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
  url:string;
  sourceName: string;
  commentary: string;
  tag: "国内" | "海外" | "規制" | "資金調達" | "技術";
  createdAt: Date;
};

// Define file paths
const DATA_DIR = path.join(process.cwd(), ".data");
const RAW_ARTICLES_PATH = path.join(DATA_DIR, "raw_articles.json");
const PUBLISHED_POSTS_PATH = path.join(DATA_DIR, "published_posts.json");

// Helper function to read data from a file
async function readData<T>(filePath: string): Promise<T[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(filePath, "utf-8");
    // Dates are stored as ISO strings, so we need to parse them back to Date objects
    return JSON.parse(data, (key, value) => {
      if (key === 'publishedAt' || key === 'createdAt') {
        return new Date(value);
      }
      return value;
    });
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return []; // File does not exist, return empty array
    }
    throw error;
  }
}

// Helper function to write data to a file
async function writeData<T>(filePath: string, data: T[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// --- Database access functions ---

export const getPublishedPosts = async (): Promise<PublishedPost[]> => {
  const posts = await readData<PublishedPost>(PUBLISHED_POSTS_PATH);
  return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const getPendingArticles = async (): Promise<RawArticle[]> => {
  const articles = await readData<RawArticle>(RAW_ARTICLES_PATH);
  return articles.filter(a => a.status === 'pending_review');
};

export const getArticleById = async (id: number): Promise<RawArticle | undefined> => {
  const articles = await readData<RawArticle>(RAW_ARTICLES_PATH);
  return articles.find(a => a.id === id);
};

export const addRawArticle = async (article: Omit<RawArticle, 'id' | 'status' | 'publishedAt'> & { publishedAt: string }) => {
  const articles = await readData<RawArticle>(RAW_ARTICLES_PATH);
  const exists = articles.some(a => a.url === article.url);

  if (!exists) {
    const nextId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
    const newArticle: RawArticle = {
      ...article,
      id: nextId,
      status: 'pending_review',
      publishedAt: new Date(article.publishedAt),
    };
    articles.push(newArticle);
    await writeData(RAW_ARTICLES_PATH, articles);
  }
};

export const updateArticleStatus = async (id: number, status: RawArticle['status']) => {
  const articles = await readData<RawArticle>(RAW_ARTICLES_PATH);
  const articleIndex = articles.findIndex(a => a.id === id);
  if (articleIndex !== -1) {
    articles[articleIndex].status = status;
    await writeData(RAW_ARTICLES_PATH, articles);
  }
};

export const addPublishedPost = async (post: Omit<PublishedPost, 'id' | 'createdAt'>) => {
  const posts = await readData<PublishedPost>(PUBLISHED_POSTS_PATH);
  const nextId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;

  const newPost: PublishedPost = {
    ...post,
    id: nextId,
    createdAt: new Date(),
  };
  posts.push(newPost);
  await writeData(PUBLISHED_POSTS_PATH, posts);
  await updateArticleStatus(post.rawArticleId, 'published');
};
