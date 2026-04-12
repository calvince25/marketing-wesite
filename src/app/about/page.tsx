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
          <h1 className={styles.title}>About GrowthLab Limited — Nairobi&apos;s Digital Growth Agency</h1>
          <div className={styles.subtitle}>
            GrowthLab Limited is a premium digital agency in Nairobi dedicated to transforming businesses through data-driven strategies and high-end design.
          </div>
        </div>
      </section>

      <section className={styles.contentSections}>
        <div className="container">
          <div className={styles.section}>
            <h2>Who We Are</h2>
            <p>
              GrowthLab Limited is a premium digital agency based in Westlands, Nairobi, specializing in high-performance digital solutions for businesses that demand excellence. We are not a volume-based agency; we are a boutique team of experts focused on precision, data-driven results, and a minimalist design philosophy. We believe that in the digital world, less is often more—more speed, more clarity, and more conversion. Our team combines technical expertise with a deep understanding of the Kenyan market to deliver websites, marketing campaigns, and automation systems that don&apos;t just look good but drive actual revenue.
            </p>
          </div>

          <div className={styles.section}>
            <h2>What We Do</h2>
            <p>Our core competencies lie at the intersection of technology and marketing. We provide:</p>
            <ul>
              <li><strong>Custom Web Development:</strong> Building fast, secure, and scalable websites using modern technologies that ensure your brand is accessible and professional 24/7.</li>
              <li><strong>SEO & Digital Marketing:</strong> Strategies designed to capture intent and turn searchers into loyal customers through technical optimization and content authority.</li>
              <li><strong>Business Automation:</strong> Streamlining your operations by connecting your tools and automating repetitive tasks, allowing you to focus on scaling your business.</li>
              <li><strong>AI Systems Integration:</strong> Future-proofing your enterprise by implementing AI chatbots, data analytics, and intelligent systems that provide a competitive edge.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>Why We Exist</h2>
            <p>
              Many Kenyan businesses struggle to see a real ROI from their digital presence. They often end up with slow, generic websites or marketing campaigns that fail to reach their target audience. GrowthLab was founded to solve this problem. We exist to provide technical clarity and strategic brilliance, ensuring every shilling you spend on digital contributes to your bottom line. We bridge the gap between complex technology and business growth, making high-end digital solutions accessible to SMEs and enterprises across East Africa.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Our Values</h2>
            <ul>
              <li><strong>Precision:</strong> We measure twice and cut once. Every line of code and every marketing campaign is crafted with meticulous attention to detail.</li>
              <li><strong>Transparency:</strong> We believe in open communication. No technical jargon, no hidden fees—just honest reports and clear strategic advice.</li>
              <li><strong>Performance:</strong> We are obsessed with results. Whether it&apos;s page load speed or conversion rates, we optimize until we hit the gold standard.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>Location and Availability</h2>
            <p>
              Headquartered in the heart of Nairobi&apos;s Westlands district, GrowthLab is deep-rooted in Kenya&apos;s primary business hub. While we are physically based in Nairobi, our reach extends across Kenya and the broader East African region. We are available for both in-person consultations at our Westlands office and virtual strategy sessions, helping businesses from Mombasa to Kampala achieve their digital goals.
            </p>
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
