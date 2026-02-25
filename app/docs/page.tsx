import { getEntries } from '@/lib/mdx';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function DocsPage() {
  const entries = getEntries('docs');

  if (entries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Documentation</h1>
            <p className="text-gray-600">No documentation yet. Create your first document!</p>
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

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Documentation</h1>

        {/* Entries Grid */}
        <div className="space-y-6">
          {entries.map((entry) => (
            <Link href={`/docs/${entry.slug}`} key={entry.slug}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="text-purple-600" size={24} />
                    <span className="text-sm text-gray-500">
                      {entry.frontmatter.date && new Date(entry.frontmatter.date).toLocaleDateString()}
                    </span>
                  </div>
                  {entry.frontmatter.tags && entry.frontmatter.tags.length > 0 && (
                    <div className="flex space-x-2">
                      {entry.frontmatter.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 mb-3">{entry.frontmatter.title}</h2>
                {entry.frontmatter.description && (
                  <p className="text-gray-600 mb-4">{entry.frontmatter.description}</p>
                )}

                <div className="flex items-center justify-between">
                  <p className="text-gray-700">
                    {entry.content.substring(0, 300)}...
                  </p>
                  <span className="text-blue-600 font-medium ml-4">Read more →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}