"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Entry = {
  slug: string;
  content: string;
  frontmatter: {
    title: string;
    description?: string;
    date?: string;
    tags?: string[];
    category?: string;
  };
};

const shelfDetails: Record<string, { label: string; note: string; mark: string }> = {
  diary: { label: 'Diary', note: 'observations & working notes', mark: 'D' },
  knowledge: { label: 'Knowledge', note: 'technical patterns worth keeping', mark: 'K' },
  docs: { label: 'Docs', note: 'reference for future work', mark: 'R' },
  ideas: { label: 'Ideas', note: 'seeds before they become projects', mark: 'I' },
};

function formatDate(value?: string) {
  if (!value) return 'undated';
  return new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function ArchiveHome({ entries, categories }: { entries: Entry[]; categories: string[] }) {
  const [query, setQuery] = useState('');
  const [activeShelf, setActiveShelf] = useState('all');
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const shelf = entry.frontmatter.category || 'diary';
      const matchesShelf = activeShelf === 'all' || shelf === activeShelf;
      const haystack = `${entry.frontmatter.title} ${entry.frontmatter.description || ''} ${entry.content} ${(entry.frontmatter.tags || []).join(' ')}`.toLowerCase();
      return matchesShelf && (!needle || haystack.includes(needle));
    });
  }, [activeShelf, entries, query]);

  return (
    <main className="archive-shell">
      <nav className="archive-nav" aria-label="Primary">
        <Link className="archive-mark" href="/">BOOK / INDEX</Link>
        <div className="archive-nav-links">
          <span>private archive</span>
          <span>{String(entries.length).padStart(2, '0')} records</span>
        </div>
      </nav>

      <section className="archive-hero">
        <div>
          <p className="eyebrow">A local reading room · edition 01</p>
          <h1>Things worth<br /><em>finding again.</em></h1>
          <p className="archive-intro">A personal index for thoughts, technical notes, decisions, and the ideas that are still looking for their shape.</p>
        </div>
        <div className="archive-ledger" aria-label="Archive summary">
          <div className="ledger-rule" />
          <p className="eyebrow">The collection</p>
          <strong>{String(filtered.length).padStart(2, '0')}</strong>
          <span>records in view</span>
          <p className="ledger-foot">MDX / repository source<br />No hosted CMS · no invented activity</p>
        </div>
      </section>

      <section className="shelf-strip" aria-label="Browse shelves">
        <button className={activeShelf === 'all' ? 'shelf-tab active' : 'shelf-tab'} onClick={() => setActiveShelf('all')}>
          <span className="shelf-mark">00</span><span>All shelves</span><small>{entries.length}</small>
        </button>
        {categories.map((category) => {
          const detail = shelfDetails[category] || { label: category, note: 'filed in the archive', mark: category.slice(0, 1).toUpperCase() };
          const count = entries.filter((entry) => (entry.frontmatter.category || 'diary') === category).length;
          return (
            <button key={category} className={activeShelf === category ? 'shelf-tab active' : 'shelf-tab'} onClick={() => setActiveShelf(category)}>
              <span className="shelf-mark">{detail.mark}</span><span>{detail.label}</span><small>{count}</small>
            </button>
          );
        })}
      </section>

      <section className="archive-toolbar">
        <label className="search-field">
          <span>⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the index" aria-label="Search the archive" />
        </label>
        <span className="toolbar-status">{query || activeShelf !== 'all' ? 'filtered view' : 'latest filing first'} · {filtered.length} shown</span>
      </section>

      <section className="entry-index" aria-label="Archive entries">
        <div className="index-heading"><span>file</span><span>title / description</span><span>date</span><span>open</span></div>
        {filtered.map((entry, index) => {
          const category = entry.frontmatter.category || 'diary';
          const detail = shelfDetails[category] || { label: category, note: 'filed in the archive', mark: category.slice(0, 1).toUpperCase() };
          return (
            <Link className="entry-row" href={`/${category}/${entry.slug}`} key={`${category}-${entry.slug}`}>
              <span className="entry-file">{String(index + 1).padStart(2, '0')} <b>{detail.mark}</b></span>
              <span className="entry-copy"><strong>{entry.frontmatter.title}</strong><small>{entry.frontmatter.description || entry.content.replace(/[#*_\n]/g, ' ').trim().slice(0, 120)}</small><i>{detail.label} · {(entry.frontmatter.tags || []).slice(0, 2).join(' / ')}</i></span>
              <time>{formatDate(entry.frontmatter.date)}</time>
              <span className="entry-arrow" aria-hidden="true">↗</span>
            </Link>
          );
        })}
        {filtered.length === 0 && <div className="empty-shelf">Nothing filed under this search yet.</div>}
      </section>

      <footer className="archive-footer"><span>BOOK / KNOWLEDGE HUB</span><span>Read slowly. Keep what matters.</span></footer>
    </main>
  );
}
