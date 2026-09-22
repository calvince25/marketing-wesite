import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Technical SEO Audit Services Kenya | Crawlability & Core Web Vitals",
  description: "Find and fix crawlability, indexation, Core Web Vitals, schema, and JavaScript issues with an engineering-led technical SEO audit in Kenya.",
  alternates: { canonical: '/services/seo-digital-marketing/technical-seo-audit' },
};

export default function Page() {
  const pillar = pillarServices["seo-digital-marketing"];
  const subService = pillar?.clusters.find(c => c.slug === "technical-seo-audit");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar} subService={subService} />;
}
