import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Digital Marketing & SEO in Westlands | GrowthLab Limited',
  description: 'GrowthLab Limited is headquartered in Westlands, Nairobi. We provide premium web design and digital marketing services to Westlands businesses.',
};

export default function WestlandsLocationPage() {
  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <h1>Digital Agency in Westlands, Nairobi</h1>
      <p style={{ maxWidth: '800px', margin: '20px auto 40px', fontSize: '1.2rem', lineHeight: '1.6' }}>
        Our headquarters are proudly located in Westlands, the prime commercial hub of Nairobi. We offer tailor-made digital strategies for local corporate and retail businesses.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Driving Growth in Westlands</h3>
          <p>From upscale restaurants to corporate HQs, we ensure your brand stands out in one of Nairobi's most competitive districts.</p>
        </div>
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Why Choose Us?</h3>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>Local Presence for Easy Meetings</li>
            <li>Data-Driven Marketing Campaigns</li>
            <li>High-End Custom Web Development</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
