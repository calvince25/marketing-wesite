import { type SchemaTypeDefinition } from 'sanity'

const adminUser: SchemaTypeDefinition = {
  name: 'adminUser',
  title: 'Admin User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'password',
      title: 'Password (Hashed)',
      type: 'string',
      hidden: true, // Hide from the studio to prevent accidental editing
    },
    {
      name: 'isAdmin',
      title: 'Is Admin',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'isApproved',
      title: 'Is Approved',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
}

export default adminUser
