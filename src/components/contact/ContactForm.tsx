'use client';

import { useState } from 'react';
import styles from '@/app/contact/contact.module.css';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(result.message || 'Thank you! Your message has been sent.');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to send message. Please check your connection.');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successMessage}>
        <h3>Message Sent!</h3>
        <p>{message}</p>
        <button onClick={() => setStatus('idle')} className="btn btn-primary">Send Another Message</button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" name="name" placeholder="John Doe" required disabled={status === 'loading'} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" placeholder="john@example.com" required disabled={status === 'loading'} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="service">Interested Service</label>
        <select id="service" name="service" required disabled={status === 'loading'}>
          <option value="">Select a service</option>
          <option value="web-dev">Web Development</option>
          <option value="seo">SEO & Marketing</option>
          <option value="design">UI/UX Design</option>
          <option value="ai">AI Solutions</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message">Your Message</label>
        <textarea id="message" name="message" rows={5} placeholder="Tell us about your project..." required disabled={status === 'loading'}></textarea>
      </div>

      {status === 'error' && <p className={styles.errorText}>{message}</p>}

      <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
