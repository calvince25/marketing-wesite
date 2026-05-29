'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../admin.module.css';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  X, 
  Image as ImageIcon,
  Check,
  Upload
} from 'lucide-react';

interface Post {
  id: string;
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  categorySlug: string;
  excerpt: string;
  content: string;
  image: string;
  status: 'draft' | 'published' | 'scheduled';
  publishedAt: string;
  scheduledFor?: string;
  author?: {
    name: string;
    bio: string;
    image: string;
  };
  seo?: {
    metaTitle: string;
    metaDescription: string;
  };
}

interface MediaAsset {
  id: string;
  fileName: string;
  fileUrl: string;
}

export default function BlogsManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Editor State
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('AI Marketing');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft');
  const [scheduledFor, setScheduledFor] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorBio, setAuthorBio] = useState('');
  const [authorImage, setAuthorImage] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  // Auto slug generation
  const [slugPreview, setSlugPreview] = useState('');

  useEffect(() => {
    fetchPosts();
    fetchMedia();
  }, []);

  useEffect(() => {
    if (title) {
      setSlugPreview(
        title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/[\s_]+/g, '-')
          .replace(/-+/g, '-')
      );
    } else {
      setSlugPreview('');
    }
  }, [title]);

  async function fetchPosts() {
    try {
      const res = await fetch(`/api/admin/posts?search=${search}`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (e) {
      console.error('Error fetching posts:', e);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMedia() {
    try {
      const res = await fetch('/api/admin/media');
      const data = await res.json();
      setMedia(data.media || []);
    } catch (e) {
      console.error('Error fetching media:', e);
    }
  }

  async function handleImageUpload(file: File) {
    if (!file) return;
    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/admin/media', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        setImage(data.media?.fileUrl || '');
        fetchMedia();
      } else {
        alert('Image upload failed. Please try again.');
      }
    } catch (e) {
      console.error('Upload error:', e);
    } finally {
      setUploadingImage(false);
    }
  }

  function handleOpenCreate() {
    setEditingPost(null);
    setTitle('');
    setContent('');
    setExcerpt('');
    setCategory('AI Marketing');
    setImage('https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80');
    setStatus('draft');
    setScheduledFor('');
    setAuthorName('');
    setAuthorBio('');
    setAuthorImage('');
    setSeoTitle('');
    setSeoDescription('');
    setEditorOpen(true);
  }

  function handleOpenEdit(post: Post) {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setExcerpt(post.excerpt);
    setCategory(post.category);
    setImage(post.image);
    setStatus(post.status);
    setScheduledFor(post.scheduledFor || '');
    setAuthorName(post.author?.name || '');
    setAuthorBio(post.author?.bio || '');
    setAuthorImage(post.author?.image || '');
    setSeoTitle(post.seo?.metaTitle || '');
    setSeoDescription(post.seo?.metaDescription || '');
    setEditorOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title,
      content,
      excerpt,
      category,
      image,
      status,
      scheduledFor,
      authorName,
      authorBio,
      authorImage,
      seoTitle,
      seoDescription
    };

    try {
      const url = editingPost ? `/api/admin/posts/${editingPost.id || editingPost._id}` : '/api/admin/posts';
      const method = editingPost ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setEditorOpen(false);
        fetchPosts();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save post');
      }
    } catch (err) {
      console.error('Error saving post:', err);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPosts();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  }

  return (
    <div>
      {/* 1. Header */}
      <div className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>Blog Manager</h1>
          <p className={styles.pageSubtitle}>Create, update, and schedule articles for the Growth Insights blog.</p>
        </div>
        <button onClick={handleOpenCreate} className={styles.btnPrimary}>
          <Plus size={16} /> New Article
        </button>
      </div>

      {/* 2. Filter / Search Bar */}
      <div className={styles.sectionCard} style={{ padding: '15px 25px', marginBottom: '25px' }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '15px', top: '15px', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search posts..."
              className={styles.formInput}
              style={{ width: '100%', paddingLeft: '45px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchPosts()}
            />
          </div>
          <button onClick={fetchPosts} className={styles.btnSecondary} style={{ padding: '12px 24px' }}>
            Filter
          </button>
        </div>
      </div>

      {/* 3. Blogs Table List */}
      <div className={styles.sectionCard} style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading blogs...</div>
        ) : posts.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No blog posts found.</div>
        ) : (
          <table className={styles.customTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Published Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const slug = post.slug?.current || '';
                return (
                  <tr key={post.id || post._id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'white' }}>{post.title}</div>
                      <div style={{ fontSize: '11px', color: '#475569', marginTop: '3px' }}>
                        {slug ? `/blog/${post.categorySlug}/${slug}` : '—'}
                      </div>
                    </td>
                    <td><span style={{ color: '#ff6b00', fontWeight: 500 }}>{post.category}</span></td>
                    <td>
                      <span className={`${styles.badge} ${
                        post.status === 'published' ? styles.badgeSuccess : 
                        post.status === 'scheduled' ? styles.badgeWarning : styles.badgeDanger
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td>
                      {post.status === 'published' && post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : post.status === 'scheduled' && post.scheduledFor
                        ? `Scheduled: ${new Date(post.scheduledFor).toLocaleDateString()}`
                        : 'Draft'}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button 
                          onClick={() => handleOpenEdit(post)} 
                          className={styles.btnSecondary} 
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          <Edit3 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(post.id || post._id, post.title)} 
                          className={styles.signOutBtn} 
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          <Trash2 size={14} />
                        </button>
                        {post.status === 'published' && (
                          <a 
                            href={`/blog/${post.categorySlug}/${slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.btnSecondary}
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* 4. Sliding Modal/Drawer Editor Form */}
      {editorOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '800px', height: '100%', background: '#070f1e', borderLeft: '1px solid rgba(255,107,0,0.15)', overflowY: 'auto', padding: '40px' }} className="editor-drawer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: 'white', fontSize: '22px', fontWeight: 700 }}>
                {editingPost ? 'Edit Blog Article' : 'Compose Blog Article'}
              </h2>
              <button onClick={() => setEditorOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className={styles.formGroup}>
                <label>Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter a catchy title..."
                  className={styles.formInput}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {slugPreview && (
                  <span style={{ fontSize: '11px', color: '#ff6b00', marginTop: '4px' }}>
                    Slug: <strong>{slugPreview}</strong>
                  </span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className={styles.formGroup}>
                  <label>Category *</label>
                  <select
                    className={styles.formInput}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="AI Marketing">AI Marketing</option>
                    <option value="SEO & Digital Marketing">SEO & Digital Marketing</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Business Automation">Business Automation</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Publish Status *</label>
                  <select
                    className={styles.formInput}
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>

              {status === 'scheduled' && (
                <div className={styles.formGroup}>
                  <label>Scheduled Publication Date *</label>
                  <input
                    type="datetime-local"
                    required
                    className={styles.formInput}
                    value={scheduledFor}
                    onChange={(e) => setScheduledFor(e.target.value)}
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <label>Featured Image *</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                />
                {image && (
                  <div style={{ position: 'relative', height: '180px', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px', border: '1px solid rgba(255,107,0,0.3)' }}>
                    <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button type="button" onClick={() => setImage('')} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(239,68,68,0.9)', border: 'none', color: 'white', borderRadius: '4px', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <X size={14} />
                    </button>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={styles.btnPrimary}
                    style={{ flex: 1, padding: '12px' }}
                    disabled={uploadingImage}
                  >
                    <Upload size={16} />
                    {uploadingImage ? 'Uploading...' : 'Upload from Device'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setMediaPickerOpen(true)} 
                    className={styles.btnSecondary}
                    style={{ padding: '12px 16px', fontSize: '12px' }}
                  >
                    <ImageIcon size={16} /> Library
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Short Excerpt (SEO Meta Description Summary)</label>
                <textarea
                  rows={2}
                  placeholder="Enter a brief summary for previews..."
                  className={styles.formInput}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Article Content (supports Markdown/HTML) *</label>
                <textarea
                  rows={15}
                  required
                  placeholder="Draft your brilliant ideas here..."
                  className={styles.formInput}
                  style={{ fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.5' }}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Author Settings Card */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '20px', marginTop: '10px' }}>
                <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '14px', fontWeight: 600 }}>Author Profile override</h4>
                <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className={styles.formGroup}>
                      <label>Author Name</label>
                      <input
                        type="text"
                        placeholder="Calvince Omondi"
                        className={styles.formInput}
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Author Profile Picture URL</label>
                      <input
                        type="text"
                        placeholder="https://..."
                        className={styles.formInput}
                        value={authorImage}
                        onChange={(e) => setAuthorImage(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Author Bio</label>
                    <input
                      type="text"
                      placeholder="Founder and Lead Architect..."
                      className={styles.formInput}
                      value={authorBio}
                      onChange={(e) => setAuthorBio(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* SEO Configurations Card */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '20px' }}>
                <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '14px', fontWeight: 600 }}>SEO Metadata override</h4>
                <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
                  <div className={styles.formGroup}>
                    <label>SEO Meta Title</label>
                    <input
                      type="text"
                      placeholder="Catchy Title | GrowthLab"
                      className={styles.formInput}
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>SEO Meta Description</label>
                    <textarea
                      rows={2}
                      placeholder="Override meta description..."
                      className={styles.formInput}
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button type="submit" className={styles.btnPrimary} style={{ flex: 1 }}>
                  Save Article
                </button>
                <button type="button" onClick={() => setEditorOpen(false)} className={styles.btnSecondary} style={{ width: '120px' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Central Media Selector Modal Overlay */}
      {mediaPickerOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '600px', background: '#070f1e', border: '1px solid rgba(255,107,0,0.15)', borderRadius: '12px', padding: '30px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: 'white', fontSize: '18px', fontWeight: 700 }}>Choose from Media Library</h3>
              <button onClick={() => setMediaPickerOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', padding: '5px' }}>
              {media.length === 0 ? (
                <div style={{ gridColumn: 'span 3', padding: '40px', textAlign: 'center', color: '#64748b' }}>
                  No media uploaded yet.
                </div>
              ) : (
                media.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => { setImage(item.fileUrl); setMediaPickerOpen(false); }}
                    style={{ border: image === item.fileUrl ? '2px solid #ff6b00' : '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', height: '100px', cursor: 'pointer', position: 'relative', background: '#030811' }}
                  >
                    <img 
                      src={item.fileUrl} 
                      alt={item.fileName} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    {image === item.fileUrl && (
                      <div style={{ position: 'absolute', top: '5px', right: '5px', background: '#ff6b00', color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={10} />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button onClick={() => setMediaPickerOpen(false)} className={styles.btnSecondary}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
