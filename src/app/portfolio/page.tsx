import styles from "./portfolio.module.css";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

const staticProjects = [
  { title: "Mells Fashion", category: "E-commerce", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80", url: "https://www.mellsfasion.co.ke" },
  { title: "Restaurant POS System", category: "Systems Integration", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80", url: "https://pos-system-two-tawny.vercel.app" },
  { title: "GrowthLab Analytics", category: "AI & Data", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", url: "#" }
];

export default async function PortfolioPage() {
  const projectsFromSanity = await client.fetch(allProjectsQuery).catch(() => []);
  const displayProjects = projectsFromSanity.length > 0 ? projectsFromSanity : staticProjects;

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
            {displayProjects.map((project: any, idx: number) => {
              const isSanity = !!project._id;
              const title = isSanity ? project.name : project.title;
              const category = isSanity ? (project.client || 'Project') : project.category;
              const image = isSanity ? (project.images?.[0] ? urlForImage(project.images[0]).url() : '') : project.img;

              const url = isSanity ? (project.link || '#') : project.url;

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
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
