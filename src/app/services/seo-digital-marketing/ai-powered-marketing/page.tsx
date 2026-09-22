import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "AI-Powered Marketing Kenya | Data-Driven Growth",
  description: "Use practical AI, audience analysis, personalisation, and marketing automation to improve campaign decisions and conversion opportunities in Kenya.",
  alternates: { canonical: '/services/seo-digital-marketing/ai-powered-marketing' },
};

export default function Page() {
  const pillar = pillarServices["seo-digital-marketing"];
  const subService = pillar?.clusters.find(c => c.slug === "ai-powered-marketing");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
