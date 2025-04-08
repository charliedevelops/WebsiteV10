'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/navbar'
import Card from '@/components/projectcard'
import { TextFade } from '@/components/textTitle'

interface Project {
  slug: string
  ProjectName: string
  description: string
  tags: string[]
  image: any
}

interface ClientProjectsProps {
  projects: Project[]
}

const ClientProjects: React.FC<ClientProjectsProps> = ({ projects }) => {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const categoryFromURL = urlSearchParams.get('category') || 'all'
    setActiveCategory(categoryFromURL)
  }, [])

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects)
    } else {
      const filtered = projects.filter((project) => {
        const projectTags = project.tags || []
        return Array.isArray(projectTags) && projectTags.includes(activeCategory)
      })
      setFilteredProjects(filtered)
    }
  }, [activeCategory, projects])

  const handleFilterChange = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory('all')
      setFilteredProjects(projects)
      router.push('/projects')
    } else {
      setActiveCategory(category)
      router.push(`/projects?category=${category}`)
    }
  }

  return (
    <motion.div
      className="project-page "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar isNav={true} />

      <div className="relative mb-8 ">
        <TextFade
          direction="down"
          className="w-full flex justify-center items-center mb-6"
          staggerChildren={0.5}
        >
          <h1 className="text-6xl font-bold text-white italic">Projects</h1>
        </TextFade>

        <div className="filters flex justify-center gap-6 w-full">
          <button
            onClick={() => handleFilterChange('fx')}
            className="filter-btn text-left rounded transition-all duration-300"
          >
            <h2
              className={`text-3xl font-bold ${
                activeCategory === 'fx' ? 'text-[#FF2800]' : 'text-gray-400'
              } transition-all duration-500`}
            >
              <span className="italic">Charlie</span>
              <span className=""> FX</span>
            </h2>
          </button>
          <button
            onClick={() => handleFilterChange('dev')}
            className="filter-btn text-left rounded transition-all duration-300"
          >
            <h2
              className={`text-3xl font-bold ${
                activeCategory === 'dev' ? 'text-[#4BC0FF]' : 'text-gray-400'
              } transition-all duration-500`}
            >
              <span className="italic">Charlie</span>
              <span className=""> Dev</span>
            </h2>
          </button>
        </div>
      </div>

      <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/projects/${project.slug}`} className="relative z-20">
                <Card project={project} />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default ClientProjects
