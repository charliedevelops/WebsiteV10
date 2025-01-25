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
      className={` w-full  top-0 z-50  transition-all duration-500 p-8 sm:p-2 md:p-4 lg:p4 text-white  ${
        isVisible ? 'translate-y-0' : '-translate-y-full '
      }
      ${isScrolled ? ' ' : 'bg-transparent '}`}
    >
      {' '}
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
                    className="text-gray-300 hover:text-gray-400 transition-all duration-200 font-medium  "
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-gray-300 hover:text-gray-400 transition-all duration-200 font-medium "
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
                <path strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 transition-all duration-200">
              <Link href="/" className="block px-3 py-2 text-white transition-colors duration-200">
                Home
              </Link>
              <Link
                href="/projects"
                className="block px-3 py-2 text-white  transition-colors duration-200"
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-white  transition-colors duration-200"
              >
                Blog
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
