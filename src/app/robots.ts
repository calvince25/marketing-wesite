import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/studio/'],
    },
    sitemap: 'https://growthlab.co.ke/sitemap.xml',
  };
}
