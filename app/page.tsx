import { getCategories, getEntries } from '@/lib/mdx';
import ArchiveHome from './home-client';

export default function HomePage() {
  const entries = getEntries().map((entry) => ({
    slug: entry.slug,
    content: entry.content,
    frontmatter: entry.frontmatter,
  }));

  return <ArchiveHome entries={entries} categories={getCategories()} />;
}
