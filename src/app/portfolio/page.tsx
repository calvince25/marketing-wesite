import styles from "./portfolio.module.css";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

const staticProjects = [
  { title: "Luxury Brand UI", category: "Web Design", img: "/media/portfolio1.png" },
  { title: "Fintech Dashboard", category: "App Development", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
  { title: "E-commerce Giant", category: "SEO & Content", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80" }
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

              return (
                <div key={idx} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    {image && <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />}
                  </div>
                  <div className={styles.content}>
                    <span>{category}</span>
                    <h3>{title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
