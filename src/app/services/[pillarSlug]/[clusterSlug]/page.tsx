import { notFound } from "next/navigation";
import { client } from "@/lib/client";
import { clusterBySlugQuery, pillarBySlugQuery } from "@/lib/queries";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { pillarServices } from "@/lib/services";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  const params: { pillarSlug: string; clusterSlug: string }[] = [];
  
  // 1. Static Registry
  for (const [pSlug, pillar] of Object.entries(pillarServices)) {
    for (const cluster of pillar.clusters) {
      params.push({
        pillarSlug: pSlug,
        clusterSlug: cluster.slug,
      });
    }
  }
  
  const sanityClusters = await client.fetch('*[_type == "clusterPage"]{ "pillarSlug": parentPillar->slug.current, "clusterSlug": slug.current }').catch(() => []);
  
  // Ensure we only process parameters that have valid non-empty string slugs
  const allParams = [...params, ...sanityClusters].filter(
    p => p && 
         typeof p.pillarSlug === 'string' && p.pillarSlug.trim() !== '' &&
         typeof p.clusterSlug === 'string' && p.clusterSlug.trim() !== ''
  );
  
  return allParams;
}

interface ClusterPageProps {
  params: Promise<{ pillarSlug: string; clusterSlug: string }>;
}

export async function generateMetadata({ params }: ClusterPageProps): Promise<Metadata> {
  const { pillarSlug, clusterSlug } = await params;
  const cluster = await client.fetch(clusterBySlugQuery, { slug: clusterSlug }).catch(() => null);
  
  // Find static fallback if any
  let staticCluster = null;
  for (const p of Object.values(pillarServices)) {
     const found = p.clusters.find(c => c.slug === clusterSlug);
     if (found) { staticCluster = found; break; }
  }

  const current = cluster || staticCluster;
  if (!current) return {};

  const title = current.title || 'Sub-Service';
  const description = current.description || '';
  const url = `https://growthlab.co.ke/services/${pillarSlug}/${clusterSlug}`;

  return {
    title: `${title} | GrowthLab`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=630&q=80',
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}

export default async function ClusterPage({ params }: ClusterPageProps) {
  const { pillarSlug, clusterSlug } = await params;

  // 1. Fetch Cluster from Sanity
  const cluster = await client.fetch(clusterBySlugQuery, { slug: clusterSlug }).catch(() => null);
  
  // 2. Fetch Pillar (either from Sanity or static)
  const sanityPillar = await client.fetch(pillarBySlugQuery, { slug: pillarSlug }).catch(() => null);
  const staticPillar = pillarServices[pillarSlug];

  if (!cluster && !staticPillar?.clusters.find(c => c.slug === clusterSlug)) {
    notFound();
  }

  const pillarData = sanityPillar ? {
    title: sanityPillar.title,
    slug: sanityPillar.slug.current,
    clusters: (sanityPillar.clusters || []).map((c: any) => ({
      title: c.title,
      slug: c.slug.current,
      description: c.description
    }))
  } : staticPillar;

  const clusterData = cluster ? {
    title: cluster.title,
    slug: cluster.slug.current,
    description: cluster.description,
    content: cluster.content,
    isSanity: true
  } : staticPillar.clusters.find(c => c.slug === clusterSlug);

  return <SubServiceTemplate pillar={pillarData as any} subService={clusterData as any} />;
}
