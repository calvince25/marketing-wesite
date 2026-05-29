import fs from 'fs';
import path from 'path';
import { db } from './db';

const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');
const ROBOTS_PATH = path.join(process.cwd(), 'public', 'robots.txt');
const DOMAIN = 'https://www.growthlab.co.ke';

export function regenerateSitemapAndRobots() {
  try {
    console.log('Regenerating sitemap.xml and robots.txt...');

    // 1. Gather URLs
    const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

    // Static pages
    const currentDate = new Date().toISOString().split('T')[0];
    const staticPages = [
      { loc: '', changefreq: 'daily', priority: '1.0' },
      { loc: '/about', changefreq: 'monthly', priority: '0.8' },
      { loc: '/blog', changefreq: 'daily', priority: '0.8' },
      { loc: '/portfolio', changefreq: 'weekly', priority: '0.8' },
      { loc: '/pricing', changefreq: 'weekly', priority: '0.8' },
      { loc: '/testimonials', changefreq: 'monthly', priority: '0.7' },
      { loc: '/contact', changefreq: 'monthly', priority: '0.8' }
    ];

    staticPages.forEach(p => {
      urls.push({
        loc: `${DOMAIN}${p.loc}`,
        lastmod: currentDate,
        changefreq: p.changefreq,
        priority: p.priority
      });
    });

    // Blog Categories
    const categories = db.read('categories');
    categories.forEach(c => {
      urls.push({
        loc: `${DOMAIN}/blog/${c.slug}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.6'
      });
    });

    // Blog Posts
    const posts = db.read('posts').filter((p: any) => p.status === 'published');
    posts.forEach(p => {
      const slug = p.slug?.current || p.slug;
      const catSlug = p.categorySlug || 'general';
      urls.push({
        loc: `${DOMAIN}/blog/${catSlug}/${slug}`,
        lastmod: (p.updatedAt || p.publishedAt || currentDate).split('T')[0],
        changefreq: 'weekly',
        priority: '0.7'
      });
    });

    // Services (Pillars & Clusters)
    const services = db.read('services');
    services.forEach(s => {
      const pillarSlug = s.slug?.current || s.slug;
      urls.push({
        loc: `${DOMAIN}/services/${pillarSlug}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.8'
      });

      // Clusters
      if (s.clusters && Array.isArray(s.clusters)) {
        s.clusters.forEach((c: any) => {
          urls.push({
            loc: `${DOMAIN}/services/${pillarSlug}/${c.slug}`,
            lastmod: currentDate,
            changefreq: 'weekly',
            priority: '0.7'
          });
        });
      }
    });

    // Projects / Portfolio Case Studies
    const projects = db.read('projects').filter((p: any) => !p.isPrivate);
    projects.forEach(p => {
      const slug = p.slug?.current || p.slug;
      urls.push({
        loc: `${DOMAIN}/portfolio/${slug}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.6'
      });
    });

    // 2. Generate Sitemap XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    urls.forEach(u => {
      xml += `  <url>\n`;
      xml += `    <loc>${u.loc}</loc>\n`;
      xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
      xml += `    <priority>${u.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    // Write Sitemap
    fs.writeFileSync(SITEMAP_PATH, xml, 'utf-8');
    console.log('sitemap.xml updated successfully at', SITEMAP_PATH);

    // 3. Generate Robots.txt
    const robots = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\nDisallow: /studio\n\nSitemap: ${DOMAIN}/sitemap.xml\n`;
    fs.writeFileSync(ROBOTS_PATH, robots, 'utf-8');
    console.log('robots.txt updated successfully at', ROBOTS_PATH);

  } catch (error) {
    console.error('Error generating sitemap and robots:', error);
  }
}
