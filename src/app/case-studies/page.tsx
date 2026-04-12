import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Case Studies & Success Stories | GrowthLab Limited Nairobi',
  description: 'Explore how GrowthLab has transformed businesses in Kenya through high-performance web development, SEO, and automation. Read our case studies.',
};

export default function CaseStudiesIndex() {
  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Proven Results. Documented.</h1>
      <p style={{ maxWidth: '800px', fontSize: '1.2rem', lineHeight: '1.6', color: '#555', marginBottom: '50px' }}>
        We don't just build websites; we build revenue engines. Discover how our technical implementations and digital strategies have directly impacted our clients' bottom lines across East Africa.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
        
        {/* Case Study 1 */}
        <Link href="/case-studies/mell-fashion-ecommerce" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '12px', transition: 'transform 0.3s ease', borderTop: '4px solid #000' }}>
            <span style={{ display: 'inline-block', padding: '5px 12px', background: '#e0e0e0', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '15px' }}>E-Commerce & Automation</span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Mell Fashion: 45% Conversion Leap Through Headless Commerce</h3>
            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.5' }}>How transitioning from a generic template to a custom Next.js application with M-Pesa API integration revolutionized a fashion retailer's online sales.</p>
            <div style={{ color: '#0056b3', fontWeight: 'bold' }}>Read Full Case Study →</div>
          </div>
        </Link>
        
        {/* Case Study 2 */}
        <Link href="/case-studies/restaurant-pos-optimization" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '12px', transition: 'transform 0.3s ease', borderTop: '4px solid #0056b3' }}>
            <span style={{ display: 'inline-block', padding: '5px 12px', background: '#e0e0e0', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '15px' }}>Systems Integration</span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Nairobi Restaurant Increases Online Orders by 180%</h3>
            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.5' }}>Replacing fractured manual order tracking with an integrated digital POS and automated booking funnel, drastically reducing administrative bloat.</p>
            <div style={{ color: '#0056b3', fontWeight: 'bold' }}>Read Full Case Study →</div>
          </div>
        </Link>

      </div>
    </div>
  );
}
