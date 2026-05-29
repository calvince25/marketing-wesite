import styles from "./portfolio.module.css";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export default async function PortfolioPage() {
  const displayProjects = await client.fetch(allProjectsQuery).catch(() => []);

  return (
    <div className={styles.portfolioPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Our Work</h1>
          <p className={styles.subtitle}>Explore our portfolio of high-performance digital solutions.</p>
        </div>
      </section>

      <section className={styles.projects}>
        <div className="container">
          <div className={styles.grid}>
            {displayProjects.length === 0 ? (
              <div style={{ gridColumn: 'span 3', padding: '80px 20px', textAlign: 'center', color: '#64748b' }}>
                <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>No projects published yet</h3>
                <p style={{ fontSize: '14px', color: '#94a3b8' }}>Check back later or contact us for a structured consultation.</p>
              </div>
            ) : (
              displayProjects.map((project: any, idx: number) => {
                const title = project.name || project.title;
                const category = project.client || 'Project';
                const image = project.images?.[0] ? urlForImage(project.images[0]).url() : '';
                const url = project.projectLink || project.link || '#';

                return (
                  <Link key={idx} href={url} target={url.startsWith('http') ? "_blank" : "_self"} className={styles.card}>
                    <div className={styles.imageWrapper}>
                      {image && <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />}
                    </div>
                    <div className={styles.content}>
                      <span>{category}</span>
                      <h3>{title}</h3>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
