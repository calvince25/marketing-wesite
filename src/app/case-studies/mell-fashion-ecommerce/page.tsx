import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mell Fashion Next.js E-Commerce Case Study | GrowthLab',
  description: 'Learn how GrowthLab developed a dynamic Next.js e-commerce platform with M-Pesa Daraja integration for Mell Fashion, resulting in a 45% conversion leap.',
};

export default function MellFashionCaseStudy() {
  return (
    <div className="container" style={{ padding: '80px 0', maxWidth: '900px' }}>
      <Link href="/case-studies" style={{ color: '#555', textDecoration: 'underline', marginBottom: '20px', display: 'inline-block' }}>← Back to Case Studies</Link>
      
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', lineHeight: '1.2' }}>Mell Fashion: 45% Conversion Leap Through Custom E-Commerce</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px' }}>A technical breakdown of how rebranding and migrating to a custom Next.js storefront equipped with an automated Supabase backend drove massive organic growth.</p>
      
      <div style={{ background: '#f5f5f5', padding: '30px', borderRadius: '8px', marginBottom: '40px', display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        <div style={{ flex: '1 1 200px' }}>
          <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#888', fontWeight: 'bold' }}>Industry</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Fashion & Retail</div>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#888', fontWeight: 'bold' }}>Core Technologies</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Next.js, Supabase, M-Pesa API</div>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#888', fontWeight: 'bold' }}>Timeline</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>4 Weeks</div>
        </div>
      </div>

      <div style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
        <h2 style={{ fontSize: '2rem', marginTop: '40px', marginBottom: '20px' }}>The Challenge</h2>
        <p>Mell Fashion, a rapidly growing retail brand, was held back by a sluggish, generic website template. Customers experienced painful latency during checkout, and the manual payment verification process required staff to cross-reference M-Pesa receipts against orders via WhatsApp. This friction resulted in a high cart abandonment rate and restricted their ability to scale organic traffic.</p>

        <h2 style={{ fontSize: '2rem', marginTop: '40px', marginBottom: '20px' }}>Our Approach</h2>
        <p>GrowthLab architected a complete technical overhaul. We migrated Mell Fashion to a highly optimized <strong>Next.js</strong> front-end for near-instant page loads. We replaced their fragmented data storage with a normalized <strong>Supabase</strong> PostgreSQL backend, giving the administrative team a centralized order management dashboard.</p>
        <p>Most importantly, we integrated the <strong>M-Pesa Daraja API for STK Push payments</strong>. Customers could now initiate payment seamlessly from the checkout page, triggering automated order confirmations instantly upon success.</p>

        <h2 style={{ fontSize: '2rem', marginTop: '40px', marginBottom: '20px' }}>The Results</h2>
        <p>The technical restructuring drastically improved the user experience. By removing the manual WhatsApp verification phase, consumer trust increased, and the sales pipeline was automated entirely. The new Next.js architecture also achieved 99+ scores on Google Lighthouse, creating a dramatic lift in organic search rankings for their product catalogs.</p>

        <div style={{ background: '#111', color: '#fff', padding: '40px', borderRadius: '12px', marginTop: '40px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Key Metrics Achieved</h3>
          <ul style={{ listStyle: 'none', padding: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <li>
              <span style={{ display: 'block', fontSize: '2.5rem', fontWeight: '900', color: '#4ade80' }}>45%</span>
              <span style={{ fontSize: '1rem', color: '#aaa' }}>Increase in Checkout Conversion Rate</span>
            </li>
            <li>
              <span style={{ display: 'block', fontSize: '2.5rem', fontWeight: '900', color: '#4ade80' }}>&lt; 1s</span>
              <span style={{ fontSize: '1rem', color: '#aaa' }}>Average Page Load Time</span>
            </li>
            <li>
              <span style={{ display: 'block', fontSize: '2.5rem', fontWeight: '900', color: '#4ade80' }}>100%</span>
              <span style={{ fontSize: '1rem', color: '#aaa' }}>Payment Automation (Zero Manual Verification)</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div style={{ marginTop: '60px', textAlign: 'center', padding: '40px', background: '#f5f5f5', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '15px' }}>Ready for a technical upgrade?</h3>
        <Link href="/contact" className="btn btn-primary" style={{ padding: '15px 30px', background: '#000', color: '#fff', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Schedule a Consultation</Link>
      </div>
    </div>
  );
}
