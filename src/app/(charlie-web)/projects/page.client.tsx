'use client'

import React, { useState, useEffect } from 'react'
import Card from '@/components/projectcard'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/navbar'
import { useSearchParams } from 'next/navigation'

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

export default function ClientProjects({ projects }: ClientProjectsProps) {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam ? categoryParam.toLowerCase() : null,
  )

  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)

  // Get unique categories from projects, removing 'design'
  const categories = Array.from(
    new Set(
      projects.flatMap((project) =>
        project.tags
          .map((tag) => tag.toLowerCase())
          .filter((tag) => tag.toLowerCase() !== 'design'),
      ),
    ),
  )

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProjects(
        projects.filter((project) =>
          project.tags.some((tag) => tag.toLowerCase() === selectedCategory.toLowerCase()),
        ),
      )
    } else {
      setFilteredProjects(projects)
    }
  }, [selectedCategory, projects])

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category)
  }

  // Define category colors
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'dev':
      case 'web':
        return '#4BC0FF'
      case 'fx':
        return '#FF2800'
      default:
        return '#FFFFFF'
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <Navbar isNav={true} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
          Projects
          <span className="block mt-2 h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent rounded-full mx-auto"></span>
        </h1>

        <div className="inline-flex flex-wrap justify-center gap-3 mt-8 p-2 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-5 py-2 rounded-full transition-all duration-300 ease-out ${
              selectedCategory === null
                ? 'bg-white/10 text-white shadow-md shadow-white/5'
                : 'text-white/70 hover:text-white'
            }`}
          >
            All
          </button>

          {categories.map((category) => {
            const color = getCategoryColor(category)
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-5 py-2 rounded-full transition-all duration-300 ease-out ${
                  selectedCategory === category ? 'shadow-md' : 'hover:text-white/90'
                }`}
                style={{
                  backgroundColor: selectedCategory === category ? `${color}15` : 'transparent',
                  color: selectedCategory === category ? color : 'rgba(255, 255, 255, 0.7)',
                  boxShadow: selectedCategory === category ? `0 4px 12px ${color}25` : 'none',
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            )
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
        <AnimatePresence mode="sync">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              layoutId={project.slug}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  opacity: { duration: 0.4 },
                  layout: { duration: 0.4, type: 'spring', stiffness: 150, damping: 20 },
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  opacity: { duration: 0.3 },
                },
              }}
            >
              <Link href={`/projects/${project.slug}`}>
                <Card project={project} />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-16"
          >
            <h3 className="text-2xl font-semibold text-white/80">No projects in this category</h3>
            <p className="text-white/60 mt-2">Try selecting a different category</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
