import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { regenerateSitemapAndRobots } from '@/lib/seo';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth(['superadmin', 'admin', 'editor']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const { id } = await params;
    const body = await request.json();
    const { title, content, excerpt, category, image, status, authorName, authorBio, authorImage, seoTitle, seoDescription, scheduledFor } = body;

    const post = db.findOne('posts', p => p.id === id || p._id === id);
    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    const updates: any = {};
    if (title !== undefined) {
      updates.title = title;
      updates.slug = { current: title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-') };
    }
    if (content !== undefined) updates.content = content;
    if (excerpt !== undefined) updates.excerpt = excerpt;
    if (category !== undefined) {
      updates.category = category;
      updates.categorySlug = category.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }
    if (image !== undefined) updates.image = image;
    if (status !== undefined) {
      updates.status = status;
      if (status === 'published' && !post.publishedAt) {
        updates.publishedAt = new Date().toISOString();
      }
    }
    if (scheduledFor !== undefined) updates.scheduledFor = scheduledFor;

    // Author update
    if (authorName || authorBio || authorImage) {
      updates.author = {
        name: authorName || post.author?.name || 'Admin',
        bio: authorBio || post.author?.bio || '',
        image: authorImage || post.author?.image || ''
      };
    }

    // SEO update
    if (seoTitle || seoDescription || title || excerpt || content) {
      updates.seo = {
        metaTitle: seoTitle || updates.title || post.seo?.metaTitle || post.title,
        metaDescription: seoDescription || updates.excerpt || post.seo?.metaDescription || post.excerpt
      };
    }

    const result = db.update('posts', id, updates);

    // Regenerate sitemap and robots
    regenerateSitemapAndRobots();

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Blog Update', `Updated blog post: ${title || post.title}`);

    return NextResponse.json({
      message: 'Blog post updated successfully',
      post: result
    });

  } catch (error: any) {
    console.error('Update post error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth(['superadmin', 'admin']); // Editors cannot delete
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const { id } = await params;
    const post = db.findOne('posts', p => p.id === id || p._id === id);
    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    db.delete('posts', id);

    // Update Sitemap and Robots
    regenerateSitemapAndRobots();

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Blog Delete', `Deleted blog post: ${post.title}`);

    return NextResponse.json({
      message: 'Blog post deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete post error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
