import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'litra-adm.workup.spb.ru',
        pathname: '/resources/catalog/**',
      },
    ],
  },
};

export default nextConfig;
