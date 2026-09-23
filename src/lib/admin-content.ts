import { db } from '@/lib/db';

export async function getAdminPosts(): Promise<any[]> {
  await db.loadTable('posts');
  return db.read('posts');
}

export async function getPublishedAdminPosts(): Promise<any[]> {
  const posts = await getAdminPosts();
  const now = Date.now();
  return posts.filter((post: any) => {
    if (post.status === 'draft') return false;
    if (post.status === 'scheduled') {
      return post.scheduledFor && new Date(post.scheduledFor).getTime() <= now;
    }
    return true;
  });
}

export function mergeBySlug(primary: any[], secondary: any[]): any[] {
  const merged = new Map<string, any>();
  for (const item of primary || []) {
    const slug = typeof item.slug === 'object' ? item.slug?.current : item.slug;
    if (slug) merged.set(slug, item);
  }
  for (const item of secondary || []) {
    const slug = typeof item.slug === 'object' ? item.slug?.current : item.slug;
    if (slug) merged.set(slug, item);
  }
  return Array.from(merged.values());
}

export async function getAdminProjects(): Promise<any[]> {
  await db.loadTable('projects');
  return db.read('projects');
}
