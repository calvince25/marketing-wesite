import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const auth = await requireAuth(['superadmin']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const users = db.read('users')
      .map(u => ({
        id: u.id || u._id,
        _id: u.id || u._id,
        name: u.name,
        email: u.email,
        role: u.role || (u.isAdmin ? 'superadmin' : 'editor'),
        isApproved: u.isApproved,
        isSuspended: u.isSuspended,
        createdAt: u.createdAt
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ users });

  } catch (error: any) {
    console.error('Fetch users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
