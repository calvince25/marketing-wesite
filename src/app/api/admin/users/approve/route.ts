import { NextResponse } from 'next/server';
import { adminClient } from '@/sanity/lib/adminClient';
import { getAuthUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const authUser = await getAuthUser();

    if (!authUser || !authUser.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId, approve } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const result = await adminClient
      .patch(userId)
      .set({ isApproved: approve })
      .commit();

    return NextResponse.json({
      message: approve ? 'User approved' : 'User unapproved',
      user: result
    });

  } catch (error: any) {
    console.error('Approval error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
