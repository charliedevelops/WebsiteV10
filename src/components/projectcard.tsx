import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Project {
  slug: string
  ProjectName: string
  description: string
  image?: {
    url: string
  }
}

interface CardProps {
  project: Project
}

const Card: React.FC<CardProps> = ({ project }) => {
  const fallbackImage = '/placeholder.png'

  return (
    <div className="w-full h-[400px] card p-5 bg-gray-1000 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 border border-gray-800">
      <div className="relative h-[250px] overflow-hidden rounded-lg">
        {project.image ? (
          <Image src={project.image.url} alt={project.ProjectName} fill className="object-cover" />
        ) : (
          <Image src={fallbackImage} alt="Placeholder" fill className="object-cover" />
        )}
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-xl text-white font-bold tracking-tight">{project.ProjectName}</h3>
        <p className="text-gray-400 text-sm line-clamp-3">{project.description}</p>
      </div>
    </div>
  )
}

export default Card
