import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

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
    const { title, price, features, ctaText, ctaLink, isPopular } = body;

    const plan = db.findOne('pricing', p => p.id === id || p._id === id);
    if (!plan) {
      return NextResponse.json({ error: 'Pricing plan not found' }, { status: 404 });
    }

    const updates: any = {};
    if (title !== undefined) updates.title = title;
    if (price !== undefined) updates.price = price;
    if (features !== undefined) {
      updates.features = Array.isArray(features) ? features : features.split(',').map((f: string) => f.trim());
    }
    if (ctaText !== undefined) updates.ctaText = ctaText;
    if (ctaLink !== undefined) updates.ctaLink = ctaLink;
    if (isPopular !== undefined) updates.isPopular = !!isPopular;

    const result = db.update('pricing', id, updates);

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Pricing Update', `Updated pricing plan: ${updates.title || plan.title}`);

    return NextResponse.json({
      message: 'Pricing plan updated successfully',
      pricing: result
    });

  } catch (error: any) {
    console.error('Update pricing error:', error);
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
    const plan = db.findOne('pricing', p => p.id === id || p._id === id);
    if (!plan) {
      return NextResponse.json({ error: 'Pricing plan not found' }, { status: 404 });
    }

    db.delete('pricing', id);

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Pricing Delete', `Deleted pricing plan: ${plan.title}`);

    return NextResponse.json({
      message: 'Pricing plan deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete pricing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
