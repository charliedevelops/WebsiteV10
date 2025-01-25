'use client'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/logo'
import Card from '@/components/projectcard'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  interface Project {
    slug: string
    ProjectName: string
    description: string
    tags: string[]
    image: any
  }

  const projects: Project[] = [
    {
      slug: 'checky',
      ProjectName: 'Checky',
      description: 'Simple check-in for businesses',
      tags: ['Web', 'Business'],
      image: {
        url: '/api/media/file/Recent%20Check-Ins.png',
        alt: 'Checky',
      },
    },
    {
      slug: 'kitchen',
      ProjectName: 'Kitchen',
      description: 'A recipe',
      tags: ['Web', 'Food'],
      image: {
        url: '/api/media/file/Recent%20Check-Ins.png',
        alt: 'Checky',
      },
    },
    {
      slug: 'sdfsd',
      ProjectName: 'Kitchen',
      description: 'A recipe',
      tags: ['Web', 'Food'],
      image: {
        url: '/api/media/file/Recent%20Check-Ins.png',
        alt: 'Checky',
      },
    },
  ]

  return (
    <div className="min-h-screen p-4 sm:px-28 md:p-8 lg:p-10 font-[family-name:var(--font-inter)] bg-[#0A090C] text-white">
      <main className="flex flex-col gap-6 md:gap-8 items-center justify-center dark:[color-scheme:light_dark]">
        <div className="flex flex-col gap-4 text-center justify-center items-center w-full">
          <Logo isNav={false} />
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12 lg:gap-16 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white/20">
            <Link href="/projects?category=fx">
              <h2 className="hover:text-[#FF2800] transition-all duration-300 ease-in-out cursor-pointer">
                FX
              </h2>
            </Link>
            <Link href="/projects?category=dev">
              <h2 className="hover:text-[#4BC0FF] transition-all duration-300 ease-in-out cursor-pointer">
                Develop
              </h2>
            </Link>
            <Link href="/projects?category=design">
              <h2 className="hover:text-[#90FF94] transition-all duration-300 ease-in-out cursor-pointer">
                Design
              </h2>
            </Link>
            <Link href="/blog">
              <h2 className="hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                Blog
              </h2>
            </Link>
          </div>
        </div>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:grid md:grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[100px_30px_20px_70px_20px_100px] md:grid-rows-[100px_60px_10px_40px_20px_200px_] flex flex-col gap-6">
            <div className="bg-[#1D1D1D]/40 rounded-3xl p-4 sm:p-6 text-white  lg:col-span-1 lg:col-start-1 lg:row-span-5 lg:row-start-1 md:row-start-1 md:col-start-1 md:row-span-5  hover:scale-105 transition-all duration-300 ease-in-out">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex flex-row items-center gap-5">
                  <div className="bg-yellow-300 w-12 sm:w-16 h-12 sm:h-16 rounded-full mb-4"></div>
                  <h1 className="text-2xl sm:text-3xl font-medium">Charlie Fox</h1>
                </div>
                <p className="text-md text-white/80">
                  I'm a software engineer and 3D artist dedicated to building scalable web
                  applications and creating visually impactful digital experiences.
                </p>
                <p className="mt-4 text-md text-white/80">
                  Over the years, I've worked on a range of projects that have helped me improve my
                  skills and deepen my expertise across multiple areas.
                </p>
              </div>
            </div>
            <Link
              href={'/contact'}
              className="bg-[#1D1D1D]/40 rounded-3xl p-4 text-white lg:col-start-1 lg:col-span-1 lg:row-span-1 lg:row-start-6 md:row-start-4 md:row-span-2 flex items-center justify-center hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="rounded-3xl p-4 text-white flex items-center justify-center w-full h-full md:row-start-2 ">
                <p className="text-lg sm:text-xl font-medium">Contact me</p>
              </div>
            </Link>
            <Link
              href={'https://www.youtube.com/watch?v=hpsKNMoY4TI'}
              className="h-full lg:col-span-1 lg:col-start-3 lg:row-span-3 lg:row-start-4 md:row-start-1 md:row-span-3 aspect-video"
            >
              <div className="bg-[#1D1D1D]/40 rounded-3xl p-4 sm:p-4 h-full text-white lg:col-span-1 lg:col-start-3 lg:row-span-3 lg:row-start-4 hover:scale-105 transition-all duration-300 ease-in-out bg-[url('/thumbnails/kitchen.png')] bg-cover bg-center"></div>
            </Link>

            <Link
              href={'/blog/smart-home-automation-with-home-assistant'}
              className="bg-[#1D1D1D]/40 rounded-3xl p-4 sm:p-4 text-white flex flex-col gap-2 justify-between lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:row-span-3 md:col-start-2 md:row-start-6  sm:hidden hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <h2 className="text-lg sm:text-xl font-semibold">Latest Blog Post</h2>
              <div className="border-2 border-white/30 rounded-xl p-6">
                <p className="text-gray-400 text-sm">Jan 17, 2025 &bull; 8 min read</p>
                <p className="mt-2 font-medium">Smart Home Automation with Home Assistant</p>
              </div>
            </Link>

            <div className="bg-[#1D1D1D]/40 rounded-3xl p-4 sm:p-4 text-white flex flex-col gap-4  lg:col-span-1 lg:col-start-2 lg:row-span-5 lg:row-start-2 md:col-span-1 md:row-start-6 md:row-span-3   hover:scale-105 transition-all duration-300 ease-in-out">
              <Link href={`/projects/checky`}>
                <div className="rounded-3xl">
                  <Image
                    src="/thumbnails/kitchen.png"
                    alt="Kitchen"
                    width={400}
                    height={300}
                    className="rounded-xl"
                  />
                  <h4 className="mt-4 text-xm font-semibold text-white/40">FEATURED PROJECT</h4>
                  <p className="font-medium text-2xl">Checky</p>
                  <p className="text-lg text-gray-400">Simple check-in for businesses</p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col justify-center bg-[#1D1D1D]/40 rounded-3xl sm:p-4 text-white text-center md:col-span-1 md:row-span-2 lg:row-span-1 lg:col-span-1 lg:row-start-1 lg:col-start-2 hover:scale-105 transition-all duration-300 ease-in-out">
              <div className="flex flex-row justify-evenly">
                <Link href="https://www.youtube.com/@Charlie-Design">
                  <Image
                    src="/youtube.svg"
                    alt="Charlie"
                    width={50}
                    height={100}
                    className="hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer filter hover:brightness-100 brightness-[.2]"
                  />
                </Link>
                <Link href={'https://x.com/charliedesig'}>
                  <Image
                    src="/twitter.svg"
                    alt="Charlie"
                    width={50}
                    height={100}
                    className="hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer filter hover:brightness-100 brightness-[.2]"
                  />
                </Link>
                <Image
                  src="/instagram.svg"
                  alt="Charlie"
                  width={50}
                  height={100}
                  className="hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer filter hover:brightness-100 brightness-[.2]"
                />
                <Link href={'https://github.com/charliedesigns'}>
                  <Image
                    src="/github.svg"
                    alt="Charlie"
                    width={50}
                    height={100}
                    className="hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer filter hover:brightness-100 brightness-[.2]"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-center justify-center items-center w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white/80">
            Featured Projects
          </h2>
        </div>
        <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="relative z-20"
                >
                  <Card key={project.slug} project={project} />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
