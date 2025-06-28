import type { NextConfig } from 'next';
import { loadEnv } from '@repo/next-scripts';

loadEnv(); // ✅ loads .env from monorepo root

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  output: 'standalone',
  assetPrefix: '/post',

  env: {
    // ✅ use process.env values loaded from monorepo root
    BACKEND_URL: process.env.BACKEND_URL,
    NEXT_PUBLIC_SERVICE_PATH_MSFEED: process.env.SERVICE_PATH_MSFEED,
    NEXT_PUBLIC_SERVICE_PATH_MSCOMMENTLIKE: process.env.SERVICE_PATH_MSCOMMENTLIKE,
    NEXT_PUBLIC_COOKIE_DOMAIN: process.env.NEXT_PUBLIC_COOKI_DOMAIN,
    // add more if needed
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/post/_next/:path+',
          destination: '/_next/:path+',
        },
      ],
    };
  },
};

export default nextConfig;
