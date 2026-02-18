'use client'
import { motion } from 'framer-motion'
import React from 'react'
import Navbar from '@/components/navbar'
import RichText from '@/components/RichText'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Link from 'next/link'

interface PostProps {
  post: {
    title: string
    description: string
    content: SerializedEditorState
  }
  stats: {
    minutes: number
  }
  formattedDate: string
}

export default function BlogPostClient({ post, stats, formattedDate }: PostProps) {
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
        className="container mx-auto px-4 pt-12 pb-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.article className="w-full max-w-4xl mx-auto" variants={itemVariants}>
          <motion.div className="mb-12 text-center" variants={itemVariants}>
            <motion.div
              className="inline-flex px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 mb-4"
              variants={itemVariants}
            >
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
            </motion.div>

            <motion.h1
              className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
              variants={itemVariants}
            >
              {post.title}
            </motion.h1>

            <motion.p
              className="mt-4 text-lg text-white/70 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              {post.description}
            </motion.p>
          </motion.div>

          <motion.div
            className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/5 shadow-lg p-5 sm:p-8"
            variants={itemVariants}
          >
            <div className="max-w-none blog-content">
              <RichText data={post.content} enableProse={false} enableGutter={false} />
            </div>
          </motion.div>

          <motion.div className="mt-10 text-center" variants={itemVariants}>
            <Link
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
            </Link>
          </motion.div>
        </motion.article>
      </motion.div>
    </>
  )
}
