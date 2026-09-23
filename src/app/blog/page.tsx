import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog";
import styles from "./blog.module.css";
import { client } from "@/lib/client";
import { allPostsQuery } from "@/lib/queries";
import { urlForImage } from "@/lib/image";
import HeroSection from "@/components/layout/HeroSection";
import { createPageMetadata } from "@/lib/metadata";
import { getPublishedAdminPosts, mergeBySlug } from "@/lib/admin-content";

export const dynamic = 'force-dynamic';

export const metadata = createPageMetadata({
  title: "Digital Growth Insights for Kenyan Businesses",
  description: "Practical SEO, web development, automation, and AI guidance for businesses growing in Kenya and East Africa.",
  pathname: '/blog',
});

export default async function BlogPage() {
  const posts = await client.fetch(allPostsQuery).catch(() => []);
  const adminPosts = await getPublishedAdminPosts();
  const displayPosts = mergeBySlug(posts?.length ? posts : blogPosts, adminPosts);

  return (
    <div className={styles.blogPage}>
      <HeroSection 
        page="blog" 
        defaultTitle="Growth Insights" 
        defaultSubtitle="Strategies and tips to scale your business in the digital age."
      >
        <div className={styles.editorialIntro}>
          <p>
            Welcome to the GrowthLab blog, your go-to resource for navigating the digital landscape in Kenya. We cover everything from advanced SEO tactics and bespoke web development to the latest in business automation and AI integration. Whether you are a Kenyan entrepreneur looking to launch your first startup or a seasoned business owner aiming to optimize your digital ROI, our insights are crafted to provide practical, data-driven value. Dive into our articles and join a community of forward-thinking businesses scaling through technical excellence.
          </p>
        </div>
      </HeroSection>

      <section className={styles.posts}>
        <div className="container">
          <div className={styles.grid}>
            {displayPosts.map((post: any, idx: number) => {
              const slug = (typeof post.slug === 'object' && post.slug?.current) ? post.slug.current : post.slug;
              const category = (post.categories && post.categories[0]?.title) ? post.categories[0].title : (post.category || 'General');
              const categorySlug = (post.categories && post.categories[0]?.slug?.current) ? post.categories[0].slug.current : (post.categorySlug || 'general');
              const image = post.mainImage 
                ? (typeof post.mainImage === 'string' ? post.mainImage : urlForImage(post.mainImage).width(800).quality(80).url()) 
                : (post.image || '');
              const date = post.publishedAt 
                ? new Date(post.publishedAt).toLocaleDateString() 
                : (post.createdAt 
                  ? new Date(post.createdAt).toLocaleDateString() 
                  : (post.date || ''));
              const excerpt = post.seo?.metaDescription || post.excerpt || '';

              return (
                <article key={idx} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    {image && (
                      <Image 
                        src={image} 
                        alt={post.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover', objectPosition: 'center' }} 
                      />
                    )}
                  </div>
                  <div className={styles.content}>
                    <span className={styles.category}>{category}</span>
                    <h2>{post.title}</h2>
                    <p>{excerpt}</p>
                    <div className={styles.footer}>
                      <span className={styles.date}>{date}</span>
                      <Link href={`/blog/${categorySlug}/${slug}`} className={styles.readMore}>
                        Read Article →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
