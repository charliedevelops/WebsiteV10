import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import RichText from '@/components/RichText'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { Blog } from '@/payload-types'

import PageClient from './page.client'

export const RichTextComponent = ({ data }: { data: SerializedEditorState }) => {
  return <RichText data={data} />
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      'Project Name': true,
      Content: true,
    },
  })

  return posts.docs.map((post) => ({
    slug: post['Project Name'],
  }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ title: slug })

  if (!post) {
    notFound()
  }

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="prose">
          <Image
            src={(typeof post.image === 'object' && post.image?.url) || ''}
            alt="alt"
            width={500}
            height={500}
          />

          <h1 className="text-4xl font-bold mb-4 text-white">{post['Project Name']}</h1>

          <RichTextComponent data={post.Content} />
        </div>
      </div>
    </article>
  )
}

const queryPostBySlug = cache(async ({ title }: { title: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      'Project Name': {
        equals: title,
      },
    },
  })

  return result.docs?.[0] || null
})
