import { aiSystemsContent } from "@/data/services/ai-systems";
import { webDevContent } from "@/data/services/web-dev";
import { automationContent } from "@/data/services/automation";
import { seoContent } from "@/data/services/seo";
import { pillarContent } from "@/data/services/pillars";

export type SubService = {
  title: string;
  h1?: string;
  slug: string;
  description: string;
  content: string;
};

export type PillarService = {
  title: string;
  h1?: string;
  slug: string;
  description: string;
  overview: string;
  benefits: string[];
  process: { step: string; detail: string }[];
  faqs: { q: string; a: string }[];
  clusters: SubService[];
};

export const pillarServices: Record<string, PillarService> = {
  "web-development": {
    title: "Web Development",
    h1: pillarContent["web-development"].h1,
    slug: "web-development",
    description: "High-performance websites built for speed, security, and scalability.",
    overview: pillarContent["web-development"].overview,
    benefits: [
      "Mobile-First Responsive Design",
      "Blazing Fast Performance",
      "SEO-Optimized Codebase",
      "Scalable Architecture"
    ],
    process: [
      { step: "Discovery", detail: "Understanding your business goals and user needs." },
      { step: "Strategy", detail: "Defining the technical stack and user journey." },
      { step: "Design", detail: "Creating high-fidelity UI/UX mockups." },
      { step: "Development", detail: "Coding with the latest technologies (Next.js, React)." }
    ],
    faqs: [
      { q: "How long does a website take to build?", a: "Typically 4-8 weeks depending on complexity." },
      { q: "Do you provide maintenance?", a: "Yes, we offer ongoing support and security updates." }
    ],
    clusters: [
      { 
        title: "Website Development Kenya", 
        h1: webDevContent["website-development-kenya"].h1,
        slug: "website-development-kenya", 
        description: "Premier web dev in Nairobi.", 
        content: webDevContent["website-development-kenya"].content 
      },
      { 
        title: "Custom Web Applications", 
        h1: webDevContent["custom-web-applications"].h1,
        slug: "custom-web-applications", 
        description: "Bespoke digital systems.", 
        content: webDevContent["custom-web-applications"].content 
      },
      { 
        title: "Ecommerce Solutions", 
        h1: webDevContent["ecommerce-solutions"].h1,
        slug: "ecommerce-solutions", 
        description: "High-conversion stores.", 
        content: webDevContent["ecommerce-solutions"].content 
      }
    ]
  },
  "seo-digital-marketing": {
    title: "SEO & Digital Marketing",
    h1: pillarContent["seo-digital-marketing"].h1,
    slug: "seo-digital-marketing",
    description: "Get found on Google and convert searchers into customers.",
    overview: pillarContent["seo-digital-marketing"].overview,
    benefits: [
      "Higher Google Rankings",
      "Increased Organic Traffic",
      "Better Conversion Rates",
      "Detailed Analytics"
    ],
    process: [
      { step: "Audit", detail: "Analyzing your current performance and competitors." },
      { step: "Keyword Research", detail: "Finding the terms your customers are searching for." },
      { step: "Optimization", detail: "Technical and on-page SEO improvements." },
      { step: "Reporting", detail: "Monthly insights on growth and ROI." }
    ],
    faqs: [
      { q: "When will I see results?", a: "Typically 3-6 months for sustainable organic growth." }
    ],
    clusters: [
      { 
        title: "Local SEO Nairobi", 
        h1: seoContent["local-seo-nairobi"].h1,
        slug: "local-seo-nairobi", 
        description: "Dominate local search.", 
        content: seoContent["local-seo-nairobi"].content 
      },
      { 
        title: "AI SEO Services Kenya", 
        h1: seoContent["ai-seo-services-kenya"].h1,
        slug: "ai-seo-services-kenya", 
        description: "Future-proof SEO.", 
        content: seoContent["ai-seo-services-kenya"].content 
      },
      { 
        title: "AI Powered Marketing", 
        h1: seoContent["ai-powered-marketing"].h1,
        slug: "ai-powered-marketing", 
        description: "Smart marketing automation.", 
        content: seoContent["ai-powered-marketing"].content 
      },
      { 
        title: "Technical SEO Audit", 
        h1: seoContent["technical-seo-audit"].h1,
        slug: "technical-seo-audit", 
        description: "Deep technical analysis.", 
        content: seoContent["technical-seo-audit"].content 
      }
    ]
  },
  "business-automation": {
    title: "Business Automation",
    h1: pillarContent["business-automation"].h1,
    slug: "business-automation",
    description: "Streamline your operations and focus on what matters most.",
    overview: pillarContent["business-automation"].overview,
    benefits: [
      "Significant Time Savings",
      "Reduced Human Error",
      "Scalable Operations",
      "Better Data Accuracy"
    ],
    process: [
      { step: "Workflow Mapping", detail: "Identifying bottlenecks in your current process." },
      { step: "Tool Selection", detail: "Choosing the right automation stack." },
      { step: "Implementation", detail: "Building and testing the automated flows." }
    ],
    faqs: [
      { q: "Can you automate my CRM?", a: "Yes, we integrate with most major CRMs like HubSpot and Zoho." }
    ],
    clusters: [
      { 
        title: "Business Automation Nairobi", 
        h1: automationContent["business-automation-nairobi"].h1,
        slug: "business-automation-nairobi", 
        description: "Local efficiency experts.", 
        content: automationContent["business-automation-nairobi"].content 
      },
      { 
        title: "CRM Automation", 
        h1: automationContent["crm-automation"].h1,
        slug: "crm-automation", 
        description: "Master your customer relationships.", 
        content: automationContent["crm-automation"].content 
      },
      { 
        title: "Workflow Automation", 
        h1: automationContent["workflow-automation"].h1,
        slug: "workflow-automation", 
        description: "End-to-end efficiency.", 
        content: automationContent["workflow-automation"].content 
      },
      { 
        title: "Lead Management Automation", 
        h1: automationContent["lead-management-automation"].h1,
        slug: "lead-management-automation", 
        description: "Convert leads faster.", 
        content: automationContent["lead-management-automation"].content 
      }
    ]
  },
  "ai-systems-integration": {
    title: "AI Systems Integration",
    h1: pillarContent["ai-systems-integration"].h1,
    slug: "ai-systems-integration",
    description: "Leverage artificial intelligence to future-proof your business.",
    overview: pillarContent["ai-systems-integration"].overview,
    benefits: [
      "Enhanced Customer Support",
      "Data-Driven Insights",
      "Personalized Marketing",
      "Operational Efficiency"
    ],
    process: [
      { step: "AI Readiness Audit", detail: "Assessing where AI can provide the most value." },
      { step: "Model Selection", detail: "Choosing between LLMs, custom models, or APIs." },
      { step: "Integration", detail: "Connecting AI to your existing business systems." }
    ],
    faqs: [
      { q: "Is AI expensive to implement?", a: "We offer scalable solutions that fit various budgets." }
    ],
    clusters: [
      { 
        title: "AI Chatbots", 
        h1: aiSystemsContent["ai-chatbots"].h1,
        slug: "ai-chatbots", 
        description: "24/7 intelligent support.", 
        content: aiSystemsContent["ai-chatbots"].content 
      },
      { 
        title: "AI Business Systems", 
        h1: aiSystemsContent["ai-business-systems"].h1,
        slug: "ai-business-systems", 
        description: "Smart infrastructure.", 
        content: aiSystemsContent["ai-business-systems"].content 
      },
      { 
        title: "AI Data Analytics", 
        h1: aiSystemsContent["ai-data-analytics"].h1,
        slug: "ai-data-analytics", 
        description: "Predictive insights.", 
        content: aiSystemsContent["ai-data-analytics"].content 
      },
      { 
        title: "AI Strategy & Consulting", 
        h1: aiSystemsContent["ai-strategy-consulting"].h1,
        slug: "ai-strategy-consulting", 
        description: "Strategic AI roadmaps.", 
        content: aiSystemsContent["ai-strategy-consulting"].content 
      }
    ]
  }
};
