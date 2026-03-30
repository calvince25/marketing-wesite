import { blogPosts } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";
import styles from "../blog.module.css";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { client } from "@/sanity/lib/client";
import { allPostsByCategoryQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

interface CategoryPageProps {
  params: { category: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  
  // 1. Fetch from Sanity
  const sanityPosts = await client.fetch(allPostsByCategoryQuery, { category: categorySlug }).catch(() => []);
  
  // 2. Fallback to static
  const staticPosts = blogPosts.filter(p => p.categorySlug === categorySlug);
  
  const posts = (sanityPosts && sanityPosts.length > 0) ? sanityPosts : staticPosts;
  
  const categoryName = posts.length > 0 
    ? (posts[0]._id ? (posts[0].categories?.find((c: any) => c.slug.current === categorySlug)?.title || categorySlug) : posts[0].category)
    : categorySlug;

  return (
    <div className={styles.blogPage}>
      <section className={styles.hero}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: categoryName, href: '' }]} />
          <h1 className={styles.title}>{categoryName}</h1>
          <p className={styles.subtitle}>Articles related to {categoryName}.</p>
        </div>
      </section>

      <section className={styles.posts}>
        <div className="container">
          {posts.length > 0 ? (
            <div className={styles.grid}>
              {posts.map((post: any, idx: number) => {
                const isSanity = !!post._id;
                const slug = isSanity ? post.slug.current : post.slug;
                const category = isSanity ? (post.categories?.[0]?.title || 'General') : post.category;
                const image = isSanity ? (post.mainImage ? urlForImage(post.mainImage).url() : '') : post.image;
                const date = isSanity ? new Date(post.publishedAt || post._createdAt).toLocaleDateString() : post.date;
                const excerpt = isSanity ? (post.seo?.metaDescription || '') : post.excerpt;

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
          ) : (
            <p>No posts found in this category.</p>
          )}
        </div>
      </section>
    </div>
  );
}
