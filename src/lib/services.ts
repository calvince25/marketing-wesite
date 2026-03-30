export type SubService = {
  title: string;
  slug: string;
  description: string;
  content: string;
};

export type PillarService = {
  title: string;
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
    slug: "web-development",
    description: "High-performance websites built for speed, security, and scalability.",
    overview: "In the digital age, your website is the foundation of your business. We build robust, custom web applications and websites that are not only visually stunning but also engineered for performance and SEO.",
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
      { title: "Website Development Kenya", slug: "website-development-kenya", description: "Premier web dev in Kenya.", content: "GrowthLab Limited provides top-tier website development services in Kenya. We specialize in building fast, secure, and SEO-friendly websites that help Kenyan businesses thrive online." },
      { title: "Responsive Web Design Kenya", slug: "responsive-web-design-kenya", description: "Mobile-first designs.", content: "Our responsive web design services ensure your site looks great on all devices, from smartphones in Nairobi to desktops in Mombasa." },
      { title: "Custom Web Applications", slug: "custom-web-applications", description: "Complex web systems.", content: "We build bespoke web applications tailored to your specific business logic and operational needs." },
      { title: "Ecommerce Solutions", slug: "ecommerce-solutions", description: "Scale your store.", content: "End-to-end ecommerce development including M-Pesa integration and inventory management." },
      { title: "Maintenance & Support", slug: "maintenance-and-support", description: "Keep your site running.", content: "Ongoing maintenance, security updates, and performance optimization for your web applications." }
    ]
  },
  "seo-digital-marketing": {
    title: "SEO & Digital Marketing",
    slug: "seo-digital-marketing",
    description: "Get found on Google and convert searchers into customers.",
    overview: "Our SEO and digital marketing strategies are designed to increase your visibility and drive ROI through data-backed decisions.",
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
      { title: "Local SEO Nairobi", slug: "local-seo-nairobi", description: "Dominate local search.", content: "Dominate local search results in Nairobi with our specialized local SEO strategies." },
      { title: "Content SEO Strategy", slug: "content-seo-strategy", description: "Data-driven content.", content: "We create content strategies that rank and convert, focusing on user intent and topical authority." },
      { title: "AI SEO Services Kenya", slug: "ai-seo-services-kenya", description: "Future-proof SEO.", content: "Leverage AI to optimize your content and stay ahead of the curve in the Kenyan market." },
      { title: "AI Powered Marketing", slug: "ai-powered-marketing", description: "Smart marketing automation.", content: "Use artificial intelligence to power your digital marketing campaigns for maximum efficiency." },
      { title: "Technical SEO Audit", slug: "technical-seo-audit", description: "Deep technical analysis.", content: "Identify and fix technical issues that hinder your search engine rankings with our comprehensive SEO audits." }
    ]
  },
  "business-automation": {
    title: "Business Automation",
    slug: "business-automation",
    description: "Streamline your operations and focus on what matters most.",
    overview: "Stop wasting time on repetitive tasks. We help businesses in Nairobi automate their workflows, from lead management to customer support, using modern SaaS integrations.",
    benefits: [
      "Significant Time Savings",
      "Reduced Human Error",
      "Scalable Operations",
      "Better Data Accuracy"
    ],
    process: [
      { step: "Workflow Mapping", detail: "Identifying bottlenecks in your current process." },
      { step: "Tool Selection", detail: "Choosing the right automation stack (Zapier, Make, etc.)." },
      { step: "Implementation", detail: "Building and testing the automated flows." }
    ],
    faqs: [
      { q: "Can you automate my CRM?", a: "Yes, we integrate with most major CRMs like HubSpot and Salesforce." }
    ],
    clusters: [
      { title: "Business Automation Nairobi", slug: "business-automation-nairobi", description: "Local business automation.", content: "Automation solutions tailored for businesses operating in Nairobi." },
      { title: "CRM Automation", slug: "crm-automation", description: "Customer relationship automation.", content: "Streamline your sales funnel with advanced CRM automation." },
      { title: "Workflow Automation", slug: "workflow-automation", description: "End-to-end efficiency.", content: "Connect your disparate systems into a unified, efficient workflow." },
      { title: "Lead Management Automation", slug: "lead-management-automation", description: "Convert leads faster.", content: "Automate your lead capture and nurturing processes to improve conversion rates." }
    ]
  },
  "ai-systems-integration": {
    title: "AI Systems Integration",
    slug: "ai-systems-integration",
    description: "Leverage artificial intelligence to future-proof your business.",
    overview: "Artificial Intelligence is no longer a luxury. We help businesses integrate AI-driven solutions like chatbots, predictive analytics, and automated content generation to stay ahead of the competition.",
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
      { title: "AI Chatbots", slug: "ai-chatbots", description: "24/7 customer support.", content: "Intelligent chatbots that handle customer queries around the clock." },
      { title: "AI Business Systems", slug: "ai-business-systems", description: "Smart operations.", content: "Integrate AI into your core business systems for smarter decision making." },
      { title: "AI Data Analytics", slug: "ai-data-analytics", description: "Predictive insights.", content: "Turn your data into actionable insights with AI-powered analytics." },
      { title: "AI Strategy & Consulting", slug: "ai-strategy-consulting", description: "Navigate the AI era.", content: "Strategic guidance on how to leverage AI to achieve your specific business objectives." }
    ]
  }
};
