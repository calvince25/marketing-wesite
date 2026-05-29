'use client';

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';
import { 
  UploadCloud, 
  Search, 
  Trash2, 
  Copy, 
  Check,
  FileIcon
} from 'lucide-react';

interface MediaAsset {
  id: string;
  _id: string;
  fileName: string;
  uniqueName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export default function MediaLibrary() {
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Drag and drop / uploading states
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
    try {
      const res = await fetch(`/api/admin/media?search=${search}`);
      const data = await res.json();
      setMedia(data.media || []);
    } catch (e) {
      console.error('Error fetching media:', e);
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(file: File) {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        fetchMedia();
      } else {
        const err = await res.json();
        alert(err.error || 'Upload failed');
      }
    } catch (e) {
      console.error('Upload error:', e);
    } finally {
      setUploading(false);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete file "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/media?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchMedia();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete file');
      }
    } catch (e) {
      console.error('Delete file error:', e);
    }
  }

  function handleCopyUrl(url: string, id: string) {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function formatBytes(bytes: number) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 1;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  return (
    <div>
      {/* 1. Header */}
      <div className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>Media Library</h1>
          <p className={styles.pageSubtitle}>Upload, search, reuse, and delete images or documents for articles and case studies.</p>
        </div>
      </div>

      {/* 2. Drag & Drop Upload Zone */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ 
          border: dragOver ? '2px dashed #ff6b00' : '2px dashed rgba(255, 255, 255, 0.1)', 
          background: dragOver ? 'rgba(255, 107, 0, 0.05)' : 'rgba(17, 34, 64, 0.4)', 
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          cursor: 'pointer',
          marginBottom: '35px',
          transition: 'all 0.3s ease'
        }}
      >
        <input 
          type="file" 
          id="fileInput" 
          style={{ display: 'none' }} 
          onChange={handleFileInputChange}
          disabled={uploading}
        />
        <label htmlFor="fileInput" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <UploadCloud size={48} style={{ color: '#ff6b00', opacity: uploading ? 0.5 : 1 }} />
          <div>
            <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 600 }}>
              {uploading ? 'Optimizing & Uploading...' : 'Drag & Drop File Here'}
            </h3>
            <p style={{ color: '#64748b', fontSize: '13px', marginTop: '5px' }}>
              Supports JPG, PNG, GIF, SVG, WEBP, or PDF up to 10MB.
            </p>
          </div>
          <span className={styles.btnPrimary} style={{ padding: '8px 20px', fontSize: '12px' }}>
            Browse Files
          </span>
        </label>
      </div>

      {/* 3. Search Panel */}
      <div className={styles.sectionCard} style={{ padding: '15px 25px', marginBottom: '25px' }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '15px', top: '15px', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search assets by file name..."
              className={styles.formInput}
              style={{ width: '100%', paddingLeft: '45px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchMedia()}
            />
          </div>
          <button onClick={fetchMedia} className={styles.btnSecondary} style={{ padding: '12px 24px' }}>
            Filter
          </button>
        </div>
      </div>

      {/* 4. Media Grid Display */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading media files...</div>
      ) : media.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No media assets found.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
          {media.map((asset) => {
            const isImage = asset.mimeType.startsWith('image/');
            return (
              <div key={asset.id || asset._id} className={styles.mediaCard}>
                {/* Preview */}
                <div className={styles.mediaPreview}>
                  {isImage ? (
                    <img 
                      src={asset.fileUrl} 
                      alt={asset.fileName} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ color: '#475569', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <FileIcon size={32} />
                      <span style={{ fontSize: '10px' }}>{asset.mimeType.split('/')[1]?.toUpperCase()}</span>
                    </div>
                  )}
                  
                  {/* Delete Overlay button */}
                  <button 
                    onClick={() => handleDelete(asset.id || asset._id, asset.fileName)} 
                    style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(239, 68, 68, 0.9)', color: 'white', border: 'none', borderRadius: '4px', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: 0.8, transition: 'all 0.3s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                {/* Info & Copy */}
                <div className={styles.mediaInfo}>
                  <div className={styles.mediaTitle} title={asset.fileName}>{asset.fileName}</div>
                  <div className={styles.mediaMeta}>Size: {formatBytes(asset.fileSize)}</div>
                  
                  <button
                    onClick={() => handleCopyUrl(asset.fileUrl, asset.id || asset._id)}
                    className={styles.btnSecondary}
                    style={{ width: '100%', marginTop: '10px', padding: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
                  >
                    {copiedId === (asset.id || asset._id) ? (
                      <>
                        <Check size={12} style={{ color: '#10b981' }} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> Copy URL
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
