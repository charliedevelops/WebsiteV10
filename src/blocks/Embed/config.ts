import type { Block } from 'payload'

export const iFrameBlock: Block = {
  slug: 'iFrameBlock',
  interfaceName: 'iFrameBlock',
  fields: [
    {
      name: 'iFrame',
      type: 'text',
      required: true,
    },
  ],
}
