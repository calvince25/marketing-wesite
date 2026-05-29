import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Only superadmin and admin can modify reviews, editors cannot!
    const auth = await requireAuth(['superadmin', 'admin']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const { id } = await params;
    const body = await request.json();
    const { name, business, rating, message, isApproved, isFeatured } = body;

    const review = db.findOne('reviews', r => r.id === id || r._id === id);
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    const updates: any = {};
    if (name !== undefined) updates.name = name;
    if (business !== undefined) updates.business = business;
    if (rating !== undefined) updates.rating = Number(rating);
    if (message !== undefined) updates.message = message;
    if (isApproved !== undefined) updates.isApproved = !!isApproved;
    if (isFeatured !== undefined) updates.isFeatured = !!isFeatured;

    const result = db.update('reviews', id, updates);

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Review Update', `Modified review from: ${review.name}`);

    return NextResponse.json({
      message: 'Review updated successfully',
      review: result
    });

  } catch (error: any) {
    console.error('Update review error:', error);
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
    const review = db.findOne('reviews', r => r.id === id || r._id === id);
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    db.delete('reviews', id);

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Review Delete', `Deleted review from: ${review.name}`);

    return NextResponse.json({
      message: 'Review deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete review error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
