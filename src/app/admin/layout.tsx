import { getAuthUser } from '@/lib/auth';
import styles from './admin.module.css';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  Settings, 
  UserCheck,
  Globe,
  LogOut
} from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

  // If there's no logged in user, render clean without sidebar (for login/register pages)
  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#050d1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    );
  }

  const role = user.role || 'editor';
  const isSuperAdmin = role === 'superadmin';

  return (
    <div className={styles.dashboardContainer}>
      {/* 1. Sleek Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>
          <Link href="/admin" className={styles.logoText}>
            GROWTH<span className={styles.logoAccent}>LAB</span>
          </Link>
        </div>

        <nav className={styles.sidebarMenu}>
          <Link href="/admin" className={styles.menuItem}>
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link href="/admin/blogs" className={styles.menuItem}>
            <BookOpen size={18} />
            Blog Articles
          </Link>

          <Link href="/admin/projects" className={styles.menuItem}>
            <Briefcase size={18} />
            Projects Portfolio
          </Link>

          <Link href="/admin/services" className={styles.menuItem}>
            <Settings size={18} />
            Services Panel
          </Link>

          {isSuperAdmin && (
            <Link href="/admin/users" className={styles.menuItem}>
              <UserCheck size={18} />
              User Approvals
            </Link>
          )}


          <a href="/" target="_blank" rel="noopener noreferrer" className={styles.menuItem} style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
            <Globe size={18} />
            Visit Website
          </a>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              {user.name ? user.name.substring(0, 2).toUpperCase() : 'AD'}
            </div>
            <div className={styles.userDetails}>
              <h4>{user.name}</h4>
              <span>{role}</span>
            </div>
          </div>

          <form action="/api/admin/logout" method="POST" style={{ margin: 0 }}>
            <button type="submit" className={styles.signOutBtn}>
              <LogOut size={16} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* 2. Main Workspace */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
