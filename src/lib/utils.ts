/**
 * Sanitize a slug by removing characters that often cause indexing issues or 404s,
 * such as $ and &.
 */
export function sanitizeSlug(slug: string): string {
  if (!slug) return '';
  // Remove $ and & literals
  return slug.replace(/[\$&]/g, '');
}

/**
 * Ensures a path is clean for navigation.
 */
export function cleanPath(path: string): string {
  if (!path) return '/';
  // Remove any trailing $ or & that might be causing 404s
  return path.replace(/\/[\$&]+$/, '').replace(/\/[\$&]+\//, '/');
}
