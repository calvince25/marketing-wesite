import Link from "next/link";
import { PillarService } from "@/lib/services";
import JsonLd from "@/components/seo/JsonLd";
import styles from "./PillarTemplate.module.css";
import { PortableText } from "@portabletext/react";

interface PillarTemplateProps {
  service: PillarService & { isSanity?: boolean };
}

export default function PillarTemplate({ service }: PillarTemplateProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "GrowthLab Limited",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nairobi",
        "addressCountry": "KE"
      }
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": service.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    }
  };

  return (
    <div className={styles.pillarPage}>
      <JsonLd data={schemaData} />
      <section className={styles.hero}>
        <div className="container">
          <Link href="/services" className={styles.backLink}>← All Services</Link>
          <h1 className={styles.title}>{service.title}</h1>
          <p className={styles.description}>{service.description}</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.mainContent}>
              <div className={styles.section}>
                <h2>Overview</h2>
                {service.isSanity ? (
                  <div className={styles.richText}>
                    <PortableText value={service.overview as any} />
                  </div>
                ) : (
                  <p>{service.overview as any}</p>
                )}
              </div>

              <div className={styles.section}>
                <h2>Topic Clusters</h2>
                <div className={styles.clusterGrid}>
                  {service.clusters.map((cluster, idx) => (
                      <Link key={idx} href={`/services/${service.slug}/${cluster.slug}`} className={styles.clusterCard}>
                      <h3>{cluster.title}</h3>
                      <p>{cluster.description}</p>
                      <span className={styles.learnMore}>Read Deep Dive →</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h2>Our Process</h2>
                <div className={styles.processList}>
                  {service.process.map((p, idx) => (
                    <div key={idx} className={styles.processItem}>
                      <span className={styles.stepNum}>{idx + 1}</span>
                      <div>
                        <h4>{p.step}</h4>
                        <p>{p.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h2>Frequently Asked Questions</h2>
                <div className={styles.faqList}>
                  {service.faqs.map((faq, idx) => (
                    <div key={idx} className={styles.faqItem}>
                      <h4>{faq.q}</h4>
                      <p>{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.benefitsCard}>
                <h3>Key Benefits</h3>
                <ul>
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
                <Link href="/contact" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                  Get Started
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
