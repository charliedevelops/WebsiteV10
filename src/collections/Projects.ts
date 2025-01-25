import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  HTMLConverterFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Banner } from '@/blocks/Banner/config'
import { Code } from '@/blocks/Code/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { iFrameBlock } from '@/blocks/Embed/config'
import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'Header Image',
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
              if (!data?.slug && data?.['Project Name']) {
                data.slug = data['Project Name']
                  .toLowerCase()
                  .replace(/[^a-z0-9\s-]/g, '')
                  .replace(/\s+/g, '-')
                  .replace(/-+/g, '-')
              }
            }
          },
        ],
      },
    },

    {
      type: 'tabs',
      tabs: [
        {
          name: 'Content',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'Content',
              type: 'richText',
              required: true,
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
            },
          ],
        },
        {
          name: 'Links',
          fields: [
            {
              name: 'YouTube',
              type: 'text',
              label: 'Youtube video link',
              required: false,
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'GitHub',
              type: 'text',
              label: 'GitHub link',
              required: false,
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'Artstation',
              type: 'text',
              label: 'Artstation link',
              required: false,
              admin: {
                position: 'sidebar',
              },
            },
          ],
        },
        {
          name: 'Tech stack',
          fields: [
            {
              name: 'technologies',
              type: 'select',
              options: [
                //web
                { label: 'React', value: 'react' },
                { label: 'Next.js', value: 'next' },
                { label: 'TailwindCSS', value: 'tailwind' },
                { label: 'Typescript', value: 'typescript' },

                //vfx and 3d
                { label: 'Houdini', value: 'houdini' },
                { label: 'Blender', value: 'blender' },
                { label: 'fusion', value: 'fusion' },
                { label: 'Substance Painter', value: 'substance' },
                { label: 'Unreal Engine', value: 'unreal' },
                { label: 'Unity', value: 'unity' },
                { label: 'EmberGen', value: 'embergen' },

                //design e6c
                { label: 'Figma', value: 'figma' },
                { label: 'Photoshop', value: 'photoshop' },
                { label: 'Illustrator', value: 'illustrator' },
                { label: 'After Effects', value: 'aftereffects' },
                { label: 'Premiere Pro', value: 'premierepro' },
                { label: 'Davinci', value: 'davinciresolve' },
              ],
              hasMany: true,
            },
          ],
        },
        {
          name: 'tags',
          fields: [
            {
              name: 'tags',
              type: 'select',
              options: [
                { label: 'FX', value: 'fx' },
                { label: 'Dev', value: 'dev' },
                { label: 'Design', value: 'design' },
              ],
              hasMany: true,
            },
          ],
        },
      ],
    },
  ],
}
