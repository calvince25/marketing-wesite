import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";
import { client } from "@/sanity/lib/client";
import { pageContentQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";

export default async function AboutPage() {
  const aboutContent = await client.fetch(pageContentQuery, { page: 'about' }).catch(() => null);

  const heroSection = aboutContent?.sections?.find((s: any) => s.title.toLowerCase().includes('hero')) || {
    title: "Precision. Performance. Growth.",
    content: "GrowthLab Limited is a premium digital agency in Nairobi dedicated to transforming businesses through data-driven strategies and high-end design."
  };

  const missionSection = aboutContent?.sections?.find((s: any) => s.title.toLowerCase().includes('mission')) || {
    title: "Our Mission",
    content: "Unlike traditional agencies that focus on vanity metrics, we prioritize revenue and measurable ROI. Our mission is to empower brands in Kenya and beyond with technical excellence and strategic clarity."
  };

  return (
    <div className={styles.aboutPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>{heroSection.title}</h1>
          <div className={styles.subtitle}>
            {typeof heroSection.content === 'string' ? heroSection.content : <PortableText value={heroSection.content} />}
          </div>
        </div>
      </section>

      <section className={styles.mission}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.imageWrapper}>
               <Image src="/media/about.png" alt="GrowthLab Team" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.content}>
              <h2>{missionSection.title}</h2>
              <div className={styles.missionText}>
                {typeof missionSection.content === 'string' ? missionSection.content : <PortableText value={missionSection.content} />}
              </div>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <h3>500+</h3>
                  <p>Projects Delivered</p>
                </div>
                <div className={styles.stat}>
                  <h3>$10M+</h3>
                  <p>Revenue Generated</p>
                </div>
                <div className={styles.stat}>
                  <h3>10yrs</h3>
                  <p>Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <h2>Ready to partner with Nairobi's leading digital agency?</h2>
          <Link href="/contact" className="btn btn-primary">Start Your Journey</Link>
        </div>
      </section>
    </div>
  );
}
