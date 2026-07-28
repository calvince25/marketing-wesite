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
    const { question, answer, displayOrder } = body;

    await db.loadTable('faqs');
    const faq = db.findOne('faqs', f => f.id === id || f._id === id);
    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    const updates: any = {};
    if (question !== undefined) updates.question = question;
    if (answer !== undefined) updates.answer = answer;
    if (displayOrder !== undefined) updates.displayOrder = Number(displayOrder);

    const result = db.update('faqs', id, updates);
    await db.persist('faqs');

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'FAQ Update', `Updated FAQ: ${updates.question || faq.question}`);

    return NextResponse.json({
      message: 'FAQ updated successfully',
      faq: result
    });

  } catch (error: any) {
    console.error('Update FAQ error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
    await db.loadTable('faqs');
    const faq = db.findOne('faqs', f => f.id === id || f._id === id);
    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    db.delete('faqs', id);
    await db.persist('faqs');

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'FAQ Delete', `Deleted FAQ: ${faq.question}`);

    return NextResponse.json({
      message: 'FAQ deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete FAQ error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
