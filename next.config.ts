import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {},
  eslint: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // ✅ Add this function to allow headers for dev origins
  async headers() {
    return [
      {
        source: '/(.*)', // apply to all routes
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://6000-firebase-studio-1749524487777.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
