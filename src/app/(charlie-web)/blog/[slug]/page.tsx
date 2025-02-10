export const revalidate = 60
import readingTime from 'reading-time'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { format } from 'date-fns'

import './blog-styles.css'

import Divider from '@/components/divider'
import Navbar from '@/components/navbar'

const RichTextComponent = ({ data }: { data: SerializedEditorState }) => {
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
      title: true,
      description: true,
      content_html: true,
      publishedAt: true,
    },
  })

  return posts.docs.map((post) => ({
    slug: post.slug,
  }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ title: slug })
  const stats = readingTime(post.content_html || '')
  const formattedDate = post.publishedAt ? format(new Date(post.publishedAt), 'MMMM dd, yyyy') : ''

  if (!post) {
    notFound()
  }

  return (
    <div
      id="blog"
      className="flex flex-col items-center gap-4 container mx-auto px-4 py-8 min-h-screen"
    >
      <Navbar isNav={true} />
      <article className="w-full max-w-4xl rounded-lg shadow-lg text-white flex flex-col gap-4">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          {post.title}
        </h1>
        <p className="text-sm sm:text-base text-gray-300 mt-2">{post.description}</p>

        <div className="flex sm:flex-row items-center justify-start gap-4 text-gray-400 ">
          <div className="flex items-center">
            <p>{formattedDate}</p>
          </div>
          <div className="flex items-center">
            <p className="text-lg">{Math.ceil(stats.minutes)} min read</p>
          </div>
        </div>

        <Divider className="mx-auto" />
        <div className="p-4 sm:px-8">
          <div className=" prose prose-sm sm:prose-base md:prose-lg prose-invert leading-relaxed">
            <RichTextComponent data={post.content} />
          </div>
        </div>
      </article>
    </div>
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
      slug: {
        equals: title,
      },
    },
  })

  return result.docs?.[0] || null
})
