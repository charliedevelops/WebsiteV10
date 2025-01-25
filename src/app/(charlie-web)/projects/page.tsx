import dynamic from 'next/dynamic'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ClientProjects from './page.client'

export async function fetchProjects() {
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
      image: project['Header Image'],
    }))
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await fetchProjects()

  if (!projects || projects.length === 0) {
    return <div>No projects found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ClientProjects projects={projects} />
    </div>
  )
}
