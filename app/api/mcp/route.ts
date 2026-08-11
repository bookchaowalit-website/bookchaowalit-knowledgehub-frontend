import { NextRequest, NextResponse } from 'next/server';
import { getAllEntries, getEntryBySlug, getEntries, searchEntries } from '@/lib/mdx';

export async function POST(request: NextRequest) {
  let requestId: number | string = 0;

  try {
    const body = await request.json();
    const { method, params, id } = body;
    requestId = id ?? 0;

    let result;

    switch (method) {
      case 'initialize':
        result = {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
            resources: {}
          },
          serverInfo: {
            name: 'Knowledge Hub API',
            version: '1.0.0',
            description: 'Personal documentation, diary, knowledge base, and ideas'
          }
        };
        break;

      case 'tools/list':
        result = {
          tools: [
            {
              name: 'get_entries',
              description: 'Get all entries or filter by category',
              inputSchema: {
                type: 'object',
                properties: {
                  category: {
                    type: 'string',
                    enum: ['diary', 'knowledge', 'docs', 'ideas'],
                    description: 'Filter by category'
                  },
                  limit: {
                    type: 'number',
                    description: 'Limit number of results'
                  }
                }
              }
            },
            {
              name: 'get_entry_by_slug',
              description: 'Get a specific entry by slug and category',
              inputSchema: {
                type: 'object',
                properties: {
                  category: {
                    type: 'string',
                    enum: ['diary', 'knowledge', 'docs', 'ideas'],
                    description: 'Entry category'
                  },
                  slug: {
                    type: 'string',
                    description: 'Entry slug'
                  }
                },
                required: ['category', 'slug']
              }
            },
            {
              name: 'search_entries',
              description: 'Search all entries by title, content, or tags',
              inputSchema: {
                type: 'object',
                properties: {
                  query: {
                    type: 'string',
                    description: 'Search query'
                  }
                },
                required: ['query']
              }
            },
            {
              name: 'get_categories',
              description: 'Get all available categories',
              inputSchema: {
                type: 'object',
                properties: {}
              }
            }
          ]
        };
        break;

      case 'tools/call':
        const toolName = params?.name;

        switch (toolName) {
          case 'get_entries':
            const category = params?.arguments?.category;
            const limit = params?.arguments?.limit;

            let entries = category ? getEntries(category) : getAllEntries();
            if (limit) entries = entries.slice(0, limit);

            result = entries.map(({ content, ...rest }) => rest);
            break;

          case 'get_entry_by_slug':
            const entryCategory = params?.arguments?.category;
            const slug = params?.arguments?.slug;
            const entry = getEntryBySlug(entryCategory, slug);
            result = entry || null;
            break;

          case 'search_entries':
            const query = params?.arguments?.query;
            const searchResults = await searchEntries(query);
            result = searchResults.map(({ content, ...rest }) => rest);
            break;

          case 'get_categories':
            result = ['diary', 'knowledge', 'docs', 'ideas'];
            break;

          default:
            throw new Error(`Unknown tool: ${toolName}`);
        }
        break;

      default:
        throw new Error(`Unknown method: ${method}`);
    }

    return NextResponse.json({
      jsonrpc: '2.0',
      id: requestId,
      result
    });

  } catch (error) {
    return NextResponse.json({
      jsonrpc: '2.0',
      id: requestId || 1,
      error: {
        code: -32000,
        message: error instanceof Error ? error.message : 'Unknown error',
        data: error
      }
    }, { status: 500 });
  }
}
