import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { regenerateSitemapAndRobots } from '@/lib/seo';
import { updateProject, deleteProject, getProjects } from '@/lib/supabase';

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
    const { 
      name, 
      slug,
      client, 
      description, 
      fullDescription, 
      category,
      technologies, 
      completionDate, 
      featured, 
      displayOrder, 
      status, 
      projectLink, 
      githubLink, 
      images 
    } = body;

    // Retrieve existing to verify it exists
    const projects = await getProjects();
    const project = projects.find(p => p.id === id || p._id === id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const updates: any = {};
    if (name !== undefined) {
      updates.name = name;
      updates.title = name;
    }
    if (slug !== undefined) {
      updates.slug = {
        current: slug
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/[\s_]+/g, '-')
          .replace(/-+/g, '-')
      };
    }
    if (description !== undefined) updates.description = description;
    if (fullDescription !== undefined) updates.fullDescription = fullDescription;
    if (category !== undefined) updates.category = category;
    if (client !== undefined) updates.client = client;
    if (technologies !== undefined) {
      updates.technologies = Array.isArray(technologies) 
        ? technologies 
        : technologies.split(',').map((t: string) => t.trim());
    }
    if (completionDate !== undefined) updates.completionDate = completionDate;
    if (featured !== undefined) updates.featured = !!featured;
    if (displayOrder !== undefined) updates.displayOrder = parseInt(displayOrder) || 0;
    if (status !== undefined) updates.status = status;
    if (projectLink !== undefined) updates.projectLink = projectLink;
    if (githubLink !== undefined) updates.githubLink = githubLink;
    if (images !== undefined) updates.images = Array.isArray(images) ? images : [];

    updates.seo = {
      metaTitle: `${updates.name || project.name} Case Study`,
      metaDescription: (updates.description || project.description).substring(0, 160)
    };

    const result = await updateProject(id, updates);

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
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth(['superadmin', 'admin', 'editor']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const { id } = await params;
    
    // Retrieve existing to verify it exists
    const projects = await getProjects();
    const project = projects.find(p => p.id === id || p._id === id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    await deleteProject(id);

    // Update Sitemap
    regenerateSitemapAndRobots();

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Project Delete', `Deleted project: ${project.name}`);

    return NextResponse.json({
      message: 'Project deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete project error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
