import type { Metadata } from 'next';
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME } from './site';

type PageMetadataOptions = {
  title: string;
  description: string;
  pathname: string;
  type?: 'website' | 'article';
  image?: string;
  noindex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  pathname,
  type = 'website',
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(pathname);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_KE',
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
