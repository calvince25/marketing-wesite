import styles from "./portfolio.module.css";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/client";
import { allProjectsQuery } from "@/lib/queries";
import HeroSection from "@/components/layout/HeroSection";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  const displayProjects = await client.fetch(allProjectsQuery).catch(() => []);

  // Filter only published projects (for public view)
  const publishedProjects = displayProjects.filter((p: any) => p.status !== 'Draft');

  return (
    <div className={styles.portfolioPage}>
      <HeroSection 
        page="portfolio" 
        defaultTitle="Our Work" 
        defaultSubtitle="Explore our portfolio of high-performance digital solutions." 
      />

      <section className={styles.projects}>
        <div className="container">
          <div className={styles.grid}>
            {publishedProjects.length === 0 ? (
              <div style={{ gridColumn: 'span 3', padding: '80px 20px', textAlign: 'center', color: '#64748b' }}>
                <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>No projects published yet</h3>
                <p style={{ fontSize: '14px', color: '#94a3b8' }}>Check back later or contact us for a structured consultation.</p>
              </div>
            ) : (
              publishedProjects.map((project: any, idx: number) => {
                const title = project.name || project.title;
                const category = project.category || project.client || 'Project';
                const image = project.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80';
                const slug = project.slug?.current || '';
                
                const demoUrl = project.projectLink || '';
                const isDemoExternal = demoUrl !== '#' && demoUrl !== '';
                const formattedDemoUrl = isDemoExternal ? (demoUrl.startsWith('http') ? demoUrl : `https://${demoUrl}`) : '';

                const repoUrl = project.githubLink || '';
                const isRepoExternal = repoUrl !== '' && repoUrl !== '#';
                const formattedRepoUrl = isRepoExternal ? (repoUrl.startsWith('http') ? repoUrl : `https://${repoUrl}`) : '';

                return (
                  <div key={idx} className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div className={styles.content}>
                      <span className={styles.category}>{category}</span>
                      <h3 className={styles.title}>{title}</h3>
                      <p className={styles.description}>{project.description}</p>
                      
                      <div className={styles.techTags}>
                        {(project.technologies || []).map((tech: string, techIdx: number) => (
                          <span key={techIdx} className={styles.tag}>{tech}</span>
                        ))}
                      </div>

                      <div className={styles.btnGroup}>
                        {formattedDemoUrl && (
                          <a 
                            href={formattedDemoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.btnPrimary}
                          >
                            <ExternalLink size={12} /> Live Demo
                          </a>
                        )}
                        
                        {formattedRepoUrl && (
                          <a 
                            href={formattedRepoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.btnSecondary}
                          >
                            <Github size={12} /> Code
                          </a>
                        )}

                        <Link href={`/portfolio/${slug}`} className={styles.btnDetails}>
                          Details <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
