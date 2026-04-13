import { redirect } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { postBySlugQuery } from '@/sanity/lib/queries';
import { blogPosts } from '@/lib/blog';

interface RedirectPageProps {
  params: { slug: string };
}

export default async function BlogRedirectPage({ params }: RedirectPageProps) {
  const { slug } = await params;

  // 1. Check Sanity first
  const post = await client.fetch(postBySlugQuery, { slug }).catch(() => null);
  
  if (post && post.categories?.[0]?.slug?.current) {
    redirect(`/blog/${post.categories[0].slug.current}/${slug}`);
  }

  // 2. Check Static fallback
  const staticPost = blogPosts.find(p => p.slug === slug);
  if (staticPost) {
    redirect(`/blog/${staticPost.categorySlug}/${slug}`);
  }

  // 3. Fallback: If not found at all, just go to the blog main page
  redirect('/blog');
}
