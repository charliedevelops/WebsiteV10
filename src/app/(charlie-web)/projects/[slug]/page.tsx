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
    <article className="min-h-screen bg-gradient-to-b from-[#0A090C] to-black text-white">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.1),transparent_70%)] z-0"></div>

      <div className="relative z-10">
        <Navbar isNav={true} />

        <section className="pt-8 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6 inline-flex px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70">
                {post.tags?.tags?.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className={`text-sm ${
                      tag.toLowerCase() === 'dev'
                        ? 'text-[#4BC0FF]'
                        : tag.toLowerCase() === 'fx'
                          ? 'text-[#FF2800]'
                          : 'text-white/80'
                    }`}
                  >
                    {tag}
                    {index < (post.tags?.tags?.length || 0) - 1 ? ' · ' : ''}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                {post['Project Name']}
              </h1>

              <p className="text-lg md:text-xl mb-8 text-white/80 leading-relaxed max-w-3xl mx-auto">
                {post.Content.description}
              </p>

              <div className="flex justify-center gap-6 mb-10">
                {post.Links?.YouTube && (
                  <a
                    href={post.Links.YouTube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600/20 text-2xl text-red-500 hover:bg-red-600/30 hover:text-red-400 hover:scale-105 transition-all duration-300"
                  >
                    <FaYoutube />
                  </a>
                )}
                {post.Links?.GitHub && (
                  <a
                    href={post.Links.GitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700/20 text-2xl text-white/80 hover:bg-gray-700/30 hover:text-white hover:scale-105 transition-all duration-300"
                  >
                    <FaGithub />
                  </a>
                )}
                {post.Links?.Artstation && (
                  <a
                    href={post.Links.Artstation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/20 text-2xl text-blue-400 hover:bg-blue-600/30 hover:text-blue-300 hover:scale-105 transition-all duration-300"
                  >
                    <FaArtstation />
                  </a>
                )}
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl shadow-black/40 backdrop-blur-sm border border-white/5 group">
                <div className="relative">
                  <Image
                    src={
                      (typeof post['Header Image'] === 'object' && post['Header Image']?.url) || ''
                    }
                    alt="Project Image"
                    width={1200}
                    height={675}
                    className="w-full object-cover transition-all duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech stack section */}
        <section className="py-12 bg-black/30 backdrop-blur-sm border-y border-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-white/90 flex items-center justify-center gap-2">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/30"></span>
              Technologies Used
              <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/30"></span>
            </h2>
            <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
              {(Array.isArray(post['Tech stack']?.technologies)
                ? post['Tech stack'].technologies
                : []
              ).map((tech: keyof typeof iconMapping) => (
                <div key={tech} className="flex flex-col items-center group">
                  <div className="text-3xl text-white/60 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-2">
                    {iconMapping[tech] || <span>{tech}</span>}
                  </div>
                  <span className="text-xs text-white/50 group-hover:text-white/80 transition-all duration-300 capitalize">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center text-white/90 relative">
                Project Overview
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#4BC0FF] to-transparent rounded-full"></span>
              </h2>

              <div className="prose prose-lg prose-invert mx-auto bg-black/20 backdrop-blur-sm p-8 rounded-2xl border border-white/5 shadow-lg">
                <RichTextComponent data={post.Content.Content} />
              </div>

              <div className="mt-12 text-center">
                <a
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white hover:border-white/30 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-200 ease-out"
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
                  Back to Projects
                </a>
              </div>
            </div>
          </div>
        </section>
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
