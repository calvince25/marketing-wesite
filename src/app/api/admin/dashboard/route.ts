import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const auth = await requireAuth(['superadmin', 'admin', 'editor']);
    if (!auth.authorized) {
      return auth.errorResponse!;
    }

    const posts = db.read('posts');
    const projects = db.read('projects');
    const services = db.read('services');
    const team = db.read('team');
    const reviews = db.read('reviews');
    const users = db.read('users');
    const activity = db.read('activity');

    const stats = {
      blogsCount: posts.length,
      publishedBlogsCount: posts.filter((p: any) => p.status === 'published').length,
      draftBlogsCount: posts.filter((p: any) => p.status === 'draft').length,
      projectsCount: projects.length,
      privateProjectsCount: projects.filter((p: any) => p.isPrivate).length,
      servicesCount: services.length,
      teamCount: team.length,
      reviewsCount: reviews.length,
      pendingReviewsCount: reviews.filter((r: any) => !r.isApproved).length,
      pendingApprovalsCount: users.filter((u: any) => !u.isApproved).length,
    };

    // Last 15 activity logs sorted by timestamp desc
    const recentActivity = [...activity]
      .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 15);

    return NextResponse.json({
      stats,
      recentActivity,
      user: auth.user
    });

  } catch (error: any) {
    console.error('Fetch dashboard error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
