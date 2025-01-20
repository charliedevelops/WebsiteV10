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
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === 'create' || operation === 'update') {
              // If the slug is empty, generate one from the title
              if (!data?.slug && data?.title) {
                data.slug = data.title
                  .toLowerCase()
                  .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
                  .replace(/\s+/g, '-') // Replace spaces with hyphens
                  .replace(/-+/g, '-') // Replace multiple hyphens with a single one
              }
            }
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
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
