import { getEntries, getCategories } from '@/lib/mdx';
import Link from 'next/link';
import { Calendar, Book, FileText, Lightbulb, Search } from 'lucide-react';

export default function HomePage() {
  const categories = getCategories();
  const recentEntries = getEntries().slice(0, 6);

  const categoryInfo = {
    diary: { icon: Calendar, name: 'Diary', color: 'text-blue-600', description: 'Personal thoughts and experiences' },
    knowledge: { icon: Book, name: 'Knowledge', color: 'text-green-600', description: 'Technical learnings and tutorials' },
    docs: { icon: FileText, name: 'Documentation', color: 'text-purple-600', description: 'Guides and reference materials' },
    ideas: { icon: Lightbulb, name: 'Ideas', color: 'text-yellow-600', description: 'Project concepts and brainstorming' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Knowledge Hub</h1>
          <p className="text-xl text-gray-600 mb-8">A personal space for thoughts, knowledge, and ideas</p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search entries..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </header>

        {/* Category Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const info = categoryInfo[category as keyof typeof categoryInfo];
              const Icon = info.icon;
              const entries = getEntries(category);

              return (
                <Link href={`/${category}`} key={category}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Icon className={info.color} size={24} />
                      <h3 className="text-lg font-semibold">{info.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{info.description}</p>
                    <div className="text-sm text-gray-500">
                      {entries.length} entries
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recent Entries */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Entries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentEntries.map((entry) => {
              const category = entry.frontmatter.category || 'diary';
              const info = categoryInfo[category as keyof typeof categoryInfo];
              const Icon = info.icon;

              return (
                <Link href={`/${category}/${entry.slug}`} key={`${category}-${entry.slug}`}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Icon className={info.color} size={16} />
                        <span className="text-sm text-gray-500 capitalize">{category}</span>
                      </div>
                      {entry.frontmatter.date && (
                        <span className="text-xs text-gray-400">
                          {new Date(entry.frontmatter.date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{entry.frontmatter.title}</h3>
                    {entry.frontmatter.description && (
                      <p className="text-gray-600 text-sm mb-4">{entry.frontmatter.description}</p>
                    )}
                    <div className="text-sm text-gray-600 line-clamp-3">
                      {entry.content.substring(0, 150)}...
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Start Exploring</h2>
            <p className="text-gray-600 mb-6">
              Navigate through different categories to discover thoughts, knowledge, and ideas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const info = categoryInfo[category as keyof typeof categoryInfo];
                return (
                  <Link href={`/${category}`} key={category}>
                    <button className="border border-gray-300 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-50 transition-colors">
                      <info.icon size={16} />
                      <span>{info.name}</span>
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
