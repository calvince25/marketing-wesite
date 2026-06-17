'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../admin-legacy/admin-legacy.module.css';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setMessage(data.message);
      
      if (data.user.isApproved) {
        setTimeout(() => router.push('/admin/login'), 2000);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginOverlay}>
      <div className={styles.loginBox}>
        <div className="logo" style={{ color: 'var(--primary-navy)', fontWeight: 800, fontSize: '32px', marginBottom: '30px', letterSpacing: '1px' }}>
            GROWTH<span style={{ color: 'var(--accent-orange)' }}>LAB</span>
        </div>
        
        {message ? (
          <div className={styles.successMessage}>
            <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Registration Successful</h2>
            <p style={{ marginBottom: '20px' }}>{message}</p>
            <Link href="/admin/login" className="btn btn-primary" style={{ display: 'block' }}>
              Proceed to Login
            </Link>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '10px', color: 'var(--primary-navy)' }}>Create Admin Account</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '14px' }}>Join the Bloom Marketing admin team. Note: New accounts require approval.</p>
            
            <form onSubmit={handleRegister}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="admin@growthlab.co.ke"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ paddingRight: '45px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '15px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '10px', padding: '15px' }}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Create Account'}
              </button>
              
              <p style={{ marginTop: '25px', textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
                Already have an account? <Link href="/admin/login" className={styles.linkAccent}>Login here</Link>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
