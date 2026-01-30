'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'

export function ProductGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#f5f5f7] py-12 sm:py-16 px-4 text-center border-t border-neutral-200 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
        className="relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-neutral-900 tracking-tight"
          style={{ letterSpacing: '-0.04em' }}
        >
          Aurora Pro
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl text-neutral-700 px-4"
        >
          Say hello to the latest generation of glass.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
        >
          <Link href="/product/aurora-pro" className="w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#0071e3] text-white rounded-full text-base sm:text-lg font-medium hover:bg-[#0077ed] hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              Learn more
            </motion.button>
          </Link>
          <Link href="/shop/aurora-pro" className="w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-full sm:w-auto px-6 py-2.5 border border-[#0071e3] text-[#0071e3] rounded-full text-base sm:text-lg font-medium hover:bg-[#0071e3]/5 transition-all"
            >
              Buy
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="mt-8 sm:mt-12 max-w-full sm:max-w-2xl md:max-w-4xl mx-auto relative aspect-[4/3] sm:aspect-[16/9] px-4"
      >
        <motion.div 
          className="relative w-full h-full overflow-hidden rounded-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div style={{ y: imageY }} className="absolute inset-0">
            <Image 
              src="/images/lineup.jpg"
              alt="Product Lineup"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1000px"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}