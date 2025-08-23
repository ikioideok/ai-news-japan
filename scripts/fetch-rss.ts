import { XMLParser } from 'fast-xml-parser';
import { addRawArticle } from '../lib/db';

const RSS_FEEDS = [
  { name: 'AI Business', url: 'https://aibusiness.com/rss' },
  { name: 'MarkTechPost', url: 'https://www.marktechpost.com/feed/' },
  { name: 'MIT News', url: 'https://news.mit.edu/rss/topic/artificial-intelligence2' },
  { name: 'TechCrunch', url: 'https://techcrunch.com/tag/artificial-intelligence/feed/' },
  { name: 'Wired', url: 'https://www.wired.com/feed/tag/artificial-intelligence/latest/rss' },
];

const parser = new XMLParser({
  attributeNamePrefix: "",
  ignoreAttributes: false,
  parseAttributeValue: true,
});

async function fetchAndParse(feed: { name: string; url: string }) {
  try {
    console.log(`Fetching ${feed.name}...`);
    const response = await fetch(feed.url);
    if (!response.ok) {
      console.error(`Failed to fetch ${feed.url}: ${response.statusText}`);
      return;
    }
    const xmlText = await response.text();
    const result = parser.parse(xmlText);

    // RSS feeds can have items under rss.channel.item or feed.entry
    const items = result.rss?.channel?.item || result.feed?.entry || [];

    for (const item of items) {
      const article = {
        title: item.title,
        url: item.link.href || item.link,
        publishedAt: item.pubDate || item.published || item.updated,
        sourceName: feed.name,
      };

      if (article.title && article.url && article.publishedAt) {
        await addRawArticle(article);
      } else {
        console.warn('Skipping item with missing data:', item);
      }
    }
    console.log(`Successfully processed ${items.length} items from ${feed.name}.`);
  } catch (error) {
    console.error(`Error processing feed ${feed.name}:`, error);
  }
}

async function main() {
  console.log('Starting RSS fetch...');
  for (const feed of RSS_FEEDS) {
    await fetchAndParse(feed);
  }
  console.log('RSS fetch complete.');
}

main();
