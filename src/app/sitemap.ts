import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { sanitizeSlug } from '@/lib/utils';
import { pillarServices } from '@/lib/services';
import { blogPosts } from '@/lib/blog';

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
    !url.toLowerCase().includes('.woff2') &&
    !url.includes('[[') // Safety for un-replaced dynamic segments
  );
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all dynamic content simultaneously from Sanity
  const [pillars, clusters, posts, projects, categories] = await Promise.all([
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
    client.fetch(groq`*[_type == "category"]{
      "slug": slug.current
    }`),
  ]).catch(() => [[], [], [], [], []]);

  // ─── STATIC CORE PAGES ────────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${DOMAIN}`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${DOMAIN}/services`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/blog`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${DOMAIN}/portfolio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/about`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/contact`,   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
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

  // ─── PILLAR SERVICE PAGES ──────────────────────────────────────────────────
  const pillarSlugs: string[] = Array.from(new Set([
    ...(pillars?.map((p: any) => p.slug?.current || p.slug) || []),
    ...Object.keys(pillarServices),
    ...FALLBACK_PILLAR_SLUGS
  ])).filter(Boolean);

  const pillarPages: MetadataRoute.Sitemap = pillarSlugs.map((slug: string) => ({
    url: `${DOMAIN}/services/${sanitizeSlug(slug)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // ─── CLUSTER SUB-SERVICE PAGES (Static + Sanity) ──────────────────────────────────
  // Extract all static cluster paths
  const staticClusterPages: MetadataRoute.Sitemap = [];
  Object.entries(pillarServices).forEach(([pillarSlug, pillarData]) => {
    pillarData.clusters.forEach(cluster => {
      staticClusterPages.push({
        url: `${DOMAIN}/services/${sanitizeSlug(pillarSlug)}/${sanitizeSlug(cluster.slug)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  const sanityClusterPages: MetadataRoute.Sitemap = (clusters || [])
    .filter((c: any) => c?.slug && c?.pillarSlug)
    .map((cluster: any) => {
      const cSlug = cluster.slug?.current || cluster.slug;
      const pSlug = cluster.pillarSlug?.current || cluster.pillarSlug;
      return {
        url: `${DOMAIN}/services/${sanitizeSlug(pSlug)}/${sanitizeSlug(cSlug)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      };
    });

  // Combine and de-duplicate cluster pages
  const allClusterPages = Array.from(new Map([...staticClusterPages, ...sanityClusterPages].map(p => [p.url, p])).values());

  // ─── BLOG CATEGORY INDEX PAGES ───────────────────────────────────────────────
  const staticCategorySlugs = Array.from(new Set(blogPosts.map(p => p.categorySlug)));
  const sanityCategorySlugs = categories?.map((c: any) => c.slug?.current || c.slug) || [];
  
  const allCategorySlugs = Array.from(new Set([...staticCategorySlugs, ...sanityCategorySlugs])).filter(Boolean);
  
  const categoryPages: MetadataRoute.Sitemap = allCategorySlugs.map(slug => ({
    url: `${DOMAIN}/blog/${sanitizeSlug(slug)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // ─── BLOG POST PAGES ────────────────────────────────────────────────────────
  // Include static posts if Sanity results are thin
  const staticBlogPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${DOMAIN}/blog/${sanitizeSlug(post.categorySlug)}/${sanitizeSlug(post.slug)}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const sanityBlogPages: MetadataRoute.Sitemap = (posts || [])
    .filter((p: any) => p?.slug)
    .map((post: any) => {
      const postSlug = post.slug?.current || post.slug;
      const catSlug = post.categorySlug?.current || post.categorySlug || 'general';
      return {
        url: `${DOMAIN}/blog/${sanitizeSlug(catSlug)}/${sanitizeSlug(postSlug)}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : (post.publishedAt ? new Date(post.publishedAt) : new Date()),
        changeFrequency: 'weekly',
        priority: 0.7,
      };
    });

  const allBlogPages = Array.from(new Map([...staticBlogPages, ...sanityBlogPages].map(p => [p.url, p])).values());

  // ─── PORTFOLIO PAGES ────────────────────────────────────────────────────────
  const portfolioPages: MetadataRoute.Sitemap = (projects || [])
    .filter((p: any) => p?.slug)
    .map((project: any) => {
      const projectSlug = project.slug?.current || project.slug;
      return {
        url: `${DOMAIN}/portfolio/${sanitizeSlug(projectSlug)}`,
        lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      };
    });

  return [
    ...staticPages,
    ...pillarPages,
    ...allClusterPages,
    ...categoryPages,
    ...allBlogPages,
    ...portfolioPages,
  ].filter(item => isSafeUrl(item.url));
}
