import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing & Packages | GrowthLab Limited Nairobi',
  description: 'Transparent, range-based pricing for GrowthLab\'s web development, digital marketing, and SEO services. See how we deliver ROI without the fluff.',
};

export default function PricingPage() {
  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', textAlign: 'center' }}>Transparent, Intent-Driven Pricing.</h1>
      <p style={{ maxWidth: '800px', margin: '0 auto 60px', fontSize: '1.2rem', lineHeight: '1.6', color: '#555', textAlign: 'center' }}>
        We believe in transparency. By displaying our pricing baselines upfront, we ensure that every conversation we have is focused entirely on how we will generate a meaningful return on your investment.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        
        {/* Pricing Card 1 */}
        <div style={{ padding: '40px', background: '#fff', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', position: 'relative' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Social Media Management</h3>
          <p style={{ color: '#666', marginBottom: '20px', minHeight: '48px' }}>Build engaged communities and brand awareness.</p>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>
            <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#888' }}>From </span>
            KES 15,000<span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#888' }}>/mo</span>
          </div>
          <ul style={{ listStyle: 'none', padding: '0', marginBottom: '30px', color: '#444', lineHeight: '2' }}>
            <li>✓ Monthly Content Calendar</li>
            <li>✓ Facebook, Instagram, LinkedIn</li>
            <li>✓ Community Engagement</li>
            <li>✓ Monthly Analytics Report</li>
          </ul>
          <Link href="/contact?service=social-media" className="btn btn-outline" style={{ display: 'block', textAlign: 'center', width: '100%', padding: '12px', borderRadius: '5px' }}>Inquire</Link>
        </div>

        {/* Pricing Card 2 - Highlighted */}
        <div style={{ padding: '40px', background: '#000', color: '#fff', borderRadius: '12px', position: 'relative', transform: 'translateY(-10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <div style={{ position: 'absolute', top: '-15px', right: '30px', background: '#0056b3', color: '#fff', padding: '5px 15px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>Most Popular</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>SEO & Digital Marketing</h3>
          <p style={{ color: '#aaa', marginBottom: '20px', minHeight: '48px' }}>Aggressive search dominance for qualified lead generation.</p>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>
            <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#aaa' }}>From </span>
            KES 25,000<span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#aaa' }}>/mo</span>
          </div>
          <ul style={{ listStyle: 'none', padding: '0', marginBottom: '30px', color: '#ddd', lineHeight: '2' }}>
            <li>✓ Deep Technical SEO Audits</li>
            <li>✓ High-Intent Keyword Targeting</li>
            <li>✓ Authoritative Blog Content</li>
            <li>✓ Google My Business Optimization</li>
            <li>✓ ROI Dashboard</li>
          </ul>
          <Link href="/contact?service=seo" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%', padding: '12px', borderRadius: '5px', background: '#fff', color: '#000' }}>Start Growing</Link>
        </div>

        {/* Pricing Card 3 */}
        <div style={{ padding: '40px', background: '#fff', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Custom Web Development</h3>
          <p style={{ color: '#666', marginBottom: '20px', minHeight: '48px' }}>High-performance storefronts and business systems.</p>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>
            <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#888' }}>From </span>
            KES 45,000<span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#888' }}></span>
          </div>
          <ul style={{ listStyle: 'none', padding: '0', marginBottom: '30px', color: '#444', lineHeight: '2' }}>
            <li>✓ Custom Next.js / React Build</li>
            <li>✓ Technical SEO Foundation</li>
            <li>✓ 100/100 Lighthouse Speeds</li>
            <li>✓ Responsive Design</li>
          </ul>
          <Link href="/contact?service=web-dev" className="btn btn-outline" style={{ display: 'block', textAlign: 'center', width: '100%', padding: '12px', borderRadius: '5px' }}>Get a Web Audit</Link>
        </div>

      </div>

      <div style={{ marginTop: '80px', padding: '40px', background: '#f9f9f9', borderRadius: '12px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Looking for App & Systems Integration?</h3>
        <p style={{ color: '#555', marginBottom: '20px', maxWidth: '600px', margin: '0 auto 20px' }}>
          For complex, custom-coded infrastructure (M-Pesa Daraja Integration, Supabase Backend, AI Chatbots, Custom CRMs), we provide tailored roadmaps.
        </p>
        <Link href="/contact" style={{ fontWeight: 'bold', borderBottom: '2px solid #000', paddingBottom: '3px' }}>Request a Custom Engineering Quote</Link>
      </div>

    </div>
  );
}
