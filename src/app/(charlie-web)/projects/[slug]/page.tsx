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
    <article className="min-h-screen bg-gradient-to-b mx-auto px-4 py-6">
      <Navbar isNav={true} />
      <section className="relative pt-4 pb-8">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-white">
              {post['Project Name']}
            </h1>
            <p className="text-base md:text-lg mb-4 text-white/80 leading-relaxed">
              {post.Content.description}
            </p>

            <div className="flex justify-center gap-6 mb-6">
              {post.Links?.YouTube && (
                <a
                  href={post.Links.YouTube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-white/80 hover:text-white hover:scale-105 transition-all duration-300"
                >
                  <FaYoutube />
                </a>
              )}
              {post.Links?.GitHub && (
                <a
                  href={post.Links.GitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-white/80 hover:text-white hover:scale-105 transition-all duration-300"
                >
                  <FaGithub />
                </a>
              )}
              {post.Links?.Artstation && (
                <a
                  href={post.Links.Artstation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-white/80 hover:text-white hover:scale-105 transition-all duration-300"
                >
                  <FaArtstation />
                </a>
              )}
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-white/10 hover:scale-[1.01] transition-all duration-500">
              <Image
                src={(typeof post['Header Image'] === 'object' && post['Header Image']?.url) || ''}
                alt="Project Image"
                width={1200}
                height={675}
                className="w-full object-cover transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack section with reduced spacing */}
      <section className="pt-6 pb-2">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-white/90">
            Technologies Used
          </h2>
          <div className="flex flex-wrap justify-center gap-5 mb-4 max-w-4xl mx-auto">
            {(Array.isArray(post['Tech stack']?.technologies)
              ? post['Tech stack'].technologies
              : []
            ).map((tech: keyof typeof iconMapping) => (
              <div
                key={tech}
                className="text-3xl text-white/70 hover:text-white/90 hover:scale-105 transition-all duration-300"
              >
                {iconMapping[tech] || <span>{tech}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section with better spacing and visual separation */}
      <section className="pt-4 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="border-t border-white/10 pt-6 mt-2"></div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center text-white/90">Project Overview</h2>
            <div className="prose prose-lg prose-invert mx-auto">
              <RichTextComponent data={post.Content.Content} />
            </div>
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
