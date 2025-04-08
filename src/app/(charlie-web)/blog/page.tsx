export const revalidate = 60
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import readingTime from 'reading-time'
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
    <div className="min-h-screen bg-gradient-to-b from-[#0A090C] to-black text-white">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.1),transparent_70%)] z-0"></div>

      <div className="relative z-10 flex flex-col items-center container mx-auto px-4 py-8">
        <Navbar isNav={true} />

        <div className="p-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 tracking-tight">
            Blog
            <span className="block mt-2 h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent rounded-full mx-auto"></span>
          </h2>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-3xl">
          {posts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
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
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16 bg-black/30 backdrop-blur-sm w-full max-w-3xl rounded-xl border border-white/5">
            <h3 className="text-2xl font-semibold text-white/80">No blog posts yet</h3>
            <p className="text-white/60 mt-2">Check back later for new content</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPage
