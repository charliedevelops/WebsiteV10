'use client'
import Image from 'next/image'
import Link from 'next/link'
import Card from '@/components/projectcard'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/navbar'
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider'
import Footer from '@/components/Footer'

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
      tags: ['Dev'],
      image: {
        url: '/thumbnails/checky.png',
        alt: 'Checky',
      },
    },
    {
      slug: 'charlie-web',
      ProjectName: 'Charlie-Web',
      description: 'My personal website (Version 10)',
      tags: ['Dev'],
      image: {
        url: '/thumbnails/charlie-web.png',
        alt: 'Checky',
      },
    },
    {
      slug: 'kitchen-archviz',
      ProjectName: 'Kitchen ArchViz',
      description: 'Complete 3D recreation of a kitchen in Blender',
      tags: ['FX'],
      image: {
        url: '/thumbnails/kitchen.png',
        alt: 'Kitchen ArchViz',
      },
    },
  ]

  return (
    <div className="min-h-screen p-4 sm:px-28 md:p-8 lg:p-10 font-[family-name:var(--font-inter)] bg-gradient-to-b from-[#0A090C] to-black text-white">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.1),transparent_70%)] z-0"></div>

      <main className="flex flex-col gap-6 md:gap-8 items-center justify-center dark:[color-scheme:light_dark] relative z-10">
        <div className="flex flex-col gap-4 text-center justify-center items-center w-full">
          <Navbar isNav={false} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex lg:flex md:flex-row lg:flex-row sm:flex-row gap-4 sm:gap-8 md:gap-12 lg:gap-16 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white/20"
          >
            <Link href="/projects?category=dev">
              <h2 className="hover:text-[#4BC0FF] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
                Dev
              </h2>
            </Link>
            <Link href="/projects?category=fx">
              <h2 className="hover:text-[#FF2800] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
                FX
              </h2>
            </Link>
            <Link href="/blog">
              <h2 className="hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
                Blog
              </h2>
            </Link>
          </motion.div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:grid md:grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[100px_30px_20px_70px_20px_100px] md:grid-rows-[100px_60px_10px_40px_20px_200px_]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-black/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 text-white border border-white/5 lg:col-span-1 lg:col-start-1 lg:row-span-5 lg:row-start-1 md:row-start-1 md:col-start-1 md:row-span-5 hover:border-white/20 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300 ease-in-out"
            >
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex flex-row items-center gap-5">
                  <div className="bg-gradient-to-br from-[#FFF94D] to-yellow-400 w-12 sm:w-16 h-12 sm:h-16 rounded-full mb-4 shadow-lg shadow-yellow-500/20"></div>
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Charlie Fox</h1>
                </div>
                <p className="text-md text-white/80 leading-relaxed mt-3">
                  I'm a software engineer and 3D artist dedicated to building scalable web
                  applications and creating visually impactful digital experiences.
                </p>
                <p className="mt-4 text-md text-white/80 leading-relaxed">
                  Over the years, I've worked on a range of projects that have helped me improve my
                  skills and deepen my expertise across multiple areas.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="lg:col-start-1 lg:col-span-1 lg:row-span-1 lg:row-start-6 md:row-start-4 md:row-span-2"
            >
              <Link
                href={'/contact'}
                className="bg-black/50 backdrop-blur-sm rounded-3xl p-4 text-white border border-white/5 flex items-center justify-center h-full hover:border-[#FFF94D]/50 hover:shadow-lg hover:shadow-[#FFF94D]/10 transition-all duration-300 ease-in-out group"
              >
                <div className="rounded-3xl p-4 text-white flex items-center justify-center w-full h-full">
                  <p className="text-lg sm:text-xl font-medium group-hover:text-[#FFF94D] transition-all duration-300">
                    Contact me
                  </p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="lg:col-span-1 lg:col-start-3 lg:row-span-3 lg:row-start-4 md:row-start-1 md:row-span-3 h-full"
            >
              <Link
                href={'https://www.youtube.com/watch?v=hpsKNMoY4TI'}
                className="h-full block group"
              >
                <div className="bg-black/50 backdrop-blur-sm rounded-3xl p-4 sm:p-4 h-full text-white border border-white/5 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-900/20 transition-all duration-300 ease-in-out bg-[url('/thumbnails/showreel.png')] bg-cover bg-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                    <div className="bg-red-600 rounded-full w-8 h-8 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286l-11.54 6.347c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="font-medium">Watch Showreel</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:row-span-3 md:col-start-2 md:row-start-6 lg:block sm:hidden h-full"
            >
              <Link
                href={'/blog/smart-home-automation-with-home-assistant'}
                className="bg-black/50 backdrop-blur-sm rounded-3xl p-4 sm:p-4 text-white flex flex-col gap-2 justify-between border border-white/5 h-full hover:border-white/20 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300 ease-in-out"
              >
                <h2 className="text-lg sm:text-xl font-semibold text-[#4BC0FF]">
                  Latest Blog Post
                </h2>
                <div className="border border-white/10 rounded-xl p-6 bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <p className="text-gray-400 text-sm">Jan 17, 2025 &bull; 8 min read</p>
                  <p className="mt-2 font-medium">Smart Home Automation with Home Assistant</p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="bg-black/50 backdrop-blur-sm rounded-3xl p-4 sm:p-4 text-white flex flex-col gap-4 border border-white/5 lg:col-span-1 lg:col-start-2 lg:row-span-5 lg:row-start-2 md:col-span-1 md:row-start-6 md:row-span-3 hover:border-[#4BC0FF]/30 hover:shadow-lg hover:shadow-[#4BC0FF]/10 transition-all duration-300 ease-in-out"
            >
              <Link href={`/projects/checky`} className="h-full">
                <div className="rounded-3xl h-full flex flex-col">
                  <div className="overflow-hidden rounded-xl">
                    <Image
                      src="/thumbnails/checky.png"
                      alt="Kitchen"
                      width={400}
                      height={300}
                      className="rounded-xl hover:scale-105 transition-all duration-500 ease-in-out"
                    />
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-[#4BC0FF]">FEATURED PROJECT</h4>
                    <p className="font-medium text-2xl mt-1">Checky</p>
                    <p className="text-lg text-gray-400 mt-1">Simple check-in for businesses</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col justify-center bg-black/50 backdrop-blur-sm rounded-3xl p-4 sm:p-4 text-white text-center border border-white/5 md:col-span-1 md:row-span-2 lg:row-span-1 lg:col-span-1 lg:row-start-1 lg:col-start-2 hover:border-white/20 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              <div className="flex flex-row justify-evenly">
                <Link href="https://www.youtube.com/@Charlie-Design">
                  <Image
                    src="/youtube.svg"
                    alt="YouTube"
                    width={50}
                    height={100}
                    className="hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer filter hover:brightness-100 brightness-[.4] hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]"
                  />
                </Link>
                <Link href={'https://x.com/charliedesig'}>
                  <Image
                    src="/twitter.svg"
                    alt="Twitter"
                    width={50}
                    height={100}
                    className="hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer filter hover:brightness-100 brightness-[.4] hover:drop-shadow-[0_0_8px_rgba(29,161,242,0.5)]"
                  />
                </Link>
                <Image
                  src="/instagram.svg"
                  alt="Instagram"
                  width={50}
                  height={100}
                  className="hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer filter hover:brightness-100 brightness-[.4] hover:drop-shadow-[0_0_8px_rgba(225,48,108,0.5)]"
                />
                <Link href={'https://github.com/charliedesigns'}>
                  <Image
                    src="/github.svg"
                    alt="GitHub"
                    width={50}
                    height={100}
                    className="hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer filter hover:brightness-100 brightness-[.4] hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col gap-4 text-center justify-center items-center w-full mt-8"
        >
          <h2 className="text-2xl sm:text-xl md:text-3xl lg:text-4xl font-semibold text-white/80">
            Trusted by
          </h2>
          <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
            <div className="absolute left-0 top-0 w-44 h-full z-10 pointer-events-none bg-gradient-to-r from-[#040405] to-transparent"></div>

            <InfiniteSlider speedOnHover={20} gap={100} speed={30} className="px-4 sm:px-6">
              {[
                { src: '/clients/avt.png', alt: 'AVT' },
                { src: '/clients/changelab.png', alt: 'ChangeLab' },
                { src: '/clients/dave.png', alt: 'Dave' },
                { src: '/clients/toma.png', alt: 'Toma' },
                { src: '/clients/avt.png', alt: 'AVT' },
                { src: '/clients/changelab.png', alt: 'ChangeLab' },
                { src: '/clients/dave.png', alt: 'Dave' },
                { src: '/clients/toma.png', alt: 'Toma' },
              ].map((client, index) => (
                <div key={index} className="flex items-center justify-center">
                  <div className="h-16 w-44 flex items-center justify-center">
                    <img
                      src={client.src}
                      alt={client.alt}
                      className="max-h-16 max-w-full brightness-0 invert opacity-50 hover:opacity-90 transition-all duration-300 object-contain hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </InfiniteSlider>

            <div className="absolute right-0 top-0 w-44 h-full z-10 pointer-events-none bg-gradient-to-l from-[#040405] to-transparent"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col gap-4 text-center justify-center items-center w-full mt-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white/80 relative">
            Featured Projects
          </h2>
        </motion.div>

        <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ scale: 1.03 }}
              >
                <Link href={`/projects/${project.slug}`} className="relative z-20">
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
