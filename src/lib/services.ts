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
    description: "Mobile-first web design, website development, e-commerce, and custom web applications for Nairobi and Kenyan businesses.",
    overview: pillarContent["web-development"].overview,
    benefits: ["Mobile-First Responsive Design", "Blazing Fast Performance", "SEO-Optimized Codebase", "Scalable Architecture"],
    process: [{ step: "Discovery", detail: "Understanding your business goals and user needs." }, { step: "Strategy", detail: "Defining the technical stack and user journey." }, { step: "Design", detail: "Creating high-fidelity UI/UX mockups." }, { step: "Development", detail: "Coding with the latest technologies (Next.js, React)." }],
    faqs: [{ q: "How long does a website take to build?", a: "Typically 4-8 weeks depending on complexity." }, { q: "Do you provide maintenance?", a: "Yes, we offer ongoing support and security updates." }],
    clusters: [
      { 
        title: "Custom Web Applications", 
        h1: webDevContent["custom-web-applications"].h1,
        slug: "custom-web-applications", 
        description: "Custom Web Applications for Kenyan businesses, with practical strategy and implementation support.",
        content: webDevContent["custom-web-applications"].content 
      },
      { 
        title: "Ecommerce Solutions", 
        h1: webDevContent["ecommerce-solutions"].h1,
        slug: "ecommerce-solutions", 
        description: "Ecommerce Solutions for Kenyan businesses, with practical strategy and implementation support.",
        content: webDevContent["ecommerce-solutions"].content 
      },
      { 
        title: "Website Development Kenya", 
        h1: webDevContent["website-development-kenya"].h1,
        slug: "website-development-kenya", 
        description: "Website Development Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: webDevContent["website-development-kenya"].content 
      },
      { 
        title: "Mobile App Development", 
        h1: webDevContent["mobile-app-development"].h1,
        slug: "mobile-app-development", 
        description: "Mobile App Development for Kenyan businesses, with practical strategy and implementation support.",
        content: webDevContent["mobile-app-development"].content 
      },
      { 
        title: "Saas Product Development", 
        h1: webDevContent["saas-product-development"].h1,
        slug: "saas-product-development", 
        description: "Saas Product Development for Kenyan businesses, with practical strategy and implementation support.",
        content: webDevContent["saas-product-development"].content 
      },
      { 
        title: "Api Integration Services", 
        h1: webDevContent["api-integration-services"].h1,
        slug: "api-integration-services", 
        description: "Api Integration Services for Kenyan businesses, with practical strategy and implementation support.",
        content: webDevContent["api-integration-services"].content 
      },
      { 
        title: "Cloud Infrastructure Devops", 
        h1: webDevContent["cloud-infrastructure-devops"].h1,
        slug: "cloud-infrastructure-devops", 
        description: "Cloud Infrastructure Devops for Kenyan businesses, with practical strategy and implementation support.",
        content: webDevContent["cloud-infrastructure-devops"].content 
      },
      { 
        title: "Ui Ux Design Services", 
        h1: webDevContent["ui-ux-design-services"].h1,
        slug: "ui-ux-design-services", 
        description: "Ui Ux Design Services for Kenyan businesses, with practical strategy and implementation support.",
        content: webDevContent["ui-ux-design-services"].content 
      },
      { 
        title: "Digital Transformation Consulting", 
        h1: webDevContent["digital-transformation-consulting"].h1,
        slug: "digital-transformation-consulting", 
        description: "Digital Transformation Consulting for Kenyan businesses, with practical strategy and implementation support.",
        content: webDevContent["digital-transformation-consulting"].content 
      },
      { 
        title: "Maintenance Support Packages", 
        h1: webDevContent["maintenance-support-packages"].h1,
        slug: "maintenance-support-packages", 
        description: "Maintenance Support Packages for Kenyan businesses, with practical strategy and implementation support.",
        content: webDevContent["maintenance-support-packages"].content 
      }
    ]
  },
  "seo-digital-marketing": {
    title: "SEO & Digital Marketing",
    h1: pillarContent["seo-digital-marketing"].h1,
    slug: "seo-digital-marketing",
    description: "SEO services in Nairobi and Kenya covering technical SEO, local search, keyword research, content, and reporting.",
    overview: pillarContent["seo-digital-marketing"].overview,
    benefits: ["Higher Google Rankings", "Increased Organic Traffic", "Better Conversion Rates", "Detailed Analytics"],
    process: [{ step: "Audit", detail: "Analyzing your current performance and competitors." }, { step: "Keyword Research", detail: "Finding the terms your customers are searching for." }, { step: "Optimization", detail: "Technical and on-page SEO improvements." }, { step: "Reporting", detail: "Monthly insights on growth and ROI." }],
    faqs: [{ q: "When will I see results?", a: "Typically 3-6 months for sustainable organic growth." }],
    clusters: [
      { 
        title: "Ai Powered Marketing", 
        h1: seoContent["ai-powered-marketing"].h1,
        slug: "ai-powered-marketing", 
        description: "Ai Powered Marketing for Kenyan businesses, with practical strategy and implementation support.",
        content: seoContent["ai-powered-marketing"].content 
      },
      { 
        title: "Ai Seo Services Kenya", 
        h1: seoContent["ai-seo-services-kenya"].h1,
        slug: "ai-seo-services-kenya", 
        description: "Ai Seo Services Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: seoContent["ai-seo-services-kenya"].content 
      },
      { 
        title: "Local Seo Nairobi", 
        h1: seoContent["local-seo-nairobi"].h1,
        slug: "local-seo-nairobi", 
        description: "Local Seo Nairobi for Kenyan businesses, with practical strategy and implementation support.",
        content: seoContent["local-seo-nairobi"].content 
      },
      { 
        title: "Technical Seo Audit", 
        h1: seoContent["technical-seo-audit"].h1,
        slug: "technical-seo-audit", 
        description: "Technical Seo Audit for Kenyan businesses, with practical strategy and implementation support.",
        content: seoContent["technical-seo-audit"].content 
      },
      { 
        title: "On Page Seo Kenya", 
        h1: seoContent["on-page-seo-kenya"].h1,
        slug: "on-page-seo-kenya", 
        description: "On Page Seo Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: seoContent["on-page-seo-kenya"].content 
      },
      { 
        title: "Ecommerce Seo Kenya", 
        h1: seoContent["ecommerce-seo-kenya"].h1,
        slug: "ecommerce-seo-kenya", 
        description: "Ecommerce Seo Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: seoContent["ecommerce-seo-kenya"].content 
      },
      { 
        title: "Link Building Kenya", 
        h1: seoContent["link-building-kenya"].h1,
        slug: "link-building-kenya", 
        description: "Link Building Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: seoContent["link-building-kenya"].content 
      },
      { 
        title: "Keyword Research Kenya", 
        h1: seoContent["keyword-research-kenya"].h1,
        slug: "keyword-research-kenya", 
        description: "Keyword Research Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: seoContent["keyword-research-kenya"].content 
      },
      { 
        title: "Seo Reporting Analytics", 
        h1: seoContent["seo-reporting-analytics"].h1,
        slug: "seo-reporting-analytics", 
        description: "Seo Reporting Analytics for Kenyan businesses, with practical strategy and implementation support.",
        content: seoContent["seo-reporting-analytics"].content 
      },
      { 
        title: "Content Writing Kenya", 
        h1: seoContent["content-writing-kenya"].h1,
        slug: "content-writing-kenya", 
        description: "Content Writing Kenya for Kenyan businesses, with practical strategy and implementation support.",
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
        description: "Business Automation Nairobi for Kenyan businesses, with practical strategy and implementation support.",
        content: automationContent["business-automation-nairobi"].content 
      },
      { 
        title: "Crm Automation", 
        h1: automationContent["crm-automation"].h1,
        slug: "crm-automation", 
        description: "Crm Automation for Kenyan businesses, with practical strategy and implementation support.",
        content: automationContent["crm-automation"].content 
      },
      { 
        title: "Lead Management Automation", 
        h1: automationContent["lead-management-automation"].h1,
        slug: "lead-management-automation", 
        description: "Lead Management Automation for Kenyan businesses, with practical strategy and implementation support.",
        content: automationContent["lead-management-automation"].content 
      },
      { 
        title: "Email Marketing Automation", 
        h1: automationContent["email-marketing-automation"].h1,
        slug: "email-marketing-automation", 
        description: "Email Marketing Automation for Kenyan businesses, with practical strategy and implementation support.",
        content: automationContent["email-marketing-automation"].content 
      },
      { 
        title: "Social Media Automation", 
        h1: automationContent["social-media-automation"].h1,
        slug: "social-media-automation", 
        description: "Social Media Automation for Kenyan businesses, with practical strategy and implementation support.",
        content: automationContent["social-media-automation"].content 
      },
      { 
        title: "Accounting Automation Kenya", 
        h1: automationContent["accounting-automation-kenya"].h1,
        slug: "accounting-automation-kenya", 
        description: "Accounting Automation Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: automationContent["accounting-automation-kenya"].content 
      },
      { 
        title: "Hr Onboarding Automation", 
        h1: automationContent["hr-onboarding-automation"].h1,
        slug: "hr-onboarding-automation", 
        description: "Hr Onboarding Automation for Kenyan businesses, with practical strategy and implementation support.",
        content: automationContent["hr-onboarding-automation"].content 
      },
      { 
        title: "Zapier Make Integration Kenya", 
        h1: automationContent["zapier-make-integration-kenya"].h1,
        slug: "zapier-make-integration-kenya", 
        description: "Zapier Make Integration Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: automationContent["zapier-make-integration-kenya"].content 
      },
      { 
        title: "Workflow Automation", 
        h1: automationContent["workflow-automation"].h1,
        slug: "workflow-automation", 
        description: "Workflow Automation for Kenyan businesses, with practical strategy and implementation support.",
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
        description: "Ai Strategy Consulting for Kenyan businesses, with practical strategy and implementation support.",
        content: aiSystemsContent["ai-strategy-consulting"].content 
      },
      { 
        title: "Ai Chatbots", 
        h1: aiSystemsContent["ai-chatbots"].h1,
        slug: "ai-chatbots", 
        description: "Ai Chatbots for Kenyan businesses, with practical strategy and implementation support.",
        content: aiSystemsContent["ai-chatbots"].content 
      },
      { 
        title: "Ai Business Systems", 
        h1: aiSystemsContent["ai-business-systems"].h1,
        slug: "ai-business-systems", 
        description: "Ai Business Systems for Kenyan businesses, with practical strategy and implementation support.",
        content: aiSystemsContent["ai-business-systems"].content 
      },
      { 
        title: "Whatsapp Automation Kenya", 
        h1: aiSystemsContent["whatsapp-automation-kenya"].h1,
        slug: "whatsapp-automation-kenya", 
        description: "Whatsapp Automation Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: aiSystemsContent["whatsapp-automation-kenya"].content 
      },
      { 
        title: "Ai Customer Support", 
        h1: aiSystemsContent["ai-customer-support"].h1,
        slug: "ai-customer-support", 
        description: "Ai Customer Support for Kenyan businesses, with practical strategy and implementation support.",
        content: aiSystemsContent["ai-customer-support"].content 
      },
      { 
        title: "Predictive Analytics", 
        h1: aiSystemsContent["predictive-analytics"].h1,
        slug: "predictive-analytics", 
        description: "Predictive Analytics for Kenyan businesses, with practical strategy and implementation support.",
        content: aiSystemsContent["predictive-analytics"].content 
      },
      { 
        title: "Ai Ecommerce Kenya", 
        h1: aiSystemsContent["ai-ecommerce-kenya"].h1,
        slug: "ai-ecommerce-kenya", 
        description: "Ai Ecommerce Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: aiSystemsContent["ai-ecommerce-kenya"].content 
      },
      { 
        title: "Chatgpt Integration Kenya", 
        h1: aiSystemsContent["chatgpt-integration-kenya"].h1,
        slug: "chatgpt-integration-kenya", 
        description: "Chatgpt Integration Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: aiSystemsContent["chatgpt-integration-kenya"].content 
      },
      { 
        title: "Ai Data Analytics", 
        h1: aiSystemsContent["ai-data-analytics"].h1,
        slug: "ai-data-analytics", 
        description: "Ai Data Analytics for Kenyan businesses, with practical strategy and implementation support.",
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
        description: "Logo Design Branding for Kenyan businesses, with practical strategy and implementation support.",
        content: graphicDesignContent["logo-design-branding"].content 
      },
      { 
        title: "Company Profile Design", 
        h1: graphicDesignContent["company-profile-design"].h1,
        slug: "company-profile-design", 
        description: "Company Profile Design for Kenyan businesses, with practical strategy and implementation support.",
        content: graphicDesignContent["company-profile-design"].content 
      },
      { 
        title: "Packaging Design Kenya", 
        h1: graphicDesignContent["packaging-design-kenya"].h1,
        slug: "packaging-design-kenya", 
        description: "Packaging Design Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: graphicDesignContent["packaging-design-kenya"].content 
      },
      { 
        title: "Social Media Graphics", 
        h1: graphicDesignContent["social-media-graphics"].h1,
        slug: "social-media-graphics", 
        description: "Social Media Graphics for Kenyan businesses, with practical strategy and implementation support.",
        content: graphicDesignContent["social-media-graphics"].content 
      },
      { 
        title: "Billboard Print Design", 
        h1: graphicDesignContent["billboard-print-design"].h1,
        slug: "billboard-print-design", 
        description: "Billboard Print Design for Kenyan businesses, with practical strategy and implementation support.",
        content: graphicDesignContent["billboard-print-design"].content 
      },
      { 
        title: "Annual Report Design", 
        h1: graphicDesignContent["annual-report-design"].h1,
        slug: "annual-report-design", 
        description: "Annual Report Design for Kenyan businesses, with practical strategy and implementation support.",
        content: graphicDesignContent["annual-report-design"].content 
      },
      { 
        title: "Brand Guidelines Creation", 
        h1: graphicDesignContent["brand-guidelines-creation"].h1,
        slug: "brand-guidelines-creation", 
        description: "Brand Guidelines Creation for Kenyan businesses, with practical strategy and implementation support.",
        content: graphicDesignContent["brand-guidelines-creation"].content 
      },
      { 
        title: "Pitch Deck Design", 
        h1: graphicDesignContent["pitch-deck-design"].h1,
        slug: "pitch-deck-design", 
        description: "Pitch Deck Design for Kenyan businesses, with practical strategy and implementation support.",
        content: graphicDesignContent["pitch-deck-design"].content 
      }
    ]
  },
  "social-media-management": {
    title: "Social Media Management",
    h1: pillarContent["social-media-management"].h1,
    slug: "social-media-management",
    description: "Social media management in Kenya that connects content, community, WhatsApp enquiries, and measurable business outcomes.",
    overview: pillarContent["social-media-management"].overview,
    benefits: ["Increased Brand Awareness", "Highly Engaged Communities", "Direct Lead Generation", "Real-time Customer Interaction"],
    process: [{ step: "Strategy Audit", detail: "Analyzing current performance." }, { step: "Content Pillars", detail: "Defining core messaging." }, { step: "Creation", detail: "Designing native content." }, { step: "Community", detail: "Active reputation management." }],
    faqs: [{ q: "Do you manage TikTok?", a: "Yes, we create platform-native viral content." }],
    clusters: [
      { 
        title: "Instagram Marketing Kenya", 
        h1: socialMediaContent["instagram-marketing-kenya"].h1,
        slug: "instagram-marketing-kenya", 
        description: "Instagram Marketing Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: socialMediaContent["instagram-marketing-kenya"].content 
      },
      { 
        title: "Linkedin B2b Marketing", 
        h1: socialMediaContent["linkedin-b2b-marketing"].h1,
        slug: "linkedin-b2b-marketing", 
        description: "Linkedin B2b Marketing for Kenyan businesses, with practical strategy and implementation support.",
        content: socialMediaContent["linkedin-b2b-marketing"].content 
      },
      { 
        title: "Tiktok Marketing Kenya", 
        h1: socialMediaContent["tiktok-marketing-kenya"].h1,
        slug: "tiktok-marketing-kenya", 
        description: "Tiktok Marketing Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: socialMediaContent["tiktok-marketing-kenya"].content 
      },
      { 
        title: "Facebook Page Management", 
        h1: socialMediaContent["facebook-page-management"].h1,
        slug: "facebook-page-management", 
        description: "Facebook Page Management for Kenyan businesses, with practical strategy and implementation support.",
        content: socialMediaContent["facebook-page-management"].content 
      },
      { 
        title: "Social Media Strategy Audit", 
        h1: socialMediaContent["social-media-strategy-audit"].h1,
        slug: "social-media-strategy-audit", 
        description: "Social Media Strategy Audit for Kenyan businesses, with practical strategy and implementation support.",
        content: socialMediaContent["social-media-strategy-audit"].content 
      },
      { 
        title: "Influencer Marketing Kenya", 
        h1: socialMediaContent["influencer-marketing-kenya"].h1,
        slug: "influencer-marketing-kenya", 
        description: "Influencer Marketing Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: socialMediaContent["influencer-marketing-kenya"].content 
      },
      { 
        title: "Community Management Moderation", 
        h1: socialMediaContent["community-management-moderation"].h1,
        slug: "community-management-moderation", 
        description: "Community Management Moderation for Kenyan businesses, with practical strategy and implementation support.",
        content: socialMediaContent["community-management-moderation"].content 
      }
    ]
  },
  "google-ads-ppc": {
    title: "Google Ads & PPC",
    h1: pillarContent["google-ads-ppc"].h1,
    slug: "google-ads-ppc",
    description: "Google Ads and PPC management in Kenya for search campaigns, conversion tracking, landing pages, and accountable ad spend.",
    overview: pillarContent["google-ads-ppc"].overview,
    benefits: ["High-Intent Traffic", "Immediate Visibility", "Data-Driven ROI", "Scalable Growth"],
    process: [{ step: "Audit", detail: "Analyzing existing ad waste." }, { step: "Keyword Strategy", detail: "Targeting commercial intent." }, { step: "Ad Creation", detail: "Writing high-converting copy." }, { step: "Optimization", detail: "Daily bid management." }],
    faqs: [{ q: "What budget do I need?", a: "We recommend a minimum spend based on industry competition." }],
    clusters: [
      { 
        title: "Search Ads Management Kenya", 
        h1: googleAdsContent["search-ads-management-kenya"].h1,
        slug: "search-ads-management-kenya", 
        description: "Search Ads Management Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: googleAdsContent["search-ads-management-kenya"].content 
      },
      { 
        title: "Display Retargeting Campaigns", 
        h1: googleAdsContent["display-retargeting-campaigns"].h1,
        slug: "display-retargeting-campaigns", 
        description: "Display Retargeting Campaigns for Kenyan businesses, with practical strategy and implementation support.",
        content: googleAdsContent["display-retargeting-campaigns"].content 
      },
      { 
        title: "Youtube Advertising Kenya", 
        h1: googleAdsContent["youtube-advertising-kenya"].h1,
        slug: "youtube-advertising-kenya", 
        description: "Youtube Advertising Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: googleAdsContent["youtube-advertising-kenya"].content 
      },
      { 
        title: "Ecommerce Google Shopping", 
        h1: googleAdsContent["ecommerce-google-shopping"].h1,
        slug: "ecommerce-google-shopping", 
        description: "Ecommerce Google Shopping for Kenyan businesses, with practical strategy and implementation support.",
        content: googleAdsContent["ecommerce-google-shopping"].content 
      },
      { 
        title: "Ppc Audit Optimization", 
        h1: googleAdsContent["ppc-audit-optimization"].h1,
        slug: "ppc-audit-optimization", 
        description: "Ppc Audit Optimization for Kenyan businesses, with practical strategy and implementation support.",
        content: googleAdsContent["ppc-audit-optimization"].content 
      },
      { 
        title: "Landing Page Design Optimization", 
        h1: googleAdsContent["landing-page-design-optimization"].h1,
        slug: "landing-page-design-optimization", 
        description: "Landing Page Design Optimization for Kenyan businesses, with practical strategy and implementation support.",
        content: googleAdsContent["landing-page-design-optimization"].content 
      }
    ]
  },
  "website-management": {
    title: "Website Management",
    h1: pillarContent["website-management"].h1,
    slug: "website-management",
    description: "Website maintenance, security, hosting, backups, and migration support for businesses that need a reliable digital presence.",
    overview: pillarContent["website-management"].overview,
    benefits: ["Zero Downtime", "Total Malware Protection", "Ultrafast Loading Speeds", "Peace of Mind"],
    process: [{ step: "Migration", detail: "Seamless hosting transfer." }, { step: "Hardening", detail: "Implementing WAF and security." }, { step: "Maintenance", detail: "Weekly core updates." }, { step: "Monitoring", detail: "24/7 uptime surveillance." }],
    faqs: [{ q: "Do you fix hacked sites?", a: "Yes, immediate malware removal is available." }],
    clusters: [
      { 
        title: "Monthly Maintenance Kenya", 
        h1: websiteManagementContent["monthly-maintenance-kenya"].h1,
        slug: "monthly-maintenance-kenya", 
        description: "Monthly Maintenance Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: websiteManagementContent["monthly-maintenance-kenya"].content 
      },
      { 
        title: "Website Security Kenya", 
        h1: websiteManagementContent["website-security-kenya"].h1,
        slug: "website-security-kenya", 
        description: "Website Security Kenya for Kenyan businesses, with practical strategy and implementation support.",
        content: websiteManagementContent["website-security-kenya"].content 
      },
      { 
        title: "Website Hosting Nairobi", 
        h1: websiteManagementContent["website-hosting-nairobi"].h1,
        slug: "website-hosting-nairobi", 
        description: "Website Hosting Nairobi for Kenyan businesses, with practical strategy and implementation support.",
        content: websiteManagementContent["website-hosting-nairobi"].content 
      },
      { 
        title: "Website Migration Services", 
        h1: websiteManagementContent["website-migration-services"].h1,
        slug: "website-migration-services", 
        description: "Website Migration Services for Kenyan businesses, with practical strategy and implementation support.",
        content: websiteManagementContent["website-migration-services"].content 
      }
    ]
  },
  "email-marketing": {
    title: "Email Marketing",
    h1: pillarContent["email-marketing"].h1,
    slug: "email-marketing",
    description: "Email campaigns, lead-nurture sequences, and reporting systems for Kenyan businesses.",
    overview: pillarContent["email-marketing"].overview,
    benefits: ["Owned Audience Growth", "Automated Sales Funnels", "High ROI Marketing", "Personalized Messaging"],
    process: [{ step: "Strategy", detail: "Defining the customer journey." }, { step: "List Building", detail: "Creating high-value lead magnets." }, { step: "Automation", detail: "Setting up drip campaigns." }, { step: "Campaigns", detail: "Monthly newsletter execution." }],
    faqs: [{ q: "Do you handle email design?", a: "Yes, beautiful and responsive HTML templates." }],
    clusters: [
      { 
        title: "Email Campaign Management", 
        h1: emailMarketingContent["email-campaign-management"].h1,
        slug: "email-campaign-management", 
        description: "Email Campaign Management for Kenyan businesses, with practical strategy and implementation support.",
        content: emailMarketingContent["email-campaign-management"].content 
      },
      { 
        title: "Email Automation Sequences", 
        h1: emailMarketingContent["email-automation-sequences"].h1,
        slug: "email-automation-sequences", 
        description: "Email Automation Sequences for Kenyan businesses, with practical strategy and implementation support.",
        content: emailMarketingContent["email-automation-sequences"].content 
      },
      { 
        title: "Lead Generation List Building", 
        h1: emailMarketingContent["lead-generation-list-building"].h1,
        slug: "lead-generation-list-building", 
        description: "Lead Generation List Building for Kenyan businesses, with practical strategy and implementation support.",
        content: emailMarketingContent["lead-generation-list-building"].content 
      }
    ]
  }
};
