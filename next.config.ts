import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/team',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/testimonials',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/blog.html',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/seo-services.html',
        destination: '/services/seo-digital-marketing',
        permanent: true,
      },
      {
        source: '/website-development.html',
        destination: '/services/web-development',
        permanent: true,
      },
      {
        source: '/ai-systems-integration.html',
        destination: '/services/ai-systems-integration',
        permanent: true,
      },
      {
        source: '/blog/the-future-of-ai-in-marketing',
        destination: '/blog/ai-marketing/the-future-of-ai-in-marketing',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://images.unsplash.com https://*.supabase.co; font-src 'self' data:; connect-src 'self' https://*.supabase.co; frame-ancestors 'self';",
          },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default nextConfig;
