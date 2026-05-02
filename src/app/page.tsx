import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { pillarServices } from "@/lib/services";
import { sanitizeSlug } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { 
  siteSettingsQuery, 
  allServicesQuery, 
  allPostsQuery, 
  allProjectsQuery,
  pageContentQuery
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import JsonLd from "@/components/seo/JsonLd";

export default async function Home() {
  const [settings, services, posts, projects, homeContent] = await Promise.all([
    client.fetch(siteSettingsQuery),
    client.fetch(allServicesQuery),
    client.fetch(allPostsQuery),
    client.fetch(allProjectsQuery),
    client.fetch(pageContentQuery, { page: 'Home' })
  ]).catch(() => [null, [], [], [], null]);

  const allServices = (services && services.length > 0) ? services : Object.values(pillarServices);
  
  const heroImage = settings?.heroImages?.[0] ? urlForImage(settings.heroImages[0]).width(1920).quality(90).url() : "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80";

  const webDevClusters = pillarServices["web-development"]?.clusters || [];
  const seoClusters = pillarServices["seo-digital-marketing"]?.clusters || [];
  const automationClusters = pillarServices["business-automation"]?.clusters || [];
  const aiClusters = pillarServices["ai-systems-integration"]?.clusters || [];

  const aboutSection = homeContent?.sections?.find((s: any) => s.title.toLowerCase().includes('about')) || {
    title: "About GrowthLab Limited",
    content: "GrowthLab is a premier digital agency specializing in crafting high-end digital experiences using data-driven marketing and monochromatic aesthetics. We partner with ambitious brands to accelerate their growth and ensure their digital presence translates seamlessly to ROI."
  };

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "DigitalMarketingAgency",
    "name": "GrowthLab Limited",
    "url": "https://www.growthlab.co.ke",
    "logo": "https://www.growthlab.co.ke/media/logo.png",
    "description": "Premier digital marketing agency in Kenya specializing in SEO, web development, and AI integration",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nairobi",
      "addressCountry": "Kenya"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.facebook.com/share/1bTmn3gbH5/",
      "https://www.linkedin.com/in/calvince-omondi-3351763ba"
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Digital Marketing Services",
    "provider": {
      "@type": "Organization",
      "name": "GrowthLab Limited"
    },
    "areaServed": "Kenya",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO Services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development"
          }
        }
      ]
    }
  };

  return (
    <div className={styles.page}>
      <JsonLd data={businessSchema} />
      <JsonLd data={serviceSchema} />
      {/* 1. HERO SECTION */}
      <section className={`${styles.hero} animate-fadeInUp`}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                {settings?.seo?.metaTitle || "Leading Digital Marketing Services in Kenya for Modern Brands."}
              </h1>
              <p className={styles.heroDescription}>
                {settings?.seo?.metaDescription || "GrowthLab Limited crafts high-end digital experiences using data-driven marketing and monochromatic aesthetics."}
              </p>
              <div className={styles.heroButtons}>
                <Link href="/services" className="btn btn-primary">View Services</Link>
                <Link href="/contact" className="btn btn-outline" style={{ marginLeft: '20px' }}>Contact Us</Link>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={heroImage} 
                  alt="GrowthLab Digital Excellence" 
                  fill 
                  sizes="100vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }} 
                  priority
                />
                <div className={styles.badgeFloat}>
                  <div className={styles.badgeNumber}>98%</div>
                  <span>Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW (WHAT WE DO) */}
      <section className={`${styles.services} animate-fadeInUp`} style={{ animationDelay: '0.2s' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className={styles.subTitle}>OUR EXPERTISE</p>
            <h2 className={styles.sectionTitle}>What We Do</h2>
          </div>

          <div className={styles.serviceGrid}>
            {allServices.map((service: any, idx: number) => (
              <Link href={`/services/${sanitizeSlug(service.slug?.current || service.slug)}`} key={idx} className={styles.serviceCard}>
                <div className={styles.cardContent}>
                  <h3>{service.name || service.title}</h3>
                  <p>{service.shortDescription || service.description}</p>
                  <span className={styles.learnMore}>Learn more</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WEB DEVELOPMENT */}
      <section className={styles.subSection} id="web-development">
        <div className="container">
          <div className={styles.pillarGrid}>
            <div className={styles.pillarContent}>
              <h2>Web Development</h2>
              <p>High-performance websites built for speed, security, and scalability. We build robust, custom web applications that are naturally visually stunning.</p>
              <Link href="/services/web-development" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Explore Web Dev</Link>
            </div>
            <div className={styles.pillarImageWrapper}>
              <Image 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" 
                alt="Web Development Services" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }} 
              />
            </div>
          </div>
          <div className={styles.clusterGrid}>
            {webDevClusters.slice(0, 4).map((cluster: any, idx: number) => (
              <Link href={`/services/web-development/${sanitizeSlug(cluster.slug)}`} key={idx} className={styles.clusterCard}>
                <h3>{cluster.title}</h3>
                <p>{cluster.description}</p>
                <span className={styles.learnMore}>Explore</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SEO & DIGITAL MARKETING */}
      <section className={styles.subSection} id="seo">
        <div className="container">
          <div className={`${styles.pillarGrid} ${styles.reverse}`}>
            <div className={styles.pillarContent}>
              <h2>SEO & Digital Marketing</h2>
              <p>Get found on Google and convert searchers into customers. Our SEO and digital marketing strategies are designed to increase your visibility and drive ROI.</p>
              <Link href="/services/seo-digital-marketing" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Boost Your Visibility</Link>
            </div>
            <div className={styles.pillarImageWrapper}>
              <Image 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" 
                alt="SEO and Digital Marketing" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }} 
              />
            </div>
          </div>
          <div className={styles.clusterGrid}>
            {seoClusters.slice(0, 4).map((cluster: any, idx: number) => (
              <Link href={`/services/seo-digital-marketing/${sanitizeSlug(cluster.slug)}`} key={idx} className={styles.clusterCard}>
                <h3>{cluster.title}</h3>
                <p>{cluster.description}</p>
                <span className={styles.learnMore}>Explore</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BUSINESS AUTOMATION */}
      <section className={styles.subSection} id="business-automation">
        <div className="container">
          <div className={styles.pillarGrid}>
            <div className={styles.pillarContent}>
              <h2>Business Automation</h2>
              <p>Streamline your operations and focus on what matters most. Stop wasting time on repetitive tasks with modern SaaS integrations.</p>
              <Link href="/services/business-automation" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Automate Now</Link>
            </div>
            <div className={styles.pillarImageWrapper}>
              <Image 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" 
                alt="Business Automation Services" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }} 
              />
            </div>
          </div>
          <div className={styles.clusterGrid}>
            {automationClusters.slice(0, 4).map((cluster: any, idx: number) => (
              <Link href={`/services/business-automation/${sanitizeSlug(cluster.slug)}`} key={idx} className={styles.clusterCard}>
                <h3>{cluster.title}</h3>
                <p>{cluster.description}</p>
                <span className={styles.learnMore}>Explore</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AI SYSTEMS INTEGRATION */}
      <section className={styles.subSection} id="ai-systems">
        <div className="container">
          <div className={`${styles.pillarGrid} ${styles.reverse}`}>
            <div className={styles.pillarContent}>
              <h2>AI Systems Integration</h2>
              <p>Leverage artificial intelligence to future-proof your business. We help businesses integrate AI-driven solutions like chatbots and predictive analytics.</p>
              <Link href="/services/ai-systems-integration" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Integrate AI</Link>
            </div>
            <div className={styles.pillarImageWrapper}>
              <Image 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80" 
                alt="AI Systems Integration" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }} 
              />
            </div>
          </div>
          <div className={styles.clusterGrid}>
            {aiClusters.slice(0, 4).map((cluster: any, idx: number) => (
              <Link href={`/services/ai-systems-integration/${sanitizeSlug(cluster.slug)}`} key={idx} className={styles.clusterCard}>
                <h3>{cluster.title}</h3>
                <p>{cluster.description}</p>
                <span className={styles.learnMore}>Explore</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PORTFOLIO / PROJECTS */}
      <section className={styles.portfolioSection} id="portfolio">
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className={styles.subTitle}>OUR WORK</p>
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
          </div>
          <div className={styles.portfolioGrid}>
            {projects && projects.length > 0 ? projects.slice(0, 3).map((project: any, idx: number) => (
              <div key={idx} className={styles.portfolioCard}>
                <div className={styles.imagePlaceholder}>
                  {project.images?.[0] ? (
                    <Image 
                      src={urlForImage(project.images[0]).width(800).quality(80).url()} 
                      alt={project.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      style={{ objectFit: 'cover', objectPosition: 'center' }} 
                    />
                  ) : project.name}
                </div>
                <div className={styles.cardBody}>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            )) : (
              <>
                <div className={styles.portfolioCard}>
                  <div className={styles.imagePlaceholder}>E-commerce Redesign</div>
                  <div className={styles.cardBody}>
                    <h3>Modern Fashion Store</h3>
                    <p>A complete redesign and custom Next.js build representing a fast fashion retail shop.</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={styles.centerAction}>
            <Link href="/portfolio" className="btn btn-outline">View Portfolio</Link>
          </div>
        </div>
      </section>

      {/* 8. BLOG / INSIGHTS */}
      <section className={styles.blogSection} id="blog">
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className={styles.subTitle}>LATEST INSIGHTS</p>
            <h2 className={styles.sectionTitle}>From Our Blog</h2>
          </div>
          <div className={styles.blogGrid}>
            {posts && posts.length > 0 ? posts.slice(0, 3).map((post: any, idx: number) => (
              <Link href={`/blog/${sanitizeSlug(post.slug.current)}`} key={idx} className={styles.blogCard}>
                <div className={styles.imagePlaceholder}>
                  {post.mainImage ? (
                    <Image 
                      src={urlForImage(post.mainImage).width(800).quality(80).url()} 
                      alt={post.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      style={{ objectFit: 'cover', objectPosition: 'center' }} 
                    />
                  ) : post.title}
                </div>
                <div className={styles.cardBody}>
                  <h3>{post.title}</h3>
                  <p>{post.seo?.metaDescription || "Read more about this article."}</p>
                  <span className={styles.learnMore}>Read Article</span>
                </div>
              </Link>
            )) : (
              <>
                <Link href="/blog/ai-marketing/the-future-of-ai-in-marketing" className={styles.blogCard}>
                  <div className={styles.imagePlaceholder}>AI Marketing</div>
                  <div className={styles.cardBody}>
                    <h3>The Future of AI in Marketing</h3>
                    <p>How artificial intelligence is reshaping digital marketing and how businesses can adapt.</p>
                    <span className={styles.learnMore}>Read Article</span>
                  </div>
                </Link>
              </>
            )}
          </div>
          <div className={styles.centerAction}>
            <Link href="/blog" className="btn btn-primary">View All Articles</Link>
          </div>
        </div>
      </section>

      {/* 9. ABOUT THE COMPANY */}
      <section className={styles.aboutSection} id="about">
        <div className="container">
          <h2>{aboutSection.title}</h2>
          <div className={styles.aboutText}>
            {typeof aboutSection.content === 'string' ? (
              <p>{aboutSection.content}</p>
            ) : (
              <PortableText value={aboutSection.content} />
            )}
          </div>
          <Link href="/about" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>Learn More About Us</Link>
        </div>
      </section>

      {/* 9.5 SUCCESS METRICS */}
      <section className={styles.metricsSection} id="metrics">
        <div className="container">
          <h2>Proven Results for Kenyan Businesses</h2>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <span className={styles.metricValue}>150+</span>
              <span className={styles.metricLabel}>Websites launched</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricValue}>200%</span>
              <span className={styles.metricLabel}>Average traffic increase</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricValue}>45+</span>
              <span className={styles.metricLabel}>Businesses automated</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricValue}>98%</span>
              <span className={styles.metricLabel}>Client satisfaction rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9.6 FAQ SECTION */}
      <section className={styles.faqSection} id="faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3>How long does SEO take to show results?</h3>
              <p>SEO typically shows initial results in 2-3 months, with significant improvements by month 6. Our data-driven approach ensures faster progress than industry standards.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Do you work with small businesses?</h3>
              <p>Yes, we serve businesses of all sizes across Kenya, from startups to enterprises. Our scalable solutions grow with your business.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>What makes your web development different?</h3>
              <p>We build with performance, security, and SEO in mind from day one. Every website is optimized for speed and search engines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CONTACT SECTION */}
      <section className={styles.contactSection} id="contact">
        <div className="container">
          <div className={styles.contactBox}>
            <h2>Ready to Grow Your Business?</h2>
            <p>Contact us today for a structured consultation about your next big project or marketing campaign.</p>
            
            <div className={styles.contactInfo}>
              {settings?.contactInfo?.email && (
                <span>📧 {settings.contactInfo.email}</span>
              )}
              {settings?.contactInfo?.phone && (
                <span>📞 {settings.contactInfo.phone}</span>
              )}
            </div>

            <Link href="/contact" className="btn btn-primary">Get a Free Consultation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
