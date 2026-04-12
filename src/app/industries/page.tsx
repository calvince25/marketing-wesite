import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industries We Serve | GrowthLab Limited',
  description: 'GrowthLab Limited provides tailored digital marketing, web dev, and SEO solutions across various industries in Kenya including Real Estate, E-commerce, and B2B.',
};

export default function IndustriesPage() {
  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <h1>Industries We Serve</h1>
      <p style={{ maxWidth: '800px', margin: '20px auto 40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
        We combine our deep technical expertise with industry-specific knowledge to deliver digital solutions that drive results across various sectors in East Africa.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '25px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Real Estate</h3>
          <p>Property portals, CRM integrations, and targeted local SEO.</p>
        </div>
        <div style={{ padding: '25px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>E-Commerce & Retail</h3>
          <p>High-conversion storefronts, inventory syncing, and performance marketing.</p>
        </div>
        <div style={{ padding: '25px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>B2B Services</h3>
          <p>Corporate websites, lead generation systems, and automated pipelines.</p>
        </div>
        <div style={{ padding: '25px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Healthcare</h3>
          <p>Patient booking portals, localized search visibility, and compliance.</p>
        </div>
      </div>
    </div>
  );
}
