import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { regenerateSitemapAndRobots } from '@/lib/seo';

export async function GET() {
  try {
    const auth = await requireAuth(['superadmin', 'admin', 'editor']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const services = db.read('services');
    return NextResponse.json({ services });
  } catch (error: any) {
    console.error('Fetch services error:', error);
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
    const { title, h1, description, overview, benefits, process, faqs, clusters, cta } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const slug = title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-');

    const newService = {
      title,
      name: title,
      h1: h1 || title,
      slug: { current: slug },
      description,
      shortDescription: description,
      overview: overview || '',
      benefits: Array.isArray(benefits) ? benefits : [],
      process: Array.isArray(process) ? process : [],
      faqs: Array.isArray(faqs) ? faqs : [],
      clusters: Array.isArray(clusters) ? clusters : [],
      cta: cta || { title: 'Ready to Scale?', text: 'Contact us for a consultation call.', buttonText: 'Get Consultation', buttonLink: '/contact' },
      seo: {
        metaTitle: `${title} Services in Kenya | GrowthLab`,
        metaDescription: description.substring(0, 160)
      },
      createdAt: new Date().toISOString()
    };

    const result = db.insert('services', newService);

    // Update Sitemap
    regenerateSitemapAndRobots();

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Service Create', `Created service pillar: ${title}`);

    return NextResponse.json({
      message: 'Service pillar created successfully',
      service: result
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create service error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
