import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing & Transparent Packages | GrowthLab Limited Nairobi',
  description: 'Detailed pricing for digital marketing, SEO, and web development in Nairobi. No hidden fees, strictly ROI-focused tiers for Kenyan SMEs and enterprises.',
};

export default function PricingPage() {
  return (
    <div className="container" style={{ padding: '100px 0' }}>
      <header style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '25px', letterSpacing: '-1.5px' }}>Transparent, Performance-Based Pricing.</h1>
        <div style={{ maxWidth: '850px', margin: '0 auto', fontSize: '1.25rem', lineHeight: '1.8', color: '#444' }}>
          <p>
            At GrowthLab Limited, we intentionally display our baseline pricing to protect both your time and ours. In a Nairobi market often clouded by "hidden costs" and vague estimates, we offer clarity. This pricing upfront ensures that from our very first discovery call, we are not discussing budgets, but rather how specifically we will capture ROI for your business. Whether you are a Westlands-based SME or an enterprise scaling across East Africa, these tiers provide the roadmap for your digital dominance.
          </p>
        </div>
      </header>

      {/* 4 Core Service Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
        
        {/* Service 1: Social Media Management */}
        <section>
          <div style={{ borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              01. Social Media Management
              <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#666' }}>Monthly Subscription</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {/* Starter */}
            <div style={{ padding: '40px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Starter</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>KES 15,000<span style={{ fontSize: '0.9rem', color: '#888' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: '0', marginBottom: '30px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
                <li>• 2 Platforms (FB / IG)</li>
                <li>• 8 High-Quality Posts/mo</li>
                <li>• Basic Caption Writing</li>
                <li>• Profile Optimization</li>
                <li>• Bi-Weekly Engagement Check</li>
                <li>• Monthly Summary Report</li>
              </ul>
              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#666', marginBottom: '20px' }}>Best for: Startups needing a professional baseline presence.</p>
              <footer style={{ fontWeight: 'bold' }}>Timeline: Ongoing | Renew Monthly</footer>
            </div>
            {/* Growth */}
            <div style={{ padding: '40px', background: '#0a192f', color: '#fff', borderRadius: '8px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#ff6b00', color: '#fff', fontSize: '0.7rem', padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase', fontWeight: 'bold' }}>Popular</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Growth</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>KES 35,000<span style={{ fontSize: '0.9rem', color: '#aaa' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: '0', marginBottom: '30px', borderTop: '1px solid #233554', paddingTop: '20px' }}>
                <li>• 3 Platforms (FB/IG/LI)</li>
                <li>• 15 Custom Graphics/mo</li>
                <li>• Short-Form Video (Reels/TikTok)</li>
                <li>• Daily Community Moderation</li>
                <li>• Targeted Follower Growth</li>
                <li>• Strategic Content Calendar</li>
              </ul>
              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#aaa', marginBottom: '20px' }}>Best for: SMEs ready to aggressively build their community.</p>
              <footer style={{ fontWeight: 'bold' }}>Timeline: 3-Month Minimum Baseline</footer>
            </div>
            {/* Premium */}
            <div style={{ padding: '40px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Premium</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>KES 65,000<span style={{ fontSize: '0.9rem', color: '#888' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: '0', marginBottom: '30px', borderTop: '1px solid #ddd', paddingTop: '200px', display: 'none' }}></ul> {/* Hidden padding fix */}
              <ul style={{ listStyle: 'none', padding: '0', marginBottom: '30px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
                <li>• All Platforms (incl. X & TikTok)</li>
                <li>• 25 Posts + High-End Content</li>
                <li>• Professional Photography/Video Day</li>
                <li>• Influencer Outreach Support</li>
                <li>• Paid Ad Management (Budget Excl.)</li>
                <li>• Weekly Real-Time Reporting</li>
              </ul>
              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#666', marginBottom: '20px' }}>Best for: Brands requiring total market headspace saturation.</p>
              <footer style={{ fontWeight: 'bold' }}>Timeline: Continuous Execution</footer>
            </div>
          </div>
        </section>

        {/* Service 2: SEO & Digital Marketing */}
        <section>
          <div style={{ borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem' }}>02. Search Engine Optimization (SEO)</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ padding: '40px', border: '1px solid #eee' }}>
              <h3>SEO Starter</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>KES 25,000<span style={{ fontSize: '0.9rem' }}>/mo</span></div>
              <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                <li>Technical SEO Audit</li>
                <li>GMB (Google Maps) Fix</li>
                <li>Keyword Mapping (10 terms)</li>
                <li>On-Page Foundation</li>
                <li>1 Authority Blog Post/mo</li>
              </ul>
              <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>Best for: Local businesses in Nairobi seeking first-page maps visibility.</p>
              <footer style={{ marginTop: '20px', fontWeight: 'bold' }}>Timeline: 4-6 Month Result Curve</footer>
            </div>
            <div style={{ padding: '40px', border: '2px solid #ff6b00', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-15px', left: '20px', background: '#ff6b00', color: '#fff', padding: '2px 10px', fontSize: '0.8rem' }}>AGGRESSIVE SEARCH</div>
              <h3>SEO Growth</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>KES 55,000<span style={{ fontSize: '0.9rem' }}>/mo</span></div>
              <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                <li>Programmatic SEO Expansion</li>
                <li>Backlink Strategy (Off-Page)</li>
                <li>Content Siloing (Topic Authority)</li>
                <li>Competitor Gap Analysis</li>
                <li>4 Authority Blog Posts/mo</li>
              </ul>
              <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>Best for: Service providers competing in high-value Nairobi niches.</p>
              <footer style={{ marginTop: '20px', fontWeight: 'bold' }}>Timeline: Sustained ROI Focus</footer>
            </div>
            <div style={{ padding: '40px', border: '1px solid #eee' }}>
              <h3>SEO Dominance</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>KES 95,000<span style={{ fontSize: '0.9rem' }}>/mo</span></div>
              <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                <li>National Rank Competition</li>
                <li>PR & News Placement</li>
                <li>Deep Intent Conversion (CRO)</li>
                <li>Custom Data Dashboards</li>
                <li>High-Volume Pillar Content</li>
              </ul>
              <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>Best for: Enterprises and E-commerce stores looking for total dominance.</p>
              <footer style={{ marginTop: '20px', fontWeight: 'bold' }}>Timeline: Long-term Technical Partnership</footer>
            </div>
          </div>
        </section>

        {/* Service 3: Custom Web Development */}
        <section>
          <div style={{ borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem' }}>03. High-Performance Web Development</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ padding: '40px', background: '#fcfcfc' }}>
              <h3>Professional Web</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>From KES 45,000</div>
              <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                <li>Custom Branding & Design</li>
                <li>Mobile-Responsive Layout</li>
                <li>SSL & Security Foundation</li>
                <li>Contact Integration + Maps</li>
                <li>Deployment on Carbon-Neutral Hosting</li>
                <li>Baseline SEO Indexing</li>
              </ul>
              <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>Best for: Corporate entities requiring a powerful, fast digital presence.</p>
              <footer style={{ marginTop: '20px', fontWeight: 'bold' }}>Timeline: 2-3 Weeks Delivery</footer>
            </div>
            <div style={{ padding: '40px', background: '#fcfcfc' }}>
              <h3>E-commerce / CMS</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>From KES 120,000</div>
              <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                <li>Product Management System</li>
                <li>M-Pesa / Card Integration</li>
                <li>Inventory Tracking</li>
                <li>Custom SEO Product Schema</li>
                <li>Automated Email Notifications</li>
                <li>Customer Dashboard</li>
              </ul>
              <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>Best for: Retailers serious about scaling online sales in Kenya.</p>
              <footer style={{ marginTop: '20px', fontWeight: 'bold' }}>Timeline: 4-6 Weeks Delivery</footer>
            </div>
            <div style={{ padding: '40px', background: '#0a192f', color: '#fff' }}>
              <h3>Enterprise / SaaS</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>From KES 250,000</div>
              <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                <li>Next.js / Supabase Engineering</li>
                <li>Real-time Data Processing</li>
                <li>Custom Portal / Dashboard</li>
                <li>Third-Party API Bridge</li>
                <li>Elastic Scalability Infrastructure</li>
                <li>Advanced Logic & Automation</li>
              </ul>
              <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#aaa' }}>Best for: Disruptors building the next big tech platform in East Africa.</p>
              <footer style={{ marginTop: '20px', fontWeight: 'bold' }}>Timeline: 8+ Weeks (Agile Sprints)</footer>
            </div>
          </div>
        </section>

        {/* Service 4: AI & Systems */}
        <section style={{ background: '#ff6b00', color: '#fff', padding: '60px', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>04. AI Integration & Systems</h2>
          <p style={{ maxWidth: '800px', fontSize: '1.2rem', marginBottom: '40px' }}>
            Custom engineering is unique to each business. We don't use "off-the-shelf" bots. We build autonomous agents that live within your backend and drive operational efficiency.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>AI Starter Audit</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>KES 150,000</p>
              <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>Detailed system-readiness audit + Implementation Roadmap.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Mid-Market Integration</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>KES 400,000+</p>
              <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>Custom LLM implementation + Workflow Automation for 1 Department.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Custom Enterprise</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Custom Quote</p>
              <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>Full-scale AI transformation across the entire digital infrastructure.</p>
            </div>
          </div>
        </section>

      </div>

      {/* New Section: What Affects Your Price */}
      <section style={{ marginTop: '100px', padding: '60px', border: '1px solid #000' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>What Affects Your Price?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Technical Complexity</h4>
            <p style={{ color: '#555' }}>A static landing page costs less than a dynamic dashboard requiring private user data, real-time M-Pesa hooks, and serverless background workers. The depth of the "logic" is our primary cost driver.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Market Competition</h4>
            <p style={{ color: '#555' }}>Competing for "Nairobi Real Estate" keywords in SEO requires significantly more link-building and content volume than a niche field like "Industrial Sealants Kenya." Competition dictates the volume of effort.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Speed to Market</h4>
            <p style={{ color: '#555' }}>Rush projects requiring weekend sprints or dedicated developers to bypass our existing 8-week roadmap will attract a 25% premium to ensure mission-critical priority.</p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{ marginTop: '100px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>How We Compare</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #000' }}>
                <th style={{ padding: '20px' }}>Feature / Benefit</th>
                <th style={{ padding: '20px' }}>Freelancer</th>
                <th style={{ padding: '20px', background: '#f9f9f9' }}>GrowthLab Limited</th>
                <th style={{ padding: '20px' }}>Large "Global" Agency</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '20px' }}>Turnaround Time</td>
                <td style={{ padding: '20px' }}>Unpredictable</td>
                <td style={{ padding: '20px', background: '#f9f9f9', fontWeight: 'bold' }}>Sprinted & Disciplined</td>
                <td style={{ padding: '20px' }}>Slow (Red Tape)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '20px' }}>Technical Skill</td>
                <td style={{ padding: '20px' }}>Varies wildly</td>
                <td style={{ padding: '20px', background: '#f9f9f9', fontWeight: 'bold' }}>Engineering-Led</td>
                <td style={{ padding: '20px' }}>Template-Focused</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '20px' }}>Localized Strategy</td>
                <td style={{ padding: '20px' }}>Moderate</td>
                <td style={{ padding: '20px', background: '#f9f9f9', fontWeight: 'bold' }}>Nairobi-First</td>
                <td style={{ padding: '20px' }}>Generic "Africa" Desk</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '20px' }}>Pricing</td>
                <td style={{ padding: '20px', color: 'green' }}>Cheap</td>
                <td style={{ padding: '20px', background: '#f9f9f9', fontWeight: 'bold' }}>Mid-Range (Value)</td>
                <td style={{ padding: '20px', color: 'red' }}>Expensive (Overhead)</td>
              </tr>
              <tr style={{ borderBottom: '2px solid #000' }}>
                <td style={{ padding: '20px' }}>Accountability</td>
                <td style={{ padding: '20px' }}>Low (Single point of failure)</td>
                <td style={{ padding: '20px', background: '#f9f9f9', fontWeight: 'bold' }}>Direct ROI Mapping</td>
                <td style={{ padding: '20px' }}>Account Management Layers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ marginTop: '100px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '60px', textAlign: 'center' }}>Pricing & Engagement FAQ</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>What is the deposit requirement?</h4>
            <p style={{ color: '#555' }}>For all web development and one-time projects, we require a 50% commitment deposit before the discovery cycle begins. For monthly retainers, we bill in advance at the start of each month.</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Are hosting and domain costs included?</h4>
            <p style={{ color: '#555' }}>We provide 1 year of free premium hosting (Next.js specialized) for all Web Development projects. Domain registration is the client's responsibility, though we provide the technical procurement guidance for free.</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Do you allow installment payments?</h4>
            <p style={{ color: '#555' }}>For enterprise projects above KES 500,000, we can structure payments into 3 or 4 milestones (25/25/25/25). Performance retainers are fixed monthly fees.</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Is there a discount for long-term retainers?</h4>
            <p style={{ color: '#555' }}>Yes. All annual SEO or Social Media contracts signed for 12 months attract a 10% discount on the total management fee, paid quarterly.</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>In what currency do you bill?</h4>
            <p style={{ color: '#555' }}>We bill in Kenya Shillings (KES) for all local clients. For international partners based outside of East Africa, we bill in USD based on the prevailing Central Bank of Kenya rate.</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Is VAT included in the displayed prices?</h4>
            <p style={{ color: '#555' }}>No. All baseline prices shown on this page are exclusive of 16% VAT. A formal Tax Invoice will be issued for all payments.</p>
          </div>
        </div>
      </section>

      <footer style={{ marginTop: '100px', textAlign: 'center', background: '#0a192f', color: '#fff', padding: '80px', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Ready to Invest in Precision?</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 40px', fontSize: '1.2rem', opacity: 0.9 }}>
          GrowthLab isn't the cheapest option in Nairobi—and we don't aim to be. We are the choice for businesses that value technical superiority and measured revenue growth over vanity stickers.
        </p>
        <Link href="/contact" className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>Initiate Discovery Call</Link>
      </footer>
    </div>
  );
}
