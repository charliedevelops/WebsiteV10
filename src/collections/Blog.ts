import { Banner } from '@/blocks/Banner/config'
import { Code } from '@/blocks/Code/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { iFrameBlock } from '@/blocks/Embed/config'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  HTMLConverterFeature,
  InlineToolbarFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

        try {
          // Revalidate the specific blog post page
          await fetch(
            `${siteUrl}/api/revalidate?path=/blog/${doc.slug}&secret=${process.env.REVALIDATION_SECRET}`,
          )

          // Also revalidate the blog list page
          await fetch(
            `${siteUrl}/api/revalidate?path=/blog&secret=${process.env.REVALIDATION_SECRET}`,
          )

          console.log(`Revalidated blog post: ${doc.slug}`)
        } catch (error) {
          console.error('Error revalidating blog post:', error)
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

        try {
          // Revalidate the blog list page after deletion
          await fetch(
            `${siteUrl}/api/revalidate?path=/blog&secret=${process.env.REVALIDATION_SECRET}`,
          )

          console.log(`Revalidated blog list after deleting: ${doc.slug}`)
        } catch (error) {
          console.error('Error revalidating after delete:', error)
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
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
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock, iFrameBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                    HTMLConverterFeature({}),
                  ]
                },
              }),

              label: false,
              required: true,
            },
            lexicalHTML('content', { name: 'content_html' }),
          ],
          label: 'Content',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        className: 'blog-content',
        position: 'sidebar',
      },

      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
  ],
}
