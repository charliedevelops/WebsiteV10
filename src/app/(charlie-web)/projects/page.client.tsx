'use client'

import React, { useState, useEffect } from 'react'
import Card from '@/components/projectcard'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import StaggeredText from '@/components/react-bits/staggered-text'

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

  const categoryOrder = ['dev', 'fx', 'archived']
  const projectTags = new Set(
    projects.flatMap((project) =>
      project.tags
        .map((tag) => tag.toLowerCase())
        .filter((tag) => tag.toLowerCase() !== 'design'),
    ),
  )
  const categories = Array.from(new Set([...projectTags, ...categoryOrder])).sort((a, b) => {
    const ai = categoryOrder.indexOf(a)
    const bi = categoryOrder.indexOf(b)
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
  })

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProjects(
        projects.filter((project) =>
          project.tags.some((tag) => tag.toLowerCase() === selectedCategory.toLowerCase()),
        ),
      )
    } else {
      setFilteredProjects(
        projects.filter(
          (project) => !project.tags.some((tag) => tag.toLowerCase() === 'archived'),
        ),
      )
    }
  }, [selectedCategory, projects])

  const getCategoryInfo = (category: string) => {
    switch (category.toLowerCase()) {
      case 'dev':
        return { color: '#3B82F6', displayName: 'Dev' }
      case 'web':
        return { color: '#10B981', displayName: 'Web' }
      case 'fx':
        return { color: '#F43F5E', displayName: '3D & VFX' }
      case 'archived':
        return { color: '#FFFFFF', displayName: 'Archived' }
      default:
        return { color: '#FFFFFF', displayName: category.charAt(0).toUpperCase() + category.slice(1) }
    }
  }

  return (
    <>
      <Navbar isNav={true} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 pb-6"
        >
          <StaggeredText
            text="Projects"
            as="h1"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
            segmentBy="chars"
            delay={60}
            duration={0.5}
            direction="top"
            blur={true}
          />

          <div className="flex flex-wrap gap-0.5 p-1 bg-white/[0.03] rounded-full border border-white/[0.06]">
            {[{ key: null, label: 'All' as React.ReactNode }, ...categories.map((c) => ({
              key: c,
              label: c === 'archived' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
              ) as React.ReactNode : getCategoryInfo(c).displayName as React.ReactNode,
            }))].map(
              (tab) => {
                const isActive = selectedCategory === tab.key
                return (
                  <button
                    key={tab.key ?? 'all'}
                    onClick={() => setSelectedCategory(tab.key)}
                    className="relative px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 z-10"
                    style={{
                      color: isActive
                        ? '#fff'
                        : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="tab-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.08]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                )
              },
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-12">
          <AnimatePresence mode="sync">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                layoutId={project.slug}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    opacity: { duration: 0.3 },
                    layout: { duration: 0.35, type: 'spring', stiffness: 200, damping: 25 },
                  },
                }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
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
              className="col-span-full text-center py-20"
            >
              <p className="text-white/40 text-lg">No projects in this category</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
