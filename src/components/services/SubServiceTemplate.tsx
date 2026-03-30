import Link from "next/link";
import { PillarService, SubService } from "@/lib/services";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import styles from "./SubServiceTemplate.module.css";
import { PortableText } from "@portabletext/react";

interface SubServiceTemplateProps {
  pillar: PillarService;
  subService: SubService & { isSanity?: boolean };
}

export default function SubServiceTemplate({ pillar, subService }: SubServiceTemplateProps) {
  return (
    <div className={styles.clusterPage}>
      <section className={styles.hero}>
        <div className="container">
          <Breadcrumbs 
            items={[
              { label: 'Services', href: '/services' },
              { label: pillar.title, href: `/services/${pillar.slug}` },
              { label: subService.title, href: '' }
            ]} 
          />
          <h1 className={styles.title}>{subService.title}</h1>
          <p className={styles.description}>{subService.description}</p>
        </div>
      </section>

      <section className={styles.mainContent}>
        <div className="container">
          <div className={styles.layout}>
            <article className={styles.article}>
              <div className={styles.richText}>
                <h2>In-Depth Guide to {subService.title}</h2>
                {subService.isSanity ? (
                  <PortableText value={subService.content as any} />
                ) : (
                  <p>{subService.content}</p>
                )}
                <p>
                  At GrowthLab Limited, we specialize in delivering {subService.title} services that are tailored to the unique needs of businesses in Kenya. Our approach combines global best practices with local market insights to ensure your brand stands out in the Nairobi digital landscape.
                </p>
                
                <h3>Industry Insights for Kenya</h3>
                <p>
                  The digital ecosystem in Kenya is evolving rapidly. With over 20 million internet users, the competition for attention is fierce. {subService.title} is no longer optional; it's a critical component of any successful business strategy.
                </p>

                <h3>Our Performance Stack</h3>
                <ul className={styles.techStack}>
                  <li>Next.js & React for high-speed rendering</li>
                  <li>Sanity CMS for structured content</li>
                  <li>Technical SEO best practices</li>
                  <li>Data-driven analytics</li>
                </ul>

                <h3>Benefits of our Approach</h3>
                <p>
                  By choosing GrowthLab for your {subService.title}, you're investing in a solution that priorities speed, security, and search engine visibility. We don't just build; we optimize for conversion.
                </p>
              </div>

              <div className={styles.ctaBox}>
                <h3>Ready to scale your business?</h3>
                <p>Contact our experts today for a free consultation and strategy roadmap.</p>
                <Link href="/contact" className="btn btn-primary">Book Free Consultation</Link>
              </div>
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.pillarLink}>
                <h4>Part of our</h4>
                <h3>{pillar.title}</h3>
                <p>Learn how this fits into our broader {pillar.title} strategy.</p>
                <Link href={`/services/${pillar.slug}`} className={styles.link}>
                  View Pillar Page →
                </Link>
              </div>

              <div className={styles.relatedLinks}>
                <h4>Other {pillar.title} Services</h4>
                <ul>
                  {pillar.clusters.filter(c => c.slug !== subService.slug).map((related, idx) => (
                    <li key={idx}>
                      <Link href={`/services/${pillar.slug}/${related.slug}`}>
                        {related.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
