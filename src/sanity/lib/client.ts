import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
})

/**
 * Reusable fetcher for Server Components with built-in Next.js caching.
 * Ensures the website doesn't wait on slow database queries for every hit.
 */
export async function sanityFetch<QueryResponse = any>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string
  params?: any
  revalidate?: number | false
  tags?: string[]
}) {
  return client.fetch<QueryResponse>(query, params, {
    next: { revalidate, tags },
  })
}
