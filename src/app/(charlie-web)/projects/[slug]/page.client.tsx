'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import RichText from '@/components/RichText'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Link from 'next/link'
import Navbar from '@/components/navbar'
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

interface ProjectType {
  'Project Name': string
  'Header Image'?: { url: string }
  Content: {
    description: string
    Content: SerializedEditorState
  }
  tags?: {
    tags: string[]
  }
  Links?: {
    YouTube?: string
    GitHub?: string
    Artstation?: string
  }
  'Tech stack'?: {
    technologies: string[]
  }
}

interface ProjectProps {
  post: ProjectType
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

const linkIcons = [
  { key: 'YouTube' as const, icon: <FaYoutube />, label: 'YouTube' },
  { key: 'GitHub' as const, icon: <FaGithub />, label: 'GitHub' },
  { key: 'Artstation' as const, icon: <FaArtstation />, label: 'Artstation' },
]

export default function ProjectClient({ post }: ProjectProps) {
  const technologies = Array.isArray(post['Tech stack']?.technologies)
    ? post['Tech stack'].technologies
    : []

  const hasLinks = post.Links && Object.values(post.Links).some(Boolean)

  return (
    <>
      <Navbar isNav={true} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-16"
      >
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors duration-200 mb-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Projects
          </Link>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.035em] text-white leading-[1.1] mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {post['Project Name']}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg text-white/80 leading-relaxed tracking-[-0.006em] mb-6 max-w-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {post.Content.description}
        </motion.p>

        {/* Links + Tech inline row */}
        {(hasLinks || technologies.length > 0) && (
          <motion.div
            className="flex flex-wrap items-center gap-5 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {hasLinks && (
              <div className="flex items-center gap-3">
                {linkIcons.map(({ key, icon, label }) =>
                  post.Links?.[key] ? (
                    <a
                      key={key}
                      href={post.Links[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-white/30 hover:text-white transition-colors duration-200"
                      title={label}
                    >
                      {icon}
                    </a>
                  ) : null,
                )}
              </div>
            )}

            {hasLinks && technologies.length > 0 && (
              <div className="w-px h-4 bg-white/10" />
            )}

            {technologies.length > 0 && (
              <div className="flex items-center gap-3">
                {technologies.map((tech: string) => (
                  <div
                    key={tech}
                    className="text-lg text-white/20 hover:text-white/60 transition-colors duration-200"
                    title={tech}
                  >
                    {tech in iconMapping ? (
                      iconMapping[tech as keyof typeof iconMapping]
                    ) : (
                      <span className="text-xs">{tech}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Header image */}
        {post['Header Image']?.url && (
          <motion.div
            className="rounded-xl overflow-hidden border border-white/5 mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Image
              src={post['Header Image'].url}
              alt={post['Project Name']}
              width={1200}
              height={675}
              className="w-full object-cover"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          className="blog-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <RichText data={post.Content.Content} enableProse={false} enableGutter={false} />
        </motion.div>
      </motion.div>
    </>
  )
}
