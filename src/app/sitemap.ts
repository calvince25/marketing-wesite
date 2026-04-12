import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { sanitizeSlug } from '@/lib/utils';

const DOMAIN = 'https://www.growthlab.co.ke';

const FALLBACK_PILLAR_SLUGS = [
  'web-development',
  'seo-digital-marketing',
  'business-automation',
  'ai-systems-integration',
  'graphic-design',
  'social-media-management',
  'google-ads-ppc',
  'website-management',
  'email-marketing',
];

// Helper to filter out junk URLs (e.g. containing $ or &) as requested in SEO improvements
const isSafeUrl = (url: string): boolean => {
  return (
    !url.includes('$') && 
    !url.includes('&') && 
    !url.toLowerCase().includes('.ico') && 
    !url.toLowerCase().includes('.woff2')
  );
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all dynamic content simultaneously from Sanity
  const [pillars, clusters, posts, projects] = await Promise.all([
    client.fetch(groq`*[_type == "pillarPage"]{ "slug": slug.current }`),
    client.fetch(groq`*[_type == "clusterPage"]{
      "slug": slug.current,
      "pillarSlug": parentPillar->slug.current
    }`),
    client.fetch(groq`*[_type == "post"] | order(publishedAt desc) {
      "slug": slug.current,
      "publishedAt": publishedAt,
      "updatedAt": _updatedAt,
      "categorySlug": categories[0]->slug.current
    }`),
    client.fetch(groq`*[_type == "project"]{
      "slug": slug.current,
      "updatedAt": _updatedAt
    }`),
  ]).catch(() => [[], [], [], []]);

  // ─── STATIC PAGES ────────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${DOMAIN}`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${DOMAIN}/services`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/blog`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${DOMAIN}/portfolio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/about`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/contact`,   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${DOMAIN}/team`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${DOMAIN}/pricing`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/testimonials`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${DOMAIN}/faq`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${DOMAIN}/case-studies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/industries`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/company-profile`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${DOMAIN}/nairobi`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/westlands`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/kilimani`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/cbd-nairobi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/karen`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/upper-hill`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/case-studies/mell-fashion-ecommerce`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/case-studies/restaurant-pos-optimization`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ];

  // ─── PILLAR SERVICE PAGES  (e.g. /services/web-development) ──────────────────
  const pillarSlugs: string[] =
    pillars && pillars.length > 0
      ? pillars.map((p: any) => p.slug).filter(Boolean)
      : FALLBACK_PILLAR_SLUGS;

  const pillarPages: MetadataRoute.Sitemap = pillarSlugs.map((slug: string) => ({
    url: `${DOMAIN}/services/${sanitizeSlug(slug)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // ─── CLUSTER SUB-SERVICE PAGES  (e.g. /services/web-development/ecommerce-solutions) ─
  const clusterPages: MetadataRoute.Sitemap = (clusters || [])
    .filter((c: any) => c?.slug && c?.pillarSlug)
    .map((cluster: any) => ({
      url: `${DOMAIN}/services/${sanitizeSlug(cluster.pillarSlug)}/${sanitizeSlug(cluster.slug)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  // ─── BLOG POST PAGES  (e.g. /blog/seo/how-to-rank-on-google) ─────────────────
  const blogPages: MetadataRoute.Sitemap = (posts || [])
    .filter((p: any) => p?.slug)
    .map((post: any) => ({
      url: `${DOMAIN}/blog/${sanitizeSlug(post.categorySlug || 'general')}/${sanitizeSlug(post.slug)}`,
      lastModified: post.updatedAt
        ? new Date(post.updatedAt)
        : post.publishedAt
        ? new Date(post.publishedAt)
        : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

  // ─── PORTFOLIO PAGES  (e.g. /portfolio/modern-fashion-store) ─────────────────
  const portfolioPages: MetadataRoute.Sitemap = (projects || [])
    .filter((p: any) => p?.slug)
    .map((project: any) => ({
      url: `${DOMAIN}/portfolio/${sanitizeSlug(project.slug)}`,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  return [
    ...staticPages,
    ...pillarPages,
    ...clusterPages,
    ...blogPages,
    ...portfolioPages,
  ].filter(item => isSafeUrl(item.url));
}
