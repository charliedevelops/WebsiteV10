'use client'

import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useState } from 'react'
import ContactAnimations from '@/components/contact-animations'

const Contact = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({})

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: 'Message sent successfully! I will get back to you soon.',
        })
        // Reset form
        setEmail('')
        setMessage('')
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || 'Something went wrong. Please try again.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      id="contact"
      className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-background to-background/90"
    >
      <ContactAnimations />
      <Navbar isNav={true} />

      <motion.div
        className="container mx-auto px-4 py-16 flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="p-8 w-full max-w-2xl flex flex-col gap-6 backdrop-blur-sm bg-black/20 rounded-2xl border border-white/10 shadow-lg"
          variants={itemVariants}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
            variants={itemVariants}
          >
            Let&apos;s <span className="text-[#FFF94D]">Connect</span>
          </motion.h1>

          {submitStatus.success ? (
            <motion.div
              className="bg-green-500/20 border border-green-500/50 text-white p-4 rounded-lg"
              variants={itemVariants}
            >
              <p>{submitStatus.message}</p>
            </motion.div>
          ) : (
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              {submitStatus.message && !submitStatus.success && (
                <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-lg">
                  <p>{submitStatus.message}</p>
                </div>
              )}

              <motion.label className="grid gap-2" variants={itemVariants}>
                <h2 className="text-xl font-medium text-white/90">Your email</h2>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 rounded-lg border border-white/20 bg-black/30 text-white text-lg focus:outline-none focus:ring-2 focus:ring-[#FFF94D]/50 transition-all"
                  required
                  placeholder="email@example.com"
                />
              </motion.label>

              <motion.label className="grid gap-2" variants={itemVariants}>
                <h2 className="text-xl font-medium text-white/90">Your message</h2>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="p-3 rounded-lg border border-white/20 bg-black/30 text-white text-lg h-56 w-full focus:outline-none focus:ring-2 focus:ring-[#FFF94D]/50 transition-all resize-none"
                  required
                  placeholder="Tell me about your project or inquiry..."
                ></textarea>
              </motion.label>

              <motion.div className="mt-2" variants={itemVariants}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    bg-[#FFF94D] text-black py-3 px-6 rounded-lg font-medium text-lg
                    transition-all duration-300 relative overflow-visible
                    disabled:opacity-100 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(255,249,77,0.4)]
                    ${isSubmitting ? 'glow-button' : ''}
                  `}
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>

                  {isSubmitting && (
                    <span className="absolute inset-0 -z-10 rounded-lg overflow-hidden">
                      <span className="absolute inset-0 animate-pulse-slow opacity-70 bg-[#FFF94D]"></span>
                      <span className="absolute top-0 left-0 h-[500%] w-[200%] -translate-x-[50%] -translate-y-[25%] animate-spin-slow opacity-60 bg-[radial-gradient(ellipse_at_center,_rgba(255,249,77,0.8)_0%,_transparent_60%)]"></span>
                      <span className="absolute inset-0 animate-glow-slow bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_50%)]"></span>
                    </span>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          )}

          <motion.div className="mt-6 border-t border-white/10 pt-6" variants={itemVariants}>
            <p className="text-white/70 mb-3">Prefer to email directly?</p>
            <a
              href="mailto:hi@charliefox.dev"
              className="text-[#FFF94D] font-medium flex items-center gap-2 hover:underline transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              hi@charliefox.dev
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Contact
