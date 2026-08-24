import { getEntries } from '@/lib/mdx';
import Link from 'next/link';
import { Lightbulb, ArrowLeft } from 'lucide-react';

export default function IdeasPage() {
  const entries = getEntries('ideas');

  if (entries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Ideas</h1>
            <p className="text-gray-600">No ideas yet. Create your first idea!</p>
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

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Project Ideas & Concepts</h1>

        {/* Ideas List */}
        <div className="space-y-6">
          {entries.map((entry) => (
            <Link href={`/ideas/${entry.slug}`} key={entry.slug}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Lightbulb className="text-yellow-600" size={24} />
                    <span className="text-sm text-gray-500">
                      {entry.frontmatter.date && new Date(entry.frontmatter.date).toLocaleDateString()}
                    </span>
                  </div>
                  {entry.frontmatter.tags && entry.frontmatter.tags.length > 0 && (
                    <div className="flex space-x-2">
                      {entry.frontmatter.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
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

                  <div className="bg-yellow-50 border-t-2 border-yellow-400 p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    {entry.content.substring(0, 150)}...
                  </p>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <span>View details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
