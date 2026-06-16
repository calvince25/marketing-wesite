import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export async function GET(request: Request) {
  try {
    const auth = await requireAuth(['superadmin', 'admin', 'editor']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';

    let media = db.read('media');

    if (search) {
      media = media.filter((m: any) => m.fileName.toLowerCase().includes(search));
    }

    // Sort by uploadedAt desc
    media.sort((a: any, b: any) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    return NextResponse.json(
      { media },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } catch (error: any) {
    console.error('Fetch media error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(['superadmin', 'admin', 'editor']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Sanitize filename
    const originalName = file.name;
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    
    const uniqueName = `${baseName}-${Date.now()}${ext}`;
    const filePath = path.join(UPLOADS_DIR, uniqueName);

    // Save to disk
    fs.writeFileSync(filePath, buffer);

    // Save to media db table
    const fileUrl = `/uploads/${uniqueName}`;
    const mediaAsset = {
      fileName: originalName,
      uniqueName,
      fileUrl,
      fileSize: file.size,
      mimeType: file.type,
      uploadedAt: new Date().toISOString()
    };

    const result = db.insert('media', mediaAsset);

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Media Upload', `Uploaded media file: ${originalName}`);

    return NextResponse.json({
      message: 'File uploaded successfully',
      media: result
    });

  } catch (error: any) {
    console.error('Upload media error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const auth = await requireAuth(['superadmin', 'admin']); // editors cannot delete media
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Media ID is required' }, { status: 400 });
    }

    const asset = db.findOne('media', m => m.id === id || m._id === id);
    if (!asset) {
      return NextResponse.json({ error: 'Media asset not found' }, { status: 404 });
    }

    // Delete from disk
    const filePath = path.join(UPLOADS_DIR, asset.uniqueName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    db.delete('media', id);

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Media Delete', `Deleted media file: ${asset.fileName}`);

    return NextResponse.json({ message: 'Media asset deleted successfully' });
  } catch (error: any) {
    console.error('Delete media error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
