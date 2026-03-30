export type BlogPost = {
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  relatedService?: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "How SEO Helps Nairobi Businesses Grow in 2024",
    slug: "how-seo-helps-nairobi-businesses",
    category: "SEO Tips",
    categorySlug: "seo-tips",
    excerpt: "Learn why local SEO is the most powerful tool for small businesses in Nairobi.",
    content: "Full article content about local SEO in Nairobi...",
    date: "March 11, 2024",
    image: "/media/hero.png",
    relatedService: "/services/seo-digital-marketing/local-seo-nairobi"
  },
  {
    title: "Why Your Business Needs a Website in Kenya",
    slug: "why-your-business-needs-a-website-in-kenya",
    category: "Web Development",
    categorySlug: "web-development",
    excerpt: "A website is your digital storefront. Here's why you can't afford to skip it.",
    content: "Full article content about web dev importance...",
    date: "March 10, 2024",
    image: "/media/service_uiux.png",
    relatedService: "/services/web-development"
  },
  {
    title: "How AI is Changing Digital Marketing",
    slug: "how-ai-is-changing-digital-marketing",
    category: "AI Marketing",
    categorySlug: "ai-marketing",
    excerpt: "From chatbots to predictive analytics, AI is revolutionizing how we reach customers.",
    content: "Full article content about AI trends...",
    date: "March 09, 2024",
    image: "/media/service_marketing.png",
    relatedService: "/services/ai-systems-integration"
  }
];
