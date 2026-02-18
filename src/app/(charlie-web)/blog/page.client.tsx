'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import StaggeredText from '@/components/react-bits/staggered-text'

interface BlogPost {
  slug: string
  title: string
  description: string
  content_html?: string
  publishedAt?: string
}

interface BlogPageClientProps {
  posts: BlogPost[]
  stats: { text: string }[]
  formattedDate: string[]
}

export default function BlogPageClient({ posts, stats, formattedDate }: BlogPageClientProps) {
  return (
    <>
      <Navbar isNav={true} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pt-8 pb-6"
        >
          <StaggeredText
            text="Blog"
            as="h1"
            className="text-3xl sm:text-4xl font-bold tracking-[-0.035em] text-white"
            segmentBy="chars"
            delay={60}
            duration={0.5}
            direction="top"
            blur={true}
          />
        </motion.div>

        <div className="flex flex-col gap-3 max-w-3xl pb-12">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex flex-col gap-1.5 rounded-xl p-5 card-surface hover:border-white/10 transition-all duration-200 ease-out">
                  <div className="flex items-center gap-3 text-[13px] text-white/40">
                    <span>{formattedDate[index]}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{stats[index].text}</span>
                  </div>

                  <h2 className="text-lg font-semibold text-white/90 tracking-[-0.02em] group-hover:text-white transition-colors duration-200">
                    {post.title}
                  </h2>

                  <p className="text-sm text-white/50 line-clamp-1">
                    {post.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20"
          >
            <p className="text-white/40 text-lg">No blog posts yet</p>
          </motion.div>
        )}
      </div>
    </>
  )
}
