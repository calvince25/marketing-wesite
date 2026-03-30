export default {
  name: 'clusterPage',
  title: 'Cluster Page (Sub-Service)',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', title: 'Short Description', type: 'text' },
    { name: 'content', title: 'Content (Rich Text)', type: 'array', of: [{ type: 'block' }] },
    { name: 'parentPillar', title: 'Parent Pillar', type: 'reference', to: [{ type: 'pillarPage' }] }
  ]
}
