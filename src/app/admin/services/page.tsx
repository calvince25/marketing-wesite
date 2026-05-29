'use client';

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Cluster {
  title: string;
  slug: string;
  description: string;
  content: string;
}

interface Service {
  id: string;
  _id: string;
  title: string;
  name: string;
  slug: { current: string };
  h1: string;
  description: string;
  overview: string;
  benefits: string[];
  process: { step: string; detail: string }[];
  faqs: { q: string; a: string }[];
  clusters: Cluster[];
  cta: {
    title: string;
    text: string;
    buttonText: string;
    buttonLink: string;
  };
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pillars' | 'clusters'>('pillars');
  
  // Editor State
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [h1, setH1] = useState('');
  const [description, setDescription] = useState('');
  const [overview, setOverview] = useState('');
  
  // Dynamic lists
  const [benefits, setBenefits] = useState<string[]>([]);
  const [process, setProcess] = useState<{ step: string; detail: string }[]>([]);
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>([]);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [cta, setCta] = useState({ title: '', text: '', buttonText: '', buttonLink: '' });

  // Tmp inputs for dynamic lists
  const [newBenefit, setNewBenefit] = useState('');
  const [newStep, setNewStep] = useState('');
  const [newDetail, setNewDetail] = useState('');
  const [newQ, setNewQ] = useState('');
  const [newA, setNewA] = useState('');

  // Cluster Specific Form Inputs (inside Pillar Editor)
  const [clusterTitle, setClusterTitle] = useState('');
  const [clusterDescription, setClusterDescription] = useState('');
  const [clusterContent, setClusterContent] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      setServices(data.services || []);
    } catch (e) {
      console.error('Error fetching services:', e);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenCreate() {
    setEditingService(null);
    setTitle('');
    setH1('');
    setDescription('');
    setOverview('');
    setBenefits([]);
    setProcess([]);
    setFaqs([]);
    setClusters([]);
    setCta({ title: 'Ready to scale your business?', text: 'Contact GrowthLab today for a bespoke digital marketing consultation.', buttonText: 'Book Call', buttonLink: '/contact' });
    setEditorOpen(true);
  }

  function handleOpenEdit(srv: Service) {
    setEditingService(srv);
    setTitle(srv.title || srv.name);
    setH1(srv.h1 || '');
    setDescription(srv.description || '');
    setOverview(srv.overview || '');
    setBenefits(srv.benefits || []);
    setProcess(srv.process || []);
    setFaqs(srv.faqs || []);
    setClusters(srv.clusters || []);
    setCta(srv.cta || { title: '', text: '', buttonText: '', buttonLink: '' });
    setEditorOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title,
      h1,
      description,
      overview,
      benefits,
      process,
      faqs,
      clusters,
      cta
    };

    try {
      const url = editingService ? `/api/admin/services/${editingService.id || editingService._id}` : '/api/admin/services';
      const method = editingService ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setEditorOpen(false);
        fetchServices();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save service');
      }
    } catch (err) {
      console.error('Error saving service:', err);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete service "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchServices();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete');
      }
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  }

  // Dynamic Lists modification helpers
  function addBenefit() {
    if (newBenefit.trim()) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit('');
    }
  }

  function addStep() {
    if (newStep.trim() && newDetail.trim()) {
      setProcess([...process, { step: newStep.trim(), detail: newDetail.trim() }]);
      setNewStep('');
      setNewDetail('');
    }
  }

  function addFaq() {
    if (newQ.trim() && newA.trim()) {
      setFaqs([...faqs, { q: newQ.trim(), a: newA.trim() }]);
      setNewQ('');
      setNewA('');
    }
  }

  function addCluster() {
    if (clusterTitle.trim() && clusterDescription.trim()) {
      const slug = clusterTitle.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-');
      setClusters([...clusters, { title: clusterTitle.trim(), slug, description: clusterDescription.trim(), content: clusterContent || '' }]);
      setClusterTitle('');
      setClusterDescription('');
      setClusterContent('');
    }
  }

  return (
    <div>
      {/* 1. Header */}
      <div className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>Services Management</h1>
          <p className={styles.pageSubtitle}>Manage service pillars (Main Categories) and sub-service clusters (Specific offerings).</p>
        </div>
        <button onClick={handleOpenCreate} className={styles.btnPrimary}>
          <Plus size={16} /> New Service Pillar
        </button>
      </div>

      {/* 2. Services Display */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading services...</div>
      ) : services.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No service pillars created yet. Click "New Service Pillar" to begin.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {services.map((srv) => (
            <div key={srv.id || srv._id} className={styles.sectionCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ color: 'white', fontSize: '20px', fontWeight: 700, margin: 0 }}>{srv.title || srv.name}</h2>
                  <span style={{ fontSize: '12px', color: '#ff6b00', marginTop: '4px', fontWeight: 600 }}>
                    Slug: /services/{typeof srv.slug === 'string' ? srv.slug : srv.slug?.current}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleOpenEdit(srv)} 
                    className={styles.btnSecondary} 
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                  >
                    <Edit3 size={14} /> Edit Pillar
                  </button>
                  <button 
                    onClick={() => handleDelete(srv.id || srv._id, srv.title || srv.name)} 
                    className={styles.signOutBtn} 
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                {/* Details */}
                <div>
                  <h4 style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Description</h4>
                  <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6' }}>{srv.description}</p>

                  <h4 style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', marginTop: '20px', marginBottom: '8px' }}>Benefits</h4>
                  <ul style={{ paddingLeft: '15px', listStyleType: 'disc', fontSize: '13px', color: '#cbd5e1' }}>
                    {srv.benefits?.map((b, i) => <li key={i} style={{ marginBottom: '4px' }}>{b}</li>)}
                  </ul>
                </div>

                {/* Sub Services (Clusters) list */}
                <div style={{ background: 'rgba(0,0,0,0.15)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <h3 style={{ color: 'white', fontSize: '15px', fontWeight: 600, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={16} /> Cluster Sub-Services ({srv.clusters?.length || 0})
                  </h3>
                  {srv.clusters && srv.clusters.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {srv.clusters.map((c, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 18px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
                          <div style={{ fontWeight: 600, color: 'white', fontSize: '14px' }}>{c.title}</div>
                          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{c.description}</p>
                          <div style={{ fontSize: '11px', color: '#ff6b00', marginTop: '4px', fontWeight: 500 }}>
                            URL: /services/{typeof srv.slug === 'string' ? srv.slug : srv.slug?.current}/{c.slug}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: '12px', color: '#475569', textAlign: 'center', padding: '15px' }}>
                      No cluster sub-services defined for this pillar.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Editor Sliding Drawer */}
      {editorOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '850px', height: '100%', background: '#070f1e', borderLeft: '1px solid rgba(255,107,0,0.15)', overflowY: 'auto', padding: '40px' }} className="editor-drawer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: 'white', fontSize: '22px', fontWeight: 700 }}>
                {editingService ? 'Edit Service Pillar' : 'Create Service Pillar'}
              </h2>
              <button onClick={() => setEditorOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className={styles.formGroup}>
                <label>Pillar Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Web Development"
                  className={styles.formInput}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Hero H1 Heading</label>
                <input
                  type="text"
                  placeholder="e.g. Elite Web Development Services in Kenya"
                  className={styles.formInput}
                  value={h1}
                  onChange={(e) => setH1(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Short Description (SEO Meta Description summary)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summarize the pillar service offerings..."
                  className={styles.formInput}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Overview Body Content (Detailed text for the page)</label>
                <textarea
                  rows={5}
                  placeholder="Explain details of this service..."
                  className={styles.formInput}
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                />
              </div>

              {/* Dynamic Benefits Manager */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '14px', fontWeight: 600 }}>Core Benefits Checklist</h4>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                  <input
                    type="text"
                    placeholder="Add benefit..."
                    className={styles.formInput}
                    style={{ flex: 1 }}
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                  />
                  <button type="button" onClick={addBenefit} className={styles.btnPrimary} style={{ padding: '12px' }}>Add</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {benefits.map((b, idx) => (
                    <span key={idx} style={{ background: 'rgba(255,107,0,0.1)', color: '#ff6b00', border: '1px solid rgba(255,107,0,0.2)', fontSize: '12px', padding: '4px 10px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      {b}
                      <X size={12} style={{ cursor: 'pointer' }} onClick={() => setBenefits(benefits.filter((_, i) => i !== idx))} />
                    </span>
                  ))}
                </div>
              </div>

              {/* Dynamic FAQ list */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '14px', fontWeight: 600 }}>Frequently Asked Questions (FAQ Schema Generated)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
                  <input
                    type="text"
                    placeholder="Question..."
                    className={styles.formInput}
                    value={newQ}
                    onChange={(e) => setNewQ(e.target.value)}
                  />
                  <textarea
                    rows={2}
                    placeholder="Answer..."
                    className={styles.formInput}
                    value={newA}
                    onChange={(e) => setNewA(e.target.value)}
                  />
                  <button type="button" onClick={addFaq} className={styles.btnPrimary} style={{ alignSelf: 'flex-end' }}>Add FAQ</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {faqs.map((f, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: 'white', fontSize: '13px' }}>Q: {f.q}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>A: {f.a}</div>
                      </div>
                      <X size={16} style={{ color: '#ef4444', cursor: 'pointer', marginLeft: '10px' }} onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Clusters Sub Services Manager */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '14px', fontWeight: 600 }}>Cluster Sub-Services (Dynamic SEO sitemaps generated)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
                  <input
                    type="text"
                    placeholder="Cluster Title (e.g. Custom Web Applications)..."
                    className={styles.formInput}
                    value={clusterTitle}
                    onChange={(e) => setClusterTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Short description..."
                    className={styles.formInput}
                    value={clusterDescription}
                    onChange={(e) => setClusterDescription(e.target.value)}
                  />
                  <textarea
                    rows={4}
                    placeholder="Detailed page content writeup (HTML/Markdown support)..."
                    className={styles.formInput}
                    value={clusterContent}
                    onChange={(e) => setClusterContent(e.target.value)}
                  />
                  <button type="button" onClick={addCluster} className={styles.btnPrimary} style={{ alignSelf: 'flex-end' }}>Add Cluster</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {clusters.map((c, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: 'white', fontSize: '13px' }}>{c.title}</div>
                        <div style={{ fontSize: '11px', color: '#ff6b00' }}>Slug: /{c.slug}</div>
                      </div>
                      <X size={16} style={{ color: '#ef4444', cursor: 'pointer' }} onClick={() => setClusters(clusters.filter((_, i) => i !== idx))} />
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA configuration */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '14px', fontWeight: 600 }}>Call to Action (CTA) Box config</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div className={styles.formGroup}>
                    <label>CTA Title</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={cta.title}
                      onChange={(e) => setCta({ ...cta, title: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>CTA Button Text</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={cta.buttonText}
                      onChange={(e) => setCta({ ...cta, buttonText: e.target.value })}
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px' }}>
                  <div className={styles.formGroup}>
                    <label>CTA Sub-Text</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={cta.text}
                      onChange={(e) => setCta({ ...cta, text: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>CTA Button Link</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={cta.buttonLink}
                      onChange={(e) => setCta({ ...cta, buttonLink: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button type="submit" className={styles.btnPrimary} style={{ flex: 1 }}>
                  Save Service Pillar
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
