/* eslint-disable @typescript-eslint/no-explicit-any */
export const urlForImage = (source: any) => {
  const getUrl = () => {
    if (!source) return '';
    if (typeof source === 'string') return source;
    if (source.url) return source.url;
    if (source.asset && typeof source.asset === 'string') return source.asset;
    if (source.asset?._ref) {
      // Parse Sanity reference ID if any (e.g. image-tb85vf...-png)
      const ref = source.asset._ref;
      const parts = ref.split('-');
      if (parts.length >= 4) {
        const id = parts[1];
        const dimensions = parts[2];
        const format = parts[3];
        return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xwr2s2jf'}/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}/${id}-${dimensions}.${format}`;
      }
    }
    return '';
  };

  const urlString = getUrl();

  const builder = {
    width: (_w?: any) => builder,
    height: (_h?: any) => builder,
    quality: (_q?: any) => builder,
    url: () => urlString,
    toString: () => urlString
  };

  return builder;
};
