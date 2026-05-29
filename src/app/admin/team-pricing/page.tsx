'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../admin.module.css';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  Users, 
  DollarSign,
  Check,
  Image as ImageIcon,
  Upload
} from 'lucide-react';

interface TeamMember {
  id: string;
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  displayOrder: number;
  isActive: boolean;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

interface PricingPlan {
  id: string;
  _id: string;
  title: string;
  price: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  isPopular: boolean;
}

interface MediaAsset {
  id: string;
  fileName: string;
  fileUrl: string;
}

export default function TeamPricingManager() {
  const [activeTab, setActiveTab] = useState<'team' | 'pricing'>('team');
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);

  // Editors
  const [teamEditorOpen, setTeamEditorOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  
  const [pricingEditorOpen, setPricingEditorOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [uploadingMemberImage, setUploadingMemberImage] = useState(false);
  const memberFileRef = useRef<HTMLInputElement>(null);

  // Form Fields - Team
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [memberBio, setMemberBio] = useState('');
  const [memberImage, setMemberImage] = useState('');
  const [memberOrder, setMemberOrder] = useState(1);
  const [memberActive, setMemberActive] = useState(true);
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');

  // Form Fields - Pricing
  const [planTitle, setPlanTitle] = useState('');
  const [planPrice, setPlanPrice] = useState('');
  const [planFeatures, setPlanFeatures] = useState('');
  const [planCtaText, setPlanCtaText] = useState('Get Started');
  const [planCtaLink, setPlanCtaLink] = useState('/contact');
  const [planPopular, setPlanPopular] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [teamRes, pricingRes, mediaRes] = await Promise.all([
        fetch('/api/admin/team'),
        fetch('/api/admin/pricing'),
        fetch('/api/admin/media')
      ]);

      const teamData = await teamRes.json();
      const pricingData = await pricingRes.json();
      const mediaData = await mediaRes.json();

      setTeam(teamData.team || []);
      setPricing(pricingData.pricing || []);
      setMedia(mediaData.media || []);
    } catch (e) {
      console.error('Error fetching data:', e);
    } finally {
      setLoading(false);
    }
  }

  async function handleMemberImageUpload(file: File) {
    if (!file) return;
    setUploadingMemberImage(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/admin/media', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        setMemberImage(data.media?.fileUrl || '');
      } else {
        alert('Image upload failed. Please try again.');
      }
    } catch (e) {
      console.error('Upload error:', e);
    } finally {
      setUploadingMemberImage(false);
    }
  }

  // --- Team Members Handlers ---
  function handleOpenTeamCreate() {
    setEditingMember(null);
    setMemberName('');
    setMemberRole('');
    setMemberBio('');
    setMemberImage('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80');
    setMemberOrder(team.length + 1);
    setMemberActive(true);
    setTwitter('');
    setLinkedin('');
    setGithub('');
    setTeamEditorOpen(true);
  }

  function handleOpenTeamEdit(m: TeamMember) {
    setEditingMember(m);
    setMemberName(m.name);
    setMemberRole(m.role);
    setMemberBio(m.bio);
    setMemberImage(m.image);
    setMemberOrder(m.displayOrder);
    setMemberActive(m.isActive);
    setTwitter(m.socialLinks?.twitter || '');
    setLinkedin(m.socialLinks?.linkedin || '');
    setGithub(m.socialLinks?.github || '');
    setTeamEditorOpen(true);
  }

  async function handleTeamSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      name: memberName,
      role: memberRole,
      bio: memberBio,
      image: memberImage,
      displayOrder: memberOrder,
      isActive: memberActive,
      socialLinks: { twitter, linkedin, github }
    };

    try {
      const url = editingMember ? `/api/admin/team/${editingMember.id || editingMember._id}` : '/api/admin/team';
      const method = editingMember ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setTeamEditorOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save member');
      }
    } catch (err) {
      console.error('Error saving member:', err);
    }
  }

  async function handleTeamDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to remove team member "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete member');
      }
    } catch (e) {
      console.error('Error deleting member:', e);
    }
  }

  // --- Pricing Plans Handlers ---
  function handleOpenPricingCreate() {
    setEditingPlan(null);
    setPlanTitle('');
    setPlanPrice('');
    setPlanFeatures('');
    setPlanCtaText('Get Started');
    setPlanCtaLink('/contact');
    setPlanPopular(false);
    setPricingEditorOpen(true);
  }

  function handleOpenPricingEdit(p: PricingPlan) {
    setEditingPlan(p);
    setPlanTitle(p.title);
    setPlanPrice(p.price);
    setPlanFeatures(p.features.join(', '));
    setPlanCtaText(p.ctaText);
    setPlanCtaLink(p.ctaLink);
    setPlanPopular(p.isPopular);
    setPricingEditorOpen(true);
  }

  async function handlePricingSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: planTitle,
      price: planPrice,
      features: planFeatures,
      ctaText: planCtaText,
      ctaLink: planCtaLink,
      isPopular: planPopular
    };

    try {
      const url = editingPlan ? `/api/admin/pricing/${editingPlan.id || editingPlan._id}` : '/api/admin/pricing';
      const method = editingPlan ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setPricingEditorOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save plan');
      }
    } catch (err) {
      console.error('Error saving plan:', err);
    }
  }

  async function handlePricingDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to permanently delete pricing plan "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/pricing/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete plan');
      }
    } catch (e) {
      console.error('Error deleting plan:', e);
    }
  }

  return (
    <div>
      {/* 1. Header */}
      <div className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>Company Info & Setup</h1>
          <p className={styles.pageSubtitle}>Manage your GrowthLab team profiles and digital marketing pricing plans.</p>
        </div>
        
        {/* Toggle tabs */}
        <div style={{ display: 'flex', gap: '10px', background: 'rgba(17,34,64,0.5)', padding: '5px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            onClick={() => setActiveTab('team')} 
            className={activeTab === 'team' ? styles.btnPrimary : styles.btnSecondary}
            style={{ padding: '8px 18px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none' }}
          >
            <Users size={16} /> Team Members
          </button>
          <button 
            onClick={() => setActiveTab('pricing')} 
            className={activeTab === 'pricing' ? styles.btnPrimary : styles.btnSecondary}
            style={{ padding: '8px 18px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none' }}
          >
            <DollarSign size={16} /> Pricing Plans
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading content...</div>
      ) : activeTab === 'team' ? (
        // --- Team Layout ---
        <div>
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <button onClick={handleOpenTeamCreate} className={styles.btnPrimary} style={{ padding: '10px 20px', fontSize: '13px' }}>
              <Plus size={14} /> Add Team Member
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {team.length === 0 ? (
              <div style={{ gridColumn: 'span 3', padding: '40px', textAlign: 'center', color: '#64748b' }}>No team profiles found.</div>
            ) : (
              team.map((m) => (
                <div key={m.id || m._id} className={styles.sectionCard} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <img 
                    src={m.image} 
                    alt={m.name} 
                    style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff6b00' }}
                  />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <h3 style={{ color: 'white', fontSize: '15px', fontWeight: 700, margin: 0 }}>{m.name}</h3>
                    <span style={{ fontSize: '11px', color: '#ff6b00', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.role}</span>
                    <div style={{ fontSize: '10px', color: '#475569', marginTop: '4px' }}>Order Priority: {m.displayOrder}</div>
                    
                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <button 
                        onClick={() => handleOpenTeamEdit(m)} 
                        className={styles.btnSecondary} 
                        style={{ padding: '4px 8px', fontSize: '11px' }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleTeamDelete(m.id || m._id, m.name)} 
                        className={styles.signOutBtn} 
                        style={{ padding: '4px 8px', fontSize: '11px', border: 'none' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        // --- Pricing Plans Layout ---
        <div>
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <button onClick={handleOpenPricingCreate} className={styles.btnPrimary} style={{ padding: '10px 20px', fontSize: '13px' }}>
              <Plus size={14} /> Add Pricing Plan
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
            {pricing.length === 0 ? (
              <div style={{ gridColumn: 'span 3', padding: '40px', textAlign: 'center', color: '#64748b' }}>No pricing plans created yet.</div>
            ) : (
              pricing.map((p) => (
                <div 
                  key={p.id || p._id} 
                  className={styles.sectionCard} 
                  style={{ border: p.isPopular ? '2px solid #ff6b00' : '1px solid rgba(255,255,255,0.05)', position: 'relative' }}
                >
                  {p.isPopular && (
                    <span style={{ position: 'absolute', top: '-12px', right: '20px', background: '#ff6b00', color: 'white', padding: '3px 12px', borderRadius: '30px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Most Popular
                    </span>
                  )}
                  
                  <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 700, margin: 0 }}>{p.title}</h3>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#ff6b00', margin: '15px 0' }}>{p.price}</div>
                  
                  <h5 style={{ color: '#64748b', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.5px', marginBottom: '10px' }}>Included Features</h5>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: 0, listStyleType: 'none', marginBottom: '25px', fontSize: '13px', color: '#cbd5e1' }}>
                    {p.features?.map((f, i) => (
                      <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Check size={14} style={{ color: '#10b981' }} /> {f}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
                    <span style={{ fontSize: '11px', color: '#475569' }}>CTA Button: {p.ctaText}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleOpenPricingEdit(p)} 
                        className={styles.btnSecondary} 
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handlePricingDelete(p.id || p._id, p.title)} 
                        className={styles.signOutBtn} 
                        style={{ padding: '6px 12px', fontSize: '12px', border: 'none' }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* --- Team Editor Sliding Drawer --- */}
      {teamEditorOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '600px', height: '100%', background: '#070f1e', borderLeft: '1px solid rgba(255,107,0,0.15)', overflowY: 'auto', padding: '40px' }} className="editor-drawer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: 'white', fontSize: '22px', fontWeight: 700 }}>
                {editingMember ? 'Edit Profile' : 'Add Profile'}
              </h2>
              <button onClick={() => setTeamEditorOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleTeamSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  className={styles.formInput}
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Role / Position *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead Developer"
                  className={styles.formInput}
                  value={memberRole}
                  onChange={(e) => setMemberRole(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className={styles.formGroup}>
                  <label>Display Order Priority *</label>
                  <input
                    type="number"
                    required
                    className={styles.formInput}
                    value={memberOrder}
                    onChange={(e) => setMemberOrder(Number(e.target.value))}
                  />
                </div>
                
                <div className={styles.formGroup} style={{ justifyContent: 'center', paddingTop: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'white' }}>
                    <input 
                      type="checkbox" 
                      checked={memberActive} 
                      onChange={(e) => setMemberActive(e.target.checked)} 
                      style={{ accentColor: '#ff6b00', width: '16px', height: '16px' }}
                    />
                    Active profile
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Profile Image *</label>
                <input
                  ref={memberFileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => e.target.files?.[0] && handleMemberImageUpload(e.target.files[0])}
                />
                {memberImage && (
                  <div style={{ position: 'relative', height: '160px', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px', border: '1px solid rgba(255,107,0,0.3)' }}>
                    <img src={memberImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button type="button" onClick={() => setMemberImage('')} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(239,68,68,0.9)', border: 'none', color: 'white', borderRadius: '4px', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <X size={14} />
                    </button>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => memberFileRef.current?.click()}
                    className={styles.btnPrimary}
                    style={{ flex: 1, padding: '12px' }}
                    disabled={uploadingMemberImage}
                  >
                    <Upload size={16} />
                    {uploadingMemberImage ? 'Uploading...' : 'Upload from Device'}
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
                <label>Short Bio</label>
                <textarea
                  rows={4}
                  placeholder="Describe member experience and fields..."
                  className={styles.formInput}
                  value={memberBio}
                  onChange={(e) => setMemberBio(e.target.value)}
                />
              </div>

              {/* Social Links */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '13px' }}>Social Profiles URLs</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className={styles.formGroup} style={{ margin: 0 }}>
                    <label>LinkedIn URL</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      className={styles.formInput}
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup} style={{ margin: 0 }}>
                    <label>Twitter URL</label>
                    <input
                      type="url"
                      placeholder="https://twitter.com/..."
                      className={styles.formInput}
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup} style={{ margin: 0 }}>
                    <label>GitHub URL</label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      className={styles.formInput}
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button type="submit" className={styles.btnPrimary} style={{ flex: 1 }}>
                  Save Profile
                </button>
                <button type="button" onClick={() => setTeamEditorOpen(false)} className={styles.btnSecondary} style={{ width: '120px' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Pricing Editor Sliding Drawer --- */}
      {pricingEditorOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '600px', height: '100%', background: '#070f1e', borderLeft: '1px solid rgba(255,107,0,0.15)', overflowY: 'auto', padding: '40px' }} className="editor-drawer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: 'white', fontSize: '22px', fontWeight: 700 }}>
                {editingPlan ? 'Edit Pricing Plan' : 'Create Pricing Plan'}
              </h2>
              <button onClick={() => setPricingEditorOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handlePricingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className={styles.formGroup}>
                <label>Plan Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Starter Growth"
                  className={styles.formInput}
                  value={planTitle}
                  onChange={(e) => setPlanTitle(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Pricing amount *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ksh 45,000 / mo"
                  className={styles.formInput}
                  value={planPrice}
                  onChange={(e) => setPlanPrice(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className={styles.formGroup}>
                  <label>CTA Button Text</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={planCtaText}
                    onChange={(e) => setPlanCtaText(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>CTA Redirect Link</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={planCtaLink}
                    onChange={(e) => setPlanCtaLink(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'white' }}>
                  <input 
                    type="checkbox" 
                    checked={planPopular} 
                    onChange={(e) => setPlanPopular(e.target.checked)} 
                    style={{ accentColor: '#ff6b00', width: '16px', height: '16px' }}
                  />
                  Highlight as Popular Plan
                </label>
              </div>

              <div className={styles.formGroup}>
                <label>Included Features * (comma separated)</label>
                <textarea
                  rows={6}
                  required
                  placeholder="SEO Audits, AI Integration, Social Automation, 24/7 SLA Support"
                  className={styles.formInput}
                  value={planFeatures}
                  onChange={(e) => setPlanFeatures(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button type="submit" className={styles.btnPrimary} style={{ flex: 1 }}>
                  Save Plan
                </button>
                <button type="button" onClick={() => setPricingEditorOpen(false)} className={styles.btnSecondary} style={{ width: '120px' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Central Media Selector --- */}
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
                    onClick={() => { setMemberImage(item.fileUrl); setMediaPickerOpen(false); }}
                    style={{ border: memberImage === item.fileUrl ? '2px solid #ff6b00' : '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', height: '100px', cursor: 'pointer', position: 'relative', background: '#030811' }}
                  >
                    <img 
                      src={item.fileUrl} 
                      alt={item.fileName} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    {memberImage === item.fileUrl && (
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
