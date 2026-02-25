import { getEntryBySlug } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';

export default async function IdeaEntryPage({ params }: { params: { slug: string } }) {
  const entry = getEntryBySlug('ideas', params.slug);

  if (!entry) {
    notFound();
  }

  const processedContent = await remark()
    .use(remarkMdx)
    .process(entry.content);

  const contentHtml = processedContent.toString();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/ideas" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} />
            <span>Back to Ideas</span>
          </Link>
        </div>

        {/* Entry Content */}
        <article className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm text-gray-500">
                {entry.frontmatter.date && new Date(entry.frontmatter.date).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{entry.frontmatter.title}</h1>

            {entry.frontmatter.description && (
              <p className="text-lg text-gray-600 mb-4">{entry.frontmatter.description}</p>
            )}

            {entry.frontmatter.tags && entry.frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {entry.frontmatter.tags.map((tag, index) => (
                  <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div
            className="prose prose-lg prose-yellow max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
      </div>
    </div>
  );
}