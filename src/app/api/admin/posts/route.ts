import { NextResponse } from 'next/server';
import { adminClient } from '@/sanity/lib/adminClient';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-for-dev-only-change-in-prod'
);

export async function GET() {
  try {
    // Verify admin token
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      await jwtVerify(token, secret);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const posts = await adminClient.fetch(
      `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
        _id,
        title,
        publishedAt,
        "categories": categories[]->{title}
      }`
    );

    return NextResponse.json({ posts });
  } catch (error: any) {
    console.error('Fetch posts error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
