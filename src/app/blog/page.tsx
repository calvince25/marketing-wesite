import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog";
import styles from "./blog.module.css";
import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export default async function BlogPage() {
  const posts = await client.fetch(allPostsQuery).catch(() => []);
  const displayPosts = (posts && posts.length > 0) ? posts : blogPosts;

  return (
    <div className={styles.blogPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Growth Insights</h1>
          <p className={styles.subtitle}>Strategies and tips to scale your business in the digital age.</p>
        </div>
      </section>

      <section className={styles.posts}>
        <div className="container">
          <div className={styles.grid}>
            {displayPosts.map((post: any, idx: number) => {
              const isSanity = !!post._id;
              const slug = isSanity ? post.slug.current : post.slug;
              const category = isSanity ? (post.categories?.[0]?.title || 'General') : post.category;
              const categorySlug = isSanity ? (post.categories?.[0]?.slug?.current || 'general') : post.categorySlug;
              const image = isSanity ? (post.mainImage ? urlForImage(post.mainImage).width(800).quality(80).url() : '') : post.image;
              const date = isSanity ? new Date(post.publishedAt || post._createdAt).toLocaleDateString() : post.date;

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
                    <p>{isSanity ? (post.seo?.metaDescription || '') : post.excerpt}</p>
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
