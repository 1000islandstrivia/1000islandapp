
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // ignoreBuildErrors: true, // Removed
  },
  eslint: {
    // ignoreDuringBuilds: true, // Removed
  },
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
      }
    ],
  },
  experimental: {
    allowedDevOrigins: [
        "6000-firebase-studio-1749524487777.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev"
    ]
  }
};

export default nextConfig;
