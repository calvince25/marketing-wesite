import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | GrowthLab Limited',
  description: 'How long does SEO take? What is your pricing? Find the answers to the most specific questions about working with GrowthLab.',
};

export default function FAQPage() {
  return (
    <div className="container" style={{ padding: '80px 0', maxWidth: '900px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', textAlign: 'center' }}>Frequently Asked Questions</h1>
      <p style={{ maxWidth: '800px', margin: '0 auto 60px', fontSize: '1.2rem', lineHeight: '1.6', color: '#555', textAlign: 'center' }}>
        Straight answers to complex questions. Learn exactly what to expect when partnering with our digital agency.
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        <div style={{ paddingBottom: '30px', borderBottom: '1px solid #eee' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>1. How long does SEO actually take to see results in Kenya?</h3>
          <p style={{ color: '#444', lineHeight: '1.8' }}>
            Unlike paid ads, SEO is a compounding investment. Typically, for a moderately competitive niche in Kenya, you will begin seeing a measurable lift in organic impressions within <strong>3 to 4 months</strong>. Highly substantial, revenue-driving placements (Position 1-3 on Google) generally require <strong>6 to 9 months</strong> of consistent technical optimization and authoritative content generation.
          </p>
        </div>

        <div style={{ paddingBottom: '30px', borderBottom: '1px solid #eee' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>2. What is your pricing model?</h3>
          <p style={{ color: '#444', lineHeight: '1.8' }}>
            We utilize a transparent, range-based pricing model ensuring there is no sticker-shock. Our monthly marketing retainers (Social Media, SEO) start as low as <strong>KES 15,000 to KES 25,000</strong>. One-off technical projects like custom Next.js web application development begin at <strong>KES 45,000</strong>. You can view our full breakdown on our <Link href="/pricing" style={{ textDecoration: 'underline', color: '#0056b3' }}>Pricing Page</Link>.
          </p>
        </div>

        <div style={{ paddingBottom: '30px', borderBottom: '1px solid #eee' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>3. Do you work with small businesses?</h3>
          <p style={{ color: '#444', lineHeight: '1.8' }}>
            Absolutely. In fact, scaling SMEs is our specialty. We engineer our marketing systems so that agile small businesses can punch above their weight, utilizing localized SEO and smart automation to compete directly with large enterprise budgets.
          </p>
        </div>

        <div style={{ paddingBottom: '30px', borderBottom: '1px solid #eee' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>4. What makes GrowthLab different from other agencies?</h3>
          <p style={{ color: '#444', lineHeight: '1.8' }}>
            We strictly refuse to report on "Vanity Metrics" (likes, arbitrary page views). Instead, our focus is entirely on <strong>ROI and pipeline conversion</strong>. Furthermore, our technical advantage is vastly superior. Instead of using sluggish drag-and-drop builders, we develop high-speed customized React/Next.js infrastructure that positions your technical SEO leagues ahead of standard competitors.
          </p>
        </div>

        <div style={{ paddingBottom: '30px', borderBottom: '1px solid #eee' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>5. How do I get started with the onboarding process?</h3>
          <p style={{ color: '#444', lineHeight: '1.8' }}>
            Our onboarding is a simple 3-step process:<br/><br/>
            <strong>Step 1: Discovery.</strong> You <Link href="/contact" style={{ textDecoration: 'underline', color: '#0056b3' }}>contact us</Link> and we hold a brief strategy consultation.<br/>
            <strong>Step 2: Architecture.</strong> We conduct a deep audit of your industry and send a custom technical proposal and timeline.<br/>
            <strong>Step 3: Launch.</strong> Upon approval, we deploy your campaign roadmap and execute your growth strategy immediately.
          </p>
        </div>

      </div>
    </div>
  );
}
