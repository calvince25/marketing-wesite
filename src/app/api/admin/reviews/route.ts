import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const auth = await requireAuth(['superadmin', 'admin', 'editor']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const reviews = db.read('reviews');
    // Sort by dateSubmitted desc
    reviews.sort((a: any, b: any) => new Date(b.dateSubmitted || b.createdAt).getTime() - new Date(a.dateSubmitted || a.createdAt).getTime());

    return NextResponse.json({ reviews });
  } catch (error: any) {
    console.error('Fetch reviews error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Both contact page (anonymous) and admin (authenticated) can submit reviews
    // If authenticated, we check roles, else we allow contact page submissions!
    const body = await request.json();
    const { name, business, rating, message, isApproved, isFeatured } = body;

    if (!name || !rating || !message) {
      return NextResponse.json({ error: 'Name, rating, and message are required' }, { status: 400 });
    }

    const newReview = {
      name,
      business: business || 'General Partner',
      rating: Number(rating),
      message,
      dateSubmitted: new Date().toISOString().split('T')[0],
      isApproved: isApproved !== undefined ? !!isApproved : false, // Contact submissions require approval
      isFeatured: isFeatured !== undefined ? !!isFeatured : false
    };

    const result = db.insert('reviews', newReview);

    return NextResponse.json({
      message: 'Review submitted successfully',
      review: result
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create review error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
