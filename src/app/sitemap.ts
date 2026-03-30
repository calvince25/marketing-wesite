import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = 'https://growthlab.co.ke';

  // Fetch all slugs dynamically from Sanity
  const [pillars, clusters, posts, projects, services] = await Promise.all([
    client.fetch(groq`*[_type == "pillarPage"]{ "slug": slug.current }`),
    client.fetch(groq`*[_type == "clusterPage"]{ "slug": slug.current, "pillarSlug": parentPillar->slug.current }`),
    client.fetch(groq`*[_type == "post"]{ "slug": slug.current, "publishedAt": publishedAt }`),
    client.fetch(groq`*[_type == "project"]{ "slug": slug.current }`),
    client.fetch(groq`*[_type == "service"]{ "slug": slug.current }`)
  ]).catch(() => [[], [], [], [], []]);

  const sitemapEntries: MetadataRoute.Sitemap = [
    { url: `${domain}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${domain}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${domain}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: `${domain}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${domain}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${domain}/portfolio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  // Map Legacy Services
  services?.forEach((service: any) => {
    if (service?.slug) {
      sitemapEntries.push({
        url: `${domain}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  });

  // Map Pillar Pages (e.g. /services/web-development)
  pillars?.forEach((pillar: any) => {
    if (pillar?.slug) {
      sitemapEntries.push({
        url: `${domain}/services/${pillar.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  });

  // Map Cluster Sub-Services (e.g. /services/web-development/ecommerce)
  clusters?.forEach((cluster: any) => {
    if (cluster?.slug && cluster?.pillarSlug) {
      sitemapEntries.push({
        url: `${domain}/services/${cluster.pillarSlug}/${cluster.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  });

  // Map Blog Posts
  posts?.forEach((post: any) => {
    if (post?.slug) {
      sitemapEntries.push({
        url: `${domain}/blog/${post.slug}`,
        lastModified: post?.publishedAt ? new Date(post.publishedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  });

  // Map Projects
  projects?.forEach((project: any) => {
    if (project?.slug) {
      sitemapEntries.push({
        url: `${domain}/portfolio/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  });

  return sitemapEntries;
}
