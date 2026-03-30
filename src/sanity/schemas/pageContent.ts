export default {
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    { name: 'page', title: 'Page Name', type: 'string', options: { list: ['Home', 'About', 'Services', 'Contact'] } },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            { name: 'title', title: 'Section Title', type: 'string' },
            { name: 'content', title: 'Content', type: 'blockContent' },
          ],
        },
      ],
    },
  ],
}
