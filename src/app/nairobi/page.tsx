import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Digital Marketing & Web Design in Nairobi | GrowthLab Limited',
  description: 'Top-rated digital marketing, SEO, and web development agency located in Nairobi, Kenya. We help local businesses scale their online revenue.',
};

export default function NairobiLocationPage() {
  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <h1>Digital Marketing Agency in Nairobi</h1>
      <p style={{ maxWidth: '800px', margin: '20px auto 40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
        Based in the heart of Kenya's capital, GrowthLab Limited partners with Nairobi businesses to deliver high-performance digital marketing, web design, and SEO.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Local Expertise, Global Standards</h3>
          <p>We understand the Nairobi market deeply while applying international best practices in design and search marketing.</p>
        </div>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Our Nairobi Services</h3>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>SEO & Local Search Visibility</li>
            <li>Custom Web Design & Development</li>
            <li>Business Automation Solutions</li>
          </ul>
        </div>
      </div>
      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        <Link href="/contact" className="btn btn-primary" style={{ padding: '15px 30px', background: '#000', color: '#fff', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Partner With Us Today</Link>
      </div>
    </div>
  );
}
