import styles from "./details.module.css";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/supabase";
import { ExternalLink, Github, Calendar, User, Folder, ArrowLeft } from "lucide-react";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  
  const project = await getProjectBySlug(slug);
  if (!project || project.status === 'Draft') {
    notFound();
  }

  // Fetch all projects for related projects recommendation
  const allProjects = await getProjects().catch(() => []);
  const relatedProjects = allProjects
    .filter((p: any) => p.status !== 'Draft' && p.slug?.current !== slug && p.category === project.category)
    .slice(0, 3);

  const title = project.name || project.title;
  const category = project.category || project.client || 'Project';
  const mainImage = project.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80';
  const galleryImages = project.images?.slice(1) || [];

  const demoUrl = project.projectLink || '';
  const isDemoExternal = demoUrl !== '#' && demoUrl !== '';
  const formattedDemoUrl = isDemoExternal ? (demoUrl.startsWith('http') ? demoUrl : `https://${demoUrl}`) : '';

  const repoUrl = project.githubLink || '';
  const isRepoExternal = repoUrl !== '' && repoUrl !== '#';
  const formattedRepoUrl = isRepoExternal ? (repoUrl.startsWith('http') ? repoUrl : `https://${repoUrl}`) : '';

  return (
    <div className={styles.detailsPage}>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <Image 
          src={mainImage} 
          alt={title} 
          fill 
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }} 
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.container}>
            <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#ff6b00', textDecoration: 'none', marginBottom: '20px', fontSize: '14px', fontWeight: 600 }}>
              <ArrowLeft size={16} /> Back to Portfolio
            </Link>
            <span className={styles.category}>{category}</span>
            <h1 className={styles.title}>{title}</h1>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          {/* Main Content Area */}
          <main>
            <div className={styles.richText}>
              <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Project Overview</h2>
              <p>{project.fullDescription || project.description}</p>
            </div>

            {/* Gallery Section */}
            {galleryImages.length > 0 && (
              <section className={styles.gallerySection}>
                <h3 className={styles.sectionTitle}>Project Showcase</h3>
                <div className={styles.galleryGrid}>
                  {galleryImages.map((img: string, idx: number) => (
                    <div key={idx} className={styles.galleryItem}>
                      <Image 
                        src={img} 
                        alt={`${title} Showcase ${idx + 1}`} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* Sidebar Area */}
          <aside>
            <div className={styles.sidebarCard}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}><User size={12} style={{ display: 'inline', marginRight: '5px' }} /> Client</span>
                <span className={styles.metaValue}>{project.client || 'Private Client'}</span>
              </div>
              
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}><Calendar size={12} style={{ display: 'inline', marginRight: '5px' }} /> Completion Date</span>
                <span className={styles.metaValue}>{project.completionDate || 'Recent'}</span>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}><Folder size={12} style={{ display: 'inline', marginRight: '5px' }} /> Category</span>
                <span className={styles.metaValue}>{category}</span>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Technologies Used</span>
                <div className={styles.techTags}>
                  {(project.technologies || []).map((tech: string, idx: number) => (
                    <span key={idx} className={styles.tag}>{tech}</span>
                  ))}
                </div>
              </div>

              {/* Sidebar Action Buttons */}
              <div className={styles.actionButtons}>
                {formattedDemoUrl && (
                  <a 
                    href={formattedDemoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.btnPrimary}
                  >
                    <ExternalLink size={16} /> Visit Live Website
                  </a>
                )}

                {formattedRepoUrl && (
                  <a 
                    href={formattedRepoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.btnSecondary}
                  >
                    <Github size={16} /> View Source Code
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <section className={styles.relatedSection}>
            <h3 className={styles.sectionTitle}>Related Case Studies</h3>
            <div className={styles.relatedGrid}>
              {relatedProjects.map((p: any, idx: number) => {
                const pTitle = p.name || p.title;
                const pImage = p.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80';
                return (
                  <Link href={`/portfolio/${p.slug?.current}`} key={idx} className={styles.relatedCard}>
                    <div className={styles.relatedImage}>
                      <Image 
                        src={pImage} 
                        alt={pTitle} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                      />
                    </div>
                    <div className={styles.relatedContent}>
                      <h4 className={styles.relatedTitle}>{pTitle}</h4>
                      <p className={styles.relatedDesc}>
                        {p.description?.length > 100 ? p.description.substring(0, 100) + '...' : p.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
