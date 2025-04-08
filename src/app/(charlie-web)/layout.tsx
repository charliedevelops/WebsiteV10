// src/app/(charlie-web)/layout.tsx
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import ClientLayout from './client-layout'
import Footer from '@/components/Footer'
const inter = localFont({
  src: '../fonts/InterVariable.woff2',
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Charlie | FX | Develop | Design',
  description: 'Home of Charlie',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased bg-[#0A090C]`}>
      <body>
        <ClientLayout>{children}</ClientLayout>
        <Footer />
      </body>
    </html>
  )
}
