import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Local SEO Nairobi | Google Business Profile Optimisation",
  description: "Improve your Google Business Profile, local rankings, calls, directions, and enquiries with local SEO for Nairobi businesses.",
  alternates: { canonical: '/services/seo-digital-marketing/local-seo-nairobi' },
};

export default function Page() {
  const pillar = pillarServices["seo-digital-marketing"];
  const subService = pillar?.clusters.find(c => c.slug === "local-seo-nairobi");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar} subService={subService} />;
}
