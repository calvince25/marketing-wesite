import Link from "next/link";
import { PillarService, SubService } from "@/lib/services";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import styles from "./SubServiceTemplate.module.css";
import { PortableText } from "@portabletext/react";
import React from 'react';

const renderStaticContent = (content: string) => {
  if (!content) return null;
  const parts = content.split(/(\*\*.*?\*\*)/g);
  return (
    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <h3 key={i} style={{ color: '#FF6B00', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700' }}>
              {part.slice(2, -2)}
            </h3>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </div>
  );
};

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
          <h1 className={styles.title}>{subService.h1 || subService.title}</h1>
          <p className={styles.description}>{subService.description}</p>
        </div>
      </section>

      <section className={styles.mainContent}>
        <div className="container">
          <div className={styles.layout}>
            <article className={styles.article}>
              <div className={styles.richText}>
                {subService.isSanity ? (
                  <PortableText value={subService.content as any} />
                ) : (
                  renderStaticContent(subService.content as string)
                )}
              </div>

              <div className={styles.ctaBox}>
                <h3>Ready to scale your business?</h3>
                <p>GrowthLab Limited is Nairobi&apos;s leading digital partner. Let&apos;s build your future together.</p>
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
