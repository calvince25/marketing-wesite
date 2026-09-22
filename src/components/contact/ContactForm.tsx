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
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" name="name" placeholder="John Doe" required disabled={status === 'loading'} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" placeholder="john@example.com" required disabled={status === 'loading'} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone">Phone or WhatsApp number</label>
        <input type="tel" id="phone" name="phone" placeholder="+254 7xx xxx xxx" disabled={status === 'loading'} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="service">Interested Service</label>
        <select id="service" name="service" required disabled={status === 'loading'}>
          <option value="">Select a service</option>
          <option value="web-dev">Web Development</option>
          <option value="seo">SEO & Marketing</option>
          <option value="design">UI/UX Design</option>
          <option value="ai">AI Solutions</option>
          <option value="automation">Business Automation</option>
          <option value="ecommerce">E-commerce and M-Pesa</option>
          <option value="maintenance">Website Maintenance</option>
          <option value="google-ads">Google Ads / PPC</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="budget">Indicative budget</label>
        <select id="budget" name="budget" disabled={status === 'loading'}>
          <option value="">Select a budget range</option>
          <option value="under-50k">Under KES 50,000</option>
          <option value="50k-150k">KES 50,000–150,000</option>
          <option value="150k-300k">KES 150,000–300,000</option>
          <option value="over-300k">Over KES 300,000</option>
          <option value="not-sure">I&apos;m not sure yet</option>
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
