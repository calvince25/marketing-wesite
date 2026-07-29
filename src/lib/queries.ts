export const siteSettingsQuery = '*[_type == "siteSettings"][0]'
export const heroImageQuery = '*[_type == "heroImage" && page == $page][0]'
export const allServicesQuery = '*[_type == "service"] | order(name asc)'
export const serviceBySlugQuery = '*[_type == "service" && slug.current == $slug][0]'
export const allPostsQuery = '*[_type == "post"] | order(publishedAt desc) { ..., categories[]->, author-> }'
export const postBySlugQuery = '*[_type == "post" && slug.current == $slug][0] { ..., categories[]->, author-> }'
export const allProjectsQuery = '*[_type == "project"] | order(completionDate desc)'
export const pageContentQuery = '*[_type == "pageContent" && page == $page][0]'
export const allFaqsQuery = '*[_type == "faq"] | order(displayOrder asc)'

export const pillarBySlugQuery = '*[_type == "pillarPage" && slug.current == $slug][0] { ..., clusters[]-> }'

export const clusterBySlugQuery = '*[_type == "clusterPage" && slug.current == $slug][0] { ..., parentPillar-> }'

export const allPostsByCategoryQuery = '*[_type == "post" && references(*[_type == "category" && slug.current == $category][0]._id)] | order(publishedAt desc) { ..., categories[]->, author-> }'
