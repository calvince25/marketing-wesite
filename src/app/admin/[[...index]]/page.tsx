import { getAuthUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import styles from '../admin.module.css';
import Link from 'next/link';
import { 
  BookOpen, 
  Briefcase, 
  Settings, 
  MessageSquare, 
  Users, 
  ShieldAlert,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default async function DashboardPage() {
  const user = await getAuthUser();

  // Route protection
  if (!user) {
    redirect('/admin/login');
  }

  // Read data directly from DB
  const posts = db.read('posts');
  const projects = db.read('projects');
  const services = db.read('services');
  const team = db.read('team');
  const reviews = db.read('reviews');
  const users = db.read('users');
  const activity = db.read('activity');

  const stats = {
    blogsCount: posts.length,
    publishedBlogs: posts.filter((p: any) => p.status === 'published').length,
    projectsCount: projects.length,
    servicesCount: services.length,
    teamCount: team.length,
    reviewsCount: reviews.length,
    pendingReviews: reviews.filter((r: any) => !r.isApproved).length,
    pendingUsers: users.filter((u: any) => !u.isApproved).length,
  };

  // Last 10 activity logs
  const recentLogs = [...activity]
    .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  // Unapproved reviews
  const pendingReviewsList = reviews.filter((r: any) => !r.isApproved).slice(0, 5);

  const role = user.role || 'editor';

  return (
    <div>
      {/* 1. Header */}
      <div className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>Welcome back, {user.name || 'Admin'}</h1>
          <p className={styles.pageSubtitle}>Here is what is happening with the GrowthLab website today.</p>
        </div>
        <div style={{ background: 'rgba(255,107,0,0.1)', padding: '10px 20px', borderRadius: '30px', border: '1px solid rgba(255,107,0,0.2)', fontSize: '13px', color: '#ff6b00', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
          <TrendingUp size={16} />
          System Operational
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>Blog Posts</span>
            <div className={styles.statIcon}><BookOpen size={16} /></div>
          </div>
          <div className={styles.statValue}>{stats.blogsCount}</div>
          <div className={styles.statMeta}>{stats.publishedBlogs} Published Articles</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>Projects</span>
            <div className={styles.statIcon}><Briefcase size={16} /></div>
          </div>
          <div className={styles.statValue}>{stats.projectsCount}</div>
          <div className={styles.statMeta}>Dynamic Case Studies</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>Services</span>
            <div className={styles.statIcon}><Settings size={16} /></div>
          </div>
          <div className={styles.statValue}>{stats.servicesCount}</div>
          <div className={styles.statMeta}>Pillars & Clusters</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>Reviews</span>
            <div className={styles.statIcon}><MessageSquare size={16} /></div>
          </div>
          <div className={styles.statValue}>{stats.reviewsCount}</div>
          <div className={styles.statMeta} style={{ color: stats.pendingReviews > 0 ? '#ff6b00' : '#475569', fontWeight: stats.pendingReviews > 0 ? 600 : 400 }}>
            {stats.pendingReviews} Pending Approval
          </div>
        </div>
      </div>

      {/* 3. Main Split Sections */}
      <div className={styles.dashboardSections}>
        {/* Left Section: Active Reviews / Alerts */}
        <div>
          {/* Pending reviews warning */}
          {stats.pendingReviews > 0 && (
            <div className={styles.sectionCard} style={{ border: '1px solid rgba(255,107,0,0.15)', background: 'linear-gradient(90deg, rgba(255,107,0,0.04) 0%, rgba(17,34,64,0.4) 100%)' }}>
              <div className={styles.sectionHeader} style={{ borderBottom: 'none', margin: 0, padding: 0 }}>
                <h3 style={{ color: '#ff6b00' }}><ShieldAlert size={18} /> Testimonial Action Required</h3>
                <Link href="/admin/reviews" className={styles.btnPrimary} style={{ padding: '8px 16px', fontSize: '12px' }}>
                  Manage Testimonials <ArrowRight size={14} />
                </Link>
              </div>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '10px' }}>
                You have {stats.pendingReviews} new testimonial submissions that require review and approval before they display live.
              </p>
            </div>
          )}

          {/* Pending users warning (Super Admin only) */}
          {role === 'superadmin' && stats.pendingUsers > 0 && (
            <div className={styles.sectionCard} style={{ border: '1px solid rgba(16, 185, 129, 0.2)', background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.04) 0%, rgba(17,34,64,0.4) 100%)' }}>
              <div className={styles.sectionHeader} style={{ borderBottom: 'none', margin: 0, padding: 0 }}>
                <h3 style={{ color: '#10b981' }}><Users size={18} /> Pending Admin Registrations</h3>
                <Link href="/admin/users" className={styles.btnPrimary} style={{ background: '#10b981', padding: '8px 16px', fontSize: '12px' }}>
                  Review Registrations <ArrowRight size={14} />
                </Link>
              </div>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '10px' }}>
                There are {stats.pendingUsers} subsequent user registrations waiting for your review. Pending users cannot access the workspace until approved.
              </p>
            </div>
          )}

          {/* Core Dashboard welcome */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h3>Quick Actions</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <Link href="/admin/blogs" style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'block', transition: 'all 0.3s ease' }} className="action-card">
                <h4 style={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}><BookOpen size={16} /> Write Blog Post</h4>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '5px' }}>Compose new marketing insights or articles.</p>
              </Link>
              <Link href="/admin/projects" style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'block', transition: 'all 0.3s ease' }} className="action-card">
                <h4 style={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}><Briefcase size={16} /> Add Case Study</h4>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '5px' }}>Showcase custom client works and technologies.</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section: System Log Activity */}
        <div>
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h3>Activity Log</h3>
            </div>
            <div className={styles.activityList}>
              {recentLogs.length > 0 ? (
                recentLogs.map((log: any) => (
                  <div key={log.id} className={styles.activityItem}>
                    <div className={styles.activityMarker}></div>
                    <div className={styles.activityDetails}>
                      <h5>{log.action}</h5>
                      <p>{log.details}</p>
                      <div className={styles.activityTime}>
                        {log.userEmail} • {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', color: '#475569', fontSize: '13px', padding: '20px 0' }}>
                  No recent activities recorded.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
