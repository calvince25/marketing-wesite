import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog";
import styles from "./blog.module.css";
import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await client.fetch(allPostsQuery).catch(() => []);
  const displayPosts = (posts && posts.length > 0) ? posts : blogPosts;

  return (
    <div className={styles.blogPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Growth Insights</h1>
          <p className={styles.subtitle}>Strategies and tips to scale your business in the digital age.</p>
          
          <div className={styles.editorialIntro}>
            <p>
              Welcome to the GrowthLab blog, your go-to resource for navigating the digital landscape in Kenya. We cover everything from advanced SEO tactics and bespoke web development to the latest in business automation and AI integration. Whether you are a Kenyan entrepreneur looking to launch your first startup or a seasoned business owner aiming to optimize your digital ROI, our insights are crafted to provide practical, data-driven value. Dive into our articles and join a community of forward-thinking businesses scaling through technical excellence.
            </p>
          </div>
        </div>
      </section>

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
