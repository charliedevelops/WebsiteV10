import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ClientProjects from './page.client'
// Remove static revalidate value since we're using on-demand revalidation

async function fetchProjects() {
  try {
    const payload = await getPayload({ config: configPromise })

    const projects = await payload.find({
      collection: 'projects',
      limit: 1000,
      pagination: false,
      select: {
        slug: true,
        ['Project Name']: true,
        Content: true,
        tags: true,
        'Header Image': true,
      },
    })

    return projects.docs.map((project) => ({
      slug: project.slug || '',
      ProjectName: project['Project Name'] || '',
      description: project.Content.description || '',
      tags: Array.isArray(project.tags?.tags) ? project.tags.tags : [],
      image:
        project['Header Image'] &&
        typeof project['Header Image'] === 'object' &&
        'url' in project['Header Image']
          ? { url: project['Header Image'].url }
          : null,
    }))
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await fetchProjects()

  if (!projects || projects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0A090C] to-black text-white">
        <div className="text-center p-8">
          <h2 className="text-2xl font-semibold mb-4">No projects found</h2>
          <p className="text-gray-400">Check back later for new projects</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A090C] to-black text-white">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.1),transparent_70%)] z-0"></div>

      <div className="relative z-10">
        <ClientProjects projects={projects} />
      </div>
    </div>
  )
}
