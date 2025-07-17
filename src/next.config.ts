
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // ignoreBuildErrors: true, // Removed
  },
  eslint: {
    // ignoreDuringBuilds: true, // Removed
  },
  // Add a watchOptions configuration to ignore the /src/ai/ directory
  // This will prevent the Genkit file watcher from causing the Next.js server to restart
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
            ...((config.watchOptions.ignored as string[]) || []),
            '**/src/ai/**'
        ],
      };
    }
    return config;
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
    // allowedDevOrigins is now a top-level property
  },
  // allowedDevOrigins is now a top-level property
  allowedDevOrigins: [
      "6000-firebase-studio-1749524487777.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev"
  ]
};

export default nextConfig;
