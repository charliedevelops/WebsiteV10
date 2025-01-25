'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Logo({ isNav }: { isNav: boolean }) {
  return (
    <motion.div
      layoutId="logo"
      className={` ${isNav ? 'w-40' : ''}`}
      initial={false}
      animate={{}}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <Image
        src="/logo.svg"
        alt="Logo"
        width={300}
        height={300}
        className="w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px]"
      />
    </motion.div>
  )
}
