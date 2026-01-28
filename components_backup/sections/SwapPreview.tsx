"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Gamepad2, ArrowRight, Disc, Truck, RefreshCw } from "lucide-react";

const swapGames = [
  { name: "FC 24", platform: "PS5" },
  { name: "Spider-Man 2", platform: "PS5" },
  { name: "Halo Infinite", platform: "Xbox" },
  { name: "Zelda: TOTK", platform: "Switch" },
];

export default function SwapPreview() {
  return (
    <section className="section-large bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="grid grid-cols-2 gap-4">
              {swapGames.map((game, index) => (
                <motion.div
                  key={game.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <Gamepad2 className="w-12 h-12 text-gray-400 mb-3" />
                  <h4 className="font-semibold text-sm mb-1">{game.name}</h4>
                  <span className="text-xs text-gray-500">{game.platform}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
            >
              500+ Games
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="apple-eyebrow text-purple-400">Swap Library</span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              Kenya's first game
              <br />
              <span className="text-gray-400">swap platform.</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Finished your game? Swap it for another. Build Africa's largest physical game library. 
              PS5, Xbox, Nintendo Switch - all supported.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                  <Disc className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold">Browse Library</h4>
                  <p className="text-sm text-gray-500">500+ titles across all platforms</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold">Rider Pickup</h4>
                  <p className="text-sm text-gray-500">We collect your game, deliver new one</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold">Swap Fee</h4>
                  <p className="text-sm text-gray-500">From Ksh 500 per swap</p>
                </div>
              </div>
            </div>

            <Link href="/swap-library/" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-gray-100 transition-all duration-300">
              Explore Swap Library
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}