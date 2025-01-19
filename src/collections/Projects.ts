import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'Project Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'Content',
      type: 'richText',
      required: true,
    },
    {
      name: 'Video Link',
      type: 'text',
      required: false,
    },
    {
      name: 'tags',
      type: 'select',
      options: [
        { label: 'Web Development', value: 'web-development' },
        { label: 'Mobile Development', value: 'mobile-development' },
        { label: 'Design', value: 'design' },
        { label: 'Marketing', value: 'marketing' },
      ],
      hasMany: true,
    },
  ],
}
