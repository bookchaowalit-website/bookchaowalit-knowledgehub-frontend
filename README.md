# Knowledge Hub Next.js

A personal knowledge management system built with Next.js, MDX, and Tailwind CSS. This hub helps organize thoughts, knowledge, and ideas across different categories.

## Features

- **Content Organization**: Categorized content (Diary, Knowledge, Docs, Ideas)
- **MDX Support**: Write content with Markdown and JSX components
- **Search Functionality**: Search across all entries
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **MCP API**: RESTful API for accessing content programmatically
- **Static Generation**: Fast loading with Next.js static site generation

## Project Structure

```
├── app/                          # Next.js app router pages
│   ├── api/mcp/                 # MCP API endpoints
│   ├── page.tsx                 # Homepage
│   ├── diary/                   # Diary section
│   ├── knowledge/               # Knowledge articles
│   ├── docs/                    # Documentation
│   └── ideas/                   # Project ideas
├── content/                     # MDX content files
│   ├── diary/                   # Diary entries (.mdx)
│   ├── knowledge/               # Knowledge articles (.mdx)
│   ├── docs/                    # Documentation (.mdx)
│   └── ideas/                   # Ideas (.mdx)
├── lib/                         # Utility functions
│   └── mdx.ts                   # MDX processing utilities
└── next.config.ts               # Next.js configuration
```

## Content Management

### Adding New Content

1. Create a new MDX file in the appropriate category folder
2. Add frontmatter metadata
3. Write your content using Markdown and JSX

Example frontmatter:
```yaml
---
title: My New Article
description: A brief description
date: 2026-02-22
tags: [tag1, tag2, category]
---
```

### Categories

- **Diary**: Personal thoughts and experiences
- **Knowledge**: Technical learnings and tutorials
- **Docs**: Guides and reference materials
- **Ideas**: Project concepts and brainstorming

## API Endpoints

### MCP API

- `GET /api/mcp` - Get API info
- `POST /api/mcp` - Access MCP tools

#### Available Methods

1. **get_entries**
   - Get entries with optional category filter
   - Parameters: `category` (optional)

2. **get_entry_by_slug**
   - Get specific entry by category and slug
   - Parameters: `category`, `slug`

3. **search_entries**
   - Search all entries by query
   - Parameters: `query`

4. **get_categories**
   - Get all available categories

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd bookchaowalit-knowledgehub-frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

### Build for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Development

### Adding New Categories

1. Create a new directory in `content/`
2. Create corresponding page files in `app/[category]/`
3. Update the `lib/mdx.ts` if needed

### Custom Styling

- Tailwind CSS classes are used throughout
- Custom styles can be added in global CSS or component-specific styles

## Deployment

### Vercel (Recommended)

1. Push your code to a Git repository
2. Connect to Vercel
3. Deploy automatically

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

- **Netlify**: Works with static export
- **GitHub Pages**: Requires static export configuration
- **Docker**: Can be containerized with Node.js

## Environment Variables

No environment variables are required for basic functionality.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **MDX** - Markdown with JSX support
- **Gray Matter** - Frontmatter parsing
- **Lucide React** - Icon library
- **Remark** - Markdown processing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is private and intended for personal use.

## Related

- **Mobile App:** [bookchaowalit-knowledgehub-mobile](https://github.com/bookchaowalit-mobile/bookchaowalit-knowledgehub-mobile)
- **Portfolio:** [bookchaowalit.com](https://bookchaowalit.com)

