import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const auth = await requireAuth(['superadmin', 'admin', 'editor']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const team = db.read('team');
    // Sort by displayOrder asc
    team.sort((a: any, b: any) => (a.displayOrder || 99) - (b.displayOrder || 99));

    return NextResponse.json({ team });
  } catch (error: any) {
    console.error('Fetch team error:', error);
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
    const { name, role, bio, image, displayOrder, isActive, socialLinks } = body;

    if (!name || !role) {
      return NextResponse.json({ error: 'Name and role are required' }, { status: 400 });
    }

    const newMember = {
      name,
      role,
      bio: bio || '',
      image: image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : 10,
      isActive: isActive !== undefined ? !!isActive : true,
      socialLinks: socialLinks || { twitter: '', linkedin: '', github: '' }
    };

    const result = db.insert('team', newMember);

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Team Create', `Added team member: ${name}`);

    return NextResponse.json({
      message: 'Team member added successfully',
      team: result
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create team member error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
