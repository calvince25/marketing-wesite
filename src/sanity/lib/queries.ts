import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`
export const allServicesQuery = groq`*[_type == "service"] | order(name asc)`
export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]`
export const allPostsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  ...,
  categories[]->,
  author->
}`
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  ...,
  categories[]->,
  author->
}`
export const allProjectsQuery = groq`*[_type == "project"] | order(completionDate desc)`
export const pageContentQuery = groq`*[_type == "pageContent" && page == $page][0]`

export const pillarBySlugQuery = groq`*[_type == "pillarPage" && slug.current == $slug][0] {
  ...,
  clusters[]->
}`

export const clusterBySlugQuery = groq`*[_type == "clusterPage" && slug.current == $slug][0] {
  ...,
  parentPillar->
}`

export const allPostsByCategoryQuery = groq`*[_type == "post" && references(*[_type == "category" && slug.current == $category][0]._id)] | order(publishedAt desc) {
  ...,
  categories[]->,
  author->
}`
