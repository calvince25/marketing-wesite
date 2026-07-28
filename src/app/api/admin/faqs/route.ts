import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const auth = await requireAuth(['superadmin', 'admin', 'editor']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const faqs = db.read('faqs');
    // Sort by displayOrder
    faqs.sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));

    return NextResponse.json({ faqs });
  } catch (error: any) {
    console.error('Fetch faqs error:', error);
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
    const { question, answer, displayOrder } = body;

    if (!question || !answer) {
      return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
    }

    const newFaq = {
      question,
      answer,
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : 0
    };

    const result = db.insert('faqs', newFaq);

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'FAQ Create', `Added FAQ: ${question}`);

    return NextResponse.json({
      message: 'FAQ added successfully',
      faq: result
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create FAQ error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
