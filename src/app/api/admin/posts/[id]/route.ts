import { NextResponse } from 'next/server';
import { adminClient } from '@/sanity/lib/adminClient';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-for-dev-only-change-in-prod'
);

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
    }

    // Determine the published and draft IDs
    const baseId = id.startsWith('drafts.') ? id.substring(7) : id;
    const publishedId = baseId;
    const draftId = `drafts.${baseId}`;

    console.log(`Deleting post: ${publishedId} and ${draftId}`);

    try {
      // Use transactional delete for both if they exist
      // Sanity's client.delete can take an array of IDs
      await adminClient.delete(publishedId);
      await adminClient.delete(draftId);
      
      return NextResponse.json({ 
        message: 'Post deleted successfully', 
        deleted: [publishedId, draftId] 
      });
    } catch (deleteError: any) {
      console.error('Sanity delete error:', deleteError);
      // If it's a 404 (not found), we can still consider it a "success" or handle it
      if (deleteError.statusCode === 404) {
          return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json({ error: deleteError.message || 'Failed to delete post' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Delete handler error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
