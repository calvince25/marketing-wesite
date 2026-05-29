'use client';

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';
import { 
  Check, 
  X, 
  Star, 
  Trash2, 
  Edit3, 
  Plus
} from 'lucide-react';

interface Review {
  id: string;
  _id: string;
  name: string;
  business: string;
  rating: number;
  message: string;
  dateSubmitted: string;
  isApproved: boolean;
  isFeatured: boolean;
}

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Editor State
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const res = await fetch('/api/admin/reviews');
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (e) {
      console.error('Error fetching reviews:', e);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenCreate() {
    setEditingReview(null);
    setName('');
    setBusiness('');
    setRating(5);
    setMessage('');
    setIsApproved(true); // Manually added reviews are approved by default
    setIsFeatured(false);
    setEditorOpen(true);
  }

  function handleOpenEdit(rev: Review) {
    setEditingReview(rev);
    setName(rev.name);
    setBusiness(rev.business);
    setRating(rev.rating);
    setMessage(rev.message);
    setIsApproved(rev.isApproved);
    setIsFeatured(rev.isFeatured);
    setEditorOpen(true);
  }

  async function handleQuickApprove(rev: Review, approveState: boolean) {
    try {
      const res = await fetch(`/api/admin/reviews/${rev.id || rev._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: approveState })
      });

      if (res.ok) {
        fetchReviews();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to update review status');
      }
    } catch (e) {
      console.error('Error updating review:', e);
    }
  }

  async function handleQuickFeature(rev: Review, featureState: boolean) {
    try {
      const res = await fetch(`/api/admin/reviews/${rev.id || rev._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: featureState })
      });

      if (res.ok) {
        fetchReviews();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to update featured status');
      }
    } catch (e) {
      console.error('Error updating review:', e);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      name,
      business,
      rating,
      message,
      isApproved,
      isFeatured
    };

    try {
      const url = editingReview ? `/api/admin/reviews/${editingReview.id || editingReview._id}` : '/api/admin/reviews';
      const method = editingReview ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setEditorOpen(false);
        fetchReviews();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save review');
      }
    } catch (err) {
      console.error('Error saving review:', err);
    }
  }

  async function handleDelete(id: string, clientName: string) {
    if (!confirm(`Are you sure you want to permanently delete review from "${clientName}"?`)) return;

    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchReviews();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete review');
      }
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  }

  return (
    <div>
      {/* 1. Header */}
      <div className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>Client Testimonials</h1>
          <p className={styles.pageSubtitle}>Review and approve client feedback submitted from contact queries, or create custom reviews.</p>
        </div>
        <button onClick={handleOpenCreate} className={styles.btnPrimary}>
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {/* 2. Reviews Table */}
      <div className={styles.sectionCard} style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading feedback...</div>
        ) : reviews.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No client testimonials found.</div>
        ) : (
          <table className={styles.customTable}>
            <thead>
              <tr>
                <th>Client</th>
                <th>Rating</th>
                <th>Message</th>
                <th>Status</th>
                <th>Featured</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev) => (
                <tr key={rev.id || rev._id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'white' }}>{rev.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{rev.business}</div>
                    <div style={{ fontSize: '10px', color: '#475569', marginTop: '2px' }}>Submitted: {rev.dateSubmitted}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', color: '#f59e0b', gap: '2px' }}>
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={13} fill="#f59e0b" />
                      ))}
                    </div>
                  </td>
                  <td style={{ maxWidth: '300px' }}>
                    <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.4', lineBreak: 'anywhere' }}>
                      {rev.message.length > 150 ? rev.message.substring(0, 150) + '...' : rev.message}
                    </p>
                  </td>
                  <td>
                    <button
                      onClick={() => handleQuickApprove(rev, !rev.isApproved)}
                      className={`${styles.badge} ${rev.isApproved ? styles.badgeSuccess : styles.badgeDanger}`}
                      style={{ border: 'none', cursor: 'pointer' }}
                    >
                      {rev.isApproved ? 'Approved' : 'Pending'}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleQuickFeature(rev, !rev.isFeatured)}
                      className={`${styles.badge} ${rev.isFeatured ? styles.badgeSuccess : styles.badgeWarning}`}
                      style={{ border: 'none', cursor: 'pointer' }}
                    >
                      {rev.isFeatured ? 'Featured' : 'Standard'}
                    </button>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleOpenEdit(rev)} 
                        className={styles.btnSecondary} 
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        <Edit3 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(rev.id || rev._id, rev.name)} 
                        className={styles.signOutBtn} 
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 3. Editor Sliding Modal Overlay */}
      {editorOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '600px', height: '100%', background: '#070f1e', borderLeft: '1px solid rgba(255,107,0,0.15)', overflowY: 'auto', padding: '40px' }} className="editor-drawer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: 'white', fontSize: '22px', fontWeight: 700 }}>
                {editingReview ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button onClick={() => setEditorOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className={styles.formGroup}>
                <label>Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  className={styles.formInput}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Business / Role *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CEO at Vogue Collections"
                  className={styles.formInput}
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className={styles.formGroup}>
                  <label>Rating (1 - 5 stars) *</label>
                  <select
                    className={styles.formInput}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>

                <div className={styles.formGroup} style={{ justifyContent: 'center', paddingTop: '20px' }}>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'white' }}>
                      <input 
                        type="checkbox" 
                        checked={isApproved} 
                        onChange={(e) => setIsApproved(e.target.checked)} 
                        style={{ accentColor: '#ff6b00', width: '16px', height: '16px' }}
                      />
                      Approved
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'white' }}>
                      <input 
                        type="checkbox" 
                        checked={isFeatured} 
                        onChange={(e) => setIsFeatured(e.target.checked)} 
                        style={{ accentColor: '#ff6b00', width: '16px', height: '16px' }}
                      />
                      Featured
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Testimonial Feedback Message *</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Enter client review details..."
                  className={styles.formInput}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button type="submit" className={styles.btnPrimary} style={{ flex: 1 }}>
                  Save Testimonial
                </button>
                <button type="button" onClick={() => setEditorOpen(false)} className={styles.btnSecondary} style={{ width: '120px' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
