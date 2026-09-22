import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Web Design, SEO & Digital Marketing Agency Nairobi',
  description: 'GrowthLab helps Nairobi businesses grow with mobile-first web design, SEO services, local search visibility, and conversion-focused digital marketing.',
  alternates: { canonical: '/nairobi' },
};

export default function NairobiLocationPage() {
  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <h1>Web Design, SEO & Digital Marketing Agency in Nairobi</h1>
      <p style={{ maxWidth: '800px', margin: '20px auto 40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
        Based in Kenya's capital, GrowthLab Limited provides web design and development, SEO services in Nairobi, local search strategy, and digital marketing for businesses that need more qualified enquiries.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Local Expertise, Global Standards</h3>
          <p>We understand the Nairobi market deeply while applying international best practices in design and search marketing.</p>
        </div>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Our Nairobi Services</h3>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li><Link href="/services/seo-digital-marketing">SEO services and local search visibility</Link></li>
            <li><Link href="/services/web-development">Custom web design and development</Link></li>
            <li><Link href="/services/business-automation">Business automation solutions</Link></li>
          </ul>
        </div>
      </div>
      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        <Link href="/contact" className="btn btn-primary" style={{ padding: '15px 30px', background: '#000', color: '#fff', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Partner With Us Today</Link>
      </div>
    </div>
  );
}
