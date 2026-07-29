/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/lib/db';

const normalizeSlug = (slug: any) => {
  if (typeof slug === 'string') {
    return { current: slug };
  }
  if (slug && typeof slug === 'object') {
    return slug;
  }
  return { current: '' };
};

const normalizeService = (s: any) => {
  if (!s) return s;
  return {
    ...s,
    slug: normalizeSlug(s.slug),
    clusters: Array.isArray(s.clusters)
      ? s.clusters.map((c: any) => ({
          ...c,
          slug: normalizeSlug(c.slug)
        }))
      : []
  };
};

export const client = {
  fetch: async <QueryResponse = any>(query: string, params: Record<string, unknown> = {}): Promise<QueryResponse> => {
    // Clean and normalize query
    const q = query.replace(/\s+/g, ' ');

    try {
      // Warm up cache from Vercel KV in serverless/production
      const tablesToLoad = ['siteSettings', 'services', 'posts', 'faqs', 'projects', 'heroImages'];
      await Promise.all(tablesToLoad.map(t => db.loadTable(t)));

      // 1. siteSettings
      if (q.includes('_type == "siteSettings"') || q.includes("_type == 'siteSettings'")) {
        const settings = db.read('siteSettings');
        return settings as unknown as QueryResponse;
      }

      // 1.5. heroImages query
      if (q.includes('_type == "heroImage"')) {
        const page = params.page;
        const heroImages = db.read('heroImages');
        if (page) {
          const hero = heroImages.find((h: any) => h.page === page);
          return (hero || null) as unknown as QueryResponse;
        }
        return heroImages as unknown as QueryResponse;
      }

      // 2. allServicesQuery
      if (q.includes('_type == "service"') && q.includes('order(name asc)')) {
        const services = db.read('services');
        return services.map(normalizeService) as unknown as QueryResponse;
      }

      // 3. serviceBySlugQuery
      if (q.includes('_type == "service"') && q.includes('slug.current == $slug')) {
        const slug = params.slug;
        const service = db.findOne('services', (s: any) => (s.slug?.current || s.slug) === slug);
        return normalizeService(service) as unknown as QueryResponse;
      }

      // 4. allPostsByCategoryQuery
      if (q.includes('_type == "post"') && q.includes('references(')) {
        const categorySlug = params.category;
        const posts = db.read('posts')
          .filter((p: any) => p.categorySlug === categorySlug && p.status === 'published')
          .sort((a: any, b: any) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
        return posts as unknown as QueryResponse;
      }

      // 5. postBySlugQuery
      if (q.includes('_type == "post"') && q.includes('slug.current == $slug')) {
        const slug = params.slug;
        const post = db.findOne('posts', (p: any) => (p.slug?.current || p.slug) === slug);
        return post as unknown as QueryResponse;
      }

      // 6. allPostsQuery
      if (q.includes('_type == "post"')) {
        const posts = db.read('posts')
          .filter((p: any) => p.status === 'published')
          .sort((a: any, b: any) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
        return posts as unknown as QueryResponse;
      }

      // 7. allProjectsQuery
      if (q.includes('_type == "project"')) {
        const { getProjects } = require('@/lib/supabase');
        const projects = await getProjects();
        projects.sort((a: any, b: any) => new Date(b.completionDate || b.createdAt).getTime() - new Date(a.completionDate || a.createdAt).getTime());
        return projects as unknown as QueryResponse;
      }

      // 8. pageContentQuery
      if (q.includes('_type == "pageContent"')) {
        const page = params.page;
        const content = db.findOne('pageContent', (p: any) => p.page === page);
        if (content) return content as unknown as QueryResponse;

        // Fallback default structure for Home
        if (page === 'Home') {
          return {
            page: 'Home',
            sections: [
              { title: 'About GrowthLab Limited', content: 'GrowthLab is a premier digital agency specializing in crafting high-end digital experiences using data-driven marketing and monochromatic aesthetics. We partner with ambitious brands to accelerate their growth.' }
            ]
          } as unknown as QueryResponse;
        }
        return null as unknown as QueryResponse;
      }

      // 9. pillarBySlugQuery
      if (q.includes('_type == "pillarPage"') && q.includes('slug.current == $slug')) {
        const slug = params.slug;
        const service = db.findOne('services', (s: any) => (s.slug?.current || s.slug) === slug);
        return normalizeService(service) as unknown as QueryResponse;
      }

      // 10. clusterBySlugQuery
      if (q.includes('_type == "clusterPage"') && q.includes('slug.current == $slug')) {
        const slug = params.slug;
        const services = db.read('services');
        for (const s of services) {
          const cluster = s.clusters?.find((c: any) => (c.slug?.current || c.slug) === slug);
          if (cluster) {
            return {
              ...cluster,
              slug: normalizeSlug(cluster.slug),
              parentPillar: { slug: normalizeSlug(s.slug), title: s.title || s.name }
            } as unknown as QueryResponse;
          }
        }
        return null as unknown as QueryResponse;
      }

      // 11. allFaqsQuery
      if (q.includes('_type == "faq"')) {
        const faqs = db.read('faqs');
        faqs.sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));
        return faqs as unknown as QueryResponse;
      }

      // 12. pillarPage list of slugs
      if (q.includes('_type == "pillarPage"') && q.includes('slug.current') && !q.includes('== $slug')) {
        const services = db.read('services');
        return services.map((s: any) => s.slug?.current || s.slug) as unknown as QueryResponse;
      }

      // 13. service list of slugs
      if (q.includes('_type == "service"') && q.includes('slug.current') && !q.includes('== $slug')) {
        const services = db.read('services');
        return services.map((s: any) => s.slug?.current || s.slug) as unknown as QueryResponse;
      }

      // 14. clusterPage list of slugs and parent pillars
      if (q.includes('_type == "clusterPage"') && !q.includes('== $slug')) {
        const services = db.read('services');
        const clustersList: any[] = [];
        services.forEach((s: any) => {
          if (Array.isArray(s.clusters)) {
            s.clusters.forEach((c: any) => {
              clustersList.push({
                pillarSlug: s.slug?.current || s.slug,
                clusterSlug: c.slug
              });
            });
          }
        });
        return clustersList as unknown as QueryResponse;
      }

      // Default fallback
      const isSingleObject = q.includes('[0]') || q.endsWith('[0]');
      return (isSingleObject ? null : []) as unknown as QueryResponse;
    } catch (err) {
      console.error('Error fetching mock database:', err);
      const isSingleObject = q.includes('[0]') || q.endsWith('[0]');
      return (isSingleObject ? null : []) as unknown as QueryResponse;
    }
  }
};

export async function sanityFetch<QueryResponse = any>({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, unknown>;
  revalidate?: number | false;
  tags?: string[];
}) {
  return client.fetch<QueryResponse>(query, params);
}
