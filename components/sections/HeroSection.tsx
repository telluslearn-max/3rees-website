'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative bg-[#f5f5f7] py-16 px-4 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl sm:text-6xl font-semibold text-neutral-900 tracking-tight"
        style={{ letterSpacing: '-0.04em', lineHeight: 1.1 }}
      >
        Valentine&apos;s Day
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-2 text-xl sm:text-2xl text-neutral-700"
      >
        Find gifts that are easy to love.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <Link href="/shop">
          <button className="px-8 py-3 bg-[#0071e3] text-white rounded-full text-lg font-medium hover:bg-[#0077ed]">
            Shop
          </button>
        </Link>
      </motion.div>

      {/* Hardcoded image - easy to change */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 max-w-md mx-auto relative aspect-square"
      >
        <Image 
          src="/images/hero.jpg"
          alt="Hero"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </section>
  )
}