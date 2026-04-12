import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Development & Marketing Agency in Karen | GrowthLab',
  description: 'Elevate your Karen-based business with premium digital marketing, custom website design, and highly targeted SEO strategies from GrowthLab Limited.',
};

export default function KarenLocationPage() {
  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <h1>Premium Digital Agency Services in Karen, Nairobi</h1>
      <p style={{ maxWidth: '800px', margin: '20px auto 40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
        For boutique businesses, real estate developers, and service providers in Karen, we craft premium digital experiences parallel to your brand's prestige.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Boutique Digital Marketing</h3>
          <p>High-end social media management and bespoke marketing automation designed for discerning clientele.</p>
        </div>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Real Estate & Hospitality Focus</h3>
          <p>Beautiful, fast-loading visual portfolios and booking systems for the prime real estate market in Karen.</p>
        </div>
      </div>
    </div>
  );
}
