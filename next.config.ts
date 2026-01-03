

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '').replace('/','') || '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
