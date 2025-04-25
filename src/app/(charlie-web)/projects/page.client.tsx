'use client'

import React, { useState, useEffect } from 'react'
import Card from '@/components/projectcard'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/navbar'

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

  // Define category colors and display names
  const getCategoryInfo = (category: string) => {
    switch (category.toLowerCase()) {
      case 'dev':
        return {
          color: '#3B82F6', // Modern blue
          displayName: 'Development',
        }
      case 'web':
        return {
          color: '#10B981', // Modern green
          displayName: 'Web',
        }
      case 'fx':
        return {
          color: '#F43F5E', // Modern rose
          displayName: '3D & Visual Effects',
        }
      default:
        return {
          color: '#FFFFFF',
          displayName: category.charAt(0).toUpperCase() + category.slice(1),
        }
    }
  }

  return (
    <>
      <Navbar isNav={true} />
      <div className="container mx-auto px-4">
        <div className="pt-12 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
              Projects
            </h1>

            <div className="inline-flex flex-wrap justify-center gap-3 mt-8 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
              <button
                onClick={() => handleCategoryClick(null)}
                className={`px-6 py-2.5 rounded-full transition-all duration-300 ease-out text-sm font-medium ${
                  selectedCategory === null
                    ? 'bg-white/10 text-white shadow-md shadow-white/5'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                All Projects
              </button>

              {categories.map((category) => {
                const { color, displayName } = getCategoryInfo(category)
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-6 py-2.5 rounded-full transition-all duration-300 ease-out text-sm font-medium ${
                      selectedCategory === category
                        ? 'shadow-md'
                        : 'hover:text-white/90 hover:bg-white/5'
                    }`}
                    style={{
                      backgroundColor: selectedCategory === category ? `${color}20` : 'transparent',
                      color: selectedCategory === category ? color : 'rgba(255, 255, 255, 0.7)',
                      boxShadow: selectedCategory === category ? `0 4px 12px ${color}30` : 'none',
                    }}
                  >
                    {displayName}
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
                <h3 className="text-2xl font-semibold text-white/80">
                  No projects in this category
                </h3>
                <p className="text-white/60 mt-2">Try selecting a different category</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
