import { client } from "@/sanity/lib/client";
import { heroImageQuery } from "@/sanity/lib/queries";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  page: string;
  defaultTitle: string;
  defaultSubtitle: string;
  children?: React.ReactNode;
}

export default async function HeroSection({
  page,
  defaultTitle,
  defaultSubtitle,
  children
}: HeroSectionProps) {
  // Fetch from mock Sanity client (reads from our JSON DB)
  const hero = await client.fetch(heroImageQuery, { page }).catch(() => null);

  const title = hero?.titleText || defaultTitle;
  const subtitle = hero?.subtitleText || defaultSubtitle;
  const imageUrl = hero?.imageUrl;

  return (
    <section className={styles.heroContainer} id={`${page}-hero`}>
      {imageUrl ? (
        <div 
          className={styles.heroBg} 
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ) : (
        // Premium default background gradient if no image exists
        <div className={styles.heroBgDefault} />
      )}
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{title}</h1>
        {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
