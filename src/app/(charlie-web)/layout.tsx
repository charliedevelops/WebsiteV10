// src/app/(charlie-web)/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Charlie Fox',
  description:
    'Charlie Fox is a software engineer, 3D artist and modelmaker dedicated to building scalable web applications.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-[#0A090C]">
        {/* We'll remove the navbar from here since it's included in each page */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
