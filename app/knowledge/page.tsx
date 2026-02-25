import { getEntries } from '@/lib/mdx';
import Link from 'next/link';
import { Book, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function KnowledgePage() {
  const entries = getEntries('knowledge');

  if (entries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Knowledge Articles</h1>
            <p className="text-gray-600">No knowledge articles yet. Create your first article!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Knowledge Articles</h1>

        {/* Entries List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <Link href={`/knowledge/${entry.slug}`} key={entry.slug}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Book className="text-green-600" size={20} />
                    <span className="text-sm text-gray-500">
                      {entry.frontmatter.date && new Date(entry.frontmatter.date).toLocaleDateString()}
                    </span>
                  </div>
                  {entry.frontmatter.tags && entry.frontmatter.tags.length > 0 && (
                    <div className="flex space-x-1">
                      {entry.frontmatter.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2">{entry.frontmatter.title}</h2>
                {entry.frontmatter.description && (
                  <p className="text-gray-600 mb-4">{entry.frontmatter.description}</p>
                )}

                <p className="text-gray-700 line-clamp-3">
                  {entry.content.substring(0, 200)}...
                </p>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">Read more →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}