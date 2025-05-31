import { NextConfig } from 'next';



const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // transpilePackages: ["@repo/ui", "@repo/zustand"],
  output: "standalone",
  assetPrefix: '/post',
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/post/_next/:path+',
          destination: '/_next/:path+',
        },
      ],
    }
  },
};
export default nextConfig;
