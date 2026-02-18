import React from 'react'
import Image from 'next/image'
import { GlowingEffect } from '@/components/ui/glowing-effect'

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

  return (
    <div className="relative rounded-2xl group">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden card-surface cursor-pointer">
        {project.image ? (
          <Image
            src={project.image.url}
            alt={project.ProjectName}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <Image src={fallbackImage} alt="Placeholder" fill className="object-cover" />
        )}

      </div>
    </div>
  )
}

export default Card
