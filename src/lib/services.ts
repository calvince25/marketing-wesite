import { aiSystemsContent } from "@/data/services/ai-systems";
import { webDevContent } from "@/data/services/web-dev";
import { automationContent } from "@/data/services/automation";
import { seoContent } from "@/data/services/seo";
import { pillarContent } from "@/data/services/pillars";
import { graphicDesignContent } from "@/data/services/graphic-design";
import { socialMediaContent } from "@/data/services/social-media";
import { googleAdsContent } from "@/data/services/google-ads";
import { websiteManagementContent } from "@/data/services/website-management";
import { emailMarketingContent } from "@/data/services/email-marketing";

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
    benefits: ["Mobile-First Responsive Design", "Blazing Fast Performance", "SEO-Optimized Codebase", "Scalable Architecture"],
    process: [{ step: "Discovery", detail: "Understanding your business goals and user needs." }, { step: "Strategy", detail: "Defining the technical stack and user journey." }, { step: "Design", detail: "Creating high-fidelity UI/UX mockups." }, { step: "Development", detail: "Coding with the latest technologies (Next.js, React)." }],
    faqs: [{ q: "How long does a website take to build?", a: "Typically 4-8 weeks depending on complexity." }, { q: "Do you provide maintenance?", a: "Yes, we offer ongoing support and security updates." }],
    clusters: [
      { 
        title: "Custom Web Applications", 
        h1: webDevContent["custom-web-applications"].h1,
        slug: "custom-web-applications", 
        description: "Professional custom web applications services.", 
        content: webDevContent["custom-web-applications"].content 
      },
      { 
        title: "Ecommerce Solutions", 
        h1: webDevContent["ecommerce-solutions"].h1,
        slug: "ecommerce-solutions", 
        description: "Professional ecommerce solutions services.", 
        content: webDevContent["ecommerce-solutions"].content 
      },
      { 
        title: "Website Development Kenya", 
        h1: webDevContent["website-development-kenya"].h1,
        slug: "website-development-kenya", 
        description: "Professional website development kenya services.", 
        content: webDevContent["website-development-kenya"].content 
      },
      { 
        title: "Mobile App Development", 
        h1: webDevContent["mobile-app-development"].h1,
        slug: "mobile-app-development", 
        description: "Professional mobile app development services.", 
        content: webDevContent["mobile-app-development"].content 
      },
      { 
        title: "Saas Product Development", 
        h1: webDevContent["saas-product-development"].h1,
        slug: "saas-product-development", 
        description: "Professional saas product development services.", 
        content: webDevContent["saas-product-development"].content 
      },
      { 
        title: "Api Integration Services", 
        h1: webDevContent["api-integration-services"].h1,
        slug: "api-integration-services", 
        description: "Professional api integration services services.", 
        content: webDevContent["api-integration-services"].content 
      },
      { 
        title: "Cloud Infrastructure Devops", 
        h1: webDevContent["cloud-infrastructure-devops"].h1,
        slug: "cloud-infrastructure-devops", 
        description: "Professional cloud infrastructure devops services.", 
        content: webDevContent["cloud-infrastructure-devops"].content 
      },
      { 
        title: "Ui Ux Design Services", 
        h1: webDevContent["ui-ux-design-services"].h1,
        slug: "ui-ux-design-services", 
        description: "Professional ui ux design services services.", 
        content: webDevContent["ui-ux-design-services"].content 
      },
      { 
        title: "Digital Transformation Consulting", 
        h1: webDevContent["digital-transformation-consulting"].h1,
        slug: "digital-transformation-consulting", 
        description: "Professional digital transformation consulting services.", 
        content: webDevContent["digital-transformation-consulting"].content 
      },
      { 
        title: "Maintenance Support Packages", 
        h1: webDevContent["maintenance-support-packages"].h1,
        slug: "maintenance-support-packages", 
        description: "Professional maintenance support packages services.", 
        content: webDevContent["maintenance-support-packages"].content 
      }
    ]
  },
  "seo-digital-marketing": {
    title: "SEO & Digital Marketing",
    h1: pillarContent["seo-digital-marketing"].h1,
    slug: "seo-digital-marketing",
    description: "Get found on Google and convert searchers into customers.",
    overview: pillarContent["seo-digital-marketing"].overview,
    benefits: ["Higher Google Rankings", "Increased Organic Traffic", "Better Conversion Rates", "Detailed Analytics"],
    process: [{ step: "Audit", detail: "Analyzing your current performance and competitors." }, { step: "Keyword Research", detail: "Finding the terms your customers are searching for." }, { step: "Optimization", detail: "Technical and on-page SEO improvements." }, { step: "Reporting", detail: "Monthly insights on growth and ROI." }],
    faqs: [{ q: "When will I see results?", a: "Typically 3-6 months for sustainable organic growth." }],
    clusters: [
      { 
        title: "Ai Powered Marketing", 
        h1: seoContent["ai-powered-marketing"].h1,
        slug: "ai-powered-marketing", 
        description: "Professional ai powered marketing services.", 
        content: seoContent["ai-powered-marketing"].content 
      },
      { 
        title: "Ai Seo Services Kenya", 
        h1: seoContent["ai-seo-services-kenya"].h1,
        slug: "ai-seo-services-kenya", 
        description: "Professional ai seo services kenya services.", 
        content: seoContent["ai-seo-services-kenya"].content 
      },
      { 
        title: "Local Seo Nairobi", 
        h1: seoContent["local-seo-nairobi"].h1,
        slug: "local-seo-nairobi", 
        description: "Professional local seo nairobi services.", 
        content: seoContent["local-seo-nairobi"].content 
      },
      { 
        title: "Technical Seo Audit", 
        h1: seoContent["technical-seo-audit"].h1,
        slug: "technical-seo-audit", 
        description: "Professional technical seo audit services.", 
        content: seoContent["technical-seo-audit"].content 
      },
      { 
        title: "On Page Seo Kenya", 
        h1: seoContent["on-page-seo-kenya"].h1,
        slug: "on-page-seo-kenya", 
        description: "Professional on page seo kenya services.", 
        content: seoContent["on-page-seo-kenya"].content 
      },
      { 
        title: "Ecommerce Seo Kenya", 
        h1: seoContent["ecommerce-seo-kenya"].h1,
        slug: "ecommerce-seo-kenya", 
        description: "Professional ecommerce seo kenya services.", 
        content: seoContent["ecommerce-seo-kenya"].content 
      },
      { 
        title: "Link Building Kenya", 
        h1: seoContent["link-building-kenya"].h1,
        slug: "link-building-kenya", 
        description: "Professional link building kenya services.", 
        content: seoContent["link-building-kenya"].content 
      },
      { 
        title: "Keyword Research Kenya", 
        h1: seoContent["keyword-research-kenya"].h1,
        slug: "keyword-research-kenya", 
        description: "Professional keyword research kenya services.", 
        content: seoContent["keyword-research-kenya"].content 
      },
      { 
        title: "Seo Reporting Analytics", 
        h1: seoContent["seo-reporting-analytics"].h1,
        slug: "seo-reporting-analytics", 
        description: "Professional seo reporting analytics services.", 
        content: seoContent["seo-reporting-analytics"].content 
      },
      { 
        title: "Content Writing Kenya", 
        h1: seoContent["content-writing-kenya"].h1,
        slug: "content-writing-kenya", 
        description: "Professional content writing kenya services.", 
        content: seoContent["content-writing-kenya"].content 
      }
    ]
  },
  "business-automation": {
    title: "Business Automation",
    h1: pillarContent["business-automation"].h1,
    slug: "business-automation",
    description: "Streamline your operations and focus on what matters most.",
    overview: pillarContent["business-automation"].overview,
    benefits: ["Significant Time Savings", "Reduced Human Error", "Scalable Operations", "Better Data Accuracy"],
    process: [{ step: "Workflow Mapping", detail: "Identifying bottlenecks in your current process." }, { step: "Tool Selection", detail: "Choosing the right automation stack." }, { step: "Implementation", detail: "Building and testing the automated flows." }],
    faqs: [{ q: "Can you automate my CRM?", a: "Yes, we integrate with most major CRMs like HubSpot and Zoho." }],
    clusters: [
      { 
        title: "Business Automation Nairobi", 
        h1: automationContent["business-automation-nairobi"].h1,
        slug: "business-automation-nairobi", 
        description: "Professional business automation nairobi services.", 
        content: automationContent["business-automation-nairobi"].content 
      },
      { 
        title: "Crm Automation", 
        h1: automationContent["crm-automation"].h1,
        slug: "crm-automation", 
        description: "Professional crm automation services.", 
        content: automationContent["crm-automation"].content 
      },
      { 
        title: "Lead Management Automation", 
        h1: automationContent["lead-management-automation"].h1,
        slug: "lead-management-automation", 
        description: "Professional lead management automation services.", 
        content: automationContent["lead-management-automation"].content 
      },
      { 
        title: "Email Marketing Automation", 
        h1: automationContent["email-marketing-automation"].h1,
        slug: "email-marketing-automation", 
        description: "Professional email marketing automation services.", 
        content: automationContent["email-marketing-automation"].content 
      },
      { 
        title: "Social Media Automation", 
        h1: automationContent["social-media-automation"].h1,
        slug: "social-media-automation", 
        description: "Professional social media automation services.", 
        content: automationContent["social-media-automation"].content 
      },
      { 
        title: "Accounting Automation Kenya", 
        h1: automationContent["accounting-automation-kenya"].h1,
        slug: "accounting-automation-kenya", 
        description: "Professional accounting automation kenya services.", 
        content: automationContent["accounting-automation-kenya"].content 
      },
      { 
        title: "Hr Onboarding Automation", 
        h1: automationContent["hr-onboarding-automation"].h1,
        slug: "hr-onboarding-automation", 
        description: "Professional hr onboarding automation services.", 
        content: automationContent["hr-onboarding-automation"].content 
      },
      { 
        title: "Zapier Make Integration Kenya", 
        h1: automationContent["zapier-make-integration-kenya"].h1,
        slug: "zapier-make-integration-kenya", 
        description: "Professional zapier make integration kenya services.", 
        content: automationContent["zapier-make-integration-kenya"].content 
      },
      { 
        title: "Workflow Automation", 
        h1: automationContent["workflow-automation"].h1,
        slug: "workflow-automation", 
        description: "Professional workflow automation services.", 
        content: automationContent["workflow-automation"].content 
      }
    ]
  },
  "ai-systems-integration": {
    title: "AI Systems Integration",
    h1: pillarContent["ai-systems-integration"].h1,
    slug: "ai-systems-integration",
    description: "Leverage artificial intelligence to future-proof your business.",
    overview: pillarContent["ai-systems-integration"].overview,
    benefits: ["Enhanced Customer Support", "Data-Driven Insights", "Personalized Marketing", "Operational Efficiency"],
    process: [{ step: "AI Readiness Audit", detail: "Assessing where AI can provide the most value." }, { step: "Model Selection", detail: "Choosing between LLMs, custom models, or APIs." }, { step: "Integration", detail: "Connecting AI to your existing business systems." }],
    faqs: [{ q: "Is AI expensive to implement?", a: "We offer scalable solutions that fit various budgets." }],
    clusters: [
      { 
        title: "Ai Strategy Consulting", 
        h1: aiSystemsContent["ai-strategy-consulting"].h1,
        slug: "ai-strategy-consulting", 
        description: "Professional ai strategy consulting services.", 
        content: aiSystemsContent["ai-strategy-consulting"].content 
      },
      { 
        title: "Ai Chatbots", 
        h1: aiSystemsContent["ai-chatbots"].h1,
        slug: "ai-chatbots", 
        description: "Professional ai chatbots services.", 
        content: aiSystemsContent["ai-chatbots"].content 
      },
      { 
        title: "Ai Business Systems", 
        h1: aiSystemsContent["ai-business-systems"].h1,
        slug: "ai-business-systems", 
        description: "Professional ai business systems services.", 
        content: aiSystemsContent["ai-business-systems"].content 
      },
      { 
        title: "Whatsapp Automation Kenya", 
        h1: aiSystemsContent["whatsapp-automation-kenya"].h1,
        slug: "whatsapp-automation-kenya", 
        description: "Professional whatsapp automation kenya services.", 
        content: aiSystemsContent["whatsapp-automation-kenya"].content 
      },
      { 
        title: "Ai Customer Support", 
        h1: aiSystemsContent["ai-customer-support"].h1,
        slug: "ai-customer-support", 
        description: "Professional ai customer support services.", 
        content: aiSystemsContent["ai-customer-support"].content 
      },
      { 
        title: "Predictive Analytics", 
        h1: aiSystemsContent["predictive-analytics"].h1,
        slug: "predictive-analytics", 
        description: "Professional predictive analytics services.", 
        content: aiSystemsContent["predictive-analytics"].content 
      },
      { 
        title: "Ai Ecommerce Kenya", 
        h1: aiSystemsContent["ai-ecommerce-kenya"].h1,
        slug: "ai-ecommerce-kenya", 
        description: "Professional ai ecommerce kenya services.", 
        content: aiSystemsContent["ai-ecommerce-kenya"].content 
      },
      { 
        title: "Chatgpt Integration Kenya", 
        h1: aiSystemsContent["chatgpt-integration-kenya"].h1,
        slug: "chatgpt-integration-kenya", 
        description: "Professional chatgpt integration kenya services.", 
        content: aiSystemsContent["chatgpt-integration-kenya"].content 
      },
      { 
        title: "Ai Data Analytics", 
        h1: aiSystemsContent["ai-data-analytics"].h1,
        slug: "ai-data-analytics", 
        description: "Professional ai data analytics services.", 
        content: aiSystemsContent["ai-data-analytics"].content 
      }
    ]
  },
  "graphic-design": {
    title: "Graphic Design",
    h1: pillarContent["graphic-design"].h1,
    slug: "graphic-design",
    description: "Visual identities that command respect.",
    overview: pillarContent["graphic-design"].overview,
    benefits: ["Premium Brand Perception", "Consistent Visual Identity", "Higher Conversion Rates", "Professional Corporate Image"],
    process: [{ step: "Discovery", detail: "Unpacking brand psychology." }, { step: "Concept", detail: "Initial design drafts." }, { step: "Refinement", detail: "Perfecting the chosen direction." }, { step: "Rollout", detail: "Delivering the brand assets." }],
    faqs: [{ q: "Do you offer complete rebrands?", a: "Yes, from logo to full corporate profile design." }],
    clusters: [
      { 
        title: "Logo Design Branding", 
        h1: graphicDesignContent["logo-design-branding"].h1,
        slug: "logo-design-branding", 
        description: "Professional logo design branding services.", 
        content: graphicDesignContent["logo-design-branding"].content 
      },
      { 
        title: "Company Profile Design", 
        h1: graphicDesignContent["company-profile-design"].h1,
        slug: "company-profile-design", 
        description: "Professional company profile design services.", 
        content: graphicDesignContent["company-profile-design"].content 
      },
      { 
        title: "Packaging Design Kenya", 
        h1: graphicDesignContent["packaging-design-kenya"].h1,
        slug: "packaging-design-kenya", 
        description: "Professional packaging design kenya services.", 
        content: graphicDesignContent["packaging-design-kenya"].content 
      },
      { 
        title: "Social Media Graphics", 
        h1: graphicDesignContent["social-media-graphics"].h1,
        slug: "social-media-graphics", 
        description: "Professional social media graphics services.", 
        content: graphicDesignContent["social-media-graphics"].content 
      },
      { 
        title: "Billboard Print Design", 
        h1: graphicDesignContent["billboard-print-design"].h1,
        slug: "billboard-print-design", 
        description: "Professional billboard print design services.", 
        content: graphicDesignContent["billboard-print-design"].content 
      },
      { 
        title: "Annual Report Design", 
        h1: graphicDesignContent["annual-report-design"].h1,
        slug: "annual-report-design", 
        description: "Professional annual report design services.", 
        content: graphicDesignContent["annual-report-design"].content 
      },
      { 
        title: "Brand Guidelines Creation", 
        h1: graphicDesignContent["brand-guidelines-creation"].h1,
        slug: "brand-guidelines-creation", 
        description: "Professional brand guidelines creation services.", 
        content: graphicDesignContent["brand-guidelines-creation"].content 
      },
      { 
        title: "Pitch Deck Design", 
        h1: graphicDesignContent["pitch-deck-design"].h1,
        slug: "pitch-deck-design", 
        description: "Professional pitch deck design services.", 
        content: graphicDesignContent["pitch-deck-design"].content 
      }
    ]
  },
  "social-media-management": {
    title: "Social Media Management",
    h1: pillarContent["social-media-management"].h1,
    slug: "social-media-management",
    description: "Building communities and driving commerce.",
    overview: pillarContent["social-media-management"].overview,
    benefits: ["Increased Brand Awareness", "Highly Engaged Communities", "Direct Lead Generation", "Real-time Customer Interaction"],
    process: [{ step: "Strategy Audit", detail: "Analyzing current performance." }, { step: "Content Pillars", detail: "Defining core messaging." }, { step: "Creation", detail: "Designing native content." }, { step: "Community", detail: "Active reputation management." }],
    faqs: [{ q: "Do you manage TikTok?", a: "Yes, we create platform-native viral content." }],
    clusters: [
      { 
        title: "Instagram Marketing Kenya", 
        h1: socialMediaContent["instagram-marketing-kenya"].h1,
        slug: "instagram-marketing-kenya", 
        description: "Professional instagram marketing kenya services.", 
        content: socialMediaContent["instagram-marketing-kenya"].content 
      },
      { 
        title: "Linkedin B2b Marketing", 
        h1: socialMediaContent["linkedin-b2b-marketing"].h1,
        slug: "linkedin-b2b-marketing", 
        description: "Professional linkedin b2b marketing services.", 
        content: socialMediaContent["linkedin-b2b-marketing"].content 
      },
      { 
        title: "Tiktok Marketing Kenya", 
        h1: socialMediaContent["tiktok-marketing-kenya"].h1,
        slug: "tiktok-marketing-kenya", 
        description: "Professional tiktok marketing kenya services.", 
        content: socialMediaContent["tiktok-marketing-kenya"].content 
      },
      { 
        title: "Facebook Page Management", 
        h1: socialMediaContent["facebook-page-management"].h1,
        slug: "facebook-page-management", 
        description: "Professional facebook page management services.", 
        content: socialMediaContent["facebook-page-management"].content 
      },
      { 
        title: "Social Media Strategy Audit", 
        h1: socialMediaContent["social-media-strategy-audit"].h1,
        slug: "social-media-strategy-audit", 
        description: "Professional social media strategy audit services.", 
        content: socialMediaContent["social-media-strategy-audit"].content 
      },
      { 
        title: "Influencer Marketing Kenya", 
        h1: socialMediaContent["influencer-marketing-kenya"].h1,
        slug: "influencer-marketing-kenya", 
        description: "Professional influencer marketing kenya services.", 
        content: socialMediaContent["influencer-marketing-kenya"].content 
      },
      { 
        title: "Community Management Moderation", 
        h1: socialMediaContent["community-management-moderation"].h1,
        slug: "community-management-moderation", 
        description: "Professional community management moderation services.", 
        content: socialMediaContent["community-management-moderation"].content 
      }
    ]
  },
  "google-ads-ppc": {
    title: "Google Ads & PPC",
    h1: pillarContent["google-ads-ppc"].h1,
    slug: "google-ads-ppc",
    description: "Instant ROI with scalable growth.",
    overview: pillarContent["google-ads-ppc"].overview,
    benefits: ["High-Intent Traffic", "Immediate Visibility", "Data-Driven ROI", "Scalable Growth"],
    process: [{ step: "Audit", detail: "Analyzing existing ad waste." }, { step: "Keyword Strategy", detail: "Targeting commercial intent." }, { step: "Ad Creation", detail: "Writing high-converting copy." }, { step: "Optimization", detail: "Daily bid management." }],
    faqs: [{ q: "What budget do I need?", a: "We recommend a minimum spend based on industry competition." }],
    clusters: [
      { 
        title: "Search Ads Management Kenya", 
        h1: googleAdsContent["search-ads-management-kenya"].h1,
        slug: "search-ads-management-kenya", 
        description: "Professional search ads management kenya services.", 
        content: googleAdsContent["search-ads-management-kenya"].content 
      },
      { 
        title: "Display Retargeting Campaigns", 
        h1: googleAdsContent["display-retargeting-campaigns"].h1,
        slug: "display-retargeting-campaigns", 
        description: "Professional display retargeting campaigns services.", 
        content: googleAdsContent["display-retargeting-campaigns"].content 
      },
      { 
        title: "Youtube Advertising Kenya", 
        h1: googleAdsContent["youtube-advertising-kenya"].h1,
        slug: "youtube-advertising-kenya", 
        description: "Professional youtube advertising kenya services.", 
        content: googleAdsContent["youtube-advertising-kenya"].content 
      },
      { 
        title: "Ecommerce Google Shopping", 
        h1: googleAdsContent["ecommerce-google-shopping"].h1,
        slug: "ecommerce-google-shopping", 
        description: "Professional ecommerce google shopping services.", 
        content: googleAdsContent["ecommerce-google-shopping"].content 
      },
      { 
        title: "Ppc Audit Optimization", 
        h1: googleAdsContent["ppc-audit-optimization"].h1,
        slug: "ppc-audit-optimization", 
        description: "Professional ppc audit optimization services.", 
        content: googleAdsContent["ppc-audit-optimization"].content 
      },
      { 
        title: "Landing Page Design Optimization", 
        h1: googleAdsContent["landing-page-design-optimization"].h1,
        slug: "landing-page-design-optimization", 
        description: "Professional landing page design optimization services.", 
        content: googleAdsContent["landing-page-design-optimization"].content 
      }
    ]
  },
  "website-management": {
    title: "Website Management",
    h1: pillarContent["website-management"].h1,
    slug: "website-management",
    description: "Protecting your digital investment.",
    overview: pillarContent["website-management"].overview,
    benefits: ["Zero Downtime", "Total Malware Protection", "Ultrafast Loading Speeds", "Peace of Mind"],
    process: [{ step: "Migration", detail: "Seamless hosting transfer." }, { step: "Hardening", detail: "Implementing WAF and security." }, { step: "Maintenance", detail: "Weekly core updates." }, { step: "Monitoring", detail: "24/7 uptime surveillance." }],
    faqs: [{ q: "Do you fix hacked sites?", a: "Yes, immediate malware removal is available." }],
    clusters: [
      { 
        title: "Monthly Maintenance Kenya", 
        h1: websiteManagementContent["monthly-maintenance-kenya"].h1,
        slug: "monthly-maintenance-kenya", 
        description: "Professional monthly maintenance kenya services.", 
        content: websiteManagementContent["monthly-maintenance-kenya"].content 
      },
      { 
        title: "Website Security Kenya", 
        h1: websiteManagementContent["website-security-kenya"].h1,
        slug: "website-security-kenya", 
        description: "Professional website security kenya services.", 
        content: websiteManagementContent["website-security-kenya"].content 
      },
      { 
        title: "Website Hosting Nairobi", 
        h1: websiteManagementContent["website-hosting-nairobi"].h1,
        slug: "website-hosting-nairobi", 
        description: "Professional website hosting nairobi services.", 
        content: websiteManagementContent["website-hosting-nairobi"].content 
      },
      { 
        title: "Website Migration Services", 
        h1: websiteManagementContent["website-migration-services"].h1,
        slug: "website-migration-services", 
        description: "Professional website migration services services.", 
        content: websiteManagementContent["website-migration-services"].content 
      }
    ]
  },
  "email-marketing": {
    title: "Email Marketing",
    h1: pillarContent["email-marketing"].h1,
    slug: "email-marketing",
    description: "Nurturing leads to conversion.",
    overview: pillarContent["email-marketing"].overview,
    benefits: ["Owned Audience Growth", "Automated Sales Funnels", "High ROI Marketing", "Personalized Messaging"],
    process: [{ step: "Strategy", detail: "Defining the customer journey." }, { step: "List Building", detail: "Creating high-value lead magnets." }, { step: "Automation", detail: "Setting up drip campaigns." }, { step: "Campaigns", detail: "Monthly newsletter execution." }],
    faqs: [{ q: "Do you handle email design?", a: "Yes, beautiful and responsive HTML templates." }],
    clusters: [
      { 
        title: "Email Campaign Management", 
        h1: emailMarketingContent["email-campaign-management"].h1,
        slug: "email-campaign-management", 
        description: "Professional email campaign management services.", 
        content: emailMarketingContent["email-campaign-management"].content 
      },
      { 
        title: "Email Automation Sequences", 
        h1: emailMarketingContent["email-automation-sequences"].h1,
        slug: "email-automation-sequences", 
        description: "Professional email automation sequences services.", 
        content: emailMarketingContent["email-automation-sequences"].content 
      },
      { 
        title: "Lead Generation List Building", 
        h1: emailMarketingContent["lead-generation-list-building"].h1,
        slug: "lead-generation-list-building", 
        description: "Professional lead generation list building services.", 
        content: emailMarketingContent["lead-generation-list-building"].content 
      }
    ]
  }
};
