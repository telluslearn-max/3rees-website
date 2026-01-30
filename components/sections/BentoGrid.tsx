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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 bg-white">
      {bentoCards.map((card, index) => (
        <motion.section
          key={card.id}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -4, transition: { duration: 0.3 } }}
          className={`relative ${card.bg} py-8 sm:py-12 px-3 sm:px-4 text-center min-h-[450px] sm:min-h-[550px] md:min-h-[600px] flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500`}
        >
          {/* Text Content */}
          <div className="mb-6 sm:mb-8 px-2 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1, ease: "easeOut" }}
              className={`text-3xl sm:text-4xl md:text-5xl font-semibold ${card.textColor} tracking-tight`} 
              style={{ letterSpacing: '-0.04em', lineHeight: 1.1 }}
            >
              {card.title}
              {card.titleAccent && (
                <span className="text-[#0071e3] font-normal italic ml-2">{card.titleAccent}</span>
              )}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`mt-2 sm:mt-3 text-base sm:text-lg md:text-xl ${card.textColor === 'text-white' ? 'text-white/80' : 'text-neutral-600'}`}
            >
              {card.subtitle}
            </motion.p>
            
            {card.subsubtitle && (
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + index * 0.1 }}
                className={`mt-1 text-sm sm:text-base ${card.textColor === 'text-white' ? 'text-white/60' : 'text-neutral-500'}`}
              >
                {card.subsubtitle}
              </motion.p>
            )}

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 px-4 sm:px-0"
            >
              <Link href={`/product/${card.id}`} className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium bg-[#0071e3] text-white hover:bg-[#0077ed] transition-colors"
                >
                  {card.cta1}
                </motion.button>
              </Link>
              {!card.isSingleButton && card.cta2 && (
                <Link href={`/shop/${card.id}`} className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-5 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium border border-[#0071e3] text-[#0071e3] hover:bg-[#0071e3]/5 transition-colors"
                  >
                    {card.cta2}
                  </motion.button>
                </Link>
              )}
            </motion.div>
          </div>

          {/* Product Image with hover scale */}
          <motion.div 
            className="flex-1 flex items-end justify-center relative w-full px-4 pb-4"
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image 
              src={card.image}
              alt={card.title}
              width={400}
              height={400}
              className="max-h-56 sm:max-h-72 md:max-h-80 w-auto object-contain drop-shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </motion.section>
      ))}
    </div>
  );
}