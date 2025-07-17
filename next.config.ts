
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // This is to solve a bug with handlebars and webpack
    // https://github.com/handlebars-lang/handlebars.js/issues/1174
    config.externals = [
      ...(config.externals || []),
      {
        handlebars: 'require("handlebars")',
      },
    ];
    return config;
  },
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
  allowedDevOrigins: [
      "6000-firebase-studio-1749524487777.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev"
  ]
};

export default nextConfig;

    
