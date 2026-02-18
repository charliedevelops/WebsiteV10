// src/app/(charlie-web)/client-layout.tsx
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import SmoothCursor from '@/components/react-bits/smooth-cursor'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <SmoothCursor
        color="#4BC0FF"
        pointsCount={30}
        lineWidth={1.5}
        springStrength={0.3}
        dampening={0.6}
        blur={4}
        trailOpacity={0.3}
        mixBlendMode="screen"
        velocityScale={true}
      />
    </>
  )
}
