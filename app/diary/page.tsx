import { getEntries } from '@/lib/mdx';
import Link from 'next/link';
import { Calendar, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function DiaryPage() {
  const entries = getEntries('diary');

  if (entries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Diary Entries</h1>
            <p className="text-gray-600">No diary entries yet. Create your first entry!</p>
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

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Diary Entries</h1>

        {/* Entries List */}
        <div className="space-y-6">
          {entries.map((entry) => (
            <Link href={`/diary/${entry.slug}`} key={entry.slug}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="text-blue-600" size={20} />
                    <span className="text-sm text-gray-500">
                      {entry.frontmatter.date && new Date(entry.frontmatter.date).toLocaleDateString()}
                    </span>
                  </div>
                  {entry.frontmatter.tags && entry.frontmatter.tags.length > 0 && (
                    <div className="flex space-x-2">
                      {entry.frontmatter.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}