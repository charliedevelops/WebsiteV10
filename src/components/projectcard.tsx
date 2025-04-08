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
        return 'bg-[#4BC0FF]/10 text-[#4BC0FF] border-[#4BC0FF]/30'
      case 'fx':
        return 'bg-[#FF2800]/10 text-[#FF2800] border-[#FF2800]/30'
      case 'design':
        return 'bg-[#90FF94]/10 text-[#90FF94] border-[#90FF94]/30'
      default:
        return 'bg-white/5 text-white/60 border-white/20'
    }
  }

  return (
    <div className="w-full h-[400px] card p-5 bg-black/50 backdrop-blur-sm rounded-xl transition-all duration-200 ease-out border border-white/5 hover:border-white/20 hover:shadow-lg hover:shadow-blue-900/5">
      <div className="relative h-[250px] overflow-hidden rounded-lg group">
        {project.image ? (
          <Image
            src={project.image.url}
            alt={project.ProjectName}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        ) : (
          <Image src={fallbackImage} alt="Placeholder" fill className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="mt-4 flex flex-col h-[100px]">
        <h3 className="text-xl text-white font-semibold tracking-tight mb-1">
          {project.ProjectName}
        </h3>
        <p className="text-white/70 text-sm line-clamp-2 mb-auto">{project.description}</p>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/20">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
