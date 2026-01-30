'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const bentoCards = [
  {
    id: 'sport',
    title: '3rees Sport',
    subtitle: 'Your health. Your style.',
    cta1: 'Learn more',
    cta2: 'Buy',
    bg: 'bg-white',
    textColor: 'text-black',
    image: '/images/sport.jpg',
  },
  {
    id: 'luxe',
    title: '3rees Luxe',
    subtitle: 'The new Black Collection.',
    subsubtitle: 'Inspired by the power of connection.',
    cta1: 'Shop',
    isSingleButton: true,
    bg: 'bg-black',
    textColor: 'text-white',
    image: '/images/luxe.jpg',
  },
  {
    id: 'crystal',
    title: 'Crystal',
    titleAccent: 'Clear',
    subtitle: 'Now supercharged by clarity.',
    cta1: 'Learn more',
    cta2: 'Buy',
    bg: 'bg-[#e8f4f8]',
    textColor: 'text-black',
    image: '/images/crystal.jpg',
  },
  {
    id: 'titanium',
    title: 'Titanium',
    subtitle: 'Advanced performance and game-changing capabilities.',
    cta1: 'Learn more',
    cta2: 'Buy',
    bg: 'bg-black',
    textColor: 'text-white',
    image: '/images/titanium.jpg',
  },
];

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white">
      {bentoCards.map((card, index) => (
        <motion.section
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`relative ${card.bg} py-12 px-4 text-center min-h-[600px] flex flex-col`}
        >
          <div className="mb-8">
            <h2 className={`text-4xl sm:text-5xl font-semibold ${card.textColor} tracking-tight`} style={{ letterSpacing: '-0.04em' }}>
              {card.title}
              {card.titleAccent && (
                <span className="text-[#0071e3] font-normal italic">{card.titleAccent}</span>
              )}
            </h2>
            
            <p className={`mt-2 text-lg sm:text-xl ${card.textColor === 'text-white' ? 'text-white/80' : 'text-neutral-600'}`}>
              {card.subtitle}
            </p>
            
            {card.subsubtitle && (
              <p className={`mt-1 text-lg ${card.textColor === 'text-white' ? 'text-white/60' : 'text-neutral-500'}`}>
                {card.subsubtitle}
              </p>
            )}

            <div className="mt-4 flex justify-center gap-4">
              <Link href={`/product/${card.id}`}>
                <button className="px-5 py-1.5 rounded-full text-base font-medium bg-[#0071e3] text-white hover:opacity-90">
                  {card.cta1}
                </button>
              </Link>
              {!card.isSingleButton && card.cta2 && (
                <Link href={`/shop/${card.id}`}>
                  <button className="px-5 py-1.5 rounded-full text-base font-medium border border-[#0071e3] text-[#0071e3] hover:bg-opacity-10">
                    {card.cta2}
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className="flex-1 flex items-end justify-center relative">
            <Image 
              src={card.image}
              alt={card.title}
              width={400}
              height={400}
              className="max-h-80 sm:max-h-96 w-auto object-contain"
            />
          </div>
        </motion.section>
      ))}
    </div>
  );
}
