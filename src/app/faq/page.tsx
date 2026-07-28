import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { allFaqsQuery } from '@/sanity/lib/queries';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | GrowthLab Limited',
  description: 'How long does SEO take? What is your pricing? Find the answers to the most specific questions about working with GrowthLab.',
};

export const dynamic = 'force-dynamic';

export default async function FAQPage() {
  const faqs = await client.fetch(allFaqsQuery).catch(() => []);

  return (
    <div className="container" style={{ padding: '80px 0', maxWidth: '900px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', textAlign: 'center' }}>Frequently Asked Questions</h1>
      <p style={{ maxWidth: '800px', margin: '0 auto 60px', fontSize: '1.2rem', lineHeight: '1.6', color: '#555', textAlign: 'center' }}>
        Straight answers to complex questions. Learn exactly what to expect when partnering with our digital agency.
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {faqs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            <p>No FAQs available at the moment. Please check back later.</p>
          </div>
        ) : (
          faqs.map((faq: any, idx: number) => (
            <div key={faq.id || faq._id || idx} style={{ paddingBottom: '30px', borderBottom: '1px solid #eee' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
                {idx + 1}. {faq.question}
              </h3>
              <p style={{ color: '#444', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                {faq.answer}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
