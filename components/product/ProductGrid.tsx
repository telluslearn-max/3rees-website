'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
// REMOVE THIS LINE: import { getCampaignImage } from '@/lib/campaign'

export function ProductGrid() {
  // REMOVE THIS LINE: const lineupImage = getCampaignImage('product-lineup');
  
  return (
    <section className="relative bg-[#f5f5f7] py-16 px-4 text-center border-t border-neutral-200">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl sm:text-6xl font-semibold text-neutral-900 tracking-tight"
        style={{ letterSpacing: '-0.04em' }}
      >
        Aurora Pro
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-2 text-xl sm:text-2xl text-neutral-700"
      >
        Say hello to the latest generation of glass.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-4 flex justify-center gap-4"
      >
        <Link href="/product/aurora-pro">
          <button className="px-6 py-2 bg-[#0071e3] text-white rounded-full text-lg font-medium hover:bg-[#0077ed]">
            Learn more
          </button>
        </Link>
        <Link href="/shop/aurora-pro">
          <button className="px-6 py-2 border border-[#0071e3] text-[#0071e3] rounded-full text-lg font-medium hover:bg-[#0071e3]/5">
            Buy
          </button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 max-w-4xl mx-auto relative aspect-[16/9]"
      >
        <Image 
          src="/images/lineup.jpg"  // HARDCODED PATH
          alt="Product Lineup"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </section>
  )
}