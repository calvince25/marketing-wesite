/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/lib/db';

export const client = {
  fetch: async <QueryResponse = any>(query: string, params: Record<string, unknown> = {}): Promise<QueryResponse> => {
    // Clean and normalize query
    const q = query.replace(/\s+/g, ' ');

    try {
      // 1. siteSettings
      if (q.includes('_type == "siteSettings"') || q.includes("_type == 'siteSettings'")) {
        const settings = db.read('siteSettings');
        return settings as unknown as QueryResponse;
      }

      // 2. allServicesQuery
      if (q.includes('_type == "service"') && q.includes('order(name asc)')) {
        const services = db.read('services');
        return services as unknown as QueryResponse;
      }

      // 3. serviceBySlugQuery
      if (q.includes('_type == "service"') && q.includes('slug.current == $slug')) {
        const slug = params.slug;
        const service = db.findOne('services', (s: any) => (s.slug?.current || s.slug) === slug);
        return service as unknown as QueryResponse;
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
        const projects = db.read('projects')
          .sort((a: any, b: any) => new Date(b.completionDate || b.createdAt).getTime() - new Date(a.completionDate || a.createdAt).getTime());
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
        return service as unknown as QueryResponse;
      }

      // 10. clusterBySlugQuery
      if (q.includes('_type == "clusterPage"') && q.includes('slug.current == $slug')) {
        const slug = params.slug;
        const services = db.read('services');
        for (const s of services) {
          const cluster = s.clusters?.find((c: any) => c.slug === slug);
          if (cluster) {
            return {
              ...cluster,
              parentPillar: { slug: { current: s.slug }, title: s.title || s.name }
            } as unknown as QueryResponse;
          }
        }
        return null as unknown as QueryResponse;
      }

      // Default fallback
      return [] as unknown as QueryResponse;
    } catch (err) {
      console.error('Error fetching mock database:', err);
      return [] as unknown as QueryResponse;
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
