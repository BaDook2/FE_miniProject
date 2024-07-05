/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    const newConfig = {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
        },
      },
    };

    if (isServer) {
      if (Array.isArray(newConfig.resolve.alias)) {
        newConfig.resolve.alias.push({ name: 'msw/browser', alias: false });
      } else {
        newConfig.resolve.alias['msw/browser'] = false;
      }
    } else if (Array.isArray(newConfig.resolve.alias)) {
      newConfig.resolve.alias.push({ name: 'msw/node', alias: false });
    } else {
      newConfig.resolve.alias['msw/node'] = false;
    }
    return newConfig;
  },
  images: {
    domains: ['tong.visitkorea.or.kr'],
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'yaimg.yanolja.com',
      },
      {
        protocol: 'http',
        hostname: 'tong.visitkorea.or.kr',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
    unoptimized: true, // vercel 이미지 최적화 사용 안함
    images: ['image/avif', 'image/webp'], // image 포맷 avif사용, 용량 줄이기
  },
};

export default nextConfig;
