import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(['superadmin']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const { userId, approve, suspend, role } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const user = db.findOne('users', u => u.id === userId || u._id === userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Don't allow Super Admin to demote or suspend themselves
    if (user.role === 'superadmin' && auth.user?.id !== user.id) {
      return NextResponse.json({ error: 'Cannot modify another Super Admin account' }, { status: 403 });
    }

    const updates: any = {};
    if (approve !== undefined) updates.isApproved = !!approve;
    if (suspend !== undefined) updates.isSuspended = !!suspend;
    if (role !== undefined) {
      if (!['superadmin', 'admin', 'editor'].includes(role)) {
        return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
      }
      updates.role = role;
      updates.isAdmin = role === 'superadmin' || role === 'admin';
    }

    const result = db.update('users', userId, updates);

    // Log Activity
    db.logActivity(
      auth.user?.email || 'system',
      'User Management',
      `Modified user ${user.email}: ${JSON.stringify(updates)}`
    );

    return NextResponse.json({
      message: 'User account updated successfully',
      user: result
    });

  } catch (error: any) {
    console.error('Approval/Update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
