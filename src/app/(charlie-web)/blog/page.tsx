import configPromise from '@payload-config'
import { getPayload } from 'payload'
import readingTime from 'reading-time'
import { format } from 'date-fns'
import BlogPageClient from './page.client'
import { Suspense } from 'react'

const fetchBlogPosts = async () => {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'blog',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
      content: true,
      title: true,
      description: true,
      content_html: true,
      publishedAt: true,
    },
  })
  return posts.docs.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    content_html: post.content_html ?? undefined,
    publishedAt: post.publishedAt ?? undefined,
  }))
}

const BlogPage = async () => {
  const posts = await fetchBlogPosts()
  const stats = posts.map((post) => readingTime(post.content_html || ''))
  const formattedDate = posts.map((post) =>
    post.publishedAt ? format(new Date(post.publishedAt), 'MMMM dd, yyyy') : '',
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A090C] to-black text-white">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.1),transparent_70%)] z-0"></div>

      <div className="relative z-10">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }>
          <BlogPageClient posts={posts} stats={stats} formattedDate={formattedDate} />
        </Suspense>
      </div>
    </div>
  )
}

export default BlogPage
