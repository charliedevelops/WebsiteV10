'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/navbar'

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
      <div className="container mx-auto px-4">
        <div className="pt-12 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 tracking-tight">
              Blog
            </h2>
          </motion.div>

          <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1, // Stagger the animations
                }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="flex flex-col items-start gap-2 rounded-2xl p-6 sm:p-8 border border-white/5 bg-black/50 backdrop-blur-sm hover:border-white/20 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-200 ease-out">
                    <div className="flex flex-row justify-between w-full gap-2 text-sm text-white/60">
                      <p className="flex items-center gap-1.5">
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
                        {formattedDate[index]}
                      </p>
                      <p className="flex items-center gap-1.5">
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
                        {stats[index].text}
                      </p>
                    </div>

                    <h2 className="text-2xl font-semibold text-white tracking-tight mt-1">
                      {post.title}
                    </h2>

                    <p className="text-white/70 line-clamp-2">{post.description}</p>

                    <div className="mt-2 text-sm text-blue-400 flex items-center gap-1.5 font-medium">
                      Read more
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
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {posts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-black/30 backdrop-blur-sm w-full max-w-3xl mx-auto rounded-xl border border-white/5"
            >
              <h3 className="text-2xl font-semibold text-white/80">No blog posts yet</h3>
              <p className="text-white/60 mt-2">Check back later for new content</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
