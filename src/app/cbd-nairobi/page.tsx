import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO & Web Design in Nairobi CBD | GrowthLab Limited',
  description: 'Helping businesses in Nairobi Central Business District (CBD) maximize their digital footprint through expert web design and marketing services.',
};

export default function CbdNairobiLocationPage() {
  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <h1>Digital Agency Services in Nairobi CBD</h1>
      <p style={{ maxWidth: '800px', margin: '20px auto 40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
        For corporations and retail stores operating inside the Nairobi Central Business District, we provide digital strategies tailored to high-density, highly competitive environments.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Corporate Web Solutions</h3>
          <p>We build secure, robust platforms that reflect the gravitas of your CBD-based enterprise.</p>
        </div>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Local SEO for Retailers</h3>
          <p>Drive foot traffic to your physical store through hyper-targeted Google Maps and local search optimization.</p>
        </div>
      </div>
    </div>
  );
}
