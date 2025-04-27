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
    "I'm a software engineer focused on building scalable web apps and platforms. Currently working on tools that help businesses streamline their operations.",
  metadataBase: new URL('https://charliefox.dev'),
  authors: [{ name: 'Charlie Fox' }],
  creator: 'Charlie Fox',
  publisher: 'Charlie Fox',
  robots: 'index, follow',
  keywords: ['Charlie Fox', 'Software Engineer', 'Web Development', 'Portfolio'],

  openGraph: {
    type: 'website',
    title: 'Charlie Fox - Software Engineer',
    description:
      "I'm a software engineer focused on building scalable web apps and platforms. Currently working on tools that help businesses streamline their operations.",
    siteName: 'Charlie Fox',
    url: '/',
    locale: 'en_GB',
    images: [
      {
        url: '/metadata.png',
        width: 1200,
        height: 630,
        alt: 'Charlie Fox - Portfolio',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Charlie Fox - Software Engineer',
    description:
      "I'm a software engineer focused on building scalable web apps and platforms. Currently working on tools that help businesses streamline their operations.",
    creator: '@charliedesign',
    images: ['/metadata.png'],
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/metadata.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-[#0A090C]">
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
