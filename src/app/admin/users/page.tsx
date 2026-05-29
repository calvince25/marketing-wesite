'use client';

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';
import { 
  Check, 
  X, 
  Trash2, 
  UserCheck, 
  ShieldAlert,
  ArrowLeft,
  UserX,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

interface User {
  id: string;
  _id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor';
  isApproved: boolean;
  isSuspended: boolean;
  createdAt: string;
}

export default function UserApprovals() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      setUsers(data.users || []);
    } catch (e) {
      console.error('Error fetching users:', e);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateAccount(userId: string, updatePayload: { approve?: boolean; suspend?: boolean; role?: string }) {
    try {
      const res = await fetch('/api/admin/users/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...updatePayload })
      });

      if (res.ok) {
        fetchUsers();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to update user account');
      }
    } catch (e) {
      console.error('Error updating user:', e);
    }
  }

  return (
    <div>
      {/* 1. Header */}
      <div className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>User Approvals</h1>
          <p className={styles.pageSubtitle}>Manage registrations, approve pending editors, update credentials, or suspend access.</p>
        </div>
        <Link href="/admin" className={styles.btnSecondary} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>

      {/* 2. Security Disclaimer */}
      <div className={styles.sectionCard} style={{ border: '1px solid rgba(255, 107, 0, 0.15)', background: 'rgba(255, 107, 0, 0.02)', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <AlertTriangle size={24} style={{ color: '#ff6b00' }} />
        <div>
          <h4 style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>Super Admin Authorization Only</h4>
          <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '3px' }}>
            Only the default Super Admin accounts can authorize registrations, promote users, or revoke system credentials. Exercise caution.
          </p>
        </div>
      </div>

      {/* 3. Users list */}
      <div className={styles.sectionCard} style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading registrations...</div>
        ) : users.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No system users found.</div>
        ) : (
          <table className={styles.customTable}>
            <thead>
              <tr>
                <th>Administrator Details</th>
                <th>Access Level Role</th>
                <th>System Status</th>
                <th style={{ textAlign: 'right' }}>Authorization Controls</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => {
                const isSuperAdmin = item.role === 'superadmin';
                return (
                  <tr key={item.id || item._id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'white' }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{item.email}</div>
                      <div style={{ fontSize: '10px', color: '#475569', marginTop: '2px' }}>Registered: {new Date(item.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td>
                      <select 
                        value={item.role} 
                        disabled={isSuperAdmin}
                        onChange={(e) => handleUpdateAccount(item.id || item._id, { role: e.target.value })}
                        className={styles.formInput}
                        style={{ padding: '6px 12px', fontSize: '12px', background: '#091324', border: '1px solid rgba(255,255,255,0.05)', color: '#cbd5e1', cursor: isSuperAdmin ? 'not-allowed' : 'pointer' }}
                      >
                        <option value="superadmin">Super Admin</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                      </select>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <span className={`${styles.badge} ${item.isApproved ? styles.badgeSuccess : styles.badgeDanger}`}>
                          {item.isApproved ? 'Approved' : 'Pending'}
                        </span>
                        {item.isSuspended && (
                          <span className={styles.badgeDanger} style={{ background: 'rgba(239, 68, 68, 0.15)' }}>Suspended</span>
                        )}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {!isSuperAdmin && (
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            onClick={() => handleUpdateAccount(item.id || item._id, { approve: !item.isApproved })}
                            className={styles.btnSecondary}
                            style={{ 
                              padding: '6px 12px', 
                              fontSize: '12px', 
                              borderColor: item.isApproved ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)',
                              color: item.isApproved ? '#ef4444' : '#10b981'
                            }}
                          >
                            {item.isApproved ? <UserX size={13} style={{ marginRight: '4px' }} /> : <UserCheck size={13} style={{ marginRight: '4px' }} />}
                            {item.isApproved ? 'Revoke Access' : 'Approve Account'}
                          </button>
                          
                          <button
                            onClick={() => handleUpdateAccount(item.id || item._id, { suspend: !item.isSuspended })}
                            className={styles.btnSecondary}
                            style={{ 
                              padding: '6px 12px', 
                              fontSize: '12px',
                              color: '#ff6b00'
                            }}
                          >
                            {item.isSuspended ? 'Reactivate' : 'Suspend'}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
