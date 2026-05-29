import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const auth = await requireAuth(['superadmin', 'admin', 'editor']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const pricing = db.read('pricing');
    return NextResponse.json({ pricing });
  } catch (error: any) {
    console.error('Fetch pricing error:', error);
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
    const { title, price, features, ctaText, ctaLink, isPopular } = body;

    if (!title || !price) {
      return NextResponse.json({ error: 'Title and price are required' }, { status: 400 });
    }

    const newPlan = {
      title,
      price,
      features: Array.isArray(features) ? features : (features ? features.split(',').map((f: string) => f.trim()) : []),
      ctaText: ctaText || 'Get Started',
      ctaLink: ctaLink || '/contact',
      isPopular: !!isPopular
    };

    const result = db.insert('pricing', newPlan);

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Pricing Create', `Added pricing plan: ${title}`);

    return NextResponse.json({
      message: 'Pricing plan added successfully',
      pricing: result
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create pricing plan error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
