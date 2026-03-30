'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './blog-manager.module.css';

interface Post {
  _id: string;
  title: string;
  publishedAt: string;
  categories?: { title: string }[];
}

export default function BlogManagerPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/posts');
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Are you sure you want to permanently delete "${title}"? This cannot be undone.`)) return;

    setDeleting(id);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
          // If 404, it might already be gone, so we should still update local state
          if (res.status === 404) {
              setPosts(posts.filter(p => !p._id.includes(id.replace('drafts.', ''))));
              throw new Error(data.error || 'Post not found');
          }
          throw new Error(data.error || 'Failed to delete');
      }

      setSuccess(`"${title}" was deleted successfully.`);
      // Extract base ID to filter out both published and draft
      const baseId = id.startsWith('drafts.') ? id.substring(7) : id;
      setPosts(posts.filter(p => p._id !== baseId && p._id !== `drafts.${baseId}`));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Blog Manager</h1>
          <p className={styles.subtitle}>Manage your published blog posts.</p>
        </div>
        <div className={styles.actions}>
          <Link href="/studio/structure/post;__edit__new__post" className={styles.btnPrimary}>
            + New Post (Studio)
          </Link>
          <Link href="/admin/users" className={styles.btnOutline}>← Back to Admin</Link>
        </div>
      </div>

      {error && <div className={styles.alert + ' ' + styles.alertError}>{error}</div>}
      {success && <div className={styles.alert + ' ' + styles.alertSuccess}>{success}</div>}

      {loading ? (
        <div className={styles.loadingWrap}><div className={styles.spinner}></div><p>Loading posts...</p></div>
      ) : posts.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No blog posts found.</p>
          <Link href="/studio" className={styles.btnPrimary}>Open Sanity Studio to create posts</Link>
        </div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Title</span>
            <span>Published</span>
            <span>Categories</span>
            <span>Actions</span>
          </div>
          {posts.filter(p => !p._id.startsWith('drafts.')).map(post => (
            <div key={post._id} className={styles.tableRow}>
              <span className={styles.postTitle}>{post.title || 'Untitled'}</span>
              <span className={styles.postDate}>
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
              </span>
              <span className={styles.postCategories}>
                {post.categories?.map(c => c.title).join(', ') || '—'}
              </span>
              <div className={styles.rowActions}>
                <a
                  href={`/studio/structure/post;${post._id}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.btnEdit}
                >
                  Edit
                </a>
                <button
                  className={styles.btnDelete}
                  onClick={() => handleDelete(post._id, post.title)}
                  disabled={deleting === post._id}
                >
                  {deleting === post._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
