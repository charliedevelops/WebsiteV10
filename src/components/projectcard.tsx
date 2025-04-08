import React from 'react'
import Image from 'next/image'

interface Project {
  slug: string
  ProjectName: string
  description: string
  tags?: string[]
  image?: {
    url: string
  }
}

interface CardProps {
  project: Project
}

const Card: React.FC<CardProps> = ({ project }) => {
  const fallbackImage = '/placeholder.png'

  // Determine tag color based on project type
  const getTagColor = (tag: string) => {
    switch (tag?.toLowerCase()) {
      case 'dev':
      case 'web':
        return 'text-[#4BC0FF]'
      case 'fx':
        return 'text-[#FF2800]'
      case 'design':
        return 'text-[#90FF94]'
      default:
        return 'text-white/60'
    }
  }

  return (
    <div className="w-full h-[400px] card p-5 bg-[#1D1D1D]/40 rounded-xl transition-all duration-300 hover:scale-105 border border-[#ffffff]/10 hover:border-[#ffffff]/20">
      <div className="relative h-[250px] overflow-hidden rounded-lg">
        {project.image ? (
          <Image src={project.image.url} alt={project.ProjectName} fill className="object-cover" />
        ) : (
          <Image src={fallbackImage} alt="Placeholder" fill className="object-cover" />
        )}
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-xl text-white font-bold tracking-tight">{project.ProjectName}</h3>
        <p className="text-white/70 text-sm line-clamp-2">{project.description}</p>
        {project.tags && project.tags.length > 0 && (
          <div className="flex gap-2 mt-1">
            {project.tags.map((tag, index) => (
              <span key={index} className={`text-xs font-medium ${getTagColor(tag)}`}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
