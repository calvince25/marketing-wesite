import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import styles from "./post.module.css";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, allPostsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

interface PostPageProps {
  params: { category: string; slug: string };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug }).catch(() => null) || blogPosts.find(p => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | GrowthLab Blog`,
    description: post.excerpt || post.seo?.metaDescription,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug }).catch(() => null);
  const staticPost = blogPosts.find(p => p.slug === slug);
  
  const currentPost = post || staticPost;

  if (!currentPost) {
    notFound();
  }

  const isSanity = !!(currentPost as any)._id;
  const image = isSanity ? (currentPost.mainImage ? urlForImage(currentPost.mainImage).width(1200).quality(90).url() : '') : currentPost.image;
  const category = isSanity ? (currentPost.categories?.[0]?.title || 'General') : currentPost.category;
  const categorySlug = isSanity ? (currentPost.categories?.[0]?.slug?.current || 'general') : currentPost.categorySlug;
  const date = isSanity ? new Date(currentPost.publishedAt || (currentPost as any)._createdAt).toLocaleDateString() : currentPost.date;

  const recentPostsData = await client.fetch(allPostsQuery).catch(() => []);
  const recentPosts = (recentPostsData && recentPostsData.length > 0) ? recentPostsData : blogPosts;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": currentPost.title,
    "image": image,
    "datePublished": isSanity ? (currentPost.publishedAt || (currentPost as any)._createdAt) : currentPost.date,
    "author": {
      "@type": "Organization",
      "name": "GrowthLab Limited"
    },
    "description": isSanity ? currentPost.seo?.metaDescription : currentPost.excerpt
  };

  return (
    <article className={styles.postPage}>
      <JsonLd data={schemaData} />
      <header className={styles.hero}>
        <div className="container">
          <Breadcrumbs 
            items={[
              { label: 'Blog', href: '/blog' },
              { label: category, href: `/blog/${categorySlug}` },
              { label: currentPost.title, href: '' }
            ]} 
          />
          <span className={styles.category}>{category}</span>
          <h1 className={styles.title}>{currentPost.title}</h1>
          <div className={styles.meta}>
            <span className={styles.date}>{date}</span>
          </div>
        </div>
      </header>

      <div className="container">
        <div className={styles.layout}>
          <div className={styles.main}>
            {image && (
              <div className={styles.imageWrapper}>
                <Image 
                  src={image} 
                  alt={currentPost.title} 
                  fill 
                  sizes="(max-width: 992px) 100vw, 800px"
                  style={{ objectFit: 'cover', objectPosition: 'center' }} 
                  priority 
                />
              </div>
            )}
            <div className={styles.richText}>
              {isSanity ? (
                <PortableText value={currentPost.body} />
              ) : (
                <p>{currentPost.content}</p>
              )}
              
              {isSanity ? null : (
                <p>
                  In the context of the Kenyan market, this means understanding local consumer behavior and leveraging technology that works flawlessly on mobile devices.
                </p>
              )}
              
              {currentPost.relatedService && (
                <div className={styles.relatedServiceBox}>
                  <h3>Need Help with this?</h3>
                  <p>Our experts at GrowthLab Limited can help you implement these strategies today.</p>
                  <Link href={currentPost.relatedService} className="btn btn-primary">
                    Explore Relevant Service
                  </Link>
                </div>
              )}
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.shareBox}>
              <h4>Share this Article</h4>
              <div className={styles.socialIcons}>
                <span>FB</span>
                <span>TW</span>
                <span>LI</span>
              </div>
            </div>

            <div className={styles.recentPosts}>
              <h4>Recent Insights</h4>
              <ul>
                {recentPosts.filter((p: any) => (p.slug.current || p.slug) !== slug).slice(0, 5).map((recent: any, idx: number) => {
                  const rSlug = recent.slug.current || recent.slug;
                  const rCatSlug = recent.categories?.[0]?.slug?.current || recent.categorySlug || 'general';
                  return (
                    <li key={idx}>
                      <Link href={`/blog/${rCatSlug}/${rSlug}`}>
                        {recent.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}








