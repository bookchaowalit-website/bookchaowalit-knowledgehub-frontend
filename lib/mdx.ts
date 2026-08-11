import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Frontmatter {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  category?: string;
}

interface Entry {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}

const contentDirectory = path.join(process.cwd(), 'content');

export function getEntries(category?: string): Entry[] {
  const entries: Entry[] = [];

  if (category) {
    const categoryPath = path.join(contentDirectory, category);
    if (!fs.existsSync(categoryPath)) return entries;

    const files = fs.readdirSync(categoryPath);
    files.forEach((file) => {
      if (file.endsWith('.mdx')) {
        const slug = file.replace('.mdx', '');
        const fullPath = path.join(categoryPath, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { content, data } = matter(fileContents);

        entries.push({
          slug,
          frontmatter: data as Frontmatter,
          content
        });
      }
    });
  } else {
    const categories = ['diary', 'knowledge', 'docs', 'ideas'];
    categories.forEach((cat) => {
      const categoryPath = path.join(contentDirectory, cat);
      if (!fs.existsSync(categoryPath)) return;

      const files = fs.readdirSync(categoryPath);
      files.forEach((file) => {
        if (file.endsWith('.mdx')) {
          const slug = file.replace('.mdx', '');
          const fullPath = path.join(categoryPath, file);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { content, data } = matter(fileContents);

          entries.push({
            slug,
            frontmatter: data as Frontmatter,
            content
          });
        }
      });
    });
  }

  return entries.sort((a, b) => {
    if (a.frontmatter.date && b.frontmatter.date) {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    }
    return 0;
  });
}

export function getEntryBySlug(category: string, slug: string): Entry | null {
  const fullPath = path.join(contentDirectory, category, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(fileContents);

  return {
    slug,
    frontmatter: data as Frontmatter,
    content
  };
}

export function getAllEntries(): Entry[] {
  return getEntries();
}

export async function searchEntries(query: string): Promise<Entry[]> {
  const allEntries = getAllEntries();
  const results: Entry[] = [];
  const lowercaseQuery = query.toLowerCase();

  for (const entry of allEntries) {
    if (entry.frontmatter.title.toLowerCase().includes(lowercaseQuery) ||
        entry.frontmatter.description?.toLowerCase().includes(lowercaseQuery) ||
        entry.content.toLowerCase().includes(lowercaseQuery) ||
        entry.frontmatter.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))) {
      results.push(entry);
    }
  }

  return results;
}

export function getCategories(): string[] {
  const categories = ['diary', 'knowledge', 'docs', 'ideas'];
  return categories.filter(cat => fs.existsSync(path.join(contentDirectory, cat)));
}