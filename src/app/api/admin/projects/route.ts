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

    let projects = db.read('projects');

    if (search) {
      projects = projects.filter((p: any) =>
        p.name?.toLowerCase().includes(search) ||
        p.description?.toLowerCase().includes(search)
      );
    }

    // Sort by completionDate/createdAt desc
    projects.sort((a: any, b: any) => new Date(b.completionDate || b.createdAt).getTime() - new Date(a.completionDate || a.createdAt).getTime());

    return NextResponse.json({ projects });
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
    const { name, description, technologies, client, images, projectLink, githubLink, featured, isPrivate, demoAvailableRequest, caseStudySupport, completionDate } = body;

    if (!name || !description) {
      return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
    }

    // Auto slug
    const slug = name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-');

    const newProject = {
      name,
      title: name,
      slug: { current: slug },
      description,
      technologies: Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map((t: string) => t.trim()) : []),
      client: client || 'Private Client',
      images: Array.isArray(images) && images.length > 0 ? images : ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'],
      projectLink: projectLink || '',
      githubLink: githubLink || '',
      featured: !!featured,
      isPrivate: !!isPrivate,
      demoAvailableRequest: !!demoAvailableRequest,
      caseStudySupport: !!caseStudySupport,
      completionDate: completionDate || new Date().toISOString().split('T')[0],
      seo: {
        metaTitle: `${name} Project | GrowthLab Portfolio`,
        metaDescription: description.substring(0, 160)
      },
      createdAt: new Date().toISOString()
    };

    const result = db.insert('projects', newProject);

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
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
