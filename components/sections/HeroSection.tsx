'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#f5f5f7] py-12 sm:py-16 px-4 text-center overflow-hidden"
    >
      {/* Parallax background element */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y, opacity }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-neutral-900 tracking-tight"
          style={{ letterSpacing: '-0.04em', lineHeight: 1.1 }}
        >
          Valentine&apos;s Day
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl text-neutral-700 px-4"
        >
          Find gifts that are easy to love.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 sm:mt-8"
        >
          <Link href="/shop">
            <motion.button 
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#0071e3] text-white rounded-full text-base sm:text-lg font-medium hover:bg-[#0077ed] hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              Shop
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Image with hover scale and parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 sm:mt-8 max-w-xs sm:max-w-sm md:max-w-md mx-auto relative aspect-square px-4"
      >
        <motion.div
          whileHover={{ scale: 1.03, rotate: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full"
        >
          <Image 
            src="/images/hero.jpg"
            alt="Hero"
            fill
            className="object-contain drop-shadow-2xl"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-neutral-300 flex items-start justify-center p-2"
        >
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-neutral-400 rounded-full" 
          />
        </motion.div>
      </motion.div>
    </section>
  )
}