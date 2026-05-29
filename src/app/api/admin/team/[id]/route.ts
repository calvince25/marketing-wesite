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
    const { name, role, bio, image, displayOrder, isActive, socialLinks } = body;

    const member = db.findOne('team', t => t.id === id || t._id === id);
    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }

    const updates: any = {};
    if (name !== undefined) updates.name = name;
    if (role !== undefined) updates.role = role;
    if (bio !== undefined) updates.bio = bio;
    if (image !== undefined) updates.image = image;
    if (displayOrder !== undefined) updates.displayOrder = Number(displayOrder);
    if (isActive !== undefined) updates.isActive = !!isActive;
    if (socialLinks !== undefined) updates.socialLinks = socialLinks;

    const result = db.update('team', id, updates);

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Team Update', `Updated team member: ${updates.name || member.name}`);

    return NextResponse.json({
      message: 'Team member updated successfully',
      team: result
    });

  } catch (error: any) {
    console.error('Update team member error:', error);
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
    const member = db.findOne('team', t => t.id === id || t._id === id);
    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }

    db.delete('team', id);

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Team Delete', `Deleted team member: ${member.name}`);

    return NextResponse.json({
      message: 'Team member deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete team member error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
