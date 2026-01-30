'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export function ProductGrid() {
  return (
    <section className="relative bg-[#f5f5f7] py-12 sm:py-16 px-4 text-center border-t border-neutral-200">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl md:text-6xl font-semibold text-neutral-900 tracking-tight"
        style={{ letterSpacing: '-0.04em' }}
      >
        Aurora Pro
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl text-neutral-700 px-4"
      >
        Say hello to the latest generation of glass.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
      >
        <Link href="/product/aurora-pro" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto px-6 py-2.5 bg-[#0071e3] text-white rounded-full text-base sm:text-lg font-medium hover:bg-[#0077ed] transition-colors">
            Learn more
          </button>
        </Link>
        <Link href="/shop/aurora-pro" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto px-6 py-2.5 border border-[#0071e3] text-[#0071e3] rounded-full text-base sm:text-lg font-medium hover:bg-[#0071e3]/5 transition-colors">
            Buy
          </button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-8 sm:mt-12 max-w-full sm:max-w-2xl md:max-w-4xl mx-auto relative aspect-[4/3] sm:aspect-[16/9] px-4"
      >
        <Image 
          src="/images/lineup.jpg"
          alt="Product Lineup"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1000px"
        />
      </motion.div>
    </section>
  )
}