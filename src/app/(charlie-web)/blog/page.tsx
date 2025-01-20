import { CollectionAfterChangeHook } from 'payload'
import payload from 'payload'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
const readingTime = require('reading-time')
import { format } from 'date-fns'
import Navbar from '@/components/navbar'
import Link from 'next/link'
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
    content_html: post.content_html,
    publishedAt: post.publishedAt,
  }))
}

const BlogPage = async () => {
  const posts = await fetchBlogPosts()
  const stats = posts.map((post) => readingTime(post.content_html || ''))
  const formattedDate = posts.map((post) =>
    post.publishedAt ? format(new Date(post.publishedAt), 'MMMM dd, yyyy') : '',
  )

  return (
    <div id="blog" className="flex flex-col items-center gap-4 pt-8">
      <Navbar />
      <div className="p-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white/80">
          Blog
        </h2>
      </div>
      <div className=" flex flex-col gap-4 w-1/3 justify-center cursor-pointer">
        {posts.map((post, index) => (
          <Link href={`/blog/${post.slug}`} key={post.slug}>
            <div className="flex flex-col items-start gap-2   rounded-2xl p-8 text-wrap hover:bg-black/40 transition-all duration-300 ease-in-out">
              <div className="flex flex-row justify-between gap-2">
                <p>{formattedDate[index]}</p>
                <p className="text-white/80">{stats[index].text} </p>
              </div>
              <h2 key={post.title} className="text-2xl font-medium text-white/80">
                {post.title}
              </h2>
              <p className="text-wrap text-white/80 ">{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BlogPage
