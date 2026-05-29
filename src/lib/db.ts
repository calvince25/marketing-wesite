import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'data', 'db');

// Ensure DB directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

export interface DatabaseSchema {
  users: any[];
  posts: any[];
  categories: any[];
  projects: any[];
  services: any[];
  team: any[];
  reviews: any[];
  pricing: any[];
  media: any[];
  siteSettings: any;
  activity: any[];
}

class JsonDB {
  private getFilePath(table: string): string {
    return path.join(DB_DIR, `${table}.json`);
  }

  public read<T = any>(table: string): T[] {
    const filePath = this.getFilePath(table);
    if (!fs.existsSync(filePath)) {
      // Return default empty array or default object for siteSettings
      if (table === 'siteSettings') {
        const defaultSettings = {
          heroImages: ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"],
          contactInfo: {
            email: "info@growthlab.co.ke",
            phone: "+254 743 990 479",
            address: "ABC Place, Westlands, Nairobi"
          },
          socialLinks: [
            { platform: "facebook", url: "https://www.facebook.com/share/1bTmn3gbH5/" },
            { platform: "linkedin", url: "https://www.linkedin.com/in/calvince-omondi-3351763ba" },
            { platform: "instagram", url: "https://instagram.com/growthlablimited" }
          ],
          seo: {
            metaTitle: "Leading Digital Marketing Services in Kenya for Modern Brands.",
            metaDescription: "GrowthLab Limited crafts high-end digital experiences using data-driven marketing and monochromatic aesthetics."
          }
        };
        this.write('siteSettings', defaultSettings);
        return defaultSettings as any;
      }
      return [];
    }

    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      console.error(`Error reading table ${table}:`, e);
      return table === 'siteSettings' ? {} as any : [];
    }
  }

  public write(table: string, data: any): void {
    const filePath = this.getFilePath(table);
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error(`Error writing table ${table}:`, e);
    }
  }

  public findOne<T = any>(table: string, predicate: (item: T) => boolean): T | null {
    const list = this.read<T>(table);
    return list.find(predicate) || null;
  }

  public findMany<T = any>(table: string, predicate: (item: T) => boolean): T[] {
    const list = this.read<T>(table);
    return list.filter(predicate);
  }

  public insert<T extends { id?: string; _id?: string; createdAt?: string }>(table: string, record: any): T {
    if (table === 'siteSettings') {
      this.write(table, record);
      return record;
    }

    const list = this.read(table);
    const id = record.id || record._id || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const newRecord = {
      ...record,
      id,
      _id: id,
      createdAt: record.createdAt || new Date().toISOString()
    };
    list.push(newRecord);
    this.write(table, list);
    return newRecord as T;
  }

  public update<T extends { id?: string; _id?: string }>(table: string, id: string, updates: any): T | null {
    if (table === 'siteSettings') {
      const current = this.read(table);
      const updated = { ...current, ...updates };
      this.write(table, updated);
      return updated as any;
    }

    const list = this.read(table);
    const index = list.findIndex((item: any) => item.id === id || item._id === id);
    if (index === -1) return null;

    const updatedRecord = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    list[index] = updatedRecord;
    this.write(table, list);
    return updatedRecord as T;
  }

  public delete(table: string, id: string): boolean {
    const list = this.read(table);
    const initialLength = list.length;
    const filtered = list.filter((item: any) => item.id !== id && item._id !== id);
    this.write(table, filtered);
    return filtered.length < initialLength;
  }

  public logActivity(userEmail: string, action: string, details: string): void {
    try {
      this.insert('activity', {
        userEmail,
        action,
        details,
        timestamp: new Date().toISOString()
      });
    } catch (e) {
      console.error('Error logging activity:', e);
    }
  }
}

export const db = new JsonDB();

// Seed Database helper to populate initial demo data
export function seedDatabase() {
  // Check if seeding is already done by verifying if posts.json exists
  const postsPath = path.join(DB_DIR, 'posts.json');
  if (fs.existsSync(postsPath)) return;

  console.log('Seeding database with default values...');

  // Seed Categories
  const categories = [
    { name: "AI Marketing", slug: "ai-marketing" },
    { name: "SEO & Digital Marketing", slug: "seo-digital-marketing" },
    { name: "Web Development", slug: "web-development" },
    { name: "Business Automation", slug: "business-automation" }
  ];
  categories.forEach(c => db.insert('categories', c));

  // Seed default Blog Post
  db.insert('posts', {
    title: "The Future of AI in Marketing: Beyond Simple Automation",
    slug: { current: "the-future-of-ai-in-marketing" },
    category: "AI Marketing",
    categorySlug: "ai-marketing",
    excerpt: "Explore how agentic AI, predictive analytics, and human-centric strategy are reshaping the digital marketing landscape for 2024 and beyond.",
    content: `
# Beyond Automation: How AI is Redefining the Future of Marketing

In the fast-paced world of digital marketing, the emergence of Artificial Intelligence (AI) has moved from a futuristic novelty to an absolute necessity. But as we look toward the horizon of 2024 and 2025, it's clear that we are entering a new phase. We are moving beyond simple automation—where AI merely speeds up repetitive tasks—into a period of "Agentic AI" and deep systemic integration. This shift is not just about doing things faster; it's about doing things fundamentally differently.

## The Infrastructure Shift: From Tools to Operating Systems

For the past few years, marketers have treated AI as a collection of disjointed tools. One app for drafting emails, another for generating social media captions, and perhaps a third for basic data analysis. This approach, while helpful, created "tool sprawl" and fragmented data.

The future lies in integrated AI operating systems. High-performing marketing teams are now building "Marketing Pods"—unified workflows where strategy, creative, and analytics are handled by a single, cohesive AI infrastructure. In this model, AI isn't just a guest in your browser; it's the engine of your entire department. This allows for real-time campaign optimization that can adjust budgets and creative assets across multiple platforms simultaneously based on live performance data.

## The Next Frontier: Agentic AI and Autonomous Marketing

We are currently witnessing the transition from "Generative AI" to "Agentic AI." While Generative AI needs constant prompting to create content, Agentic AI systems are designed to take action and make decisions autonomously within defined guardrails.

Imagine an AI agent that doesn't just write your blog posts but also researches the current trending topics in your industry, identifies the best keywords for your specific audience in Nairobi, schedules the publication, and then automatically creates and deploys social media snippets to promote it. These agents can handle complex, multi-step marketing choices—such as managing customer research or deep-funnel optimization—without requiring human hand-holding at every step.

This enables "always-on" marketing campaigns that are truly fluid. Instead of a monthly campaign review, your AI agent is reviewing performance every minute, shifting resources to the most effective channels in real-time.

## Redefining Creativity: Scaling Quality, Not Just Quantity

There is a common fear that AI will sanitize creativity, leading to a flood of generic, "gray" content. The irony is that as AI-generated noise increases, the value of truly human-led, authentic content skyrocketing.

The future of creative work is a "Hybrid Model." AI will handle the heavy lifting of visual and text production—such as generating 1,000 variations of an ad image for A/B testing—while human creators focus on brand narrative, emotional resonance, and "proof over promises." 

In the Kenyan context, this means using AI to handle the technical aspects of SEO and content formatting, while human marketers inject the local cultural nuances, street slang (Sheng), and specific community insights that an LLM might miss. The goal is to use AI to test creative at a velocity previously impossible, allowing teams to double down on what *actually* resonates with people, rather than what a computer thinks they want.

## The Ethical & Trust Imperative

As AI becomes more pervasive, trust becomes the ultimate competitive advantage. Consumer skepticism is rising, and brands that use AI deceptively will quickly lose their audience.

The future marketer must lead with transparency. This involves:
1. **Human-in-the-Loop Governance:** Ensuring every AI output is vetted for accuracy and ethical alignment.
2. **Algorithmic Fairness:** Regularly auditing AI tools to ensure they aren't perpetuating biases or excluding segments of the population.
3. **Data Sovereignty:** Moving toward first-party data strategies. As third-party cookies fade and privacy laws tighten, AI is only as good as the proprietary data it is fed.

## Conclusion: The Future-Proof Marketer

The future of marketing is not about AI replacing marketers; it's about marketers becoming "AI-fluent strategists." The brands that win in 2024 and beyond will be those that use AI to humanize their customer experiences at scale, rather than automate the humanity out of them.

Stop chasing every shiny new tool. Instead, start building a robust, data-backed AI workflow that empowers your team to focus on what matters most: building deep, meaningful connections with your customers.
    `,
    date: "April 12, 2024",
    publishedAt: "2024-04-12T00:00:00.000Z",
    status: "published",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
    relatedService: "/services/ai-systems-integration",
    author: {
      name: "Calvince Omondi",
      bio: "Founder and Lead Strategist at GrowthLab, expert in SEO and AI Marketing systems.",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
    },
    seo: {
      metaTitle: "The Future of AI in Marketing: Beyond Simple Automation",
      metaDescription: "Explore how agentic AI, predictive analytics, and human-centric strategy are reshaping the digital marketing landscape for 2024 and beyond."
    }
  });

  // Seed default Projects
  const projects = [
    {
      name: "Mells Fashion",
      title: "Mells Fashion",
      slug: { current: "mells-fashion" },
      description: "High-performance e-commerce shopping experience built on Next.js, yielding a 140% traffic boost.",
      technologies: ["Next.js", "React", "Tailwind CSS", "Node.js"],
      client: "E-commerce",
      images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"],
      projectLink: "https://www.mellsfasion.co.ke",
      featured: true,
      isPrivate: false,
      demoAvailableRequest: false,
      caseStudySupport: true,
      completionDate: "2024-02-15",
      seo: {
        metaTitle: "Mells Fashion | GrowthLab Portfolio",
        metaDescription: "High-performance e-commerce shopping experience built on Next.js, yielding a 140% traffic boost."
      }
    },
    {
      name: "Restaurant POS System",
      title: "Restaurant POS System",
      slug: { current: "restaurant-pos-system" },
      description: "Custom POS integration and automation for a leading restaurant, optimizing workflows and order tracking.",
      technologies: ["React", "Node.js", "PostgreSQL"],
      client: "Systems Integration",
      images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"],
      projectLink: "https://pos-system-two-tawny.vercel.app",
      featured: true,
      isPrivate: false,
      demoAvailableRequest: false,
      caseStudySupport: true,
      completionDate: "2024-01-20",
      seo: {
        metaTitle: "Restaurant POS System | GrowthLab Portfolio",
        metaDescription: "Custom POS integration and automation for a leading restaurant, optimizing workflows and order tracking."
      }
    },
    {
      name: "GrowthLab Analytics",
      title: "GrowthLab Analytics",
      slug: { current: "growthlab-analytics" },
      description: "Data analytics platform dashboard featuring clean charts, traffic logs, and user activity insights.",
      technologies: ["Next.js", "Python", "Tailwind CSS"],
      client: "AI & Data",
      images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"],
      projectLink: "#",
      featured: true,
      isPrivate: false,
      demoAvailableRequest: false,
      caseStudySupport: true,
      completionDate: "2024-03-10",
      seo: {
        metaTitle: "GrowthLab Analytics | GrowthLab Portfolio",
        metaDescription: "Data analytics platform dashboard featuring clean charts, traffic logs, and user activity insights."
      }
    }
  ];
  projects.forEach(p => db.insert('projects', p));

  // Seed default Team Members
  const team = [
    {
      name: "Calvince Omondi",
      role: "Lead Digital Architect & Strategist",
      bio: "With over 8 years in the digital ecosystem, Calvince specializes in scaling business traffic, building high-end web applications, and implementing agentic AI solutions.",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/calvince-omondi-3351763ba",
        twitter: "https://twitter.com",
        github: "https://github.com"
      },
      displayOrder: 1,
      isActive: true
    }
  ];
  team.forEach(t => db.insert('team', t));

  // Seed default Reviews / Testimonials
  const reviews = [
    {
      name: "Leading Real Estate Firm",
      business: "Real Estate Nairobi",
      rating: 5,
      message: "GrowthLab completely transformed our online presence. Our organic traffic doubled within 4 months, and the quality of leads improved significantly.",
      dateSubmitted: "2024-05-10",
      isApproved: true,
      isFeatured: true
    },
    {
      name: "E-commerce Retailer",
      business: "Kenya E-shop",
      rating: 5,
      message: "The custom web application they built for our ecommerce business has been a game-changer. Fast, secure, and incredibly user-friendly.",
      dateSubmitted: "2024-05-18",
      isApproved: true,
      isFeatured: true
    }
  ];
  reviews.forEach(r => db.insert('reviews', r));

  // Seed default Pricing Plans
  const pricing = [
    {
      title: "Starter Growth",
      price: "Ksh 45,000 / mo",
      features: [
        "On-Page SEO Optimization",
        "Weekly Custom Content Post",
        "Basic Technical SEO Audit",
        "Google Analytics Integration",
        "Monthly Progress Report"
      ],
      ctaText: "Get Started",
      ctaLink: "/contact?plan=starter",
      isPopular: false
    },
    {
      title: "Business Velocity",
      price: "Ksh 95,000 / mo",
      features: [
        "Complete Site Web Development Support",
        "Advanced SEO & Backlink Building",
        "AI Chatbot Integration",
        "Social Media Content Automation",
        "Bi-weekly Consultation Strategy Call",
        "24/7 Priority SLA Support"
      ],
      ctaText: "Recommended Choice",
      ctaLink: "/contact?plan=business",
      isPopular: true
    }
  ];
  pricing.forEach(p => db.insert('pricing', p));

  // Seed Site Settings
  db.write('siteSettings', {
    heroImages: ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"],
    contactInfo: {
      email: "info@growthlab.co.ke",
      phone: "+254 743 990 479",
      address: "ABC Place, Westlands, Nairobi"
    },
    socialLinks: [
      { platform: "facebook", url: "https://www.facebook.com/share/1bTmn3gbH5/" },
      { platform: "linkedin", url: "https://www.linkedin.com/in/calvince-omondi-3351763ba" },
      { platform: "instagram", url: "https://instagram.com/growthlablimited" }
    ],
    seo: {
      metaTitle: "Leading Digital Marketing Services in Kenya for Modern Brands.",
      metaDescription: "GrowthLab Limited crafts high-end digital experiences using data-driven marketing and monochromatic aesthetics."
    }
  });

  console.log('Database seeded successfully!');
}

// Immediately trigger seed check when this module is evaluated in development/production
try {
  seedDatabase();
} catch (e) {
  console.error("Failed to auto-seed database:", e);
}
