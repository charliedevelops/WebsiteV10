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
    <div className="min-h-screen bg-gradient-to-b from-[#0A090C] to-black text-white">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.1),transparent_70%)] z-0"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Navbar isNav={true} />

        <article className="w-full max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-flex px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 mb-4">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-70"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
                {formattedDate}
              </div>
              <span className="mx-2">•</span>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-70"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {Math.ceil(stats.minutes)} min read
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {post.title}
            </h1>

            <p className="mt-4 text-lg text-white/70 max-w-3xl mx-auto">{post.description}</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/5 shadow-lg p-6 sm:p-10">
            <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none leading-relaxed">
              <RichTextComponent data={post.content} />
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white hover:border-white/30 hover:shadow-lg transition-all duration-200 ease-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </a>
          </div>
        </article>
      </div>
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
