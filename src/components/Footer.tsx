import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative text-white py-12 w-full border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A090C] to-black z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-[radial-gradient(ellipse_at_bottom,_rgba(59,130,246,0.05),transparent_70%)] z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
              <Image
                src="/logo.svg"
                alt="Charlie Fox"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <div className="text-center md:text-right">
            <p className="text-white/60 text-sm">
              {new Date().getFullYear()} Charlie Fox. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
