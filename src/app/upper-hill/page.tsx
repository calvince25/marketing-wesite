import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Marketing in Upper Hill Nairobi | GrowthLab',
  description: 'Empowering healthcare, financial, and corporate institutions in Upper Hill with enterprise-grade web development and digital marketing.',
};

export default function UpperHillLocationPage() {
  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <h1>Enterprise Digital Solutions in Upper Hill, Nairobi</h1>
      <p style={{ maxWidth: '800px', margin: '20px auto 40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
        Perfect for Nairobi's financial and medical hub. We deliver high-security web applications, robust CRM integrations, and authoritative B2B marketing strategies.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Financial & Healthcare Compliance</h3>
          <p>We build secure infrastructure for Upper Hill institutions requiring rigorous data protection.</p>
        </div>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>B2B Lead Generation</h3>
          <p>Automated funnels and thought-leadership SEO campaigns to dominate the enterprise sector.</p>
        </div>
      </div>
    </div>
  );
}
