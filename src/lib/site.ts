export const SITE_URL = 'https://www.growthlab.co.ke';
export const SITE_NAME = 'GrowthLab Limited';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.png`;
export const FALLBACK_CONTACT_EMAIL = 'hello@growthlab.co.ke';

export function absoluteUrl(pathname: string = '/') {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SITE_URL}${normalized === '/' ? '' : normalized}`;
}
