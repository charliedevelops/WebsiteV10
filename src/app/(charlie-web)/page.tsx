'use client'
import Image from 'next/image'
import Link from 'next/link'
import Card from '@/components/projectcard'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/navbar'
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider'
import Footer from '@/components/Footer'
import AuroraBlur from '@/components/react-bits/aurora-blur'
import StaggeredText from '@/components/react-bits/staggered-text'
import ThreeDLetterSwap from '@/components/react-bits/3d-letter-swap'
import { useRef } from 'react'
import { GlowingEffect } from '@/components/ui/glowing-effect'

export default function Home() {
  const bioCardRef = useRef<HTMLDivElement>(null)
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
      description: 'Streamline employee registration and check-ins with Checky',
      tags: ['Dev'],
      image: {
        url: '/thumbnails/checky.png',
        alt: 'Checky',
      },
    },
    {
      slug: 'ChangeLab-Web',
      ProjectName: 'ChangeLab',
      description: 'Complete Website Build',
      tags: ['Dev'],
      image: {
        url: '/thumbnails/changeLab-web.png',
        alt: 'ChangeLab',
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
      <div
        className="absolute top-0 left-0 right-0 h-[800px] z-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        }}
      >
        <AuroraBlur
          speed={0.5}
          brightness={0.7}
          saturation={0.8}
          opacity={0.35}
          bloomIntensity={1.5}
          width="100%"
          height="800px"
        />
      </div>

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
              <h2 className="hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
                Dev
              </h2>
            </Link>
            <Link href="/projects?category=fx">
              <h2 className="hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
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
              ref={bioCardRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="card-surface rounded-3xl p-6 text-white
                lg:col-span-1 lg:col-start-1 lg:row-span-5 lg:row-start-1
                md:row-start-1 md:col-start-1 md:row-span-5"
            >
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-5 mb-4">
                  <div
                    className="w-16 h-16 rounded-full"
                    style={{
                      background: 'linear-gradient(to bottom, #FFF94D, #D4A017)',
                      boxShadow:
                        '0 2px 8px rgba(255, 249, 77, 0.15), 0 0 0 1px rgba(255, 249, 77, 0.1)',
                    }}
                  />
                  <ThreeDLetterSwap
                    as="h1"
                    className="text-3xl font-semibold tracking-tight"
                    staggerInterval={0.03}
                    flipDirection="top"
                    blur={true}
                    blurAmount={3}
                    parentHoverRef={bioCardRef}
                  >
                    Charlie Fox
                  </ThreeDLetterSwap>
                </div>
                <div className="space-y-4 text-white/80">
                  <p className="leading-relaxed">
                    I&apos;m a full-stack developer focused on building scalable web apps and
                    platforms for businesses. I love solving complex problems with clean,
                    maintainable code.
                  </p>
                  <p className="leading-relaxed">
                    Outside of work, I enjoy listening to music, exploring new technologies, and
                    contributing to open source projects.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative lg:col-start-1 lg:col-span-1 lg:row-span-1 lg:row-start-6 md:row-start-4 md:row-span-2 rounded-3xl"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <Link
                href={'/contact'}
                className="card-surface rounded-3xl p-4 text-white flex items-center justify-center h-full group relative"
              >
                <div className="rounded-3xl p-4 text-white flex items-center justify-center w-full h-full">
                  <p className="text-lg sm:text-xl font-medium group-hover:text-white transition-colors duration-300">
                    Contact me
                  </p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative lg:col-span-1 lg:col-start-3 lg:row-span-3 lg:row-start-4 md:row-start-1 md:row-span-3 h-full rounded-3xl"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <Link
                href={'https://www.youtube.com/watch?v=hpsKNMoY4TI'}
                className="h-full block group relative"
              >
                <div className="card-surface rounded-3xl h-full text-white bg-[url('/thumbnails/showreel.png')] bg-cover bg-center relative overflow-hidden"></div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:row-span-3 md:col-start-2 md:row-start-6 lg:block sm:hidden h-full rounded-3xl"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <Link
                href={'/blog/tools-2025'}
                className="card-surface rounded-3xl p-4 sm:p-4 text-white flex flex-col gap-2 justify-between h-full relative"
              >
                <h2 className="text-lg sm:text-xl font-semibold text-white/50">Latest Blog Post</h2>
                <div className="border border-white/10 rounded-xl p-6 bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <p className="text-gray-400 text-sm">April 21, 2025 &bull; 8 min read</p>
                  <p className="mt-2 font-medium">
                    Productivity tools and software I use on my Mac
                  </p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative rounded-3xl lg:col-span-1 lg:col-start-2 lg:row-span-5 lg:row-start-2 md:col-span-1 md:row-start-6 md:row-span-3"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="card-surface rounded-3xl p-4 sm:p-4 text-white flex flex-col gap-4 h-full relative">
                <Link href={`/projects/ChangeLab-Web`} className="h-full">
                  <div className="rounded-3xl h-full flex flex-col">
                    <div className="overflow-hidden rounded-xl flex items-center justify-center">
                      <Image
                        src="/thumbnails/changeLab-web.png"
                        alt="Kitchen"
                        width={400}
                        height={300}
                        className="rounded-xl hover:scale-105 transition-transform duration-500 ease-in-out object-cover w-full h-auto"
                      />
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-white/50">FEATURED PROJECT</h4>
                      <p className="font-medium text-2xl mt-1">ChangeLab</p>
                      <p className="text-lg text-gray-400 mt-1">Complete Website and Blog</p>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl md:col-span-1 md:row-span-2 lg:row-span-1 lg:col-span-1 lg:row-start-1 lg:col-start-2"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="flex flex-col justify-center card-surface rounded-3xl p-4 sm:p-4 text-white text-center h-full relative">
                <div className="flex flex-row justify-evenly">
                  <Link href={'https://github.com/charliedevelops'} target="_blank">
                    <Image
                      src="/github.svg"
                      alt="GitHub"
                      width={50}
                      height={100}
                      className="hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer filter hover:brightness-100 brightness-[.4] "
                    />
                  </Link>
                  <Link href={'https://www.linkedin.com/in/charlie-fox-751b64305/'} target="_blank">
                    <Image
                      src="/linkedin.svg"
                      alt="LinkedIn"
                      width={50}
                      height={100}
                      className="hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer filter hover:brightness-100 brightness-[.4] "
                    />
                  </Link>
                  <Link href="https://www.youtube.com/@Charlie-Design" target="_blank">
                    <Image
                      src="/youtube.svg"
                      alt="YouTube"
                      width={50}
                      height={100}
                      className="hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer filter hover:brightness-100 brightness-[.4] "
                    />
                  </Link>
                  <Link href={'https://bsky.app/profile/charliefox.dev'} target="_blank">
                    <Image
                      src="/bluesky.svg"
                      alt="Bluesky"
                      width={50}
                      height={100}
                      className="hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer filter hover:brightness-100 brightness-[.4] text-white"
                    />
                  </Link>
                </div>
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
                      className="max-h-16 max-w-full brightness-0 invert opacity-50 hover:opacity-90 hover:scale-105 transition-opacity transition-transform duration-300 object-contain"
                    />
                  </div>
                </div>
              ))}
            </InfiniteSlider>

            <div className="absolute right-0 top-0 w-44 h-full z-10 pointer-events-none bg-gradient-to-l from-[#040405] to-transparent"></div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4 text-center justify-center items-center w-full mt-6">
          <StaggeredText
            text="Featured Projects"
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white/80"
            segmentBy="words"
            delay={60}
            duration={0.5}
            direction="top"
            blur={true}
          />
        </div>

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
