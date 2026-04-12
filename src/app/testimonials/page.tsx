import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Testimonials | GrowthLab Limited',
  description: 'Read what our clients across Kenya and East Africa have to say about partnering with GrowthLab Limited for their digital transformation.',
};

export default function TestimonialsPage() {
  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <h1>Client Testimonials</h1>
      <p style={{ maxWidth: '800px', margin: '20px auto 40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
        Don&apos;t just take our word for it. Here&apos;s what our partners across Kenya and East Africa have experienced when working with GrowthLab Limited.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px', maxWidth: '800px', margin: '0 auto' }}>
        <blockquote style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid #0056b3' }}>
          <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>"GrowthLab completely transformed our online presence. Our organic traffic doubled within 4 months, and the quality of leads improved significantly."</p>
          <footer>— Leading Real Estate Firm, Nairobi</footer>
        </blockquote>
        <blockquote style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid #0056b3' }}>
          <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>"The custom web application they built for our ecommerce business has been a game-changer. Fast, secure, and incredibly user-friendly."</p>
          <footer>— E-commerce Retailer, Kenya</footer>
        </blockquote>
      </div>
    </div>
  );
}
