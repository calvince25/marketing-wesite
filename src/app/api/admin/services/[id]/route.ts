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
    const { title, h1, description, overview, benefits, process, faqs, clusters, cta, seo } = body;

    const service = db.findOne('services', s => s.id === id || s._id === id);
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    const updates: any = {};
    if (title !== undefined) {
      updates.title = title;
      updates.name = title;
      updates.slug = { current: title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-') };
    }
    if (h1 !== undefined) updates.h1 = h1;
    if (description !== undefined) {
      updates.description = description;
      updates.shortDescription = description;
    }
    if (overview !== undefined) updates.overview = overview;
    if (benefits !== undefined) updates.benefits = benefits;
    if (process !== undefined) updates.process = process;
    if (faqs !== undefined) updates.faqs = faqs;
    if (clusters !== undefined) updates.clusters = clusters;
    if (cta !== undefined) updates.cta = cta;

    updates.seo = {
      metaTitle: seo?.metaTitle || `${updates.title || service.title} Services in Kenya`,
      metaDescription: seo?.metaDescription || (updates.description || service.description).substring(0, 160)
    };

    const result = db.update('services', id, updates);

    // Update Sitemap
    regenerateSitemapAndRobots();

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Service Update', `Updated service: ${updates.title || service.title}`);

    return NextResponse.json({
      message: 'Service updated successfully',
      service: result
    });

  } catch (error: any) {
    console.error('Update service error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth(['superadmin', 'admin']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const { id } = await params;
    const service = db.findOne('services', s => s.id === id || s._id === id);
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    db.delete('services', id);

    // Update Sitemap
    regenerateSitemapAndRobots();

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Service Delete', `Deleted service: ${service.title}`);

    return NextResponse.json({
      message: 'Service deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete service error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
