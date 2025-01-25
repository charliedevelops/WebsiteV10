import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import RichText from '@/components/RichText'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { FaReact, FaYoutube, FaGithub, FaArtstation } from 'react-icons/fa'
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiHoudini,
  SiBlender,
  SiUnrealengine,
  SiUnity,
  SiFigma,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobepremierepro,
} from 'react-icons/si'
import Navbar from '@/components/navbar'

const RichTextComponent = ({ data }: { data: SerializedEditorState }) => {
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

const iconMapping = {
  react: <FaReact />,
  next: <SiNextdotjs />,
  tailwind: <SiTailwindcss />,
  typescript: <SiTypescript />,
  houdini: <SiHoudini />,
  blender: <SiBlender />,
  unreal: <SiUnrealengine />,
  unity: <SiUnity />,
  figma: <SiFigma />,
  photoshop: <SiAdobephotoshop />,
  illustrator: <SiAdobeillustrator />,
  aftereffects: <SiAdobepremierepro />,
  premierepro: <SiAdobepremierepro />,
  fusion: <SiAdobepremierepro />,
  substance: <SiAdobepremierepro />,
  embergen: <SiAdobepremierepro />,
  davinciresolve: <SiAdobepremierepro />,
}

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ title: slug })

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-gradient-to-b  mx-auto px-4 py-8">
      <Navbar isNav={true} />
      <section className="relative pt-10 pb-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6 tracking-tight  text-white  ">
              {post['Project Name']}
            </h1>
            <p className="text-xl mb-10 text-gray-300 leading-relaxed">
              {post.Content.description}
            </p>

            <div className="flex justify-center gap-8 mb-10">
              {post.Links?.YouTube && (
                <a
                  href={post.Links.YouTube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl hover:text-red-500 transition-all duration-300 hover:scale-110"
                >
                  <FaYoutube />
                </a>
              )}
              {post.Links?.GitHub && (
                <a
                  href={post.Links.GitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl hover:text-gray-400 transition-all duration-300 hover:scale-110"
                >
                  <FaGithub />
                </a>
              )}
              {post.Links?.Artstation && (
                <a
                  href={post.Links.Artstation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl hover:text-blue-400 transition-all duration-300 hover:scale-110"
                >
                  <FaArtstation />
                </a>
              )}
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 hover:scale-105  transition-all duration-500">
              <Image
                src={(typeof post['Header Image'] === 'object' && post['Header Image']?.url) || ''}
                alt="Project Image"
                width={1200}
                height={675}
                className="w-full object-cover  transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 ">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r text-white [-webkit-background-clip:text]">
            Technologies Used
          </h2>
          <div className="flex flex-wrap justify-center gap-8 mb-8 max-w-4xl mx-auto">
            {(Array.isArray(post['Tech stack']?.technologies)
              ? post['Tech stack'].technologies
              : []
            ).map((tech: keyof typeof iconMapping) => (
              <div
                key={tech}
                className="text-5xl hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                {iconMapping[tech] || <span>{tech}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold mb-12 text-center text-white">Project Overview</h2>
          <div className="prose prose-lg prose-invert mx-auto max-w-4xl">
            <RichTextComponent data={post.Content.Content} />
          </div>
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
