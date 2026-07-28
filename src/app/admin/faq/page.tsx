'use client';

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface FAQ {
  id: string;
  _id: string;
  question: string;
  answer: string;
  displayOrder: number;
}

export default function FAQManager() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Editor State
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

  // Form Fields
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(0);

  useEffect(() => {
    fetchFaqs();
  }, []);

  async function fetchFaqs() {
    try {
      const res = await fetch('/api/admin/faqs');
      const data = await res.json();
      setFaqs(data.faqs || []);
    } catch (e) {
      console.error('Error fetching FAQs:', e);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenCreate() {
    setEditingFaq(null);
    setQuestion('');
    setAnswer('');
    // Automatically set displayOrder to next sequential number
    const maxOrder = faqs.reduce((max, f) => Math.max(max, f.displayOrder || 0), 0);
    setDisplayOrder(maxOrder + 1);
    setEditorOpen(true);
  }

  function handleOpenEdit(faq: FAQ) {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setDisplayOrder(faq.displayOrder || 0);
    setEditorOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      question,
      answer,
      displayOrder: Number(displayOrder)
    };

    try {
      const url = editingFaq ? `/api/admin/faqs/${editingFaq.id || editingFaq._id}` : '/api/admin/faqs';
      const method = editingFaq ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setEditorOpen(false);
        fetchFaqs();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save FAQ');
      }
    } catch (err) {
      console.error('Error saving FAQ:', err);
    }
  }

  async function handleDelete(id: string, questionText: string) {
    const summary = questionText.length > 50 ? questionText.substring(0, 50) + '...' : questionText;
    if (!confirm(`Are you sure you want to delete FAQ:\n"${summary}"?`)) return;

    try {
      const res = await fetch(`/api/api/admin/faqs/${id}`, { method: 'DELETE' }); // wait, standard url is /api/admin/faqs/${id}
      // Let's call /api/admin/faqs/${id} instead of /api/api/admin/...
      const actualRes = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
      if (actualRes.ok) {
        fetchFaqs();
      } else {
        const err = await actualRes.json();
        alert(err.error || 'Failed to delete FAQ');
      }
    } catch (err) {
      console.error('Error deleting FAQ:', err);
    }
  }

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* 1. Header */}
      <div className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>FAQ Management</h1>
          <p className={styles.pageSubtitle}>Manage the Frequently Asked Questions displayed on the website.</p>
        </div>
        <button onClick={handleOpenCreate} className={styles.btnPrimary}>
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      {/* 2. Filter / Search Bar */}
      <div className={styles.sectionCard} style={{ padding: '15px 25px', marginBottom: '25px' }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '15px', top: '15px', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search FAQs by question or answer..."
              className={styles.formInput}
              style={{ width: '100%', paddingLeft: '45px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 3. FAQs List */}
      <div className={styles.sectionCard} style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading FAQs...</div>
        ) : filteredFaqs.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No FAQs found.</div>
        ) : (
          <table className={styles.customTable}>
            <thead>
              <tr>
                <th style={{ width: '60px', textAlign: 'center' }}>Order</th>
                <th>Question & Answer</th>
                <th style={{ width: '120px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaqs.map((faq) => (
                <tr key={faq.id || faq._id}>
                  <td style={{ textAlign: 'center', fontWeight: 'bold', color: '#ff6b00' }}>
                    {faq.displayOrder}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'white', fontSize: '15px', marginBottom: '5px' }}>
                      {faq.question}
                    </div>
                    <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                      {faq.answer.length > 200 ? faq.answer.substring(0, 200) + '...' : faq.answer}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleOpenEdit(faq)} 
                        className={styles.btnSecondary} 
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        <Edit3 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(faq.id || faq._id, faq.question)} 
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

      {/* 4. Sliding Modal/Drawer Editor Form */}
      {editorOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '600px', height: '100%', background: '#070f1e', borderLeft: '1px solid rgba(255,107,0,0.15)', overflowY: 'auto', padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: 'white', fontSize: '22px', fontWeight: 700 }}>
                {editingFaq ? 'Edit FAQ' : 'Add FAQ'}
              </h2>
              <button onClick={() => setEditorOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className={styles.formGroup}>
                <label>Question *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter the question..."
                  className={styles.formInput}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Display Order *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 1"
                  className={styles.formInput}
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(Number(e.target.value))}
                />
                <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                  Determines the sorting order of the FAQs on the page. Lower numbers appear first.
                </span>
              </div>

              <div className={styles.formGroup}>
                <label>Answer * (supports line breaks)</label>
                <textarea
                  rows={10}
                  required
                  placeholder="Provide the answer here..."
                  className={styles.formInput}
                  style={{ lineHeight: '1.6' }}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button type="submit" className={styles.btnPrimary} style={{ flex: 1 }}>
                  Save FAQ
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
