'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/app/admin-legacy/admin-legacy.module.css';

export default function AdminNav({ user }: { user: any }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <nav style={{ 
      background: 'var(--primary-navy)', 
      color: 'white', 
      padding: '15px 40px', 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid var(--glass-border)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link href="/studio" style={{ fontWeight: 800, color: 'white', textDecoration: 'none', fontSize: '18px', letterSpacing: '1px' }}>
          GROWTH<span style={{ color: 'var(--accent-orange)' }}>LAB</span> <span style={{ fontSize: '12px', fontWeight: 400, opacity: 0.7, marginLeft: '10px' }}>ADMIN</span>
        </Link>
        <div style={{ width: '1px', height: '20px', background: 'var(--glass-border)' }}></div>
        <Link href="/studio" style={{ color: 'var(--text-light)', opacity: 0.8, textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Sanity Studio</Link>
        <div style={{ width: '4px', height: '4px', background: 'var(--glass-border)', borderRadius: '50%' }}></div>
        <Link href="/admin/blog-manager" style={{ color: 'var(--text-light)', opacity: 0.8, textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Blog Manager</Link>
        {user.isAdmin && (
          <>
            <div style={{ width: '4px', height: '4px', background: 'var(--glass-border)', borderRadius: '50%' }}></div>
            <Link href="/admin/users" style={{ color: 'var(--text-light)', opacity: 0.8, textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>User Discovery</Link>
          </>
        )}
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '13px', fontWeight: 600 }}>{user.name}</div>
          <div style={{ fontSize: '10px', color: 'var(--accent-orange)', textTransform: 'uppercase', letterSpacing: '1px' }}>{user.isAdmin ? 'Super Admin' : 'Editor'}</div>
        </div>
        <button 
          onClick={handleLogout}
          className="btn btn-outline"
          style={{ 
            padding: '6px 15px', 
            fontSize: '12px',
            borderColor: 'var(--glass-border)',
            color: 'white'
          }}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
