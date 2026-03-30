export default {
  name: 'pillarPage',
  title: 'Pillar Page (Service Category)',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', title: 'Short Description', type: 'text' },
    { name: 'overview', title: 'Long Overview', type: 'array', of: [{ type: 'block' }] },
    { name: 'benefits', title: 'Benefits', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'process',
      title: 'Our Process',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', title: 'Step Name', type: 'string' },
            { name: 'detail', title: 'Detail', type: 'text' }
          ]
        }
      ]
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' }
          ]
        }
      ]
    },
    {
      name: 'clusters',
      title: 'Sub-Services (Topic Clusters)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'clusterPage' }] }]
    }
  ]
}
