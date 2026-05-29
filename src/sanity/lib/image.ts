/* eslint-disable @typescript-eslint/no-explicit-any */
import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '../env'

let builder: ReturnType<typeof createImageUrlBuilder> | null;
try {
  builder = createImageUrlBuilder({ projectId, dataset })
} catch {
  builder = null;
}

type ImageSource = string | { asset?: { _ref?: string }; url?: string } | null | undefined;

type ImageBuilder = {
  width: (w: number) => ImageBuilder;
  height: (h: number) => ImageBuilder;
  quality: (q: number) => ImageBuilder;
  auto: (a: string) => ImageBuilder;
  fit: (f: string) => ImageBuilder;
  url: () => string;
};

export const urlForImage = (source: ImageSource): ImageBuilder => {
  if (typeof source === 'string') {
    const stringBuilder: ImageBuilder = {
      width: () => stringBuilder,
      height: () => stringBuilder,
      quality: () => stringBuilder,
      auto: () => stringBuilder,
      fit: () => stringBuilder,
      url: () => source
    };
    return stringBuilder;
  }

  if (source && typeof source === 'object' && 'asset' in source && source.asset?._ref) {
    try {
      if (builder) {
        return builder.image(source as any).auto('format').fit('max') as unknown as ImageBuilder;
      }
    } catch {
      // fallback
    }
  }

  // General fallback for all non-sanity sources
  const fallbackUrl = (source as any)?.url || '';
  const fallbackBuilder: ImageBuilder = {
    width: () => fallbackBuilder,
    height: () => fallbackBuilder,
    quality: () => fallbackBuilder,
    auto: () => fallbackBuilder,
    fit: () => fallbackBuilder,
    url: () => fallbackUrl
  };
  return fallbackBuilder;
}
