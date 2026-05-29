import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { regenerateSitemapAndRobots } from '@/lib/seo';

export async function GET(request: Request) {
  try {
    const auth = await requireAuth(['superadmin', 'admin', 'editor']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';

    let posts = db.read('posts');

    if (search) {
      posts = posts.filter((p: any) =>
        p.title?.toLowerCase().includes(search) ||
        p.content?.toLowerCase().includes(search)
      );
    }

    // Sort by publishedAt/createdAt desc
    posts.sort((a: any, b: any) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());

    return NextResponse.json({ posts });
  } catch (error: any) {
    console.error('Fetch posts error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(['superadmin', 'admin', 'editor']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const body = await request.json();
    const { title, content, excerpt, category, image, status, authorName, authorBio, authorImage, seoTitle, seoDescription, scheduledFor } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Auto-generate slug
    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-');

    // Build author object
    const author = {
      name: authorName || auth.user?.name || 'Admin',
      bio: authorBio || 'GrowthLab Content Contributor',
      image: authorImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    };

    // Auto generate categorySlug
    const categorySlug = category ? category.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'general';

    // Auto generate SEO fields
    const seo = {
      metaTitle: seoTitle || `${title} | GrowthLab Insights`,
      metaDescription: seoDescription || excerpt || content.substring(0, 150).replace(/[#*`]/g, '') + '...'
    };

    const newPost = {
      title,
      slug: { current: generatedSlug },
      content,
      excerpt: excerpt || content.substring(0, 160).replace(/[#*`]/g, ''),
      category: category || 'General',
      categorySlug,
      image: image || 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
      status: status || 'draft',
      publishedAt: status === 'published' ? new Date().toISOString() : null,
      scheduledFor: status === 'scheduled' ? scheduledFor : null,
      author,
      seo,
      createdAt: new Date().toISOString()
    };

    const result = db.insert('posts', newPost);

    // Update Sitemap and Robots
    if (newPost.status === 'published') {
      regenerateSitemapAndRobots();
    }

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Blog Create', `Created blog post: ${title}`);

    return NextResponse.json({
      message: 'Blog post created successfully',
      post: result
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create post error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
