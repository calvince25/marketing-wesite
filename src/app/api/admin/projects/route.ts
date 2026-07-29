import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { regenerateSitemapAndRobots } from '@/lib/seo';
import { getProjects, insertProject } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const auth = await requireAuth(['superadmin', 'admin', 'editor']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';

    let projects = await getProjects();

    if (search) {
      projects = projects.filter((p: any) =>
        p.name?.toLowerCase().includes(search) ||
        p.description?.toLowerCase().includes(search) ||
        p.client?.toLowerCase().includes(search)
      );
    }

    // Sort by displayOrder asc, then completionDate desc
    projects.sort((a: any, b: any) => {
      const orderDiff = (a.displayOrder || 0) - (b.displayOrder || 0);
      if (orderDiff !== 0) return orderDiff;
      return new Date(b.completionDate || b.createdAt).getTime() - new Date(a.completionDate || a.createdAt).getTime();
    });

    return NextResponse.json(
      { projects },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } catch (error: any) {
    console.error('Fetch projects error:', error);
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

    if (!name || !description) {
      return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
    }

    // Generate/Validate slug
    const finalSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-');

    if (!finalSlug) {
      return NextResponse.json({ error: 'Invalid project slug' }, { status: 400 });
    }

    const newProject = {
      name,
      title: name,
      slug: { current: finalSlug },
      description,
      fullDescription: fullDescription || description,
      category: category || client || 'Project',
      client: client || 'Private Client',
      technologies: Array.isArray(technologies) 
        ? technologies 
        : (technologies ? technologies.split(',').map((t: string) => t.trim()) : []),
      images: Array.isArray(images) && images.length > 0 
        ? images 
        : ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'],
      projectLink: projectLink || '',
      githubLink: githubLink || '',
      featured: !!featured,
      isPrivate: false,
      demoAvailableRequest: false,
      caseStudySupport: true,
      completionDate: completionDate || new Date().toISOString().split('T')[0],
      displayOrder: parseInt(displayOrder) || 0,
      status: status || 'Published',
      seo: {
        metaTitle: `${name} Project | GrowthLab Portfolio`,
        metaDescription: description.substring(0, 160)
      }
    };

    const result = await insertProject(newProject);

    // Update Sitemap
    regenerateSitemapAndRobots();

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Project Create', `Created project: ${name}`);

    return NextResponse.json({
      message: 'Project created successfully',
      project: result
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
