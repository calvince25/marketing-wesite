import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "AI Integration Services Kenya | Chatbots & Business Systems",
  description: "Implement practical AI integrations, chatbots, analytics, and business systems that reduce manual work and improve customer response times.",
  alternates: { canonical: '/services/ai-systems-integration' },
};

export default function Page() {
  const service = pillarServices["ai-systems-integration"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
