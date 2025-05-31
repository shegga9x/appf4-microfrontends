import { NextConfig } from 'next';

import { loadEnv } from '@repo/next-scripts';
loadEnv();
// Define environment variables directly with fallbacks
const NEXT_PUBLIC_DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL;
const NEXT_PUBLIC_POST_URL = process.env.NEXT_PUBLIC_POST_URL;

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "@repo/zustand"],
  output: "standalone",

  async rewrites() {
    console.log('NEXT_PUBLIC_DOCS_URL', NEXT_PUBLIC_DOCS_URL);

    return [
      // Rewrites for Multi-Zones
      {
        source: '/docs',
        destination: `${NEXT_PUBLIC_DOCS_URL}/:path*`,
      },
      {
        source: '/docs/:path*',
        destination: `${NEXT_PUBLIC_DOCS_URL}/docs/:path*`,
      },
      {
        source: '/_next/static/:path*',
        destination: `${NEXT_PUBLIC_DOCS_URL}/_next/static/:path*`,
      },
      {
        source: '/docs-static/:path*',
        destination: `${NEXT_PUBLIC_DOCS_URL}/docs-static/:path*`,
      },
      // Rewrites for ShareSphere
      {
        source: '/post',
        destination: `${NEXT_PUBLIC_POST_URL}/:path*`,
      },
      {
        source: '/post/:path*',
        destination: `${NEXT_PUBLIC_POST_URL}/post/:path*`,
      },
      {
        source: '/sharesphere-static/:path*',
        destination: `${NEXT_PUBLIC_POST_URL}/sharesphere-static/:path*`,
      },
    ];
  },
};

export default nextConfig;
