import React from 'react';
import Link from 'next/link';
import type { NavbarProps } from 'sanity';

export function CustomNavbar(props: NavbarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#0a192f', color: 'white', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1a365d' }}>
        <div style={{ fontWeight: 'bold' }}>GrowthLab Admin Panel</div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link href="/admin/blog-manager" style={{ color: '#fff', textDecoration: 'none', background: '#e53e3e', padding: '6px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold' }}>
            🗑️ Blog Manager (Delete Posts)
          </Link>
          <Link href="/admin/users" style={{ color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '4px', fontSize: '13px' }}>
            👥 User Discovery
          </Link>
        </div>
      </div>
      {props.renderDefault(props)}
    </div>
  )
}
