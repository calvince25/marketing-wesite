'use client';

import { useState, useEffect } from 'react';
import styles from './admin-legacy.module.css';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (loggedIn) {
      setIsLoggedIn(true);
      fetchPosts();
    }
  }, []);

  const handleLogin = () => {
    if (password === 'password') {
      sessionStorage.setItem('adminLoggedIn', 'true');
      setIsLoggedIn(true);
      fetchPosts();
    } else {
      setError('Invalid password');
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    // In a full implementation, we would use Supabase here.
    // For now, we'll show the hardcoded posts from the library to demonstrate the UI.
    // Since we're in 'Execution', we'll just mock the data fetch for the table view.
    try {
      // Mocking the behavior of admin.js
      const { blogPosts } = await import('@/lib/blog');
      setPosts(blogPosts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className={styles.loginOverlay}>
        <div className={styles.loginBox}>
          <h2>Admin Login</h2>
          <p>Please enter your password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleLogin}>
            Login
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1>Blog Management</h1>
        <button className="btn btn-primary">New Post</button>
      </div>

      <div className={styles.card}>
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{post.title}</td>
                  <td>{post.category}</td>
                  <td>{post.date}</td>
                  <td>
                    <button className="btn btn-outline" style={{ marginRight: '5px', padding: '5px 10px' }}>Edit</button>
                    <button className="btn btn-outline" style={{ border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '5px 10px' }}>Delete</button>
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
