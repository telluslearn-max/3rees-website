'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

// Apple style: Clean, product-first, minimal decoration
const products = [
  {
    id: 'aurora-pro',
    title: 'Aurora Pro',
    subtitle: 'Our most advanced glass ever.',
    price: 'From $999',
    image: '/images/product-aurora-hero.jpg',
    size: 'large', // spans 2 cols
    bg: 'bg-neutral-50'
  },
  {
    id: 'crystal',
    title: 'Crystal Edition',
    subtitle: 'Pure clarity. Limited run.',
    price: '$1,299',
    image: '/images/product-crystal.jpg',
    size: 'tall',
    bg: 'bg-black text-white'
  },
  {
    id: 'accessories',
    title: 'Accessories',
    subtitle: 'Cases, chargers, and more.',
    image: '/images/accessories.jpg',
    size: 'small',
    bg: 'bg-white'
  },
  {
    id: 'custom',
    title: 'Configure Yours',
    subtitle: 'Make it yours.',
    image: '/images/custom.jpg',
    size: 'small', 
    bg: 'bg-blue-50'
  }
]

export function BentoSection() {
  return (
    <section className="relative bg-white py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header - Apple style: Huge, tight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 sm:mb-20 px-2"
        >
          <h2 
            className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-neutral-950 tracking-tight max-w-4xl"
            style={{ letterSpacing: '-0.04em', lineHeight: 1.1 }}
          >
            The next era of eyewear.
          </h2>
        </motion.div>

        {/* Bento - Apple style grid with product images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`
                ${product.size === 'large' ? 'md:col-span-2' : ''}
                ${product.size === 'tall' ? 'md:row-span-2' : ''}
              `}
            >
              <Link href={`/product/${product.id}`} className="block group h-full">
                <div className={`
                  relative h-full min-h-[400px] md:min-h-[500px] rounded-3xl overflow-hidden
                  ${product.bg}
                  ${product.size === 'large' ? 'flex flex-col md:flex-row items-center' : 'flex flex-col items-center justify-between p-8'}
                `}>
                  
                  {/* Text content - Apple style top placement */}
                  <div className={`
                    z-10 text-center
                    ${product.size === 'large' ? 'md:w-1/2 p-8 md:p-12' : 'mb-8'}
                  `}>
                    <h3 
                      className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-2"
                      style={{ letterSpacing: '-0.03em' }}
                    >
                      {product.title}
                    </h3>
                    <p className="text-lg sm:text-xl text-current/80 mb-4">
                      {product.subtitle}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <span className="text-lg font-medium">{product.price}</span>
                      <span className="text-[#0071e3] flex items-center gap-1 group-hover:underline">
                        Buy <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Product image - dominates the space, no decorative gradients */}
                  <div className={`
                    relative w-full
                    ${product.size === 'large' ? 'md:w-1/2 h-64 md:h-full' : 'flex-1 h-48'}
                  `}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain object-center group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Glass effect overlay - only on the card, not background */}
                  {product.size !== 'large' && (
                    <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-3xl" />
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Apple style: Full-width promo tile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6"
        >
          <Link href="/trade-in" className="block group">
            <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden bg-neutral-900 flex items-center justify-center">
              <div className="text-center z-10 text-white px-4">
                <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2" style={{ letterSpacing: '-0.03em' }}>
                  Apple Trade In
                </h3>
                <p className="text-lg sm:text-xl text-gray-400 mb-4">
                  Get credit toward your new Aurora.
                </p>
                <span className="text-[#2997ff] flex items-center justify-center gap-1 group-hover:underline">
                  See what your device is worth <ChevronRight className="w-4 h-4" />
                </span>
              </div>
              {/* Subtle product image */}
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
                <Image
                  src="/images/trade-in.jpg"
                  alt="Trade In"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}