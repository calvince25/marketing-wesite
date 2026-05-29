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
    const { name, description, technologies, client, images, projectLink, githubLink, featured, isPrivate, demoAvailableRequest, caseStudySupport, completionDate } = body;

    const project = db.findOne('projects', p => p.id === id || p._id === id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const updates: any = {};
    if (name !== undefined) {
      updates.name = name;
      updates.title = name;
      updates.slug = { current: name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-') };
    }
    if (description !== undefined) updates.description = description;
    if (technologies !== undefined) {
      updates.technologies = Array.isArray(technologies) ? technologies : technologies.split(',').map((t: string) => t.trim());
    }
    if (client !== undefined) updates.client = client;
    if (images !== undefined) updates.images = images;
    if (projectLink !== undefined) updates.projectLink = projectLink;
    if (githubLink !== undefined) updates.githubLink = githubLink;
    if (featured !== undefined) updates.featured = !!featured;
    if (isPrivate !== undefined) updates.isPrivate = !!isPrivate;
    if (demoAvailableRequest !== undefined) updates.demoAvailableRequest = !!demoAvailableRequest;
    if (caseStudySupport !== undefined) updates.caseStudySupport = !!caseStudySupport;
    if (completionDate !== undefined) updates.completionDate = completionDate;

    updates.seo = {
      metaTitle: `${updates.name || project.name} Case Study`,
      metaDescription: (updates.description || project.description).substring(0, 160)
    };

    const result = db.update('projects', id, updates);

    // Update Sitemap
    regenerateSitemapAndRobots();

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Project Update', `Updated project: ${updates.name || project.name}`);

    return NextResponse.json({
      message: 'Project updated successfully',
      project: result
    });

  } catch (error: any) {
    console.error('Update project error:', error);
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
    const project = db.findOne('projects', p => p.id === id || p._id === id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    db.delete('projects', id);

    // Update Sitemap
    regenerateSitemapAndRobots();

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Project Delete', `Deleted project: ${project.name}`);

    return NextResponse.json({
      message: 'Project deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete project error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
