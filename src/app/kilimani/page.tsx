import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Digital Agency in Kilimani, Nairobi | GrowthLab Limited',
  description: 'Premium web design, SEO, and digital marketing services for businesses in Kilimani, Nairobi. Grow your local presence with GrowthLab Limitd.',
};

export default function KilimaniLocationPage() {
  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <h1>Digital Marketing Services in Kilimani</h1>
      <p style={{ maxWidth: '800px', margin: '20px auto 40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
        We empower Kilimani-based businesses, startups, and real estate firms with aggressive SEO, beautiful web design, and smart automation systems.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Dominate The Kilimani Market</h3>
          <p>Kilimani is vibrant and competitive. Our tailored local SEO strategies make sure your customers find you first.</p>
        </div>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Our Services for Kilimani</h3>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>E-Commerce & Real Estate Platforms</li>
            <li>Social Media & Brand Graphics</li>
            <li>Conversion Rate Optimization</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
