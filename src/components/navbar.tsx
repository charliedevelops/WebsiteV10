'use client'
import Link from 'next/link'
import Logo from '@/components/logo'
import { useState, useEffect } from 'react'

const Navbar = ({ isNav }: { isNav: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 20)
      setPrevScrollPos(currentScrollPos)
      setIsScrolled(window.scrollY > -10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  return (
    <nav
      className={`w-full top-0 z-50 transition-all duration-500 lg:p-8 sm:p-2 md:p-4 lg:p4 text-white ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? '' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
            >
              <Logo isNav={isNav} />
            </Link>
          </div>
          {isNav && (
            <div className="hidden lg:flex items-center ml-auto">
              <ul className="flex items-center space-x-8 pr-4">
                <li>
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-gray-400 transition-all duration-200 font-medium"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-gray-300 hover:text-gray-400 transition-all duration-200 font-medium"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-300 hover:text-gray-400 transition-all duration-200 font-medium"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-gray-400 transition-all duration-200 font-medium"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <div className="md:hidden lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-white transition-colors duration-200 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Full-screen mobile menu */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-md z-50 flex items-center justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 focus:outline-none"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="flex flex-col items-center space-y-8">
              <li>
                <Link
                  href="/"
                  className="text-2xl text-white hover:text-gray-300 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-2xl text-white hover:text-gray-300 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-2xl text-white hover:text-gray-300 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-2xl text-white hover:text-gray-300 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
