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

export async function GET() {
  try {
    const auth = await requireAuth(['superadmin', 'admin', 'editor']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    await db.loadTable('heroImages');
    const heroes = db.read('heroImages');

    return NextResponse.json(
      { heroes },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } catch (error: any) {
    console.error('Fetch heroes error:', error);
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
    const page = formData.get('page') as string;
    const titleText = formData.get('titleText') as string;
    const subtitleText = formData.get('subtitleText') as string;
    const file = formData.get('file') as File | null;

    if (!page) {
      return NextResponse.json({ error: 'Page identifier is required' }, { status: 400 });
    }

    await db.loadTable('heroImages');
    const hero = db.findOne('heroImages', h => h.page === page);

    if (!hero) {
      return NextResponse.json({ error: 'Hero configuration not found' }, { status: 404 });
    }

    let imageUrl = hero.imageUrl;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // Sanitize filename
      const originalName = file.name;
      const ext = path.extname(originalName);
      const baseName = path.basename(originalName, ext)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-');
      
      const uniqueName = `hero-${page}-${Date.now()}${ext}`;
      const filePath = path.join(UPLOADS_DIR, uniqueName);

      // Save to disk
      fs.writeFileSync(filePath, buffer);
      imageUrl = `/uploads/${uniqueName}`;

      // Insert file metadata into media library database so user can reuse it
      const mediaAsset = {
        fileName: originalName,
        uniqueName,
        fileUrl: imageUrl,
        fileSize: file.size,
        mimeType: file.type,
        uploadedAt: new Date().toISOString()
      };
      db.insert('media', mediaAsset);
    }

    // Update DB
    const updated = db.update('heroImages', hero.id || hero._id, {
      titleText,
      subtitleText,
      imageUrl
    });

    // Log Activity
    db.logActivity(auth.user?.email || 'system', 'Update Hero Image', `Updated hero banner settings for ${page} page.`);

    return NextResponse.json({
      message: 'Hero configuration updated successfully',
      hero: updated
    });

  } catch (error: any) {
    console.error('Update hero error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const auth = await requireAuth(['superadmin', 'admin']); // Editors cannot reset layout defaults
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    if (!page) {
      return NextResponse.json({ error: 'Page identifier is required' }, { status: 400 });
    }

    await db.loadTable('heroImages');
    const hero = db.findOne('heroImages', h => h.page === page);

    if (!hero) {
      return NextResponse.json({ error: 'Hero configuration not found' }, { status: 404 });
    }

    // Reset imageUrl to empty string so it falls back to default gradient style
    const updated = db.update('heroImages', hero.id || hero._id, {
      imageUrl: ''
    });

    db.logActivity(auth.user?.email || 'system', 'Reset Hero Image', `Reset hero banner image for ${page} page.`);

    return NextResponse.json({
      message: 'Hero image reset to default layout gradient successfully',
      hero: updated
    });
  } catch (error: any) {
    console.error('Reset hero error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
