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
  // Use a dedicated flag file so clearing posts doesn't trigger a re-seed
  const seededFlagPath = path.join(DB_DIR, 'seeded.flag');
  if (fs.existsSync(seededFlagPath)) return;

  console.log('Seeding database with default values...');

  // Seed Categories
  const categories = [
    { name: "AI Marketing", slug: "ai-marketing" },
    { name: "SEO & Digital Marketing", slug: "seo-digital-marketing" },
    { name: "Web Development", slug: "web-development" },
    { name: "Business Automation", slug: "business-automation" }
  ];
  categories.forEach(c => db.insert('categories', c));

  // No seed blog posts — user adds their own via admin panel

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

  // Write the flag file so this seed never runs again
  fs.writeFileSync(seededFlagPath, new Date().toISOString(), 'utf-8');
  console.log('Database seeded successfully!');
}

// Immediately trigger seed check when this module is evaluated in development/production
try {
  seedDatabase();
} catch (e) {
  console.error("Failed to auto-seed database:", e);
}
