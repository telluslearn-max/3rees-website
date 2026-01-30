'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const services = [
  {
    id: 'trade-in',
    icon: '3',
    title: 'Trade In',
    description: 'Get up to $200–$400 in credit when you trade in your current eyewear.',
    cta: 'Get your estimate',
    image: '/images/tradein.jpg',
    isSingle: true,
  },
  {
    id: 'care',
    icon: '3',
    title: 'Care',
    description: 'Get up to 3% Daily Cash back with every purchase.',
    cta1: 'Learn more',
    cta2: 'Apply now',
    image: '/images/care.jpg',
    isSingle: false,
  },
];

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white pt-0">
      {services.map((service, index) => (
        <motion.section
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative bg-[#f5f5f7] py-12 px-4 text-center min-h-[500px] flex flex-col"
        >
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 tracking-tight flex items-center justify-center gap-2" style={{ letterSpacing: '-0.04em' }}>
              <span className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                {service.icon}
              </span>
              {service.title}
            </h2>
            
            <p className="mt-3 text-lg sm:text-xl text-neutral-600 max-w-sm mx-auto">
              {service.description}
            </p>

            <div className="mt-4 flex justify-center gap-4">
              {service.isSingle ? (
                <Link href={`/${service.id}`}>
                  <button className="px-5 py-1.5 bg-[#0071e3] text-white rounded-full text-base font-medium hover:bg-[#0077ed]">
                    {service.cta}
                  </button>
                </Link>
              ) : (
                <>
                  <Link href={`/${service.id}`}>
                    <button className="px-5 py-1.5 bg-[#0071e3] text-white rounded-full text-base font-medium hover:bg-[#0077ed]">
                      {service.cta1}
                    </button>
                  </Link>
                  <Link href={`/apply`}>
                    <button className="px-5 py-1.5 border border-[#0071e3] text-[#0071e3] rounded-full text-base font-medium hover:bg-[#0071e3]/5">
                      {service.cta2}
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex-1 flex items-end justify-center relative">
            <Image 
              src={service.image}
              alt={service.title}
              width={300}
              height={300}
              className="max-h-64 w-auto object-contain"
            />
          </div>
        </motion.section>
      ))}
    </div>
  );
}
