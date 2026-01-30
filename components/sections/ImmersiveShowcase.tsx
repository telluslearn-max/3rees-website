'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export function ImmersiveShowcase() {
  return (
    <section className="relative h-[80vh] bg-black overflow-hidden">
      {/* Hardcoded background */}
      <div className="absolute inset-0">
        <Image 
          src="/images/immersive.jpg"
          alt="Immersive"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight uppercase"
          style={{ letterSpacing: '-0.02em' }}
        >
          TOP GLASS
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-xl sm:text-2xl text-white/90 max-w-2xl"
        >
          Go front row at the world&apos;s biggest fashion show.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex gap-4"
        >
          <Link href="/vision">
            <button className="px-6 py-2 bg-white text-black rounded-full text-lg font-medium hover:bg-white/90">
              Watch the trailer
            </button>
          </Link>
          <Link href="/vision-pro">
            <button className="px-6 py-2 border border-white text-white rounded-full text-lg font-medium hover:bg-white/10">
              Learn more
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}