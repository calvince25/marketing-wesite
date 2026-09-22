import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website Design Cost Kenya | Packages, Scope & Support',
  description: 'Understand website design cost in Kenya, what a professional website package includes, realistic timelines, M-Pesa options, hosting, and ongoing support.',
  alternates: { canonical: '/website-design-cost-kenya' },
};

const factors = [
  ['Website type', 'A brochure website, e-commerce store, booking platform, and custom web application require different discovery, design, development, and testing effort.'],
  ['Content and pages', 'Page count, copywriting, photography, product catalogue size, translations, and migration work affect both scope and timeline.'],
  ['Integrations', 'M-Pesa or card checkout, CRM, email marketing, analytics, booking, inventory, and other APIs need implementation and testing.'],
  ['Support after launch', 'Hosting, backups, security updates, monitoring, training, and improvements should be agreed before the project starts.'],
];

export default function WebsiteDesignCostKenyaPage() {
  return (
    <main className="container" style={{ padding: '80px 20px', maxWidth: '1040px' }}>
      <nav aria-label="Breadcrumb" style={{ marginBottom: '28px', color: '#64748b' }}>
        <Link href="/services">Services</Link> / Website design cost Kenya
      </nav>
      <h1>Website Design Cost in Kenya: What a Professional Package Includes</h1>
      <p style={{ maxWidth: '820px', fontSize: '1.2rem', lineHeight: 1.7 }}>
        Website design cost in Kenya depends on the outcome you need, not only the number of pages. A reliable quote should explain the platform, content, integrations, testing, ownership, launch support, and ongoing maintenance so you can compare like with like.
      </p>

      <section style={{ marginTop: '52px' }}>
        <h2>What changes the cost of a website?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '18px', marginTop: '24px' }}>
          {factors.map(([title, description]) => (
            <article key={title} style={{ padding: '24px', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
              <h3>{title}</h3>
              <p style={{ lineHeight: 1.7 }}>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '52px' }}>
        <h2>Questions to ask before accepting a website quote</h2>
        <ul style={{ lineHeight: 1.9, paddingLeft: '24px' }}>
          <li>Is the quote for design only, or does it include development, content, SEO setup, analytics, and launch?</li>
          <li>Who owns the domain, hosting account, source code, design files, and website data?</li>
          <li>Are mobile testing, security updates, backups, and post-launch support included?</li>
          <li>Can the site support Kenyan payment options such as M-Pesa, and who handles reconciliation and support?</li>
          <li>What is the delivery timeline, what does the client need to provide, and how are changes handled?</li>
        </ul>
      </section>

      <section style={{ marginTop: '52px' }}>
        <h2>Choose the right website development path</h2>
        <p style={{ lineHeight: 1.8 }}>
          GrowthLab scopes projects around the business goal: a focused website for a service business, an e-commerce website with product and M-Pesa workflows, or a custom web application for more complex operations. We explain the trade-offs between speed, flexibility, ownership, and ongoing support before development begins.
        </p>
        <p style={{ lineHeight: 1.8 }}>
          Explore our <Link href="/services/web-development">web development services</Link>, review <Link href="/services/web-development/ecommerce-solutions">e-commerce website development with M-Pesa options</Link>, or <Link href="/contact">request a project scope and quote</Link>.
        </p>
      </section>
    </main>
  );
}
