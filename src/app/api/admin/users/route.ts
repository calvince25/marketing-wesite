import { NextResponse } from 'next/server';
import { adminClient } from '@/sanity/lib/adminClient';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  try {
    const authUser = await getAuthUser();

    if (!authUser || !authUser.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const users = await adminClient.fetch(
      `*[_type == "adminUser"] | order(createdAt desc)`
    );

    return NextResponse.json({ users });

  } catch (error: any) {
    console.error('Fetch users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
