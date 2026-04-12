import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Restaurant POS & Booking Case Study | GrowthLab',
  description: 'GrowthLab helped a Nairobi restaurant increase online orders by 180% within 90 days by implementing an integrated digital POS and automated booking funnel.',
};

export default function POSCaseStudy() {
  return (
    <div className="container" style={{ padding: '80px 0', maxWidth: '900px' }}>
      <Link href="/case-studies" style={{ color: '#555', textDecoration: 'underline', marginBottom: '20px', display: 'inline-block' }}>← Back to Case Studies</Link>
      
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', lineHeight: '1.2' }}>Nairobi Restaurant Increases Online Orders by 180% in 90 Days</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px' }}>How resolving operational bottlenecks with an integrated digital Point-of-Sale (POS) and automated booking funnel scaled culinary revenue.</p>
      
      <div style={{ background: '#f5f5f5', padding: '30px', borderRadius: '8px', marginBottom: '40px', display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        <div style={{ flex: '1 1 200px' }}>
          <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#888', fontWeight: 'bold' }}>Industry</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Hospitality & Food</div>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#888', fontWeight: 'bold' }}>Core Services</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Systems Integration & SEO</div>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#888', fontWeight: 'bold' }}>Duration</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>3 Months</div>
        </div>
      </div>

      <div style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
        <h2 style={{ fontSize: '2rem', marginTop: '40px', marginBottom: '20px' }}>The Challenge</h2>
        <p>A thriving restaurant in Nairobi's CBD was hitting an operational ceiling. Their online orders were handled via direct messages on Instagram and phone calls, resulting in dropped tickets, chaotic delivery dispatching, and exhausted staff. Without a centralized booking or ordering system, scaling customer acquisition through digital marketing simply wasn't viable—the existing manual infrastructure would break under the pressure.</p>

        <h2 style={{ fontSize: '2rem', marginTop: '40px', marginBottom: '20px' }}>Our Approach</h2>
        <p>GrowthLab recognized that the bottleneck wasn't demand, but systems. We deployed an end-to-end cloud-based <strong>Point-Of-Sale (POS) Integration</strong>. This system mapped the restaurant's menu aggressively to an optimized web-portal built for rapid mobile purchasing.</p>
        <p>Additionally, we developed localized <strong>"Food Delivery Nairobi"</strong> SEO funnels directly targeting intent-driven search traffic, pushing customers into the new friction-free ordering environment instead of a crowded WhatsApp inbox.</p>

        <h2 style={{ fontSize: '2rem', marginTop: '40px', marginBottom: '20px' }}>The Results</h2>
        <p>Administrative chaos was eliminated. Incoming orders now fed directly into a kitchen display system, with automated rider dispatch logic. Wait times decreased, and customer satisfaction soared. The seamless ordering process, combined with our targeted local SEO, generated rapid growth.</p>

        <div style={{ background: '#111', color: '#fff', padding: '40px', borderRadius: '12px', marginTop: '40px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Key Metrics Achieved</h3>
          <ul style={{ listStyle: 'none', padding: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <li>
              <span style={{ display: 'block', fontSize: '2.5rem', fontWeight: '900', color: '#4ade80' }}>+180%</span>
              <span style={{ fontSize: '1rem', color: '#aaa' }}>Increase in Online Delivery Orders</span>
            </li>
            <li>
              <span style={{ display: 'block', fontSize: '2.5rem', fontWeight: '900', color: '#4ade80' }}>90 Days</span>
              <span style={{ fontSize: '1rem', color: '#aaa' }}>Time to Target Growth Marker</span>
            </li>
            <li>
              <span style={{ display: 'block', fontSize: '2.5rem', fontWeight: '900', color: '#4ade80' }}>-35%</span>
              <span style={{ fontSize: '1rem', color: '#aaa' }}>Reduction in Administrative Man-Hours</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div style={{ marginTop: '60px', textAlign: 'center', padding: '40px', background: '#f5f5f5', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '15px' }}>Need scalable systems for your business?</h3>
        <Link href="/contact" className="btn btn-primary" style={{ padding: '15px 30px', background: '#000', color: '#fff', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Schedule a Systems Audit</Link>
      </div>
    </div>
  );
}
