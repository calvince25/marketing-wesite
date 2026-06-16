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

export const blogPosts: BlogPost[] = [];
