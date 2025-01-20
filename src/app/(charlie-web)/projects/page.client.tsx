// pages/projects/page.client.tsx

'use client' // Ensure this is a client-side component

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '@/components/projectcard'

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
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.tags.includes(activeCategory))) // Filter by category
    }
  }, [activeCategory, projects])

  return (
    <motion.div
      className="project-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-4 pt-8">
        <Navbar />
      </div>

      <div className="relative flex flex-row items-center mb-8">
        <div className="filters flex justify-items-start gap-1 flex-col">
          <button
            onClick={() => setActiveCategory('web-development')}
            className="filter-btn text-left rounded transition-all duration-300"
          >
            <h2
              className={`text-3xl font-bold ${
                activeCategory === 'web-development' ? 'text-[#FF2800]' : 'text-gray-400'
              } transition-all duration-500`}
            >
              <span className="italic">Charlie</span>
              <span className=""> FX</span>
            </h2>
          </button>
          <button
            onClick={() => setActiveCategory('mobile-development')}
            className="filter-btn text-left rounded transition-all duration-300"
          >
            <h2
              className={`text-3xl font-bold ${
                activeCategory === 'mobile-development' ? 'text-[#4BC0FF]' : 'text-gray-400'
              } transition-all duration-500`}
            >
              <span className="italic">Charlie</span>
              <span className=""> Dev</span>
            </h2>
          </button>
          <button
            onClick={() => setActiveCategory('design')}
            className="filter-btn text-left rounded transition-all duration-300"
          >
            <h2
              className={`text-3xl font-bold ${
                activeCategory === 'design' ? 'text-[#90FF94]' : 'text-gray-400'
              } transition-all duration-500`}
            >
              <span className="italic">Charlie</span>
              <span className=""> Design</span>
            </h2>
          </button>
        </div>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-white">
          All Projects
        </h1>
        <div className="ml-auto">
          <h2 className="text-3xl font-semibold">Dropdown</h2>
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
              <Link key={project.slug} href={`/projects/${project.slug}`} className="relative z-20">
                {/* <div className="aspect-video p-6 rounded-xl hover:bg-black/100 transition-all duration-300 transform hover:scale-105 cursor-pointer flex justify-end flex-col relative group">
                  <Image
                    src={project.image.url}
                    fill
                    layout="fill"
                    className="absolute inset-0 object-cover rounded-xl z-0"
                    alt={project.ProjectName}
                  />
                  <div className="relative z-20">
                    <h3 className="text-xl text-white">{project.ProjectName}</h3>
                    <p className="text-white/80">{project.description}</p>
                  </div>
                </div> */}
                <Card key={project.slug} project={project} />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default ClientProjects
