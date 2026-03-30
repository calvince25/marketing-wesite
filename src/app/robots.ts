import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',   // All search engines (Google, Bing, DuckDuckGo, etc.)
        allow: '/',       // Allow crawling of everything
        disallow: [
          '/admin/',      // Block admin login/dashboard
          '/studio/',     // Block Sanity Studio backend
          '/api/',        // Block internal API routes
        ],
      },
    ],
    sitemap: 'https://growthlab.co.ke/sitemap.xml',
  };
}
