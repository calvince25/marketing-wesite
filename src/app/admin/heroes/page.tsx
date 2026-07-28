'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../admin.module.css';
import { 
  Edit3, 
  Trash2, 
  X, 
  UploadCloud, 
  Image as ImageIcon,
  RotateCcw,
  Check,
  AlertCircle
} from 'lucide-react';

interface HeroConfig {
  id: string;
  _id: string;
  page: string;
  pageTitle: string;
  imageUrl: string;
  titleText: string;
  subtitleText: string;
}

export default function HeroesManager() {
  const [heroes, setHeroes] = useState<HeroConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Editor Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingHero, setEditingHero] = useState<HeroConfig | null>(null);

  // Form fields
  const [titleText, setTitleText] = useState('');
  const [subtitleText, setSubtitleText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchHeroes();
  }, []);

  async function fetchHeroes() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/admin/heroes');
      if (!res.ok) {
        throw new Error('Failed to fetch hero settings');
      }
      const data = await res.json();
      setHeroes(data.heroes || []);
    } catch (e: any) {
      console.error('Error fetching heroes:', e);
      setError(e.message || 'Error occurred while loading settings');
    } finally {
      setLoading(false);
    }
  }

  function handleOpenEdit(hero: HeroConfig) {
    setEditingHero(hero);
    setTitleText(hero.titleText || '');
    setSubtitleText(hero.subtitleText || '');
    setSelectedFile(null);
    setPreviewUrl(hero.imageUrl || null);
    setDrawerOpen(true);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleResetImage(pageName: string) {
    if (!confirm(`Are you sure you want to reset the hero image for "${pageName}" to the default gradient layout?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/heroes?page=${pageName}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to reset hero image');
      }

      setSuccessMsg(`Hero image for "${pageName}" successfully reset.`);
      setTimeout(() => setSuccessMsg(null), 3000);
      fetchHeroes();
    } catch (e: any) {
      alert(e.message || 'Failed to reset hero image');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingHero) return;

    setSaving(true);
    const formData = new FormData();
    formData.append('page', editingHero.page);
    formData.append('titleText', titleText);
    formData.append('subtitleText', subtitleText);
    
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      const res = await fetch('/api/admin/heroes', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update hero settings');
      }

      setSuccessMsg(`Successfully updated hero banner for "${editingHero.pageTitle}".`);
      setTimeout(() => setSuccessMsg(null), 3000);
      setDrawerOpen(false);
      fetchHeroes();
    } catch (e: any) {
      alert(e.message || 'Failed to save updates');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {/* 1. Header */}
      <div className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>Page Hero Images</h1>
          <p className={styles.pageSubtitle}>
            Configure edge-to-edge banners, headings, and upload high-resolution images from your device for the primary pages.
          </p>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMsg && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '15px 20px', borderRadius: '8px', marginBottom: '25px', fontSize: '14px', fontWeight: 500 }}>
          <Check size={18} />
          {successMsg}
        </div>
      )}

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '15px 20px', borderRadius: '8px', marginBottom: '25px', fontSize: '14px', fontWeight: 500 }}>
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* 2. Grid of Page Heroes */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading hero configurations...</div>
      ) : heroes.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No page configurations configured in database.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
          {heroes.map((hero) => {
            const hasImage = !!hero.imageUrl;
            return (
              <div key={hero.id || hero._id} className={styles.sectionCard} style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0', overflow: 'hidden' }}>
                
                {/* Hero Banner Preview */}
                <div style={{ height: '160px', position: 'relative', background: '#0a192f', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {hasImage ? (
                    <img 
                      src={hero.imageUrl} 
                      alt={hero.pageTitle} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.45' }}
                    />
                  ) : (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle, #112240 0%, #0a192f 100%)', opacity: 0.6 }} />
                  )}
                  {/* Subtle Dark Overlay */}
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(10,25,47,0.4) 0%, rgba(5,13,26,0.85) 100%)' }} />
                  
                  {/* Banner Content overlay */}
                  <div style={{ position: 'relative', zIndex: 2, padding: '20px', textAlign: 'center', color: 'white', maxWidth: '90%' }}>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#ff6b00', fontWeight: 700 }}>{hero.pageTitle}</span>
                    <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 700, marginTop: '5px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={hero.titleText}>
                      {hero.titleText}
                    </h3>
                  </div>
                </div>

                {/* Card Details */}
                <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ fontSize: '13px', color: '#94a3b8', flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '54px' }}>
                    {hero.subtitleText || <em style={{ color: '#475569' }}>No subtitle text</em>}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
                    <button 
                      onClick={() => handleOpenEdit(hero)}
                      className={styles.btnPrimary} 
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px', padding: '10px' }}
                    >
                      <Edit3 size={14} /> Edit Banner
                    </button>
                    {hasImage && (
                      <button 
                        onClick={() => handleResetImage(hero.page)}
                        className={styles.btnSecondary} 
                        style={{ border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', background: 'rgba(239, 68, 68, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', width: '40px' }}
                        title="Reset Image to default gradient"
                      >
                        <RotateCcw size={14} />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* 3. Editor Sliding Drawer */}
      {drawerOpen && editingHero && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '600px', height: '100%', background: '#070f1e', borderLeft: '1px solid rgba(255,107,0,0.15)', overflowY: 'auto', padding: '40px', display: 'flex', flexDirection: 'column' }} className="editor-drawer">
            
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#ff6b00', fontWeight: 600 }}>Configure Layout</span>
                <h2 style={{ color: 'white', fontSize: '20px', fontWeight: 700, marginTop: '4px' }}>
                  Edit {editingHero.pageTitle} Hero Banner
                </h2>
              </div>
              <button onClick={() => setDrawerOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px', flexGrow: 1 }}>
              
              {/* Title input */}
              <div className={styles.formGroup}>
                <label style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>Hero H1 Title *</label>
                <input
                  type="text"
                  required
                  placeholder="Insert primary headline text..."
                  className={styles.formInput}
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                  style={{ background: '#0d192d', color: 'white' }}
                />
              </div>

              {/* Subtitle textarea */}
              <div className={styles.formGroup}>
                <label style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>Hero Subtitle Paragraph</label>
                <textarea
                  placeholder="Insert introductory sub-paragraph..."
                  className={styles.formInput}
                  value={subtitleText}
                  onChange={(e) => setSubtitleText(e.target.value)}
                  style={{ background: '#0d192d', color: 'white', minHeight: '120px', resize: 'vertical' }}
                />
              </div>

              {/* Image upload / Preview */}
              <div className={styles.formGroup}>
                <label style={{ color: 'white', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Hero Image Banner</label>
                
                {/* Image Preview Container */}
                <div style={{ position: 'relative', width: '100%', height: '180px', borderRadius: '8px', background: '#0d192d', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Banner Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ color: '#475569', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                      <ImageIcon size={32} />
                      <span style={{ fontSize: '12px' }}>Gradient background is currently active</span>
                    </div>
                  )}
                  {previewUrl && (
                    <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', color: 'white', fontSize: '11px' }}>
                      Preview
                    </div>
                  )}
                </div>

                {/* Upload Input trigger */}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  style={{ display: 'none' }} 
                  onChange={handleFileChange}
                  accept="image/*"
                />
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={styles.btnSecondary}
                  style={{ width: '100%', border: '1px dashed rgba(255, 107, 0, 0.3)', color: '#ff6b00', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px', background: 'rgba(255,107,0,0.02)' }}
                >
                  <UploadCloud size={16} /> Choose Image from Device
                </button>
                <p style={{ color: '#64748b', fontSize: '11px', marginTop: '6px', textAlign: 'center' }}>
                  Supported formats: JPG, PNG, WEBP, GIF, SVG. Max 10MB.
                </p>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '15px', marginTop: 'auto', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <button 
                  type="button" 
                  onClick={() => setDrawerOpen(false)} 
                  className={styles.btnSecondary} 
                  style={{ flex: 1, padding: '12px' }}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.btnPrimary} 
                  style={{ flex: 2, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  disabled={saving}
                >
                  {saving ? 'Saving changes...' : 'Save Settings'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
