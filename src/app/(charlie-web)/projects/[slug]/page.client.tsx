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

export default function ProjectClient({ post }: ProjectProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <>
      <Navbar isNav={true} />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="pt-12 pb-12"
      >
        <div className="container mx-auto px-4">
          <motion.div className="max-w-4xl mx-auto text-center" variants={itemVariants}>
            <motion.div
              className="mb-6 inline-flex px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70"
              variants={itemVariants}
            >
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
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
              variants={itemVariants}
            >
              {post['Project Name']}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl mb-8 text-white/80 leading-relaxed max-w-3xl mx-auto"
              variants={itemVariants}
            >
              {post.Content.description}
            </motion.p>

            <motion.div className="flex justify-center gap-6 mb-10" variants={itemVariants}>
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
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-600/20 text-2xl text-gray-500 hover:bg-gray-600/30 hover:text-gray-400 hover:scale-105 transition-all duration-300"
                >
                  <FaGithub />
                </a>
              )}
              {post.Links?.Artstation && (
                <a
                  href={post.Links.Artstation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/20 text-2xl text-blue-500 hover:bg-blue-600/30 hover:text-blue-400 hover:scale-105 transition-all duration-300"
                >
                  <FaArtstation />
                </a>
              )}
            </motion.div>

            <motion.div
              className="rounded-2xl overflow-hidden shadow-xl shadow-black/40 backdrop-blur-sm border border-white/5 group"
              variants={itemVariants}
            >
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
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tech stack section */}
      <motion.section
        className="py-12 bg-black/30 backdrop-blur-sm border-y border-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
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
            ).map((tech: string, index: number) => (
              <motion.div
                key={tech}
                className="flex flex-col items-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
              >
                <div className="text-3xl text-white/60 group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-2">
                  {tech in iconMapping ? (
                    iconMapping[tech as keyof typeof iconMapping]
                  ) : (
                    <span>{tech}</span>
                  )}
                </div>
                <span className="text-xs text-white/50 group-hover:text-white/80 transition-all duration-300 capitalize">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Content Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-semibold mb-10 text-center text-white/90 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Project Overview
            </motion.h2>

            <motion.div
              className="prose prose-lg prose-invert mx-auto bg-black/20 backdrop-blur-sm p-8 rounded-2xl border border-white/5 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <RichText data={post.Content.Content} />
            </motion.div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Link
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
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  )
}
