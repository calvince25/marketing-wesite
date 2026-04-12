import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Team | GrowthLab Limited Nairobi',
  description: 'Meet the expert digital marketing and technical team at GrowthLab Limited in Nairobi, Kenya.',
};

export default function TeamPage() {
  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <h1>Meet the GrowthLab Team</h1>
      <p style={{ maxWidth: '800px', margin: '20px auto 40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
        We are a collective of digital strategists, developers, and designers based in Nairobi, dedicated to growing your business through technical excellence and strategic clarity.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {/* Placeholders for team members */}
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Leadership Team</h3>
          <p>Experts in strategy, growth, and technical direction.</p>
        </div>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Engineering & Design</h3>
          <p>Crafting high-performance websites and digital experiences.</p>
        </div>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Marketing & SEO</h3>
          <p>Scaling brands through data-driven search and social strategies.</p>
        </div>
      </div>
    </div>
  );
}
