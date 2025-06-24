import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }]
  },
  api: {
    bodyParser: false,
  },
  typescript: {
    ignoreBuildErrors: true
  }
  
};

export default nextConfig;
