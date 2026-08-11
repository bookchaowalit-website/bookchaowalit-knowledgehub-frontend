import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  // /api/mcp is documented as a programmatic API for external consumers.
  // Without this, a browser-based client on another origin (e.g. a
  // DevHub-style Playground) can't read the response even though the
  // route itself works — see bookchaowalit-devhub-frontend's PRODUCT.md
  // for the CORS chain this pattern was first found fixing.
  async headers() {
    return [
      {
        source: '/api/mcp',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;
