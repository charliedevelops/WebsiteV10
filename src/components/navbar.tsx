'use client'
import Link from 'next/link'
import Logo from '@/components/logo'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const Navbar = ({ isNav }: { isNav: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="w-full z-50 transition-all duration-300 text-white bg-transparent pointer-events-auto">
      <div
        className={`max-w-7xl mx-auto ${isNav ? 'px-4 sm:px-8 lg:px-10 py-12' : 'px-4 sm:px-8 lg:px-10 py-24'}`}
      >
        <div className={`flex items-center ${isNav ? 'justify-between' : 'justify-center'}`}>
          <div className={isNav ? '' : 'absolute left-1/2 transform -translate-x-1/2'}>
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
              aria-label="Home"
            >
              <Logo isNav={isNav} />
            </Link>
          </div>

          {isNav && (
            <div className="hidden lg:flex items-center">
              <div className="flex items-center gap-8">
                <Link
                  href="/"
                  className={`py-2 px-4 rounded-lg text-base font-medium transition-all duration-200 ${
                    pathname === '/'
                      ? 'text-white bg-white/5'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  className={`py-2 px-4 rounded-lg text-base font-medium transition-all duration-200 ${
                    pathname === '/projects' || pathname.startsWith('/projects/')
                      ? 'text-[#4BC0FF] bg-[#4BC0FF]/5'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Projects
                </Link>
                <Link
                  href="/blog"
                  className={`py-2 px-4 rounded-lg text-base font-medium transition-all duration-200 ${
                    pathname === '/blog' || pathname.startsWith('/blog/')
                      ? 'text-[#FFF94D] bg-[#FFF94D]/5'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className={`py-2 px-4 rounded-lg text-base font-medium transition-all duration-200 ${
                    pathname === '/contact'
                      ? 'text-white bg-white/10'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}

          {isNav && (
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-black/20 text-white hover:bg-black/40 transition-colors duration-200 focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <Logo isNav={true} />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center p-6">
            <div className="space-y-3">
              <Link
                href="/"
                className={`block py-3 px-4 rounded-lg text-xl font-medium transition-all duration-200 ${
                  pathname === '/' ? 'text-white bg-white/10' : 'text-white/70 hover:bg-white/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/projects"
                className={`block py-3 px-4 rounded-lg text-xl font-medium transition-all duration-200 ${
                  pathname === '/projects' || pathname.startsWith('/projects/')
                    ? 'text-[#4BC0FF] bg-[#4BC0FF]/10'
                    : 'text-white/70 hover:bg-white/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className={`block py-3 px-4 rounded-lg text-xl font-medium transition-all duration-200 ${
                  pathname === '/blog' || pathname.startsWith('/blog/')
                    ? 'text-[#FFF94D] bg-[#FFF94D]/10'
                    : 'text-white/70 hover:bg-white/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className={`block py-3 px-4 rounded-lg text-xl font-medium transition-all duration-200 ${
                  pathname === '/contact'
                    ? 'text-white bg-white/10'
                    : 'text-white/70 hover:bg-white/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="p-6 border-t border-white/10">
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://www.youtube.com/@Charlie-Design"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  fill="none"
                  className="hover:scale-110 transition-all duration-200"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a
                href="https://x.com/charliedesig"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  fill="none"
                  className="hover:scale-110 transition-all duration-200"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a
                href="https://github.com/charliedesigns"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  fill="none"
                  className="hover:scale-110 transition-all duration-200"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
