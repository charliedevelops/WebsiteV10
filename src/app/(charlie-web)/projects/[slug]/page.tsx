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

      <section className="hero bg-gray-800 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">{post['Project Name']}</h1>
          <p className="text-xl mb-8">{post.description}</p>
          <Image
            src={(typeof post.image === 'object' && post.image?.url) || ''}
            alt="Project Image"
            width={800}
            height={450}
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="project-overview py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Project Overview</h2>
          <div className="prose lg:prose-xl mx-auto">
            <RichTextComponent data={post.Content} />
          </div>
        </div>
      </section>

      <section className="project-features py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
          <ul className="list-disc list-inside">
            {post.features?.map((feature, index) => (
              <li key={index} className="text-lg mb-4">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="call-to-action py-16 bg-gray-800 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">Interested in this project?</h2>
          <p className="text-xl mb-8">Contact us to learn more or start a similar project.</p>
          <a href="/contact" className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg">
            Contact Us
          </a>
        </div>
      </section>
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
