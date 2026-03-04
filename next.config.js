/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
      { protocol: 'https', hostname: 'cdn.shopify.com', pathname: '/s/files/**' },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.(glsl|vs|fs|vert|frag)$/, type: 'asset/source' });
    return config;
  },
  async headers() {
    return [
      { source: '/textures/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/:path*', headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ]},
    ];
  },
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { optimizePackageImports: ['three', '@react-three/fiber', '@react-three/drei'] },
};
module.exports = nextConfig;
