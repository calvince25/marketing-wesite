'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../admin.module.css';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  Image as ImageIcon,
  Check,
  ToggleLeft,
  ToggleRight,
  Upload
} from 'lucide-react';

interface Project {
  id: string;
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  fullDescription?: string;
  category?: string;
  technologies: string[];
  client: string;
  images: string[];
  projectLink?: string;
  githubLink?: string;
  featured: boolean;
  displayOrder?: number;
  status?: string;
  completionDate: string;
}

interface MediaAsset {
  id: string;
  fileName: string;
  fileUrl: string;
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Editor State
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [activeImageField, setActiveImageField] = useState<'thumbnail' | 'gallery'>('thumbnail');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [category, setCategory] = useState('');
  const [client, setClient] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [projectLink, setProjectLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [featured, setFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState('0');
  const [status, setStatus] = useState('Published');
  const [completionDate, setCompletionDate] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchMedia();
  }, []);

  // Auto-generate slug when name changes, if not editing
  useEffect(() => {
    if (!editingProject && name) {
      setSlug(
        name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/[\s_]+/g, '-')
          .replace(/-+/g, '-')
      );
    }
  }, [name, editingProject]);

  async function fetchProjects() {
    try {
      const res = await fetch(`/api/admin/projects?search=${search}`, { cache: 'no-store' });
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (e) {
      console.error('Error fetching projects:', e);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMedia() {
    try {
      const res = await fetch('/api/admin/media', { cache: 'no-store' });
      const data = await res.json();
      setMedia(data.media || []);
    } catch (e) {
      console.error('Error fetching media:', e);
    }
  }

  async function handleImageUpload(file: File, type: 'thumbnail' | 'gallery') {
    if (!file) return;
    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/admin/media', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        const uploadedUrl = data.media?.fileUrl || '';
        if (type === 'thumbnail') {
          setImageUrl(uploadedUrl);
        } else {
          setGalleryImages(prev => [...prev, uploadedUrl]);
        }
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
    setEditingProject(null);
    setName('');
    setSlug('');
    setDescription('');
    setFullDescription('');
    setCategory('');
    setClient('');
    setImageUrl('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80');
    setTechnologies('');
    setGalleryImages([]);
    setProjectLink('');
    setGithubLink('');
    setFeatured(false);
    setDisplayOrder('0');
    setStatus('Published');
    setCompletionDate(new Date().toISOString().split('T')[0]);
    setEditorOpen(true);
  }

  function handleOpenEdit(project: Project) {
    setEditingProject(project);
    setName(project.name);
    setSlug(project.slug?.current || '');
    setDescription(project.description);
    setFullDescription(project.fullDescription || project.description || '');
    setCategory(project.category || '');
    setClient(project.client);
    setImageUrl(project.images?.[0] || '');
    setTechnologies(project.technologies?.join(', ') || '');
    setGalleryImages(project.images?.slice(1) || []);
    setProjectLink(project.projectLink || '');
    setGithubLink(project.githubLink || '');
    setFeatured(project.featured);
    setDisplayOrder((project.displayOrder !== undefined ? project.displayOrder : 0).toString());
    setStatus(project.status || 'Published');
    setCompletionDate(project.completionDate || '');
    setEditorOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Slug validation
    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-');

    if (!cleanSlug) {
      alert('Please provide a valid slug');
      return;
    }

    const payload = {
      name,
      slug: cleanSlug,
      description,
      fullDescription: fullDescription || description,
      category: category || client || 'Project',
      client: client || 'Private Client',
      technologies: technologies,
      images: [imageUrl, ...galleryImages].filter(Boolean),
      projectLink,
      githubLink,
      featured,
      displayOrder: parseInt(displayOrder) || 0,
      status,
      completionDate
    };

    try {
      const url = editingProject ? `/api/admin/projects/${editingProject.id || editingProject._id}` : '/api/admin/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setEditorOpen(false);
        fetchProjects();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save project');
      }
    } catch (err) {
      console.error('Error saving project:', err);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProjects();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete');
      }
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  }

  function openMediaPicker(type: 'thumbnail' | 'gallery') {
    setActiveImageField(type);
    setMediaPickerOpen(true);
  }

  function handleSelectFromLibrary(url: string) {
    if (activeImageField === 'thumbnail') {
      setImageUrl(url);
    } else {
      setGalleryImages(prev => [...prev, url]);
    }
    setMediaPickerOpen(false);
  }

  return (
    <div>
      {/* 1. Header */}
      <div className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>Portfolio Projects</h1>
          <p className={styles.pageSubtitle}>Manage your case studies and portfolio client works.</p>
        </div>
        <button onClick={handleOpenCreate} className={styles.btnPrimary}>
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* 2. Filter / Search Bar */}
      <div className={styles.sectionCard} style={{ padding: '15px 25px', marginBottom: '25px' }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '15px', top: '15px', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search by name, client..."
              className={styles.formInput}
              style={{ width: '100%', paddingLeft: '45px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchProjects()}
            />
          </div>
          <button onClick={fetchProjects} className={styles.btnSecondary} style={{ padding: '12px 24px' }}>
            Filter
          </button>
        </div>
      </div>

      {/* 3. Projects Grid List */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading projects...</div>
      ) : projects.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No portfolio projects found.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
          {projects.map((project) => (
            <div key={project.id || project._id} className={styles.sectionCard} style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '180px', background: '#091324', position: 'relative' }}>
                <img 
                  src={project.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'} 
                  alt={project.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '8px' }}>
                  {project.featured && (
                    <span className={styles.badgeSuccess} style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>Featured</span>
                  )}
                  <span className={project.status === 'Draft' ? styles.badgeWarning : styles.badgeSuccess} style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>
                    {project.status || 'Published'}
                  </span>
                </div>
              </div>
              <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'white', fontSize: '18px', fontWeight: 700, margin: 0 }}>{project.name}</h3>
                <span style={{ fontSize: '12px', color: '#ff6b00', marginTop: '4px', fontWeight: 600 }}>Client: {project.client} | Category: {project.category || 'General'}</span>
                
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '15px 0 20px 0', lineBreak: 'anywhere' }}>
                  {project.description?.length > 120 ? project.description.substring(0, 120) + '...' : project.description}
                </p>

                {/* Tech tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {(project.technologies || []).map((tech, idx) => (
                    <span key={idx} style={{ background: 'rgba(255,255,255,0.04)', color: '#cbd5e1', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px', marginTop: 'auto' }}>
                  <span style={{ fontSize: '12px', color: '#475569' }}>Order: {project.displayOrder || 0}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleOpenEdit(project)} 
                      className={styles.btnSecondary} 
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id || project._id, project.name)} 
                      className={styles.signOutBtn} 
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Sliding Modal Editor Drawer */}
      {editorOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '800px', height: '100%', background: '#070f1e', borderLeft: '1px solid rgba(255,107,0,0.15)', overflowY: 'auto', padding: '40px' }} className="editor-drawer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: 'white', fontSize: '22px', fontWeight: 700 }}>
                {editingProject ? 'Edit Case Study' : 'Create Case Study'}
              </h2>
              <button onClick={() => setEditorOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className={styles.formGroup}>
                  <label>Project Name / Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter project name..."
                    className={styles.formInput}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Project Slug * (auto-generated, editable)</label>
                  <input
                    type="text"
                    required
                    placeholder="project-slug-format"
                    className={styles.formInput}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className={styles.formGroup}>
                  <label>Client Name (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Vogue Collections Kenya"
                    className={styles.formInput}
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Category (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. E-commerce, AI & Data"
                    className={styles.formInput}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '20px' }}>
                <div className={styles.formGroup}>
                  <label>Technologies Used * (comma separated)</label>
                  <input
                    type="text"
                    required
                    placeholder="Next.js, Node.js, Postgres, Zapier"
                    className={styles.formInput}
                    value={technologies}
                    onChange={(e) => setTechnologies(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Completion Date *</label>
                  <input
                    type="date"
                    required
                    className={styles.formInput}
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Display Order *</label>
                  <input
                    type="number"
                    required
                    className={styles.formInput}
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Featured Image / Thumbnail *</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'thumbnail')}
                />
                {imageUrl && (
                  <div style={{ position: 'relative', height: '180px', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px', border: '1px solid rgba(255,107,0,0.3)' }}>
                    <img src={imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button type="button" onClick={() => setImageUrl('')} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(239,68,68,0.9)', border: 'none', color: 'white', borderRadius: '4px', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                    onClick={() => openMediaPicker('thumbnail')} 
                    className={styles.btnSecondary}
                    style={{ padding: '12px 16px', fontSize: '12px' }}
                  >
                    <ImageIcon size={16} /> Library
                  </button>
                </div>
              </div>

              {/* Gallery upload */}
              <div className={styles.formGroup}>
                <label>Gallery Images (optional)</label>
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'gallery')}
                />
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px 0' }}>
                  {galleryImages.map((gImg, idx) => (
                    <div key={idx} style={{ position: 'relative', width: '120px', height: '80px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.05)' }}>
                      <img src={gImg} alt={`Gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button 
                        type="button" 
                        onClick={() => setGalleryImages(prev => prev.filter((_, i) => i !== idx))} 
                        style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(239,68,68,0.9)', border: 'none', color: 'white', borderRadius: '4px', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className={styles.btnSecondary}
                    style={{ flex: 1, padding: '10px' }}
                    disabled={uploadingImage}
                  >
                    <Upload size={14} /> Add Gallery Image
                  </button>
                  <button 
                    type="button" 
                    onClick={() => openMediaPicker('gallery')} 
                    className={styles.btnSecondary}
                    style={{ padding: '10px 16px', fontSize: '12px' }}
                  >
                    <ImageIcon size={14} /> Library
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr', gap: '20px' }}>
                <div className={styles.formGroup}>
                  <label>Project Status *</label>
                  <select
                    className={styles.formInput}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Live Demo URL (optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    className={styles.formInput}
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>GitHub Code Link (optional)</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    className={styles.formInput}
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                  />
                </div>
              </div>

              {/* Advanced toggles */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h5 style={{ color: 'white', margin: 0, fontSize: '13px' }}>Featured Project</h5>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>Showcase on the homepage</span>
                  </div>
                  <button type="button" onClick={() => setFeatured(!featured)} style={{ background: 'none', border: 'none', color: featured ? '#ff6b00' : '#475569', cursor: 'pointer' }}>
                    {featured ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Project Short Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. High-performance Next.js custom storefront."
                  className={styles.formInput}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Full Case Study Description / Writeup *</label>
                <textarea
                  rows={8}
                  required
                  placeholder="Enter dynamic page details, goals achieved, metrics..."
                  className={styles.formInput}
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button type="submit" className={styles.btnPrimary} style={{ flex: 1 }}>
                  Save Project
                </button>
                <button type="button" onClick={() => setEditorOpen(false)} className={styles.btnSecondary} style={{ width: '120px' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Central Media Selector */}
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
                    onClick={() => handleSelectFromLibrary(item.fileUrl)}
                    style={{ border: (activeImageField === 'thumbnail' ? imageUrl : galleryImages).includes(item.fileUrl) ? '2px solid #ff6b00' : '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', height: '100px', cursor: 'pointer', position: 'relative', background: '#030811' }}
                  >
                    <img 
                      src={item.fileUrl} 
                      alt={item.fileName} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    {(activeImageField === 'thumbnail' ? imageUrl === item.fileUrl : galleryImages.includes(item.fileUrl)) && (
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
