import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Social Media Management Kenya | Content & Community",
  description: "Manage social content, publishing, community responses, and campaign measurement for Kenyan brands.",
  alternates: { canonical: '/services/social-media-management/social-media-management' },
};

export default function Page() {
  const pillar = pillarServices["social-media-management"];
  const subService = pillar?.clusters.find(c => c.slug === "social-media-management");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
