'use client'

import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

type GlowEffectProps = {
  colors: string[]
  mode?: 'colorShift' | 'static'
  blur?: 'low' | 'medium' | 'high'
  duration?: number
  size?: number
  className?: string
}

export const GlowEffect: React.FC<GlowEffectProps> = ({
  colors,
  mode = 'colorShift',
  blur = 'medium',
  duration = 4,
  size = 400,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const blurValue = {
    low: 60,
    medium: 100,
    high: 140,
  }[blur]

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()

    const glows = container.querySelectorAll('.glow-point')

    const updateGlowPositions = () => {
      glows.forEach((glow, i) => {
        const glowEl = glow as HTMLElement

        if (mode === 'static') {
          // Static mode - fixed positions
          const angle = (i / glows.length) * Math.PI * 2
          const x = Math.cos(angle) * size * 0.5 + rect.width / 2
          const y = Math.sin(angle) * size * 0.5 + rect.height / 2

          glowEl.style.left = `${x}px`
          glowEl.style.top = `${y}px`
        }
      })
    }

    updateGlowPositions()

    const observer = new ResizeObserver(updateGlowPositions)
    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [size, mode])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {colors.map((color, i) => (
        <motion.div
          key={`glow-${i}`}
          className="glow-point absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2"
          animate={
            mode === 'colorShift'
              ? {
                  x: ['0%', '100%', '50%', '0%'],
                  y: ['0%', '50%', '100%', '0%'],
                }
              : {}
          }
          transition={{
            duration,
            ease: 'linear',
            repeat: Infinity,
            delay: i * (duration / colors.length),
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: color,
              filter: `blur(${blurValue}px)`,
              opacity: 0.8,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
