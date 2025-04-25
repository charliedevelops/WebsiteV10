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

  // Simplified tag styling without distracting colors
  const getTagStyle = () => {
    return 'bg-black/60 text-white/80 border-white/20 hover:bg-black/70'
  }

  // Get more descriptive label for tag
  const getTagLabel = (tag: string) => {
    switch (tag?.toLowerCase()) {
      case 'dev':
        return 'Development'
      case 'web':
        return 'Web'
      case 'fx':
        return 'Visual FX'
      case 'design':
        return 'Design'
      default:
        return tag
    }
  }

  return (
    <div className="w-full h-[380px] card p-5 bg-black/50 backdrop-blur-sm rounded-xl transition-all duration-200 ease-out border border-white/5 hover:border-white/20 hover:shadow-lg hover:shadow-blue-900/5">
      <div className="relative h-[230px] overflow-hidden rounded-lg group">
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
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl text-white font-semibold tracking-tight">{project.ProjectName}</h3>

          {/* Position tags next to title */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex gap-1.5">
              {project.tags.slice(0, 1).map((tag, index) => (
                <span
                  key={index}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/20 bg-black/70 text-white/90"
                >
                  {getTagLabel(tag)}
                </span>
              ))}
              {project.tags.length > 1 && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/70 text-white/90 border border-white/20">
                  +{project.tags.length - 1}
                </span>
              )}
            </div>
          )}
        </div>

        <p className="text-white/70 text-sm line-clamp-3">{project.description}</p>
      </div>
    </div>
  )
}

export default Card
