export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'Website Logo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    },
    {
      name: 'heroImages',
      title: 'Homepage Hero Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'brandColors',
      title: 'Brand Colors',
      type: 'object',
      fields: [
        { name: 'primary', title: 'Primary Color', type: 'string' },
        { name: 'secondary', title: 'Secondary Color', type: 'string' },
      ],
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'email', title: 'Email Address', type: 'string' },
        { name: 'phone', title: 'Phone Number', type: 'string' },
        { name: 'whatsapp', title: 'WhatsApp Number', type: 'string' },
        { name: 'address', title: 'Office Location', type: 'text' },
      ],
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    },
    {
      name: 'seo',
      title: 'Global SEO Settings',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Default Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Default Meta Description', type: 'text' },
        { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] },
        { name: 'ogImage', title: 'OpenGraph Image', type: 'image' },
      ],
    },
  ],
}
