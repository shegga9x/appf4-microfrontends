import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // transpilePackages: ["@repo/ui"],
  output: "standalone",
  assetPrefix: '/docs',
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/docs/_next/:path+',
          destination: '/_next/:path+',
        },
      ],
    }
  },
};

export default nextConfig;
