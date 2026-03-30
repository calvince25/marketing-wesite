export default {
  name: 'project',
  title: 'Portfolio / Projects',
  type: 'document',
  fields: [
    { name: 'name', title: 'Project Name', type: 'string' },
    { name: 'client', title: 'Client Name', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'images', title: 'Project Images', type: 'array', of: [{ type: 'image' }] },
    { name: 'completionDate', title: 'Completion Date', type: 'date' },
    { name: 'technologies', title: 'Technologies Used', type: 'array', of: [{ type: 'string' }] },
    { name: 'link', title: 'Project Link', type: 'url' },
  ],
}
