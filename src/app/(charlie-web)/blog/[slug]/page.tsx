import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import './blog-styles.css'
import type { Blog } from '@/payload-types'

import PageClient from './page.client'

export const RichTextComponent = ({ data }: { data: SerializedEditorState }) => {
  return <RichText data={data} />
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'blog',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
      content: true,
    },
  })

  return posts.docs.map((post) => ({
    slug: post.title,
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
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <RichTextComponent data={post.content} />
        </div>
      </div>
    </article>
  )
}

const queryPostBySlug = cache(async ({ title }: { title: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blog',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      title: {
        equals: title,
      },
    },
  })

  return result.docs?.[0] || null
})
