import { NextConfig } from 'next';



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

};

export default nextConfig;
