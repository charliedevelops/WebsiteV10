import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import ProjectClient from './page.client'
import '../../blog/[slug]/blog-styles.css'

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
      'Tech stack': true,
      tags: true,
      Links: true,
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
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ title: slug })

  if (!post) {
    notFound()
  }

  // Transform post data to properly match ProjectType interface
  const transformedPost = {
    'Project Name': post['Project Name'] || '',
    'Header Image': post['Header Image']
      ? {
          url:
            typeof post['Header Image'] === 'object' && 'url' in post['Header Image']
              ? post['Header Image'].url || ''
              : '',
        }
      : undefined,
    Content: {
      description: post.Content?.description || '',
      Content: post.Content?.Content || {},
    },
    tags: {
      tags: Array.isArray(post.tags?.tags) ? post.tags.tags : [],
    },
    Links: {
      GitHub: post.Links?.GitHub || undefined,
      YouTube: post.Links?.YouTube || undefined,
    },
    'Tech stack': {
      technologies: Array.isArray(post['Tech stack']?.technologies)
        ? post['Tech stack'].technologies
        : [],
    },
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-[#0A090C] to-black text-white">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.1),transparent_70%)] z-0"></div>

      <div className="relative z-10">
        <ProjectClient post={transformedPost} />
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
      slug: {
        equals: title,
      },
    },
  })

  return result.docs?.[0] || null
})
