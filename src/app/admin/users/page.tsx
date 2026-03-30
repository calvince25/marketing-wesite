'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../admin-legacy/admin-legacy.module.css';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users'); // Need to create this API
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUsers(data.users);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (userId: string, approve: boolean) => {
    try {
      const res = await fetch('/api/admin/users/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, approve }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      fetchUsers(); // Refresh list
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading users...</div>;

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1>User Management</h1>
        <Link href="/admin" className="btn btn-outline">Back to Studio</Link>
      </div>

      <div className={styles.card}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td style={{ fontWeight: 600 }}>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${user.isApproved ? styles.statusApproved : styles.statusPending}`}>
                      {user.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    {!user.isAdmin && (
                      <button 
                        className="btn btn-outline" 
                        style={{ 
                          padding: '8px 16px', 
                          fontSize: '12px',
                          borderColor: user.isApproved ? '#c53030' : '#2c7a7b',
                          color: user.isApproved ? '#c53030' : '#2c7a7b'
                        }}
                        onClick={() => handleApprove(user._id, !user.isApproved)}
                      >
                        {user.isApproved ? 'Revoke' : 'Approve'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
